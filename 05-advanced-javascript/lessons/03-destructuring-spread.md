# Destructuring, Spread & Advanced Patterns

## Introduction to Destructuring

Destructuring is a JavaScript expression that allows you to extract data from arrays, objects, and nested structures into distinct variables. It provides a more concise and readable way to work with complex data structures.

### Array Destructuring

```javascript
// Basic array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, third] = numbers;

console.log(first);  // 1
console.log(second); // 2
console.log(third);  // 3

// Skipping elements
const [a, , c, , e] = numbers;
console.log(a, c, e); // 1, 3, 5

// Rest elements
const [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20, z = 30] = [1, 2];
console.log(x, y, z); // 1, 2, 30

// Swapping variables
let left = 'left';
let right = 'right';
[left, right] = [right, left];
console.log(left, right); // 'right', 'left'

// Nested array destructuring
const nested = [[1, 2], [3, 4], [5, 6]];
const [[firstInner], [, secondInner]] = nested;
console.log(firstInner, secondInner); // 1, 4
```

### Object Destructuring

```javascript
// Basic object destructuring
const person = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    address: {
        street: '123 Main St',
        city: 'Anytown',
        zipCode: '12345'
    }
};

const { name, age, email } = person;
console.log(name, age, email); // 'John Doe', 30, 'john@example.com'

// Renaming variables
const { name: fullName, age: years } = person;
console.log(fullName, years); // 'John Doe', 30

// Default values
const { name: userName, country = 'USA' } = person;
console.log(userName, country); // 'John Doe', 'USA'

// Nested object destructuring
const { address: { street, city } } = person;
console.log(street, city); // '123 Main St', 'Anytown'

// Destructuring with renaming and defaults in nested objects
const { 
    address: { 
        street: streetName, 
        state = 'Unknown' 
    } 
} = person;
console.log(streetName, state); // '123 Main St', 'Unknown'

// Rest properties
const { name: personName, ...otherInfo } = person;
console.log(personName); // 'John Doe'
console.log(otherInfo);  // { age: 30, email: 'john@example.com', address: {...} }
```

## Advanced Destructuring Patterns

### Function Parameter Destructuring

```javascript
// Destructuring function parameters
function greetUser({ name, age, country = 'Unknown' }) {
    return `Hello ${name}, age ${age} from ${country}`;
}

const user = { name: 'Alice', age: 25, city: 'New York' };
console.log(greetUser(user)); // "Hello Alice, age 25 from Unknown"

// Array parameter destructuring
function processCoordinates([x, y, z = 0]) {
    return { x, y, z };
}

console.log(processCoordinates([10, 20])); // { x: 10, y: 20, z: 0 }

// Mixed destructuring in parameters
function analyzeData({ 
    values: [min, max], 
    metadata: { source, date = new Date() } 
}) {
    return {
        range: max - min,
        source,
        date
    };
}

const data = {
    values: [5, 95],
    metadata: { source: 'API' }
};
console.log(analyzeData(data));

// Rest parameters with destructuring
function createUser({ name, email, ...preferences }) {
    return {
        id: Math.random().toString(36),
        name,
        email,
        preferences,
        createdAt: new Date()
    };
}

const newUser = createUser({
    name: 'Bob',
    email: 'bob@example.com',
    theme: 'dark',
    notifications: true,
    language: 'en'
});
console.log(newUser);
```

### Dynamic Property Destructuring

```javascript
// Computed property names in destructuring
function extractProperty(obj, propName) {
    const { [propName]: value } = obj;
    return value;
}

const config = { apiUrl: 'https://api.example.com', timeout: 5000 };
console.log(extractProperty(config, 'apiUrl')); // 'https://api.example.com'

// Dynamic destructuring with multiple properties
function extractMultipleProps(obj, ...propNames) {
    const extracted = {};
    propNames.forEach(prop => {
        const { [prop]: value } = obj;
        if (value !== undefined) {
            extracted[prop] = value;
        }
    });
    return extracted;
}

const settings = {
    theme: 'light',
    fontSize: 14,
    autoSave: true,
    language: 'en'
};

const userPrefs = extractMultipleProps(settings, 'theme', 'fontSize', 'nonexistent');
console.log(userPrefs); // { theme: 'light', fontSize: 14 }

// Conditional destructuring
function processUser(user) {
    // Check if address exists before destructuring
    const address = user.address ? user.address : {};
    const { street = 'N/A', city = 'N/A' } = address;
    
    return `${user.name} lives at ${street}, ${city}`;
}

const userWithAddress = {
    name: 'John',
    address: { street: '123 Oak St', city: 'Portland' }
};

const userWithoutAddress = { name: 'Jane' };

console.log(processUser(userWithAddress));    // "John lives at 123 Oak St, Portland"
console.log(processUser(userWithoutAddress)); // "Jane lives at N/A, N/A"
```

## Spread Operator Fundamentals

### Array Spread

```javascript
// Basic array spread
const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'spinach'];
const food = [...fruits, ...vegetables];
console.log(food); // ['apple', 'banana', 'carrot', 'spinach']

// Copying arrays
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (unchanged)
console.log(copy);     // [1, 2, 3, 4]

// Converting iterables to arrays
const str = 'hello';
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

const set = new Set([1, 2, 3, 3, 4]);
const uniqueArray = [...set];
console.log(uniqueArray); // [1, 2, 3, 4]

// Finding max/min values
const numbers = [5, 12, 8, 130, 44];
const max = Math.max(...numbers);
const min = Math.min(...numbers);
console.log(max, min); // 130, 5

// Array insertion
const middle = [4, 5, 6];
const result = [1, 2, 3, ...middle, 7, 8, 9];
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### Object Spread

```javascript
// Basic object spread
const baseConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 5000,
    retries: 3
};

const developmentConfig = {
    ...baseConfig,
    apiUrl: 'https://dev-api.example.com',
    debug: true
};

console.log(developmentConfig);
// {
//   apiUrl: 'https://dev-api.example.com',
//   timeout: 5000,
//   retries: 3,
//   debug: true
// }

// Object cloning (shallow)
const original = { a: 1, b: { c: 2 } };
const clone = { ...original };
clone.a = 10;
clone.b.c = 20;
console.log(original); // { a: 1, b: { c: 20 } } - nested object is shared!

// Deep cloning with spread (manual)
const deepClone = {
    ...original,
    b: { ...original.b }
};

// Merging multiple objects
const userDefaults = { theme: 'light', notifications: true };
const userPreferences = { theme: 'dark', fontSize: 14 };
const systemSettings = { version: '1.0', language: 'en' };

const finalConfig = {
    ...userDefaults,
    ...systemSettings,
    ...userPreferences
};
console.log(finalConfig);
// { theme: 'dark', notifications: true, version: '1.0', language: 'en', fontSize: 14 }
```

## Advanced Spread Patterns

### Function Call Spread

```javascript
// Spreading arguments to functions
function sum(a, b, c, d) {
    return a + b + c + d;
}

const numbers = [1, 2, 3, 4];
console.log(sum(...numbers)); // 10

// Variable arguments with spread
function logMessages(primary, ...messages) {
    console.log(`Primary: ${primary}`);
    messages.forEach((msg, index) => {
        console.log(`Message ${index + 1}: ${msg}`);
    });
}

logMessages('Hello', 'World', 'How', 'Are', 'You');
// Primary: Hello
// Message 1: World
// Message 2: How
// Message 3: Are
// Message 4: You

// Spreading with different data types
function createUser(name, age, ...hobbies) {
    return {
        name,
        age,
        hobbies: hobbies.flat(), // Handle nested arrays
        hobbyCount: hobbies.flat().length
    };
}

const user = createUser('Alice', 25, 'reading', ['cooking', 'hiking'], 'photography');
console.log(user);
// {
//   name: 'Alice',
//   age: 25,
//   hobbies: ['reading', 'cooking', 'hiking', 'photography'],
//   hobbyCount: 4
// }
```

### Conditional Spreading

```javascript
// Conditional object spreading
function createApiRequest(endpoint, options = {}) {
    const request = {
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        // Conditionally spread options
        ...(options.method && { method: options.method }),
        ...(options.headers && { headers: { ...request.headers, ...options.headers } }),
        ...(options.body && { body: JSON.stringify(options.body) }),
        ...(options.timeout && { timeout: options.timeout })
    };
    
    return request;
}

const getRequest = createApiRequest('/users');
const postRequest = createApiRequest('/users', {
    method: 'POST',
    body: { name: 'John' },
    headers: { 'Authorization': 'Bearer token123' }
});

console.log(getRequest);
console.log(postRequest);

// Conditional array spreading
function buildQuery(baseQuery, ...conditionalParts) {
    return [
        baseQuery,
        ...conditionalParts.filter(Boolean)
    ].join(' ');
}

const query = buildQuery(
    'SELECT * FROM users',
    true && 'WHERE active = true',
    false && 'AND age > 18',
    'ORDER BY created_at DESC'
);
console.log(query); // "SELECT * FROM users WHERE active = true ORDER BY created_at DESC"
```

## Rest Parameters Deep Dive

### Advanced Rest Parameter Patterns

```javascript
// Rest parameters in different positions
function processData(action, ...data) {
    switch (action) {
        case 'sum':
            return data.reduce((acc, num) => acc + num, 0);
        case 'concat':
            return data.join('');
        case 'max':
            return Math.max(...data);
        default:
            return data;
    }
}

console.log(processData('sum', 1, 2, 3, 4));      // 10
console.log(processData('concat', 'a', 'b', 'c')); // "abc"
console.log(processData('max', 5, 10, 3, 8));     // 10

// Rest in destructuring assignments
function analyzeScores([first, second, ...rest]) {
    return {
        top: first,
        second: second,
        others: rest,
        total: [first, second, ...rest].reduce((a, b) => a + b, 0),
        average: ([first, second, ...rest].reduce((a, b) => a + b, 0)) / (2 + rest.length)
    };
}

const scores = [95, 87, 92, 78, 89, 84];
console.log(analyzeScores(scores));

// Object rest in destructuring
function updateUser(userId, { password, ...updates }) {
    // Separate sensitive data from general updates
    const user = {
        id: userId,
        ...updates,
        updatedAt: new Date()
    };
    
    // Handle password separately
    if (password) {
        user.passwordHash = hashPassword(password);
    }
    
    return user;
}

function hashPassword(password) {
    return `hashed_${password}`;
}

const updatedUser = updateUser(123, {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secret123',
    preferences: { theme: 'dark' }
});
console.log(updatedUser);
```

### Rest Parameters vs Arguments Object

```javascript
// Traditional arguments object (avoid in modern code)
function oldStyleSum() {
    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}

// Modern rest parameters (preferred)
function modernSum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

// Rest parameters are real arrays
function demonstrateArrayMethods(...items) {
    console.log('Items:', items);
    console.log('Is array:', Array.isArray(items));
    console.log('Doubled:', items.map(x => x * 2));
    console.log('Evens:', items.filter(x => x % 2 === 0));
    
    // Arguments object would require Array.from() or Array.prototype.slice.call()
}

demonstrateArrayMethods(1, 2, 3, 4, 5);

// Rest parameters with array methods
function createStatistics(...numbers) {
    const sorted = [...numbers].sort((a, b) => a - b);
    
    return {
        count: numbers.length,
        sum: numbers.reduce((a, b) => a + b, 0),
        average: numbers.reduce((a, b) => a + b, 0) / numbers.length,
        min: Math.min(...numbers),
        max: Math.max(...numbers),
        median: sorted.length % 2 === 0 
            ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
            : sorted[Math.floor(sorted.length / 2)]
    };
}

console.log(createStatistics(4, 2, 8, 6, 3, 7, 1, 5));
```

## Practical Application Patterns

### Data Transformation Patterns

```javascript
// Complex data restructuring
const apiResponse = {
    status: 'success',
    data: {
        users: [
            { id: 1, name: 'John', profile: { age: 30, city: 'NYC' } },
            { id: 2, name: 'Jane', profile: { age: 25, city: 'LA' } },
            { id: 3, name: 'Bob', profile: { age: 35, city: 'Chicago' } }
        ],
        meta: {
            total: 3,
            page: 1,
            hasMore: false
        }
    }
};

// Extract and transform data
function transformUserData({ data: { users, meta } }) {
    return {
        users: users.map(({ id, name, profile: { age, city } }) => ({
            id,
            displayName: name.toUpperCase(),
            age,
            location: city,
            isAdult: age >= 18
        })),
        pagination: {
            ...meta,
            canLoadMore: meta.hasMore
        }
    };
}

const transformed = transformUserData(apiResponse);
console.log(transformed);

// Configuration merging pattern
class ConfigManager {
    constructor(defaults = {}) {
        this.defaults = { ...defaults };
    }
    
    createConfig(...configSources) {
        return configSources.reduce(
            (merged, source) => ({
                ...merged,
                ...source,
                // Deep merge nested objects
                ...(merged.nested && source.nested && {
                    nested: { ...merged.nested, ...source.nested }
                })
            }),
            { ...this.defaults }
        );
    }
    
    updateDefaults(newDefaults) {
        this.defaults = { ...this.defaults, ...newDefaults };
    }
}

const configManager = new ConfigManager({
    theme: 'light',
    fontSize: 14,
    nested: { feature1: true, feature2: false }
});

const userConfig = configManager.createConfig(
    { theme: 'dark' },
    { fontSize: 16, timeout: 5000 },
    { nested: { feature2: true, feature3: true } }
);

console.log(userConfig);
```

### State Management Patterns

```javascript
// Immutable state updates with spread
class StateManager {
    constructor(initialState = {}) {
        this.state = { ...initialState };
        this.listeners = [];
    }
    
    // Shallow update
    updateState(updates) {
        const previousState = { ...this.state };
        this.state = { ...this.state, ...updates };
        this.notifyListeners(previousState, this.state);
    }
    
    // Nested update
    updateNestedState(path, updates) {
        const pathArray = path.split('.');
        const newState = { ...this.state };
        
        let current = newState;
        for (let i = 0; i < pathArray.length - 1; i++) {
            current[pathArray[i]] = { ...current[pathArray[i]] };
            current = current[pathArray[i]];
        }
        
        current[pathArray[pathArray.length - 1]] = {
            ...current[pathArray[pathArray.length - 1]],
            ...updates
        };
        
        this.state = newState;
    }
    
    // Array operations
    addToArray(arrayPath, ...items) {
        const pathArray = arrayPath.split('.');
        const newState = { ...this.state };
        
        let current = newState;
        for (let i = 0; i < pathArray.length - 1; i++) {
            current[pathArray[i]] = { ...current[pathArray[i]] };
            current = current[pathArray[i]];
        }
        
        const arrayKey = pathArray[pathArray.length - 1];
        current[arrayKey] = [...(current[arrayKey] || []), ...items];
        
        this.state = newState;
    }
    
    removeFromArray(arrayPath, predicate) {
        const pathArray = arrayPath.split('.');
        const newState = { ...this.state };
        
        let current = newState;
        for (let i = 0; i < pathArray.length - 1; i++) {
            current[pathArray[i]] = { ...current[pathArray[i]] };
            current = current[pathArray[i]];
        }
        
        const arrayKey = pathArray[pathArray.length - 1];
        current[arrayKey] = (current[arrayKey] || []).filter(item => !predicate(item));
        
        this.state = newState;
    }
    
    getState() {
        return { ...this.state };
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }
    
    notifyListeners(previousState, newState) {
        this.listeners.forEach(listener => listener(newState, previousState));
    }
}

// Usage example
const stateManager = new StateManager({
    user: {
        name: 'John',
        preferences: {
            theme: 'light',
            notifications: true
        }
    },
    todos: [
        { id: 1, text: 'Learn JavaScript', done: true },
        { id: 2, text: 'Build a project', done: false }
    ]
});

// Subscribe to changes
const unsubscribe = stateManager.subscribe((newState, prevState) => {
    console.log('State changed:', { newState, prevState });
});

// Update user name
stateManager.updateNestedState('user', { name: 'Jane' });

// Update nested preferences
stateManager.updateNestedState('user.preferences', { theme: 'dark' });

// Add new todo
stateManager.addToArray('todos', { 
    id: 3, 
    text: 'Master destructuring', 
    done: false 
});

// Remove completed todos
stateManager.removeFromArray('todos', todo => todo.done);

console.log('Final state:', stateManager.getState());
```

### Error Handling with Destructuring

```javascript
// Safe destructuring with error handling
function safeDestructure(obj, pattern, defaults = {}) {
    try {
        // Create a function that performs the destructuring
        const destructureFunc = new Function('obj', 'defaults', `
            const { ${pattern} } = obj;
            return { ${pattern.split(',').map(p => p.trim().split(':')[0].trim()).join(', ')} };
        `);
        
        return { ...defaults, ...destructureFunc(obj, defaults) };
    } catch (error) {
        console.warn('Destructuring failed:', error.message);
        return defaults;
    }
}

// API response parsing with fallbacks
function parseApiResponse(response) {
    // Destructure with multiple fallback levels
    const {
        data: {
            user: {
                id = null,
                name = 'Unknown User',
                email = null,
                profile: {
                    avatar = '/default-avatar.png',
                    bio = 'No bio available',
                    settings: {
                        theme = 'light',
                        notifications = true
                    } = {}
                } = {}
            } = {}
        } = {},
        meta: {
            timestamp = new Date().toISOString(),
            version = '1.0'
        } = {}
    } = response || {};
    
    return {
        id,
        name,
        email,
        avatar,
        bio,
        settings: { theme, notifications },
        meta: { timestamp, version }
    };
}

// Test with various response formats
const completeResponse = {
    data: {
        user: {
            id: 123,
            name: 'John Doe',
            email: 'john@example.com',
            profile: {
                avatar: '/john-avatar.jpg',
                bio: 'Software developer',
                settings: {
                    theme: 'dark',
                    notifications: false
                }
            }
        }
    },
    meta: {
        timestamp: '2023-01-01T00:00:00Z',
        version: '2.0'
    }
};

const partialResponse = {
    data: {
        user: {
            id: 456,
            name: 'Jane Smith'
        }
    }
};

const emptyResponse = {};

console.log('Complete:', parseApiResponse(completeResponse));
console.log('Partial:', parseApiResponse(partialResponse));
console.log('Empty:', parseApiResponse(emptyResponse));
```

## Performance Considerations

### Memory and Performance Optimization

```javascript
// Efficient object cloning strategies
class ObjectUtils {
    // Shallow clone with spread (fast, but shallow)
    static shallowClone(obj) {
        return { ...obj };
    }
    
    // Deep clone for simple objects (no functions, dates, etc.)
    static simpleDeepClone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    
    // Selective deep clone with spread
    static selectiveDeepClone(obj, deepPaths = []) {
        const result = { ...obj };
        
        deepPaths.forEach(path => {
            const pathArray = path.split('.');
            let current = result;
            let source = obj;
            
            for (let i = 0; i < pathArray.length - 1; i++) {
                if (source[pathArray[i]] && typeof source[pathArray[i]] === 'object') {
                    current[pathArray[i]] = { ...current[pathArray[i]] };
                    current = current[pathArray[i]];
                    source = source[pathArray[i]];
                }
            }
            
            const lastKey = pathArray[pathArray.length - 1];
            if (source[lastKey] && typeof source[lastKey] === 'object') {
                if (Array.isArray(source[lastKey])) {
                    current[lastKey] = [...source[lastKey]];
                } else {
                    current[lastKey] = { ...source[lastKey] };
                }
            }
        });
        
        return result;
    }
    
    // Memory-efficient array operations
    static batchProcess(array, batchSize = 1000, processor) {
        const results = [];
        
        for (let i = 0; i < array.length; i += batchSize) {
            const batch = array.slice(i, i + batchSize);
            const processed = processor(batch);
            results.push(...processed);
        }
        
        return results;
    }
}

// Performance comparison
function performanceTest() {
    const largeObject = {
        data: Array.from({ length: 10000 }, (_, i) => ({
            id: i,
            name: `Item ${i}`,
            nested: { value: i * 2, active: i % 2 === 0 }
        })),
        meta: { total: 10000, processed: false }
    };
    
    console.time('Shallow clone');
    const shallow = ObjectUtils.shallowClone(largeObject);
    console.timeEnd('Shallow clone');
    
    console.time('Selective deep clone');
    const selective = ObjectUtils.selectiveDeepClone(largeObject, ['meta']);
    console.timeEnd('Selective deep clone');
    
    console.time('Full deep clone');
    const deep = ObjectUtils.simpleDeepClone(largeObject);
    console.timeEnd('Full deep clone');
}

// performanceTest();

// Lazy evaluation with destructuring
class LazyProcessor {
    constructor(data) {
        this.data = data;
        this.cache = new Map();
    }
    
    // Lazy destructuring with caching
    getProcessedData(fields) {
        const cacheKey = fields.sort().join(',');
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const processed = this.data.map(item => {
            const result = {};
            fields.forEach(field => {
                if (field.includes('.')) {
                    // Handle nested fields
                    const value = this.getNestedValue(item, field);
                    this.setNestedValue(result, field, value);
                } else {
                    result[field] = item[field];
                }
            });
            return result;
        });
        
        this.cache.set(cacheKey, processed);
        return processed;
    }
    
    getNestedValue(obj, path) {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    }
    
    setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((current, key) => {
            if (!current[key]) current[key] = {};
            return current[key];
        }, obj);
        target[lastKey] = value;
    }
}
```

## Common Pitfalls and Best Practices

### Destructuring Gotchas

```javascript
// ❌ Common mistakes and ✅ solutions

// 1. Destructuring undefined/null
const badData = null;

// ❌ This will throw an error
try {
    const { name } = badData; // TypeError: Cannot destructure property 'name' of 'null'
} catch (error) {
    console.log('Error:', error.message);
}

// ✅ Safe destructuring with defaults
const { name = 'Unknown' } = badData || {};
console.log(name); // 'Unknown'

// 2. Reassigning to existing variables
let x = 1;
let y = 2;

// ❌ This won't work as expected
// { x, y } = { x: 10, y: 20 }; // SyntaxError

// ✅ Wrap in parentheses for reassignment
({ x, y } = { x: 10, y: 20 });
console.log(x, y); // 10, 20

// 3. Mixed destructuring patterns
const complexData = {
    users: [
        { id: 1, details: { name: 'John', age: 30 } },
        { id: 2, details: { name: 'Jane', age: 25 } }
    ],
    meta: { total: 2 }
};

// ❌ Overly complex destructuring
// const { 
//     users: [
//         { details: { name: firstName } },
//         { details: { name: secondName } }
//     ],
//     meta: { total }
// } = complexData; // Hard to read and fragile

// ✅ Step-by-step destructuring
const { users, meta: { total } } = complexData;
const [firstUser, secondUser] = users;
const { details: { name: firstName } } = firstUser;
const { details: { name: secondName } } = secondUser;

console.log(firstName, secondName, total); // 'John', 'Jane', 2

// 4. Spread operator performance issues
const largeArray = Array.from({ length: 100000 }, (_, i) => i);

// ❌ Inefficient for large arrays
// const copy = [...largeArray]; // Creates new array in memory

// ✅ Use appropriate method for the use case
const copyForModification = largeArray.slice(); // Faster for copying
const copyForIteration = largeArray; // Use original if not modifying

// 5. Object property shorthand confusion
const createUser = (name, age) => {
    // ✅ Clear property assignment
    return {
        id: Math.random().toString(36),
        name: name,  // Explicit
        age,         // Shorthand
        createdAt: new Date()
    };
};

// 6. Rest parameter position
// ❌ Rest parameters must be last
// function badFunction(first, ...rest, last) {} // SyntaxError

// ✅ Correct rest parameter usage
function goodFunction(first, second, ...rest) {
    console.log('First:', first);
    console.log('Second:', second);
    console.log('Rest:', rest);
}

goodFunction(1, 2, 3, 4, 5); // First: 1, Second: 2, Rest: [3, 4, 5]
```

### Best Practice Patterns

```javascript
// Best practices for destructuring and spread

// 1. Use descriptive names when renaming
const apiResponse = {
    user_id: 123,
    full_name: 'John Doe',
    email_address: 'john@example.com'
};

// ✅ Rename to follow JavaScript conventions
const { 
    user_id: userId, 
    full_name: fullName, 
    email_address: email 
} = apiResponse;

// 2. Combine destructuring with validation
function processOrder({ 
    id, 
    items = [], 
    customer, 
    total,
    shipping = {} 
}) {
    // Validate required fields
    if (!id || !customer || total === undefined) {
        throw new Error('Missing required order fields');
    }
    
    // Destructure nested objects safely
    const { 
        address = {}, 
        method = 'standard' 
    } = shipping;
    
    return {
        orderId: id,
        itemCount: items.length,
        customerName: customer.name,
        orderTotal: total,
        shippingMethod: method,
        hasShippingAddress: Object.keys(address).length > 0
    };
}

// 3. Use spread for configuration objects
class ApiClient {
    constructor(baseConfig = {}) {
        this.config = {
            baseURL: 'https://api.example.com',
            timeout: 5000,
            retries: 3,
            headers: {
                'Content-Type': 'application/json'
            },
            ...baseConfig,
            // Ensure headers are properly merged
            headers: {
                'Content-Type': 'application/json',
                ...(baseConfig.headers || {})
            }
        };
    }
    
    request(endpoint, options = {}) {
        const requestConfig = {
            ...this.config,
            ...options,
            url: `${this.config.baseURL}${endpoint}`,
            headers: {
                ...this.config.headers,
                ...(options.headers || {})
            }
        };
        
        return this.makeRequest(requestConfig);
    }
    
    makeRequest(config) {
        // Simulate API request
        console.log('Making request with config:', config);
        return Promise.resolve({ data: 'response' });
    }
}

// 4. Functional composition with spread
const compose = (...functions) => (initialValue) =>
    functions.reduceRight((value, func) => func(value), initialValue);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = compose(square, double, addOne);
console.log(transform(3)); // square(double(addOne(3))) = square(double(4)) = square(8) = 64

// 5. Event handling with destructuring
class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    addEventListener(element, eventType, handler, options = {}) {
        const {
            once = false,
            passive = false,
            capture = false,
            signal = null
        } = options;
        
        const listenerOptions = {
            once,
            passive,
            capture,
            ...(signal && { signal })
        };
        
        element.addEventListener(eventType, handler, listenerOptions);
        
        // Store for cleanup
        if (!this.listeners.has(element)) {
            this.listeners.set(element, new Map());
        }
        
        this.listeners.get(element).set(eventType, { handler, options: listenerOptions });
    }
    
    removeAllListeners() {
        this.listeners.forEach((events, element) => {
            events.forEach(({ handler, options }, eventType) => {
                element.removeEventListener(eventType, handler, options);
            });
        });
        this.listeners.clear();
    }
}
```

## Summary and Advanced Techniques

### Key Takeaways

1. **Destructuring** provides clean, readable ways to extract data from complex structures
2. **Spread operator** enables immutable operations and flexible function parameters
3. **Rest parameters** offer a modern alternative to the arguments object
4. **Combined patterns** create powerful data transformation capabilities
5. **Performance considerations** matter when working with large datasets

### Advanced Applications

```javascript
// Advanced pattern: Functional lens for deep object manipulation
const lens = (path) => ({
    get: (obj) => path.split('.').reduce((current, key) => current?.[key], obj),
    set: (obj, value) => {
        const keys = path.split('.');
        const result = { ...obj };
        let current = result;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            current[key] = { ...current[key] };
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return result;
    },
    update: (obj, updater) => {
        const currentValue = lens(path).get(obj);
        const newValue = updater(currentValue);
        return lens(path).set(obj, newValue);
    }
});

// Usage example
const state = {
    user: {
        profile: {
            settings: {
                theme: 'light',
                notifications: true
            }
        }
    }
};

const themeLens = lens('user.profile.settings.theme');
const newState = themeLens.set(state, 'dark');
console.log(themeLens.get(newState)); // 'dark'

// Pattern: Immutable array operations
class ImmutableArray {
    static insert(array, index, ...items) {
        return [
            ...array.slice(0, index),
            ...items,
            ...array.slice(index)
        ];
    }
    
    static remove(array, index, count = 1) {
        return [
            ...array.slice(0, index),
            ...array.slice(index + count)
        ];
    }
    
    static replace(array, index, newItem) {
        return [
            ...array.slice(0, index),
            newItem,
            ...array.slice(index + 1)
        ];
    }
    
    static move(array, fromIndex, toIndex) {
        const item = array[fromIndex];
        const withoutItem = ImmutableArray.remove(array, fromIndex);
        return ImmutableArray.insert(withoutItem, toIndex, item);
    }
}

const originalArray = [1, 2, 3, 4, 5];
console.log(ImmutableArray.insert(originalArray, 2, 'a', 'b')); // [1, 2, 'a', 'b', 3, 4, 5]
console.log(ImmutableArray.move(originalArray, 0, 4)); // [2, 3, 4, 5, 1]
```

Mastering destructuring and spread patterns is essential for writing modern, clean, and efficient JavaScript code. These features enable powerful data manipulation while maintaining code readability and performance.
