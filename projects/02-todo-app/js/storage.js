class StorageManager {
    constructor() {
        this.storageKey = 'todoApp';
        this.settingsKey = 'todoSettings';
        this.isLocalStorageAvailable = this.checkLocalStorage();
    }
    
    checkLocalStorage() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('localStorage not available, using fallback storage');
            return false;
        }
    }
    
    save(key, data) {
        try {
            const serializedData = JSON.stringify(data);
            if (this.isLocalStorageAvailable) {
                localStorage.setItem(`${this.storageKey}_${key}`, serializedData);
            } else {
                // Fallback to sessionStorage or memory storage
                sessionStorage.setItem(`${this.storageKey}_${key}`, serializedData);
            }
            return true;
        } catch (error) {
            console.error('Failed to save data:', error);
            return false;
        }
    }
    
    load(key) {
        try {
            const data = this.isLocalStorageAvailable 
                ? localStorage.getItem(`${this.storageKey}_${key}`)
                : sessionStorage.getItem(`${this.storageKey}_${key}`);
            
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Failed to load data:', error);
            return null;
        }
    }
    
    remove(key) {
        try {
            if (this.isLocalStorageAvailable) {
                localStorage.removeItem(`${this.storageKey}_${key}`);
            } else {
                sessionStorage.removeItem(`${this.storageKey}_${key}`);
            }
            return true;
        } catch (error) {
            console.error('Failed to remove data:', error);
            return false;
        }
    }
    
    clear() {
        try {
            const storage = this.isLocalStorageAvailable ? localStorage : sessionStorage;
            const keys = Object.keys(storage).filter(key => key.startsWith(this.storageKey));
            keys.forEach(key => storage.removeItem(key));
            return true;
        } catch (error) {
            console.error('Failed to clear storage:', error);
            return false;
        }
    }
    
    // Settings management
    saveSettings(settings) {
        return this.save('settings', settings);
    }
    
    loadSettings() {
        return this.load('settings') || {
            theme: 'light',
            sortBy: 'created',
            showCompleted: true,
            notifications: false
        };
    }
    
    // Export/Import functionality
    exportData() {
        const todos = this.load('todos') || [];
        const settings = this.loadSettings();
        
        return {
            todos,
            settings,
            exportDate: new Date().toISOString(),
            version: '1.0'
        };
    }
    
    importData(data) {
        try {
            if (data.todos && Array.isArray(data.todos)) {
                this.save('todos', data.todos);
            }
            if (data.settings) {
                this.saveSettings(data.settings);
            }
            return true;
        } catch (error) {
            console.error('Failed to import data:', error);
            return false;
        }
    }
    
    // Storage size calculation
    getStorageSize() {
        let total = 0;
        const storage = this.isLocalStorageAvailable ? localStorage : sessionStorage;
        
        for (let key in storage) {
            if (key.startsWith(this.storageKey)) {
                total += storage[key].length;
            }
        }
        
        return {
            bytes: total,
            kb: (total / 1024).toFixed(2),
            mb: (total / (1024 * 1024)).toFixed(2)
        };
    }
}
