# Classes, OOP & Design Patterns

## Introduction to ES6 Classes

ES6 classes provide a cleaner, more intuitive syntax for creating objects and implementing inheritance in JavaScript. While they're syntactic sugar over JavaScript's prototype-based inheritance, they make object-oriented programming more accessible.

### Basic Class Syntax

```javascript
// Traditional constructor function
function PersonOld(name, age) {
    this.name = name;
    this.age = age;
}

PersonOld.prototype.greet = function() {
    return `Hello, I'm ${this.name}`;
};

// ES6 Class syntax
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, I'm ${this.name}`;
    }
    
    // Getter
    get displayName() {
        return this.name.toUpperCase();
    }
    
    // Setter
    set displayName(value) {
        this.name = value.toLowerCase();
    }
    
    // Static method
    static createAnonymous() {
        return new Person('Anonymous', 0);
    }
}

const person = new Person('John', 30);
console.log(person.greet()); // "Hello, I'm John"
console.log(person.displayName); // "JOHN"

const anonymous = Person.createAnonymous();
```

### Private Fields and Methods

```javascript
class BankAccount {
    // Private fields (ES2022)
    #balance = 0;
    #accountNumber;
    #transactionHistory = [];
    
    constructor(accountNumber, initialBalance = 0) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.#addTransaction('INITIAL_DEPOSIT', initialBalance);
    }
    
    // Private method
    #addTransaction(type, amount) {
        this.#transactionHistory.push({
            type,
            amount,
            timestamp: new Date(),
            balance: this.#balance
        });
    }
    
    // Public methods
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        
        this.#balance += amount;
        this.#addTransaction('DEPOSIT', amount);
        return this.#balance;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#addTransaction('WITHDRAWAL', -amount);
        return this.#balance;
    }
    
    get balance() {
        return this.#balance;
    }
    
    get accountNumber() {
        return this.#accountNumber;
    }
    
    getTransactionHistory() {
        // Return copy to prevent external modification
        return [...this.#transactionHistory];
    }
    
    // Static method for account validation
    static isValidAccountNumber(accountNumber) {
        return /^\d{10}$/.test(accountNumber);
    }
}

const account = new BankAccount('1234567890', 1000);
account.deposit(500);
console.log(account.balance); // 1500
// console.log(account.#balance); // SyntaxError: Private field '#balance' must be declared in an enclosing class
```

## Inheritance and Polymorphism

### Class Inheritance

```javascript
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    makeSound() {
        return 'Some generic animal sound';
    }
    
    describe() {
        return `${this.name} is a ${this.species}`;
    }
    
    // Method that can be overridden
    move() {
        return `${this.name} moves`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog'); // Call parent constructor
        this.breed = breed;
    }
    
    // Override parent method
    makeSound() {
        return 'Woof!';
    }
    
    // Override with super call
    describe() {
        return `${super.describe()} and is a ${this.breed}`;
    }
    
    // Dog-specific method
    fetch() {
        return `${this.name} fetches the ball!`;
    }
}

class Cat extends Animal {
    constructor(name, indoor = true) {
        super(name, 'Cat');
        this.indoor = indoor;
    }
    
    makeSound() {
        return 'Meow!';
    }
    
    move() {
        return `${this.name} prowls silently`;
    }
    
    // Cat-specific method
    climb() {
        return `${this.name} climbs up high!`;
    }
}

// Polymorphism in action
const animals = [
    new Dog('Buddy', 'Golden Retriever'),
    new Cat('Whiskers', false),
    new Dog('Max', 'Labrador')
];

animals.forEach(animal => {
    console.log(animal.describe());
    console.log(animal.makeSound());
    console.log(animal.move());
    console.log('---');
});
```

### Abstract Classes Pattern

```javascript
// Abstract base class pattern
class Shape {
    constructor(name) {
        if (this.constructor === Shape) {
            throw new Error('Cannot instantiate abstract class Shape');
        }
        this.name = name;
    }
    
    // Abstract method - must be implemented by subclasses
    calculateArea() {
        throw new Error('calculateArea() must be implemented by subclass');
    }
    
    calculatePerimeter() {
        throw new Error('calculatePerimeter() must be implemented by subclass');
    }
    
    // Concrete method
    describe() {
        return `This is a ${this.name} with area ${this.calculateArea()} and perimeter ${this.calculatePerimeter()}`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('Rectangle');
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
    
    calculatePerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
    
    calculatePerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

const shapes = [
    new Rectangle(5, 10),
    new Circle(7)
];

shapes.forEach(shape => {
    console.log(shape.describe());
});

// try {
//     new Shape('Invalid'); // Error: Cannot instantiate abstract class
// } catch (error) {
//     console.error(error.message);
// }
```

## Design Patterns

### Singleton Pattern

```javascript
class Database {
    constructor() {
        if (Database.instance) {
            return Database.instance;
        }
        
        this.connection = null;
        this.queries = [];
        Database.instance = this;
    }
    
    connect() {
        if (!this.connection) {
            this.connection = {
                id: Math.random().toString(36),
                connected: true
            };
            console.log('Database connected');
        }
        return this.connection;
    }
    
    query(sql) {
        if (!this.connection) {
            throw new Error('Database not connected');
        }
        
        const query = {
            sql,
            timestamp: new Date(),
            id: Math.random().toString(36)
        };
        
        this.queries.push(query);
        return { result: `Executed: ${sql}`, queryId: query.id };
    }
    
    disconnect() {
        if (this.connection) {
            this.connection.connected = false;
            this.connection = null;
            console.log('Database disconnected');
        }
    }
    
    getQueryHistory() {
        return [...this.queries];
    }
}

// Usage
const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2); // true - same instance

db1.connect();
db1.query('SELECT * FROM users');
console.log(db2.getQueryHistory()); // Shows query from db1
```

### Factory Pattern

```javascript
class Logger {
    log(message) {
        throw new Error('log() method must be implemented');
    }
}

class ConsoleLogger extends Logger {
    log(message) {
        console.log(`[CONSOLE] ${new Date().toISOString()}: ${message}`);
    }
}

class FileLogger extends Logger {
    constructor(filename) {
        super();
        this.filename = filename;
        this.logs = [];
    }
    
    log(message) {
        const logEntry = `[FILE:${this.filename}] ${new Date().toISOString()}: ${message}`;
        this.logs.push(logEntry);
        console.log(logEntry); // Simulate file writing
    }
    
    getLogs() {
        return [...this.logs];
    }
}

class DatabaseLogger extends Logger {
    constructor() {
        super();
        this.entries = [];
    }
    
    log(message) {
        const entry = {
            id: Date.now(),
            message,
            timestamp: new Date(),
            level: 'INFO'
        };
        this.entries.push(entry);
        console.log(`[DB] Saved log entry ${entry.id}: ${message}`);
    }
    
    getEntries() {
        return [...this.entries];
    }
}

// Factory
class LoggerFactory {
    static createLogger(type, options = {}) {
        switch (type.toLowerCase()) {
            case 'console':
                return new ConsoleLogger();
            case 'file':
                return new FileLogger(options.filename || 'app.log');
            case 'database':
                return new DatabaseLogger();
            default:
                throw new Error(`Unknown logger type: ${type}`);
        }
    }
    
    // Factory method with environment detection
    static createDefaultLogger() {
        if (typeof window !== 'undefined') {
            return new ConsoleLogger(); // Browser environment
        } else if (typeof process !== 'undefined') {
            return new FileLogger('server.log'); // Node.js environment
        } else {
            return new ConsoleLogger(); // Fallback
        }
    }
}

// Usage
const consoleLogger = LoggerFactory.createLogger('console');
const fileLogger = LoggerFactory.createLogger('file', { filename: 'errors.log' });
const dbLogger = LoggerFactory.createLogger('database');

const loggers = [consoleLogger, fileLogger, dbLogger];
loggers.forEach(logger => logger.log('Application started'));
```

### Observer Pattern

```javascript
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
        
        // Return unsubscribe function
        return () => this.off(event, listener);
    }
    
    off(event, listener) {
        if (this.events.has(event)) {
            const listeners = this.events.get(event);
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        }
    }
    
    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => {
                try {
                    listener(...args);
                } catch (error) {
                    console.error(`Error in event listener for ${event}:`, error);
                }
            });
        }
    }
    
    once(event, listener) {
        const unsubscribe = this.on(event, (...args) => {
            unsubscribe();
            listener(...args);
        });
        return unsubscribe;
    }
    
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

class UserService extends EventEmitter {
    constructor() {
        super();
        this.users = new Map();
    }
    
    createUser(userData) {
        const user = {
            id: Math.random().toString(36),
            ...userData,
            createdAt: new Date()
        };
        
        this.users.set(user.id, user);
        this.emit('userCreated', user);
        return user;
    }
    
    updateUser(id, updates) {
        const user = this.users.get(id);
        if (user) {
            const updatedUser = { ...user, ...updates, updatedAt: new Date() };
            this.users.set(id, updatedUser);
            this.emit('userUpdated', updatedUser, user);
            return updatedUser;
        }
        return null;
    }
    
    deleteUser(id) {
        const user = this.users.get(id);
        if (user) {
            this.users.delete(id);
            this.emit('userDeleted', user);
            return true;
        }
        return false;
    }
}

// Usage
const userService = new UserService();

// Set up observers
userService.on('userCreated', (user) => {
    console.log(`New user created: ${user.name} (${user.id})`);
});

userService.on('userUpdated', (newUser, oldUser) => {
    console.log(`User updated: ${newUser.name}`);
});

userService.on('userDeleted', (user) => {
    console.log(`User deleted: ${user.name}`);
});

// Use the service
const user = userService.createUser({ name: 'John Doe', email: 'john@example.com' });
userService.updateUser(user.id, { name: 'John Smith' });
userService.deleteUser(user.id);
```

### Decorator Pattern

```javascript
// Method decorator for logging
function logMethod(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        console.log(`Calling ${propertyName} with args:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`${propertyName} returned:`, result);
        return result;
    };
    
    return descriptor;
}

// Timing decorator
function timeMethod(target, propertyName, descriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args) {
        const start = performance.now();
        const result = originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyName} took ${end - start} milliseconds`);
        return result;
    };
    
    return descriptor;
}

// Validation decorator
function validate(validator) {
    return function(target, propertyName, descriptor) {
        const originalMethod = descriptor.value;
        
        descriptor.value = function(...args) {
            if (!validator(...args)) {
                throw new Error(`Validation failed for ${propertyName}`);
            }
            return originalMethod.apply(this, args);
        };
        
        return descriptor;
    };
}

class Calculator {
    @logMethod
    @timeMethod
    add(a, b) {
        return a + b;
    }
    
    @validate((a, b) => typeof a === 'number' && typeof b === 'number')
    @logMethod
    multiply(a, b) {
        return a * b;
    }
    
    @validate((n) => typeof n === 'number' && n >= 0)
    factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * this.factorial(n - 1);
    }
}

// Manual decorator application (if decorators aren't supported)
class CalculatorManual {
    add(a, b) {
        return a + b;
    }
    
    multiply(a, b) {
        return a * b;
    }
}

// Apply decorators manually
const isNumber = (a, b) => typeof a === 'number' && typeof b === 'number';
CalculatorManual.prototype.multiply = validate(isNumber)(
    CalculatorManual.prototype,
    'multiply',
    { value: CalculatorManual.prototype.multiply }
).value;
```

## Composition over Inheritance

### Mixin Pattern

```javascript
// Mixins for behavior composition
const Flyable = {
    fly() {
        return `${this.name} is flying`;
    },
    
    land() {
        return `${this.name} has landed`;
    }
};

const Swimmable = {
    swim() {
        return `${this.name} is swimming`;
    },
    
    dive() {
        return `${this.name} dives underwater`;
    }
};

const Walkable = {
    walk() {
        return `${this.name} is walking`;
    },
    
    run() {
        return `${this.name} is running`;
    }
};

// Mixin utility function
function mixin(BaseClass, ...mixins) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin).forEach(name => {
            if (name !== 'constructor') {
                BaseClass.prototype[name] = mixin[name];
            }
        });
    });
}

// Base animal class
class Animal {
    constructor(name) {
        this.name = name;
    }
}

// Create specialized classes with mixins
class Bird extends Animal {
    constructor(name, wingspan) {
        super(name);
        this.wingspan = wingspan;
    }
}

class Duck extends Animal {
    constructor(name) {
        super(name);
    }
}

class Fish extends Animal {
    constructor(name) {
        super(name);
    }
}

// Apply mixins
mixin(Bird, Flyable, Walkable);
mixin(Duck, Flyable, Swimmable, Walkable);
mixin(Fish, Swimmable);

// Usage
const eagle = new Bird('Eagle', 200);
const duck = new Duck('Donald');
const shark = new Fish('Bruce');

console.log(eagle.fly());
console.log(eagle.walk());

console.log(duck.fly());
console.log(duck.swim());
console.log(duck.walk());

console.log(shark.swim());
console.log(shark.dive());
// console.log(shark.fly()); // Error: shark.fly is not a function
```

### Composition with Delegation

```javascript
class Engine {
    constructor(horsepower, fuelType) {
        this.horsepower = horsepower;
        this.fuelType = fuelType;
        this.running = false;
    }
    
    start() {
        this.running = true;
        return `Engine started (${this.horsepower}hp, ${this.fuelType})`;
    }
    
    stop() {
        this.running = false;
        return 'Engine stopped';
    }
    
    getStatus() {
        return {
            horsepower: this.horsepower,
            fuelType: this.fuelType,
            running: this.running
        };
    }
}

class GPS {
    constructor() {
        this.currentLocation = { lat: 0, lng: 0 };
        this.destination = null;
    }
    
    setDestination(lat, lng) {
        this.destination = { lat, lng };
        return `Destination set to ${lat}, ${lng}`;
    }
    
    navigate() {
        if (!this.destination) {
            return 'No destination set';
        }
        return `Navigating to ${this.destination.lat}, ${this.destination.lng}`;
    }
    
    getCurrentLocation() {
        return { ...this.currentLocation };
    }
}

class AudioSystem {
    constructor() {
        this.volume = 50;
        this.station = 'FM 101.1';
        this.playing = false;
    }
    
    play() {
        this.playing = true;
        return `Playing ${this.station} at volume ${this.volume}`;
    }
    
    stop() {
        this.playing = false;
        return 'Audio stopped';
    }
    
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(100, volume));
        return `Volume set to ${this.volume}`;
    }
    
    changeStation(station) {
        this.station = station;
        return `Changed to ${station}`;
    }
}

// Car composed of multiple systems
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        
        // Composition - has-a relationships
        this.engine = new Engine(200, 'gasoline');
        this.gps = new GPS();
        this.audio = new AudioSystem();
    }
    
    // Delegate to engine
    start() {
        return this.engine.start();
    }
    
    stop() {
        return this.engine.stop();
    }
    
    // Delegate to GPS
    setDestination(lat, lng) {
        return this.gps.setDestination(lat, lng);
    }
    
    navigate() {
        if (!this.engine.running) {
            return 'Please start the engine first';
        }
        return this.gps.navigate();
    }
    
    // Delegate to audio system
    playMusic() {
        return this.audio.play();
    }
    
    changeRadioStation(station) {
        return this.audio.changeStation(station);
    }
    
    // Car-specific methods
    getInfo() {
        return `${this.year} ${this.make} ${this.model}`;
    }
    
    getSystemStatus() {
        return {
            car: this.getInfo(),
            engine: this.engine.getStatus(),
            gps: this.gps.getCurrentLocation(),
            audio: {
                volume: this.audio.volume,
                station: this.audio.station,
                playing: this.audio.playing
            }
        };
    }
}

// Usage
const myCar = new Car('Toyota', 'Camry', 2023);

console.log(myCar.start());
console.log(myCar.setDestination(40.7128, -74.0060));
console.log(myCar.navigate());
console.log(myCar.playMusic());
console.log(myCar.changeRadioStation('Spotify'));

console.log(JSON.stringify(myCar.getSystemStatus(), null, 2));
```

## SOLID Principles in JavaScript

### Single Responsibility Principle

```javascript
// ❌ Violates SRP - class has multiple responsibilities
class UserBad {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    // User data management
    getName() { return this.name; }
    setName(name) { this.name = name; }
    
    // Email validation - different responsibility
    validateEmail() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }
    
    // Database operations - different responsibility
    save() {
        console.log('Saving user to database...');
    }
    
    // Email sending - different responsibility
    sendWelcomeEmail() {
        console.log(`Sending welcome email to ${this.email}`);
    }
}

// ✅ Follows SRP - each class has single responsibility
class User {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getEmail() { return this.email; }
    setEmail(email) { this.email = email; }
}

class EmailValidator {
    static validate(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

class UserRepository {
    save(user) {
        console.log(`Saving user ${user.getName()} to database...`);
        // Database logic here
    }
    
    findById(id) {
        console.log(`Finding user with id ${id}...`);
        // Database logic here
    }
}

class EmailService {
    sendWelcomeEmail(user) {
        if (EmailValidator.validate(user.getEmail())) {
            console.log(`Sending welcome email to ${user.getEmail()}`);
            // Email sending logic here
        }
    }
}
```

### Open/Closed Principle

```javascript
// Base shape class - closed for modification, open for extension
class Shape {
    calculateArea() {
        throw new Error('calculateArea must be implemented by subclass');
    }
}

// Extended classes - adding new functionality without modifying base
class Rectangle extends Shape {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    
    calculateArea() {
        return this.width * this.height;
    }
}

class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    
    calculateArea() {
        return Math.PI * this.radius * this.radius;
    }
}

// Calculator that works with any shape - open for extension
class AreaCalculator {
    calculateTotalArea(shapes) {
        return shapes.reduce((total, shape) => {
            return total + shape.calculateArea();
        }, 0);
    }
}

// Adding new shape doesn't require modifying existing code
class Triangle extends Shape {
    constructor(base, height) {
        super();
        this.base = base;
        this.height = height;
    }
    
    calculateArea() {
        return (this.base * this.height) / 2;
    }
}

const shapes = [
    new Rectangle(5, 10),
    new Circle(7),
    new Triangle(6, 8)
];

const calculator = new AreaCalculator();
console.log(calculator.calculateTotalArea(shapes));
```

### Dependency Inversion Principle

```javascript
// ❌ Violates DIP - high-level module depends on low-level module
class EmailServiceConcrete {
    send(message) {
        console.log(`Sending email: ${message}`);
    }
}

class NotificationServiceBad {
    constructor() {
        this.emailService = new EmailServiceConcrete(); // Direct dependency
    }
    
    notify(message) {
        this.emailService.send(message);
    }
}

// ✅ Follows DIP - depend on abstractions, not concretions
class NotificationChannel {
    send(message) {
        throw new Error('send method must be implemented');
    }
}

class EmailChannel extends NotificationChannel {
    send(message) {
        console.log(`📧 Email: ${message}`);
    }
}

class SMSChannel extends NotificationChannel {
    send(message) {
        console.log(`📱 SMS: ${message}`);
    }
}

class PushNotificationChannel extends NotificationChannel {
    send(message) {
        console.log(`🔔 Push: ${message}`);
    }
}

class NotificationService {
    constructor(channels = []) {
        this.channels = channels;
    }
    
    addChannel(channel) {
        this.channels.push(channel);
    }
    
    notify(message) {
        this.channels.forEach(channel => {
            channel.send(message);
        });
    }
}

// Usage - dependency injection
const notificationService = new NotificationService([
    new EmailChannel(),
    new SMSChannel(),
    new PushNotificationChannel()
]);

notificationService.notify('Welcome to our service!');
```

## Summary and Best Practices

### Key Takeaways

1. **ES6 Classes** provide cleaner syntax for object-oriented programming
2. **Private fields** encapsulate internal state and prevent external access
3. **Inheritance** enables code reuse but should be used judiciously
4. **Composition** is often preferred over inheritance for flexibility
5. **Design patterns** solve common programming problems
6. **SOLID principles** guide good object-oriented design

### Best Practices

- Use private fields (#) for encapsulation
- Prefer composition over inheritance when possible
- Follow SOLID principles for maintainable code
- Use design patterns appropriately, not just because you can
- Keep classes focused on single responsibilities
- Use dependency injection for testability
- Document your class interfaces and contracts

Understanding these OOP concepts and patterns is essential for building scalable, maintainable JavaScript applications.
