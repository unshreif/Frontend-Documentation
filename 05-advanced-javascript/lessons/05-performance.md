# Memory Management & Performance Optimization

## Understanding JavaScript Memory Management

### Memory Lifecycle
```javascript
// Memory allocation, use, and deallocation
function demonstrateMemoryLifecycle() {
    // 1. Allocation - Variables are created and memory is allocated
    let largeArray = new Array(1000000).fill(0);
    let objectRef = { data: largeArray };
    
    // 2. Use - Memory is accessed and manipulated
    largeArray.forEach((item, index) => {
        largeArray[index] = Math.random();
    });
    
    // 3. Release - Variables go out of scope and become eligible for GC
    return objectRef.data.length;
} // largeArray and objectRef are eligible for garbage collection here

// Monitoring memory usage
function monitorMemory() {
    if (performance.memory) {
        console.log({
            usedJSHeapSize: performance.memory.usedJSHeapSize,
            totalJSHeapSize: performance.memory.totalJSHeapSize,
            jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
        });
    }
}

// Force garbage collection (Chrome DevTools only)
function forceGC() {
    if (window.gc) {
        window.gc();
    }
}
```

### Memory Leaks and Prevention
```javascript
// Common memory leak patterns and fixes

// 1. Global variables
// BAD: Unintended global
function createLeak() {
    accidentalGlobal = new Array(1000000); // Creates global variable
}

// GOOD: Explicit scoping
function noLeak() {
    let intentionalLocal = new Array(1000000);
    return intentionalLocal.length;
}

// 2. Event listeners not removed
class ComponentWithLeak {
    constructor() {
        this.data = new Array(100000);
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick); // Leak!
    }
    
    handleClick() {
        console.log('Clicked');
    }
    
    // Missing cleanup method
}

class ComponentWithoutLeak {
    constructor() {
        this.data = new Array(100000);
        this.handleClick = this.handleClick.bind(this);
        document.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Clicked');
    }
    
    destroy() {
        document.removeEventListener('click', this.handleClick);
        this.data = null; // Explicit cleanup
    }
}

// 3. Closures retaining references
function createClosureLeak() {
    let largeData = new Array(1000000).fill('data');
    
    return function() {
        // This closure retains reference to largeData even if not used
        console.log('Function called');
    };
}

function createOptimizedClosure() {
    let largeData = new Array(1000000).fill('data');
    let smallData = largeData.length; // Extract only what we need
    largeData = null; // Release large data
    
    return function() {
        console.log('Function called, data size was:', smallData);
    };
}

// 4. Detached DOM nodes
class DOMLeakExample {
    constructor() {
        this.elements = [];
    }
    
    createLeakyElements() {
        for (let i = 0; i < 1000; i++) {
            let element = document.createElement('div');
            document.body.appendChild(element);
            this.elements.push(element); // Retains reference after removal
        }
        
        // Remove from DOM but references still exist
        this.elements.forEach(el => el.remove());
    }
    
    createCleanElements() {
        let elements = [];
        for (let i = 0; i < 1000; i++) {
            let element = document.createElement('div');
            document.body.appendChild(element);
            elements.push(element);
        }
        
        // Clean removal
        elements.forEach(el => {
            el.remove();
        });
        elements.length = 0; // Clear references
    }
}

// WeakMap and WeakSet for loose references
class WeakReferenceExample {
    constructor() {
        this.weakData = new WeakMap();
        this.weakSet = new WeakSet();
    }
    
    attachData(element, data) {
        // WeakMap doesn't prevent GC of keys
        this.weakData.set(element, data);
        this.weakSet.add(element);
    }
    
    getData(element) {
        return this.weakData.get(element);
    }
    
    // When element is removed from DOM and no other references exist,
    // it can be garbage collected along with its WeakMap entry
}
```

## Performance Optimization Strategies

### Efficient DOM Manipulation
```javascript
// DOM performance optimization techniques

class EfficientDOMUpdates {
    constructor() {
        this.container = document.getElementById('container');
    }
    
    // BAD: Multiple reflows and repaints
    inefficientUpdate(items) {
        items.forEach(item => {
            let element = document.createElement('div');
            element.textContent = item.text;
            element.style.backgroundColor = item.color;
            element.style.padding = '10px';
            this.container.appendChild(element); // Causes reflow for each item
        });
    }
    
    // GOOD: Batch updates using DocumentFragment
    efficientUpdate(items) {
        let fragment = document.createDocumentFragment();
        
        items.forEach(item => {
            let element = document.createElement('div');
            element.textContent = item.text;
            element.style.backgroundColor = item.color;
            element.style.padding = '10px';
            fragment.appendChild(element);
        });
        
        this.container.appendChild(fragment); // Single reflow
    }
    
    // GOOD: Using innerHTML for large updates
    efficientHTMLUpdate(items) {
        let html = items.map(item => 
            `<div style="background-color: ${item.color}; padding: 10px;">
                ${item.text}
            </div>`
        ).join('');
        
        this.container.innerHTML = html;
    }
    
    // GOOD: Virtual scrolling for large lists
    createVirtualScrolling(items, itemHeight = 50, visibleCount = 10) {
        let scrollContainer = document.createElement('div');
        scrollContainer.style.height = `${visibleCount * itemHeight}px`;
        scrollContainer.style.overflow = 'auto';
        
        let content = document.createElement('div');
        content.style.height = `${items.length * itemHeight}px`;
        content.style.position = 'relative';
        
        let visibleItems = document.createElement('div');
        visibleItems.style.position = 'absolute';
        visibleItems.style.top = '0';
        visibleItems.style.width = '100%';
        
        content.appendChild(visibleItems);
        scrollContainer.appendChild(content);
        
        let startIndex = 0;
        
        const updateVisibleItems = () => {
            let scrollTop = scrollContainer.scrollTop;
            startIndex = Math.floor(scrollTop / itemHeight);
            let endIndex = Math.min(startIndex + visibleCount, items.length);
            
            visibleItems.innerHTML = '';
            visibleItems.style.top = `${startIndex * itemHeight}px`;
            
            for (let i = startIndex; i < endIndex; i++) {
                let item = document.createElement('div');
                item.style.height = `${itemHeight}px`;
                item.textContent = items[i];
                visibleItems.appendChild(item);
            }
        };
        
        scrollContainer.addEventListener('scroll', updateVisibleItems);
        updateVisibleItems();
        
        return scrollContainer;
    }
}

// CSS optimization through JavaScript
class CSSOptimization {
    constructor() {
        this.styleSheet = this.createStyleSheet();
    }
    
    createStyleSheet() {
        let style = document.createElement('style');
        document.head.appendChild(style);
        return style.sheet;
    }
    
    // Batch CSS changes
    updateMultipleStyles(element, styles) {
        // BAD: Multiple style changes trigger multiple reflows
        // element.style.width = styles.width;
        // element.style.height = styles.height;
        // element.style.backgroundColor = styles.backgroundColor;
        
        // GOOD: Batch changes using cssText
        let cssText = Object.entries(styles)
            .map(([prop, value]) => `${prop.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
            .join('; ');
        
        element.style.cssText = cssText;
    }
    
    // Use CSS classes instead of inline styles
    addDynamicClass(className, rules) {
        let cssRule = `.${className} { ${rules} }`;
        this.styleSheet.insertRule(cssRule, this.styleSheet.cssRules.length);
    }
    
    // CSS containment for performance
    enableContainment(element) {
        element.style.contain = 'layout style paint';
    }
}
```

### Algorithm Optimization
```javascript
// Data structure and algorithm optimizations

class PerformantDataStructures {
    constructor() {
        this.cache = new Map();
        this.memoizedResults = new Map();
    }
    
    // Efficient searching with Map instead of Array.find
    findUserById(users, id) {
        // BAD: O(n) complexity
        // return users.find(user => user.id === id);
        
        // GOOD: O(1) complexity with Map
        if (!this.cache.has('userMap')) {
            let userMap = new Map();
            users.forEach(user => userMap.set(user.id, user));
            this.cache.set('userMap', userMap);
        }
        
        return this.cache.get('userMap').get(id);
    }
    
    // Memoization for expensive calculations
    fibonacci(n) {
        if (this.memoizedResults.has(n)) {
            return this.memoizedResults.get(n);
        }
        
        let result;
        if (n <= 1) {
            result = n;
        } else {
            result = this.fibonacci(n - 1) + this.fibonacci(n - 2);
        }
        
        this.memoizedResults.set(n, result);
        return result;
    }
    
    // Efficient array operations
    processLargeArray(items) {
        // Use for...of for better performance than forEach
        let results = [];
        for (let item of items) {
            if (item.isValid) {
                results.push(this.transformItem(item));
            }
        }
        return results;
    }
    
    // Chunked processing for large datasets
    async processInChunks(items, chunkSize = 1000, processFn) {
        let results = [];
        
        for (let i = 0; i < items.length; i += chunkSize) {
            let chunk = items.slice(i, i + chunkSize);
            let chunkResults = await Promise.all(chunk.map(processFn));
            results.push(...chunkResults);
            
            // Yield control to prevent blocking
            await new Promise(resolve => setTimeout(resolve, 0));
        }
        
        return results;
    }
    
    transformItem(item) {
        // Simulated expensive operation
        return { ...item, processed: true, timestamp: Date.now() };
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
    
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    static requestAnimationFrameThrottle(func) {
        let requestId;
        return function(...args) {
            if (requestId) return;
            requestId = requestAnimationFrame(() => {
                func.apply(this, args);
                requestId = null;
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
        this.loadedModules = new Map();
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this));
    }
    
    // Dynamic imports for code splitting
    async loadModule(moduleName) {
        if (this.loadedModules.has(moduleName)) {
            return this.loadedModules.get(moduleName);
        }
        
        try {
            let module;
            switch (moduleName) {
                case 'chart':
                    module = await import('./modules/chart.js');
                    break;
                case 'editor':
                    module = await import('./modules/editor.js');
                    break;
                default:
                    throw new Error(`Unknown module: ${moduleName}`);
            }
            
            this.loadedModules.set(moduleName, module);
            return module;
        } catch (error) {
            console.error(`Failed to load module ${moduleName}:`, error);
            throw error;
        }
    }
    
    // Lazy loading with Intersection Observer
    observeElement(element, callback) {
        element.dataset.lazyCallback = this.registerCallback(callback);
        this.observer.observe(element);
    }
    
    registerCallback(callback) {
        let id = Math.random().toString(36);
        this.callbacks = this.callbacks || new Map();
        this.callbacks.set(id, callback);
        return id;
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let callbackId = entry.target.dataset.lazyCallback;
                let callback = this.callbacks.get(callbackId);
                
                if (callback) {
                    callback(entry.target);
                    this.observer.unobserve(entry.target);
                    this.callbacks.delete(callbackId);
                }
            }
        });
    }
    
    // Preload critical resources
    preloadResources(resources) {
        resources.forEach(resource => {
            if (resource.type === 'script') {
                let link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'script';
                link.href = resource.url;
                document.head.appendChild(link);
            } else if (resource.type === 'image') {
                let link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'image';
                link.href = resource.url;
                document.head.appendChild(link);
            }
        });
    }
    
    // Progressive image loading
    progressiveImageLoad(img, lowQualityUrl, highQualityUrl) {
        // Load low-quality placeholder first
        img.src = lowQualityUrl;
        img.style.filter = 'blur(5px)';
        
        // Preload high-quality image
        let highQualityImg = new Image();
        highQualityImg.onload = () => {
            img.src = highQualityUrl;
            img.style.filter = 'none';
            img.style.transition = 'filter 0.3s';
        };
        highQualityImg.src = highQualityUrl;
    }
}

// Service Worker for caching and background sync
class ServiceWorkerManager {
    constructor() {
        this.isSupported = 'serviceWorker' in navigator;
    }
    
    async register(scriptUrl = '/sw.js') {
        if (!this.isSupported) {
            console.warn('Service Workers not supported');
            return null;
        }
        
        try {
            let registration = await navigator.serviceWorker.register(scriptUrl);
            console.log('Service Worker registered:', registration);
            
            // Handle updates
            registration.addEventListener('updatefound', () => {
                let newWorker = registration.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        // New version available
                        this.showUpdateAvailable();
                    }
                });
            });
            
            return registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }
    
    showUpdateAvailable() {
        if (confirm('New version available. Reload to update?')) {
            window.location.reload();
        }
    }
    
    // Cache management
    async cacheResources(cacheName, resources) {
        if (!this.isSupported) return;
        
        let cache = await caches.open(cacheName);
        return cache.addAll(resources);
    }
    
    async getCachedResponse(request) {
        if (!this.isSupported) return null;
        
        let response = await caches.match(request);
        return response;
    }
}
```

## Performance Monitoring and Optimization

### Performance Measurement
```javascript
// Performance monitoring and metrics

class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.observers = this.setupObservers();
    }
    
    setupObservers() {
        let observers = {};
        
        // Performance Observer for various metrics
        if ('PerformanceObserver' in window) {
            // Long tasks (>50ms)
            observers.longTask = new PerformanceObserver(list => {
                list.getEntries().forEach(entry => {
                    console.warn('Long task detected:', {
                        duration: entry.duration,
                        startTime: entry.startTime,
                        name: entry.name
                    });
                    
                    this.recordMetric('longTask', {
                        duration: entry.duration,
                        timestamp: Date.now()
                    });
                });
            });
            observers.longTask.observe({ entryTypes: ['longtask'] });
            
            // Layout shifts
            observers.layoutShift = new PerformanceObserver(list => {
                let totalScore = 0;
                list.getEntries().forEach(entry => {
                    totalScore += entry.value;
                });
                
                this.recordMetric('cumulativeLayoutShift', totalScore);
            });
            observers.layoutShift.observe({ entryTypes: ['layout-shift'] });
            
            // Largest Contentful Paint
            observers.lcp = new PerformanceObserver(list => {
                let entries = list.getEntries();
                let lastEntry = entries[entries.length - 1];
                this.recordMetric('largestContentfulPaint', lastEntry.startTime);
            });
            observers.lcp.observe({ entryTypes: ['largest-contentful-paint'] });
        }
        
        return observers;
    }
    
    recordMetric(name, value) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }
        this.metrics.get(name).push({
            value,
            timestamp: Date.now()
        });
    }
    
    // Custom performance timing
    startTiming(label) {
        performance.mark(`${label}-start`);
    }
    
    endTiming(label) {
        performance.mark(`${label}-end`);
        performance.measure(label, `${label}-start`, `${label}-end`);
        
        let measurement = performance.getEntriesByName(label)[0];
        this.recordMetric(label, measurement.duration);
        
        return measurement.duration;
    }
    
    // FPS monitoring
    startFPSMonitoring() {
        let frames = 0;
        let startTime = performance.now();
        
        const countFrame = () => {
            frames++;
            let currentTime = performance.now();
            
            if (currentTime - startTime >= 1000) {
                let fps = Math.round((frames * 1000) / (currentTime - startTime));
                this.recordMetric('fps', fps);
                
                frames = 0;
                startTime = currentTime;
            }
            
            requestAnimationFrame(countFrame);
        };
        
        requestAnimationFrame(countFrame);
    }
    
    // Bundle size analysis
    analyzeBundleSize() {
        if ('PerformanceNavigationTiming' in window) {
            let navTiming = performance.getEntriesByType('navigation')[0];
            
            return {
                transferSize: navTiming.transferSize,
                encodedBodySize: navTiming.encodedBodySize,
                decodedBodySize: navTiming.decodedBodySize,
                compressionRatio: navTiming.encodedBodySize / navTiming.decodedBodySize
            };
        }
    }
    
    // Resource timing analysis
    analyzeResourceTiming() {
        let resources = performance.getEntriesByType('resource');
        
        return resources.map(resource => ({
            name: resource.name,
            duration: resource.duration,
            transferSize: resource.transferSize,
            type: this.getResourceType(resource.name)
        })).sort((a, b) => b.duration - a.duration);
    }
    
    getResourceType(url) {
        if (url.match(/\.(js)$/)) return 'script';
        if (url.match(/\.(css)$/)) return 'stylesheet';
        if (url.match(/\.(png|jpg|jpeg|gif|svg|webp)$/)) return 'image';
        if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
        return 'other';
    }
    
    // Generate performance report
    generateReport() {
        return {
            timing: this.getTimingMetrics(),
            resources: this.analyzeResourceTiming(),
            bundleSize: this.analyzeBundleSize(),
            customMetrics: Object.fromEntries(this.metrics),
            recommendations: this.generateRecommendations()
        };
    }
    
    getTimingMetrics() {
        let timing = performance.timing;
        return {
            pageLoadTime: timing.loadEventEnd - timing.navigationStart,
            domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
            firstPaint: this.getFirstPaint(),
            firstContentfulPaint: this.getFirstContentfulPaint()
        };
    }
    
    getFirstPaint() {
        let fpEntry = performance.getEntriesByName('first-paint')[0];
        return fpEntry ? fpEntry.startTime : null;
    }
    
    getFirstContentfulPaint() {
        let fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
        return fcpEntry ? fcpEntry.startTime : null;
    }
    
    generateRecommendations() {
        let recommendations = [];
        let report = this.generateReport();
        
        if (report.timing.pageLoadTime > 3000) {
            recommendations.push('Page load time is > 3s. Consider code splitting and lazy loading.');
        }
        
        if (report.bundleSize?.transferSize > 1000000) {
            recommendations.push('Bundle size is > 1MB. Consider compression and tree shaking.');
        }
        
        let longTasks = this.metrics.get('longTask') || [];
        if (longTasks.length > 5) {
            recommendations.push('Multiple long tasks detected. Consider breaking up heavy operations.');
        }
        
        return recommendations;
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
        this.maxWorkers = navigator.hardwareConcurrency || 4;
    }
    
    createWorker(name, scriptUrl) {
        if (this.workers.has(name)) {
            return this.workers.get(name);
        }
        
        let worker = new Worker(scriptUrl);
        worker.postMessage = worker.postMessage.bind(worker);
        
        this.workers.set(name, {
            worker,
            busy: false,
            tasks: 0
        });
        
        return this.workers.get(name);
    }
    
    async executeTask(workerName, data, transferables = []) {
        return new Promise((resolve, reject) => {
            let workerInfo = this.workers.get(workerName);
            if (!workerInfo) {
                reject(new Error(`Worker ${workerName} not found`));
                return;
            }
            
            let taskId = Math.random().toString(36);
            
            let messageHandler = (event) => {
                if (event.data.taskId === taskId) {
                    workerInfo.worker.removeEventListener('message', messageHandler);
                    workerInfo.busy = false;
                    
                    if (event.data.error) {
                        reject(new Error(event.data.error));
                    } else {
                        resolve(event.data.result);
                    }
                    
                    this.processQueue();
                }
            };
            
            let errorHandler = (error) => {
                workerInfo.worker.removeEventListener('error', errorHandler);
                workerInfo.busy = false;
                reject(error);
                this.processQueue();
            };
            
            workerInfo.worker.addEventListener('message', messageHandler);
            workerInfo.worker.addEventListener('error', errorHandler);
            
            if (workerInfo.busy) {
                this.taskQueue.push({
                    workerName,
                    data: { ...data, taskId },
                    transferables,
                    resolve,
                    reject
                });
            } else {
                workerInfo.busy = true;
                workerInfo.worker.postMessage({ ...data, taskId }, transferables);
            }
        });
    }
    
    processQueue() {
        if (this.taskQueue.length === 0) return;
        
        for (let [name, workerInfo] of this.workers) {
            if (!workerInfo.busy && this.taskQueue.length > 0) {
                let task = this.taskQueue.shift();
                if (task.workerName === name) {
                    workerInfo.busy = true;
                    workerInfo.worker.postMessage(task.data, task.transferables);
                    break;
                }
            }
        }
    }
    
    terminateWorker(name) {
        let workerInfo = this.workers.get(name);
        if (workerInfo) {
            workerInfo.worker.terminate();
            this.workers.delete(name);
        }
    }
    
    terminateAll() {
        for (let [name] of this.workers) {
            this.terminateWorker(name);
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
            case 'primeNumbers':
                result = findPrimes(data.max);
                break;
            case 'imageProcessing':
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
        for (let j = 2; j < i; j++) {
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
    let data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        // Convert to grayscale
        let gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
        data[i] = gray;
        data[i + 1] = gray;
        data[i + 2] = gray;
    }
    return imageData;
}
`;

// Create worker script as blob URL
function createWorkerScript() {
    let blob = new Blob([WORKER_SCRIPT], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

// Usage example
async function demonstrateWorkerUsage() {
    let workerManager = new WorkerManager();
    let workerUrl = createWorkerScript();
    
    // Create worker
    workerManager.createWorker('computation', workerUrl);
    
    try {
        // Execute heavy computation without blocking UI
        console.time('fibonacci');
        let fibResult = await workerManager.executeTask('computation', {
            operation: 'fibonacci',
            data: { n: 40 }
        });
        console.timeEnd('fibonacci');
        console.log('Fibonacci result:', fibResult);
        
        // Process multiple tasks
        let tasks = [
            workerManager.executeTask('computation', {
                operation: 'primeNumbers',
                data: { max: 10000 }
            }),
            workerManager.executeTask('computation', {
                operation: 'fibonacci',
                data: { n: 35 }
            })
        ];
        
        let results = await Promise.all(tasks);
        console.log('All tasks completed:', results);
        
    } catch (error) {
        console.error('Worker task failed:', error);
    } finally {
        workerManager.terminateAll();
        URL.revokeObjectURL(workerUrl);
    }
}
```

This comprehensive performance lesson covers memory management, DOM optimization, algorithm efficiency, lazy loading, performance monitoring, and Web Workers. Each section provides practical examples and real-world optimization techniques that developers can apply immediately.
