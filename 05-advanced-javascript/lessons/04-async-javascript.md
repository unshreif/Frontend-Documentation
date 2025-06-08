# Promises, Async/Await & Concurrency

## Introduction to Asynchronous JavaScript

Asynchronous programming is essential for modern JavaScript applications. It allows code to execute non-blocking operations, keeping the user interface responsive while handling time-consuming tasks like API calls, file operations, or timers.

### Understanding the Event Loop

```javascript
// Synchronous code blocks the thread
console.log('1');
console.log('2');
console.log('3');
// Output: 1, 2, 3 (immediate)

// Asynchronous code doesn't block
console.log('1');
setTimeout(() => console.log('2'), 0);
console.log('3');
// Output: 1, 3, 2 (2 appears after 3)

// Microtasks vs Macrotasks
console.log('1');
setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('2');
// Output: 1, 2, Promise, setTimeout
```

## Promise Fundamentals

### Creating and Using Promises

```javascript
// Basic Promise creation
const fetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: `User ${userId}`,
                    email: `user${userId}@example.com`
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
};

// Using Promises
fetchUserData(1)
    .then(user => {
        console.log('User data:', user);
        return user.id;
    })
    .then(userId => {
        console.log('User ID:', userId);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        console.log('Operation completed');
    });

// Promise states demonstration
const immediateResolve = Promise.resolve('Immediate value');
const immediateReject = Promise.reject(new Error('Immediate error'));

immediateResolve.then(value => console.log(value)); // 'Immediate value'
immediateReject.catch(error => console.log(error.message)); // 'Immediate error'
```

### Promise Chaining and Transformation

```javascript
// Complex promise chaining
const processUserData = (userId) => {
    return fetchUserData(userId)
        .then(user => {
            console.log('Fetched user:', user.name);
            
            // Return another promise
            return fetch(`/api/users/${user.id}/posts`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            console.log(`Found ${posts.length} posts`);
            
            // Transform data
            return posts.map(post => ({
                ...post,
                summary: post.content.substring(0, 100)
            }));
        })
        .catch(error => {
            console.error('Processing failed:', error.message);
            return []; // Return default value on error
        });
};

// Advanced error handling
const robustApiCall = (url) => {
    const timeout = (ms) => new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), ms)
    );
    
    return Promise.race([
        fetch(url),
        timeout(5000)
    ])
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        if (error.message === 'Timeout') {
            throw new Error('Request timed out after 5 seconds');
        }
        throw error;
    });
};
```

## Promise Combinators

### Promise.all() - Parallel Execution

```javascript
// Execute multiple promises in parallel
const fetchMultipleUsers = async (userIds) => {
    const userPromises = userIds.map(id => fetchUserData(id));
    
    try {
        const users = await Promise.all(userPromises);
        console.log('All users fetched:', users);
        return users;
    } catch (error) {
        console.error('One or more requests failed:', error.message);
        throw error;
    }
};

// Real-world example: Dashboard data loading
const loadDashboardData = () => {
    const dataPromises = [
        fetch('/api/user/profile').then(r => r.json()),
        fetch('/api/user/notifications').then(r => r.json()),
        fetch('/api/user/recent-activity').then(r => r.json()),
        fetch('/api/system/status').then(r => r.json())
    ];
    
    return Promise.all(dataPromises)
        .then(([profile, notifications, activity, status]) => ({
            profile,
            notifications,
            activity,
            status,
            loadedAt: new Date()
        }));
};

// With error handling for individual promises
const loadDashboardDataSafe = () => {
    const safeRequest = (url, defaultValue = null) => 
        fetch(url)
            .then(r => r.json())
            .catch(error => {
                console.warn(`Failed to load ${url}:`, error.message);
                return defaultValue;
            });
    
    const dataPromises = [
        safeRequest('/api/user/profile', { name: 'Unknown' }),
        safeRequest('/api/user/notifications', []),
        safeRequest('/api/user/recent-activity', []),
        safeRequest('/api/system/status', { status: 'unknown' })
    ];
    
    return Promise.all(dataPromises)
        .then(([profile, notifications, activity, status]) => ({
            profile,
            notifications,
            activity,
            status
        }));
};
```

### Promise.allSettled() - Handle Mixed Results

```javascript
// Promise.allSettled waits for all promises to settle (resolve or reject)
const fetchAllUserData = async (userIds) => {
    const promises = userIds.map(id => fetchUserData(id));
    const results = await Promise.allSettled(promises);
    
    const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);
    
    const failed = results
        .filter(result => result.status === 'rejected')
        .map(result => ({ error: result.reason.message }));
    
    return { successful, failed };
};

// Real-world example: Batch API operations
const batchUpdateUsers = async (updates) => {
    const updatePromises = updates.map(update => 
        fetch(`/api/users/${update.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(update.data)
        })
    );
    
    const results = await Promise.allSettled(updatePromises);
    
    return {
        successful: results.filter(r => r.status === 'fulfilled').length,
        failed: results.filter(r => r.status === 'rejected').length,
        details: results.map((result, index) => ({
            id: updates[index].id,
            status: result.status,
            data: result.status === 'fulfilled' ? result.value : result.reason
        }))
    };
};
```

### Promise.race() and Promise.any()

```javascript
// Promise.race - First to settle (resolve or reject)
const timeoutPromise = (ms) => new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
);

const fetchWithTimeout = async (url, timeoutMs = 5000) => {
    return Promise.race([
        fetch(url),
        timeoutPromise(timeoutMs)
    ]);
};

// Promise.any - First to resolve (ignores rejections)
const fetchFromMultipleSources = async (urls) => {
    try {
        const response = await Promise.any(
            urls.map(url => fetch(url))
        );
        return response.json();
    } catch (error) {
        // All promises rejected
        throw new Error('All data sources failed');
    }
};

// Advanced racing patterns
class RobustFetcher {
    constructor(baseUrls, options = {}) {
        this.baseUrls = baseUrls;
        this.timeout = options.timeout || 5000;
        this.retries = options.retries || 2;
    }
    
    async fetch(endpoint) {
        for (let attempt = 0; attempt <= this.retries; attempt++) {
            try {
                const urls = this.baseUrls.map(base => `${base}${endpoint}`);
                return await Promise.any([
                    ...urls.map(url => this.fetchWithTimeout(url)),
                    this.timeoutPromise(this.timeout)
                ]);
            } catch (error) {
                if (attempt === this.retries) throw error;
                await this.delay(Math.pow(2, attempt) * 1000); // Exponential backoff
            }
        }
    }
    
    async fetchWithTimeout(url) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
```

## Advanced Async Patterns

### Async Iterators and Generators

```javascript
// Async generator for paginated data
async function* fetchAllPages(baseUrl) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(`${baseUrl}?page=${page}&limit=10`);
        const data = await response.json();
        
        yield data.items;
        
        hasMore = data.hasMore;
        page++;
    }
}

// Using async iterators
const processAllUsers = async () => {
    for await (const userBatch of fetchAllPages('/api/users')) {
        // Process each batch
        await Promise.all(userBatch.map(user => processUser(user)));
        console.log(`Processed batch of ${userBatch.length} users`);
    }
};

// Async generator with error handling
async function* resilientDataStream(sources) {
    for (const source of sources) {
        try {
            const data = await fetch(source);
            yield await data.json();
        } catch (error) {
            console.warn(`Failed to fetch from ${source}:`, error.message);
            yield { error: error.message, source };
        }
    }
}

// Advanced streaming pattern
class DataStream {
    constructor(sources) {
        this.sources = sources;
        this.transforms = [];
    }
    
    transform(fn) {
        this.transforms.push(fn);
        return this;
    }
    
    filter(predicate) {
        return this.transform(async function* (stream) {
            for await (const item of stream) {
                if (await predicate(item)) {
                    yield item;
                }
            }
        });
    }
    
    map(mapper) {
        return this.transform(async function* (stream) {
            for await (const item of stream) {
                yield await mapper(item);
            }
        });
    }
    
    async* [Symbol.asyncIterator]() {
        let stream = this.createSourceStream();
        
        for (const transform of this.transforms) {
            stream = transform(stream);
        }
        
        yield* stream;
    }
    
    async* createSourceStream() {
        for (const source of this.sources) {
            try {
                const response = await fetch(source);
                const data = await response.json();
                yield* data.items || [data];
            } catch (error) {
                yield { error: error.message, source };
            }
        }
    }
}

// Usage
const stream = new DataStream(['/api/users', '/api/admins'])
    .filter(user => user.active)
    .map(user => ({ ...user, processed: true }));

for await (const user of stream) {
    console.log('Processed user:', user);
}
```

### Concurrency Control

```javascript
// Limit concurrent operations
class ConcurrencyController {
    constructor(maxConcurrent = 3) {
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.queue = [];
    }
    
    async execute(asyncFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                fn: asyncFn,
                resolve,
                reject
            });
            this.processQueue();
        });
    }
    
    async processQueue() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { fn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await fn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.processQueue();
        }
    }
}

// Batch processing with concurrency control
const batchProcessor = async (items, processor, batchSize = 5) => {
    const results = [];
    const controller = new ConcurrencyController(batchSize);
    
    const promises = items.map(item => 
        controller.execute(() => processor(item))
    );
    
    return Promise.allSettled(promises);
};

// Worker pool pattern
class WorkerPool {
    constructor(workerFn, poolSize = 3) {
        this.workerFn = workerFn;
        this.workers = Array(poolSize).fill(null).map(() => this.createWorker());
        this.taskQueue = [];
        this.availableWorkers = [...this.workers];
    }
    
    createWorker() {
        return {
            id: Math.random().toString(36),
            busy: false,
            process: this.workerFn
        };
    }
    
    async execute(task) {
        return new Promise((resolve, reject) => {
            this.taskQueue.push({ task, resolve, reject });
            this.assignWork();
        });
    }
    
    async assignWork() {
        if (this.taskQueue.length === 0 || this.availableWorkers.length === 0) {
            return;
        }
        
        const worker = this.availableWorkers.pop();
        const { task, resolve, reject } = this.taskQueue.shift();
        
        worker.busy = true;
        
        try {
            const result = await worker.process(task);
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            worker.busy = false;
            this.availableWorkers.push(worker);
            this.assignWork(); // Process next task
        }
    }
}
```

## Error Handling in Async Code

### Advanced Error Recovery

```javascript
// Retry with exponential backoff
const retryWithBackoff = async (fn, maxRetries = 3, baseDelay = 1000) => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
            }
            
            const delay = baseDelay * Math.pow(2, attempt);
            console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
};

// Circuit breaker pattern
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failures = 0;
        this.lastFailure = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async execute(fn) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailure < this.timeout) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await fn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failures = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failures++;
        this.lastFailure = Date.now();
        
        if (this.failures >= this.threshold) {
            this.state = 'OPEN';
        }
    }
}

// Graceful degradation
class ResilientService {
    constructor(primaryFn, fallbackFn, options = {}) {
        this.primaryFn = primaryFn;
        this.fallbackFn = fallbackFn;
        this.timeout = options.timeout || 5000;
        this.circuitBreaker = new CircuitBreaker();
    }
    
    async execute(...args) {
        try {
            return await Promise.race([
                this.circuitBreaker.execute(() => this.primaryFn(...args)),
                this.timeoutPromise()
            ]);
        } catch (error) {
            console.warn('Primary service failed, using fallback:', error.message);
            
            try {
                return await this.fallbackFn(...args);
            } catch (fallbackError) {
                throw new Error(`Both primary and fallback failed: ${error.message}, ${fallbackError.message}`);
            }
        }
    }
    
    timeoutPromise() {
        return new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Service timeout')), this.timeout)
        );
    }
}
```

## Real-World Async Patterns

### Data Synchronization

```javascript
// Optimistic updates with rollback
class OptimisticUpdater {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.pendingUpdates = new Map();
    }
    
    async update(id, updateFn, optimisticUpdate) {
        // Apply optimistic update immediately
        const originalState = this.getCurrentState(id);
        this.applyOptimisticUpdate(id, optimisticUpdate);
        
        try {
            // Perform actual update
            const result = await this.apiClient.update(id, updateFn);
            this.confirmUpdate(id, result);
            return result;
        } catch (error) {
            // Rollback on failure
            this.rollbackUpdate(id, originalState);
            throw error;
        }
    }
    
    getCurrentState(id) {
        // Implementation depends on state management system
        return this.getFromStore(id);
    }
    
    applyOptimisticUpdate(id, update) {
        this.pendingUpdates.set(id, this.getCurrentState(id));
        this.updateStore(id, update);
    }
    
    confirmUpdate(id, result) {
        this.pendingUpdates.delete(id);
        this.updateStore(id, result);
    }
    
    rollbackUpdate(id, originalState) {
        this.pendingUpdates.delete(id);
        this.updateStore(id, originalState);
    }
}

// Real-time data synchronization
class RealtimeSync {
    constructor(endpoint, handlers = {}) {
        this.endpoint = endpoint;
        this.handlers = handlers;
        this.isConnected = false;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }
    
    async connect() {
        try {
            this.ws = new WebSocket(this.endpoint);
            this.setupEventHandlers();
            
            await new Promise((resolve, reject) => {
                this.ws.onopen = () => {
                    this.isConnected = true;
                    this.reconnectAttempts = 0;
                    resolve();
                };
                this.ws.onerror = reject;
            });
        } catch (error) {
            this.handleReconnect();
        }
    }
    
    setupEventHandlers() {
        this.ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (this.handlers[data.type]) {
                this.handlers[data.type](data.payload);
            }
        };
        
        this.ws.onclose = () => {
            this.isConnected = false;
            this.handleReconnect();
        };
    }
    
    async handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max reconnection attempts reached');
            return;
        }
        
        this.reconnectAttempts++;
        const delay = Math.pow(2, this.reconnectAttempts) * 1000;
        
        console.log(`Reconnecting in ${delay}ms... (attempt ${this.reconnectAttempts})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        this.connect();
    }
    
    send(type, payload) {
        if (this.isConnected) {
            this.ws.send(JSON.stringify({ type, payload }));
        } else {
            console.warn('WebSocket not connected');
        }
    }
}
```

### Performance Optimization

```javascript
// Request deduplication
class RequestDeduplicator {
    constructor() {
        this.cache = new Map();
    }
    
    async request(key, requestFn) {
        if (this.cache.has(key)) {
            return this.cache.get(key);
        }
        
        const promise = requestFn().finally(() => {
            // Remove from cache when done
            this.cache.delete(key);
        });
        
        this.cache.set(key, promise);
        return promise;
    }
}

// Background sync for offline support
class BackgroundSync {
    constructor(storageKey = 'pendingRequests') {
        this.storageKey = storageKey;
        this.isOnline = navigator.onLine;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.syncPendingRequests();
        });
        
        window.addEventListener('offline', () => {
            this.isOnline = false;
        });
    }
    
    async request(url, options = {}) {
        if (this.isOnline) {
            try {
                return await fetch(url, options);
            } catch (error) {
                this.queueRequest(url, options);
                throw error;
            }
        } else {
            this.queueRequest(url, options);
            throw new Error('Offline - request queued for later');
        }
    }
    
    queueRequest(url, options) {
        const pending = this.getPendingRequests();
        pending.push({ url, options, timestamp: Date.now() });
        localStorage.setItem(this.storageKey, JSON.stringify(pending));
    }
    
    getPendingRequests() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : [];
    }
    
    async syncPendingRequests() {
        const pending = this.getPendingRequests();
        const results = await Promise.allSettled(
            pending.map(({ url, options }) => fetch(url, options))
        );
        
        // Remove successful requests
        const stillPending = pending.filter((_, index) => 
            results[index].status === 'rejected'
        );
        
        localStorage.setItem(this.storageKey, JSON.stringify(stillPending));
    }
}

// Adaptive loading based on connection
class AdaptiveLoader {
    constructor() {
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    }
    
    async loadContent(highQualityUrl, lowQualityUrl) {
        const useHighQuality = this.shouldLoadHighQuality();
        const url = useHighQuality ? highQualityUrl : lowQualityUrl;
        
        return fetch(url);
    }
    
    shouldLoadHighQuality() {
        if (!this.connection) return true; // Default to high quality if no info
        
        const effectiveType = this.connection.effectiveType;
        return effectiveType === '4g' || effectiveType === '3g';
    }
    
    async preloadCriticalResources(resources) {
        const shouldPreload = this.connection?.saveData !== true;
        
        if (shouldPreload) {
            return Promise.all(
                resources.map(url => 
                    fetch(url, { priority: 'high' }).catch(() => null)
                )
            );
        }
    }
}
```

## Summary

This lesson covered advanced asynchronous JavaScript patterns including:

1. **Promise Combinators** - allSettled, race, any for complex coordination
2. **Async Iterators** - Streaming and processing large datasets
3. **Concurrency Control** - Managing parallel operations efficiently
4. **Error Recovery** - Retry mechanisms, circuit breakers, graceful degradation
5. **Real-time Sync** - WebSocket management and offline support
6. **Performance** - Deduplication, background sync, adaptive loading

These patterns are essential for building robust, scalable applications that handle real-world complexity and provide excellent user experiences even under adverse conditions.
