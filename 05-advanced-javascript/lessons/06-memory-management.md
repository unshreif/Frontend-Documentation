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
    
    // Objects and arrays (stored in heap)
    let object = { name: "John", age: 30 };
    let array = [1, 2, 3, 4, 5];
    
    // Closures retain references
    let closure = function(x) {
        return function(y) {
            return x + y; // 'x' is retained in closure scope
        };
    };
    
    // Maps and Sets
    let map = new Map();
    map.set('key1', 'value1');
    
    let set = new Set([1, 2, 3]);
    
    // WeakMap and WeakSet for weak references
    let weakMap = new WeakMap();
    let weakSet = new WeakSet();
    
    return { object, array, closure, map, set, weakMap, weakSet };
}

// Monitoring memory usage
function measureMemoryUsage(fn) {
    if (!performance.memory) {
        console.log('Memory API not available');
        return;
    }
    
    const before = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
    };
    
    const result = fn();
    
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc) {
        window.gc();
    }
    
    const after = {
        used: performance.memory.usedJSHeapSize,
        total: performance.memory.totalJSHeapSize,
        limit: performance.memory.jsHeapSizeLimit
    };
    
    console.log('Memory usage:', {
        before: `${(before.used / 1024 / 1024).toFixed(2)} MB`,
        after: `${(after.used / 1024 / 1024).toFixed(2)} MB`,
        difference: `${((after.used - before.used) / 1024 / 1024).toFixed(2)} MB`
    });
    
    return result;
}

// Garbage collection patterns
function demonstrateGCBehavior() {
    let largeArrays = [];
    
    // Create large objects that will be collected
    for (let i = 0; i < 100; i++) {
        largeArrays.push(new Array(10000).fill(Math.random()));
    }
    
    console.log('Large arrays created');
    
    // Remove references to allow GC
    largeArrays = null;
    
    console.log('References removed - eligible for GC');
    
    // Suggest garbage collection
    if (window.gc) {
        window.gc();
        console.log('Garbage collection forced');
    }
}
```

### Memory Leaks and Prevention

```javascript
// Common memory leak patterns and how to avoid them

// 1. Global variables (unintentional)
function avoidGlobalLeaks() {
    // BAD: Creates global variable
    accidentalGlobal = "I'm global!";
    
    // GOOD: Use strict mode and proper declarations
    "use strict";
    let properVariable = "I'm properly scoped";
    
    return properVariable;
}

// 2. Event listeners not removed
class ComponentWithLeak {
    constructor() {
        this.data = new Array(100000);
        this.handleResize = this.handleResize.bind(this);
        
        // Memory leak: listener never removed
        window.addEventListener('resize', this.handleResize);
    }
    
    handleResize() {
        console.log('Window resized');
    }
    
    // Missing cleanup method causes memory leak
}

class ComponentWithoutLeak {
    constructor() {
        this.data = new Array(100000);
        this.handleResize = this.handleResize.bind(this);
        
        window.addEventListener('resize', this.handleResize);
    }
    
    handleResize() {
        console.log('Window resized');
    }
    
    // Proper cleanup
    destroy() {
        window.removeEventListener('resize', this.handleResize);
        this.data = null;
    }
}

// 3. Closures retaining references
function createClosureLeak() {
    let largeData = new Array(1000000).fill('data');
    
    // This closure retains reference to largeData forever
    return function() {
        console.log('Closure called');
        // Even though largeData isn't used, it's still referenced
    };
}

function createOptimizedClosure() {
    let largeData = new Array(1000000).fill('data');
    
    // Process the data and only keep what's needed
    let summary = largeData.length;
    largeData = null; // Explicitly release reference
    
    return function() {
        console.log(`Processed ${summary} items`);
    };
}

// 4. Detached DOM nodes
class DOMLeakExample {
    constructor() {
        this.elements = [];
    }
    
    addElement() {
        const div = document.createElement('div');
        div.innerHTML = 'Hello World';
        document.body.appendChild(div);
        
        // Storing reference to DOM element
        this.elements.push(div);
        
        // Later, if div is removed from DOM but reference remains:
        // document.body.removeChild(div); // DOM node is detached but not GC'd
    }
    
    cleanup() {
        // Proper cleanup
        this.elements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.elements = [];
    }
}

// WeakMap and WeakSet for loose references
class WeakReferenceExample {
    constructor() {
        // WeakMap allows keys to be garbage collected
        this.privateData = new WeakMap();
        this.eventListeners = new WeakMap();
    }
    
    setPrivateData(obj, data) {
        this.privateData.set(obj, data);
        // When obj is no longer referenced elsewhere,
        // it can be garbage collected along with its WeakMap entry
    }
    
    addEventListenerTracking(element, handler) {
        this.eventListeners.set(element, handler);
        element.addEventListener('click', handler);
        
        // Element can still be GC'd if no other references exist
    }
    
    getPrivateData(obj) {
        return this.privateData.get(obj);
    }
}
```

## Performance Optimization Strategies

### Efficient DOM Manipulation

```javascript
// DOM performance optimization techniques

class EfficientDOMUpdates {
    constructor() {
        this.batchQueue = [];
        this.isFlushPending = false;
    }
    
    // Batch DOM operations to minimize reflow/repaint
    batchUpdate(operation) {
        this.batchQueue.push(operation);
        
        if (!this.isFlushPending) {
            this.isFlushPending = true;
            requestAnimationFrame(() => this.flushUpdates());
        }
    }
    
    flushUpdates() {
        // Execute all batched operations
        this.batchQueue.forEach(operation => operation());
        this.batchQueue = [];
        this.isFlushPending = false;
    }
    
    // Efficient list updates
    updateList(container, items) {
        // Use DocumentFragment for batch insertions
        const fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            const element = document.createElement('div');
            element.textContent = item.text;
            element.className = item.className;
            fragment.appendChild(element);
        });
        
        // Single DOM operation
        container.appendChild(fragment);
    }
    
    // Virtual scrolling for large lists
    createVirtualList(container, items, itemHeight = 50) {
        const containerHeight = container.clientHeight;
        const visibleItems = Math.ceil(containerHeight / itemHeight) + 2;
        
        let startIndex = 0;
        
        const render = () => {
            container.innerHTML = '';
            
            for (let i = startIndex; i < startIndex + visibleItems && i < items.length; i++) {
                const element = document.createElement('div');
                element.style.height = `${itemHeight}px`;
                element.style.transform = `translateY(${i * itemHeight}px)`;
                element.textContent = items[i].text;
                container.appendChild(element);
            }
        };
        
        container.addEventListener('scroll', () => {
            startIndex = Math.floor(container.scrollTop / itemHeight);
            render();
        });
        
        render();
    }
}

// CSS optimization through JavaScript
class CSSOptimization {
    constructor() {
        this.styleCache = new Map();
    }
    
    // Cache and reuse computed styles
    getCachedStyle(element, property) {
        const key = `${element.tagName}-${element.className}-${property}`;
        
        if (this.styleCache.has(key)) {
            return this.styleCache.get(key);
        }
        
        const computedStyle = getComputedStyle(element);
        const value = computedStyle.getPropertyValue(property);
        this.styleCache.set(key, value);
        
        return value;
    }
    
    // Minimize layout thrashing
    measureAndUpdate(elements, updates) {
        // Batch all reads first
        const measurements = elements.map(element => ({
            element,
            rect: element.getBoundingClientRect(),
            computedStyle: getComputedStyle(element)
        }));
        
        // Then batch all writes
        measurements.forEach(({ element }, index) => {
            const update = updates[index];
            if (update) {
                Object.assign(element.style, update);
            }
        });
    }
    
    // Efficient CSS class management
    toggleClasses(element, classMap) {
        const currentClasses = new Set(element.className.split(' '));
        
        Object.entries(classMap).forEach(([className, shouldAdd]) => {
            if (shouldAdd) {
                currentClasses.add(className);
            } else {
                currentClasses.delete(className);
            }
        });
        
        element.className = Array.from(currentClasses).join(' ');
    }
}
```

### Algorithm Optimization

```javascript
// Data structure and algorithm optimizations

class PerformantDataStructures {
    constructor() {
        this.indexedData = new Map();
        this.sortedKeys = [];
    }
    
    // Efficient search using Map instead of Array.find()
    findById(id) {
        return this.indexedData.get(id);
    }
    
    // Bulk operations
    addMany(items) {
        items.forEach(item => {
            this.indexedData.set(item.id, item);
        });
        
        // Update sorted keys for range queries
        this.sortedKeys = Array.from(this.indexedData.keys()).sort();
    }
    
    // Range queries on sorted data
    findInRange(min, max) {
        const startIndex = this.binarySearch(min);
        const endIndex = this.binarySearch(max);
        
        return this.sortedKeys
            .slice(startIndex, endIndex + 1)
            .map(key => this.indexedData.get(key));
    }
    
    binarySearch(target) {
        let left = 0;
        let right = this.sortedKeys.length - 1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midValue = this.sortedKeys[mid];
            
            if (midValue === target) {
                return mid;
            } else if (midValue < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return left;
    }
    
    // Efficient grouping
    groupBy(items, keyFn) {
        const groups = new Map();
        
        items.forEach(item => {
            const key = keyFn(item);
            if (!groups.has(key)) {
                groups.set(key, []);
            }
            groups.get(key).push(item);
        });
        
        return groups;
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
        let rafId;
        let lastCallTime = 0;
        
        return function(...args) {
            if (rafId) {
                return;
            }
            
            rafId = requestAnimationFrame((timestamp) => {
                if (timestamp - lastCallTime >= 16) { // ~60fps
                    lastCallTime = timestamp;
                    func.apply(this, args);
                }
                rafId = null;
            });
        };
    }
}

// Usage examples
const debouncedSearch = PerformanceControls.debounce((query) => {
    console.log('Searching for:', query);
}, 300);

const throttledScroll = PerformanceControls.throttle(() => {
    console.log('Scroll event handled');
}, 100);

const rafThrottledResize = PerformanceControls.requestAnimationFrameThrottle(() => {
    console.log('Resize handled with RAF');
});
```

### Lazy Loading and Code Splitting

```javascript
// Advanced lazy loading techniques

class LazyLoader {
    constructor() {
        this.cache = new Map();
        this.pending = new Map();
    }
    
    // Lazy load modules
    async loadModule(modulePath) {
        if (this.cache.has(modulePath)) {
            return this.cache.get(modulePath);
        }
        
        if (this.pending.has(modulePath)) {
            return this.pending.get(modulePath);
        }
        
        const promise = import(modulePath)
            .then(module => {
                this.cache.set(modulePath, module);
                this.pending.delete(modulePath);
                return module;
            })
            .catch(error => {
                this.pending.delete(modulePath);
                throw error;
            });
        
        this.pending.set(modulePath, promise);
        return promise;
    }
    
    // Lazy load images with Intersection Observer
    lazyLoadImages(selector = 'img[data-src]') {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll(selector).forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload critical resources
    preloadResources(resources) {
        return Promise.all(
            resources.map(resource => {
                if (resource.type === 'script') {
                    return this.preloadScript(resource.src);
                } else if (resource.type === 'style') {
                    return this.preloadStyle(resource.href);
                } else if (resource.type === 'image') {
                    return this.preloadImage(resource.src);
                }
            })
        );
    }
    
    preloadScript(src) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = src;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    preloadStyle(href) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            link.onload = resolve;
            link.onerror = reject;
            document.head.appendChild(link);
        });
    }
    
    preloadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    }
}
```

## Performance Monitoring and Optimization

### Performance Measurement

```javascript
// Performance monitoring and metrics

class PerformanceMonitor {
    constructor() {
        this.marks = new Map();
        this.measures = new Map();
        this.observers = [];
        this.isSupported = 'performance' in window;
    }
    
    // Custom timing measurements
    startTiming(name) {
        if (!this.isSupported) return;
        
        const markName = `${name}-start`;
        performance.mark(markName);
        this.marks.set(name, markName);
    }
    
    endTiming(name) {
        if (!this.isSupported) return 0;
        
        const startMark = this.marks.get(name);
        if (!startMark) {
            console.warn(`No start mark found for ${name}`);
            return 0;
        }
        
        const endMarkName = `${name}-end`;
        performance.mark(endMarkName);
        
        const measureName = `${name}-duration`;
        performance.measure(measureName, startMark, endMarkName);
        
        const measure = performance.getEntriesByName(measureName)[0];
        this.measures.set(name, measure.duration);
        
        return measure.duration;
    }
    
    // Monitor Core Web Vitals
    observeCoreWebVitals() {
        if (!this.isSupported) return;
        
        // Largest Contentful Paint (LCP)
        const lcpObserver = new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                console.log('FID:', entry.processingStart - entry.startTime);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        let clsScore = 0;
        const clsObserver = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                if (!entry.hadRecentInput) {
                    clsScore += entry.value;
                }
            });
            console.log('CLS:', clsScore);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        
        this.observers.push(lcpObserver, fidObserver, clsObserver);
    }
    
    // Monitor long tasks
    observeLongTasks() {
        if (!('PerformanceObserver' in window)) return;
        
        const observer = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                console.warn('Long task detected:', {
                    duration: entry.duration,
                    startTime: entry.startTime
                });
            });
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        this.observers.push(observer);
    }
    
    // Monitor frame rate
    startFPSMonitoring() {
        let frameCount = 0;
        let lastTime = performance.now();
        
        const measureFPS = (currentTime) => {
            frameCount++;
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                console.log('FPS:', fps);
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(measureFPS);
        };
        
        requestAnimationFrame(measureFPS);
    }
    
    // Resource timing analysis
    analyzeResourceTiming() {
        if (!this.isSupported) return;
        
        const resources = performance.getEntriesByType('resource');
        
        const analysis = resources.map(resource => ({
            name: resource.name,
            duration: resource.duration,
            size: resource.transferSize,
            type: this.getResourceType(resource.name),
            cached: resource.transferSize === 0 && resource.duration > 0
        }));
        
        // Group by type
        const byType = analysis.reduce((acc, resource) => {
            acc[resource.type] = acc[resource.type] || [];
            acc[resource.type].push(resource);
            return acc;
        }, {});
        
        return byType;
    }
    
    getResourceType(url) {
        if (url.includes('.js')) return 'script';
        if (url.includes('.css')) return 'stylesheet';
        if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
        if (url.includes('.woff')) return 'font';
        return 'other';
    }
    
    // Generate performance report
    generateReport() {
        const navigation = performance.getEntriesByType('navigation')[0];
        const resources = this.analyzeResourceTiming();
        
        return {
            navigation: {
                domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
                load: navigation.loadEventEnd - navigation.loadEventStart,
                domInteractive: navigation.domInteractive - navigation.navigationStart,
                firstPaint: this.getFirstPaint(),
                firstContentfulPaint: this.getFirstContentfulPaint()
            },
            resources,
            customMeasures: Object.fromEntries(this.measures),
            memory: performance.memory ? {
                used: `${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
                total: `${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`,
                limit: `${(performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`
            } : 'Not available'
        };
    }
    
    getFirstPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fp = paintEntries.find(entry => entry.name === 'first-paint');
        return fp ? fp.startTime : null;
    }
    
    getFirstContentfulPaint() {
        const paintEntries = performance.getEntriesByType('paint');
        const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        return fcp ? fcp.startTime : null;
    }
    
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// Usage
const perfMonitor = new PerformanceMonitor();

// Monitor specific operations
perfMonitor.startTiming('data-processing');
// ... heavy data processing
let duration = perfMonitor.endTiming('data-processing');

// Start FPS monitoring
perfMonitor.startFPSMonitoring();

// Generate comprehensive report
setTimeout(() => {
    console.log(perfMonitor.generateReport());
}, 5000);
```

## Advanced Optimization Techniques

### Web Workers for Heavy Computation

```javascript
// Main thread worker management
class WorkerManager {
    constructor() {
        this.workers = new Map();
        this.taskQueue = [];
        this.activeWorkers = 0;
        this.maxWorkers = navigator.hardwareConcurrency || 4;
    }
    
    async createWorker(workerScript) {
        return new Promise((resolve, reject) => {
            let worker;
            
            if (typeof workerScript === 'string') {
                // Create worker from script URL
                worker = new Worker(workerScript);
            } else {
                // Create worker from function or script content
                const blob = new Blob([workerScript], { type: 'application/javascript' });
                const workerUrl = URL.createObjectURL(blob);
                worker = new Worker(workerUrl);
            }
            
            worker.onmessage = (event) => {
                this.handleWorkerMessage(worker, event);
            };
            
            worker.onerror = (error) => {
                console.error('Worker error:', error);
                reject(error);
            };
            
            const workerId = Math.random().toString(36);
            this.workers.set(workerId, {
                worker,
                busy: false,
                taskQueue: []
            });
            
            resolve(workerId);
        });
    }
    
    async executeTask(workerId, taskId, operation, data) {
        const workerInfo = this.workers.get(workerId);
        if (!workerInfo) {
            throw new Error('Worker not found');
        }
        
        return new Promise((resolve, reject) => {
            const task = {
                taskId,
                operation,
                data,
                resolve,
                reject,
                timestamp: Date.now()
            };
            
            if (workerInfo.busy) {
                workerInfo.taskQueue.push(task);
            } else {
                this.runTask(workerInfo, task);
            }
        });
    }
    
    runTask(workerInfo, task) {
        workerInfo.busy = true;
        workerInfo.currentTask = task;
        
        workerInfo.worker.postMessage({
            taskId: task.taskId,
            operation: task.operation,
            data: task.data
        });
    }
    
    handleWorkerMessage(worker, event) {
        const { taskId, result, error } = event.data;
        
        // Find worker info
        let workerInfo;
        for (const [id, info] of this.workers.entries()) {
            if (info.worker === worker) {
                workerInfo = info;
                break;
            }
        }
        
        if (!workerInfo || !workerInfo.currentTask) return;
        
        const task = workerInfo.currentTask;
        if (task.taskId === taskId) {
            if (error) {
                task.reject(new Error(error));
            } else {
                task.resolve(result);
            }
            
            workerInfo.busy = false;
            workerInfo.currentTask = null;
            
            // Process next task in queue
            if (workerInfo.taskQueue.length > 0) {
                const nextTask = workerInfo.taskQueue.shift();
                this.runTask(workerInfo, nextTask);
            }
        }
    }
    
    terminateWorker(workerId) {
        const workerInfo = this.workers.get(workerId);
        if (workerInfo) {
            workerInfo.worker.terminate();
            this.workers.delete(workerId);
        }
    }
    
    terminateAllWorkers() {
        for (const [workerId] of this.workers) {
            this.terminateWorker(workerId);
        }
    }
}

// Example worker script (heavy-computation-worker.js)
const WORKER_SCRIPT = `
self.addEventListener('message', function(event) {
    const { taskId, operation, data } = event.data;
    
    try {
        let result;
        
        switch (operation) {
            case 'fibonacci':
                result = fibonacci(data.n);
                break;
            case 'findPrimes':
                result = findPrimes(data.max);
                break;
            case 'processImage':
                result = processImageData(data.imageData);
                break;
            default:
                throw new Error('Unknown operation: ' + operation);
        }
        
        self.postMessage({ taskId, result });
    } catch (error) {
        self.postMessage({ taskId, error: error.message });
    }
});

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function findPrimes(max) {
    let primes = [];
    for (let i = 2; i <= max; i++) {
        let isPrime = true;
        for (let j = 2; j * j <= i; j++) {
            if (i % j === 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) primes.push(i);
    }
    return primes;
}

function processImageData(imageData) {
    // Simulate image processing
    const processed = new Uint8ClampedArray(imageData.data.length);
    for (let i = 0; i < imageData.data.length; i += 4) {
        // Convert to grayscale
        const gray = 0.299 * imageData.data[i] + 
                    0.587 * imageData.data[i + 1] + 
                    0.114 * imageData.data[i + 2];
        processed[i] = gray;     // R
        processed[i + 1] = gray; // G
        processed[i + 2] = gray; // B
        processed[i + 3] = imageData.data[i + 3]; // A
    }
    return processed;
}
`;

// Create worker script as blob URL
function createWorkerScript() {
    const blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

// Usage example
async function demonstrateWorkerUsage() {
    const workerManager = new WorkerManager();
    
    try {
        // Create worker
        const workerId = await workerManager.createWorker(createWorkerScript());
        
        // Execute tasks
        const fibResult = await workerManager.executeTask(
            workerId, 
            'fib-40', 
            'fibonacci', 
            { n: 40 }
        );
        console.log('Fibonacci result:', fibResult);
        
        const primesResult = await workerManager.executeTask(
            workerId,
            'primes-1000',
            'findPrimes',
            { max: 1000 }
        );
        console.log('Primes found:', primesResult.length);
        
    } catch (error) {
        console.error('Worker task failed:', error);
    } finally {
        workerManager.terminateAllWorkers();
    }
}
```

This comprehensive performance lesson covers memory management, DOM optimization, algorithm efficiency, lazy loading, performance monitoring, and Web Workers. Each section provides practical examples and real-world optimization techniques that developers can apply immediately.
