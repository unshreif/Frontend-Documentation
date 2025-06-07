class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storage = new StorageManager();
        
        this.initializeElements();
        this.bindEvents();
        this.loadTodos();
        this.render();
    }
    
    initializeElements() {
        this.todoForm = document.getElementById('todo-form');
        this.todoInput = document.getElementById('todo-input');
        this.todoList = document.getElementById('todo-list');
        this.todoCount = document.getElementById('todo-count');
        this.todoFooter = document.getElementById('todo-footer');
        this.clearCompleted = document.getElementById('clear-completed');
        this.filterButtons = document.querySelectorAll('.filter-btn');
    }
    
    bindEvents() {
        this.todoForm.addEventListener('submit', (e) => this.handleAddTodo(e));
        this.todoList.addEventListener('click', (e) => this.handleTodoClick(e));
        this.clearCompleted.addEventListener('click', () => this.handleClearCompleted());
        
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleFilterChange(e));
        });
    }
    
    handleAddTodo(e) {
        e.preventDefault();
        const text = this.todoInput.value.trim();
        
        if (text) {
            const todo = new Todo(text);
            this.todos.push(todo);
            this.saveTodos();
            this.render();
            this.todoInput.value = '';
        }
    }
    
    handleTodoClick(e) {
        const todoId = parseInt(e.target.closest('.todo-item')?.dataset.id);
        if (!todoId) return;
        
        if (e.target.classList.contains('toggle')) {
            this.toggleTodo(todoId);
        } else if (e.target.classList.contains('delete')) {
            this.deleteTodo(todoId);
        } else if (e.target.classList.contains('edit')) {
            this.editTodo(todoId);
        }
    }
    
    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.toggle();
            this.saveTodos();
            this.render();
        }
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveTodos();
        this.render();
    }
    
    editTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        const todoElement = document.querySelector(`[data-id="${id}"]`);
        const textElement = todoElement.querySelector('.todo-text');
        
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.text;
        input.className = 'edit-input';
        
        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== todo.text) {
                todo.text = newText;
                this.saveTodos();
            }
            this.render();
        };
        
        input.addEventListener('blur', saveEdit);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') this.render();
        });
        
        textElement.replaceWith(input);
        input.focus();
        input.select();
    }
    
    handleClearCompleted() {
        this.todos = this.todos.filter(todo => !todo.completed);
        this.saveTodos();
        this.render();
    }
    
    handleFilterChange(e) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        this.currentFilter = e.target.dataset.filter;
        this.render();
    }
    
    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }
    
    render() {
        const filteredTodos = this.getFilteredTodos();
        
        this.todoList.innerHTML = filteredTodos
            .map(todo => todo.render())
            .join('');
        
        this.updateFooter();
    }
    
    updateFooter() {
        const activeTodos = this.todos.filter(todo => !todo.completed);
        const completedTodos = this.todos.filter(todo => todo.completed);
        
        this.todoCount.textContent = `${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`;
        
        this.clearCompleted.style.display = completedTodos.length > 0 ? 'block' : 'none';
        
        this.todoFooter.classList.toggle('hidden', this.todos.length === 0);
    }
    
    saveTodos() {
        this.storage.save('todos', this.todos);
    }
    
    loadTodos() {
        const savedTodos = this.storage.load('todos') || [];
        this.todos = savedTodos.map(data => new Todo(data.text, data.completed, data.id, data.createdAt));
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
