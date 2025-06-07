# Variables and Data Types

## Variable Declarations

### let (Block Scoped)
```javascript
let message = "Hello World";
let age = 25;
let isStudent = true;

// Variables can be reassigned
age = 26;
```

### const (Block Scoped, Immutable)
```javascript
const PI = 3.14159;
const name = "John Doe";

// This would cause an error:
// PI = 3.14; // TypeError: Assignment to constant variable
```

### var (Function Scoped - Avoid)
```javascript
var oldWay = "This is the old way";
// Avoid using var in modern JavaScript
```

## Data Types

### Primitive Types

#### String
```javascript
let firstName = "John";
let lastName = 'Doe';
let fullName = `${firstName} ${lastName}`; // Template literal

// String methods
let text = "Hello World";
console.log(text.length);        // 11
console.log(text.toUpperCase()); // "HELLO WORLD"
console.log(text.charAt(0));     // "H"
console.log(text.includes("World")); // true
```

#### Number
```javascript
let integer = 42;
let decimal = 3.14;
let negative = -10;

// Number methods
console.log(Math.round(3.7));    // 4
console.log(Math.max(1, 5, 3));  // 5
console.log(Math.random());      // Random number 0-1
```

#### Boolean
```javascript
let isActive = true;
let isComplete = false;

// Boolean conversion
console.log(Boolean(1));      // true
console.log(Boolean(0));      // false
console.log(Boolean(""));     // false
console.log(Boolean("text")); // true
```

#### undefined and null
```javascript
let undefinedVar;           // undefined
let nullVar = null;         // null

console.log(typeof undefinedVar); // "undefined"
console.log(typeof nullVar);      // "object" (this is a known quirk)
```

### Reference Types

#### Arrays
```javascript
let fruits = ["apple", "banana", "orange"];
let numbers = [1, 2, 3, 4, 5];
let mixed = [1, "hello", true, null];

// Array methods
console.log(fruits.length);        // 3
fruits.push("grape");              // Add to end
fruits.pop();                      // Remove from end
console.log(fruits[0]);            // "apple"
```

#### Objects
```javascript
let person = {
    name: "John Doe",
    age: 30,
    isStudent: false,
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

// Accessing properties
console.log(person.name);          // "John Doe"
console.log(person["age"]);        // 30
console.log(person.address.city);  // "New York"

// Adding/modifying properties
person.email = "john@example.com";
person.age = 31;
```

## Type Checking

```javascript
let name = "John";
let age = 25;
let fruits = ["apple", "banana"];
let person = { name: "John" };

console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof fruits);  // "object"
console.log(typeof person);  // "object"

// More specific checks
console.log(Array.isArray(fruits)); // true
console.log(Array.isArray(person)); // false
```

## Variable Naming Rules

```javascript
// Valid variable names
let userName = "john";
let user_name = "john";
let userName2 = "john";
let $element = document.getElementById("myDiv");
let _private = "hidden";

// Invalid variable names
// let 2name = "john";      // Can't start with number
// let user-name = "john";  // Can't contain hyphens
// let let = "reserved";    // Can't use reserved keywords
```

## Best Practices

1. Use `const` by default, `let` when reassignment is needed
2. Use descriptive variable names
3. Use camelCase for variables and functions
4. Use UPPER_CASE for constants
5. Initialize variables when declaring them

```javascript
// Good
const MAX_ATTEMPTS = 3;
let currentAttempt = 0;
const userProfile = {
    name: "John Doe",
    email: "john@example.com"
};

// Avoid
let a = 3;
let data = "John Doe";
var x = { n: "John Doe", e: "john@example.com" };
```

## Exercise

Create variables for a student profile:
1. Name (string)
2. Age (number)
3. Is enrolled (boolean)
4. Grades array with 5 numbers
5. Address object with street and city
6. Display all information using console.log
