# Unit Testing Mastery with Jest

## 🎯 Learning Objectives
- Set up and configure Jest for unit testing
- Write effective unit tests for JavaScript functions
- Master mocking and stubbing techniques
- Test asynchronous code and promises
- Implement snapshot testing

## 🚀 Getting Started with Jest

### Installation

```bash
# Install Jest
npm install --save-dev jest

# Install additional utilities
npm install --save-dev @testing-library/jest-dom
```

### Basic Configuration

```javascript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapping: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/serviceWorker.js'
  ]
};
```

```javascript
// src/setupTests.js
import '@testing-library/jest-dom';
```

## 📝 Writing Your First Unit Test

### Basic Test Structure

```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

export function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}
```

```javascript
// math.test.js
import { add, multiply, divide } from './math';

describe('Math utilities', () => {
  test('should add two numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
    expect(add(-1, 1)).toBe(0);
    expect(add(0, 0)).toBe(0);
  });

  test('should multiply two numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12);
    expect(multiply(-2, 3)).toBe(-6);
    expect(multiply(0, 5)).toBe(0);
  });

  test('should divide two numbers correctly', () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(-8, 2)).toBe(-4);
  });

  test('should throw error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
  });
});
```

## 🔧 Jest Matchers

### Common Matchers

```javascript
// Equality
expect(2 + 2).toBe(4);
expect({ name: 'John' }).toEqual({ name: 'John' });

// Truthiness
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeNull();
expect(undefined).toBeUndefined();
expect('Hello').toBeDefined();

// Numbers
expect(2 + 2).toBeGreaterThan(3);
expect(Math.PI).toBeCloseTo(3.14, 2);

// Strings
expect('Hello World').toMatch(/World/);
expect('Hello World').toContain('World');

// Arrays
expect(['apple', 'banana']).toContain('banana');
expect(['a', 'b', 'c']).toHaveLength(3);

// Objects
expect({ name: 'John', age: 30 }).toHaveProperty('name');
expect({ name: 'John', age: 30 }).toHaveProperty('age', 30);
```

### Custom Matchers

```javascript
// Custom matcher
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    if (pass) {
      return {
        message: () => `expected ${received} not to be within range ${floor} - ${ceiling}`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
        pass: false,
      };
    }
  },
});

test('should be within range', () => {
  expect(100).toBeWithinRange(90, 110);
});
```

## 🎭 Mocking and Stubbing

### Mock Functions

```javascript
// Creating mock functions
const mockCallback = jest.fn();

// Testing function calls
test('should call callback function', () => {
  const users = ['John', 'Jane'];
  users.forEach(mockCallback);

  expect(mockCallback).toHaveBeenCalledTimes(2);
  expect(mockCallback).toHaveBeenCalledWith('John');
  expect(mockCallback).toHaveBeenCalledWith('Jane');
});

// Mock return values
const mockFn = jest.fn();
mockFn.mockReturnValue(42);
mockFn.mockReturnValueOnce(10);

expect(mockFn()).toBe(10);
expect(mockFn()).toBe(42);
```

### Mocking Modules

```javascript
// userService.js
export async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}

// userService.test.js
import { fetchUser } from './userService';

// Mock the fetch function
global.fetch = jest.fn();

describe('User Service', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should fetch user data', async () => {
    const mockUser = { id: 1, name: 'John Doe' };
    
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser)
    });

    const user = await fetchUser(1);

    expect(fetch).toHaveBeenCalledWith('/api/users/1');
    expect(user).toEqual(mockUser);
  });

  test('should handle fetch error', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    await expect(fetchUser(1)).rejects.toThrow('Network error');
  });
});
```

### Mocking ES6 Modules

```javascript
// logger.js
export function logError(message) {
  console.error(`Error: ${message}`);
}

// service.test.js
import { processData } from './service';
import * as logger from './logger';

// Mock the entire module
jest.mock('./logger');

const mockedLogger = logger as jest.Mocked<typeof logger>;

test('should log errors when processing fails', () => {
  mockedLogger.logError.mockImplementation(() => {});

  processData(null);

  expect(mockedLogger.logError).toHaveBeenCalledWith('Invalid data');
});
```

## ⏰ Testing Asynchronous Code

### Testing Promises

```javascript
// async function
async function fetchData() {
  const response = await fetch('/api/data');
  if (!response.ok) {
    throw new Error('Failed to fetch');
  }
  return response.json();
}

// Testing with async/await
test('should fetch data successfully', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ data: 'test' })
  });

  const result = await fetchData();
  expect(result).toEqual({ data: 'test' });
});

// Testing promise rejections
test('should handle fetch failure', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false
  });

  await expect(fetchData()).rejects.toThrow('Failed to fetch');
});
```

### Testing with setTimeout/setInterval

```javascript
// timer.js
export function delayedGreeting(name, delay) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, delay);
  });
}

// timer.test.js
import { delayedGreeting } from './timer';

// Mock timers
jest.useFakeTimers();

test('should resolve after delay', async () => {
  const promise = delayedGreeting('John', 1000);
  
  // Fast-forward time
  jest.advanceTimersByTime(1000);
  
  const result = await promise;
  expect(result).toBe('Hello, John!');
});

// Restore real timers
afterEach(() => {
  jest.useRealTimers();
});
```

## 📸 Snapshot Testing

### Basic Snapshot Testing

```javascript
// component.js
export function renderUserCard(user) {
  return `
    <div class="user-card">
      <h2>${user.name}</h2>
      <p>${user.email}</p>
      <span class="role">${user.role}</span>
    </div>
  `;
}

// component.test.js
import { renderUserCard } from './component';

test('should render user card correctly', () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin'
  };

  const result = renderUserCard(user);
  expect(result).toMatchSnapshot();
});
```

### Inline Snapshots

```javascript
test('should format date correctly', () => {
  const date = new Date('2023-01-01');
  const formatted = formatDate(date);
  
  expect(formatted).toMatchInlineSnapshot(`"January 1, 2023"`);
});
```

## 🧪 Advanced Testing Patterns

### Test Data Builders

```javascript
// userBuilder.js
class UserBuilder {
  constructor() {
    this.user = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      isActive: true
    };
  }

  withId(id) {
    this.user.id = id;
    return this;
  }

  withName(name) {
    this.user.name = name;
    return this;
  }

  withEmail(email) {
    this.user.email = email;
    return this;
  }

  asAdmin() {
    this.user.role = 'admin';
    return this;
  }

  inactive() {
    this.user.isActive = false;
    return this;
  }

  build() {
    return { ...this.user };
  }
}

export const aUser = () => new UserBuilder();

// Usage in tests
test('should validate admin user', () => {
  const admin = aUser()
    .withName('Jane Smith')
    .asAdmin()
    .build();

  expect(validateUser(admin)).toBe(true);
});
```

### Parameterized Tests

```javascript
describe.each([
  ['add', 1, 2, 3],
  ['subtract', 5, 2, 3],
  ['multiply', 2, 3, 6],
  ['divide', 8, 2, 4]
])('Calculator %s operation', (operation, a, b, expected) => {
  test(`should calculate ${a} ${operation} ${b} = ${expected}`, () => {
    const calculator = new Calculator();
    const result = calculator[operation](a, b);
    expect(result).toBe(expected);
  });
});
```

## 🏃‍♂️ Hands-on Exercises

### Exercise 1: Shopping Cart

Create comprehensive unit tests for a shopping cart:

```javascript
class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(product, quantity = 1) {
    const existingItem = this.items.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.product.id !== productId);
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  getTotal() {
    return this.items.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }

  clear() {
    this.items = [];
  }
}
```

### Exercise 2: Form Validation

Write unit tests for form validation functions:

```javascript
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

export function validateForm(formData) {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }
  
  if (!validateEmail(formData.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!validatePhone(formData.phone)) {
    errors.phone = 'Phone must be in format (555) 123-4567';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
```

## 📊 Code Coverage

### Setting Up Coverage

```javascript
// jest.config.js
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

### Running Coverage

```bash
# Run tests with coverage
npm test -- --coverage

# Watch mode with coverage
npm test -- --coverage --watchAll
```

## 🚀 Best Practices

1. **Test Behavior, Not Implementation**
2. **Keep Tests Simple and Focused**
3. **Use Descriptive Test Names**
4. **Follow AAA Pattern (Arrange, Act, Assert)**
5. **Mock External Dependencies**
6. **Test Edge Cases and Error Conditions**
7. **Maintain High Code Coverage**
8. **Keep Tests Fast and Independent**

## 📚 Resources

- [Jest Documentation](https://jestjs.io/)
- [Jest Cheat Sheet](https://github.com/sapegin/jest-cheat-sheet)
- [JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)

---

**Next Lesson**: [Testing React Components](./03-react-testing.md)

# Unit Testing

## What is Unit Testing?

- Testing the smallest testable parts of code (functions, classes, modules)
- Each test should be fast, isolated, and deterministic

## Benefits

- Catch bugs early
- Enable safe refactoring
- Serve as documentation

## Anatomy of a Unit Test

```js
test('adds two numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```
- **Arrange**: Set up data/inputs
- **Act**: Call the function
- **Assert**: Check the result

## Example: Testing a Function

```js
function capitalize(str) {
  if (!str) return '';
  return str[0].toUpperCase() + str.slice(1);
}

test('capitalizes first letter', () => {
  expect(capitalize('hello')).toBe('Hello');
  expect(capitalize('world')).toBe('World');
  expect(capitalize('')).toBe('');
});
```

## Mocking and Stubbing

- **Mock**: Replace a dependency with a fake version
- **Stub**: Provide canned responses for functions

```js
const fetchData = jest.fn(() => Promise.resolve('data'));
test('fetchData returns data', async () => {
  const result = await fetchData();
  expect(result).toBe('data');
});
```

## Organizing Tests

- Place tests next to code (`sum.test.js`) or in `__tests__` folders
- Use `describe` blocks to group related tests

```js
describe('math utils', () => {
  test('add', () => { /* ... */ });
  test('subtract', () => { /* ... */ });
});
```

## Running Tests

- Use `npm test` or `yarn test`
- Watch mode for fast feedback

## Best Practices

- Test one thing per test
- Avoid testing implementation details
- Use clear, descriptive names
- Keep tests independent

## Exercise

1. Write a unit test for a `reverseString(str)` function.
2. Refactor a function and verify tests still pass.

## Next Steps

Learn about testing React components and UI with React Testing Library.
