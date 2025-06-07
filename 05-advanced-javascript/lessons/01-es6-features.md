# ES6+ Modern JavaScript Features

## Template Literals

```javascript
// Old way
const name = "John";
const age = 30;
const message = "Hello, my name is " + name + " and I am " + age + " years old.";

// ES6 way
const message = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
const html = `
    <div class="card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
    </div>
`;

// Expression evaluation
const price = 19.99;
const tax = 0.08;
const total = `Total: $${(price * (1 + tax)).toFixed(2)}`;
```

## Enhanced Object Literals

```javascript
const name = "John";
const age = 30;

// Shorthand property names
const person = { name, age }; // Same as { name: name, age: age }

// Method shorthand
const calculator = {
    add(a, b) { return a + b; }, // Same as add: function(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
};

// Computed property names
const property = "dynamicKey";
const obj = {
    [property]: "value",
    [`${property}Modified`]: "modified value"
};
```

## Default Parameters

```javascript
// Old way
function greet(name, greeting) {
    name = name || "Guest";
    greeting = greeting || "Hello";
    return greeting + ", " + name + "!";
}

// ES6 way
function greet(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// With expressions
function createUser(name, role = "user", id = Date.now()) {
    return { name, role, id };
}

// Destructured defaults
function processOptions({ color = "blue", size = "medium" } = {}) {
    return { color, size };
}
```

## Rest and Spread Operators

### Rest Parameters
```javascript
// Collect remaining arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4); // 10

// Rest with other parameters
function logMessage(level, ...messages) {
    console.log(`[${level}]`, ...messages);
}
```

### Spread Operator
```javascript
// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// Function calls
const numbers = [1, 2, 3];
console.log(Math.max(...numbers)); // Same as Math.max(1, 2, 3)

// Copying arrays/objects
const originalArray = [1, 2, 3];
const copiedArray = [...originalArray];

const originalObject = { name: "John", age: 30 };
const copiedObject = { ...originalObject };
```

## Array Methods

### find() and findIndex()
```javascript
const users = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
    { id: 3, name: "Bob", active: true }
];

const activeUser = users.find(user => user.active); // First active user
const inactiveIndex = users.findIndex(user => !user.active); // Index of first inactive user
```

### includes()
```javascript
const fruits = ["apple", "banana", "orange"];
console.log(fruits.includes("banana")); // true
console.log(fruits.includes("grape")); // false

// With strings
const text = "Hello World";
console.log(text.includes("World")); // true
```

### Array.from()
```javascript
// Convert string to array
const letters = Array.from("hello"); // ["h", "e", "l", "l", "o"]

// Convert NodeList to array
const divs = Array.from(document.querySelectorAll("div"));

// With mapping function
const squares = Array.from({ length: 5 }, (_, i) => i * i); // [0, 1, 4, 9, 16]
```

## Object Methods

### Object.assign()
```javascript
const target = { a: 1 };
const source1 = { b: 2 };
const source2 = { c: 3 };

const result = Object.assign(target, source1, source2);
// target is now { a: 1, b: 2, c: 3 }

// Creating new object (don't mutate target)
const newObj = Object.assign({}, target, source1, source2);
```

### Object.keys(), Object.values(), Object.entries()
```javascript
const person = { name: "John", age: 30, city: "New York" };

const keys = Object.keys(person); // ["name", "age", "city"]
const values = Object.values(person); // ["John", 30, "New York"]
const entries = Object.entries(person); // [["name", "John"], ["age", 30], ["city", "New York"]]

// Useful for iteration
Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
});
```

## Let and Const

```javascript
// Block scoping
if (true) {
    let blockScoped = "I'm block scoped";
    const alsoBlockScoped = "Me too";
    var functionScoped = "I'm function scoped";
}

// console.log(blockScoped); // ReferenceError
// console.log(alsoBlockScoped); // ReferenceError
console.log(functionScoped); // "I'm function scoped"

// Const with objects/arrays
const person = { name: "John" };
person.name = "Jane"; // OK - modifying property
person.age = 30; // OK - adding property
// person = {}; // Error - can't reassign

const numbers = [1, 2, 3];
numbers.push(4); // OK - modifying array
// numbers = []; // Error - can't reassign
```

## For...of and For...in Loops

```javascript
const fruits = ["apple", "banana", "orange"];

// For...of (values)
for (const fruit of fruits) {
    console.log(fruit); // apple, banana, orange
}

// For...in (indices/keys)
for (const index in fruits) {
    console.log(index, fruits[index]); // 0 apple, 1 banana, 2 orange
}

// With objects
const person = { name: "John", age: 30 };

for (const key in person) {
    console.log(key, person[key]); // name John, age 30
}

// For...of with entries
for (const [index, fruit] of fruits.entries()) {
    console.log(index, fruit); // 0 apple, 1 banana, 2 orange
}
```

## Exercise

Refactor legacy JavaScript code to use modern ES6+ features:

```javascript
// Legacy code to refactor
function processUsers(users, options) {
    options = options || {};
    var activeOnly = options.activeOnly || false;
    var sortBy = options.sortBy || 'name';
    
    var result = [];
    for (var i = 0; i < users.length; i++) {
        var user = users[i];
        if (!activeOnly || user.active) {
            result.push({
                id: user.id,
                name: user.name,
                status: user.active ? 'Active' : 'Inactive'
            });
        }
    }
    
    result.sort(function(a, b) {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
    });
    
    return result;
}
```

Refactor using: arrow functions, destructuring, default parameters, array methods, template literals.
