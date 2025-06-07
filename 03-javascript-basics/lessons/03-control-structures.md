# Control Structures in JavaScript

## Conditional Statements

### if, else if, else
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

// Nested conditions
let weather = "sunny";
let temperature = 75;

if (weather === "sunny") {
    if (temperature > 70) {
        console.log("Perfect day for a picnic!");
    } else {
        console.log("Sunny but a bit cold");
    }
} else if (weather === "rainy") {
    console.log("Stay inside and read a book");
} else {
    console.log("Check the weather app");
}

// Multiple conditions with logical operators
let age = 25;
let hasLicense = true;
let hasInsurance = true;

if (age >= 18 && hasLicense && hasInsurance) {
    console.log("You can drive!");
} else {
    console.log("You cannot drive yet");
}

// OR conditions
let isWeekend = true;
let isHoliday = false;

if (isWeekend || isHoliday) {
    console.log("No work today!");
} else {
    console.log("Time to work");
}
```

### Ternary Operator
```javascript
// Basic ternary operator
let age = 20;
let canVote = age >= 18 ? "Yes" : "No";
console.log(`Can vote: ${canVote}`);

// Nested ternary (use sparingly)
let score = 85;
let grade = score >= 90 ? "A" : 
           score >= 80 ? "B" : 
           score >= 70 ? "C" : 
           score >= 60 ? "D" : "F";
console.log(`Grade: ${grade}`);

// Ternary with function calls
let user = { name: "John", isAdmin: true };
let greeting = user.isAdmin ? getAdminGreeting(user.name) : getRegularGreeting(user.name);

function getAdminGreeting(name) {
    return `Welcome back, Admin ${name}!`;
}

function getRegularGreeting(name) {
    return `Hello, ${name}!`;
}

// Ternary for default values
let username = user.name || "Guest";
let displayName = username ? username : "Anonymous";
// Better: use nullish coalescing
let displayName2 = username ?? "Anonymous";
```

### Switch Statement
```javascript
let day = "monday";

switch (day.toLowerCase()) {
    case "monday":
        console.log("Start of the work week");
        break;
    case "tuesday":
    case "wednesday":
    case "thursday":
        console.log("Midweek grind");
        break;
    case "friday":
        console.log("TGIF!");
        break;
    case "saturday":
    case "sunday":
        console.log("Weekend time!");
        break;
    default:
        console.log("Invalid day");
}

// Switch with return values
function getSeasonMessage(month) {
    switch (month) {
        case 12:
        case 1:
        case 2:
            return "Winter is here";
        case 3:
        case 4:
        case 5:
            return "Spring has arrived";
        case 6:
        case 7:
        case 8:
            return "Summer vibes";
        case 9:
        case 10:
        case 11:
            return "Autumn colors";
        default:
            return "Invalid month";
    }
}

console.log(getSeasonMessage(7)); // "Summer vibes"

// Switch with expressions (modern approach)
function getGradeMessage(grade) {
    switch (grade) {
        case "A": return "Excellent work!";
        case "B": return "Good job!";
        case "C": return "You can do better";
        case "D": return "Need improvement";
        case "F": return "Please see instructor";
        default: return "Invalid grade";
    }
}
```

## Loops

### for Loop
```javascript
// Basic for loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// Counting down
for (let i = 10; i >= 0; i--) {
    console.log(`Countdown: ${i}`);
}

// Step by different amounts
for (let i = 0; i <= 20; i += 2) {
    console.log(`Even number: ${i}`);
}

// Iterating through arrays
let fruits = ["apple", "banana", "orange", "grape"];

for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit ${i + 1}: ${fruits[i]}`);
}

// Nested loops - multiplication table
for (let i = 1; i <= 5; i++) {
    let row = "";
    for (let j = 1; j <= 5; j++) {
        row += `${i * j}\t`;
    }
    console.log(row);
}

// Loop with conditions
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
    }
}
console.log(evenNumbers); // [2, 4, 6, 8, 10]
```

### while Loop
```javascript
// Basic while loop
let count = 0;
while (count < 5) {
    console.log(`Count is: ${count}`);
    count++;
}

// User input simulation
let userInput = "";
let attempts = 0;
const maxAttempts = 3;

while (userInput !== "quit" && attempts < maxAttempts) {
    userInput = prompt("Enter 'quit' to exit:");
    attempts++;
    
    if (userInput !== "quit") {
        console.log(`Attempt ${attempts}: You entered ${userInput}`);
    }
}

// Processing until condition is met
let balance = 1000;
let interestRate = 0.05;
let years = 0;

while (balance < 2000) {
    balance = balance * (1 + interestRate);
    years++;
    console.log(`Year ${years}: $${balance.toFixed(2)}`);
}

console.log(`It took ${years} years to double the money`);

// Random number guessing game
let targetNumber = Math.floor(Math.random() * 10) + 1;
let guess = 0;
let guessCount = 0;

while (guess !== targetNumber) {
    guess = Math.floor(Math.random() * 10) + 1;
    guessCount++;
    console.log(`Guess ${guessCount}: ${guess}`);
}

console.log(`Found the number ${targetNumber} in ${guessCount} guesses!`);
```

### do...while Loop
```javascript
// Basic do...while - executes at least once
let number;
do {
    number = Math.floor(Math.random() * 10);
    console.log(`Generated number: ${number}`);
} while (number !== 7);

console.log("Finally got 7!");

// Menu system example
let choice;
do {
    console.log("\n--- Menu ---");
    console.log("1. View Profile");
    console.log("2. Edit Profile");
    console.log("3. Settings");
    console.log("4. Exit");
    
    choice = parseInt(prompt("Enter your choice (1-4):"));
    
    switch (choice) {
        case 1:
            console.log("Viewing profile...");
            break;
        case 2:
            console.log("Editing profile...");
            break;
        case 3:
            console.log("Opening settings...");
            break;
        case 4:
            console.log("Goodbye!");
            break;
        default:
            console.log("Invalid choice. Please try again.");
    }
} while (choice !== 4);

// Validation loop
let password;
let isValidPassword;

do {
    password = prompt("Enter a password (at least 8 characters):");
    isValidPassword = password && password.length >= 8;
    
    if (!isValidPassword) {
        console.log("Password must be at least 8 characters long.");
    }
} while (!isValidPassword);

console.log("Password accepted!");
```

### for...of Loop (Arrays and Iterables)
```javascript
let fruits = ["apple", "banana", "orange"];

// Iterate over array values
for (let fruit of fruits) {
    console.log(`I love ${fruit}s`);
}

// With index using entries()
for (let [index, fruit] of fruits.entries()) {
    console.log(`${index + 1}. ${fruit}`);
}

// Iterate over strings
let message = "Hello";
for (let char of message) {
    console.log(char);
}

// Iterate over Maps
let userMap = new Map([
    ["john", { age: 30, city: "New York" }],
    ["jane", { age: 25, city: "Boston" }],
    ["bob", { age: 35, city: "Chicago" }]
]);

for (let [username, userData] of userMap) {
    console.log(`${username}: ${userData.age} years old, lives in ${userData.city}`);
}

// Iterate over Sets
let uniqueNumbers = new Set([1, 2, 3, 2, 1, 4, 5]);
for (let number of uniqueNumbers) {
    console.log(number); // 1, 2, 3, 4, 5
}
```

### for...in Loop (Object Properties)
```javascript
let person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    profession: "Developer"
};

// Iterate over object properties
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Check if property belongs to object (not inherited)
for (let key in person) {
    if (person.hasOwnProperty(key)) {
        console.log(`Own property - ${key}: ${person[key]}`);
    }
}

// Get all keys, values, or entries
console.log(Object.keys(person));    // ["name", "age", "city", "profession"]
console.log(Object.values(person));  // ["John Doe", 30, "New York", "Developer"]
console.log(Object.entries(person)); // [["name", "John Doe"], ["age", 30], ...]

// Modern approach with Object.entries()
for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// Iterating over array indices (not recommended)
let numbers = [10, 20, 30];
for (let index in numbers) {
    console.log(`Index ${index}: ${numbers[index]}`);
}
// Better to use for...of or traditional for loop for arrays
```

## Loop Control Statements

### break Statement
```javascript
// Break out of loop early
for (let i = 0; i < 10; i++) {
    if (i === 5) {
        console.log("Breaking at 5");
        break;
    }
    console.log(i);
}

// Finding first match
let names = ["Alice", "Bob", "Charlie", "David"];
let targetName = "Charlie";
let foundIndex = -1;

for (let i = 0; i < names.length; i++) {
    if (names[i] === targetName) {
        foundIndex = i;
        break; // Stop searching once found
    }
}

console.log(foundIndex !== -1 ? `Found ${targetName} at index ${foundIndex}` : "Not found");

// Break in nested loops
outerLoop: for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log("Breaking out of both loops");
            break outerLoop; // Break outer loop
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}
```

### continue Statement
```javascript
// Skip current iteration
for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
        continue; // Skip even numbers
    }
    console.log(`Odd number: ${i}`);
}

// Processing array with conditions
let scores = [85, 92, 67, 88, 95, 78];
let passingGrades = [];

for (let score of scores) {
    if (score < 70) {
        console.log(`Failing grade: ${score}`);
        continue; // Skip to next score
    }
    
    passingGrades.push(score);
    console.log(`Passing grade: ${score}`);
}

// Continue in while loop
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let i = 0;

while (i < numbers.length) {
    let current = numbers[i];
    i++;
    
    if (current % 3 === 0) {
        console.log(`Skipping multiple of 3: ${current}`);
        continue;
    }
    
    console.log(`Processing: ${current}`);
}
```

## Practical Examples

### Complex Control Flow Examples
```javascript
// Grade calculator with multiple conditions
function calculateFinalGrade(homework, midterm, final, participation) {
    // Validation
    if (homework < 0 || homework > 100 || 
        midterm < 0 || midterm > 100 || 
        final < 0 || final > 100 || 
        participation < 0 || participation > 100) {
        return "Invalid scores. All scores must be between 0 and 100.";
    }
    
    // Calculate weighted average
    let weightedScore = (homework * 0.3) + (midterm * 0.3) + (final * 0.3) + (participation * 0.1);
    
    // Determine letter grade
    let letterGrade;
    if (weightedScore >= 97) letterGrade = "A+";
    else if (weightedScore >= 93) letterGrade = "A";
    else if (weightedScore >= 90) letterGrade = "A-";
    else if (weightedScore >= 87) letterGrade = "B+";
    else if (weightedScore >= 83) letterGrade = "B";
    else if (weightedScore >= 80) letterGrade = "B-";
    else if (weightedScore >= 77) letterGrade = "C+";
    else if (weightedScore >= 73) letterGrade = "C";
    else if (weightedScore >= 70) letterGrade = "C-";
    else if (weightedScore >= 67) letterGrade = "D+";
    else if (weightedScore >= 65) letterGrade = "D";
    else letterGrade = "F";
    
    return {
        weighted: weightedScore.toFixed(2),
        letter: letterGrade,
        passing: weightedScore >= 65
    };
}

// ATM simulation
function atmSimulation(initialBalance) {
    let balance = initialBalance;
    let isRunning = true;
    
    while (isRunning) {
        console.log("\n--- ATM Menu ---");
        console.log("1. Check Balance");
        console.log("2. Deposit");
        console.log("3. Withdraw");
        console.log("4. Exit");
        
        let choice = parseInt(prompt("Enter your choice (1-4):"));
        
        switch (choice) {
            case 1:
                console.log(`Your current balance is: $${balance.toFixed(2)}`);
                break;
                
            case 2:
                let depositAmount = parseFloat(prompt("Enter deposit amount:"));
                if (depositAmount > 0) {
                    balance += depositAmount;
                    console.log(`Deposited $${depositAmount.toFixed(2)}. New balance: $${balance.toFixed(2)}`);
                } else {
                    console.log("Invalid deposit amount.");
                }
                break;
                
            case 3:
                let withdrawAmount = parseFloat(prompt("Enter withdrawal amount:"));
                if (withdrawAmount > 0 && withdrawAmount <= balance) {
                    balance -= withdrawAmount;
                    console.log(`Withdrew $${withdrawAmount.toFixed(2)}. New balance: $${balance.toFixed(2)}`);
                } else if (withdrawAmount > balance) {
                    console.log("Insufficient funds.");
                } else {
                    console.log("Invalid withdrawal amount.");
                }
                break;
                
            case 4:
                console.log("Thank you for using our ATM!");
                isRunning = false;
                break;
                
            default:
                console.log("Invalid choice. Please try again.");
        }
    }
    
    return balance;
}

// Number pattern generator
function generatePatterns() {
    console.log("Right triangle:");
    for (let i = 1; i <= 5; i++) {
        let pattern = "";
        for (let j = 1; j <= i; j++) {
            pattern += j + " ";
        }
        console.log(pattern);
    }
    
    console.log("\nPyramid:");
    for (let i = 1; i <= 5; i++) {
        let spaces = " ".repeat(5 - i);
        let stars = "*".repeat(2 * i - 1);
        console.log(spaces + stars);
    }
    
    console.log("\nDiamond:");
    // Upper half
    for (let i = 1; i <= 4; i++) {
        let spaces = " ".repeat(4 - i);
        let stars = "*".repeat(2 * i - 1);
        console.log(spaces + stars);
    }
    // Lower half
    for (let i = 3; i >= 1; i--) {
        let spaces = " ".repeat(4 - i);
        let stars = "*".repeat(2 * i - 1);
        console.log(spaces + stars);
    }
}

// Array search and manipulation
function processStudentData() {
    let students = [
        { name: "Alice", grade: 92, subject: "Math" },
        { name: "Bob", grade: 78, subject: "Science" },
        { name: "Charlie", grade: 85, subject: "Math" },
        { name: "David", grade: 67, subject: "English" },
        { name: "Eve", grade: 94, subject: "Science" }
    ];
    
    // Find honor roll students (grade >= 90)
    console.log("Honor Roll Students:");
    for (let student of students) {
        if (student.grade >= 90) {
            console.log(`${student.name}: ${student.grade} in ${student.subject}`);
        }
    }
    
    // Calculate average by subject
    let subjectTotals = {};
    let subjectCounts = {};
    
    for (let student of students) {
        if (!subjectTotals[student.subject]) {
            subjectTotals[student.subject] = 0;
            subjectCounts[student.subject] = 0;
        }
        subjectTotals[student.subject] += student.grade;
        subjectCounts[student.subject]++;
    }
    
    console.log("\nSubject Averages:");
    for (let subject in subjectTotals) {
        let average = subjectTotals[subject] / subjectCounts[subject];
        console.log(`${subject}: ${average.toFixed(2)}`);
    }
    
    // Find students who need help (grade < 70)
    console.log("\nStudents needing additional support:");
    let needsHelp = false;
    for (let student of students) {
        if (student.grade < 70) {
            console.log(`${student.name}: ${student.grade} in ${student.subject}`);
            needsHelp = true;
        }
    }
    
    if (!needsHelp) {
        console.log("All students are performing well!");
    }
}
```

## Exercise Challenges

1. **FizzBuzz**: Print numbers 1-100, but replace multiples of 3 with "Fizz", multiples of 5 with "Buzz", and multiples of both with "FizzBuzz"

2. **Prime Number Checker**: Write a function that determines if a number is prime

3. **Password Validator**: Create a function that validates passwords based on multiple criteria

4. **Shopping Cart Calculator**: Simulate a shopping cart with add/remove items and calculate totals with tax

5. **Simple Calculator**: Create a calculator that performs operations until user chooses to exit

```javascript
// Exercise solutions:

// 1. FizzBuzz
function fizzBuzz() {
    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}

// 2. Prime Number Checker
function isPrime(num) {
    if (num < 2) return false;
    if (num === 2) return true;
    if (num % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Test the exercises
fizzBuzz();
console.log(isPrime(17)); // true
console.log(isPrime(4));  // false
```
