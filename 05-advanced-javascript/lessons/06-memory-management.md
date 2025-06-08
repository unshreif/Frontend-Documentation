# Memory Management & Performance

## Understanding JavaScript Memory

### Memory Allocation and Garbage Collection

```javascript
// Memory allocation examples
function memoryAllocationDemo() {
    // Primitive values (stored in stack)
    let number = 42;
    let string = "Hello World";
    let boolean = true;
    
    // Objects (stored in heap, referenced from stack)
    let object = { name: "John", age: 30 };
    let array = [1, 2, 3, 4, 5];
    
    // Closures (retain references to outer scope)
    let closure = function() {
        return `${string} from closure`;
    };
    
    // Map and Set collections
    let map = new Map();
    map.set('key1', 'value1');
    
    let set = new Set([1, 2, 3]);
    
    // WeakMap and WeakSet (weakly referenced)
    let weakMap = new WeakMap();
    let weakSet = new WeakSet();
    
    return { object, array, closure, map, set, weakMap, weakSet };
}

// Monitoring memory usage
function measureMemoryUsage(fn) {
    if (!performance.memory) {
        console.warn('Memory measurement not available in this environment');
        const result = fn();
        return { result, memoryUsed: 'unavailable' };
    }
    
    const before = performance.memory.usedJSHeapSize;
    const result = fn();
    const after = performance.memory.usedJSHeapSize;
    
    return {
        result,
        memoryUsed: after - before,
        totalHeapSize: performance.memory.totalJSHeapSize,
        heapSizeLimit: performance.memory.jsHeapSizeLimit
    };
}

// Garbage collection patterns
function demonstrateGCBehavior() {
    let largeArrays = [];
    
    // Create large objects that will be garbage collected
    for (let i = 0; i < 100; i++) {
        largeArrays.push(new Array(10000).fill(Math.random()));
    }
    
    console.log('Created large arrays');
    
    // Clear references to allow garbage collection
    largeArrays = null;
    
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc) {
        window.gc();
        console.log('Forced garbage collection');
    }
}
```

### Memory Leaks and Prevention

```javascript
// Common memory leak patterns and how to avoid them

// 1. Global variables (unintentional)
function avoidGlobalLeaks() {
    // BAD: Creates global variable
    // accidentalGlobal = "This creates a global variable";
    
    // GOOD: Use proper scoping
    let properVariable = "This stays local";
    return properVariable;
}

// 2. Event listeners not removed
class ComponentWithListeners {
    constructor() {
        this.data = new Array(100000).fill('data');
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }
    
    mount() {
        // Add event listeners
        document.addEventListener('click', this.handleClick);
        window.addEventListener('scroll', this.handleScroll);
    }
    
    unmount() {
        // IMPORTANT: Remove event listeners to prevent leaks
        document.removeEventListener('click', this.handleClick);
        window.removeEventListener('scroll', this.handleScroll);
    }
    
    handleClick(event) {
        console.log('Click handled');
    }
    
    handleScroll(event) {
        console.log('Scroll handled');
    }
}

// 3. Timers not cleared
class TimerManager {
    constructor() {
        this.timers = new Set();
        this.intervals = new Set();
    }
    
    setTimeout(callback, delay) {
        const timerId = setTimeout(() => {
            callback();
            this.timers.delete(timerId);
        }, delay);
        
        this.timers.add(timerId);
        return timerId;
    }
    
    setInterval(callback, interval) {
        const intervalId = setInterval(callback, interval);
        this.intervals.add(intervalId);
        return intervalId;
    }
    
    clearAllTimers() {
        // Clear all timeouts
        this.timers.forEach(timerId => clearTimeout(timerId));
        this.timers.clear();
        
        // Clear all intervals
        this.intervals.forEach(intervalId => clearInterval(intervalId));
        this.intervals.clear();
    }
    
    destroy() {
        this.clearAllTimers();
    }
}

// 4. Circular references
function avoidCircularReferences() {
    // BAD: Circular reference
    let parent = { name: 'parent' };
    let child = { name: 'child', parent: parent };
    parent.child = child; // Creates circular reference
    
    // GOOD: Use WeakMap to avoid circular references
    let parentChildMap = new WeakMap();
    let parent2 = { name: 'parent2' };
    let child2 = { name: 'child2' };
    
    parentChildMap.set(parent2, child2);
    parentChildMap.set(child2, parent2);
    
    // When parent2 or child2 are garbage collected,
    // the WeakMap entries are automatically removed
}

// 5. Closures retaining unnecessary references
class OptimizedClosures {
    constructor() {
        this.cache = new Map();
    }
    
    // BAD: Closure retains entire object
    createBadClosure(largeObject) {
        return function() {
            return largeObject.importantProperty;
        };
    }
    
    // GOOD: Extract only needed data
    createGoodClosure(largeObject) {
        const importantProperty = largeObject.importantProperty;
        return function() {
            return importantProperty;
        };
    }
    
    // Memory-efficient caching
    memoize(fn, keyGenerator = (...args) => JSON.stringify(args)) {
        return (...args) => {
            const key = keyGenerator(...args);
            
            if (this.cache.has(key)) {
                return this.cache.get(key);
            }
            
            const result = fn.apply(this, args);
            this.cache.set(key, result);
            
            // Prevent cache from growing too large
            if (this.cache.size > 1000) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            
            return result;
        };
    }
}

// Object pooling for frequent allocations
class ObjectPool {
    constructor(createFn, resetFn, maxSize = 100) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.maxSize = maxSize;
        this.pool = [];
    }
    
    acquire() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        if (this.pool.length < this.maxSize) {
            this.resetFn(obj);
            this.pool.push(obj);
        }
    }
    
    clear() {
        this.pool.length = 0;
    }
}

// Usage example
const vectorPool = new ObjectPool(
    () => ({ x: 0, y: 0 }),
    (obj) => { obj.x = 0; obj.y = 0; },
    50
);

function useVector() {
    const vector = vectorPool.acquire();
    vector.x = 10;
    vector.y = 20;
    
    // Use vector...
    
    // Return to pool when done
    vectorPool.release(vector);
}
```

## Performance Optimization Strategies

### Efficient DOM Manipulation

```javascript
class EfficientDOMUpdates {
    constructor() {
        this.updateQueue = [];
        this.isUpdateScheduled = false;
    }
    
    // Batch DOM updates
    batchUpdate(updateFn) {
        this.updateQueue.push(updateFn);
        
        if (!this.isUpdateScheduled) {
            this.isUpdateScheduled = true;
            requestAnimationFrame(() => {
                this.processBatch();
            });
        }
    }
    
    processBatch() {
        // Create document fragment for batch operations
        const fragment = document.createDocumentFragment();
        
        this.updateQueue.forEach(updateFn => updateFn(fragment));
        
        // Single DOM update
        if (fragment.hasChildNodes()) {
            document.body.appendChild(fragment);
        }
        
        this.updateQueue.length = 0;
        this.isUpdateScheduled = false;
    }
    
    // Virtual DOM-like approach
    createElement(tag, props = {}, children = []) {
        const element = document.createElement(tag);
        
        // Set attributes efficiently
        Object.entries(props).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'style' && typeof value === 'object') {
                Object.assign(element.style, value);
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2).toLowerCase(), value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        // Add children
        children.forEach(child => {
            if (typeof child === 'string') {
                element.appendChild(document.createTextNode(child));
            } else {
                element.appendChild(child);
            }
        });
        
        return element;
    }
    
    // Efficient list rendering
    renderList(container, items, renderItem, keyFn = (item, index) => index) {
        const existingItems = new Map();
        
        // Map existing DOM elements
        Array.from(container.children).forEach((child, index) => {
            const key = child.dataset.key;
            if (key) {
                existingItems.set(key, child);
            }
        });
        
        const fragment = document.createDocumentFragment();
        
        items.forEach((item, index) => {
            const key = keyFn(item, index);
            let element = existingItems.get(key);
            
            if (element) {
                existingItems.delete(key);
                // Update existing element if needed
                this.updateElement(element, item);
            } else {
                // Create new element
                element = renderItem(item, index);
                element.dataset.key = key;
            }
            
            fragment.appendChild(element);
        });
        
        // Remove unused elements
        existingItems.forEach(element => element.remove());
        
        // Replace container content
        container.innerHTML = '';
        container.appendChild(fragment);
    }
    
    updateElement(element, data) {
        // Update element based on data
        // Implementation depends on specific use case
    }
}

// CSS optimization through JavaScript
class CSSOptimization {
    constructor() {
        this.styleCache = new Map();
    }
    
    // Efficient style updates
    updateStyles(element, styles) {
        const styleKey = JSON.stringify(styles);
        
        if (this.styleCache.has(styleKey)) {
            element.className = this.styleCache.get(styleKey);
            return;
        }
        
        // Apply styles efficiently
        Object.assign(element.style, styles);
        
        // Cache for reuse
        this.styleCache.set(styleKey, element.className);
    }
    
    // CSS-in-JS with caching
    createStyleSheet(styles) {
        const css = Object.entries(styles)
            .map(([selector, rules]) => {
                const ruleString = Object.entries(rules)
                    .map(([prop, value]) => `${prop}: ${value}`)
                    .join('; ');
                return `${selector} { ${ruleString} }`;
            })
            .join('\n');
        
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
        
        return style;
    }
    
    // Intersection Observer for performance
    observeVisibility(elements, callback, options = {}) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => callback(entry));
        }, {
            threshold: 0.1,
            rootMargin: '50px',
            ...options
        });
        
        elements.forEach(el => observer.observe(el));
        
        return observer;
    }
}
```

### Algorithm Optimization

```javascript
class PerformantDataStructures {
    constructor() {
        this.cache = new Map();
    }
    
    // Optimized search algorithms
    binarySearch(sortedArray, target) {
        let left = 0;
        let right = sortedArray.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midValue = sortedArray[mid];
            
            if (midValue === target) return mid;
            if (midValue < target) left = mid + 1;
            else right = mid - 1;
        }
        
        return -1;
    }
    
    // Efficient sorting for different scenarios
    quickSort(arr, compareFn = (a, b) => a - b) {
        if (arr.length <= 1) return arr;
        
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => compareFn(x, pivot) < 0);
        const middle = arr.filter(x => compareFn(x, pivot) === 0);
        const right = arr.filter(x => compareFn(x, pivot) > 0);
        
        return [
            ...this.quickSort(left, compareFn),
            ...middle,
            ...this.quickSort(right, compareFn)
        ];
    }
    
    // Trie for efficient string operations
    createTrie() {
        return {
            children: {},
            isEndOfWord: false,
            
            insert(word) {
                let node = this;
                for (const char of word) {
                    if (!node.children[char]) {
                        node.children[char] = {
                            children: {},
                            isEndOfWord: false,
                            insert: this.insert,
                            search: this.search,
                            startsWith: this.startsWith
                        };
                    }
                    node = node.children[char];
                }
                node.isEndOfWord = true;
            },
            
            search(word) {
                let node = this;
                for (const char of word) {
                    if (!node.children[char]) return false;
                    node = node.children[char];
                }
                return node.isEndOfWord;
            },
            
            startsWith(prefix) {
                let node = this;
                for (const char of prefix) {
                    if (!node.children[char]) return false;
                    node = node.children[char];
                }
                return true;
            }
        };
    }
    
    // LRU Cache implementation
    createLRUCache(capacity) {
        const cache = new Map();
        
        return {
            get(key) {
                if (cache.has(key)) {
                    const value = cache.get(key);
                    cache.delete(key);
                    cache.set(key, value);
                    return value;
                }
                return null;
            },
            
            set(key, value) {
                if (cache.has(key)) {
                    cache.delete(key);
                } else if (cache.size >= capacity) {
                    const firstKey = cache.keys().next().value;
                    cache.delete(firstKey);
                }
                cache.set(key, value);
            },
            
            size: () => cache.size,
            clear: () => cache.clear()
        };
    }
}

// Debouncing and throttling
class PerformanceControls {
    static debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    static throttle(func, interval) {
        let lastCallTime = 0;
        let timeoutId;
        
        return function(...args) {
            const now = Date.now();
            const timeSinceLastCall = now - lastCallTime;
            
            if (timeSinceLastCall >= interval) {
                lastCallTime = now;
                func.apply(this, args);
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastCallTime = Date.now();
                    func.apply(this, args);
                }, interval - timeSinceLastCall);
            }
        };
    }
    
    static requestAnimationFrameThrottle(func) {
        let requestId;
        let lastArgs;
        
        return function(...args) {
            lastArgs = args;
            
            if (!requestId) {
                requestId = requestAnimationFrame(() => {
                    func.apply(this, lastArgs);
                    requestId = null;
                });
            }
        };
    }
}
```

This comprehensive lesson covers memory management, performance optimization, and practical techniques for building efficient JavaScript applications.
