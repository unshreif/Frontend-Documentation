# Advanced JavaScript Patterns

## Introduction to Advanced Patterns

Advanced patterns in JavaScript help solve complex problems, improve code organization, and create more maintainable applications. These patterns represent time-tested solutions to common programming challenges.

## Functional Programming Patterns

### Pure Functions and Immutability

```javascript
// Pure function - same input always produces same output, no side effects
function calculateTax(price, taxRate) {
    return price * taxRate;
}

// Impure function - depends on external state
let globalTaxRate = 0.08;
function calculateTaxImpure(price) {
    return price * globalTaxRate; // Depends on external variable
}

// Immutable data transformations
const users = [
    { id: 1, name: 'Alice', active: true, score: 85 },
    { id: 2, name: 'Bob', active: false, score: 92 },
    { id: 3, name: 'Charlie', active: true, score: 78 }
];

// Pure transformation functions
const activateUser = (user) => ({ ...user, active: true });
const updateScore = (user, newScore) => ({ ...user, score: newScore });
const addTimestamp = (user) => ({ ...user, updatedAt: new Date() });

// Compose transformations
const processUser = (user, score) => 
    addTimestamp(updateScore(activateUser(user), score));

// Functional data processing pipeline
const getTopActiveUsers = (users, minScore = 80) =>
    users
        .filter(user => user.active)
        .filter(user => user.score >= minScore)
        .sort((a, b) => b.score - a.score)
        .map(user => ({ ...user, rank: 'top-performer' }));
```

### Function Composition and Pipes

```javascript
// Higher-order composition utilities
const compose = (...fns) => (value) => 
    fns.reduceRight((acc, fn) => fn(acc), value);

const pipe = (...fns) => (value) => 
    fns.reduce((acc, fn) => fn(acc), value);

// Utility functions
const add = (n) => (x) => x + n;
const multiply = (n) => (x) => x * n;
const square = (x) => x * x;
const negate = (x) => -x;

// Composition examples
const addTwoThenSquare = compose(square, add(2));
const multiplyByThreeThenNegate = pipe(multiply(3), negate);

console.log(addTwoThenSquare(3)); // (3 + 2)² = 25
console.log(multiplyByThreeThenNegate(4)); // -(4 * 3) = -12

// Real-world data processing pipeline
const processOrderData = pipe(
    // Parse order items
    (orderData) => orderData.items.map(item => ({
        ...item,
        total: item.price * item.quantity
    })),
    
    // Filter available items
    (items) => items.filter(item => item.inStock),
    
    // Apply discounts
    (items) => items.map(item => ({
        ...item,
        discountedTotal: item.total * (1 - (item.discount || 0))
    })),
    
    // Calculate final totals
    (items) => ({
        items,
        subtotal: items.reduce((sum, item) => sum + item.discountedTotal, 0),
        itemCount: items.length
    }),
    
    // Add shipping and tax
    (order) => ({
        ...order,
        shipping: order.subtotal > 100 ? 0 : 9.99,
        tax: order.subtotal * 0.08,
        total: order.subtotal + order.shipping + (order.subtotal * 0.08)
    })
);

// Usage
const orderData = {
    items: [
        { id: 1, name: 'Laptop', price: 999, quantity: 1, inStock: true, discount: 0.1 },
        { id: 2, name: 'Mouse', price: 29, quantity: 2, inStock: true },
        { id: 3, name: 'Keyboard', price: 89, quantity: 1, inStock: false }
    ]
};

const processedOrder = processOrderData(orderData);
console.log(processedOrder);
```

### Monads and Functors

```javascript
// Maybe Monad - handles null/undefined values gracefully
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
        return this.isNothing() ? Maybe.nothing() : Maybe.of(fn(this.value));
    }
    
    flatMap(fn) {
        return this.isNothing() ? Maybe.nothing() : fn(this.value);
    }
    
    filter(predicate) {
        if (this.isNothing()) return Maybe.nothing();
        return predicate(this.value) ? this : Maybe.nothing();
    }
    
    getOrElse(defaultValue) {
        return this.isNothing() ? defaultValue : this.value;
    }
}

// Usage examples
const safeGetProperty = (obj, path) => {
    return path.split('.').reduce(
        (maybe, key) => maybe.flatMap(value => 
            value && typeof value === 'object' ? Maybe.of(value[key]) : Maybe.nothing()
        ),
        Maybe.of(obj)
    );
};

const user = {
    profile: {
        address: {
            street: '123 Main St',
            city: 'Boston'
        }
    }
};

const street = safeGetProperty(user, 'profile.address.street')
    .map(str => str.toUpperCase())
    .getOrElse('Unknown Street');

console.log(street); // "123 MAIN ST"

// Either Monad - for error handling
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
    
    fold(leftFn, rightFn) {
        return this.isRight ? rightFn(this.value) : leftFn(this.value);
    }
}

// Safe division function
const safeDivide = (a, b) => 
    b === 0 
        ? Either.left('Division by zero') 
        : Either.right(a / b);

const calculation = safeDivide(10, 2)
    .map(result => result * 2)
    .map(result => result + 1);

calculation.fold(
    error => console.error('Error:', error),
    result => console.log('Result:', result) // Result: 11
);
```

## Advanced Asynchronous Patterns

### Async Iterators and Generators

```javascript
// Async generator for streaming data
async function* fetchDataStream(urls) {
    for (const url of urls) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            yield data;
        } catch (error) {
            yield { error: error.message, url };
        }
    }
}

// Consuming async generators
async function processDataStream() {
    const urls = [
        '/api/users',
        '/api/orders',
        '/api/products'
    ];
    
    for await (const data of fetchDataStream(urls)) {
        if (data.error) {
            console.error('Failed to fetch:', data.url, data.error);
        } else {
            console.log('Received data:', data);
        }
    }
}

// Async iterator with backpressure control
class AsyncDataProcessor {
    constructor(source, maxConcurrency = 3) {
        this.source = source;
        this.maxConcurrency = maxConcurrency;
    }
    
    async* process() {
        const buffer = [];
        let completed = 0;
        let index = 0;
        
        for (const item of this.source) {
            // Start processing item
            const promise = this.processItem(item, index++);
            buffer.push(promise);
            
            // If buffer is full, wait for next completion
            if (buffer.length >= this.maxConcurrency) {
                const result = await Promise.race(buffer);
                yield result;
                
                // Remove completed promise from buffer
                const completedIndex = buffer.findIndex(p => p === promise);
                buffer.splice(completedIndex, 1);
                completed++;
            }
        }
        
        // Process remaining items
        while (buffer.length > 0) {
            const result = await Promise.race(buffer);
            yield result;
            const completedIndex = buffer.findIndex(p => p.status === 'fulfilled');
            buffer.splice(completedIndex, 1);
        }
    }
    
    async processItem(item, index) {
        // Simulate async processing
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        return { item, index, processed: true };
    }
}
```

### Promise Patterns and Coordination

```javascript
// Advanced Promise coordination patterns
class PromiseCoordinator {
    // Sequential execution with results collection
    static async sequence(tasks) {
        const results = [];
        for (const task of tasks) {
            try {
                const result = await (typeof task === 'function' ? task() : task);
                results.push({ success: true, result });
            } catch (error) {
                results.push({ success: false, error: error.message });
            }
        }
        return results;
    }
    
    // Parallel execution with concurrency limit
    static async parallelLimit(tasks, limit = 3) {
        const results = [];
        const executing = [];
        
        for (const [index, task] of tasks.entries()) {
            const promise = Promise.resolve(
                typeof task === 'function' ? task() : task
            ).then(
                result => ({ index, success: true, result }),
                error => ({ index, success: false, error: error.message })
            );
            
            results.push(promise);
            executing.push(promise);
            
            if (executing.length >= limit) {
                await Promise.race(executing);
                executing.splice(0, 1);
            }
        }
        
        return Promise.all(results);
    }
    
    // Retry with exponential backoff
    static async retry(fn, options = {}) {
        const {
            maxAttempts = 3,
            baseDelay = 1000,
            maxDelay = 10000,
            backoffFactor = 2
        } = options;
        
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await fn();
            } catch (error) {
                if (attempt === maxAttempts) throw error;
                
                const delay = Math.min(
                    baseDelay * Math.pow(backoffFactor, attempt - 1),
                    maxDelay
                );
                
                console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    // Timeout wrapper
    static timeout(promise, ms) {
        return Promise.race([
            promise,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Operation timed out')), ms)
            )
        ]);
    }
}

// Usage examples
const apiCalls = [
    () => fetch('/api/users').then(r => r.json()),
    () => fetch('/api/orders').then(r => r.json()),
    () => fetch('/api/products').then(r => r.json())
];

// Execute with concurrency limit
PromiseCoordinator.parallelLimit(apiCalls, 2)
    .then(results => console.log('Parallel results:', results));

// Retry failed operations
PromiseCoordinator.retry(
    () => fetch('/api/unreliable-endpoint').then(r => r.json()),
    { maxAttempts: 3, baseDelay: 500 }
).catch(error => console.error('All retries failed:', error));
```

## State Management Patterns

### Flux/Redux Pattern Implementation

```javascript
// Action creators
const createAction = (type, payload) => ({ type, payload });

const actions = {
    addTodo: (text) => createAction('ADD_TODO', { text, id: Date.now() }),
    toggleTodo: (id) => createAction('TOGGLE_TODO', { id }),
    removeTodo: (id) => createAction('REMOVE_TODO', { id }),
    setFilter: (filter) => createAction('SET_FILTER', { filter })
};

// Reducer functions
const todosReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [...state, {
                id: action.payload.id,
                text: action.payload.text,
                completed: false
            }];
            
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
            
        case 'REMOVE_TODO':
            return state.filter(todo => todo.id !== action.payload.id);
            
        default:
            return state;
    }
};

const filterReducer = (state = 'ALL', action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.payload.filter;
        default:
            return state;
    }
};

// Root reducer
const rootReducer = (state = {}, action) => ({
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action)
});

// Store implementation
class Store {
    constructor(reducer, initialState = {}) {
        this.reducer = reducer;
        this.state = initialState;
        this.listeners = [];
    }
    
    getState() {
        return this.state;
    }
    
    dispatch(action) {
        this.state = this.reducer(this.state, action);
        this.listeners.forEach(listener => listener(this.state));
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
}

// Middleware pattern
const loggerMiddleware = (store) => (next) => (action) => {
    console.log('Dispatching:', action);
    const result = next(action);
    console.log('New state:', store.getState());
    return result;
};

const thunkMiddleware = (store) => (next) => (action) => {
    if (typeof action === 'function') {
        return action(store.dispatch, store.getState);
    }
    return next(action);
};

// Enhanced store with middleware
class EnhancedStore extends Store {
    constructor(reducer, initialState, middlewares = []) {
        super(reducer, initialState);
        this.dispatch = this.applyMiddleware(middlewares);
    }
    
    applyMiddleware(middlewares) {
        let dispatch = (action) => {
            this.state = this.reducer(this.state, action);
            this.listeners.forEach(listener => listener(this.state));
        };
        
        const store = {
            getState: () => this.state,
            dispatch: (action) => dispatch(action)
        };
        
        middlewares.reverse().forEach(middleware => {
            dispatch = middleware(store)(dispatch);
        });
        
        return dispatch;
    }
}

// Usage
const store = new EnhancedStore(
    rootReducer,
    { todos: [], filter: 'ALL' },
    [loggerMiddleware, thunkMiddleware]
);

// Async action creator (thunk)
const fetchTodos = () => async (dispatch, getState) => {
    try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        todos.forEach(todo => dispatch(actions.addTodo(todo.text)));
    } catch (error) {
        console.error('Failed to fetch todos:', error);
    }
};

store.subscribe(state => console.log('State updated:', state));
store.dispatch(actions.addTodo('Learn Redux'));
store.dispatch(fetchTodos());
```

### Observable Pattern (RxJS-style)

```javascript
// Observable implementation
class Observable {
    constructor(subscribe) {
        this.subscribe = subscribe;
    }
    
    static create(subscribe) {
        return new Observable(subscribe);
    }
    
    static of(...values) {
        return new Observable(observer => {
            values.forEach(value => observer.next(value));
            observer.complete();
        });
    }
    
    static fromEvent(element, eventType) {
        return new Observable(observer => {
            const handler = (event) => observer.next(event);
            element.addEventListener(eventType, handler);
            
            return () => element.removeEventListener(eventType, handler);
        });
    }
    
    static interval(ms) {
        return new Observable(observer => {
            const id = setInterval(() => observer.next(Date.now()), ms);
            return () => clearInterval(id);
        });
    }
    
    map(fn) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => observer.next(fn(value)),
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
        });
    }
    
    filter(predicate) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => predicate(value) && observer.next(value),
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
        });
    }
    
    debounce(ms) {
        return new Observable(observer => {
            let timeoutId;
            
            return this.subscribe({
                next: value => {
                    clearTimeout(timeoutId);
                    timeoutId = setTimeout(() => observer.next(value), ms);
                },
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
        });
    }
    
    take(count) {
        return new Observable(observer => {
            let taken = 0;
            
            const subscription = this.subscribe({
                next: value => {
                    if (taken < count) {
                        observer.next(value);
                        taken++;
                        if (taken === count) {
                            observer.complete();
                            subscription && subscription();
                        }
                    }
                },
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
            
            return subscription;
        });
    }
}

// Subject implementation (Observable + Observer)
class Subject extends Observable {
    constructor() {
        super(observer => {
            this.observers.push(observer);
            return () => {
                this.observers = this.observers.filter(o => o !== observer);
            };
        });
        
        this.observers = [];
    }
    
    next(value) {
        this.observers.forEach(observer => observer.next(value));
    }
    
    error(error) {
        this.observers.forEach(observer => observer.error(error));
    }
    
    complete() {
        this.observers.forEach(observer => observer.complete());
    }
}

// Usage examples
const searchInput = document.getElementById('search');
const searchStream = Observable.fromEvent(searchInput, 'input')
    .map(event => event.target.value)
    .filter(value => value.length > 2)
    .debounce(300)
    .map(query => fetch(`/api/search?q=${query}`).then(r => r.json()));

searchStream.subscribe({
    next: resultPromise => resultPromise.then(results => console.log(results)),
    error: error => console.error('Search error:', error)
});

// Real-time data stream
const dataSubject = new Subject();

// Multiple subscribers
dataSubject.subscribe({
    next: data => console.log('Subscriber 1:', data)
});

dataSubject.subscribe({
    next: data => console.log('Subscriber 2:', data)
});

// Emit data
dataSubject.next({ type: 'user_login', userId: 123 });
dataSubject.next({ type: 'new_message', message: 'Hello!' });
```

## Memory Management and Performance Patterns

### Object Pool Pattern

```javascript
// Object pool for expensive object creation
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        this.inUse = new Set();
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        let obj;
        
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = this.createFn();
        }
        
        this.inUse.add(obj);
        return obj;
    }
    
    release(obj) {
        if (this.inUse.has(obj)) {
            this.inUse.delete(obj);
            this.resetFn(obj);
            this.pool.push(obj);
        }
    }
    
    getStats() {
        return {
            poolSize: this.pool.length,
            inUse: this.inUse.size,
            total: this.pool.length + this.inUse.size
        };
    }
}

// Example: DOM element pool
const elementPool = new ObjectPool(
    () => document.createElement('div'),
    (element) => {
        element.innerHTML = '';
        element.className = '';
        element.style.cssText = '';
    },
    20
);

// Usage in a list renderer
class VirtualListRenderer {
    constructor(container, itemHeight) {
        this.container = container;
        this.itemHeight = itemHeight;
        this.visibleElements = [];
    }
    
    render(items, startIndex, endIndex) {
        // Return unused elements to pool
        this.visibleElements.forEach(el => elementPool.release(el));
        this.visibleElements = [];
        
        // Render visible items
        for (let i = startIndex; i <= endIndex; i++) {
            const element = elementPool.acquire();
            element.textContent = items[i];
            element.style.position = 'absolute';
            element.style.top = `${i * this.itemHeight}px`;
            element.style.height = `${this.itemHeight}px`;
            
            this.container.appendChild(element);
            this.visibleElements.push(element);
        }
    }
}
```

### Lazy Loading and Memoization Patterns

```javascript
// Advanced memoization with TTL and LRU cache
class MemoizationCache {
    constructor(maxSize = 100, ttl = 60000) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }
    
    get(key) {
        const entry = this.cache.get(key);
        
        if (!entry) return undefined;
        
        // Check TTL
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(key);
            return undefined;
        }
        
        // Move to end (LRU)
        this.cache.delete(key);
        this.cache.set(key, entry);
        
        return entry.value;
    }
    
    set(key, value) {
        // Remove oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    
    clear() {
        this.cache.clear();
    }
}

// Memoization decorator
function memoize(fn, keyGenerator = (...args) => JSON.stringify(args)) {
    const cache = new MemoizationCache();
    
    const memoized = function(...args) {
        const key = keyGenerator(...args);
        let result = cache.get(key);
        
        if (result === undefined) {
            result = fn.apply(this, args);
            cache.set(key, result);
        }
        
        return result;
    };
    
    memoized.cache = cache;
    memoized.clearCache = () => cache.clear();
    
    return memoized;
}

// Lazy property initialization
class LazyProperty {
    constructor(initializer) {
        this.initializer = initializer;
        this.initialized = false;
        this.value = undefined;
    }
    
    get() {
        if (!this.initialized) {
            this.value = this.initializer();
            this.initialized = true;
        }
        return this.value;
    }
    
    reset() {
        this.initialized = false;
        this.value = undefined;
    }
}

// Usage examples
const expensiveCalculation = memoize((n) => {
    console.log(`Computing for ${n}...`);
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.random();
    }
    return result;
});

console.log(expensiveCalculation(100)); // Computed
console.log(expensiveCalculation(100)); // Cached

// Lazy-loaded configuration
class AppConfig {
    constructor() {
        this.database = new LazyProperty(() => this.loadDatabaseConfig());
        this.api = new LazyProperty(() => this.loadApiConfig());
    }
    
    loadDatabaseConfig() {
        console.log('Loading database configuration...');
        return {
            host: 'localhost',
            port: 5432,
            database: 'myapp'
        };
    }
    
    loadApiConfig() {
        console.log('Loading API configuration...');
        return {
            baseUrl: 'https://api.example.com',
            timeout: 5000,
            retries: 3
        };
    }
    
    getDatabaseConfig() {
        return this.database.get();
    }
    
    getApiConfig() {
        return this.api.get();
    }
}

const config = new AppConfig();
// Database config is only loaded when first accessed
console.log(config.getDatabaseConfig());
```

## Summary

This lesson covered advanced JavaScript patterns including:

1. **Functional Programming**: Pure functions, composition, monads
2. **Asynchronous Patterns**: Async iterators, promise coordination
3. **State Management**: Flux/Redux, Observable patterns
4. **Performance Patterns**: Object pooling, memoization, lazy loading

These patterns provide powerful tools for building scalable, maintainable JavaScript applications. Understanding when and how to apply these patterns is crucial for advanced JavaScript development.
