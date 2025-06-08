# Modern Web APIs & Browser Features

## Intersection Observer API

### Basic Usage and Lazy Loading

```javascript
// Lazy loading images with Intersection Observer
class LazyImageLoader {
    constructor(options = {}) {
        this.options = {
            rootMargin: '50px',
            threshold: 0.1,
            ...options
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
        
        this.init();
    }
    
    init() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => this.observer.observe(img));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.loadImage(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        // Create a new image to preload
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            img.src = src;
            img.classList.remove('lazy');
            img.classList.add('loaded');
        };
        
        imageLoader.onerror = () => {
            img.classList.add('error');
        };
        
        imageLoader.src = src;
    }
    
    destroy() {
        this.observer.disconnect();
    }
}

// Usage
const lazyLoader = new LazyImageLoader({
    rootMargin: '100px',
    threshold: 0.25
});

// Advanced usage with animations
class AnimationOnScroll {
    constructor() {
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            {
                threshold: 0.1,
                rootMargin: '-10% 0px'
            }
        );
        
        this.observeElements();
    }
    
    observeElements() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateElement(entry.target);
            }
        });
    }
    
    animateElement(element) {
        const animationType = element.dataset.animation || 'fadeIn';
        
        element.style.animationName = animationType;
        element.style.animationDuration = '0.6s';
        element.style.animationFillMode = 'both';
        
        // Optional: unobserve after animation
        if (element.dataset.once === 'true') {
            this.observer.unobserve(element);
        }
    }
}

// Infinite scroll implementation
class InfiniteScroll {
    constructor(container, loadMore, options = {}) {
        this.container = container;
        this.loadMore = loadMore;
        this.options = {
            rootMargin: '100px',
            threshold: 1.0,
            ...options
        };
        
        this.loading = false;
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.options
        );
        
        this.createSentinel();
    }
    
    createSentinel() {
        this.sentinel = document.createElement('div');
        this.sentinel.className = 'scroll-sentinel';
        this.sentinel.style.height = '1px';
        this.container.appendChild(this.sentinel);
        this.observer.observe(this.sentinel);
    }
    
    async handleIntersection(entries) {
        const entry = entries[0];
        
        if (entry.isIntersecting && !this.loading) {
            this.loading = true;
            
            try {
                const hasMore = await this.loadMore();
                
                if (!hasMore) {
                    this.destroy();
                }
            } catch (error) {
                console.error('Error loading more content:', error);
            } finally {
                this.loading = false;
            }
        }
    }
    
    destroy() {
        this.observer.disconnect();
        if (this.sentinel.parentNode) {
            this.sentinel.parentNode.removeChild(this.sentinel);
        }
    }
}

// Usage example
const contentContainer = document.getElementById('content');
let page = 1;

const infiniteScroll = new InfiniteScroll(
    contentContainer,
    async () => {
        const response = await fetch(`/api/posts?page=${page}`);
        const data = await response.json();
        
        data.posts.forEach(post => {
            const element = document.createElement('div');
            element.innerHTML = `<h3>${post.title}</h3><p>${post.excerpt}</p>`;
            contentContainer.appendChild(element);
        });
        
        page++;
        return data.hasMore;
    }
);
```

## ResizeObserver API

### Responsive Components

```javascript
// Responsive component that adapts to size changes
class ResponsiveCard {
    constructor(element) {
        this.element = element;
        this.breakpoints = {
            small: 300,
            medium: 500,
            large: 800
        };
        
        this.resizeObserver = new ResizeObserver(
            this.handleResize.bind(this)
        );
        
        this.resizeObserver.observe(this.element);
    }
    
    handleResize(entries) {
        entries.forEach(entry => {
            const { width, height } = entry.contentRect;
            this.updateLayout(width, height);
        });
    }
    
    updateLayout(width, height) {
        // Remove existing size classes
        this.element.classList.remove('small', 'medium', 'large');
        
        // Add appropriate size class
        if (width < this.breakpoints.small) {
            this.element.classList.add('small');
            this.applySmallLayout();
        } else if (width < this.breakpoints.medium) {
            this.element.classList.add('medium');
            this.applyMediumLayout();
        } else {
            this.element.classList.add('large');
            this.applyLargeLayout();
        }
        
        // Dispatch custom event
        this.element.dispatchEvent(new CustomEvent('sizechange', {
            detail: { width, height }
        }));
    }
    
    applySmallLayout() {
        // Stack elements vertically
        const title = this.element.querySelector('.title');
        const image = this.element.querySelector('.image');
        
        if (title) title.style.fontSize = '1.2em';
        if (image) image.style.display = 'none';
    }
    
    applyMediumLayout() {
        const title = this.element.querySelector('.title');
        const image = this.element.querySelector('.image');
        
        if (title) title.style.fontSize = '1.5em';
        if (image) {
            image.style.display = 'block';
            image.style.width = '100px';
        }
    }
    
    applyLargeLayout() {
        const title = this.element.querySelector('.title');
        const image = this.element.querySelector('.image');
        
        if (title) title.style.fontSize = '2em';
        if (image) {
            image.style.display = 'block';
            image.style.width = '200px';
        }
    }
    
    destroy() {
        this.resizeObserver.disconnect();
    }
}

// Chart that redraws when container resizes
class ResponsiveChart {
    constructor(container, data) {
        this.container = container;
        this.data = data;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        
        container.appendChild(this.canvas);
        
        this.resizeObserver = new ResizeObserver(
            this.handleResize.bind(this)
        );
        
        this.resizeObserver.observe(container);
        this.draw();
    }
    
    handleResize(entries) {
        entries.forEach(entry => {
            const { width, height } = entry.contentRect;
            this.updateCanvasSize(width, height);
            this.draw();
        });
    }
    
    updateCanvasSize(width, height) {
        // Set canvas size accounting for device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        this.ctx.scale(dpr, dpr);
    }
    
    draw() {
        const { width, height } = this.canvas.getBoundingClientRect();
        
        // Clear canvas
        this.ctx.clearRect(0, 0, width, height);
        
        // Draw chart based on current size
        this.drawChart(width, height);
    }
    
    drawChart(width, height) {
        // Simple bar chart implementation
        const padding = 40;
        const chartWidth = width - (padding * 2);
        const chartHeight = height - (padding * 2);
        
        const maxValue = Math.max(...this.data.map(d => d.value));
        const barWidth = chartWidth / this.data.length;
        
        this.ctx.fillStyle = '#3498db';
        
        this.data.forEach((item, index) => {
            const barHeight = (item.value / maxValue) * chartHeight;
            const x = padding + (index * barWidth);
            const y = height - padding - barHeight;
            
            this.ctx.fillRect(x, y, barWidth - 2, barHeight);
            
            // Draw labels if there's enough space
            if (barWidth > 50) {
                this.ctx.fillStyle = '#2c3e50';
                this.ctx.font = '12px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText(
                    item.label,
                    x + barWidth / 2,
                    height - padding + 20
                );
                this.ctx.fillStyle = '#3498db';
            }
        });
    }
}

// Usage
const chartData = [
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 200 }
];

const chartContainer = document.getElementById('chart');
const chart = new ResponsiveChart(chartContainer, chartData);
```

## Web Workers

### Heavy Computation in Background

```javascript
// Main thread worker manager
class WorkerManager {
    constructor() {
        this.workers = new Map();
        this.taskQueue = [];
        this.maxWorkers = navigator.hardwareConcurrency || 4;
    }
    
    async executeTask(taskType, data, options = {}) {
        return new Promise((resolve, reject) => {
            const task = {
                id: this.generateId(),
                type: taskType,
                data,
                options,
                resolve,
                reject,
                timestamp: Date.now()
            };
            
            this.taskQueue.push(task);
            this.processQueue();
        });
    }
    
    processQueue() {
        if (this.taskQueue.length === 0) return;
        
        // Find available worker or create new one
        let worker = this.findAvailableWorker();
        
        if (!worker && this.workers.size < this.maxWorkers) {
            worker = this.createWorker();
        }
        
        if (worker) {
            const task = this.taskQueue.shift();
            this.assignTaskToWorker(worker, task);
        }
    }
    
    findAvailableWorker() {
        for (const [id, worker] of this.workers) {
            if (!worker.busy) {
                return worker;
            }
        }
        return null;
    }
    
    createWorker() {
        const workerId = this.generateId();
        
        // Create worker with inline script
        const workerScript = this.createWorkerScript();
        const blob = new Blob([workerScript], { type: 'application/javascript' });
        const workerUrl = URL.createObjectURL(blob);
        
        const worker = new Worker(workerUrl);
        const workerData = {
            id: workerId,
            worker,
            busy: false,
            currentTask: null
        };
        
        worker.onmessage = (event) => {
            this.handleWorkerMessage(workerId, event.data);
        };
        
        worker.onerror = (error) => {
            this.handleWorkerError(workerId, error);
        };
        
        this.workers.set(workerId, workerData);
        URL.revokeObjectURL(workerUrl);
        
        return workerData;
    }
    
    assignTaskToWorker(workerData, task) {
        workerData.busy = true;
        workerData.currentTask = task;
        
        workerData.worker.postMessage({
            taskId: task.id,
            type: task.type,
            data: task.data,
            options: task.options
        });
        
        // Set timeout for long-running tasks
        if (task.options.timeout) {
            setTimeout(() => {
                if (workerData.currentTask?.id === task.id) {
                    this.timeoutTask(workerData, task);
                }
            }, task.options.timeout);
        }
    }
    
    handleWorkerMessage(workerId, message) {
        const workerData = this.workers.get(workerId);
        if (!workerData || !workerData.currentTask) return;
        
        const task = workerData.currentTask;
        
        if (message.taskId === task.id) {
            if (message.success) {
                task.resolve(message.result);
            } else {
                task.reject(new Error(message.error));
            }
            
            // Mark worker as available
            workerData.busy = false;
            workerData.currentTask = null;
            
            // Process next task in queue
            this.processQueue();
        }
    }
    
    handleWorkerError(workerId, error) {
        const workerData = this.workers.get(workerId);
        if (workerData?.currentTask) {
            workerData.currentTask.reject(error);
        }
        
        // Recreate worker
        this.recreateWorker(workerId);
    }
    
    timeoutTask(workerData, task) {
        task.reject(new Error('Task timeout'));
        
        // Terminate and recreate worker
        workerData.worker.terminate();
        this.recreateWorker(workerData.id);
    }
    
    recreateWorker(workerId) {
        const oldWorker = this.workers.get(workerId);
        if (oldWorker) {
            oldWorker.worker.terminate();
            this.workers.delete(workerId);
        }
        
        // Create new worker
        this.createWorker();
        this.processQueue();
    }
    
    createWorkerScript() {
        return `
            // Worker script
            self.onmessage = function(event) {
                const { taskId, type, data, options } = event.data;
                
                try {
                    let result;
                    
                    switch (type) {
                        case 'factorial':
                            result = calculateFactorial(data.number);
                            break;
                        case 'fibonacci':
                            result = calculateFibonacci(data.number);
                            break;
                        case 'primes':
                            result = findPrimes(data.limit);
                            break;
                        case 'sort':
                            result = sortArray(data.array);
                            break;
                        case 'image-process':
                            result = processImageData(data.imageData, data.operation);
                            break;
                        default:
                            throw new Error('Unknown task type: ' + type);
                    }
                    
                    self.postMessage({
                        taskId,
                        success: true,
                        result
                    });
                } catch (error) {
                    self.postMessage({
                        taskId,
                        success: false,
                        error: error.message
                    });
                }
            };
            
            function calculateFactorial(n) {
                if (n <= 1) return 1;
                return n * calculateFactorial(n - 1);
            }
            
            function calculateFibonacci(n) {
                if (n <= 1) return n;
                let a = 0, b = 1;
                for (let i = 2; i <= n; i++) {
                    [a, b] = [b, a + b];
                }
                return b;
            }
            
            function findPrimes(limit) {
                const primes = [];
                const sieve = new Array(limit + 1).fill(true);
                sieve[0] = sieve[1] = false;
                
                for (let i = 2; i * i <= limit; i++) {
                    if (sieve[i]) {
                        for (let j = i * i; j <= limit; j += i) {
                            sieve[j] = false;
                        }
                    }
                }
                
                for (let i = 2; i <= limit; i++) {
                    if (sieve[i]) primes.push(i);
                }
                
                return primes;
            }
            
            function sortArray(array) {
                return [...array].sort((a, b) => a - b);
            }
            
            function processImageData(imageData, operation) {
                const data = imageData.data;
                const result = new Uint8ClampedArray(data);
                
                switch (operation) {
                    case 'grayscale':
                        for (let i = 0; i < data.length; i += 4) {
                            const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                            result[i] = result[i + 1] = result[i + 2] = gray;
                            result[i + 3] = data[i + 3]; // Alpha
                        }
                        break;
                    case 'invert':
                        for (let i = 0; i < data.length; i += 4) {
                            result[i] = 255 - data[i];     // Red
                            result[i + 1] = 255 - data[i + 1]; // Green
                            result[i + 2] = 255 - data[i + 2]; // Blue
                            result[i + 3] = data[i + 3];   // Alpha
                        }
                        break;
                }
                
                return { ...imageData, data: result };
            }
        `;
    }
    
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }
    
    destroy() {
        this.workers.forEach(worker => {
            worker.worker.terminate();
        });
        this.workers.clear();
        this.taskQueue = [];
    }
}

// Usage examples
const workerManager = new WorkerManager();

// Heavy computation example
async function performHeavyCalculations() {
    try {
        console.log('Starting heavy calculations...');
        
        // These will run in parallel across multiple workers
        const [factorial, fibonacci, primes] = await Promise.all([
            workerManager.executeTask('factorial', { number: 20 }),
            workerManager.executeTask('fibonacci', { number: 40 }),
            workerManager.executeTask('primes', { limit: 100000 })
        ]);
        
        console.log('Results:', {
            factorial,
            fibonacci,
            primesCount: primes.length
        });
    } catch (error) {
        console.error('Calculation error:', error);
    }
}

// Image processing example
async function processImage(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    
    try {
        const processed = await workerManager.executeTask(
            'image-process',
            { imageData, operation: 'grayscale' },
            { timeout: 10000 }
        );
        
        ctx.putImageData(new ImageData(
            processed.data,
            processed.width,
            processed.height
        ), 0, 0);
    } catch (error) {
        console.error('Image processing error:', error);
    }
}
```

## Service Workers

### Advanced Caching and Background Sync

```javascript
// Service Worker registration and management
class ServiceWorkerManager {
    constructor() {
        this.registration = null;
        this.updateAvailable = false;
    }
    
    async register(swPath = '/sw.js') {
        if (!('serviceWorker' in navigator)) {
            throw new Error('Service Workers not supported');
        }
        
        try {
            this.registration = await navigator.serviceWorker.register(swPath);
            
            // Listen for updates
            this.registration.addEventListener('updatefound', () => {
                this.handleUpdate();
            });
            
            // Check if there's an update available
            if (this.registration.waiting) {
                this.updateAvailable = true;
                this.notifyUpdate();
            }
            
            // Listen for controlling change
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                window.location.reload();
            });
            
            console.log('Service Worker registered successfully');
            return this.registration;
        } catch (error) {
            console.error('Service Worker registration failed:', error);
            throw error;
        }
    }
    
    handleUpdate() {
        const newWorker = this.registration.installing;
        
        newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                this.updateAvailable = true;
                this.notifyUpdate();
            }
        });
    }
    
    notifyUpdate() {
        // Show update notification to user
        const updateBanner = document.createElement('div');
        updateBanner.className = 'update-banner';
        updateBanner.innerHTML = `
            <div class="update-content">
                <span>New version available!</span>
                <button onclick="swManager.applyUpdate()">Update</button>
                <button onclick="this.parentElement.parentElement.remove()">Dismiss</button>
            </div>
        `;
        document.body.appendChild(updateBanner);
    }
    
    applyUpdate() {
        if (this.registration.waiting) {
            this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }
    }
    
    async unregister() {
        if (this.registration) {
            await this.registration.unregister();
            console.log('Service Worker unregistered');
        }
    }
}

// Service Worker script content (sw.js)
const serviceWorkerScript = `
const CACHE_NAME = 'app-cache-v1';
const API_CACHE_NAME = 'api-cache-v1';
const OFFLINE_PAGE = '/offline.html';

const STATIC_RESOURCES = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/offline.html',
    '/manifest.json'
];

// Install event - cache static resources
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(STATIC_RESOURCES))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME && cacheName !== API_CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Handle API requests
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(handleAPIRequest(request));
        return;
    }
    
    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(handleNavigationRequest(request));
        return;
    }
    
    // Handle static resources
    event.respondWith(handleStaticRequest(request));
});

// API request handler with network-first strategy
async function handleAPIRequest(request) {
    const cache = await caches.open(API_CACHE_NAME);
    
    try {
        // Try network first
        const response = await fetch(request);
        
        if (response.ok) {
            // Cache successful responses
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        // Fallback to cache
        const cachedResponse = await cache.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return error response
        return new Response(
            JSON.stringify({ error: 'Offline', cached: false }),
            {
                status: 503,
                headers: { 'Content-Type': 'application/json' }
            }
        );
    }
}

// Navigation request handler
async function handleNavigationRequest(request) {
    try {
        const response = await fetch(request);
        return response;
    } catch (error) {
        // Return offline page
        const cache = await caches.open(CACHE_NAME);
        return cache.match(OFFLINE_PAGE);
    }
}

// Static resource handler with cache-first strategy
async function handleStaticRequest(request) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    try {
        const response = await fetch(request);
        
        if (response.ok) {
            cache.put(request, response.clone());
        }
        
        return response;
    } catch (error) {
        return new Response('Resource not available offline', { status: 503 });
    }
}

// Background sync
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        // Get pending requests from IndexedDB
        const pendingRequests = await getPendingRequests();
        
        for (const request of pendingRequests) {
            try {
                await fetch(request.url, request.options);
                await removePendingRequest(request.id);
            } catch (error) {
                console.log('Background sync failed for request:', request.id);
            }
        }
    } catch (error) {
        console.error('Background sync error:', error);
    }
}

// Push notifications
self.addEventListener('push', event => {
    const options = {
        body: event.data.text(),
        icon: '/icon-192.png',
        badge: '/badge-72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Go to the site',
                icon: '/action-icon.png'
            },
            {
                action: 'close',
                title: 'Close the notification',
                icon: '/close-icon.png'
            }
        ]
    };
    
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Helper functions for IndexedDB operations
async function getPendingRequests() {
    // Implementation would use IndexedDB to store/retrieve pending requests
    return [];
}

async function removePendingRequest(id) {
    // Implementation would remove request from IndexedDB
}
`;

// Usage
const swManager = new ServiceWorkerManager();

// Register service worker
swManager.register('/sw.js').then(() => {
    console.log('App is now ready for offline use');
}).catch(error => {
    console.error('Failed to register service worker:', error);
});
```

## Summary

This lesson covered modern Web APIs including:

1. **Intersection Observer**: Lazy loading, scroll animations, infinite scroll
2. **ResizeObserver**: Responsive components, adaptive layouts
3. **Web Workers**: Background computation, parallel processing
4. **Service Workers**: Offline functionality, caching strategies, background sync

These APIs enable building performant, responsive web applications with advanced features like offline support, lazy loading, and background processing.
