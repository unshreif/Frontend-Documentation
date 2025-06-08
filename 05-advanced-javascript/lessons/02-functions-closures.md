# Functions and Closures

## Introduction

Functions are first-class citizens in JavaScript, meaning they can be assigned to variables, passed as arguments, returned from other functions, and have properties and methods. Understanding functions deeply, especially closures, is crucial for mastering JavaScript.

## Function Declarations vs Expressions

### Function Declarations
```javascript
// Hoisted - can be called before declaration
console.log(add(2, 3)); // Works! Returns 5

function add(a, b) {
    return a + b;
}

// Function declarations are hoisted completely
function hoistingExample() {
    console.log(typeof innerFunction); // 'function' - hoisted
    
    function innerFunction() {
        return 'I am hoisted!';
    }
}
```

### Function Expressions
```javascript
// Not hoisted - cannot be called before assignment
// console.log(subtract(5, 2)); // TypeError: subtract is not a function

const subtract = function(a, b) {
    return a - b;
};

// Named function expression (useful for debugging)
const multiply = function multiplyFunction(a, b) {
    // Can reference itself by name within the function
    if (a === 0 || b === 0) return 0;
    if (b === 1) return a;
    return a + multiplyFunction(a, b - 1); // Recursion using name
};

// Anonymous function expression
const divide = function(a, b) {
    return b !== 0 ? a / b : null;
};
```

### Arrow Functions vs Regular Functions
```javascript
// Regular function - has its own 'this', 'arguments', 'super'
function regularFunction(a, b) {
    console.log(arguments); // Arguments object available
    console.log(this);      // Context-dependent 'this'
    return a + b;
}

// Arrow function - lexical 'this', no 'arguments'
const arrowFunction = (a, b) => {
    // console.log(arguments); // ReferenceError: arguments is not defined
    console.log(this);         // Lexical 'this' from enclosing scope
    return a + b;
};

// Practical example showing the difference
const counter = {
    count: 0,
    
    // Regular method
    incrementRegular: function() {
        setTimeout(function() {
            this.count++; // 'this' refers to global/window, not counter
            console.log(this.count); // NaN or unexpected value
        }, 1000);
    },
    
    // Arrow function method  
    incrementArrow: function() {
        setTimeout(() => {
            this.count++; // 'this' refers to counter object
            console.log(this.count); // Works as expected
        }, 1000);
    }
};
```

## Understanding Closures

### What is a Closure?
A closure gives you access to an outer function's scope from an inner function. In JavaScript, closures are created every time a function is created.

```javascript
// Basic closure example
function outerFunction(x) {
    // Outer function's variable
    const outerVariable = x;
    
    // Inner function has access to outer function's variables
    function innerFunction(y) {
        console.log(outerVariable + y); // Accesses outer variable
    }
    
    return innerFunction;
}

const myClosure = outerFunction(10);
myClosure(5); // Outputs: 15

// The outer function has finished executing, but the inner function
// still has access to outerVariable through closure
```

### Practical Closure Examples

#### 1. Private Variables and Data Encapsulation
```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count,
        reset: () => count = 0
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 (independent counter)

// Cannot access count directly
// console.log(counter1.count); // undefined
```

#### 2. Module Pattern
```javascript
const calculatorModule = (function() {
    // Private variables and functions
    let result = 0;
    const history = [];
    
    function log(operation, value) {
        history.push(`${operation}: ${value}`);
    }
    
    // Public API
    return {
        add(value) {
            result += value;
            log('ADD', value);
            return this; // For method chaining
        },
        
        subtract(value) {
            result -= value;
            log('SUBTRACT', value);
            return this;
        },
        
        multiply(value) {
            result *= value;
            log('MULTIPLY', value);
            return this;
        },
        
        getResult() {
            return result;
        },
        
        getHistory() {
            return [...history]; // Return copy
        },
        
        clear() {
            result = 0;
            history.length = 0;
            return this;
        }
    };
})();

// Usage
calculatorModule
    .add(10)
    .multiply(2)
    .subtract(5);

console.log(calculatorModule.getResult()); // 15
console.log(calculatorModule.getHistory()); // ['ADD: 10', 'MULTIPLY: 2', 'SUBTRACT: 5']
```

#### 3. Function Factories
```javascript
function createValidator(type) {
    switch (type) {
        case 'email':
            return function(value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value);
            };
            
        case 'phone':
            return function(value) {
                const phoneRegex = /^\+?[\d\s-()]+$/;
                return phoneRegex.test(value) && value.replace(/\D/g, '').length >= 10;
            };
            
        case 'minLength':
            return function(minLength) {
                return function(value) {
                    return value && value.length >= minLength;
                };
            };
            
        default:
            return function() { return true; };
    }
}

// Creating specific validators
const validateEmail = createValidator('email');
const validatePhone = createValidator('phone');
const validateMinLength = createValidator('minLength');

console.log(validateEmail('user@example.com')); // true
console.log(validatePhone('+1-234-567-8900'));  // true

// Curried validator
const validatePassword = validateMinLength(8);
console.log(validatePassword('mypassword')); // true
console.log(validatePassword('123'));        // false
```

## Higher-Order Functions

Functions that operate on other functions, either by taking them as arguments or by returning them.

### Functions as Arguments
```javascript
// Basic higher-order function
function processArray(array, callback) {
    const result = [];
    for (let item of array) {
        result.push(callback(item));
    }
    return result;
}

const numbers = [1, 2, 3, 4, 5];
const doubled = processArray(numbers, x => x * 2);
const squared = processArray(numbers, x => x * x);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]

// Real-world example: Event handling system
class EventSystem {
    constructor() {
        this.listeners = new Map();
    }
    
    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    emit(event, data) {
        const callbacks = this.listeners.get(event) || [];
        callbacks.forEach(callback => callback(data));
    }
    
    // Higher-order method that returns a function
    createEventHandler(event) {
        return (data) => this.emit(event, data);
    }
}

const events = new EventSystem();
events.on('user-login', user => console.log(`Welcome ${user.name}!`));
events.on('user-login', user => console.log(`Last login: ${user.lastLogin}`));

const loginHandler = events.createEventHandler('user-login');
loginHandler({ name: 'John', lastLogin: '2023-12-07' });
```

### Functions as Return Values
```javascript
// Multiplier factory
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// Advanced: Configurable formatter
function createFormatter(config) {
    const { prefix = '', suffix = '', transform = x => x } = config;
    
    return function(value) {
        return prefix + transform(value) + suffix;
    };
}

const currencyFormatter = createFormatter({
    prefix: '$',
    transform: num => num.toFixed(2)
});

const uppercaseFormatter = createFormatter({
    suffix: '!',
    transform: str => str.toUpperCase()
});

console.log(currencyFormatter(123.456)); // '$123.46'
console.log(uppercaseFormatter('hello')); // 'HELLO!'
```

## Currying and Partial Application

### Currying
Currying transforms a function with multiple arguments into a sequence of functions, each taking a single argument.

```javascript
// Non-curried function
function add(a, b, c) {
    return a + b + c;
}

// Manual currying
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Arrow function currying (more concise)
const curriedAddArrow = a => b => c => a + b + c;

// Usage
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAddArrow(1)(2)(3)); // 6

// Generic curry function
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Using generic curry
const add3 = (a, b, c) => a + b + c;
const curriedAdd3 = curry(add3);

console.log(curriedAdd3(1)(2)(3)); // 6
console.log(curriedAdd3(1, 2)(3)); // 6
console.log(curriedAdd3(1)(2, 3)); // 6

// Practical example: API endpoint builder
const createApiCall = curry((baseUrl, endpoint, params, data) => {
    return fetch(`${baseUrl}/${endpoint}?${new URLSearchParams(params)}`, {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : null,
        headers: data ? { 'Content-Type': 'application/json' } : {}
    });
});

const apiCall = createApiCall('https://api.example.com');
const usersApi = apiCall('users');
const getUsersWithPagination = usersApi({ page: 1, limit: 10 });

// Usage
getUsersWithPagination().then(response => response.json());
```

### Partial Application
```javascript
// Partial application utility
function partial(fn, ...argsToApply) {
    return function(...remainingArgs) {
        return fn(...argsToApply, ...remainingArgs);
    };
}

// Example function
function greet(greeting, punctuation, name) {
    return `${greeting}, ${name}${punctuation}`;
}

// Partial applications
const sayHello = partial(greet, 'Hello', '!');
const askQuestion = partial(greet, 'How are you', '?');

console.log(sayHello('John')); // 'Hello, John!'
console.log(askQuestion('Jane')); // 'How are you, Jane?'

// Real-world example: Event listener helper
function addEventListener(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
    
    // Return cleanup function
    return () => element.removeEventListener(event, handler, options);
}

// Partially applied for specific event types
const addClickListener = partial(addEventListener, document.body, 'click');
const addKeyListener = partial(addEventListener, document, 'keydown');

// Usage
const removeClickHandler = addClickListener(event => {
    console.log('Body clicked!', event.target);
});

const removeKeyHandler = addKeyListener(event => {
    if (event.key === 'Escape') {
        console.log('Escape pressed!');
    }
});
```

## Function Composition

Combining simple functions to build more complex ones.

```javascript
// Simple composition
const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

// Manual composition
const addThenMultiply = (a, b, c) => multiply(add(a, b), c);
console.log(addThenMultiply(2, 3, 4)); // (2 + 3) * 4 = 20

// Generic composition utilities
const compose = (...fns) => (value) => fns.reduceRight((acc, fn) => fn(acc), value);
const pipe = (...fns) => (value) => fns.reduce((acc, fn) => fn(acc), value);

// Example functions
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

// Compose (right to left)
const composedFunction = compose(square, multiplyByTwo, addOne);
console.log(composedFunction(3)); // square(multiplyByTwo(addOne(3))) = square(8) = 64

// Pipe (left to right) - more intuitive
const pipedFunction = pipe(addOne, multiplyByTwo, square);
console.log(pipedFunction(3)); // square(multiplyByTwo(addOne(3))) = square(8) = 64

// Real-world example: Data processing pipeline
const users = [
    { name: 'John', age: 25, active: true },
    { name: 'Jane', age: 30, active: false },
    { name: 'Bob', age: 35, active: true }
];

// Individual functions
const filterActive = users => users.filter(user => user.active);
const sortByAge = users => [...users].sort((a, b) => a.age - b.age);
const getNames = users => users.map(user => user.name);
const joinWithComma = names => names.join(', ');

// Composed processing pipeline
const processUsers = pipe(
    filterActive,
    sortByAge,
    getNames,
    joinWithComma
);

console.log(processUsers(users)); // 'John, Bob'
```

## Immediately Invoked Function Expressions (IIFE)

```javascript
// Basic IIFE
(function() {
    console.log('IIFE executed immediately!');
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name}!`);
})('World');

// Arrow function IIFE
(() => {
    console.log('Arrow IIFE!');
})();

// IIFE returning a value
const result = (function(a, b) {
    return a * b;
})(5, 3);

console.log(result); // 15

// Module pattern with IIFE
const myModule = (function() {
    let privateCounter = 0;
    const privateFunction = () => console.log('Private function called');
    
    return {
        increment() {
            privateCounter++;
            privateFunction();
        },
        
        decrement() {
            privateCounter--;
            privateFunction();
        },
        
        getCount() {
            return privateCounter;
        }
    };
})();

myModule.increment();
console.log(myModule.getCount()); // 1

// IIFE for initialization
const configuredService = (function(config) {
    // Process configuration
    const processedConfig = {
        ...config,
        initialized: true,
        timestamp: Date.now()
    };
    
    // Return service with processed config
    return {
        getConfig: () => processedConfig,
        
        performAction(action) {
            console.log(`Performing ${action} with config:`, processedConfig);
        }
    };
})({ 
    apiUrl: 'https://api.example.com',
    timeout: 5000 
});
```

## Advanced Patterns

### Memoization
```javascript
// Memoization function
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit!');
            return cache.get(key);
        }
        
        console.log('Cache miss, computing...');
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive function to memoize
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log(memoizedFibonacci(40)); // Slow first time
console.log(memoizedFibonacci(40)); // Fast second time (cached)

// Advanced memoization with TTL (Time To Live)
function memoizeWithTTL(fn, ttl = 60000) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            return cached.value;
        }
        
        const result = fn.apply(this, args);
        cache.set(key, {
            value: result,
            timestamp: Date.now()
        });
        
        return result;
    };
}
```

### Debouncing and Throttling
```javascript
// Debounce: Execute after delay, reset delay on new calls
function debounce(func, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Throttle: Execute at most once per interval
function throttle(func, interval) {
    let lastCallTime = 0;
    
    return function(...args) {
        const now = Date.now();
        if (now - lastCallTime >= interval) {
            lastCallTime = now;
            return func.apply(this, args);
        }
    };
}

// Usage examples
const searchInput = document.getElementById('search');

// Debounced search - only search after user stops typing
const debouncedSearch = debounce(function(query) {
    console.log('Searching for:', query);
    // Perform search API call
}, 300);

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});

// Throttled scroll handler - limit scroll event processing
const throttledScrollHandler = throttle(function() {
    console.log('Scroll position:', window.scrollY);
    // Update UI based on scroll position
}, 100);

window.addEventListener('scroll', throttledScrollHandler);
```

## Practical Exercise: Building a Task Queue

```javascript
function createTaskQueue() {
    const tasks = [];
    let isProcessing = false;
    
    // Private function to process next task
    async function processNext() {
        if (tasks.length === 0) {
            isProcessing = false;
            return;
        }
        
        isProcessing = true;
        const { task, resolve, reject } = tasks.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        }
        
        // Process next task
        processNext();
    }
    
    return {
        // Add task to queue
        add(task) {
            return new Promise((resolve, reject) => {
                tasks.push({ task, resolve, reject });
                
                if (!isProcessing) {
                    processNext();
                }
            });
        },
        
        // Get queue status
        getStatus() {
            return {
                pending: tasks.length,
                processing: isProcessing
            };
        },
        
        // Clear all pending tasks
        clear() {
            tasks.forEach(({ reject }) => {
                reject(new Error('Task cancelled'));
            });
            tasks.length = 0;
        }
    };
}

// Usage
const taskQueue = createTaskQueue();

// Add some async tasks
taskQueue.add(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'Task 1 completed';
}).then(result => console.log(result));

taskQueue.add(async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'Task 2 completed';
}).then(result => console.log(result));

taskQueue.add(async () => {
    await new Promise(resolve => setTimeout(resolve, 750));
    return 'Task 3 completed';
}).then(result => console.log(result));

console.log(taskQueue.getStatus()); // { pending: 3, processing: false }
```

This comprehensive lesson covers the fundamental concepts of functions and closures that are essential for mastering JavaScript's functional programming capabilities.
