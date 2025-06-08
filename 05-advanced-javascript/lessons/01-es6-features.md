# ES6+ Features and Modern JavaScript

## Introduction

ES6 (ECMAScript 2015) and subsequent versions introduced revolutionary features that transformed JavaScript development. This lesson covers essential modern JavaScript features that every developer should master.

## Let and Const Declarations

### Block Scope vs Function Scope
```javascript
// var: Function-scoped, hoisted
function oldWay() {
    if (true) {
        var x = 1;
    }
    console.log(x); // 1 - accessible outside block
}

// let/const: Block-scoped
function modernWay() {
    if (true) {
        let y = 1;
        const z = 2;
    }
    // console.log(y); // ReferenceError: y is not defined
}

// Hoisting differences
console.log(hoistedVar); // undefined (not error)
var hoistedVar = 'I am hoisted';

// console.log(notHoisted); // ReferenceError
let notHoisted = 'I cause an error';
```

### Const Deep Dive
```javascript
// Const prevents reassignment, not mutation
const user = { name: 'John', age: 30 };
user.age = 31; // ✅ Allowed - mutating object
// user = {}; // ❌ Error - reassigning variable

const numbers = [1, 2, 3];
numbers.push(4); // ✅ Allowed - mutating array
// numbers = []; // ❌ Error - reassigning variable

// For true immutability, use Object.freeze()
const immutableUser = Object.freeze({ name: 'John', age: 30 });
// immutableUser.age = 31; // Silently fails in non-strict mode
```

## Arrow Functions

### Syntax Variations
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function variations
const add1 = (a, b) => a + b;                    // Implicit return
const add2 = (a, b) => { return a + b; };       // Explicit return
const square = x => x * x;                       // Single parameter
const greet = () => 'Hello World';               // No parameters
const getObject = () => ({ name: 'John' });     // Returning object literal

// Multi-line arrow functions
const processData = (data) => {
    const processed = data.map(item => item * 2);
    const filtered = processed.filter(item => item > 10);
    return filtered;
};
```

### Lexical `this` Binding
```javascript
// Traditional function context issues
const counter = {
    count: 0,
    
    // This doesn't work as expected
    increment: function() {
        setTimeout(function() {
            this.count++; // `this` refers to window/global, not counter
            console.log(this.count);
        }, 1000);
    },
    
    // Old solution with bind
    incrementBound: function() {
        setTimeout(function() {
            this.count++;
            console.log(this.count);
        }.bind(this), 1000);
    },
    
    // Arrow function solution
    incrementArrow: function() {
        setTimeout(() => {
            this.count++; // `this` refers to counter object
            console.log(this.count);
        }, 1000);
    }
};

// Real-world example: Event handlers
class Button {
    constructor(element) {
        this.element = element;
        this.clickCount = 0;
        
        // Arrow function preserves `this`
        this.element.addEventListener('click', () => {
            this.clickCount++;
            this.updateDisplay();
        });
    }
    
    updateDisplay() {
        this.element.textContent = `Clicked ${this.clickCount} times`;
    }
}
```

## Template Literals

### Basic Template Literals
```javascript
const name = 'John';
const age = 30;

// Old string concatenation
const oldMessage = 'Hello, my name is ' + name + ' and I am ' + age + ' years old.';

// Template literal
const newMessage = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const htmlTemplate = `
    <div class="user-card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
        <p>Status: ${age >= 18 ? 'Adult' : 'Minor'}</p>
    </div>
`;

// Complex expressions
const product = { name: 'Laptop', price: 999.99 };
const discount = 0.1;
const message = `
    Product: ${product.name}
    Original Price: $${product.price}
    Discount: ${(discount * 100)}%
    Final Price: $${(product.price * (1 - discount)).toFixed(2)}
`;
```

### Tagged Template Literals
```javascript
// Custom template tag function
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? `<mark>${values[i]}</mark>` : '';
        return result + string + value;
    }, '');
}

const searchTerm = 'JavaScript';
const text = 'Learning';
const highlighted = highlight`${text} ${searchTerm} is fun!`;
// Result: "Learning <mark>JavaScript</mark> is fun!"

// SQL query builder (sanitization example)
function sql(strings, ...values) {
    return strings.reduce((query, string, i) => {
        let value = values[i];
        if (typeof value === 'string') {
            value = `'${value.replace(/'/g, "''")}'`; // Basic SQL escaping
        }
        return query + string + (value !== undefined ? value : '');
    }, '');
}

const userId = 123;
const username = "O'Connor";
const query = sql`SELECT * FROM users WHERE id = ${userId} AND name = ${username}`;
// Result: "SELECT * FROM users WHERE id = 123 AND name = 'O''Connor'"
```

## Destructuring Assignment

### Array Destructuring
```javascript
const colors = ['red', 'green', 'blue', 'yellow'];

// Basic destructuring
const [first, second] = colors;
console.log(first);  // 'red'
console.log(second); // 'green'

// Skipping elements
const [primary, , tertiary] = colors;
console.log(primary);  // 'red'
console.log(tertiary); // 'blue'

// Default values
const [a, b, c, d = 'purple'] = ['red', 'green'];
console.log(d); // 'purple'

// Rest operator
const [head, ...tail] = colors;
console.log(head); // 'red'
console.log(tail); // ['green', 'blue', 'yellow']

// Swapping variables
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y); // 2, 1

// Nested array destructuring
const matrix = [[1, 2], [3, 4]];
const [[a1, b1], [a2, b2]] = matrix;
```

### Object Destructuring
```javascript
const person = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    address: {
        street: '123 Main St',
        city: 'New York',
        zipCode: '10001'
    },
    hobbies: ['reading', 'coding', 'traveling']
};

// Basic destructuring
const { name, age } = person;

// Renaming variables
const { name: fullName, age: years } = person;

// Default values
const { phone = 'Not provided' } = person;

// Nested destructuring
const { address: { city, zipCode } } = person;

// Rest properties
const { name: personName, ...otherDetails } = person;

// Destructuring in function parameters
function greetUser({ name, age = 0 }) {
    return `Hello ${name}, you are ${age} years old`;
}

// Destructuring arrays within objects
const { hobbies: [firstHobby, ...otherHobbies] } = person;
```

## Spread and Rest Operators

### Spread Operator (...)
```javascript
// Array spreading
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Function arguments
function sum(a, b, c) {
    return a + b + c;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Copying arrays (shallow)
const original = [1, 2, 3];
const copy = [...original];

// Object spreading
const user = { name: 'John', age: 30 };
const userWithEmail = { ...user, email: 'john@example.com' };

// Overriding properties
const updatedUser = { ...user, age: 31, city: 'Boston' };

// Spreading in function calls
Math.max(...[1, 5, 3, 9, 2]); // 9

// Converting NodeList to Array
const elements = [...document.querySelectorAll('.item')];
```

### Rest Parameters
```javascript
// Rest parameters in functions
function multiply(multiplier, ...numbers) {
    return numbers.map(num => num * multiplier);
}

multiply(2, 1, 2, 3, 4); // [2, 4, 6, 8]

// Rest with destructuring
function processOrder({ item, quantity = 1, ...options }) {
    console.log('Item:', item);
    console.log('Quantity:', quantity);
    console.log('Options:', options);
}

processOrder({
    item: 'Laptop',
    quantity: 2,
    color: 'Silver',
    warranty: '2 years'
});
```

## Enhanced Object Literals

### Shorthand Properties and Methods
```javascript
const name = 'John';
const age = 30;

// Old syntax
const oldObject = {
    name: name,
    age: age,
    greet: function() {
        return 'Hello!';
    }
};

// Enhanced object literals
const newObject = {
    name,        // Shorthand property
    age,         // Shorthand property
    greet() {    // Method shorthand
        return 'Hello!';
    },
    // Arrow function property
    sayBye: () => 'Goodbye!'
};
```

### Computed Property Names
```javascript
const prefix = 'user';
const id = 123;

const dynamicObject = {
    [prefix + 'Name']: 'John',
    [prefix + 'Id']: id,
    [`${prefix}_active`]: true,
    [Symbol.iterator]: function*() {
        yield this.userName;
        yield this.userId;
        yield this.user_active;
    }
};

// Dynamic property creation
function createObject(key, value) {
    return {
        [key]: value,
        [`${key}_timestamp`]: Date.now()
    };
}

const result = createObject('data', 'important value');
// { data: 'important value', data_timestamp: 1699123456789 }
```

## Modules (Import/Export)

### Named Exports and Imports
```javascript
// math.js - Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// Alternative export syntax
function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return b !== 0 ? a / b : null;
}

export { subtract, divide };

// Exporting with aliases
export { divide as safeDivide };
```

```javascript
// main.js - Named imports
import { add, multiply, PI } from './math.js';

// Import with aliases
import { add as sum, multiply as product } from './math.js';

// Import all as namespace
import * as MathUtils from './math.js';
console.log(MathUtils.add(5, 3));

// Selective imports
import { add } from './math.js';
```
