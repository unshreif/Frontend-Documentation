# Event Handling & User Interaction

## Understanding React Events

React uses SyntheticEvent, a wrapper around native DOM events that provides consistent behavior across browsers.

### Basic Event Handling

```jsx
function EventBasics() {
  const handleClick = (event) => {
    console.log('Button clicked!');
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
  };

  const handleMouseOver = (event) => {
    console.log('Mouse over:', event.target.tagName);
  };

  return (
    <div>
      <button onClick={handleClick}>
        Click me
      </button>
      <div onMouseOver={handleMouseOver}>
        Hover over me
      </div>
    </div>
  );
}
```

### Event Handler Patterns

```jsx
function EventPatterns() {
  const [message, setMessage] = useState('');

  // Inline handler (avoid for complex logic)
  const inlineHandler = () => console.log('Inline');

  // Function declaration
  function declarationHandler(event) {
    setMessage('Declaration handler called');
  }

  // Arrow function
  const arrowHandler = (event) => {
    setMessage('Arrow handler called');
  };

  // Handler with parameters
  const parameterHandler = (customParam) => (event) => {
    setMessage(`Parameter: ${customParam}`);
  };

  return (
    <div>
      <button onClick={inlineHandler}>Inline</button>
      <button onClick={declarationHandler}>Declaration</button>
      <button onClick={arrowHandler}>Arrow</button>
      <button onClick={parameterHandler('custom')}>With Parameter</button>
      <p>{message}</p>
    </div>
  );
}
```

## Form Events

### Input Handling

```jsx
function FormInputs() {
  const [formData, setFormData] = useState({
    text: '',
    email: '',
    password: '',
    textarea: '',
    select: '',
    checkbox: false,
    radio: ''
  });

  const handleInputChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' 
      ? event.target.checked 
      : event.target.value;
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Text input"
        value={formData.text}
        onChange={handleInputChange('text')}
      />
      
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange('email')}
      />
      
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange('password')}
      />
      
      <textarea
        placeholder="Textarea"
        value={formData.textarea}
        onChange={handleInputChange('textarea')}
      />
      
      <select 
        value={formData.select} 
        onChange={handleInputChange('select')}
      >
        <option value="">Choose...</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
      </select>
      
      <label>
        <input
          type="checkbox"
          checked={formData.checkbox}
          onChange={handleInputChange('checkbox')}
        />
        Checkbox
      </label>
      
      <label>
        <input
          type="radio"
          value="radio1"
          checked={formData.radio === 'radio1'}
          onChange={handleInputChange('radio')}
        />
        Radio 1
      </label>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### File Upload Handling

```jsx
function FileUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      // Upload logic here
      console.log('Uploading:', selectedFile.name);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ width: '200px', height: '200px', objectFit: 'cover' }}
        />
      )}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
}
```

## Keyboard Events

```jsx
function KeyboardEvents() {
  const [keyInfo, setKeyInfo] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (event) => {
    setKeyInfo(`Key: ${event.key}, Code: ${event.code}`);
    
    // Special key handling
    if (event.key === 'Enter') {
      console.log('Enter pressed');
    }
    
    if (event.key === 'Escape') {
      setInputValue('');
    }
    
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      console.log('Ctrl+S pressed');
    }
  };

  const handleKeyUp = (event) => {
    console.log('Key released:', event.key);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder="Type here (try Enter, Escape, Ctrl+S)"
      />
      <p>Key info: {keyInfo}</p>
    </div>
  );
}
```

## Mouse Events

```jsx
function MouseEvents() {
  const [mouseInfo, setMouseInfo] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleMouseMove = (event) => {
    setMouseInfo({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleDoubleClick = () => {
    console.log('Double clicked!');
  };

  const handleContextMenu = (event) => {
    event.preventDefault();
    console.log('Right click prevented');
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ padding: '20px', border: '2px solid #ccc' }}
    >
      <div
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onContextMenu={handleContextMenu}
        style={{
          padding: '20px',
          backgroundColor: isHovered ? '#f0f0f0' : '#fff',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
      >
        <p>Mouse position: ({mouseInfo.x}, {mouseInfo.y})</p>
        <p>Hovered: {isHovered ? 'Yes' : 'No'}</p>
        <p>Click count: {clickCount}</p>
        <p>Try: click, double-click, right-click, hover</p>
      </div>
    </div>
  );
}
```

## Event Delegation and Bubbling

```jsx
function EventBubbling() {
  const handleParentClick = (event) => {
    console.log('Parent clicked');
  };

  const handleChildClick = (event) => {
    console.log('Child clicked');
    // Uncomment to stop propagation
    // event.stopPropagation();
  };

  const handleButtonClick = (event) => {
    console.log('Button clicked');
    event.stopPropagation(); // Prevents bubbling to parent
  };

  return (
    <div 
      onClick={handleParentClick}
      style={{ padding: '20px', backgroundColor: '#f0f0f0' }}
    >
      <h3>Parent (click me)</h3>
      <div 
        onClick={handleChildClick}
        style={{ padding: '10px', backgroundColor: '#e0e0e0' }}
      >
        <p>Child (click me)</p>
        <button onClick={handleButtonClick}>
          Button (stops propagation)
        </button>
      </div>
    </div>
  );
}
```

## Advanced Event Patterns

### Debounced Events

```jsx
import { useState, useCallback } from 'react';

function DebouncedSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Simple debounce implementation
  const debounce = useCallback((func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }, []);

  const debouncedSearch = useCallback(
    debounce((term) => {
      setDebouncedTerm(term);
      console.log('Searching for:', term);
    }, 500),
    []
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search (debounced)"
      />
      <p>Current input: {searchTerm}</p>
      <p>Debounced search: {debouncedTerm}</p>
    </div>
  );
}
```

### Custom Event Hook

```jsx
import { useState, useEffect } from 'react';

function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [targetKey]);

  return keyPressed;
}

function KeyPressExample() {
  const escapePressed = useKeyPress('Escape');
  const enterPressed = useKeyPress('Enter');

  return (
    <div>
      <p>Press Escape or Enter</p>
      <p>Escape pressed: {escapePressed ? 'Yes' : 'No'}</p>
      <p>Enter pressed: {enterPressed ? 'Yes' : 'No'}</p>
    </div>
  );
}
```

## Touch Events (Mobile)

```jsx
function TouchEvents() {
  const [touchInfo, setTouchInfo] = useState('');

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    setTouchInfo(`Touch started at: ${touch.clientX}, ${touch.clientY}`);
  };

  const handleTouchMove = (event) => {
    event.preventDefault(); // Prevent scrolling
    const touch = event.touches[0];
    setTouchInfo(`Touch moving at: ${touch.clientX}, ${touch.clientY}`);
  };

  const handleTouchEnd = (event) => {
    setTouchInfo('Touch ended');
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '300px',
        height: '200px',
        backgroundColor: '#f0f0f0',
        border: '2px solid #ccc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none'
      }}
    >
      <p>{touchInfo || 'Touch this area (mobile)'}</p>
    </div>
  );
}
```

## Event Performance Optimization

### Event Handler Memoization

```jsx
import React, { useState, useCallback, memo } from 'react';

const OptimizedChild = memo(({ onItemClick }) => {
  console.log('Child re-rendered');
  return (
    <button onClick={onItemClick}>
      Click me
    </button>
  );
});

function OptimizedEvents() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3]);

  // Memoized event handler
  const handleItemClick = useCallback(() => {
    console.log('Item clicked');
  }, []);

  const handleCountIncrement = () => {
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleCountIncrement}>Increment</button>
      
      {items.map(item => (
        <OptimizedChild
          key={item}
          onItemClick={handleItemClick}
        />
      ))}
    </div>
  );
}
```

## Exercises

### Exercise 1: Interactive Calculator
Build a calculator with:
- Number and operator buttons
- Keyboard input support
- Display updates
- Clear and delete functions

### Exercise 2: Drag and Drop
Create a drag-and-drop interface:
- Draggable items
- Drop zones
- Visual feedback
- Touch support

### Exercise 3: Real-time Chat Input
Build a chat input with:
- Auto-resize textarea
- Enter to send, Shift+Enter for new line
- Typing indicators
- Character limit

### Exercise 4: Image Gallery
Create an interactive gallery:
- Keyboard navigation (arrow keys)
- Mouse wheel zoom
- Click to enlarge
- Touch gestures for mobile

## Common Pitfalls and Solutions

### 1. Event Handler Recreation

```jsx
// Bad: Creates new function on every render
function BadExample({ items }) {
  return (
    <div>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => console.log(item.id)} // New function each render
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

// Good: Use useCallback or move handler outside
function GoodExample({ items, onItemClick }) {
  return (
    <div>
      {items.map(item => (
        <ItemButton
          key={item.id}
          item={item}
          onClick={onItemClick}
        />
      ))}
    </div>
  );
}
```

### 2. Preventing Default Behavior

```jsx
function FormExample() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload
    // Handle form submission
  };

  const handleLinkClick = (event) => {
    event.preventDefault(); // Prevent navigation
    // Custom link handling
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
      <a href="#" onClick={handleLinkClick}>Custom Link</a>
    </form>
  );
}
```

## Key Takeaways

- React uses SyntheticEvent for cross-browser compatibility
- Event handlers can be inline, declared functions, or arrow functions
- Use event.preventDefault() to stop default browser behavior
- Use event.stopPropagation() to prevent event bubbling
- Optimize performance by memoizing event handlers
- Consider touch events for mobile-friendly interfaces
- Debounce rapid events like search input for better performance

## Next Steps

In the next lesson, we'll explore Conditional Rendering patterns, learning how to dynamically show and hide content based on application state.
