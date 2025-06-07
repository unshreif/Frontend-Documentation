# Control Flow and Conditional Logic

## Conditional Statements

### if Statement Deep Dive
```javascript
// Basic if statement
let temperature = 25;

if (temperature > 20) {
    console.log("It's warm outside!");
}

// Truthy and falsy values in conditions
let userInput = "";

// These values are falsy: false, 0, "", null, undefined, NaN
if (userInput) {
    console.log("User provided input");
} else {
    console.log("No input provided");
}

// Common patterns for checking values
let user = { name: "Alice", age: 30 };

// Check if property exists and has value
if (user.name && user.name.length > 0) {
    console.log(`Hello, ${user.name}!`);
}

// Check if object exists before accessing properties
if (user && user.age >= 18) {
    console.log("User is an adult");
}

// Null/undefined checking
let data = null;
if (data != null) { // Checks for both null and undefined
    console.log("Data is available");
}

// More explicit checking
if (data !== null && data !== undefined) {
    console.log("Data is definitely available");
}
```

### Complex Conditional Logic
```javascript
// Multiple conditions with logical operators
let age = 25;
let hasLicense = true;
let hasInsurance = true;
let hasVehicle = false;

// AND operator (&&) - all conditions must be true
if (age >= 18 && hasLicense && hasInsurance) {
    console.log("Eligible to drive");
}

// OR operator (||) - at least one condition must be true
if (hasVehicle || canRentVehicle()) {
    console.log("Can travel by car");
}

// NOT operator (!) - inverts boolean value
if (!hasVehicle) {
    console.log("Need to find transportation");
}

// Complex combinations
if ((age >= 18 && hasLicense) || (age >= 16 && hasParentalConsent())) {
    console.log("Can drive with conditions");
}

// Short-circuit evaluation
let userName = user && user.name && user.name.trim();
// If user is null/undefined, userName becomes null/undefined
// If user.name is empty, userName becomes empty
// Otherwise, userName gets the trimmed name

// Default values using OR
let displayName = user.displayName || user.name || "Anonymous";
```

### if-else-if Chains
```javascript
function determineGrade(score) {
    let grade;
    let message;
    
    if (score >= 90) {
        grade = "A";
        message = "Excellent work!";
    } else if (score >= 80) {
        grade = "B";
        message = "Good job!";
    } else if (score >= 70) {
        grade = "C";
        message = "Satisfactory";
    } else if (score >= 60) {
        grade = "D";
        message = "Needs improvement";
    } else {
        grade = "F";
        message = "Please see instructor";
    }
    
    return { grade, message, score };
}

// Usage examples
console.log(determineGrade(95)); // { grade: "A", message: "Excellent work!", score: 95 }
console.log(determineGrade(75)); // { grade: "C", message: "Satisfactory", score: 75 }
console.log(determineGrade(45)); // { grade: "F", message: "Please see instructor", score: 45 }

// Real-world example: User authentication levels
function getUserAccessLevel(user) {
    if (!user) {
        return { level: "none", permissions: [] };
    } else if (user.role === "admin") {
        return { 
            level: "admin", 
            permissions: ["read", "write", "delete", "manage_users"] 
        };
    } else if (user.role === "moderator") {
        return { 
            level: "moderator", 
            permissions: ["read", "write", "moderate_content"] 
        };
    } else if (user.isVerified) {
        return { 
            level: "verified_user", 
            permissions: ["read", "write"] 
        };
    } else {
        return { 
            level: "basic_user", 
            permissions: ["read"] 
        };
    }
}
```

### Ternary Operator (Conditional Operator)
```javascript
// Basic ternary syntax: condition ? valueIfTrue : valueIfFalse
let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Nested ternary operators (use sparingly)
let temperature = 15;
let weatherAdvice = temperature > 25 ? "Wear light clothes" :
                   temperature > 15 ? "Wear a jacket" :
                   temperature > 5 ? "Wear a coat" :
                   "Bundle up!";

// Better alternative for complex conditions
function getWeatherAdvice(temp) {
    if (temp > 25) return "Wear light clothes";
    if (temp > 15) return "Wear a jacket";
    if (temp > 5) return "Wear a coat";
    return "Bundle up!";
}

// Practical ternary examples
function formatUserName(user) {
    return user ? user.name.toUpperCase() : "GUEST";
}

function getUserInitials(firstName, lastName) {
    return (firstName ? firstName[0] : "") + (lastName ? lastName[0] : "");
}

// Ternary in JSX-like syntax (common in React)
function renderUserStatus(isOnline) {
    return `User is ${isOnline ? "online" : "offline"}`;
}
```

## Switch Statements

### Basic Switch Syntax
```javascript
function getDayName(dayNumber) {
    let dayName;
    
    switch (dayNumber) {
        case 0:
            dayName = "Sunday";
            break;
        case 1:
            dayName = "Monday";
            break;
        case 2:
            dayName = "Tuesday";
            break;
        case 3:
            dayName = "Wednesday";
            break;
        case 4:
            dayName = "Thursday";
            break;
        case 5:
            dayName = "Friday";
            break;
        case 6:
            dayName = "Saturday";
            break;
        default:
            dayName = "Invalid day";
    }
    
    return dayName;
}

console.log(getDayName(3)); // "Wednesday"
console.log(getDayName(7)); // "Invalid day"
```

### Advanced Switch Patterns
```javascript
// Grouping cases (fall-through behavior)
function getSeasonFromMonth(month) {
    switch (month) {
        case "December":
        case "January":
        case "February":
            return "Winter";
            
        case "March":
        case "April":
        case "May":
            return "Spring";
            
        case "June":
        case "July":
        case "August":
            return "Summer";
            
        case "September":
        case "October":
        case "November":
            return "Fall";
            
        default:
            return "Invalid month";
    }
}

// Switch with complex expressions
function processUserAction(action, user, data) {
    switch (action.type) {
        case "LOGIN":
            return authenticateUser(user.credentials);
            
        case "LOGOUT":
            return clearUserSession(user.id);
            
        case "UPDATE_PROFILE":
            if (!user.isAuthenticated) {
                throw new Error("User must be logged in");
            }
            return updateUserProfile(user.id, data);
            
        case "DELETE_ACCOUNT":
            if (!user.isAuthenticated || !user.isVerified) {
                throw new Error("Insufficient permissions");
            }
            return deleteUserAccount(user.id);
            
        default:
            console.warn(`Unknown action type: ${action.type}`);
            return null;
    }
}

// Switch vs if-else performance consideration
// Switch is generally better for many discrete values
function getHttpStatusMessage(statusCode) {
    switch (statusCode) {
        case 200: return "OK";
        case 201: return "Created";
        case 400: return "Bad Request";
        case 401: return "Unauthorized";
        case 403: return "Forbidden";
        case 404: return "Not Found";
        case 500: return "Internal Server Error";
        default: return "Unknown Status";
    }
}
```

### Modern Switch Alternative: Object Mapping
```javascript
// Traditional switch
function getAnimalSound(animal) {
    switch (animal) {
        case "dog": return "woof";
        case "cat": return "meow";
        case "cow": return "moo";
        case "pig": return "oink";
        default: return "unknown sound";
    }
}

// Modern alternative: Object mapping
const animalSounds = {
    dog: "woof",
    cat: "meow",
    cow: "moo",
    pig: "oink"
};

function getAnimalSound(animal) {
    return animalSounds[animal] || "unknown sound";
}

// Advanced object mapping with functions
const calculatorOperations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : "Cannot divide by zero",
    power: (a, b) => Math.pow(a, b),
    modulo: (a, b) => a % b
};

function calculate(operation, a, b) {
    const operationFn = calculatorOperations[operation];
    if (operationFn) {
        return operationFn(a, b);
    }
    return "Invalid operation";
}

console.log(calculate("add", 5, 3)); // 8
console.log(calculate("divide", 10, 2)); // 5
console.log(calculate("invalid", 1, 2)); // "Invalid operation"
```

## Loops

### for Loop Variations
```javascript
// Traditional for loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// Counting backwards
for (let i = 10; i > 0; i--) {
    console.log(`Countdown: ${i}`);
}

// Custom increment
for (let i = 0; i < 20; i += 3) {
    console.log(`Value: ${i}`); // 0, 3, 6, 9, 12, 15, 18
}

// Multiple variables in for loop
for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(`i: ${i}, j: ${j}`);
}

// Working with arrays
let fruits = ["apple", "banana", "orange", "grape"];

for (let i = 0; i < fruits.length; i++) {
    console.log(`${i + 1}. ${fruits[i]}`);
}

// Nested loops for 2D operations
function createMultiplicationTable(size) {
    let table = [];
    
    for (let i = 1; i <= size; i++) {
        let row = [];
        for (let j = 1; j <= size; j++) {
            row.push(i * j);
        }
        table.push(row);
    }
    
    return table;
}

console.log(createMultiplicationTable(3));
// [[1, 2, 3], [2, 4, 6], [3, 6, 9]]
```

### while and do-while Loops
```javascript
// while loop - condition checked before execution
let password = "";
let attempts = 0;
const maxAttempts = 3;

while (password !== "secret123" && attempts < maxAttempts) {
    password = prompt(`Enter password (Attempt ${attempts + 1}/${maxAttempts}):`);
    attempts++;
    
    if (password === "secret123") {
        console.log("Access granted!");
    } else if (attempts < maxAttempts) {
        console.log("Incorrect password. Try again.");
    } else {
        console.log("Access denied. Maximum attempts reached.");
    }
}

// do-while loop - condition checked after execution
let userChoice;
do {
    userChoice = prompt("Enter a number between 1 and 10:");
    userChoice = parseInt(userChoice);
    
    if (isNaN(userChoice) || userChoice < 1 || userChoice > 10) {
        console.log("Invalid input. Please try again.");
    }
} while (isNaN(userChoice) || userChoice < 1 || userChoice > 10);

console.log(`You chose: ${userChoice}`);

// Practical example: Processing data until condition met
function processQueue(queue) {
    while (queue.length > 0) {
        let item = queue.shift(); // Remove first item
        
        if (item.priority === "high") {
            console.log(`Processing high priority item: ${item.name}`);
            processImmediately(item);
        } else {
            console.log(`Processing normal item: ${item.name}`);
            processNormally(item);
        }
    }
    
    console.log("Queue processing complete");
}
```

### for...in and for...of Loops
```javascript
// for...in loop - iterates over object properties (keys)
let person = {
    name: "Alice",
    age: 30,
    city: "New York",
    occupation: "Developer"
};

for (let property in person) {
    console.log(`${property}: ${person[property]}`);
}

// for...in with arrays (not recommended - use for...of instead)
let colors = ["red", "green", "blue"];

for (let index in colors) {
    console.log(`Index ${index}: ${colors[index]}`);
}

// for...of loop - iterates over iterable values
for (let color of colors) {
    console.log(`Color: ${color}`);
}

// for...of with strings
let message = "Hello";
for (let char of message) {
    console.log(`Character: ${char}`);
}

// for...of with Maps and Sets
let userRoles = new Map([
    ["alice", "admin"],
    ["bob", "user"],
    ["charlie", "moderator"]
]);

for (let [username, role] of userRoles) {
    console.log(`${username} has role: ${role}`);
}

let uniqueNumbers = new Set([1, 2, 3, 4, 5]);
for (let number of uniqueNumbers) {
    console.log(`Number: ${number}`);
}

// Practical example: Processing form data
function validateFormData(formData) {
    let errors = [];
    
    for (let [fieldName, fieldValue] of Object.entries(formData)) {
        if (!fieldValue || fieldValue.trim() === "") {
            errors.push(`${fieldName} is required`);
        }
        
        // Specific validations
        if (fieldName === "email" && !isValidEmail(fieldValue)) {
            errors.push("Invalid email format");
        }
        
        if (fieldName === "age" && (isNaN(fieldValue) || fieldValue < 0)) {
            errors.push("Age must be a positive number");
        }
    }
    
    return errors;
}
```

## Loop Control Statements

### break and continue
```javascript
// break - exits the loop entirely
function findFirstEvenNumber(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            console.log(`Found first even number: ${numbers[i]} at index ${i}`);
            break; // Exit the loop
        }
    }
}

// continue - skips current iteration, continues with next
function processPositiveNumbers(numbers) {
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] <= 0) {
            continue; // Skip negative or zero numbers
        }
        
        console.log(`Processing positive number: ${numbers[i]}`);
        // Process the positive number
    }
}

// Labeled breaks for nested loops
outerLoop: for (let i = 0; i < 3; i++) {
    innerLoop: for (let j = 0; j < 3; j++) {
        if (i === 1 && j === 1) {
            console.log("Breaking out of both loops");
            break outerLoop; // Breaks out of the outer loop
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

// Practical example: Search in 2D array
function findInMatrix(matrix, target) {
    outerSearch: for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] === target) {
                return { row, col, found: true };
            }
        }
    }
    return { found: false };
}

// Example with user input validation
function getValidUserInput() {
    while (true) {
        let input = prompt("Enter a number between 1 and 100:");
        
        if (input === null) {
            console.log("User cancelled");
            break; // Exit if user cancels
        }
        
        let number = parseInt(input);
        
        if (isNaN(number)) {
            console.log("Please enter a valid number");
            continue; // Ask again
        }
        
        if (number < 1 || number > 100) {
            console.log("Number must be between 1 and 100");
            continue; // Ask again
        }
        
        return number; // Valid input, return the number
    }
    
    return null; // User cancelled
}
```

## Advanced Control Flow Patterns

### Error Handling with Control Flow
```javascript
function safeDivision(a, b) {
    // Input validation
    if (typeof a !== "number" || typeof b !== "number") {
        return { success: false, error: "Both arguments must be numbers" };
    }
    
    if (b === 0) {
        return { success: false, error: "Division by zero is not allowed" };
    }
    
    if (!isFinite(a) || !isFinite(b)) {
        return { success: false, error: "Infinite numbers are not supported" };
    }
    
    return { success: true, result: a / b };
}

// Usage with control flow
function performCalculation(x, y) {
    let result = safeDivision(x, y);
    
    if (result.success) {
        console.log(`Result: ${result.result}`);
        return result.result;
    } else {
        console.error(`Calculation failed: ${result.error}`);
        return null;
    }
}
```

### State Machines with Switch
```javascript
class TrafficLight {
    constructor() {
        this.state = "red";
        this.timer = 0;
    }
    
    update() {
        this.timer++;
        
        switch (this.state) {
            case "red":
                if (this.timer >= 30) { // 30 seconds
                    this.state = "green";
                    this.timer = 0;
                    console.log("Light changed to GREEN");
                }
                break;
                
            case "green":
                if (this.timer >= 25) { // 25 seconds
                    this.state = "yellow";
                    this.timer = 0;
                    console.log("Light changed to YELLOW");
                }
                break;
                
            case "yellow":
                if (this.timer >= 5) { // 5 seconds
                    this.state = "red";
                    this.timer = 0;
                    console.log("Light changed to RED");
                }
                break;
                
            default:
                console.error("Invalid traffic light state");
                this.state = "red";
                this.timer = 0;
        }
    }
    
    getCurrentState() {
        return {
            color: this.state,
            timeRemaining: this.getTimeRemaining()
        };
    }
    
    getTimeRemaining() {
        switch (this.state) {
            case "red": return 30 - this.timer;
            case "green": return 25 - this.timer;
            case "yellow": return 5 - this.timer;
            default: return 0;
        }
    }
}

// Usage
let trafficLight = new TrafficLight();
setInterval(() => {
    trafficLight.update();
    console.log(trafficLight.getCurrentState());
}, 1000);
```

### Complex Data Processing Pipeline
```javascript
function processUserData(rawUsers) {
    let processedUsers = [];
    let errors = [];
    
    for (let i = 0; i < rawUsers.length; i++) {
        let user = rawUsers[i];
        
        // Skip if user is null or undefined
        if (!user) {
            continue;
        }
        
        // Validation phase
        if (!user.email || !user.name) {
            errors.push({
                index: i,
                error: "Missing required fields (name or email)",
                user: user
            });
            continue;
        }
        
        // Sanitization phase
        let sanitizedUser = {
            name: user.name.trim(),
            email: user.email.toLowerCase().trim(),
            age: parseInt(user.age) || 0,
            active: Boolean(user.active)
        };
        
        // Business logic validation
        if (sanitizedUser.age < 13) {
            errors.push({
                index: i,
                error: "User must be at least 13 years old",
                user: sanitizedUser
            });
            continue;
        }
        
        if (!isValidEmail(sanitizedUser.email)) {
            errors.push({
                index: i,
                error: "Invalid email format",
                user: sanitizedUser
            });
            continue;
        }
        
        // Check for duplicates
        let isDuplicate = false;
        for (let existingUser of processedUsers) {
            if (existingUser.email === sanitizedUser.email) {
                errors.push({
                    index: i,
                    error: "Duplicate email address",
                    user: sanitizedUser
                });
                isDuplicate = true;
                break;
            }
        }
        
        if (isDuplicate) {
            continue;
        }
        
        // Add processed user
        processedUsers.push(sanitizedUser);
    }
    
    return {
        successful: processedUsers,
        errors: errors,
        summary: {
            total: rawUsers.length,
            processed: processedUsers.length,
            failed: errors.length
        }
    };
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

## Practical Exercise: Advanced Control Flow

Create a comprehensive user registration system that demonstrates all control flow concepts:

```javascript
class UserRegistrationSystem {
    constructor() {
        this.users = [];
        this.maxAttempts = 3;
        this.passwordRequirements = {
            minLength: 8,
            requireUppercase: true,
            requireLowercase: true,
            requireNumbers: true,
            requireSpecialChars: true
        };
    }
    
    // Implement these methods using control flow concepts covered:
    
    registerUser(userData) {
        // 1. Validate all required fields using if-else
        // 2. Check password requirements using multiple conditions
        // 3. Verify email uniqueness using loops
        // 4. Handle different error scenarios with appropriate messages
        // 5. Return detailed result object
    }
    
    authenticateUser(email, password, maxAttempts = this.maxAttempts) {
        // 1. Implement attempt counter using while loop
        // 2. Use switch statement for different authentication states
        // 3. Handle account lockout scenarios
        // 4. Provide helpful error messages
    }
    
    processPasswordReset(email) {
        // 1. Find user using for...of loop
        // 2. Generate temporary password
        // 3. Use conditional logic for different scenarios
        // 4. Return appropriate response
    }
    
    validatePassword(password) {
        // 1. Use multiple if statements to check each requirement
        // 2. Return object with validation details
        // 3. Provide specific error messages for each failed requirement
    }
    
    generateUserReport() {
        // 1. Use loops to categorize users
        // 2. Calculate statistics
        // 3. Use conditional logic for different user types
        // 4. Return comprehensive report
    }
}

// Test the system with various scenarios
let registrationSystem = new UserRegistrationSystem();

// Test data with various conditions
let testUsers = [
    { name: "Alice", email: "alice@example.com", password: "SecurePass123!" },
    { name: "", email: "invalid@example.com", password: "weak" },
    { name: "Bob", email: "bob@example.com", password: "AnotherSecure456@" },
    { name: "Charlie", email: "alice@example.com", password: "DuplicateEmail789#" }
];

// Process each user and handle different outcomes
for (let userData of testUsers) {
    let result = registrationSystem.registerUser(userData);
    console.log(`Registration result for ${userData.name}:`, result);
}
```

### Assessment Criteria:
- [ ] Proper use of if-else statements for validation
- [ ] Effective use of switch statements for state management
- [ ] Correct implementation of different loop types
- [ ] Proper error handling and user feedback
- [ ] Clean, readable code with good structure
- [ ] Edge case handling (null values, empty strings, etc.)
- [ ] Performance considerations for large datasets
