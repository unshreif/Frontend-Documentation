# Operators and Control Flow

## Arithmetic Operators

```javascript
let a = 10;
let b = 3;

console.log(a + b);  // 13 (Addition)
console.log(a - b);  // 7  (Subtraction)
console.log(a * b);  // 30 (Multiplication)
console.log(a / b);  // 3.333... (Division)
console.log(a % b);  // 1  (Modulus - remainder)
console.log(a ** b); // 1000 (Exponentiation)

// Increment and Decrement
let count = 5;
count++;        // count = 6 (post-increment)
++count;        // count = 7 (pre-increment)
count--;        // count = 6 (post-decrement)
--count;        // count = 5 (pre-decrement)
```

## Assignment Operators

```javascript
let x = 10;

x += 5;   // x = x + 5  → x = 15
x -= 3;   // x = x - 3  → x = 12
x *= 2;   // x = x * 2  → x = 24
x /= 4;   // x = x / 4  → x = 6
x %= 4;   // x = x % 4  → x = 2
```

## Comparison Operators

```javascript
let a = 5;
let b = "5";
let c = 10;

// Equality (loose comparison)
console.log(a == b);   // true (converts types)
console.log(a == c);   // false

// Strict equality (no type conversion)
console.log(a === b);  // false (different types)
console.log(a === 5);  // true

// Inequality
console.log(a != b);   // false
console.log(a !== b);  // true (strict inequality)

// Relational operators
console.log(a < c);    // true
console.log(a > c);    // false
console.log(a <= 5);   // true
console.log(c >= 10);  // true
```

## Logical Operators

```javascript
let isLoggedIn = true;
let hasPermission = false;
let age = 25;

// AND (&&) - both conditions must be true
console.log(isLoggedIn && hasPermission);     // false
console.log(isLoggedIn && age >= 18);         // true

// OR (||) - at least one condition must be true
console.log(isLoggedIn || hasPermission);     // true
console.log(hasPermission || age < 18);       // false

// NOT (!) - inverts the boolean value
console.log(!isLoggedIn);      // false
console.log(!hasPermission);   // true
console.log(!(age < 18));      // true
```

## Conditional Statements

### if...else Statement

```javascript
let score = 85;

if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 80) {
    console.log("Grade: B");
} else if (score >= 70) {
    console.log("Grade: C");
} else if (score >= 60) {
    console.log("Grade: D");
} else {
    console.log("Grade: F");
}

// Ternary operator (shorthand)
let message = score >= 60 ? "Pass" : "Fail";
console.log(message);
```

### switch Statement

```javascript
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}
```

## Loops

### for Loop

```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(`Number: ${i}`);
}

// Loop through an array
let fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit ${i + 1}: ${fruits[i]}`);
}

// for...of loop (ES6)
for (let fruit of fruits) {
    console.log(fruit);
}

// for...in loop (for object properties)
let person = { name: "John", age: 30, city: "New York" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
```

### while Loop

```javascript
let count = 0;

while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// While loop with condition check
let userInput = "";
while (userInput !== "quit") {
    // In a real app, you'd get user input here
    userInput = "quit"; // Simulated input
    console.log("Processing...");
}
```

### do...while Loop

```javascript
let number = 0;

do {
    console.log(`Number: ${number}`);
    number++;
} while (number < 3);

// Executes at least once, even if condition is false
let x = 10;
do {
    console.log("This runs once");
} while (x < 5);
```

## Loop Control

```javascript
// break - exits the loop
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        break; // Exit loop when i equals 5
    }
    console.log(i); // Prints 0, 1, 2, 3, 4
}

// continue - skips current iteration
for (let i = 0; i < 5; i++) {
    if (i === 2) {
        continue; // Skip when i equals 2
    }
    console.log(i); // Prints 0, 1, 3, 4
}
```

## Practical Examples

### Grade Calculator

```javascript
function calculateGrade(scores) {
    let total = 0;
    
    for (let score of scores) {
        total += score;
    }
    
    let average = total / scores.length;
    
    if (average >= 90) return "A";
    else if (average >= 80) return "B";
    else if (average >= 70) return "C";
    else if (average >= 60) return "D";
    else return "F";
}

let studentScores = [85, 92, 78, 96, 88];
console.log(`Grade: ${calculateGrade(studentScores)}`);
```

### Number Guessing Game Logic

```javascript
let targetNumber = 7;
let guess = 5;
let attempts = 0;
let maxAttempts = 3;

while (attempts < maxAttempts && guess !== targetNumber) {
    attempts++;
    
    if (guess < targetNumber) {
        console.log("Too low!");
    } else if (guess > targetNumber) {
        console.log("Too high!");
    }
    
    // In a real game, you'd get new user input here
    guess = 7; // Simulated correct guess
}

if (guess === targetNumber) {
    console.log(`Correct! You guessed it in ${attempts} attempts.`);
} else {
    console.log(`Game over! The number was ${targetNumber}.`);
}
```

## Best Practices

1. Use strict equality (`===`) instead of loose equality (`==`)
2. Always use curly braces for code blocks, even single statements
3. Use meaningful variable names in loops
4. Avoid infinite loops - ensure loop conditions will eventually be false
5. Use `for...of` for arrays, `for...in` for objects

```javascript
// Good
const numbers = [1, 2, 3, 4, 5];
for (const number of numbers) {
    if (number % 2 === 0) {
        console.log(`${number} is even`);
    }
}

// Avoid
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 == 0) console.log(numbers[i] + " is even");
}
```

## Exercise

Create a program that:
1. Takes an array of numbers: `[12, 8, 15, 23, 7, 18, 9, 14]`
2. Uses a loop to find all even numbers
3. Uses conditional statements to categorize them as "small" (< 10) or "large" (>= 10)
4. Counts how many numbers fall into each category
5. Displays the results

Try implementing this using different types of loops!
