# Error Handling and Debugging

## Understanding JavaScript Errors

### Types of Errors
```javascript
// Syntax Errors - caught at parse time
// let 2name = "invalid"; // SyntaxError: Unexpected number

// Reference Errors - accessing undefined variables
// console.log(undefinedVariable); // ReferenceError: undefinedVariable is not defined

// Type Errors - wrong operation on a type
let number = 42;
// number.toUpperCase(); // TypeError: number.toUpperCase is not a function

// Range Errors - number out of valid range
// let array = new Array(-1); // RangeError: Invalid array length

// URI Errors - malformed URI
// decodeURIComponent('%'); // URIError: URI malformed
```

### The Error Object
```javascript
// Creating custom errors
let customError = new Error("Something went wrong");
console.log(customError.name);    // "Error"
console.log(customError.message); // "Something went wrong"
console.log(customError.stack);   // Stack trace

// Different error types
let typeError = new TypeError("Expected a function");
let rangeError = new RangeError("Number out of range");
let referenceError = new ReferenceError("Variable not found");

// Custom error properties
function createDetailedError(message, code, details) {
    let error = new Error(message);
    error.code = code;
    error.details = details;
    error.timestamp = new Date().toISOString();
    return error;
}

let error = createDetailedError(
    "Database connection failed",
    "DB_CONN_001",
    { host: "localhost", port: 5432 }
);
```

## Try-Catch-Finally

### Basic Try-Catch
```javascript
function riskyOperation() {
    let random = Math.random();
    if (random < 0.5) {
        throw new Error("Operation failed randomly");
    }
    return "Success!";
}

try {
    let result = riskyOperation();
    console.log("Result:", result);
} catch (error) {
    console.log("Error caught:", error.message);
    // Handle the error gracefully
}

console.log("Program continues...");

// Catching specific error types
function processUserInput(input) {
    try {
        if (typeof input !== 'string') {
            throw new TypeError("Input must be a string");
        }
        
        if (input.length === 0) {
            throw new Error("Input cannot be empty");
        }
        
        if (input.length > 100) {
            throw new RangeError("Input too long");
        }
        
        return input.toUpperCase();
    } catch (error) {
        if (error instanceof TypeError) {
            console.log("Type error:", error.message);
            return null;
        } else if (error instanceof RangeError) {
            console.log("Range error:", error.message);
            return input.substring(0, 100).toUpperCase();
        } else {
            console.log("General error:", error.message);
            return "";
        }
    }
}
```

### Finally Block
```javascript
function fileOperation(filename) {
    let file = null;
    
    try {
        file = openFile(filename); // Hypothetical function
        let content = file.read();
        return content;
    } catch (error) {
        console.log("File operation failed:", error.message);
        return null;
    } finally {
        // Always executes, regardless of success or failure
        if (file) {
            file.close();
            console.log("File closed");
        }
    }
}

// Real-world example: API call with cleanup
async function fetchUserData(userId) {
    let loading = showLoadingSpinner(); // Start loading indicator
    
    try {
        let response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        let userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Failed to fetch user data:", error.message);
        showErrorMessage("Failed to load user data. Please try again.");
        return null;
    } finally {
        // Always hide loading spinner
        hideLoadingSpinner(loading);
    }
}

// Helper functions (mock implementations)
function showLoadingSpinner() {
    console.log("Loading...");
    return { id: Date.now() };
}

function hideLoadingSpinner(loading) {
    console.log("Loading complete");
}

function showErrorMessage(message) {
    console.log("Error:", message);
}
```

## Custom Error Classes

### Creating Custom Errors
```javascript
// Basic custom error
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode, url) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
        this.url = url;
    }
}

class DatabaseError extends Error {
    constructor(message, query, code) {
        super(message);
        this.name = "DatabaseError";
        this.query = query;
        this.code = code;
    }
}

// Using custom errors
function validateUser(user) {
    if (!user.email) {
        throw new ValidationError("Email is required", "email");
    }
    
    if (!user.email.includes("@")) {
        throw new ValidationError("Invalid email format", "email");
    }
    
    if (!user.password || user.password.length < 8) {
        throw new ValidationError("Password must be at least 8 characters", "password");
    }
    
    return true;
}

// Handling custom errors
function processUserRegistration(userData) {
    try {
        validateUser(userData);
        // Proceed with registration
        return { success: true, message: "User registered successfully" };
    } catch (error) {
        if (error instanceof ValidationError) {
            return {
                success: false,
                field: error.field,
                message: error.message
            };
        } else {
            return {
                success: false,
                message: "An unexpected error occurred"
            };
        }
    }
}

// Test custom error handling
let result1 = processUserRegistration({ email: "", password: "123" });
console.log(result1); // { success: false, field: "email", message: "Email is required" }

let result2 = processUserRegistration({ email: "user@example.com", password: "securepassword" });
console.log(result2); // { success: true, message: "User registered successfully" }
```

### Error Factory Pattern
```javascript
class ErrorFactory {
    static createValidationError(field, value, requirement) {
        let message = `Validation failed for ${field}: ${requirement}`;
        let error = new ValidationError(message, field);
        error.value = value;
        error.requirement = requirement;
        return error;
    }
    
    static createNetworkError(url, statusCode, statusText) {
        let message = `Network request failed: ${statusCode} ${statusText}`;
        return new NetworkError(message, statusCode, url);
    }
    
    static createDatabaseError(operation, details) {
        let message = `Database ${operation} failed: ${details.message}`;
        return new DatabaseError(message, details.query, details.code);
    }
}

// Usage
function validateAge(age) {
    if (typeof age !== 'number') {
        throw ErrorFactory.createValidationError('age', age, 'must be a number');
    }
    
    if (age < 0 || age > 150) {
        throw ErrorFactory.createValidationError('age', age, 'must be between 0 and 150');
    }
    
    return true;
}
```

## Error Handling Patterns

### Defensive Programming
```javascript
// Input validation
function safeCalculate(operation, a, b) {
    // Validate inputs
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError("Arguments must be numbers");
    }
    
    if (!isFinite(a) || !isFinite(b)) {
        throw new RangeError("Arguments must be finite numbers");
    }
    
    // Validate operation
    const validOperations = ['add', 'subtract', 'multiply', 'divide'];
    if (!validOperations.includes(operation)) {
        throw new Error(`Invalid operation: ${operation}`);
    }
    
    // Perform calculation
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                throw new Error("Division by zero");
            }
            return a / b;
    }
}

// Safe object property access
function safeGetProperty(obj, path, defaultValue = null) {
    try {
        return path.split('.').reduce((current, key) => {
            if (current === null || current === undefined) {
                return defaultValue;
            }
            return current[key];
        }, obj);
    } catch (error) {
        console.warn(`Failed to access property ${path}:`, error.message);
        return defaultValue;
    }
}

// Usage
let user = {
    profile: {
        address: {
            city: "New York"
        }
    }
};

console.log(safeGetProperty(user, 'profile.address.city')); // "New York"
console.log(safeGetProperty(user, 'profile.phone.number', 'Not available')); // "Not available"
```

### Result Pattern (Alternative to Exceptions)
```javascript
class Result {
    constructor(success, data, error) {
        this.success = success;
        this.data = data;
        this.error = error;
    }
    
    static success(data) {
        return new Result(true, data, null);
    }
    
    static failure(error) {
        return new Result(false, null, error);
    }
    
    isSuccess() {
        return this.success;
    }
    
    isFailure() {
        return !this.success;
    }
    
    getValue() {
        if (this.success) {
            return this.data;
        }
        throw new Error("Cannot get value from failed result");
    }
    
    getError() {
        if (!this.success) {
            return this.error;
        }
        throw new Error("Cannot get error from successful result");
    }
    
    map(fn) {
        if (this.success) {
            try {
                return Result.success(fn(this.data));
            } catch (error) {
                return Result.failure(error.message);
            }
        }
        return this;
    }
    
    flatMap(fn) {
        if (this.success) {
            try {
                return fn(this.data);
            } catch (error) {
                return Result.failure(error.message);
            }
        }
        return this;
    }
}

// Using Result pattern
function divideNumbers(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        return Result.failure("Arguments must be numbers");
    }
    
    if (b === 0) {
        return Result.failure("Division by zero");
    }
    
    return Result.success(a / b);
}

function processCalculation(a, b) {
    return divideNumbers(a, b)
        .map(result => result * 2)
        .map(result => Math.round(result));
}

// Usage without exceptions
let result1 = processCalculation(10, 2);
if (result1.isSuccess()) {
    console.log("Result:", result1.getValue()); // Result: 10
} else {
    console.log("Error:", result1.getError());
}

let result2 = processCalculation(10, 0);
if (result2.isFailure()) {
    console.log("Error:", result2.getError()); // Error: Division by zero
}
```

## Debugging Techniques

### Console Methods
```javascript
// Basic logging
console.log("Simple message");
console.info("Information message");
console.warn("Warning message");
console.error("Error message");

// Structured data
let user = { name: "Alice", age: 30, role: "admin" };
console.table(user); // Displays as table
console.dir(user);   // Displays object structure

// Grouping messages
console.group("User Processing");
console.log("Validating user data...");
console.log("User data is valid");
console.groupEnd();

// Timing operations
console.time("Database Query");
// Simulate database operation
setTimeout(() => {
    console.timeEnd("Database Query");
}, 100);

// Counting occurrences
for (let i = 0; i < 5; i++) {
    console.count("Loop iteration");
}

// Conditional logging
let debugMode = true;
function debugLog(message) {
    if (debugMode) {
        console.log(`[DEBUG] ${new Date().toISOString()}: ${message}`);
    }
}

debugLog("Application started");
```

### Assertion and Testing
```javascript
// Basic assertions
function assert(condition, message) {
    if (!condition) {
        throw new Error(`Assertion failed: ${message}`);
    }
}

// Using assertions for debugging
function calculateAverage(numbers) {
    assert(Array.isArray(numbers), "Input must be an array");
    assert(numbers.length > 0, "Array cannot be empty");
    assert(numbers.every(n => typeof n === 'number'), "All elements must be numbers");
    
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}

// Console assertions
console.assert(2 + 2 === 4, "Math is broken!");
console.assert(false, "This assertion will fail");

// Stack trace
function functionA() {
    functionB();
}

function functionB() {
    functionC();
}

function functionC() {
    console.trace("Tracing function calls");
}

functionA(); // Shows call stack
```

### Error Monitoring and Logging
```javascript
// Global error handling
window.addEventListener('error', function(event) {
    console.error('Global error caught:', {
        message: event.error.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error.stack
    });
    
    // Send error to monitoring service
    reportError({
        message: event.error.message,
        stack: event.error.stack,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    });
});

// Unhandled promise rejections
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    
    reportError({
        type: 'unhandledRejection',
        reason: event.reason,
        promise: event.promise
    });
    
    // Prevent console error
    event.preventDefault();
});

// Error reporting service (mock)
function reportError(errorInfo) {
    // In real application, send to error monitoring service
    console.log("Reporting error to monitoring service:", errorInfo);
    
    // Example: send to external service
    // fetch('/api/errors', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(errorInfo)
    // });
}

// Custom error boundary for React-style error handling
class ErrorBoundary {
    constructor() {
        this.errors = [];
    }
    
    catch(fn) {
        try {
            return fn();
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }
    
    async catchAsync(fn) {
        try {
            return await fn();
        } catch (error) {
            this.handleError(error);
            return null;
        }
    }
    
    handleError(error) {
        this.errors.push({
            error,
            timestamp: new Date().toISOString(),
            stack: error.stack
        });
        
        console.error("Error caught by boundary:", error);
        reportError(error);
    }
    
    getErrors() {
        return [...this.errors];
    }
    
    clearErrors() {
        this.errors = [];
    }
}

// Usage
let errorBoundary = new ErrorBoundary();

let result = errorBoundary.catch(() => {
    // Some risky operation
    return JSON.parse('invalid json');
});

if (result === null) {
    console.log("Operation failed, handled gracefully");
}
```

## Async Error Handling

### Promise Error Handling
```javascript
// Promise with catch
function fetchUserData(id) {
    return fetch(`/api/users/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("User data:", data);
            return data;
        })
        .catch(error => {
            console.error("Failed to fetch user:", error.message);
            throw error; // Re-throw if needed
        });
}

// Multiple error handling
function processUserData(id) {
    return fetchUserData(id)
        .then(user => {
            if (!user.active) {
                throw new Error("User account is inactive");
            }
            return user;
        })
        .then(user => {
            // Process active user
            return { ...user, lastAccessed: new Date() };
        })
        .catch(error => {
            if (error.message.includes("HTTP 404")) {
                return { error: "User not found", id };
            } else if (error.message.includes("inactive")) {
                return { error: "Account inactive", id };
            } else {
                return { error: "Unknown error", id, details: error.message };
            }
        });
}
```

### Async/Await Error Handling
```javascript
// Basic async/await with try-catch
async function fetchAndProcessUser(id) {
    try {
        let response = await fetch(`/api/users/${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        let user = await response.json();
        
        // Process user data
        let processedUser = {
            ...user,
            fullName: `${user.firstName} ${user.lastName}`,
            age: calculateAge(user.birthDate)
        };
        
        return processedUser;
    } catch (error) {
        console.error("Error in fetchAndProcessUser:", error.message);
        throw error; // Re-throw or handle as needed
    }
}

// Multiple async operations
async function getUserWithPreferences(userId) {
    try {
        // Execute in parallel
        let [user, preferences, permissions] = await Promise.all([
            fetchUser(userId),
            fetchUserPreferences(userId),
            fetchUserPermissions(userId)
        ]);
        
        return {
            user,
            preferences,
            permissions
        };
    } catch (error) {
        // If any operation fails, the entire function fails
        console.error("Failed to load user data:", error.message);
        
        // Try to provide partial data
        try {
            let user = await fetchUser(userId);
            return {
                user,
                preferences: null,
                permissions: null,
                error: "Failed to load complete user data"
            };
        } catch (fallbackError) {
            throw new Error("Failed to load any user data");
        }
    }
}

// Error handling with async generators
async function* processLargeDataset(data) {
    for (let item of data) {
        try {
            let processed = await processItem(item);
            yield processed;
        } catch (error) {
            console.error(`Failed to process item ${item.id}:`, error.message);
            yield { error: error.message, item: item.id };
        }
    }
}

// Helper functions (mock implementations)
async function fetchUser(id) {
    // Simulate API call
    return { id, firstName: "John", lastName: "Doe", birthDate: "1990-01-01" };
}

async function fetchUserPreferences(id) {
    return { theme: "dark", language: "en" };
}

async function fetchUserPermissions(id) {
    return ["read", "write"];
}

function calculateAge(birthDate) {
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
}

async function processItem(item) {
    // Simulate processing that might fail
    if (Math.random() < 0.1) {
        throw new Error("Random processing error");
    }
    return { ...item, processed: true };
}
```

## Practical Exercise: Robust API Client

Create a robust API client with comprehensive error handling:

```javascript
class APIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.timeout = options.timeout || 5000;
        this.retries = options.retries || 3;
        this.headers = options.headers || {};
    }
    
    // Implement these methods with proper error handling:
    
    async get(endpoint, options = {}) {
        // Handle network errors, timeouts, HTTP errors
        // Implement retry logic
        // Return standardized response format
    }
    
    async post(endpoint, data, options = {}) {
        // Handle validation errors
        // Handle server errors
        // Return standardized response format
    }
    
    async put(endpoint, data, options = {}) {
        // Similar error handling as POST
    }
    
    async delete(endpoint, options = {}) {
        // Handle deletion-specific errors
    }
    
    // Helper methods
    async _makeRequest(method, endpoint, data, options) {
        // Core request logic with error handling
    }
    
    _handleHTTPError(response) {
        // Convert HTTP errors to meaningful error objects
    }
    
    _handleNetworkError(error) {
        // Handle network-specific errors
    }
    
    _shouldRetry(error, attempt) {
        // Determine if request should be retried
    }
    
    async _retry(fn, maxAttempts) {
        // Implement retry logic with exponential backoff
    }
}

// Usage example with comprehensive error handling
async function exampleUsage() {
    let client = new APIClient('https://api.example.com', {
        timeout: 10000,
        retries: 3,
        headers: { 'Authorization': 'Bearer token123' }
    });
    
    try {
        let users = await client.get('/users');
        console.log("Users loaded:", users.data);
        
        let newUser = await client.post('/users', {
            name: "John Doe",
            email: "john@example.com"
        });
        console.log("User created:", newUser.data);
        
    } catch (error) {
        if (error instanceof NetworkError) {
            console.error("Network problem:", error.message);
        } else if (error instanceof ValidationError) {
            console.error("Validation failed:", error.details);
        } else {
            console.error("Unexpected error:", error.message);
        }
    }
}

// Requirements:
// 1. Handle all types of errors (network, HTTP, timeout, validation)
// 2. Implement retry logic with exponential backoff
// 3. Provide meaningful error messages
// 4. Support request/response interceptors
// 5. Include request timeout handling
// 6. Log errors appropriately
// 7. Return consistent response format
```

This exercise should demonstrate:
- Custom error classes
- Async error handling patterns
- Retry mechanisms
- Error logging and monitoring
- Graceful degradation
- User-friendly error messages
