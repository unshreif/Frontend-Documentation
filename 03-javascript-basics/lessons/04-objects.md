# Objects in JavaScript

## Object Basics

### Creating Objects
```javascript
// Object literal notation (most common)
let person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    isEmployed: true
};

// Empty object
let emptyObj = {};

// Object constructor (less common)
let person2 = new Object();
person2.name = "Jane Smith";
person2.age = 25;

// Object.create() method
let personPrototype = {
    introduce: function() {
        return `Hi, I'm ${this.name}`;
    }
};
let person3 = Object.create(personPrototype);
person3.name = "Bob";
```

### Accessing Object Properties
```javascript
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2022,
    "fuel-type": "gasoline", // Property with hyphen needs quotes
    engine: {
        cylinders: 4,
        type: "inline"
    }
};

// Dot notation
console.log(car.brand);        // "Toyota"
console.log(car.engine.type);  // "inline"

// Bracket notation
console.log(car["model"]);     // "Camry"
console.log(car["fuel-type"]); // "gasoline"

// Dynamic property access
let property = "year";
console.log(car[property]);    // 2022

// Accessing nested properties
console.log(car.engine.cylinders);    // 4
console.log(car["engine"]["type"]);   // "inline"

// Safe property access (avoiding errors)
let engine = car.engine;
let displacement = engine && engine.displacement; // undefined (no error)

// Optional chaining (ES2020)
let displacement2 = car.engine?.displacement;     // undefined
let ownerName = car.owner?.name;                  // undefined
```

### Modifying Objects
```javascript
let student = {
    name: "Alice",
    grade: "A",
    subjects: ["Math", "Science"]
};

// Adding properties
student.age = 20;
student["email"] = "alice@example.com";

// Modifying existing properties
student.grade = "A+";
student.subjects.push("History");

// Deleting properties
delete student.email;

console.log(student);
// { name: "Alice", grade: "A+", age: 20, subjects: ["Math", "Science", "History"] }

// Checking if property exists
console.log("age" in student);           // true
console.log(student.hasOwnProperty("grade")); // true
console.log("email" in student);         // false
```

## Object Methods

### Methods as Object Properties
```javascript
let calculator = {
    result: 0,
    
    add: function(value) {
        this.result += value;
        return this; // Return this for method chaining
    },
    
    subtract: function(value) {
        this.result -= value;
        return this;
    },
    
    multiply: function(value) {
        this.result *= value;
        return this;
    },
    
    divide: function(value) {
        if (value !== 0) {
            this.result /= value;
        } else {
            console.log("Cannot divide by zero");
        }
        return this;
    },
    
    clear: function() {
        this.result = 0;
        return this;
    },
    
    getResult: function() {
        return this.result;
    }
};

// Method chaining
calculator.add(10).multiply(2).subtract(5).divide(3);
console.log(calculator.getResult()); // 5

// Arrow functions in objects (be careful with 'this')
let user = {
    name: "John",
    
    // Regular method - 'this' refers to the object
    greet: function() {
        return `Hello, I'm ${this.name}`;
    },
    
    // Arrow function - 'this' doesn't refer to the object
    greetArrow: () => {
        return `Hello, I'm ${this.name}`; // 'this.name' is undefined
    },
    
    // Method shorthand (ES6)
    introduce() {
        return `My name is ${this.name}`;
    }
};

console.log(user.greet());      // "Hello, I'm John"
console.log(user.greetArrow()); // "Hello, I'm undefined"
console.log(user.introduce());  // "My name is John"
```

### The 'this' Keyword
```javascript
let person = {
    firstName: "John",
    lastName: "Doe",
    
    fullName: function() {
        return this.firstName + " " + this.lastName;
    },
    
    setName: function(first, last) {
        this.firstName = first;
        this.lastName = last;
    },
    
    info: function() {
        return {
            name: this.fullName(),
            initials: this.firstName[0] + this.lastName[0]
        };
    }
};

console.log(person.fullName()); // "John Doe"
person.setName("Jane", "Smith");
console.log(person.info());     // { name: "Jane Smith", initials: "JS" }

// 'this' context can change
let getName = person.fullName;
console.log(getName());         // undefined undefined (lost context)

// Binding 'this'
let boundGetName = person.fullName.bind(person);
console.log(boundGetName());    // "Jane Smith"

// Call and apply methods
function introduce(greeting, punctuation) {
    return `${greeting}, I'm ${this.firstName} ${this.lastName}${punctuation}`;
}

// call() - arguments passed individually
console.log(introduce.call(person, "Hello", "!"));    // "Hello, I'm Jane Smith!"

// apply() - arguments passed as array
console.log(introduce.apply(person, ["Hi", "."]));    // "Hi, I'm Jane Smith."
```

## Object Manipulation

### Object.keys(), Object.values(), Object.entries()
```javascript
let product = {
    name: "Laptop",
    price: 999,
    category: "Electronics",
    inStock: true
};

// Get all keys
let keys = Object.keys(product);
console.log(keys); // ["name", "price", "category", "inStock"]

// Get all values
let values = Object.values(product);
console.log(values); // ["Laptop", 999, "Electronics", true]

// Get key-value pairs
let entries = Object.entries(product);
console.log(entries); // [["name", "Laptop"], ["price", 999], ...]

// Iterating over object properties
for (let key of Object.keys(product)) {
    console.log(`${key}: ${product[key]}`);
}

for (let [key, value] of Object.entries(product)) {
    console.log(`${key}: ${value}`);
}

// Transforming objects
let upperCaseProduct = {};
for (let [key, value] of Object.entries(product)) {
    upperCaseProduct[key.toUpperCase()] = value;
}
console.log(upperCaseProduct);
```

### Object.assign() and Spread Operator
```javascript
let baseConfig = {
    theme: "light",
    fontSize: 14,
    notifications: true
};

let userConfig = {
    fontSize: 16,
    language: "en"
};

// Object.assign() - merges objects
let mergedConfig = Object.assign({}, baseConfig, userConfig);
console.log(mergedConfig);
// { theme: "light", fontSize: 16, notifications: true, language: "en" }

// Spread operator (ES6) - more concise
let mergedConfig2 = { ...baseConfig, ...userConfig };
console.log(mergedConfig2);

// Adding properties while spreading
let enhancedConfig = {
    ...baseConfig,
    ...userConfig,
    version: "2.0",
    lastModified: new Date()
};

// Shallow vs Deep copying
let original = {
    name: "John",
    address: {
        street: "123 Main St",
        city: "New York"
    }
};

// Shallow copy
let shallowCopy = { ...original };
shallowCopy.address.city = "Boston"; // This affects original too!

console.log(original.address.city); // "Boston" (modified!)

// Deep copy (simple objects)
let deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Chicago";
console.log(original.address.city); // Still "Boston"
```

### Object Destructuring
```javascript
let person = {
    name: "Alice Johnson",
    age: 28,
    profession: "Developer",
    location: {
        city: "San Francisco",
        state: "CA"
    },
    skills: ["JavaScript", "React", "Node.js"]
};

// Basic destructuring
let { name, age, profession } = person;
console.log(name);       // "Alice Johnson"
console.log(age);        // 28
console.log(profession); // "Developer"

// Renaming variables
let { name: fullName, profession: job } = person;
console.log(fullName);   // "Alice Johnson"
console.log(job);        // "Developer"

// Default values
let { salary = 50000, bonus = 0 } = person;
console.log(salary);     // 50000 (default)
console.log(bonus);      // 0 (default)

// Nested destructuring
let { location: { city, state } } = person;
console.log(city);       // "San Francisco"
console.log(state);      // "CA"

// Destructuring in function parameters
function displayPersonInfo({ name, age, profession = "Unknown" }) {
    return `${name} is ${age} years old and works as a ${profession}`;
}

console.log(displayPersonInfo(person));

// Rest operator in destructuring
let { name: personName, ...otherInfo } = person;
console.log(personName); // "Alice Johnson"
console.log(otherInfo);  // Everything except name

// Array destructuring in objects
let { skills: [primarySkill, ...otherSkills] } = person;
console.log(primarySkill); // "JavaScript"
console.log(otherSkills);  // ["React", "Node.js"]
```

## Complex Object Patterns

### Factory Functions
```javascript
// Factory function - creates objects
function createPerson(name, age, profession) {
    return {
        name: name,
        age: age,
        profession: profession,
        
        introduce() {
            return `Hi, I'm ${this.name}, a ${this.profession}`;
        },
        
        celebrate() {
            this.age++;
            return `Happy birthday! I'm now ${this.age}`;
        },
        
        changeProfession(newProfession) {
            this.profession = newProfession;
            return `I'm now working as a ${this.profession}`;
        }
    };
}

let person1 = createPerson("Alice", 25, "Designer");
let person2 = createPerson("Bob", 30, "Developer");

console.log(person1.introduce()); // "Hi, I'm Alice, a Designer"
console.log(person2.celebrate());  // "Happy birthday! I'm now 31"

// Factory with private variables (closure)
function createBankAccount(initialBalance) {
    let balance = initialBalance; // Private variable
    
    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                return `Deposited $${amount}. New balance: $${balance}`;
            }
            return "Invalid deposit amount";
        },
        
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                return `Withdrew $${amount}. New balance: $${balance}`;
            }
            return "Invalid withdrawal amount or insufficient funds";
        },
        
        getBalance() {
            return balance;
        }
    };
}

let account = createBankAccount(1000);
console.log(account.deposit(500));  // "Deposited $500. New balance: $1500"
console.log(account.withdraw(200)); // "Withdrew $200. New balance: $1300"
console.log(account.getBalance());  // 1300
// console.log(account.balance);    // undefined (private)
```

### Constructor Functions
```javascript
// Constructor function (before ES6 classes)
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.mileage = 0;
    
    this.drive = function(miles) {
        this.mileage += miles;
        return `Drove ${miles} miles. Total: ${this.mileage}`;
    };
    
    this.getAge = function() {
        return new Date().getFullYear() - this.year;
    };
}

// Creating instances
let car1 = new Car("Toyota", "Camry", 2020);
let car2 = new Car("Honda", "Civic", 2018);

console.log(car1.drive(100)); // "Drove 100 miles. Total: 100"
console.log(car2.getAge());   // Age of the car

// Adding methods to prototype (shared by all instances)
Car.prototype.honk = function() {
    return `${this.make} ${this.model} goes beep beep!`;
};

console.log(car1.honk()); // "Toyota Camry goes beep beep!"
console.log(car2.honk()); // "Honda Civic goes beep beep!"
```

### Object Composition
```javascript
// Composition over inheritance
function canWalk() {
    return {
        walk() {
            return `${this.name} is walking`;
        }
    };
}

function canSwim() {
    return {
        swim() {
            return `${this.name} is swimming`;
        }
    };
}

function canFly() {
    return {
        fly() {
            return `${this.name} is flying`;
        }
    };
}

// Compose different abilities
function createDuck(name) {
    return Object.assign(
        { name },
        canWalk(),
        canSwim(),
        canFly()
    );
}

function createFish(name) {
    return Object.assign(
        { name },
        canSwim()
    );
}

function createBird(name) {
    return Object.assign(
        { name },
        canWalk(),
        canFly()
    );
}

let duck = createDuck("Donald");
let fish = createFish("Nemo");
let bird = createBird("Tweety");

console.log(duck.walk());  // "Donald is walking"
console.log(duck.swim());  // "Donald is swimming"
console.log(duck.fly());   // "Donald is flying"

console.log(fish.swim());  // "Nemo is swimming"
// console.log(fish.fly()); // Error: fish.fly is not a function

console.log(bird.walk());  // "Tweety is walking"
console.log(bird.fly());   // "Tweety is flying"
```

## Practical Examples

### Shopping Cart Implementation
```javascript
function createShoppingCart() {
    let items = [];
    let discountRate = 0;
    
    return {
        addItem(product, quantity = 1) {
            let existingItem = items.find(item => item.product.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ product, quantity });
            }
            
            return this; // For method chaining
        },
        
        removeItem(productId) {
            items = items.filter(item => item.product.id !== productId);
            return this;
        },
        
        updateQuantity(productId, newQuantity) {
            let item = items.find(item => item.product.id === productId);
            if (item) {
                if (newQuantity <= 0) {
                    this.removeItem(productId);
                } else {
                    item.quantity = newQuantity;
                }
            }
            return this;
        },
        
        applyDiscount(rate) {
            discountRate = Math.max(0, Math.min(1, rate)); // Between 0 and 1
            return this;
        },
        
        getSubtotal() {
            return items.reduce((total, item) => {
                return total + (item.product.price * item.quantity);
            }, 0);
        },
        
        getDiscount() {
            return this.getSubtotal() * discountRate;
        },
        
        getTotal() {
            return this.getSubtotal() - this.getDiscount();
        },
        
        getItems() {
            return [...items]; // Return copy to prevent external modification
        },
        
        getItemCount() {
            return items.reduce((count, item) => count + item.quantity, 0);
        },
        
        clear() {
            items = [];
            discountRate = 0;
            return this;
        },
        
        checkout() {
            if (items.length === 0) {
                return { success: false, message: "Cart is empty" };
            }
            
            let receipt = {
                items: this.getItems(),
                subtotal: this.getSubtotal(),
                discount: this.getDiscount(),
                total: this.getTotal(),
                timestamp: new Date()
            };
            
            this.clear();
            return { success: true, receipt };
        }
    };
}

// Usage example
let cart = createShoppingCart();

let products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 25 },
    { id: 3, name: "Keyboard", price: 75 }
];

cart.addItem(products[0], 1)
    .addItem(products[1], 2)
    .addItem(products[2], 1)
    .applyDiscount(0.1); // 10% discount

console.log(`Items in cart: ${cart.getItemCount()}`);
console.log(`Subtotal: $${cart.getSubtotal()}`);
console.log(`Discount: $${cart.getDiscount()}`);
console.log(`Total: $${cart.getTotal()}`);

let result = cart.checkout();
if (result.success) {
    console.log("Purchase successful!", result.receipt);
}
```

### Library Management System
```javascript
function createLibrary() {
    let books = [];
    let members = [];
    let borrowedBooks = [];
    
    return {
        // Book management
        addBook(book) {
            books.push({
                ...book,
                id: books.length + 1,
                available: true,
                addedDate: new Date()
            });
            return this;
        },
        
        findBook(criteria) {
            return books.filter(book => {
                for (let key in criteria) {
                    if (book[key] !== criteria[key]) {
                        return false;
                    }
                }
                return true;
            });
        },
        
        // Member management
        addMember(member) {
            members.push({
                ...member,
                id: members.length + 1,
                joinDate: new Date(),
                borrowedBooks: []
            });
            return this;
        },
        
        findMember(memberId) {
            return members.find(member => member.id === memberId);
        },
        
        // Borrowing system
        borrowBook(memberId, bookId) {
            let member = this.findMember(memberId);
            let book = books.find(b => b.id === bookId);
            
            if (!member) {
                return { success: false, message: "Member not found" };
            }
            
            if (!book) {
                return { success: false, message: "Book not found" };
            }
            
            if (!book.available) {
                return { success: false, message: "Book not available" };
            }
            
            if (member.borrowedBooks.length >= 3) {
                return { success: false, message: "Member has reached borrowing limit" };
            }
            
            // Process borrowing
            book.available = false;
            member.borrowedBooks.push(bookId);
            borrowedBooks.push({
                memberId,
                bookId,
                borrowDate: new Date(),
                dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days
            });
            
            return { success: true, message: "Book borrowed successfully" };
        },
        
        returnBook(memberId, bookId) {
            let member = this.findMember(memberId);
            let book = books.find(b => b.id === bookId);
            let borrowRecord = borrowedBooks.find(
                record => record.memberId === memberId && record.bookId === bookId
            );
            
            if (!borrowRecord) {
                return { success: false, message: "No borrow record found" };
            }
            
            // Process return
            book.available = true;
            member.borrowedBooks = member.borrowedBooks.filter(id => id !== bookId);
            borrowedBooks = borrowedBooks.filter(
                record => !(record.memberId === memberId && record.bookId === bookId)
            );
            
            // Check for late return
            let isLate = new Date() > borrowRecord.dueDate;
            let message = isLate ? "Book returned late" : "Book returned on time";
            
            return { success: true, message, isLate };
        },
        
        // Reporting
        getAvailableBooks() {
            return books.filter(book => book.available);
        },
        
        getOverdueBooks() {
            let now = new Date();
            return borrowedBooks.filter(record => now > record.dueDate);
        },
        
        getMemberReport(memberId) {
            let member = this.findMember(memberId);
            if (!member) return null;
            
            let currentBorrows = borrowedBooks.filter(record => record.memberId === memberId);
            
            return {
                member: member,
                currentlyBorrowed: currentBorrows.length,
                borrowLimit: 3,
                overdueBooks: currentBorrows.filter(record => new Date() > record.dueDate)
            };
        }
    };
}

// Usage example
let library = createLibrary();

// Add books
library.addBook({ title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "123456789" })
       .addBook({ title: "1984", author: "George Orwell", isbn: "987654321" })
       .addBook({ title: "Pride and Prejudice", author: "Jane Austen", isbn: "456789123" });

// Add members
library.addMember({ name: "Alice Johnson", email: "alice@example.com" })
       .addMember({ name: "Bob Smith", email: "bob@example.com" });

// Borrow books
console.log(library.borrowBook(1, 1)); // Alice borrows "To Kill a Mockingbird"
console.log(library.borrowBook(1, 2)); // Alice borrows "1984"

// Check member report
console.log(library.getMemberReport(1));

// Return book
console.log(library.returnBook(1, 1)); // Alice returns "To Kill a Mockingbird"
```

## Exercise Challenges

1. **Student Grade Manager**: Create an object that manages student grades with methods to add students, record grades, calculate averages, and generate reports.

2. **Todo List Application**: Build a todo list object with methods to add, remove, update, and filter tasks.

3. **Bank Account System**: Design a bank account object with deposit, withdraw, transfer, and transaction history features.

4. **Inventory Management**: Create an inventory system that tracks products, quantities, and values.

5. **Address Book**: Build an address book object that can store contacts, search by various criteria, and manage contact groups.

```javascript
// Example solution for Todo List:
function createTodoList() {
    let todos = [];
    let nextId = 1;
    
    return {
        add(title, description = "", priority = "medium") {
            todos.push({
                id: nextId++,
                title,
                description,
                priority,
                completed: false,
                createdAt: new Date(),
                completedAt: null
            });
            return this;
        },
        
        complete(id) {
            let todo = todos.find(t => t.id === id);
            if (todo && !todo.completed) {
                todo.completed = true;
                todo.completedAt = new Date();
            }
            return this;
        },
        
        remove(id) {
            todos = todos.filter(t => t.id !== id);
            return this;
        },
        
        filter(criteria) {
            return todos.filter(todo => {
                if (criteria.completed !== undefined && todo.completed !== criteria.completed) {
                    return false;
                }
                if (criteria.priority && todo.priority !== criteria.priority) {
                    return false;
                }
                return true;
            });
        },
        
        getAll() {
            return [...todos];
        },
        
        getStats() {
            return {
                total: todos.length,
                completed: todos.filter(t => t.completed).length,
                pending: todos.filter(t => !t.completed).length
            };
        }
    };
}

// Test the todo list
let todoList = createTodoList();
todoList.add("Learn JavaScript", "Complete the objects lesson", "high")
        .add("Buy groceries", "Milk, bread, eggs", "medium")
        .add("Exercise", "", "low");

console.log(todoList.getStats()); // { total: 3, completed: 0, pending: 3 }
todoList.complete(1);
console.log(todoList.filter({ completed: false })); // Pending todos
```
