# React Hooks Deep Dive

## Introduction to React Hooks

React Hooks are functions that allow you to use state and other React features in functional components. They were introduced in React 16.8 and have revolutionized how we write React applications.

### Why Hooks?

```jsx
// Before Hooks - Class Component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// After Hooks - Functional Component
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

## useState Hook

### Basic useState Usage

```jsx
import React, { useState } from 'react';

function UserProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(0);

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
      />
    </form>
  );
}
```

### useState with Objects and Arrays

```jsx
function UserForm() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    preferences: {
      theme: 'light',
      notifications: true
    }
  });

  const [skills, setSkills] = useState([]);

  const updateUser = (field, value) => {
    setUser(prevUser => ({
      ...prevUser,
      [field]: value
    }));
  };

  const updatePreferences = (preference, value) => {
    setUser(prevUser => ({
      ...prevUser,
      preferences: {
        ...prevUser.preferences,
        [preference]: value
      }
    }));
  };

  const addSkill = (skill) => {
    setSkills(prevSkills => [...prevSkills, skill]);
  };

  const removeSkill = (index) => {
    setSkills(prevSkills => prevSkills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateUser('name', e.target.value)}
      />
      
      <label>
        <input
          type="checkbox"
          checked={user.preferences.notifications}
          onChange={(e) => updatePreferences('notifications', e.target.checked)}
        />
        Enable notifications
      </label>

      <div>
        <h3>Skills</h3>
        {skills.map((skill, index) => (
          <div key={index}>
            {skill}
            <button onClick={() => removeSkill(index)}>Remove</button>
          </div>
        ))}
        <button onClick={() => addSkill(`Skill ${skills.length + 1}`)}>
          Add Skill
        </button>
      </div>
    </div>
  );
}
```

## useEffect Hook

### Basic useEffect Usage

```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // Dependency array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

### useEffect Cleanup

```jsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('Timer component unmounted');
    };
  }, []);

  return (
    <div>
      <p>Seconds: {seconds}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setSeconds(0)}>Reset</button>
    </div>
  );
}
```

### Multiple useEffect Hooks

```jsx
function Dashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Effect for fetching user data
  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(setUser);
  }, [userId]);

  // Effect for fetching posts
  useEffect(() => {
    if (user) {
      fetch(`/api/users/${user.id}/posts`)
        .then(response => response.json())
        .then(setPosts);
    }
  }, [user]);

  // Effect for setting up notifications
  useEffect(() => {
    const eventSource = new EventSource('/api/notifications');
    
    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications(prev => [...prev, notification]);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {user && <h1>Welcome, {user.name}</h1>}
      <div>Posts: {posts.length}</div>
      <div>Notifications: {notifications.length}</div>
    </div>
  );
}
```

## useContext Hook

### Creating and Using Context

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();
const UserContext = createContext();

// Theme Provider
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// User Provider
function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hooks for contexts
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// Components using context
function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <header className={`header ${theme}`}>
      <h1>My App</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} mode
      </button>
      {user ? (
        <div>
          Welcome, {user.name}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button>Login</button>
      )}
    </header>
  );
}

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Header />
        {/* Other components */}
      </UserProvider>
    </ThemeProvider>
  );
}
```

## useReducer Hook

### Basic useReducer Usage

```jsx
import React, { useReducer } from 'react';

// Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET_COUNT':
      return { count: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'RESET' })}>
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'SET_COUNT', payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}
```

### Complex State with useReducer

```jsx
// Initial state
const initialState = {
  user: null,
  posts: [],
  loading: false,
  error: null
};

// Reducer function
function appReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    
    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        loading: false,
        posts: action.payload
      };
    
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case 'ADD_POST':
      return {
        ...state,
        posts: [...state.posts, action.payload]
      };
    
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    
    case 'LOGOUT':
      return initialState;
    
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchUser = async (userId) => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const addPost = (post) => {
    dispatch({ type: 'ADD_POST', payload: { ...post, id: Date.now() } });
  };

  return (
    <div>
      {state.loading && <div>Loading...</div>}
      {state.error && <div>Error: {state.error}</div>}
      {state.user && <h1>Welcome, {state.user.name}</h1>}
      <div>Posts: {state.posts.length}</div>
    </div>
  );
}
```

## Custom Hooks

### Creating Custom Hooks

```jsx
// Custom hook for API calls
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

// Custom hook for local storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage:', error);
    }
  };

  return [storedValue, setValue];
}

// Custom hook for form handling
function useForm(initialValues, validationRules = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Validate field on blur
    if (validationRules[name]) {
      const error = validationRules[name](values[name]);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach(field => {
      const error = validationRules[field](values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset
  };
}

// Using custom hooks
function UserProfile() {
  const { data: user, loading, error } = useApi('/api/user/profile');
  const [preferences, setPreferences] = useLocalStorage('userPreferences', {
    theme: 'light',
    notifications: true
  });

  const { values, errors, handleChange, handleBlur, validate } = useForm(
    { name: '', email: '', bio: '' },
    {
      name: (value) => !value ? 'Name is required' : '',
      email: (value) => !value ? 'Email is required' : 
             !/\S+@\S+\.\S+/.test(value) ? 'Email is invalid' : ''
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Theme: {preferences.theme}</p>
      <button onClick={() => setPreferences(prev => ({ 
        ...prev, 
        theme: prev.theme === 'light' ? 'dark' : 'light' 
      }))}>
        Toggle Theme
      </button>
      
      <form>
        <input
          type="text"
          placeholder="Name"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </form>
    </div>
  );
}
```

## Advanced Hook Patterns

### useCallback and useMemo

```jsx
import React, { useState, useCallback, useMemo } from 'react';

function ExpensiveComponent({ items, filter, onItemClick }) {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  const sortedItems = useMemo(() => {
    console.log('Sorting items...');
    return [...filteredItems].sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredItems]);

  // Memoize callback functions
  const handleItemClick = useCallback((item) => {
    console.log('Item clicked:', item);
    onItemClick(item);
  }, [onItemClick]);

  return (
    <div>
      {sortedItems.map(item => (
        <div key={item.id} onClick={() => handleItemClick(item)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

// Parent component
function ItemList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Cherry' }
  ]);
  const [filter, setFilter] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter items..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ExpensiveComponent
        items={items}
        filter={filter}
        onItemClick={handleItemClick}
      />
      {selectedItem && <p>Selected: {selectedItem.name}</p>}
    </div>
  );
}
```

### useRef Hook

```jsx
import React, { useRef, useEffect, useState } from 'react';

function FocusInput() {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Focus input on mount
    inputRef.current.focus();
  }, []);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type here..."
      />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

// Using useRef for previous values
function PreviousValue({ value }) {
  const prevValueRef = useRef();
  
  useEffect(() => {
    prevValueRef.current = value;
  });

  const prevValue = prevValueRef.current;

  return (
    <div>
      <p>Current value: {value}</p>
      <p>Previous value: {prevValue}</p>
    </div>
  );
}

// Timer with useRef
function Timer() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
```

## Hook Rules and Best Practices

### Rules of Hooks

```jsx
// ✅ Good: Always call hooks at the top level
function GoodComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return <div>...</div>;
}

// ❌ Bad: Don't call hooks inside conditions
function BadComponent({ condition }) {
  if (condition) {
    const [count, setCount] = useState(0); // Wrong!
  }

  return <div>...</div>;
}

// ❌ Bad: Don't call hooks inside loops
function AnotherBadComponent({ items }) {
  const data = [];
  
  for (let item of items) {
    const [state, setState] = useState(item); // Wrong!
    data.push(state);
  }

  return <div>...</div>;
}

// ✅ Good: Conditional logic inside hooks
function ConditionalHook({ shouldFetch, url }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (shouldFetch) {
      fetch(url).then(response => response.json()).then(setData);
    }
  }, [shouldFetch, url]);

  return <div>...</div>;
}
```

### Best Practices

```jsx
// 1. Use custom hooks for reusable logic
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// 2. Optimize dependencies in useEffect
function OptimizedComponent({ user }) {
  const [posts, setPosts] = useState([]);

  // ✅ Good: Specific dependencies
  useEffect(() => {
    fetchUserPosts(user.id).then(setPosts);
  }, [user.id]); // Only re-run when user ID changes

  // ❌ Bad: Object dependency (will run on every render)
  // useEffect(() => {
  //   fetchUserPosts(user.id).then(setPosts);
  // }, [user]);

  return <div>...</div>;
}

// 3. Separate concerns with multiple useEffect hooks
function ComponentWithMultipleEffects({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // Effect for user data
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);

  // Effect for posts (depends on user)
  useEffect(() => {
    if (user) {
      fetchUserPosts(user.id).then(setPosts);
    }
  }, [user]);

  // Effect for document title
  useEffect(() => {
    if (user) {
      document.title = `${user.name}'s Profile`;
    }
    
    return () => {
      document.title = 'My App';
    };
  }, [user]);

  return <div>...</div>;
}
```

## Exercises

### Exercise 1: Todo App with Hooks
Create a todo application using useState and useEffect:
- Add/remove todos
- Mark todos as complete
- Filter todos (all, active, completed)
- Persist todos to localStorage

### Exercise 2: User Authentication
Build a user authentication system using useContext and useReducer:
- Login/logout functionality
- Protected routes
- User profile management
- Persistent authentication state

### Exercise 3: Data Fetching Hook
Create a custom hook for data fetching with:
- Loading states
- Error handling
- Caching
- Retry functionality

### Exercise 4: Form Validation
Build a comprehensive form with custom hooks:
- Real-time validation
- Multiple field types
- Dynamic form fields
- Form submission handling

## Summary

React Hooks provide a powerful way to:
- Use state and lifecycle features in functional components
- Share stateful logic between components
- Organize component logic by concerns rather than lifecycle methods
- Create more reusable and testable code

Key hooks covered:
- **useState**: For component state
- **useEffect**: For side effects and lifecycle
- **useContext**: For consuming context
- **useReducer**: For complex state management
- **useCallback/useMemo**: For performance optimization
- **useRef**: For accessing DOM elements and persisting values
- **Custom hooks**: For reusable stateful logic

## Next Steps

In the next lesson, we'll explore Forms in React, learning how to handle user input, validation, and form submission in React applications.
