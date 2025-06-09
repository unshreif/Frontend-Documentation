# Performance Optimization

## Understanding React Performance

React is fast by default, but as applications grow, performance can become a concern. Understanding how React works internally helps you optimize effectively.

### React Rendering Process

```jsx
// Component re-renders when:
// 1. State changes
// 2. Props change
// 3. Parent component re-renders
// 4. Context value changes

function ParentComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      
      {/* ChildComponent re-renders even when only count changes */}
      <ChildComponent name={name} />
    </div>
  );
}
```

## React.memo for Component Optimization

### Basic React.memo Usage

```jsx
// Without optimization - re-renders on every parent update
function ExpensiveComponent({ user, settings }) {
  console.log('ExpensiveComponent rendered');
  
  // Expensive computation
  const processedData = heavyCalculation(user.data);
  
  return (
    <div>
      <h3>{user.name}</h3>
      <div>{processedData}</div>
    </div>
  );
}

// With React.memo - only re-renders when props change
const OptimizedComponent = React.memo(function OptimizedComponent({ user, settings }) {
  console.log('OptimizedComponent rendered');
  
  const processedData = heavyCalculation(user.data);
  
  return (
    <div>
      <h3>{user.name}</h3>
      <div>{processedData}</div>
    </div>
  );
});
```

### Custom Comparison Function

```jsx
const UserCard = React.memo(
  function UserCard({ user, theme, onEdit }) {
    return (
      <div className={`user-card ${theme}`}>
        <img src={user.avatar} alt={user.name} />
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <button onClick={() => onEdit(user.id)}>Edit</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison - only re-render if user data or theme changes
    return (
      prevProps.user.id === nextProps.user.id &&
      prevProps.user.name === nextProps.user.name &&
      prevProps.user.email === nextProps.user.email &&
      prevProps.user.avatar === nextProps.user.avatar &&
      prevProps.theme === nextProps.theme
    );
  }
);
```

## useMemo and useCallback Hooks

### useMemo for Expensive Calculations

```jsx
import { useMemo, useState } from 'react';

function ProductList({ products, searchTerm, sortBy }) {
  // Expensive filtering and sorting operation
  const filteredAndSortedProducts = useMemo(() => {
    console.log('Recalculating filtered products');
    
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
  }, [products, searchTerm, sortBy]); // Only recalculate when dependencies change

  return (
    <div>
      {filteredAndSortedProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

// Example of derived state that should use useMemo
function OrderSummary({ items }) {
  const summary = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 10;
    const total = subtotal + tax + shipping;
    
    return { subtotal, tax, shipping, total };
  }, [items]);

  return (
    <div className="order-summary">
      <p>Subtotal: ${summary.subtotal.toFixed(2)}</p>
      <p>Tax: ${summary.tax.toFixed(2)}</p>
      <p>Shipping: ${summary.shipping.toFixed(2)}</p>
      <p><strong>Total: ${summary.total.toFixed(2)}</strong></p>
    </div>
  );
}
```

### useCallback for Function Stability

```jsx
import { useCallback, useState, memo } from 'react';

// Child component that receives callback props
const TodoItem = memo(function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  console.log(`TodoItem ${todo.id} rendered`);
  
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onEdit(todo.id)}>Edit</button>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Without useCallback - new function on every render
  const badToggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // With useCallback - stable function reference
  const toggleTodo = useCallback((id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []); // Empty dependency array - function never changes

  const deleteTodo = useCallback((id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  }, []);

  const editTodo = useCallback((id) => {
    // Edit logic here
    console.log('Edit todo:', id);
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      ))}
    </div>
  );
}
```

## Code Splitting and Lazy Loading

### Component-Level Code Splitting

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load heavy components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Reports = lazy(() => import('./pages/Reports'));

// Component with fallback
const LazyComponentWithFallback = lazy(() => 
  import('./components/HeavyComponent').then(module => ({
    default: module.HeavyComponent
  }))
);

function App() {
  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Suspense>
    </div>
  );
}
```

### Dynamic Imports with Loading States

```jsx
import { useState, useCallback } from 'react';

function DynamicComponent() {
  const [Component, setComponent] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadComponent = useCallback(async (componentName) => {
    setLoading(true);
    try {
      const module = await import(`./components/${componentName}`);
      setComponent(() => module.default);
    } catch (error) {
      console.error('Failed to load component:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <button onClick={() => loadComponent('Chart')}>Load Chart</button>
      <button onClick={() => loadComponent('DataTable')}>Load Table</button>
      
      {loading && <div>Loading component...</div>}
      {Component && <Component />}
    </div>
  );
}
```

## Bundle Analysis and Optimization

### Analyzing Bundle Size

```bash
# Using webpack-bundle-analyzer
npm install --save-dev webpack-bundle-analyzer

# Add to package.json scripts
"analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js"

# Run analysis
npm run analyze
```

### Tree Shaking and Import Optimization

```jsx
// ❌ Bad - imports entire library
import _ from 'lodash';
import * as MaterialUI from '@mui/material';

// ✅ Good - imports only what you need
import { debounce, throttle } from 'lodash';
import { Button, TextField } from '@mui/material';

// ✅ Even better - individual imports
import debounce from 'lodash/debounce';
import Button from '@mui/material/Button';
```

## Virtual Scrolling for Large Lists

### React Window Implementation

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-item">
      <div className="item-content">
        <h4>{items[index].title}</h4>
        <p>{items[index].description}</p>
        <span className="item-meta">{items[index].date}</span>
      </div>
    </div>
  );

  return (
    <List
      height={600} // Container height
      itemCount={items.length}
      itemSize={120} // Height of each item
      width="100%"
    >
      {Row}
    </List>
  );
}

// Variable height list
import { VariableSizeList as VariableList } from 'react-window';

function VariableHeightList({ items }) {
  const getItemSize = (index) => {
    // Calculate height based on content
    const item = items[index];
    return item.type === 'header' ? 60 : 100;
  };

  const Row = ({ index, style }) => (
    <div style={style}>
      {items[index].type === 'header' ? (
        <h3>{items[index].title}</h3>
      ) : (
        <div className="content-item">
          <h4>{items[index].title}</h4>
          <p>{items[index].description}</p>
        </div>
      )}
    </div>
  );

  return (
    <VariableList
      height={600}
      itemCount={items.length}
      itemSize={getItemSize}
      width="100%"
    >
      {Row}
    </VariableList>
  );
}
```

## State Management Optimization

### Reducing Context Re-renders

```jsx
import { createContext, useContext, useMemo } from 'react';

// Split contexts by concern to reduce re-renders
const UserContext = createContext();
const ThemeContext = createContext();
const NotificationContext = createContext();

function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState([]);

  // Memoize context values to prevent unnecessary re-renders
  const userValue = useMemo(() => ({
    user,
    setUser,
    login: (userData) => setUser(userData),
    logout: () => setUser(null)
  }), [user]);

  const themeValue = useMemo(() => ({
    theme,
    setTheme,
    toggleTheme: () => setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }), [theme]);

  const notificationValue = useMemo(() => ({
    notifications,
    addNotification: (notification) => setNotifications(prev => [...prev, notification]),
    removeNotification: (id) => setNotifications(prev => prev.filter(n => n.id !== id))
  }), [notifications]);

  return (
    <UserContext.Provider value={userValue}>
      <ThemeContext.Provider value={themeValue}>
        <NotificationContext.Provider value={notificationValue}>
          {children}
        </NotificationContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  );
}
```

### Optimizing State Updates

```jsx
function OptimizedComponent() {
  const [state, setState] = useState({
    user: null,
    posts: [],
    settings: {}
  });

  // ❌ Bad - updates entire state object
  const badUpdateUser = (newUser) => {
    setState({
      ...state,
      user: newUser
    });
  };

  // ✅ Good - use functional updates
  const updateUser = useCallback((newUser) => {
    setState(prevState => ({
      ...prevState,
      user: newUser
    }));
  }, []);

  // ✅ Better - separate state for unrelated data
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [settings, setSettings] = useState({});

  return <div>{/* component content */}</div>;
}
```

## Image and Asset Optimization

### Lazy Loading Images

```jsx
import { useState, useRef, useEffect } from 'react';

function LazyImage({ src, alt, placeholder, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <>
          {!isLoaded && placeholder && (
            <div className="image-placeholder">{placeholder}</div>
          )}
          <img
            src={src}
            alt={alt}
            onLoad={() => setIsLoaded(true)}
            style={{ display: isLoaded ? 'block' : 'none' }}
          />
        </>
      )}
    </div>
  );
}

// Progressive image loading
function ProgressiveImage({ lowQualitySrc, highQualitySrc, alt }) {
  const [currentSrc, setCurrentSrc] = useState(lowQualitySrc);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(highQualitySrc);
      setIsLoaded(true);
    };
    img.src = highQualitySrc;
  }, [highQualitySrc]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`progressive-image ${isLoaded ? 'loaded' : 'loading'}`}
    />
  );
}
```

## Performance Monitoring

### Custom Performance Hook

```jsx
import { useEffect, useRef } from 'react';

function usePerformanceMonitor(componentName) {
  const renderStart = useRef();

  useEffect(() => {
    renderStart.current = performance.now();
  });

  useEffect(() => {
    if (renderStart.current) {
      const renderTime = performance.now() - renderStart.current;
      if (renderTime > 16) { // 60fps threshold
        console.warn(`${componentName} render took ${renderTime.toFixed(2)}ms`);
      }
    }
  });
}

function MonitoredComponent() {
  usePerformanceMonitor('MonitoredComponent');
  
  // Component logic here
  return <div>Component content</div>;
}
```

### React DevTools Profiler

```jsx
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  console.log('Profiler data:', {
    id,
    phase, // 'mount' or 'update'
    actualDuration, // Time spent rendering
    baseDuration, // Estimated time without memoization
    startTime,
    commitTime
  });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <Header />
      <Main />
      <Footer />
    </Profiler>
  );
}
```

## Exercises

### Exercise 1: Performance Audit
Take an existing React application and:
- Use React DevTools Profiler to identify slow components
- Implement React.memo where appropriate
- Add useMemo and useCallback optimizations
- Measure before and after performance

### Exercise 2: Virtual Scrolling
Create a large data table with:
- 10,000+ rows of data
- Virtual scrolling implementation
- Search and filter functionality
- Performance comparison with regular rendering

### Exercise 3: Code Splitting
Implement code splitting for:
- Route-based splitting
- Component-based splitting
- Feature-based splitting
- Measure bundle size improvements

### Exercise 4: Image Gallery
Build an optimized image gallery with:
- Lazy loading images
- Progressive image loading
- Intersection Observer
- Performance monitoring

## Best Practices Summary

1. **Profile before optimizing** - use React DevTools Profiler
2. **Avoid premature optimization** - React is fast by default
3. **Use React.memo judiciously** - not every component needs it
4. **Memoize expensive calculations** with useMemo
5. **Stabilize function references** with useCallback
6. **Implement code splitting** for large applications
7. **Optimize bundle size** with tree shaking
8. **Monitor performance** in production
9. **Use virtual scrolling** for large lists
10. **Lazy load non-critical resources**

## Next Steps

In the next lesson, we'll explore Testing React Applications, learning how to write effective tests for your components and applications.
