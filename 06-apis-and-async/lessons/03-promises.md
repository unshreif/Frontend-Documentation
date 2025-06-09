# Promises Deep Dive & Chaining

## Understanding JavaScript Promises

Promises represent the eventual completion (or failure) of an asynchronous operation and its resulting value. They provide a cleaner alternative to callback-based asynchronous programming and serve as the foundation for async/await syntax.

### Promise States and Lifecycle

```javascript
// Promise states demonstration
function demonstratePromiseStates() {
    // Pending state - initial state
    const pendingPromise = new Promise((resolve, reject) => {
        console.log('Promise is pending...');
        // This promise remains pending until resolved or rejected
    });
    
    console.log('Pending promise state:', pendingPromise);
    
    // Fulfilled state - operation completed successfully
    const fulfilledPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Success!');
        }, 1000);
    });
    
    // Rejected state - operation failed
    const rejectedPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Something went wrong!'));
        }, 1000);
    });
    
    // Handling states
    fulfilledPromise
        .then(value => console.log('Fulfilled:', value))
        .catch(error => console.error('This won\'t run'));
    
    rejectedPromise
        .then(value => console.log('This won\'t run'))
        .catch(error => console.error('Rejected:', error.message));
}

// Promise state inspection
function inspectPromiseState(promise) {
    // Note: This is for educational purposes - real code should use .then()/.catch()
    const promiseString = promise.toString();
    
    if (promiseString.includes('pending')) {
        return 'pending';
    } else if (promiseString.includes('resolved') || promiseString.includes('fulfilled')) {
        return 'fulfilled';
    } else if (promiseString.includes('rejected')) {
        return 'rejected';
    }
    
    // Modern approach using Promise.allSettled for state inspection
    return Promise.allSettled([promise]).then(results => {
        const result = results[0];
        return result.status; // 'fulfilled' or 'rejected'
    });
}
```

### Creating Promises

```javascript
// Basic promise creation
function createBasicPromise() {
    return new Promise((resolve, reject) => {
        // Simulate async operation
        const success = Math.random() > 0.5;
        
        setTimeout(() => {
            if (success) {
                resolve('Operation successful!');
            } else {
                reject(new Error('Operation failed!'));
            }
        }, 1000);
    });
}

// Promise that resolves immediately
function immediateResolve(value) {
    return Promise.resolve(value);
}

// Promise that rejects immediately
function immediateReject(error) {
    return Promise.reject(error);
}

// Converting callback-based functions to promises
function promisify(callbackFunction) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callbackFunction(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Example: Converting setTimeout to promise
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

// Example: Promisified file reading (Node.js style)
function readFilePromise(filename) {
    return new Promise((resolve, reject) => {
        // Simulating fs.readFile
        setTimeout(() => {
            if (filename.endsWith('.txt')) {
                resolve(`Content of ${filename}`);
            } else {
                reject(new Error('Invalid file type'));
            }
        }, 100);
    });
}

// Usage examples
async function demonstratePromiseCreation() {
    try {
        // Basic promise
        const result1 = await createBasicPromise();
        console.log('Basic promise result:', result1);
        
        // Immediate resolution
        const result2 = await immediateResolve('Immediate value');
        console.log('Immediate resolve:', result2);
        
        // Using delay
        console.log('Starting delay...');
        await delay(2000);
        console.log('Delay completed!');
        
        // Promisified function
        const fileContent = await readFilePromise('example.txt');
        console.log('File content:', fileContent);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}
```

## Promise Chaining and Composition

### Basic Promise Chaining

```javascript
// Sequential promise chaining
function demonstrateBasicChaining() {
    return fetch('https://api.example.com/users/1')
        .then(response => {
            console.log('Got response:', response.status);
            return response.json();
        })
        .then(user => {
            console.log('Got user:', user.name);
            return fetch(`https://api.example.com/users/${user.id}/posts`);
        })
        .then(response => {
            return response.json();
        })
        .then(posts => {
            console.log('Got posts:', posts.length);
            return posts;
        })
        .catch(error => {
            console.error('Chain failed:', error.message);
            throw error; // Re-throw if you want calling code to handle it
        })
        .finally(() => {
            console.log('Chain completed (success or failure)');
        });
}

// Promise chaining with transformation
function chainWithTransformation() {
    return fetch('https://api.example.com/users')
        .then(response => response.json())
        .then(users => {
            // Transform data in the chain
            return users.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                fullName: `${user.firstName} ${user.lastName}`
            }));
        })
        .then(transformedUsers => {
            // Filter data
            return transformedUsers.filter(user => user.email.includes('@company.com'));
        })
        .then(filteredUsers => {
            // Sort data
            return filteredUsers.sort((a, b) => a.name.localeCompare(b.name));
        });
}

// Conditional chaining
function conditionalChaining(useCache = false) {
    let promise;
    
    if (useCache) {
        promise = Promise.resolve(getCachedData());
    } else {
        promise = fetch('https://api.example.com/data')
            .then(response => response.json());
    }
    
    return promise
        .then(data => {
            if (!useCache) {
                setCachedData(data);
            }
            return data;
        })
        .then(data => processData(data));
}

function getCachedData() {
    return JSON.parse(localStorage.getItem('cachedData') || '[]');
}

function setCachedData(data) {
    localStorage.setItem('cachedData', JSON.stringify(data));
}

function processData(data) {
    return data.map(item => ({ ...item, processed: true }));
}
```

### Advanced Promise Chaining Patterns

```javascript
// Chaining with error recovery
function chainWithErrorRecovery() {
    return fetch('https://api.primary.com/data')
        .catch(error => {
            console.warn('Primary API failed, trying backup:', error.message);
            return fetch('https://api.backup.com/data');
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .catch(error => {
            console.warn('Backup API also failed, using default data:', error.message);
            return { data: [], source: 'default' };
        })
        .then(data => {
            // Process data regardless of source
            return {
                ...data,
                timestamp: new Date().toISOString(),
                processed: true
            };
        });
}

// Parallel processing within chains
function parallelProcessingInChain() {
    return fetch('https://api.example.com/user/123')
        .then(response => response.json())
        .then(user => {
            // Start multiple async operations in parallel
            const postsPromise = fetch(`https://api.example.com/users/${user.id}/posts`)
                .then(r => r.json());
            
            const friendsPromise = fetch(`https://api.example.com/users/${user.id}/friends`)
                .then(r => r.json());
            
            const settingsPromise = fetch(`https://api.example.com/users/${user.id}/settings`)
                .then(r => r.json());
            
            // Wait for all parallel operations
            return Promise.all([
                Promise.resolve(user),
                postsPromise,
                friendsPromise,
                settingsPromise
            ]);
        })
        .then(([user, posts, friends, settings]) => {
            // Combine all data
            return {
                user,
                posts,
                friends,
                settings,
                summary: {
                    postsCount: posts.length,
                    friendsCount: friends.length,
                    hasCustomSettings: Object.keys(settings).length > 0
                }
            };
        });
}

// Retrying with exponential backoff
function retryWithBackoff(promiseFactory, maxRetries = 3, baseDelay = 1000) {
    function attempt(retryCount = 0) {
        return promiseFactory()
            .catch(error => {
                if (retryCount >= maxRetries) {
                    throw new Error(`Max retries (${maxRetries}) exceeded. Last error: ${error.message}`);
                }
                
                const delay = baseDelay * Math.pow(2, retryCount);
                console.log(`Attempt ${retryCount + 1} failed, retrying in ${delay}ms...`);
                
                return new Promise(resolve => setTimeout(resolve, delay))
                    .then(() => attempt(retryCount + 1));
            });
    }
    
    return attempt();
}

// Usage of retry pattern
function fetchWithRetry(url) {
    return retryWithBackoff(() => fetch(url).then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
    }));
}
```

## Promise Combinators

### Promise.all() - Parallel Execution

```javascript
// Basic Promise.all usage
async function demonstratePromiseAll() {
    const urls = [
        'https://api.example.com/users',
        'https://api.example.com/posts',
        'https://api.example.com/comments'
    ];
    
    try {
        console.time('Promise.all');
        
        // All requests run in parallel
        const promises = urls.map(url => fetch(url).then(r => r.json()));
        const results = await Promise.all(promises);
        
        console.timeEnd('Promise.all');
        
        const [users, posts, comments] = results;
        
        return {
            users,
            posts,
            comments,
            summary: {
                totalUsers: users.length,
                totalPosts: posts.length,
                totalComments: comments.length
            }
        };
    } catch (error) {
        // If ANY promise rejects, Promise.all rejects immediately
        console.error('One or more requests failed:', error.message);
        throw error;
    }
}

// Promise.all with different data types
async function mixedPromiseAll() {
    const promises = [
        fetch('https://api.example.com/users').then(r => r.json()),
        delay(1000).then(() => 'Delayed value'),
        Promise.resolve(42),
        new Promise(resolve => setTimeout(() => resolve('Custom promise'), 500))
    ];
    
    const [apiData, delayedValue, immediateValue, customValue] = await Promise.all(promises);
    
    return {
        apiData,
        delayedValue,
        immediateValue,
        customValue
    };
}

// Handling Promise.all failures gracefully
async function gracefulPromiseAll(promises) {
    try {
        return await Promise.all(promises);
    } catch (error) {
        console.error('Promise.all failed, falling back to individual handling');
        
        // Fallback: handle each promise individually
        const results = [];
        for (const promise of promises) {
            try {
                const result = await promise;
                results.push({ status: 'fulfilled', value: result });
            } catch (err) {
                results.push({ status: 'rejected', reason: err.message });
            }
        }
        return results;
    }
}
```

### Promise.allSettled() - All Results Regardless of Status

```javascript
// Promise.allSettled for handling mixed success/failure
async function demonstratePromiseAllSettled() {
    const promises = [
        fetch('https://api.example.com/users').then(r => r.json()),
        fetch('https://api.invalid-url.com/data').then(r => r.json()), // This will fail
        Promise.resolve('Direct value'),
        Promise.reject(new Error('Intentional error')),
        delay(1000).then(() => 'Delayed success')
    ];
    
    const results = await Promise.allSettled(promises);
    
    const successful = results.filter(result => result.status === 'fulfilled');
    const failed = results.filter(result => result.status === 'rejected');
    
    console.log(`${successful.length} succeeded, ${failed.length} failed`);
    
    // Process successful results
    const successfulValues = successful.map(result => result.value);
    
    // Log failed results
    failed.forEach((result, index) => {
        console.error(`Promise ${index} failed:`, result.reason);
    });
    
    return {
        results,
        successful: successfulValues,
        failures: failed.map(f => f.reason),
        stats: {
            total: results.length,
            succeeded: successful.length,
            failed: failed.length
        }
    };
}

// Practical use case: Loading dashboard data
async function loadDashboardData() {
    const dataPromises = [
        fetchUserProfile().catch(err => ({ error: 'Failed to load profile', details: err.message })),
        fetchNotifications().catch(err => ({ error: 'Failed to load notifications', details: err.message })),
        fetchAnalytics().catch(err => ({ error: 'Failed to load analytics', details: err.message })),
        fetchMessages().catch(err => ({ error: 'Failed to load messages', details: err.message }))
    ];
    
    const results = await Promise.allSettled(dataPromises);
    
    const dashboard = {
        profile: null,
        notifications: [],
        analytics: null,
        messages: [],
        errors: []
    };
    
    results.forEach((result, index) => {
        const keys = ['profile', 'notifications', 'analytics', 'messages'];
        const key = keys[index];
        
        if (result.status === 'fulfilled') {
            if (result.value.error) {
                dashboard.errors.push(result.value);
            } else {
                dashboard[key] = result.value;
            }
        } else {
            dashboard.errors.push({
                section: key,
                error: result.reason.message
            });
        }
    });
    
    return dashboard;
}

// Helper functions for dashboard example
async function fetchUserProfile() {
    return fetch('/api/profile').then(r => r.json());
}

async function fetchNotifications() {
    return fetch('/api/notifications').then(r => r.json());
}

async function fetchAnalytics() {
    return fetch('/api/analytics').then(r => r.json());
}

async function fetchMessages() {
    return fetch('/api/messages').then(r => r.json());
}
```

### Promise.race() and Promise.any()

```javascript
// Promise.race - first settled (fulfilled or rejected)
async function demonstratePromiseRace() {
    const promises = [
        delay(1000).then(() => 'Slow response'),
        delay(2000).then(() => 'Slower response'),
        delay(500).then(() => 'Fast response'),
        delay(1500).then(() => 'Medium response')
    ];
    
    console.time('Promise.race');
    const winner = await Promise.race(promises);
    console.timeEnd('Promise.race');
    
    console.log('First to complete:', winner); // Should be "Fast response"
    return winner;
}

// Practical use case: Request timeout
function fetchWithTimeout(url, timeoutMs = 5000) {
    const fetchPromise = fetch(url);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
    });
    
    return Promise.race([fetchPromise, timeoutPromise]);
}

// Promise.race for performance testing
async function performanceRace() {
    const servers = [
        'https://api1.example.com/data',
        'https://api2.example.com/data',
        'https://api3.example.com/data'
    ];
    
    const promises = servers.map(url => 
        fetch(url)
            .then(response => ({ url, response, timestamp: Date.now() }))
            .catch(error => ({ url, error, timestamp: Date.now() }))
    );
    
    const fastest = await Promise.race(promises);
    console.log('Fastest server:', fastest.url);
    
    return fastest;
}

// Promise.any - first fulfilled (ignores rejections)
async function demonstratePromiseAny() {
    const promises = [
        Promise.reject(new Error('First failed')),
        delay(1000).then(() => Promise.reject(new Error('Second failed'))),
        delay(2000).then(() => 'Third succeeded'),
        delay(500).then(() => 'Fourth succeeded')
    ];
    
    try {
        console.time('Promise.any');
        const firstSuccess = await Promise.any(promises);
        console.timeEnd('Promise.any');
        
        console.log('First successful result:', firstSuccess);
        return firstSuccess;
    } catch (error) {
        // This happens only if ALL promises reject
        console.error('All promises rejected:', error);
        throw error;
    }
}

// Practical use case: Fallback API requests
async function fetchFromMultipleSources() {
    const sources = [
        fetch('https://primary-api.com/data').then(r => r.json()),
        fetch('https://backup-api.com/data').then(r => r.json()),
        fetch('https://cache-api.com/data').then(r => r.json())
    ];
    
    try {
        // Get the first successful response
        const data = await Promise.any(sources);
        console.log('Successfully fetched data from one of the sources');
        return data;
    } catch (error) {
        console.error('All API sources failed');
        throw new Error('No data source available');
    }
}
```

## Advanced Promise Patterns

### Promise Queuing and Rate Limiting

```javascript
// Promise queue for rate limiting
class PromiseQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    add(promiseFactory) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promiseFactory,
                resolve,
                reject
            });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { promiseFactory, resolve, reject } = this.queue.shift();
        
        try {
            const result = await promiseFactory();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next item in queue
        }
    }
    
    // Add multiple promises
    addAll(promiseFactories) {
        return Promise.all(
            promiseFactories.map(factory => this.add(factory))
        );
    }
    
    // Get queue status
    getStatus() {
        return {
            running: this.running,
            queued: this.queue.length,
            concurrency: this.concurrency
        };
    }
}

// Usage example
async function demonstratePromiseQueue() {
    const queue = new PromiseQueue(2); // Max 2 concurrent operations
    
    const tasks = Array.from({ length: 10 }, (_, i) => 
        () => delay(1000).then(() => `Task ${i + 1} completed`)
    );
    
    console.time('Queue processing');
    
    // Add all tasks to queue
    const results = await queue.addAll(tasks);
    
    console.timeEnd('Queue processing');
    console.log('All tasks completed:', results);
}

// Rate-limited API client
class RateLimitedApiClient {
    constructor(baseUrl, requestsPerSecond = 5) {
        this.baseUrl = baseUrl;
        this.requestInterval = 1000 / requestsPerSecond;
        this.lastRequestTime = 0;
        this.requestQueue = new PromiseQueue(1);
    }
    
    async request(endpoint, options = {}) {
        return this.requestQueue.add(async () => {
            // Ensure minimum time between requests
            const now = Date.now();
            const timeSinceLastRequest = now - this.lastRequestTime;
            
            if (timeSinceLastRequest < this.requestInterval) {
                const delay = this.requestInterval - timeSinceLastRequest;
                await new Promise(resolve => setTimeout(resolve, delay));
            }
            
            this.lastRequestTime = Date.now();
            
            const response = await fetch(`${this.baseUrl}${endpoint}`, options);
            return response.json();
        });
    }
    
    // Batch requests with rate limiting
    async batchRequest(endpoints) {
        const promises = endpoints.map(endpoint => this.request(endpoint));
        return Promise.all(promises);
    }
}
```

### Promise Memoization and Caching

```javascript
// Promise memoization for expensive operations
class PromiseMemoizer {
    constructor(ttl = 300000) { // 5 minutes default TTL
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    memoize(fn) {
        return (...args) => {
            const key = JSON.stringify(args);
            const cached = this.cache.get(key);
            
            if (cached && Date.now() - cached.timestamp < this.ttl) {
                console.log('Cache hit for:', key);
                return cached.promise;
            }
            
            console.log('Cache miss for:', key);
            const promise = fn(...args);
            
            this.cache.set(key, {
                promise,
                timestamp: Date.now()
            });
            
            // Clean up cache on promise completion
            promise.finally(() => {
                setTimeout(() => {
                    if (this.cache.get(key)?.timestamp < Date.now() - this.ttl) {
                        this.cache.delete(key);
                    }
                }, this.ttl);
            });
            
            return promise;
        };
    }
    
    clear() {
        this.cache.clear();
    }
    
    size() {
        return this.cache.size;
    }
}

// Usage example
const memoizer = new PromiseMemoizer(60000); // 1 minute TTL

const expensiveApiCall = memoizer.memoize(async (userId) => {
    console.log(`Making expensive API call for user ${userId}`);
    await delay(2000); // Simulate slow operation
    return { userId, data: `User data for ${userId}`, timestamp: Date.now() };
});

// Promise-based cache with LRU eviction
class LRUPromiseCache {
    constructor(maxSize = 100, ttl = 300000) {
        this.maxSize = maxSize;
        this.ttl = ttl;
        this.cache = new Map();
    }
    
    async get(key, factory) {
        const cached = this.cache.get(key);
        
        if (cached) {
            // Move to end (most recently used)
            this.cache.delete(key);
            this.cache.set(key, cached);
            
            if (Date.now() - cached.timestamp < this.ttl) {
                return cached.value;
            }
        }
        
        // Generate new value
        const value = await factory();
        
        // Add to cache
        this.set(key, value);
        
        return value;
    }
    
    set(key, value) {
        // Remove oldest if at capacity
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            value,
            timestamp: Date.now()
        });
    }
    
    has(key) {
        const cached = this.cache.get(key);
        return cached && (Date.now() - cached.timestamp < this.ttl);
    }
    
    clear() {
        this.cache.clear();
    }
}
```

### Promise-based Event System

```javascript
// Promise-based event emitter
class PromiseEventEmitter {
    constructor() {
        this.listeners = new Map();
        this.onceListeners = new Map();
    }
    
    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }
    
    once(event) {
        return new Promise(resolve => {
            if (!this.onceListeners.has(event)) {
                this.onceListeners.set(event, []);
            }
            this.onceListeners.get(event).push(resolve);
        });
    }
    
    async emit(event, data) {
        const results = [];
        
        // Call regular listeners
        const listeners = this.listeners.get(event) || [];
        for (const listener of listeners) {
            try {
                const result = await listener(data);
                results.push(result);
            } catch (error) {
                console.error(`Error in listener for ${event}:`, error);
            }
        }
        
        // Call once listeners
        const onceListeners = this.onceListeners.get(event) || [];
        for (const resolve of onceListeners) {
            resolve(data);
        }
        this.onceListeners.delete(event);
        
        return results;
    }
    
    // Wait for multiple events
    waitForAny(events) {
        const promises = events.map(event => this.once(event));
        return Promise.race(promises);
    }
    
    waitForAll(events) {
        const promises = events.map(event => this.once(event));
        return Promise.all(promises);
    }
    
    // Timeout for events
    waitForEvent(event, timeout = 5000) {
        const eventPromise = this.once(event);
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Event ${event} timeout`)), timeout);
        });
        
        return Promise.race([eventPromise, timeoutPromise]);
    }
}

// Usage example
async function demonstratePromiseEvents() {
    const emitter = new PromiseEventEmitter();
    
    // Set up listeners
    emitter.on('data', async (data) => {
        console.log('Processing data:', data);
        await delay(100);
        return `Processed: ${data}`;
    });
    
    // Wait for specific event
    setTimeout(() => {
        emitter.emit('ready', 'System initialized');
    }, 1000);
    
    try {
        const readyData = await emitter.waitForEvent('ready', 2000);
        console.log('System ready:', readyData);
        
        // Emit data event
        const results = await emitter.emit('data', 'test data');
        console.log('Processing results:', results);
        
    } catch (error) {
        console.error('Event timeout:', error.message);
    }
}
```

## Error Handling in Promise Chains

### Comprehensive Error Handling

```javascript
// Custom error classes for better error handling
class ApiError extends Error {
    constructor(message, status, response) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.response = response;
    }
}

class NetworkError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'NetworkError';
        this.originalError = originalError;
    }
}

class ValidationError extends Error {
    constructor(message, field, value) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
    }
}

// Promise chain with comprehensive error handling
async function robustApiCall(url, options = {}) {
    try {
        // Input validation
        if (!url || typeof url !== 'string') {
            throw new ValidationError('URL must be a non-empty string', 'url', url);
        }
        
        const response = await fetch(url, options);
        
        // Handle HTTP errors
        if (!response.ok) {
            const errorBody = await response.text().catch(() => 'Unknown error');
            throw new ApiError(
                `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                errorBody
            );
        }
        
        const data = await response.json();
        
        // Validate response data
        if (!data || typeof data !== 'object') {
            throw new ValidationError('Response must be a valid object', 'response', data);
        }
        
        return data;
        
    } catch (error) {
        // Handle different error types
        if (error instanceof TypeError) {
            throw new NetworkError('Network request failed', error);
        }
        
        if (error instanceof SyntaxError) {
            throw new ValidationError('Invalid JSON response', 'response', error.message);
        }
        
        // Re-throw custom errors
        throw error;
    }
}

// Error recovery patterns
async function callWithFallback(primaryCall, fallbackCall, maxRetries = 2) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            return await primaryCall();
        } catch (error) {
            lastError = error;
            
            if (attempt === maxRetries) {
                console.log('Primary call failed, trying fallback');
                try {
                    return await fallbackCall();
                } catch (fallbackError) {
                    console.error('Fallback also failed:', fallbackError.message);
                    throw new Error(`Both primary and fallback failed. Last error: ${error.message}`);
                }
            }
            
            // Wait before retry
            await delay(1000 * Math.pow(2, attempt));
        }
    }
    
    throw lastError;
}

// Circuit breaker pattern
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.nextAttempt = Date.now();
    }
    
    async call(promiseFactory) {
        if (this.state === 'OPEN') {
            if (Date.now() < this.nextAttempt) {
                throw new Error('Circuit breaker is OPEN');
            }
            this.state = 'HALF_OPEN';
        }
        
        try {
            const result = await promiseFactory();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
    
    onFailure() {
        this.failureCount++;
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            this.nextAttempt = Date.now() + this.timeout;
        }
    }
    
    getState() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            nextAttempt: new Date(this.nextAttempt)
        };
    }
}
```

Promises are fundamental to modern JavaScript asynchronous programming. Understanding their lifecycle, chaining patterns, combinators, and error handling strategies is essential for building robust applications. The patterns shown here provide a solid foundation for handling complex asynchronous workflows effectively.
