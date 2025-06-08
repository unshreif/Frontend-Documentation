# ES6+ Features and Modern JavaScript

## Template Literals

### Basic Template Literals
```javascript
// Old way with string concatenation
let name = "Alice";
let age = 25;
let message = "Hello, my name is " + name + " and I am " + age + " years old.";

// ES6 template literals
let message = `Hello, my name is ${name} and I am ${age} years old.`;

// Multi-line strings
let htmlTemplate = `
    <div class="user-card">
        <h2>${name}</h2>
        <p>Age: ${age}</p>
        <p>Status: Active</p>
    </div>
`;

// Expression evaluation
let price = 19.99;
let quantity = 3;
let total = `Total: $${(price * quantity).toFixed(2)}`;
console.log(total); // "Total: $59.97"
```

### Tagged Template Literals
```javascript
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        let value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + string + value;
    }, '');
}

let product = "Laptop";
let price = 999;
let formatted = highlight`The ${product} costs $${price}`;
console.log(formatted); // "The <strong>Laptop</strong> costs $<strong>999</strong>"

// Practical example: SQL query builder
function sql(strings, ...values) {
    return strings.reduce((query, string, i) => {
        let value = values[i];
        if (typeof value === 'string') {
            value = `'${value.replace(/'/g, "''")}'`; // Escape quotes
        }
        return query + string + (value || '');
    }, '');
}

let userId = 123;
let userName = "John O'Connor";
let query = sql`SELECT * FROM users WHERE id = ${userId} AND name = ${userName}`;
console.log(query); // "SELECT * FROM users WHERE id = 123 AND name = 'John O''Connor'"
```

## Destructuring

### Array Destructuring
```javascript
// Basic array destructuring
let colors = ["red", "green", "blue"];
let [first, second, third] = colors;
console.log(first);  // "red"
console.log(second); // "green"
console.log(third);  // "blue"

// Skipping elements
let [primary, , tertiary] = colors;
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// Default values
let [a, b, c, d = "yellow"] = colors;
console.log(d); // "yellow"

// Rest operator
let numbers = [1, 2, 3, 4, 5];
let [head, ...tail] = numbers;
console.log(head); // 1
console.log(tail); // [2, 3, 4, 5]

// Swapping variables
let x = 10;
let y = 20;
[x, y] = [y, x];
console.log(x); // 20
console.log(y); // 10

// Function return values
function getCoordinates() {
    return [100, 200];
}
let [x, y] = getCoordinates();
```

### Object Destructuring
```javascript
// Basic object destructuring
let person = {
    name: "Alice Johnson",
    age: 30,
    email: "alice@example.com",
    address: {
        street: "123 Main St",
        city: "New York",
        zipCode: "10001"
    }
};

let { name, age, email } = person;
console.log(name); // "Alice Johnson"

// Renaming variables
let { name: fullName, age: years } = person;
console.log(fullName); // "Alice Johnson"
console.log(years);    // 30

// Default values
let { name, phone = "Not provided" } = person;
console.log(phone); // "Not provided"

// Nested destructuring
let { address: { city, zipCode } } = person;
console.log(city);    // "New York"
console.log(zipCode); // "10001"

// Rest properties
let { name, ...otherInfo } = person;
console.log(otherInfo); // { age: 30, email: "alice@example.com", address: {...} }

// Function parameters
function greetUser({ name, age, email = "No email" }) {
    return `Hello ${name}, you are ${age} years old. Contact: ${email}`;
}

console.log(greetUser(person));
// "Hello Alice Johnson, you are 30 years old. Contact: alice@example.com"

// Destructuring in loops
let users = [
    { name: "Alice", role: "admin" },
    { name: "Bob", role: "user" },
    { name: "Charlie", role: "moderator" }
];

for (let { name, role } of users) {
    console.log(`${name} is a ${role}`);
}
```

## Spread and Rest Operators

### Spread Operator (...)
```javascript
// Array spreading
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Adding elements
let newArray = [0, ...arr1, 3.5, ...arr2, 7];
console.log(newArray); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copying arrays
let originalArray = [1, 2, 3];
let copiedArray = [...originalArray];
copiedArray.push(4);
console.log(originalArray); // [1, 2, 3] (unchanged)
console.log(copiedArray);   // [1, 2, 3, 4]

// Object spreading
let baseUser = { name: "John", age: 25 };
let adminUser = { ...baseUser, role: "admin", permissions: ["read", "write"] };
console.log(adminUser);
// { name: "John", age: 25, role: "admin", permissions: ["read", "write"] }

// Overriding properties
let updatedUser = { ...baseUser, age: 26, city: "New York" };
console.log(updatedUser); // { name: "John", age: 26, city: "New York" }

// Function arguments
function sum(a, b, c) {
    return a + b + c;
}

let numbers = [1, 2, 3];
console.log(sum(...numbers)); // 6

// Math functions
let scores = [95, 87, 92, 88, 94];
console.log(Math.max(...scores)); // 95
console.log(Math.min(...scores)); // 87

// Converting NodeList to Array
// let elements = [...document.querySelectorAll('.item')];
```

### Rest Parameters
```javascript
// Rest parameters in functions
function multiply(multiplier, ...numbers) {
    return numbers.map(num => num * multiplier);
}

console.log(multiply(2, 1, 2, 3, 4)); // [2, 4, 6, 8]

// Rest with destructuring
function processUser(name, age, ...otherInfo) {
    console.log(`Name: ${name}, Age: ${age}`);
    console.log("Additional info:", otherInfo);
}

processUser("Alice", 30, "Engineer", "New York", "alice@example.com");
// Name: Alice, Age: 30
// Additional info: ["Engineer", "New York", "alice@example.com"]

// Rest in object destructuring
function createProfile({ name, age, ...details }) {
    return {
        basicInfo: { name, age },
        additionalDetails: details
    };
}

let userInfo = {
    name: "Bob",
    age: 28,
    city: "Boston",
    profession: "Developer",
    hobby: "Photography"
};

console.log(createProfile(userInfo));
// {
//   basicInfo: { name: "Bob", age: 28 },
//   additionalDetails: { city: "Boston", profession: "Developer", hobby: "Photography" }
// }
```

## Enhanced Object Literals

### Property Shorthand
```javascript
// Old way
let name = "Alice";
let age = 30;
let oldWay = {
    name: name,
    age: age
};

// ES6 shorthand
let newWay = { name, age };
console.log(newWay); // { name: "Alice", age: 30 }

// Method shorthand
let calculator = {
    // Old way
    add: function(a, b) {
        return a + b;
    },
    
    // ES6 shorthand
    subtract(a, b) {
        return a - b;
    },
    
    multiply(a, b) {
        return a * b;
    }
};
```

### Computed Property Names
```javascript
let propertyName = "dynamicProperty";
let value = "dynamic value";

let obj = {
    staticProperty: "static value",
    [propertyName]: value,
    [`computed_${Date.now()}`]: "timestamp property"
};

console.log(obj);
// {
//   staticProperty: "static value",
//   dynamicProperty: "dynamic value",
//   computed_1701234567890: "timestamp property"
// }

// Practical example: Form data processing
function createFormData(fields) {
    let formData = {};
    
    fields.forEach(field => {
        formData[field.name] = field.value;
        formData[`${field.name}_valid`] = field.isValid;
    });
    
    return formData;
}

let fields = [
    { name: "email", value: "user@example.com", isValid: true },
    { name: "password", value: "123456", isValid: false }
];

console.log(createFormData(fields));
// {
//   email: "user@example.com",
//   email_valid: true,
//   password: "123456",
//   password_valid: false
// }
```

## Classes

### Basic Class Syntax
```javascript
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
    }
    
    celebrateBirthday() {
        this.age++;
        return `Happy birthday! I'm now ${this.age}.`;
    }
    
    // Getter
    get info() {
        return `${this.name} (${this.age})`;
    }
    
    // Setter
    set fullName(name) {
        this.name = name;
    }
    
    // Static method
    static createAnonymous() {
        return new Person("Anonymous", 0);
    }
}

let person = new Person("Alice", 25);
console.log(person.greet()); // "Hello, I'm Alice and I'm 25 years old."
console.log(person.info);    // "Alice (25)"

person.fullName = "Alice Johnson";
console.log(person.info);    // "Alice Johnson (25)"

let anonymous = Person.createAnonymous();
console.log(anonymous.greet()); // "Hello, I'm Anonymous and I'm 0 years old."
```

### Class Inheritance
```javascript
class Employee extends Person {
    constructor(name, age, jobTitle, salary) {
        super(name, age); // Call parent constructor
        this.jobTitle = jobTitle;
        this.salary = salary;
    }
    
    greet() {
        return `${super.greet()} I work as a ${this.jobTitle}.`;
    }
    
    getAnnualSalary() {
        return this.salary * 12;
    }
    
    promote(newTitle, salaryIncrease) {
        this.jobTitle = newTitle;
        this.salary += salaryIncrease;
        return `Congratulations! You're now a ${this.jobTitle} with salary $${this.salary}`;
    }
}

let employee = new Employee("Bob", 30, "Developer", 5000);
console.log(employee.greet());
// "Hello, I'm Bob and I'm 30 years old. I work as a Developer."

console.log(employee.promote("Senior Developer", 1000));
// "Congratulations! You're now a Senior Developer with salary $6000"

// Private fields (ES2022)
class BankAccount {
    #balance = 0; // Private field
    
    constructor(initialBalance) {
        this.#balance = initialBalance;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
            return this.#balance;
        }
        throw new Error("Deposit amount must be positive");
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this.#balance) {
            this.#balance -= amount;
            return this.#balance;
        }
        throw new Error("Invalid withdrawal amount");
    }
    
    get balance() {
        return this.#balance;
    }
}

let account = new BankAccount(1000);
console.log(account.deposit(500)); // 1500
// console.log(account.#balance);   // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

## Modules (Import/Export)

### Named Exports
```javascript
// math.js
export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14159;

// Alternative syntax
function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return b !== 0 ? a / b : null;
}

export { subtract, divide };

// Importing named exports
// main.js
import { add, multiply, PI } from './math.js';
import { subtract, divide } from './math.js';

// Import with alias
import { add as sum, multiply as product } from './math.js';

// Import all
import * as MathUtils from './math.js';
console.log(MathUtils.add(5, 3)); // 8
```

### Default Exports
```javascript
// user.js
export default class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
}

// Or
function createUser(name, email) {
    return { name, email };
}

export default createUser;

// Importing default export
// main.js
import User from './user.js';
import createUser from './user.js'; // Can use any name

let user = new User("Alice", "alice@example.com");
```

## Arrow Functions Deep Dive

### Advanced Arrow Function Patterns
```javascript
// Returning objects (wrap in parentheses)
let createUser = (name, age) => ({ name, age, id: Date.now() });

// Array methods with arrow functions
let numbers = [1, 2, 3, 4, 5];

let doubled = numbers.map(n => n * 2);
let evens = numbers.filter(n => n % 2 === 0);
let sum = numbers.reduce((acc, n) => acc + n, 0);

// Chaining array methods
let result = numbers
    .filter(n => n > 2)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0);

console.log(result); // 24 (3*2 + 4*2 + 5*2 = 6 + 8 + 10 = 24)

// Currying with arrow functions
let multiply = (a) => (b) => a * b;
let double = multiply(2);
let triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// Conditional returns
let getStatus = (age) => age >= 18 ? 'adult' : 'minor';
let formatName = (name) => name ? name.toUpperCase() : 'UNKNOWN';

// IIFE (Immediately Invoked Function Expression)
let result = ((x, y) => x + y)(5, 3);
console.log(result); // 8
```

## Default Parameters and Rest/Spread

### Advanced Default Parameters
```javascript
// Function as default parameter
function generateId() {
    return Date.now().toString();
}

function createUser(name, id = generateId()) {
    return { name, id };
}

// Default parameter using other parameters
function greetUser(name, greeting = `Hello, ${name}!`) {
    return greeting;
}

console.log(greetUser("Alice")); // "Hello, Alice!"

// Destructuring with defaults
function processOrder({ 
    item, 
    quantity = 1, 
    price, 
    discount = 0.1,
    tax = 0.08 
} = {}) {
    let subtotal = price * quantity;
    let discountAmount = subtotal * discount;
    let taxAmount = (subtotal - discountAmount) * tax;
    let total = subtotal - discountAmount + taxAmount;
    
    return {
        item,
        quantity,
        subtotal: subtotal.toFixed(2),
        discount: discountAmount.toFixed(2),
        tax: taxAmount.toFixed(2),
        total: total.toFixed(2)
    };
}

console.log(processOrder({ item: "Laptop", price: 1000 }));
// Detailed order breakdown with defaults applied
```

## Symbols and Iterators

### Symbols
```javascript
// Creating symbols
let id = Symbol('id');
let anotherId = Symbol('id');

console.log(id === anotherId); // false (symbols are always unique)

// Symbol as object property
let user = {
    name: "Alice",
    [id]: 123
};

console.log(user[id]); // 123
console.log(user.name); // "Alice"

// Well-known symbols
class Range {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    [Symbol.iterator]() {
        let current = this.start;
        let end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                }
                return { done: true };
            }
        };
    }
}

// Using custom iterator
let range = new Range(1, 5);
for (let num of range) {
    console.log(num); // 1, 2, 3, 4, 5
}

// Convert to array
let numbers = [...range]; // [1, 2, 3, 4, 5]
```

## Map and Set Collections

### Map
```javascript
// Creating and using Map
let userRoles = new Map();
userRoles.set('alice', 'admin');
userRoles.set('bob', 'user');
userRoles.set('charlie', 'moderator');

console.log(userRoles.get('alice')); // 'admin'
console.log(userRoles.has('bob'));   // true
console.log(userRoles.size);         // 3

// Map with object keys
let objKey1 = { id: 1 };
let objKey2 = { id: 2 };
let objectMap = new Map();
objectMap.set(objKey1, 'First object');
objectMap.set(objKey2, 'Second object');

// Iterating over Map
for (let [key, value] of userRoles) {
    console.log(`${key}: ${value}`);
}

// Map methods
userRoles.forEach((value, key) => {
    console.log(`${key} is a ${value}`);
});

let keys = [...userRoles.keys()];     // ['alice', 'bob', 'charlie']
let values = [...userRoles.values()]; // ['admin', 'user', 'moderator']
```

### Set
```javascript
// Creating and using Set
let uniqueNumbers = new Set([1, 2, 3, 2, 1, 4]);
console.log(uniqueNumbers); // Set { 1, 2, 3, 4 }

// Set methods
uniqueNumbers.add(5);
uniqueNumbers.add(3); // Won't be added (already exists)
console.log(uniqueNumbers.has(3)); // true
console.log(uniqueNumbers.size);   // 5

uniqueNumbers.delete(2);
console.log(uniqueNumbers); // Set { 1, 3, 4, 5 }

// Converting between Array and Set
let array = [1, 2, 2, 3, 3, 4];
let uniqueArray = [...new Set(array)]; // [1, 2, 3, 4]

// Practical example: Track visited pages
class PageTracker {
    constructor() {
        this.visitedPages = new Set();
        this.pageViews = new Map();
    }
    
    visit(page) {
        this.visitedPages.add(page);
        this.pageViews.set(page, (this.pageViews.get(page) || 0) + 1);
    }
    
    getStats() {
        return {
            uniquePages: this.visitedPages.size,
            totalViews: [...this.pageViews.values()].reduce((a, b) => a + b, 0),
            mostVisited: [...this.pageViews.entries()].sort((a, b) => b[1] - a[1])[0]
        };
    }
}

let tracker = new PageTracker();
tracker.visit('/home');
tracker.visit('/about');
tracker.visit('/home');
tracker.visit('/contact');
tracker.visit('/home');

console.log(tracker.getStats());
// { uniquePages: 3, totalViews: 5, mostVisited: ['/home', 3] }
```

## Practical Exercise: Modern JavaScript Refactoring

Refactor this ES5 code to use modern ES6+ features:

```javascript
// ES5 code to refactor
function createShoppingCart() {
    var items = [];
    var tax = 0.08;
    
    function addItem(name, price, quantity) {
        if (quantity === undefined) quantity = 1;
        var item = {
            name: name,
            price: price,
            quantity: quantity,
            id: Math.random().toString(36)
        };
        items.push(item);
    }
    
    function removeItem(id) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                items.splice(i, 1);
                break;
            }
        }
    }
    
    function getTotal() {
        var subtotal = 0;
        for (var i = 0; i < items.length; i++) {
            subtotal += items[i].price * items[i].quantity;
        }
        return subtotal * (1 + tax);
    }
    
    function getItems() {
        var result = [];
        for (var i = 0; i < items.length; i++) {
            result.push({
                name: items[i].name,
                price: items[i].price,
                quantity: items[i].quantity
            });
        }
        return result;
    }
    
    return {
        addItem: addItem,
        removeItem: removeItem,
        getTotal: getTotal,
        getItems: getItems
    };
}

// Refactor using: classes, arrow functions, default parameters,
// destructuring, spread operator, template literals, Map/Set if appropriate
```

### Solution Template:
```javascript
class ShoppingCart {
    constructor(tax = 0.08) {
        this.items = new Map();
        this.tax = tax;
    }
    
    addItem(name, price, quantity = 1) {
        // Use modern features here
    }
    
    removeItem(id) {
        // Refactor with modern syntax
    }
    
    getTotal() {
        // Use array methods and arrow functions
    }
    
    getItems() {
        // Use spread operator and destructuring
    }
    
    get summary() {
        // Use getter with template literals
    }
}
```
