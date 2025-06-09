# React Router & Navigation

## Introduction to Client-Side Routing

Traditional web applications use server-side routing where each URL change results in a new page request. Single-page applications (SPAs) use client-side routing to update the UI without full page reloads.

### Installing React Router

```bash
npm install react-router-dom
```

### Basic Router Setup

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
```

## Navigation Components

### Link Component

```jsx
import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/about" className="nav-link">About</Link>
      <Link to="/contact" className="nav-link">Contact</Link>
    </nav>
  );
}
```

### NavLink for Active States

```jsx
import { NavLink } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="navbar">
      <NavLink 
        to="/" 
        className={({ isActive }) => 
          isActive ? 'nav-link active' : 'nav-link'
        }
      >
        Home
      </NavLink>
      <NavLink 
        to="/about"
        style={({ isActive }) => ({
          color: isActive ? '#ff6b6b' : '#333',
          fontWeight: isActive ? 'bold' : 'normal'
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Route Parameters and Query Strings

### Dynamic Routes

```jsx
import { Routes, Route } from 'react-router-dom';
import UserProfile from './pages/UserProfile';
import UserPosts from './pages/UserPosts';

function App() {
  return (
    <Routes>
      <Route path="/users/:userId" element={<UserProfile />} />
      <Route path="/users/:userId/posts" element={<UserPosts />} />
      <Route path="/products/:category/:productId" element={<ProductDetail />} />
    </Routes>
  );
}
```

### Using Route Parameters

```jsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading user...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="user-profile">
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
```

### Query Parameters and Search

```jsx
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  
  const category = searchParams.get('category') || 'all';
  const sortBy = searchParams.get('sort') || 'name';
  const page = parseInt(searchParams.get('page')) || 1;

  useEffect(() => {
    fetchProducts({ category, sortBy, page });
  }, [category, sortBy, page]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="product-list">
      <div className="filters">
        <select 
          value={category}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
        
        <select 
          value={sortBy}
          onChange={(e) => updateFilter('sort', e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      
      <div className="products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      <Pagination 
        currentPage={page}
        onPageChange={(newPage) => updateFilter('page', newPage)}
      />
    </div>
  );
}
```

## Nested Routing

### Layout Components

```jsx
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="layout">
      <header>
        <Navigation />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2024 My App</p>
      </footer>
    </div>
  );
}

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <DashboardNavigation />
      </aside>
      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}
```

### Nested Route Configuration

```jsx
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
        
        <Route path="users" element={<UsersLayout />}>
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserDetail />} />
          <Route path=":userId/edit" element={<EditUser />} />
        </Route>
      </Route>
    </Routes>
  );
}
```

## Programmatic Navigation

### useNavigate Hook

```jsx
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await login(credentials);
      if (response.success) {
        // Redirect to dashboard after successful login
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCancel = () => {
    // Go back to previous page
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={credentials.email}
        onChange={(e) => setCredentials({
          ...credentials,
          email: e.target.value
        })}
        placeholder="Email"
      />
      <input
        type="password"
        value={credentials.password}
        onChange={(e) => setCredentials({
          ...credentials,
          password: e.target.value
        })}
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <button type="button" onClick={handleCancel}>Cancel</button>
    </form>
  );
}
```

### Navigation with State

```jsx
function ProductList() {
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/products/${product.id}`, {
      state: { 
        from: 'product-list',
        timestamp: Date.now(),
        product: product
      }
    });
  };

  return (
    <div className="products">
      {products.map(product => (
        <div 
          key={product.id}
          onClick={() => handleProductClick(product)}
          className="product-card"
        >
          <h3>{product.name}</h3>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

function ProductDetail() {
  const { state } = useLocation();
  const { productId } = useParams();

  // Access navigation state
  console.log('Came from:', state?.from);
  console.log('Product data:', state?.product);

  return (
    <div>
      <h1>Product Details</h1>
      {/* Product details */}
    </div>
  );
}
```

## Route Guards and Authentication

### Protected Routes

```jsx
import { Navigate, useLocation } from 'react-router-dom';

function ProtectedRoute({ children, requiredRole = null }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login with return path
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }}
        replace 
      />
    );
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

// Usage in routes
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### Authentication Context

```jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Auth check failed:', error);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (response.ok) {
      const { user, token } = await response.json();
      localStorage.setItem('authToken', token);
      setUser(user);
      setIsAuthenticated(true);
      return { success: true };
    }
    
    throw new Error('Login failed');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

## Advanced Routing Patterns

### Code Splitting with Lazy Loading

```jsx
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/dashboard" 
        element={
          <Suspense fallback={<div>Loading Dashboard...</div>}>
            <Dashboard />
          </Suspense>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <Suspense fallback={<div>Loading Analytics...</div>}>
            <Analytics />
          </Suspense>
        } 
      />
    </Routes>
  );
}
```

### Route Transitions

```jsx
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

// CSS for transitions
/*
.page-enter {
  opacity: 0;
  transform: translateX(100%);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms ease-in-out;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 300ms ease-in-out;
}
*/
```

### Error Boundaries for Routes

```jsx
import { ErrorBoundary } from 'react-error-boundary';

function RouteErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-page">
      <h2>Oops! Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/dashboard/*" 
          element={
            <ErrorBoundary
              FallbackComponent={RouteErrorFallback}
              onReset={() => window.location.reload()}
            >
              <Dashboard />
            </ErrorBoundary>
          } 
        />
      </Routes>
    </Router>
  );
}
```

## Exercises

### Exercise 1: Blog Router
Create a blog application with:
- Home page with recent posts
- Individual post pages with dynamic routes
- Author pages showing all posts by author
- Category filtering with query parameters

### Exercise 2: E-commerce Navigation
Build an e-commerce site structure with:
- Product catalog with search and filters
- Product detail pages
- Shopping cart
- User account dashboard with nested routes

### Exercise 3: Admin Panel
Create an admin panel with:
- Protected routes requiring authentication
- Role-based access control
- Nested dashboard routes
- Breadcrumb navigation

### Exercise 4: Multi-step Wizard
Build a multi-step form wizard using routing:
- Each step as a separate route
- Progress tracking
- Ability to navigate between completed steps
- Form data persistence across steps

## Best Practices Summary

1. **Use meaningful URLs** that reflect your app structure
2. **Implement proper loading states** for route transitions
3. **Handle 404 errors** with a catch-all route
4. **Protect sensitive routes** with authentication guards
5. **Use lazy loading** for better performance
6. **Implement breadcrumbs** for complex navigation
7. **Preserve user input** when navigating between forms
8. **Use relative links** when possible for maintainability

## Next Steps

In the next lesson, we'll explore Performance Optimization techniques to make your React applications faster and more efficient.
