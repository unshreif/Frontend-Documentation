# Lists, Keys & Dynamic Content

## Understanding Lists in React

React provides powerful tools for rendering lists of data dynamically. The most common approach is using the `map()` method to transform arrays into JSX elements.

### Basic List Rendering

```jsx
function SimpleList() {
  const fruits = ['Apple', 'Banana', 'Orange', 'Grape'];
  
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={index}>{fruit}</li>
      ))}
    </ul>
  );
}

// With objects
function UserList() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];

  return (
    <div>
      <h2>Users</h2>
      {users.map(user => (
        <div key={user.id} className="user-card">
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

### Complex List Components

```jsx
function ProductCatalog({ products, onAddToCart, onViewDetails }) {
  return (
    <div className="product-catalog">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onViewDetails={onViewDetails}
          />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart, onViewDetails }) {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">${product.price}</div>
        
        {product.tags && (
          <div className="product-tags">
            {product.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="product-actions">
          <button 
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button onClick={() => onViewDetails(product.id)}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
```

## Understanding Keys

Keys help React identify which items have changed, been added, or removed. They should be stable, predictable, and unique among siblings.

### Key Best Practices

```jsx
// ❌ Bad: Using array index as key
function BadExample({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Good: Using stable, unique IDs
function GoodExample({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

// ✅ Good: When items don't have IDs, create stable keys
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={`todo-${todo.text}-${todo.completed}`}
          todo={todo}
        />
      ))}
    </ul>
  );
}

// ❌ Bad: Random keys that change on every render
function VeryBadExample({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={Math.random()}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### Why Keys Matter

```jsx
function KeyDemo() {
  const [items, setItems] = useState([
    { id: 1, name: 'First', value: '' },
    { id: 2, name: 'Second', value: '' },
    { id: 3, name: 'Third', value: '' }
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.length + 1}`,
      value: ''
    };
    setItems([newItem, ...items]); // Add to beginning
  };

  const removeFirst = () => {
    setItems(items.slice(1));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item to Beginning</button>
      <button onClick={removeFirst}>Remove First Item</button>
      
      <h3>With Proper Keys (maintains input state):</h3>
      {items.map(item => (
        <div key={item.id}>
          <span>{item.name}: </span>
          <input 
            type="text" 
            placeholder="Type something..."
            defaultValue={item.value}
          />
        </div>
      ))}
      
      <h3>With Index Keys (loses input state):</h3>
      {items.map((item, index) => (
        <div key={index}>
          <span>{item.name}: </span>
          <input 
            type="text" 
            placeholder="Type something..."
            defaultValue={item.value}
          />
        </div>
      ))}
    </div>
  );
}
```

## Dynamic List Manipulation

### Adding and Removing Items

```jsx
function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return (
    <div className="todo-app">
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo}>Add</button>
      </div>
      
      <div className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onRemove={removeTodo}
            onEdit={editTodo}
          />
        ))}
      </div>
      
      {todos.length === 0 && (
        <p className="empty-state">No todos yet. Add one above!</p>
      )}
    </div>
  );
}

function TodoItem({ todo, onToggle, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
            autoFocus
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div className="view-mode">
          <span 
            className="todo-text"
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => onRemove(todo.id)}>Delete</button>
        </div>
      )}
    </div>
  );
}
```

### Reordering Lists

```jsx
function ReorderableList() {
  const [items, setItems] = useState([
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' },
    { id: 4, text: 'Fourth item' }
  ]);

  const moveItem = (fromIndex, toIndex) => {
    const newItems = [...items];
    const [removed] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, removed);
    setItems(newItems);
  };

  const moveUp = (index) => {
    if (index > 0) {
      moveItem(index, index - 1);
    }
  };

  const moveDown = (index) => {
    if (index < items.length - 1) {
      moveItem(index, index + 1);
    }
  };

  return (
    <div className="reorderable-list">
      <h3>Reorderable List</h3>
      {items.map((item, index) => (
        <div key={item.id} className="list-item">
          <span>{item.text}</span>
          <div className="controls">
            <button 
              onClick={() => moveUp(index)}
              disabled={index === 0}
            >
              ↑
            </button>
            <button 
              onClick={() => moveDown(index)}
              disabled={index === items.length - 1}
            >
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Filtering and Searching Lists

### Search and Filter Implementation

```jsx
function SearchableProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  // Get unique categories
  const categories = ['all', ...new Set(products.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy, sortOrder]);

  return (
    <div className="searchable-product-list">
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </select>
        
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="category">Sort by Category</option>
        </select>
        
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          {sortOrder === 'asc' ? '↑' : '↓'}
        </button>
      </div>

      <div className="results-info">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
}
```

### Pagination Implementation

```jsx
function PaginatedList({ items, itemsPerPage = 10 }) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="paginated-list">
      <div className="items-list">
        {currentItems.map(item => (
          <div key={item.id} className="list-item">
            {/* Render your item component here */}
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {currentPage > 3 && (
            <>
              <button onClick={() => goToPage(1)}>1</button>
              {currentPage > 4 && <span>...</span>}
            </>
          )}

          {generatePageNumbers().map(page => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}

          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span>...</span>}
              <button onClick={() => goToPage(totalPages)}>{totalPages}</button>
            </>
          )}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <div className="pagination-info">
        Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} items
      </div>
    </div>
  );
}
```

## Performance Optimization for Large Lists

### Virtual Scrolling

```jsx
import { FixedSizeList as List } from 'react-window';

function VirtualizedList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style} className="list-row">
      <div className="item-content">
        <h4>{items[index].name}</h4>
        <p>{items[index].description}</p>
      </div>
    </div>
  );

  return (
    <div className="virtualized-container">
      <List
        height={400}
        itemCount={items.length}
        itemSize={100}
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
}
```

### Optimized List Rendering

```jsx
const ListItem = React.memo(function ListItem({ item, onUpdate, onDelete }) {
  return (
    <div className="optimized-list-item">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <button onClick={() => onUpdate(item.id)}>Update</button>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
});

function OptimizedList({ items }) {
  const [selectedItems, setSelectedItems] = useState(new Set());

  const handleUpdate = useCallback((id) => {
    console.log('Update item:', id);
  }, []);

  const handleDelete = useCallback((id) => {
    console.log('Delete item:', id);
  }, []);

  const toggleSelection = useCallback((id) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="optimized-list">
      {items.map(item => (
        <ListItem
          key={item.id}
          item={item}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
```

## Nested Lists

### Tree Structure Rendering

```jsx
function TreeNode({ node, level = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="tree-node" style={{ marginLeft: level * 20 }}>
      <div className="node-content">
        {hasChildren && (
          <button
            className="expand-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '−' : '+'}
          </button>
        )}
        <span className="node-label">{node.label}</span>
      </div>
      
      {hasChildren && isExpanded && (
        <div className="children">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TreeView({ data }) {
  return (
    <div className="tree-view">
      {data.map(node => (
        <TreeNode key={node.id} node={node} />
      ))}
    </div>
  );
}
```

## Exercises

### Exercise 1: Contact List
Create a contact list application with:
- Add/edit/delete contacts
- Search by name or email
- Sort by different fields
- Group by first letter

### Exercise 2: File Explorer
Build a file explorer that:
- Shows folders and files in a tree structure
- Allows expanding/collapsing folders
- Supports file operations (rename, delete)
- Implements breadcrumb navigation

### Exercise 3: Shopping Cart
Create a shopping cart with:
- Add/remove items
- Update quantities
- Calculate totals
- Apply discounts
- Save to local storage

### Exercise 4: Data Table
Build a data table component with:
- Sortable columns
- Filterable rows
- Pagination
- Row selection
- Export functionality

## Best Practices Summary

1. **Always use unique, stable keys** - never use array indices for dynamic lists
2. **Use useMemo for expensive filtering/sorting** operations
3. **Implement virtualization** for very large lists (1000+ items)
4. **Memoize list items** with React.memo when appropriate
5. **Handle empty states** gracefully with meaningful messages
6. **Provide loading states** for asynchronous list operations
7. **Use proper ARIA labels** for accessibility
8. **Consider infinite scrolling** for continuous data loading

## Next Steps

In the next lesson, we'll explore React Hooks in detail, learning about useState, useEffect, and other built-in hooks that make functional components powerful and flexible.
