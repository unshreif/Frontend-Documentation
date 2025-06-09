# Props & State Deep Dive

## Understanding Props

Props (short for properties) are how components receive data from their parent components. They make components reusable and configurable.

### Basic Props Usage

```jsx
// Parent component
function App() {
  const user = {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
  };

  return (
    <div>
      <Welcome name="Alice" />
      <UserProfile user={user} isAdmin={true} />
    </div>
  );
}

// Child components
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

function UserProfile({ user, isAdmin }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
      {isAdmin && <span>Admin User</span>}
    </div>
  );
}
```

### Props Destructuring Patterns

```jsx
// Basic destructuring
function BasicCard({ title, content, author }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <small>By {author}</small>
    </div>
  );
}

// Destructuring with default values
function Card({ title = "Untitled", content, author = "Anonymous" }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{content}</p>
      <small>By {author}</small>
    </div>
  );
}

// Rest parameters for remaining props
function FlexibleCard({ title, content, ...otherProps }) {
  return (
    <div className="card" {...otherProps}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
```

### Props Validation and Default Values

```jsx
import PropTypes from 'prop-types';

function Button({ 
  children, 
  variant, 
  size, 
  disabled, 
  onClick 
}) {
  const className = `btn btn--${variant} btn--${size}`;
  
  return (
    <button 
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  onClick: () => {}
};
```

## State Management with useState

State allows components to manage and update their own data over time.

### Basic useState Usage

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

### State with Objects

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    age: ''
  });

  const handleInputChange = (field) => (event) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: event.target.value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('User data:', user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={handleInputChange('name')}
      />
      <input
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={handleInputChange('email')}
      />
      <input
        type="number"
        placeholder="Age"
        value={user.age}
        onChange={handleInputChange('age')}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### State with Arrays

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false
        }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => 
      prevTodos.filter(todo => todo.id !== id)
    );
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none'
              }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Lifting State Up

When multiple components need to share state, lift it up to their common parent.

```jsx
function TemperatureConverter() {
  const [temperature, setTemperature] = useState('');
  const [scale, setScale] = useState('celsius');

  const handleCelsiusChange = (temp) => {
    setTemperature(temp);
    setScale('celsius');
  };

  const handleFahrenheitChange = (temp) => {
    setTemperature(temp);
    setScale('fahrenheit');
  };

  const celsius = scale === 'fahrenheit' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'celsius' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="celsius"
        temperature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="fahrenheit"
        temperature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
}

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = {
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit'
  };

  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input
        value={temperature}
        onChange={(e) => onTemperatureChange(e.target.value)}
      />
    </fieldset>
  );
}

function BoilingVerdict({ celsius }) {
  if (celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

// Helper functions
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}
```

## Advanced State Patterns

### Functional State Updates

```jsx
function AdvancedCounter() {
  const [count, setCount] = useState(0);

  // Using functional update to ensure we get the latest state
  const incrementBy = (amount) => {
    setCount(prevCount => prevCount + amount);
  };

  // Multiple rapid updates
  const incrementMultiple = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => incrementBy(1)}>+1</button>
      <button onClick={() => incrementBy(5)}>+5</button>
      <button onClick={incrementMultiple}>+3 (rapid)</button>
    </div>
  );
}
```

### State Initialization

```jsx
function ExpensiveInitialization() {
  // Lazy initial state - function runs only once
  const [data, setData] = useState(() => {
    console.log('Expensive calculation...');
    return Array.from({ length: 1000 }, (_, i) => i * 2);
  });

  return (
    <div>
      <p>Data length: {data.length}</p>
      <button onClick={() => setData([])}>Clear</button>
    </div>
  );
}
```

### Derived State Pattern

```jsx
function SearchableList({ items }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Derived state - computed from props and state
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <p>Showing {filteredItems.length} of {items.length} items</p>
    </div>
  );
}
```

## State vs Props Comparison

| Aspect | Props | State |
|--------|-------|-------|
| **Mutability** | Immutable | Mutable |
| **Source** | Parent component | Component itself |
| **Purpose** | Configure component | Manage component data |
| **Updates** | Re-render when parent updates | Re-render when setState called |
| **Access** | Read-only | Read and write |

## Best Practices

### 1. Keep State Minimal

```jsx
// Bad: Storing derived data in state
function BadExample({ items }) {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemCount, setItemCount] = useState(0);
  
  // This creates synchronization problems
}

// Good: Compute derived data during render
function GoodExample({ items }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredItems = items.filter(item => 
    item.name.includes(searchTerm)
  );
  const itemCount = filteredItems.length;
  
  // Single source of truth
}
```

### 2. State Normalization

```jsx
// Good: Normalized state structure
function UserManager() {
  const [users, setUsers] = useState({});
  const [userIds, setUserIds] = useState([]);

  const addUser = (user) => {
    setUsers(prev => ({
      ...prev,
      [user.id]: user
    }));
    setUserIds(prev => [...prev, user.id]);
  };

  return (
    <div>
      {userIds.map(id => (
        <UserCard key={id} user={users[id]} />
      ))}
    </div>
  );
}
```

### 3. State Colocation

```jsx
// Good: Keep state close to where it's used
function ShoppingCart() {
  return (
    <div>
      <CartItems />
      <CartSummary />
    </div>
  );
}

function CartItems() {
  const [items, setItems] = useState([]);
  // State is colocated with the component that uses it
  
  return (
    <div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
```

## Common Patterns and Anti-patterns

### Pattern: Controlled Components

```jsx
function ControlledInput() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
```

### Anti-pattern: Direct State Mutation

```jsx
// Bad: Mutating state directly
function BadTodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    todos.push({ id: Date.now(), text }); // Don't do this!
    setTodos(todos);
  };
}

// Good: Create new state
function GoodTodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  };
}
```

## Exercises

### Exercise 1: Shopping Cart
Build a shopping cart with:
- Add/remove items
- Update quantities
- Calculate total price
- Apply discounts

### Exercise 2: Form Validation
Create a form with:
- Real-time validation
- Error messages
- Submit handling
- Reset functionality

### Exercise 3: Theme Switcher
Implement a theme system with:
- Multiple theme options
- Toggle between themes
- Persistent theme selection
- Component-level theme overrides

### Exercise 4: Data Dashboard
Build a dashboard that:
- Fetches and displays data
- Filters and sorts data
- Updates in real-time
- Handles loading and error states

## Key Takeaways

- Props flow down from parent to child components
- State is managed within components and triggers re-renders
- Lift state up when multiple components need shared data
- Use functional updates for state that depends on previous state
- Keep state minimal and colocate it near where it's used
- Avoid direct state mutation - always create new state objects

## Next Steps

In the next lesson, we'll explore Event Handling in React, learning how to create interactive user interfaces that respond to user actions.
