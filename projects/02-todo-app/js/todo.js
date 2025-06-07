class Todo {
    constructor(text, completed = false, id = null, createdAt = null) {
        this.id = id || Date.now();
        this.text = text;
        this.completed = completed;
        this.createdAt = createdAt || new Date().toISOString();
    }
    
    toggle() {
        this.completed = !this.completed;
    }
    
    render() {
        return `
            <li class="todo-item ${this.completed ? 'completed' : ''}" data-id="${this.id}">
                <div class="todo-content">
                    <button class="toggle" aria-label="Toggle completion">
                        <span class="checkmark">${this.completed ? '✓' : ''}</span>
                    </button>
                    <span class="todo-text" ${this.completed ? 'style="text-decoration: line-through"' : ''}>${this.text}</span>
                </div>
                <div class="todo-actions">
                    <button class="edit" aria-label="Edit todo">✎</button>
                    <button class="delete" aria-label="Delete todo">✕</button>
                </div>
            </li>
        `;
    }
}
