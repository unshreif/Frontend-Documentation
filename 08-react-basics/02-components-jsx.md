# Components & JSX Mastery

## Understanding Components

Components are the building blocks of React applications. They encapsulate UI logic and can be composed together to create complex interfaces.

### Functional Components (Recommended)

```jsx
// Basic functional component
function Greeting() {
  return <h1>Hello, World!</h1>;
}

// Arrow function component
const Greeting = () => {
  return <h1>Hello, World!</h1>;
};

// Implicit return for simple components
const Greeting = () => <h1>Hello, World!</h1>;
```

### Class Components (Legacy)

```jsx
import React, { Component } from 'react';

class Greeting extends Component {
  render() {
    return <h1>Hello, World!</h1>;
  }
}
```

## JSX Deep Dive

JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript.

### JSX Rules

1. **Return single parent element**
```jsx
// ❌ Wrong
function App() {
  return (
    <h1>Title</h1>
    <p>Paragraph</p>
  );
}

// ✅ Correct
function App() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph</p>
    </div>
  );
}

// ✅ Using React Fragment
function App() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph</p>
    </>
  );
}
```

2. **Use className instead of class**
```jsx
// ❌ Wrong
<div class="container">Content</div>

// ✅ Correct
<div className="container">Content</div>
```

3. **Self-closing tags must be closed**
```jsx
// ❌ Wrong
<img src="image.jpg">
<input type="text">

// ✅ Correct
<img src="image.jpg" />
<input type="text" />
```

### JavaScript Expressions in JSX

```jsx
function UserProfile({ user }) {
  const isAdmin = user.role === 'admin';
  
  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Age: {user.age}</p>
      <p>Status: {isAdmin ? 'Administrator' : 'User'}</p>
      <ul>
        {user.hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Conditional Rendering in JSX

```jsx
function NotificationBanner({ hasNotifications, count }) {
  return (
    <div>
      {hasNotifications && (
        <div className="notification-banner">
          You have {count} new notifications
        </div>
      )}
      
      {count > 0 ? (
        <span className="badge">{count}</span>
      ) : (
        <span className="no-notifications">No new notifications</span>
      )}
    </div>
  );
}
```

## Component Composition

### Basic Composition

```jsx
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
      <UserMenu />
    </header>
  );
}

function Logo() {
  return <img src="/logo.png" alt="Company Logo" />;
}

function Navigation() {
  return (
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  );
}
```

### Children Prop Pattern

```jsx
function Card({ children, title }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Usage
function App() {
  return (
    <Card title="User Profile">
      <p>Name: John Doe</p>
      <p>Email: john@example.com</p>
      <button>Edit Profile</button>
    </Card>
  );
}
```

## Props Validation with PropTypes

```jsx
import PropTypes from 'prop-types';

function UserCard({ name, age, email, isActive }) {
  return (
    <div className={`user-card ${isActive ? 'active' : 'inactive'}`}>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  isActive: PropTypes.bool
};

UserCard.defaultProps = {
  isActive: true
};
```

## Advanced JSX Patterns

### Dynamic Component Rendering

```jsx
function FormField({ type, ...props }) {
  const ComponentMap = {
    text: TextInput,
    email: EmailInput,
    password: PasswordInput,
    select: SelectInput
  };
  
  const Component = ComponentMap[type] || TextInput;
  
  return <Component {...props} />;
}
```

### Render Props Pattern

```jsx
function DataFetcher({ render, url }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading });
}

// Usage
<DataFetcher 
  url="/api/users" 
  render={({ data, loading }) => (
    loading ? <div>Loading...</div> : <UserList users={data} />
  )}
/>
```

## JSX Best Practices

### 1. Keep Components Small and Focused

```jsx
// ❌ Too much responsibility
function UserDashboard({ user }) {
  return (
    <div>
      {/* Navigation logic */}
      {/* User profile logic */}
      {/* Statistics logic */}
      {/* Recent activity logic */}
    </div>
  );
}

// ✅ Separated concerns
function UserDashboard({ user }) {
  return (
    <div>
      <DashboardNav />
      <UserProfile user={user} />
      <UserStats userId={user.id} />
      <RecentActivity userId={user.id} />
    </div>
  );
}
```

### 2. Use Meaningful Component Names

```jsx
// ❌ Unclear naming
function Comp1() {
  return <div>...</div>;
}

// ✅ Descriptive naming
function ProductCard() {
  return <div>...</div>;
}
```

### 3. Organize Imports Properly

```jsx
// External libraries
import React from 'react';
import PropTypes from 'prop-types';

// Internal components
import Header from './Header';
import Footer from './Footer';

// Utilities and helpers
import { formatDate } from '../utils/dateUtils';

// Styles
import './App.css';
```

## Common Pitfalls and Solutions

### 1. Missing Keys in Lists

```jsx
// ❌ Missing keys
{users.map(user => (
  <UserCard user={user} />
))}

// ✅ Proper keys
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}
```

### 2. Inline Functions in Render

```jsx
// ❌ Creates new function on every render
function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <button onClick={() => onToggle(todo.id)}>
            {todo.text}
          </button>
        </li>
      ))}
    </ul>
  );
}

// ✅ Use useCallback for optimization
function TodoList({ todos, onToggle }) {
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);

  return (
    <ul>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={handleToggle} 
        />
      ))}
    </ul>
  );
}
```

## Exercise: Build a Product Card Component

Create a reusable ProductCard component with the following features:

1. Display product image, name, price, and description
2. Show a "Sale" badge if the product is on sale
3. Include an "Add to Cart" button
4. Use PropTypes for type checking
5. Style with CSS modules or styled-components

```jsx
// Your implementation here
function ProductCard({ product, onAddToCart }) {
  // Implement the component
}
```

## Key Takeaways

- Functional components are the modern standard
- JSX provides a declarative way to describe UI
- Components should be small, focused, and reusable
- Props validation helps catch bugs early
- Composition is preferred over inheritance
- Follow naming conventions and organize code properly

## Next Steps

In the next lesson, we'll explore Props and State management, learning how to pass data between components and manage component state effectively.
