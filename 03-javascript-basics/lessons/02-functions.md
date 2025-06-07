# Functions in JavaScript

## Function Declaration

### Basic Function Syntax
```javascript
// Function declaration
function greet(name) {
    return "Hello, " + name + "!";
}

// Calling the function
let message = greet("Alice");
console.log(message); // "Hello, Alice!"

// Functions are hoisted - can be called before declaration
sayHello(); // This works!

function sayHello() {
    console.log("Hello from a hoisted function!");
}
```

### Function with Multiple Parameters
```javascript
function calculateArea(length, width) {
    let area = length * width;
    return area;
}

// Function calls
console.log(calculateArea(5, 3)); // 15
console.log(calculateArea(10, 7)); // 70

// Functions can have no parameters
function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

console.log(getCurrentTime()); // Current time string
```

### Functions with Default Parameters
```javascript
function greetUser(name = "Guest", greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

console.log(greetUser()); // "Hello, Guest!"
console.log(greetUser("Alice")); // "Hello, Alice!"
console.log(greetUser("Bob", "Hi")); // "Hi, Bob!"

// Complex default values
function createUser(name, age = 18, role = "user") {
    return {
        name: name,
        age: age,
        role: role,
        id: Date.now() // Generate unique ID
    };
}

let user1 = createUser("Alice");
let user2 = createUser("Bob", 25, "admin");
console.log(user1); // { name: "Alice", age: 18, role: "user", id: 1701234567890 }
console.log(user2); // { name: "Bob", age: 25, role: "admin", id: 1701234567891 }
```

## Function Expressions

### Basic Function Expression
```javascript
// Function expression - assigned to variable
let multiply = function(a, b) {
    return a * b;
};

console.log(multiply(4, 5)); // 20

// Function expressions are NOT hoisted
// console.log(subtract(10, 3)); // Error: Cannot access 'subtract' before initialization

let subtract = function(a, b) {
    return a - b;
};

console.log(subtract(10, 3)); // 7
```

### Named Function Expressions
```javascript
let factorial = function fact(n) {
    if (n <= 1) {
        return 1;
    }
    return n * fact(n - 1); // Can reference itself by name
};

console.log(factorial(5)); // 120

// The name 'fact' is only available inside the function
// console.log(fact(3)); // Error: fact is not defined
```

## Arrow Functions (ES6+)

### Basic Arrow Function Syntax
```javascript
// Traditional function
function add(a, b) {
    return a + b;
}

// Arrow function - concise syntax
let add = (a, b) => {
    return a + b;
};

// Even more concise (implicit return)
let add = (a, b) => a + b;

// Single parameter (parentheses optional)
let square = x => x * x;
let square = (x) => x * x; // Also valid

// No parameters
let getRandomNumber = () => Math.random();

// Multiple statements require braces and explicit return
let processData = (data) => {
    let processed = data.map(item => item * 2);
    let filtered = processed.filter(item => item > 10);
    return filtered;
};
```

### Arrow Functions vs Regular Functions
```javascript
// 'this' binding difference
let person = {
    name: "Alice",
    
    // Regular function - 'this' refers to person object
    greet: function() {
        console.log("Hello, I'm " + this.name);
    },
    
    // Arrow function - 'this' inherits from surrounding scope
    greetArrow: () => {
        console.log("Hello, I'm " + this.name); // 'this' is undefined or window
    },
    
    // Practical use of arrow functions
    friends: ["Bob", "Charlie"],
    greetFriends: function() {
        this.friends.forEach((friend) => {
            // Arrow function preserves 'this' from greetFriends
            console.log(this.name + " says hello to " + friend);
        });
    }
};

person.greet(); // "Hello, I'm Alice"
person.greetArrow(); // "Hello, I'm undefined"
person.greetFriends(); // "Alice says hello to Bob", "Alice says hello to Charlie"
```

## Function Scope and Closures

### Local vs Global Scope
```javascript
let globalVariable = "I'm global";

function outerFunction() {
    let outerVariable = "I'm in outer function";
    
    function innerFunction() {
        let innerVariable = "I'm in inner function";
        
        // Inner function has access to all outer variables
        console.log(globalVariable); // Accessible
        console.log(outerVariable); // Accessible
        console.log(innerVariable); // Accessible
    }
    
    innerFunction();
    
    // console.log(innerVariable); // Error: not accessible here
}

outerFunction();
// console.log(outerVariable); // Error: not accessible here
```

### Closures
```javascript
function createCounter() {
    let count = 0; // Private variable
    
    return function() {
        count++; // Closure maintains access to count
        return count;
    };
}

let counter1 = createCounter();
let counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (independent counter)
console.log(counter1()); // 3

// Practical closure example: Module pattern
function bankAccount(initialBalance) {
    let balance = initialBalance;
    
    return {
        deposit: function(amount) {
            if (amount > 0) {
                balance += amount;
                return balance;
            }
            return "Invalid amount";
        },
        
        withdraw: function(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return balance;
            }
            return "Insufficient funds or invalid amount";
        },
        
        getBalance: function() {
            return balance;
        }
    };
}

let myAccount = bankAccount(100);
console.log(myAccount.getBalance()); // 100
console.log(myAccount.deposit(50)); // 150
console.log(myAccount.withdraw(30)); // 120
// console.log(balance); // Error: balance is private
```

## Higher-Order Functions

### Functions as Parameters
```javascript
function processArray(array, callback) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callback(array[i]));
    }
    return result;
}

let numbers = [1, 2, 3, 4, 5];

// Using named functions
function double(x) {
    return x * 2;
}

function square(x) {
    return x * x;
}

let doubled = processArray(numbers, double);
let squared = processArray(numbers, square);

console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]

// Using anonymous functions
let cubed = processArray(numbers, function(x) {
    return x * x * x;
});

// Using arrow functions
let halved = processArray(numbers, x => x / 2);

console.log(cubed); // [1, 8, 27, 64, 125]
console.log(halved); // [0.5, 1, 1.5, 2, 2.5]
```

### Functions Returning Functions
```javascript
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

let double = createMultiplier(2);
let triple = createMultiplier(3);
let tenTimes = createMultiplier(10);

console.log(double(5)); // 10
console.log(triple(4)); // 12
console.log(tenTimes(3)); // 30

// Practical example: Event handler factory
function createClickHandler(message) {
    return function(event) {
        console.log(message);
        console.log("Clicked element:", event.target);
    };
}

// Usage (in browser environment)
// document.getElementById("button1").addEventListener("click", createClickHandler("Button 1 clicked!"));
// document.getElementById("button2").addEventListener("click", createClickHandler("Button 2 clicked!"));
```

## Built-in Array Methods (Higher-Order Functions)

### forEach
```javascript
let fruits = ["apple", "banana", "orange"];

// Traditional for loop
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}

// Using forEach
fruits.forEach(function(fruit, index) {
    console.log(index + ": " + fruit);
});

// With arrow function
fruits.forEach((fruit, index) => console.log(`${index}: ${fruit}`));
```

### map
```javascript
let numbers = [1, 2, 3, 4, 5];

// Create new array with transformed values
let doubled = numbers.map(function(number) {
    return number * 2;
});

let squared = numbers.map(number => number * number);

console.log(numbers); // [1, 2, 3, 4, 5] (original unchanged)
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(squared); // [1, 4, 9, 16, 25]

// Transforming objects
let users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 }
];

let userNames = users.map(user => user.name);
let userAges = users.map(user => user.age);

console.log(userNames); // ["Alice", "Bob", "Charlie"]
console.log(userAges); // [25, 30, 35]
```

### filter
```javascript
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Filter even numbers
let evenNumbers = numbers.filter(function(number) {
    return number % 2 === 0;
});

// Filter numbers greater than 5
let bigNumbers = numbers.filter(number => number > 5);

console.log(evenNumbers); // [2, 4, 6, 8, 10]
console.log(bigNumbers); // [6, 7, 8, 9, 10]

// Filtering objects
let products = [
    { name: "Laptop", price: 1000, inStock: true },
    { name: "Phone", price: 500, inStock: false },
    { name: "Tablet", price: 300, inStock: true },
    { name: "Watch", price: 200, inStock: true }
];

let availableProducts = products.filter(product => product.inStock);
let expensiveProducts = products.filter(product => product.price > 400);

console.log(availableProducts); // Laptop, Tablet, Watch
console.log(expensiveProducts); // Laptop, Phone
```

### reduce
```javascript
let numbers = [1, 2, 3, 4, 5];

// Sum all numbers
let sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);

// More concise
let sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log(sum); // 15

// Find maximum value
let max = numbers.reduce((acc, curr) => curr > acc ? curr : acc);
console.log(max); // 5

// Count occurrences
let letters = ['a', 'b', 'a', 'c', 'b', 'a'];
let letterCount = letters.reduce((acc, letter) => {
    acc[letter] = (acc[letter] || 0) + 1;
    return acc;
}, {});

console.log(letterCount); // { a: 3, b: 2, c: 1 }

// Group objects by property
let students = [
    { name: "Alice", grade: "A" },
    { name: "Bob", grade: "B" },
    { name: "Charlie", grade: "A" },
    { name: "David", grade: "C" }
];

let groupedByGrade = students.reduce((acc, student) => {
    if (!acc[student.grade]) {
        acc[student.grade] = [];
    }
    acc[student.grade].push(student.name);
    return acc;
}, {});

console.log(groupedByGrade); // { A: ["Alice", "Charlie"], B: ["Bob"], C: ["David"] }
```

## Recursion

### Basic Recursion
```javascript
function factorial(n) {
    // Base case
    if (n <= 1) {
        return 1;
    }
    
    // Recursive case
    return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)

// Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8 (0, 1, 1, 2, 3, 5, 8)
```

### Practical Recursion Examples
```javascript
// Count down timer
function countdown(number) {
    console.log(number);
    
    if (number > 0) {
        countdown(number - 1);
    } else {
        console.log("Blast off!");
    }
}

countdown(5); // 5, 4, 3, 2, 1, 0, Blast off!

// Sum array elements recursively
function sumArray(arr, index = 0) {
    // Base case
    if (index >= arr.length) {
        return 0;
    }
    
    // Recursive case
    return arr[index] + sumArray(arr, index + 1);
}

let numbers = [1, 2, 3, 4, 5];
console.log(sumArray(numbers)); // 15

// Tree traversal example
let family = {
    name: "John",
    children: [
        {
            name: "Alice",
            children: [
                { name: "Charlie", children: [] },
                { name: "David", children: [] }
            ]
        },
        {
            name: "Bob",
            children: [
                { name: "Eve", children: [] }
            ]
        }
    ]
};

function printFamilyTree(person, depth = 0) {
    let indent = "  ".repeat(depth);
    console.log(indent + person.name);
    
    person.children.forEach(child => {
        printFamilyTree(child, depth + 1);
    });
}

printFamilyTree(family);
// John
//   Alice
//     Charlie
//     David
//   Bob
//     Eve
```

## Function Best Practices

### Pure Functions
```javascript
// Pure function - same input always produces same output, no side effects
function add(a, b) {
    return a + b;
}

function multiply(x, y) {
    return x * y;
}

// Impure function - depends on external state
let tax = 0.1;
function calculateTotal(price) {
    return price + (price * tax); // Depends on external variable
}

// Better - pure function
function calculateTotal(price, taxRate) {
    return price + (price * taxRate);
}
```

### Single Responsibility
```javascript
// Bad - function does too many things
function processUser(userData) {
    // Validate data
    if (!userData.name || !userData.email) {
        throw new Error("Invalid user data");
    }
    
    // Transform data
    userData.name = userData.name.trim().toLowerCase();
    
    // Save to database
    saveToDatabase(userData);
    
    // Send email
    sendWelcomeEmail(userData.email);
    
    return userData;
}

// Better - separate concerns
function validateUser(userData) {
    if (!userData.name || !userData.email) {
        throw new Error("Invalid user data");
    }
    return true;
}

function normalizeUser(userData) {
    return {
        ...userData,
        name: userData.name.trim().toLowerCase(),
        email: userData.email.toLowerCase()
    };
}

function processUser(userData) {
    validateUser(userData);
    let normalizedUser = normalizeUser(userData);
    saveToDatabase(normalizedUser);
    sendWelcomeEmail(normalizedUser.email);
    return normalizedUser;
}
```

## Practical Exercise: Function Library

Create a utility library with the following functions:

```javascript
// 1. String utilities
function capitalize(str) {
    // Capitalize first letter of each word
}

function truncate(str, maxLength) {
    // Truncate string if longer than maxLength, add "..."
}

// 2. Array utilities
function chunk(array, size) {
    // Split array into chunks of specified size
}

function unique(array) {
    // Return array with unique values only
}

// 3. Number utilities
function randomBetween(min, max) {
    // Return random number between min and max
}

function roundTo(number, decimals) {
    // Round number to specified decimal places
}

// 4. Higher-order functions
function memoize(fn) {
    // Create memoized version of function (cache results)
}

function debounce(fn, delay) {
    // Create debounced version of function
}

// Test your functions
console.log(capitalize("hello world")); // "Hello World"
console.log(truncate("This is a long text", 10)); // "This is a..."
console.log(chunk([1, 2, 3, 4, 5, 6], 2)); // [[1, 2], [3, 4], [5, 6]]
console.log(unique([1, 2, 2, 3, 3, 3])); // [1, 2, 3]
console.log(randomBetween(1, 10)); // Random number between 1-10
console.log(roundTo(3.14159, 2)); // 3.14
```

### Solution Hints:
- Use string methods like `split()`, `slice()`, `charAt()`
- Array methods like `splice()`, `filter()`, `includes()`
- Math methods like `Math.random()`, `Math.round()`
- Closures for memoization and debouncing
- Consider edge cases (empty arrays, invalid inputs)
