# Todo App Project

Build a fully functional todo application using vanilla JavaScript.

## 🎯 Learning Objectives

- Apply DOM manipulation skills
- Handle user events
- Implement local storage
- Create responsive design
- Practice JavaScript fundamentals

## 📋 Features

### Core Features
- Add new todos
- Mark todos as complete/incomplete
- Delete todos
- Edit existing todos
- Filter todos (All, Active, Completed)

### Enhanced Features
- Local storage persistence
- Todo counter
- Clear completed todos
- Drag and drop reordering
- Due dates

## 🛠️ Technologies

- HTML5
- CSS3 (Flexbox)
- Vanilla JavaScript
- Local Storage API

## 📂 File Structure

```
todo-app/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── todo.js
│   └── storage.js
└── README.md
```

## 🚀 Getting Started

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <div class="app">
        <header>
            <h1>Todo App</h1>
            <form id="todo-form">
                <input type="text" id="todo-input" placeholder="What needs to be done?" required>
                <button type="submit">Add</button>
            </form>
        </header>
        
        <main>
            <div class="filters">
                <button class="filter-btn active" data-filter="all">All</button>
                <button class="filter-btn" data-filter="active">Active</button>
                <button class="filter-btn" data-filter="completed">Completed</button>
            </div>
            
            <ul id="todo-list"></ul>
            
            <footer id="todo-footer" class="hidden">
                <span id="todo-count">0 items left</span>
                <button id="clear-completed">Clear Completed</button>
            </footer>
        </main>
    </div>
    
    <script src="js/storage.js"></script>
    <script src="js/todo.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
```

## 💾 Data Structure

```javascript
// Todo object structure
const todo = {
    id: Date.now(), // Unique identifier
    text: "Learn JavaScript",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: null // Optional due date
};
```

## 🔧 Implementation Steps

### Step 1: Basic HTML Structure
Create the layout with form, list, and filters.

### Step 2: CSS Styling
Style the app with modern, clean design.

### Step 3: Todo Class
Create a Todo class to manage individual todos.

### Step 4: Storage Manager
Implement local storage functionality.

### Step 5: Event Handlers
Add event listeners for user interactions.

### Step 6: Filter System
Implement filtering by status.

### Step 7: Enhanced Features
Add editing, drag-and-drop, etc.

## ✅ Success Criteria

- [ ] Clean, responsive design
- [ ] All core features working
- [ ] Data persists on page reload
- [ ] No console errors
- [ ] Accessible keyboard navigation
- [ ] Cross-browser compatibility

## 🎨 Design Guidelines

- Use modern, minimalist design
- Implement smooth transitions
- Ensure good contrast ratios
- Make it mobile-friendly
- Use semantic HTML elements

## 🧪 Testing Checklist

- [ ] Add todos with various text lengths
- [ ] Toggle completion status
- [ ] Delete todos
- [ ] Filter functionality
- [ ] Data persistence
- [ ] Edge cases (empty input, special characters)

## 🚀 Deployment

1. Test in multiple browsers
2. Validate HTML/CSS
3. Optimize for performance
4. Deploy to GitHub Pages or Netlify

## 📚 Learning Resources

- [MDN DOM Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Local Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JavaScript Events](https://developer.mozilla.org/en-US/docs/Web/Events)
