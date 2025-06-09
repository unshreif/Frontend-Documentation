# Conditional Rendering Patterns

## Understanding Conditional Rendering

Conditional rendering allows you to display different UI elements based on certain conditions, such as component state, props, or user authentication status.

### Basic Conditional Rendering

```jsx
function WelcomeMessage({ isLoggedIn, user }) {
  // Method 1: if/else statement
  if (isLoggedIn) {
    return <h1>Welcome back, {user.name}!</h1>;
  } else {
    return <h1>Please sign in.</h1>;
  }
}

// Method 2: Ternary operator
function LoginStatus({ isLoggedIn, user }) {
  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
    </div>
  );
}

// Method 3: Logical AND operator
function Notification({ hasNotifications, count }) {
  return (
    <div>
      <h1>Dashboard</h1>
      {hasNotifications && (
        <div className="notification">
          You have {count} new notifications
        </div>
      )}
    </div>
  );
}
```

### Multiple Conditions

```jsx
function UserDashboard({ user, loading, error }) {
  // Early returns for different states
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Something went wrong</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>
          Try Again
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="no-user">
        <h2>No user found</h2>
        <p>Please check your login credentials.</p>
      </div>
    );
  }

  // Main component render
  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <UserProfile user={user} />
      <UserStats stats={user.stats} />
    </div>
  );
}
```

## Advanced Conditional Patterns

### Switch-like Rendering with IIFE

```jsx
function StatusIndicator({ status }) {
  return (
    <div className="status-indicator">
      {(() => {
        switch (status) {
          case 'loading':
            return <span className="loading">⏳ Loading...</span>;
          case 'success':
            return <span className="success">✅ Success</span>;
          case 'error':
            return <span className="error">❌ Error</span>;
          case 'warning':
            return <span className="warning">⚠️ Warning</span>;
          default:
            return <span className="neutral">ℹ️ Unknown</span>;
        }
      })()}
    </div>
  );
}
```

### Object-Based Conditional Rendering

```jsx
function Icon({ type, size = 'medium' }) {
  const icons = {
    home: '🏠',
    user: '👤',
    settings: '⚙️',
    mail: '📧',
    search: '🔍'
  };

  const sizes = {
    small: '16px',
    medium: '24px',
    large: '32px'
  };

  const icon = icons[type];
  
  if (!icon) {
    return <span>❓</span>;
  }

  return (
    <span style={{ fontSize: sizes[size] }}>
      {icon}
    </span>
  );
}

// Usage
function Navigation() {
  return (
    <nav>
      <Icon type="home" size="large" />
      <Icon type="user" />
      <Icon type="settings" size="small" />
    </nav>
  );
}
```

### Component Mapping Pattern

```jsx
function DynamicForm({ fields }) {
  const componentMap = {
    text: TextInput,
    email: EmailInput,
    password: PasswordInput,
    select: SelectInput,
    textarea: TextAreaInput,
    checkbox: CheckboxInput
  };

  return (
    <form>
      {fields.map(field => {
        const Component = componentMap[field.type];
        
        if (!Component) {
          console.warn(`Unknown field type: ${field.type}`);
          return null;
        }
        
        return (
          <Component
            key={field.id}
            {...field}
          />
        );
      })}
    </form>
  );
}

// Field components
function TextInput({ id, label, placeholder, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function SelectInput({ id, label, options, required }) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} required={required}>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Loading States and Skeletons

### Loading Indicators

```jsx
function DataView({ data, loading, error }) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return <DataDisplay data={data} />;
}

function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>Loading your data...</p>
    </div>
  );
}

// Skeleton loading for better UX
function SkeletonLoader() {
  return (
    <div className="skeleton-container">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text short"></div>
    </div>
  );
}

function UserCard({ user, loading }) {
  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
      <p>{user.location}</p>
    </div>
  );
}
```

### Progressive Loading

```jsx
function ImageGallery({ images }) {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const handleImageLoad = (imageId) => {
    setLoadedImages(prev => new Set([...prev, imageId]));
  };

  return (
    <div className="image-gallery">
      {images.map(image => (
        <div key={image.id} className="image-container">
          {!loadedImages.has(image.id) && (
            <div className="image-placeholder">
              <div className="loading-shimmer"></div>
            </div>
          )}
          <img
            src={image.url}
            alt={image.alt}
            onLoad={() => handleImageLoad(image.id)}
            style={{
              display: loadedImages.has(image.id) ? 'block' : 'none'
            }}
          />
        </div>
      ))}
    </div>
  );
}
```

## Permission-Based Rendering

### Role-Based Components

```jsx
function ProtectedComponent({ requiredRole, userRole, children }) {
  const hasPermission = checkPermission(userRole, requiredRole);
  
  if (!hasPermission) {
    return (
      <div className="access-denied">
        <h3>Access Denied</h3>
        <p>You don't have permission to view this content.</p>
      </div>
    );
  }
  
  return children;
}

function checkPermission(userRole, requiredRole) {
  const roleHierarchy = {
    guest: 0,
    user: 1,
    moderator: 2,
    admin: 3,
    superadmin: 4
  };
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
}

// Usage
function AdminPanel({ user }) {
  return (
    <div>
      <h1>Dashboard</h1>
      
      <ProtectedComponent requiredRole="user" userRole={user.role}>
        <UserSettings />
      </ProtectedComponent>
      
      <ProtectedComponent requiredRole="moderator" userRole={user.role}>
        <ModerationTools />
      </ProtectedComponent>
      
      <ProtectedComponent requiredRole="admin" userRole={user.role}>
        <AdminSettings />
      </ProtectedComponent>
    </div>
  );
}
```

### Feature Flag System

```jsx
function FeatureFlag({ feature, children, fallback = null }) {
  const { isEnabled } = useFeatureFlags();
  
  if (!isEnabled(feature)) {
    return fallback;
  }
  
  return children;
}

function useFeatureFlags() {
  const [flags] = useState({
    newDashboard: true,
    betaFeatures: false,
    darkMode: true
  });
  
  const isEnabled = (feature) => Boolean(flags[feature]);
  
  return { isEnabled, flags };
}

// Usage
function App() {
  return (
    <div>
      <FeatureFlag feature="newDashboard" fallback={<OldDashboard />}>
        <NewDashboard />
      </FeatureFlag>
      
      <FeatureFlag feature="betaFeatures">
        <BetaFeaturePanel />
      </FeatureFlag>
    </div>
  );
}
```

## Error Boundaries and Error States

### Error Boundary Component

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Functional Error Boundary with react-error-boundary
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-fallback">
      <h2>Oops! Something went wrong</h2>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Error logged:', error, errorInfo);
      }}
    >
      <MyApp />
    </ErrorBoundary>
  );
}
```

## Responsive Conditional Rendering

### Media Query Hook

```jsx
function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Responsive Navigation
function Navigation() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return (
    <nav>
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </nav>
  );
}

function ResponsiveLayout({ children }) {
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  
  if (isTablet) {
    return <TabletLayout>{children}</TabletLayout>;
  }
  
  return <DesktopLayout>{children}</DesktopLayout>;
}
```

## Performance Optimization

### Lazy Loading with Suspense

```jsx
import { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));
const AdminPanel = lazy(() => import('./AdminPanel'));

function App({ user }) {
  return (
    <div>
      <Header />
      
      <Suspense fallback={<div>Loading component...</div>}>
        {user.role === 'admin' && <AdminPanel />}
      </Suspense>
      
      <Suspense fallback={<ComponentSkeleton />}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### Memoized Conditional Rendering

```jsx
const ExpensiveComponent = React.memo(function ExpensiveComponent({ 
  shouldRender, 
  data 
}) {
  if (!shouldRender) {
    return null;
  }
  
  // Expensive computations here
  const processedData = processExpensiveData(data);
  
  return (
    <div>
      {processedData.map(item => (
        <ComplexItem key={item.id} item={item} />
      ))}
    </div>
  );
});
```

## Exercises

### Exercise 1: Status Dashboard
Create a dashboard that shows different content based on user status:
- Loading: Show skeleton loaders
- Error: Show error message with retry button
- Success: Show user data
- Empty: Show empty state with call-to-action

### Exercise 2: Theme Switcher
Build a theme switcher that:
- Toggles between light and dark themes
- Shows different icons for each theme
- Persists theme preference in localStorage
- Uses system preference as default

### Exercise 3: Shopping Cart
Create a shopping cart component that shows:
- Empty cart message when no items
- Item list when items exist
- Different CTAs based on cart state
- Loading states during operations

### Exercise 4: Permission System
Implement a permission-based UI that:
- Shows different navigation based on user role
- Hides/shows features based on permissions
- Displays appropriate error messages
- Handles unauthorized access gracefully

## Best Practices Summary

1. **Use early returns** for cleaner code structure
2. **Implement proper loading states** to improve UX
3. **Handle error cases** gracefully with fallbacks
4. **Use React.memo** for expensive conditional components
5. **Implement skeleton loaders** for better perceived performance
6. **Consider accessibility** when hiding/showing content
7. **Use Error Boundaries** to catch and handle errors
8. **Test all conditional paths** to ensure robustness

## Next Steps

In the next lesson, we'll explore Lists and Keys in React, learning how to efficiently render dynamic collections of data and understand the importance of proper key usage.
