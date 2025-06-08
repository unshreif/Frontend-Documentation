# Advanced JavaScript Patterns

## Module Patterns

### Revealing Module Pattern

```javascript
const Calculator = (function() {
    // Private variables and functions
    let history = [];
    let currentValue = 0;
    
    function logOperation(operation, operand, result) {
        history.push({
            operation,
            operand,
            result,
            timestamp: new Date()
        });
    }
    
    function validateNumber(num) {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('Invalid number provided');
        }
        return true;
    }
    
    // Public API
    return {
        add(num) {
            validateNumber(num);
            const previousValue = currentValue;
            currentValue += num;
            logOperation('add', num, currentValue);
            return this;
        },
        
        subtract(num) {
            validateNumber(num);
            const previousValue = currentValue;
            currentValue -= num;
            logOperation('subtract', num, currentValue);
            return this;
        },
        
        multiply(num) {
            validateNumber(num);
            const previousValue = currentValue;
            currentValue *= num;
            logOperation('multiply', num, currentValue);
            return this;
        },
        
        divide(num) {
            validateNumber(num);
            if (num === 0) throw new Error('Division by zero');
            const previousValue = currentValue;
            currentValue /= num;
            logOperation('divide', num, currentValue);
            return this;
        },
        
        getValue() {
            return currentValue;
        },
        
        getHistory() {
            return [...history]; // Return copy
        },
        
        clear() {
            currentValue = 0;
            history = [];
            return this;
        }
    };
})();

// Usage
Calculator.add(10).multiply(2).subtract(5);
console.log(Calculator.getValue()); // 15
```

### Namespace Pattern

```javascript
// Global namespace
const MyApp = MyApp || {};

// Sub-namespaces
MyApp.Utils = {};
MyApp.Components = {};
MyApp.Services = {};

// Utility namespace
MyApp.Utils.DOM = {
    createElement(tag, attributes = {}, children = []) {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    },
    
    findElements(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));
    },
    
    addEventListeners(elements, eventType, handler) {
        elements.forEach(element => {
            element.addEventListener(eventType, handler);
        });
    }
};

MyApp.Utils.String = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    slugify(str) {
        return str.toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },
    
    truncate(str, length, suffix = '...') {
        return str.length <= length ? str : str.slice(0, length) + suffix;
    }
};

// Service namespace
MyApp.Services.API = {
    baseURL: 'https://api.example.com',
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('API Request failed:', error);
            throw error;
        }
    },
    
    get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url);
    },
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};
```

## Proxy and Reflection Patterns

### Data Validation with Proxy

```javascript
function createValidatedObject(target, validators = {}) {
    return new Proxy(target, {
        set(obj, prop, value) {
            // Check if validator exists for this property
            if (validators[prop]) {
                const validator = validators[prop];
                
                if (typeof validator === 'function') {
                    if (!validator(value)) {
                        throw new Error(`Invalid value for property '${prop}': ${value}`);
                    }
                } else if (typeof validator === 'object') {
                    // Complex validation object
                    const { type, required, min, max, pattern, custom } = validator;
                    
                    if (required && (value === undefined || value === null)) {
                        throw new Error(`Property '${prop}' is required`);
                    }
                    
                    if (type && typeof value !== type) {
                        throw new Error(`Property '${prop}' must be of type ${type}`);
                    }
                    
                    if (typeof value === 'number') {
                        if (min !== undefined && value < min) {
                            throw new Error(`Property '${prop}' must be >= ${min}`);
                        }
                        if (max !== undefined && value > max) {
                            throw new Error(`Property '${prop}' must be <= ${max}`);
                        }
                    }
                    
                    if (typeof value === 'string' && pattern && !pattern.test(value)) {
                        throw new Error(`Property '${prop}' does not match required pattern`);
                    }
                    
                    if (custom && !custom(value)) {
                        throw new Error(`Property '${prop}' failed custom validation`);
                    }
                }
            }
            
            // Set the property if validation passes
            obj[prop] = value;
            return true;
        },
        
        get(obj, prop) {
            if (prop in obj) {
                return obj[prop];
            }
            
            // Return undefined for non-existent properties
            return undefined;
        }
    });
}

// Usage example
const userValidators = {
    name: { type: 'string', required: true, min: 2 },
    age: { type: 'number', required: true, min: 0, max: 120 },
    email: {
        type: 'string',
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    role: {
        type: 'string',
        custom: (value) => ['admin', 'user', 'moderator'].includes(value)
    }
};

const user = createValidatedObject({}, userValidators);

try {
    user.name = 'John Doe';
    user.age = 30;
    user.email = 'john@example.com';
    user.role = 'admin';
    console.log('User created successfully:', user);
} catch (error) {
    console.error('Validation error:', error.message);
}
```

### Observable Pattern with Proxy

```javascript
function createObservable(target, onChange) {
    const listeners = new Set();
    
    if (onChange) {
        listeners.add(onChange);
    }
    
    function notifyListeners(property, newValue, oldValue, operation) {
        listeners.forEach(listener => {
            listener({ property, newValue, oldValue, operation, target });
        });
    }
    
    return new Proxy(target, {
        set(obj, prop, value) {
            const oldValue = obj[prop];
            const operation = prop in obj ? 'update' : 'create';
            
            obj[prop] = value;
            notifyListeners(prop, value, oldValue, operation);
            return true;
        },
        
        deleteProperty(obj, prop) {
            if (prop in obj) {
                const oldValue = obj[prop];
                delete obj[prop];
                notifyListeners(prop, undefined, oldValue, 'delete');
                return true;
            }
            return false;
        }
    });
}

// Advanced observable with nested object support
class DeepObservable {
    constructor(target, onChange) {
        this.listeners = new Set();
        this.proxies = new WeakMap();
        
        if (onChange) {
            this.listeners.add(onChange);
        }
        
        return this.createProxy(target, []);
    }
    
    createProxy(target, path) {
        if (this.proxies.has(target)) {
            return this.proxies.get(target);
        }
        
        const proxy = new Proxy(target, {
            set: (obj, prop, value) => {
                const oldValue = obj[prop];
                const currentPath = [...path, prop];
                
                // If the new value is an object, make it observable too
                if (value && typeof value === 'object' && !this.proxies.has(value)) {
                    value = this.createProxy(value, currentPath);
                }
                
                obj[prop] = value;
                this.notifyChange(currentPath, value, oldValue, 'set');
                return true;
            },
            
            deleteProperty: (obj, prop) => {
                if (prop in obj) {
                    const oldValue = obj[prop];
                    const currentPath = [...path, prop];
                    delete obj[prop];
                    this.notifyChange(currentPath, undefined, oldValue, 'delete');
                }
                return true;
            }
        });
        
        // Make nested objects observable
        Object.keys(target).forEach(key => {
            if (target[key] && typeof target[key] === 'object') {
                target[key] = this.createProxy(target[key], [...path, key]);
            }
        });
        
        this.proxies.set(target, proxy);
        return proxy;
    }
    
    notifyChange(path, newValue, oldValue, operation) {
        this.listeners.forEach(listener => {
            listener({
                path: path.join('.'),
                newValue,
                oldValue,
                operation
            });
        });
    }
    
    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }
}

// Usage
const data = new DeepObservable({
    user: {
        name: 'John',
        address: {
            city: 'New York',
            zipCode: '10001'
        }
    },
    settings: {
        theme: 'dark'
    }
}, (change) => {
    console.log('Data changed:', change);
});

data.user.name = 'Jane'; // Logs: { path: 'user.name', newValue: 'Jane', oldValue: 'John', operation: 'set' }
data.user.address.city = 'Boston'; // Logs: { path: 'user.address.city', newValue: 'Boston', oldValue: 'New York', operation: 'set' }
```

## Functional Programming Patterns

### Functors and Monads

```javascript
// Maybe Monad for handling null/undefined values
class Maybe {
    constructor(value) {
        this.value = value;
    }
    
    static of(value) {
        return new Maybe(value);
    }
    
    static nothing() {
        return new Maybe(null);
    }
    
    isNothing() {
        return this.value === null || this.value === undefined;
    }
    
    map(fn) {
        return this.isNothing() ? this : Maybe.of(fn(this.value));
    }
    
    flatMap(fn) {
        return this.isNothing() ? this : fn(this.value);
    }
    
    filter(predicate) {
        return this.isNothing() || predicate(this.value) ? this : Maybe.nothing();
    }
    
    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this.value;
    }
    
    toString() {
        return this.isNothing() ? 'Maybe.Nothing' : `Maybe.Just(${this.value})`;
    }
}

// Either Monad for error handling
class Either {
    constructor(value, isRight = true) {
        this.value = value;
        this.isRight = isRight;
    }
    
    static right(value) {
        return new Either(value, true);
    }
    
    static left(value) {
        return new Either(value, false);
    }
    
    map(fn) {
        return this.isRight ? Either.right(fn(this.value)) : this;
    }
    
    flatMap(fn) {
        return this.isRight ? fn(this.value) : this;
    }
    
    mapLeft(fn) {
        return this.isRight ? this : Either.left(fn(this.value));
    }
    
    fold(leftFn, rightFn) {
        return this.isRight ? rightFn(this.value) : leftFn(this.value);
    }
    
    getOrElse(defaultValue) {
        return this.isRight ? this.value : defaultValue;
    }
    
    toString() {
        return this.isRight ? `Either.Right(${this.value})` : `Either.Left(${this.value})`;
    }
}

// Usage examples
function safeDivide(x, y) {
    return y === 0 
        ? Either.left('Division by zero') 
        : Either.right(x / y);
}

function parseNumber(str) {
    const num = Number(str);
    return isNaN(num) 
        ? Either.left(`Invalid number: ${str}`) 
        : Either.right(num);
}

// Chaining operations
const result = parseNumber('10')
    .flatMap(x => parseNumber('2').flatMap(y => safeDivide(x, y)))
    .map(x => x * 2)
    .fold(
        error => `Error: ${error}`,
        value => `Result: ${value}`
    );

console.log(result); // "Result: 10"
```

### Immutable Data Structures

```javascript
class ImmutableList {
    constructor(items = []) {
        this._items = Object.freeze([...items]);
    }
    
    get length() {
        return this._items.length;
    }
    
    get(index) {
        return this._items[index];
    }
    
    first() {
        return this._items[0];
    }
    
    last() {
        return this._items[this._items.length - 1];
    }
    
    add(item) {
        return new ImmutableList([...this._items, item]);
    }
    
    remove(index) {
        return new ImmutableList([
            ...this._items.slice(0, index),
            ...this._items.slice(index + 1)
        ]);
    }
    
    update(index, item) {
        return new ImmutableList([
            ...this._items.slice(0, index),
            item,
            ...this._items.slice(index + 1)
        ]);
    }
    
    map(fn) {
        return new ImmutableList(this._items.map(fn));
    }
    
    filter(predicate) {
        return new ImmutableList(this._items.filter(predicate));
    }
    
    reduce(fn, initial) {
        return this._items.reduce(fn, initial);
    }
    
    find(predicate) {
        return this._items.find(predicate);
    }
    
    toArray() {
        return [...this._items];
    }
    
    toString() {
        return `ImmutableList[${this._items.join(', ')}]`;
    }
    
    [Symbol.iterator]() {
        return this._items[Symbol.iterator]();
    }
}

class ImmutableMap {
    constructor(entries = []) {
        this._entries = new Map(entries);
        Object.freeze(this);
    }
    
    get(key) {
        return this._entries.get(key);
    }
    
    has(key) {
        return this._entries.has(key);
    }
    
    set(key, value) {
        const newEntries = new Map(this._entries);
        newEntries.set(key, value);
        return new ImmutableMap(newEntries);
    }
    
    delete(key) {
        const newEntries = new Map(this._entries);
        newEntries.delete(key);
        return new ImmutableMap(newEntries);
    }
    
    merge(other) {
        const newEntries = new Map([...this._entries, ...other._entries]);
        return new ImmutableMap(newEntries);
    }
    
    map(fn) {
        const newEntries = [];
        for (const [key, value] of this._entries) {
            newEntries.push([key, fn(value, key)]);
        }
        return new ImmutableMap(newEntries);
    }
    
    filter(predicate) {
        const newEntries = [];
        for (const [key, value] of this._entries) {
            if (predicate(value, key)) {
                newEntries.push([key, value]);
            }
        }
        return new ImmutableMap(newEntries);
    }
    
    keys() {
        return this._entries.keys();
    }
    
    values() {
        return this._entries.values();
    }
    
    entries() {
        return this._entries.entries();
    }
    
    get size() {
        return this._entries.size;
    }
    
    toObject() {
        return Object.fromEntries(this._entries);
    }
    
    [Symbol.iterator]() {
        return this._entries[Symbol.iterator]();
    }
}
```

## Reactive Programming Patterns

### Event Streams and Observables

```javascript
class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
    
    static create(subscribe) {
        return new Observable(subscribe);
    }
    
    static fromEvent(element, eventType) {
        return new Observable(observer => {
            const handler = (event) => observer.next(event);
            element.addEventListener(eventType, handler);
            
            return () => element.removeEventListener(eventType, handler);
        });
    }
    
    static fromArray(array) {
        return new Observable(observer => {
            array.forEach(item => observer.next(item));
            observer.complete();
        });
    }
    
    static interval(ms) {
        return new Observable(observer => {
            let count = 0;
            const intervalId = setInterval(() => {
                observer.next(count++);
            }, ms);
            
            return () => clearInterval(intervalId);
        });
    }
    
    subscribe(observerOrNext, error, complete) {
        const observer = typeof observerOrNext === 'function' 
            ? { next: observerOrNext, error, complete }
            : observerOrNext;
        
        return this._subscribe(observer);
    }
    
    map(fn) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => observer.next(fn(value)),
                error: err => observer.error && observer.error(err),
                complete: () => observer.complete && observer.complete()
            });
        });
    }
    
    filter(predicate) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => {
                    if (predicate(value)) {
                        observer.next(value);
                    }
                },
                error: err => observer.error && observer.error(err),
                complete: () => observer.complete && observer.complete()
            });
        });
    }
    
    debounce(ms) {
        return new Observable(observer => {
            let timeoutId;
            
            return this.subscribe({
                next: value => {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => {
                        observer.next(value);
                    }, ms);
                },
                error: err => observer.error && observer.error(err),
                complete: () => observer.complete && observer.complete()
            });
        });
    }
    
    throttle(ms) {
        return new Observable(observer => {
            let lastEmitTime = 0;
            
            return this.subscribe({
                next: value => {
                    const now = Date.now();
                    if (now - lastEmitTime >= ms) {
                        lastEmitTime = now;
                        observer.next(value);
                    }
                },
                error: err => observer.error && observer.error(err),
                complete: () => observer.complete && observer.complete()
            });
        });
    }
    
    take(count) {
        return new Observable(observer => {
            let taken = 0;
            
            const unsubscribe = this.subscribe({
                next: value => {
                    if (taken < count) {
                        taken++;
                        observer.next(value);
                        
                        if (taken === count) {
                            observer.complete && observer.complete();
                            unsubscribe();
                        }
                    }
                },
                error: err => observer.error && observer.error(err),
                complete: () => observer.complete && observer.complete()
            });
            
            return unsubscribe;
        });
    }
    
    merge(other) {
        return new Observable(observer => {
            let completed = 0;
            
            const unsubscribe1 = this.subscribe({
                next: value => observer.next(value),
                error: err => observer.error && observer.error(err),
                complete: () => {
                    completed++;
                    if (completed === 2) {
                        observer.complete && observer.complete();
                    }
                }
            });
            
            const unsubscribe2 = other.subscribe({
                next: value => observer.next(value),
                error: err => observer.error && observer.error(err),
                complete: () => {
                    completed++;
                    if (completed === 2) {
                        observer.complete && observer.complete();
                    }
                }
            });
            
            return () => {
                unsubscribe1();
                unsubscribe2();
            };
        });
    }
}

// Usage examples
const searchInput = document.getElementById('search');
const searchStream = Observable.fromEvent(searchInput, 'input')
    .map(event => event.target.value)
    .filter(value => value.length > 2)
    .debounce(300)
    .map(query => fetch(`/api/search?q=${query}`));

searchStream.subscribe(
    promise => promise.then(response => response.json()).then(console.log),
    error => console.error('Search error:', error)
);
```

This lesson provides a comprehensive overview of advanced JavaScript patterns including module patterns, proxy/reflection, functional programming concepts, and reactive programming with observables.
