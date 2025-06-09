# Async/Await & Modern Asynchronous Patterns

## Introduction to Async/Await

Async/await is syntactic sugar built on top of Promises that makes asynchronous code look and behave more like synchronous code, improving readability and maintainability.

### Basic Async/Await Syntax

```javascript
// Function declaration
async function fetchUserData(id) {
    try {
        const response = await fetch(`/api/users/${id}`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}

// Function expression
const fetchUserData = async (id) => {
    const response = await fetch(`/api/users/${id}`);
    return response.json();
};

// Method in class
class UserService {
    async getUser(id) {
        const response = await fetch(`/api/users/${id}`);
        return response.json();
    }
}

// IIFE (Immediately Invoked Function Expression)
(async () => {
    const users = await fetch('/api/users').then(r => r.json());
    console.log('Users:', users);
})();
```

### Converting Promises to Async/Await

```javascript
// Promise-based code
function getUserWithPosts(userId) {
    return fetch(`/api/users/${userId}`)
        .then(response => response.json())
        .then(user => {
            return fetch(`/api/users/${userId}/posts`)
                .then(response => response.json())
                .then(posts => ({
                    user,
                    posts
                }));
        })
        .catch(error => {
            console.error('Error:', error);
            throw error;
        });
}

// Async/await equivalent
async function getUserWithPosts(userId) {
    try {
        const userResponse = await fetch(`/api/users/${userId}`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`/api/users/${userId}/posts`);
        const posts = await postsResponse.json();
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Parallel execution with async/await
async function getUserWithPostsParallel(userId) {
    try {
        // Start both requests simultaneously
        const [userResponse, postsResponse] = await Promise.all([
            fetch(`/api/users/${userId}`),
            fetch(`/api/users/${userId}/posts`)
        ]);
        
        // Parse responses
        const [user, posts] = await Promise.all([
            userResponse.json(),
            postsResponse.json()
        ]);
        
        return { user, posts };
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
```

## Error Handling with Async/Await

### Try-Catch Blocks

```javascript
// Basic error handling
async function robustApiCall(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('API call failed:', error.message);
        return { success: false, error: error.message };
    }
}

// Multiple error types
async function processUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        
        if (response.status === 404) {
            throw new Error('User not found');
        }
        
        if (response.status === 403) {
            throw new Error('Access denied');
        }
        
        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }
        
        const user = await response.json();
        
        // Validate user data
        if (!user.email || !user.name) {
            throw new Error('Invalid user data received');
        }
        
        return user;
    } catch (error) {
        if (error.message === 'User not found') {
            return { error: 'user_not_found', message: 'The requested user does not exist' };
        } else if (error.message === 'Access denied') {
            return { error: 'access_denied', message: 'You do not have permission to access this user' };
        } else if (error.message.includes('Invalid user data')) {
            return { error: 'invalid_data', message: 'Received invalid data from server' };
        } else {
            return { error: 'unknown', message: 'An unexpected error occurred' };
        }
    }
}
```

### Error Propagation and Custom Error Classes

```javascript
// Custom error classes for better error handling
class APIError extends Error {
    constructor(message, status, response) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.response = response;
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

// Service layer with error handling
class UserService {
    async createUser(userData) {
        try {
            // Validate input
            this.validateUserData(userData);
            
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new APIError(
                    errorData.message || 'Failed to create user',
                    response.status,
                    errorData
                );
            }
            
            return await response.json();
        } catch (error) {
            if (error instanceof ValidationError) {
                console.error('Validation failed:', error.message);
                throw error;
            } else if (error instanceof APIError) {
                console.error('API error:', error.message, error.status);
                throw error;
            } else {
                console.error('Unexpected error:', error);
                throw new Error('Failed to create user due to unexpected error');
            }
        }
    }
    
    validateUserData(userData) {
        if (!userData.email) {
            throw new ValidationError('Email is required', 'email', userData.email);
        }
        
        if (!userData.email.includes('@')) {
            throw new ValidationError('Invalid email format', 'email', userData.email);
        }
        
        if (!userData.name || userData.name.length < 2) {
            throw new ValidationError('Name must be at least 2 characters', 'name', userData.name);
        }
    }
}
```

## Advanced Async Patterns

### Sequential vs Parallel Execution

```javascript
// Sequential execution - operations wait for each other
async function sequentialExecution() {
    console.time('Sequential');
    
    const user1 = await fetchUser(1);    // Wait for this to complete
    const user2 = await fetchUser(2);    // Then start this
    const user3 = await fetchUser(3);    // Then start this
    
    console.timeEnd('Sequential');
    return [user1, user2, user3];
}

// Parallel execution - all operations start simultaneously
async function parallelExecution() {
    console.time('Parallel');
    
    const [user1, user2, user3] = await Promise.all([
        fetchUser(1),  // All start at the same time
        fetchUser(2),
        fetchUser(3)
    ]);
    
    console.timeEnd('Parallel');
    return [user1, user2, user3];
}

// Mixed approach - some sequential, some parallel
async function mixedExecution() {
    // First, get user profile
    const profile = await fetchUserProfile();
    
    // Then get related data in parallel
    const [posts, comments, followers] = await Promise.all([
        fetchUserPosts(profile.id),
        fetchUserComments(profile.id),
        fetchUserFollowers(profile.id)
    ]);
    
    // Finally, process data sequentially
    const processedPosts = await processPosts(posts);
    const notifications = await generateNotifications(comments);
    
    return {
        profile,
        posts: processedPosts,
        comments,
        followers,
        notifications
    };
}
```

### Async Iteration and Generators

```javascript
// Async generators for streaming data
async function* fetchUsersPaginated(baseUrl) {
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
        const response = await fetch(`${baseUrl}?page=${page}&limit=10`);
        const data = await response.json();
        
        yield data.users;
        
        hasMore = data.hasNextPage;
        page++;
    }
}

// Using async iteration
async function processAllUsers() {
    for await (const userBatch of fetchUsersPaginated('/api/users')) {
        // Process each batch as it arrives
        for (const user of userBatch) {
            await processUser(user);
        }
        
        console.log(`Processed batch of ${userBatch.length} users`);
    }
}

// Async iteration with error handling
async function* resilientDataFetch(sources) {
    for (const source of sources) {
        try {
            const response = await fetch(source);
            const data = await response.json();
            yield { success: true, data, source };
        } catch (error) {
            yield { success: false, error: error.message, source };
        }
    }
}

// Processing streamed data
async function aggregateDataFromSources(sources) {
    const results = { successful: [], failed: [] };
    
    for await (const result of resilientDataFetch(sources)) {
        if (result.success) {
            results.successful.push(result.data);
        } else {
            results.failed.push({ source: result.source, error: result.error });
        }
    }
    
    return results;
}
```

### Concurrency Control

```javascript
// Limiting concurrent operations
class ConcurrencyLimiter {
    constructor(limit = 3) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    }
    
    async execute(asyncFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ asyncFn, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.limit || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { asyncFn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await asyncFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next item in queue
        }
    }
}

// Usage with batch processing
async function processManyUsers(userIds) {
    const limiter = new ConcurrencyLimiter(5); // Max 5 concurrent requests
    
    const promises = userIds.map(id => 
        limiter.execute(() => fetchAndProcessUser(id))
    );
    
    return Promise.allSettled(promises);
}

// Rate limiting with async/await
class RateLimiter {
    constructor(requestsPerSecond = 10) {
        this.interval = 1000 / requestsPerSecond;
        this.lastRequest = 0;
    }
    
    async throttle() {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequest;
        
        if (timeSinceLastRequest < this.interval) {
            const waitTime = this.interval - timeSinceLastRequest;
            await new Promise(resolve => setTimeout(resolve, waitTime));
        }
        
        this.lastRequest = Date.now();
    }
    
    async execute(asyncFn) {
        await this.throttle();
        return asyncFn();
    }
}
```

## Real-World Applications

### Building a Robust Data Fetcher

```javascript
class DataFetcher {
    constructor(options = {}) {
        this.baseUrl = options.baseUrl || '';
        this.timeout = options.timeout || 10000;
        this.retries = options.retries || 3;
        this.retryDelay = options.retryDelay || 1000;
        this.rateLimiter = new RateLimiter(options.requestsPerSecond || 10);
    }
    
    async fetch(url, options = {}) {
        return this.rateLimiter.execute(() => 
            this.fetchWithRetry(url, options)
        );
    }
    
    async fetchWithRetry(url, options = {}) {
        for (let attempt = 1; attempt <= this.retries; attempt++) {
            try {
                return await this.fetchWithTimeout(url, options);
            } catch (error) {
                if (attempt === this.retries) {
                    throw new Error(`Failed after ${this.retries} attempts: ${error.message}`);
                }
                
                console.warn(`Attempt ${attempt} failed, retrying in ${this.retryDelay}ms...`);
                await this.delay(this.retryDelay * attempt); // Exponential backoff
            }
        }
    }
    
    async fetchWithTimeout(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        
        try {
            const response = await fetch(this.baseUrl + url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new APIError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    response
                );
            }
            
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${this.timeout}ms`);
            }
            
            throw error;
        }
    }
    
    async get(url, options = {}) {
        const response = await this.fetch(url, { ...options, method: 'GET' });
        return response.json();
    }
    
    async post(url, data, options = {}) {
        const response = await this.fetch(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage example
async function demonstrateDataFetcher() {
    const fetcher = new DataFetcher({
        baseUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3,
        requestsPerSecond: 5
    });
    
    try {
        // Fetch multiple resources with automatic rate limiting and retries
        const [users, posts, comments] = await Promise.all([
            fetcher.get('/users'),
            fetcher.get('/posts'),
            fetcher.get('/comments')
        ]);
        
        console.log('Data loaded successfully:', { users, posts, comments });
    } catch (error) {
        console.error('Failed to load data:', error.message);
    }
}
```

### Async State Management

```javascript
class AsyncStateManager {
    constructor() {
        this.state = new Map();
        this.listeners = new Map();
        this.pending = new Set();
    }
    
    async setState(key, asyncFn) {
        // Prevent duplicate requests
        if (this.pending.has(key)) {
            return this.state.get(key);
        }
        
        this.pending.add(key);
        this.notifyListeners(key, { loading: true });
        
        try {
            const value = await asyncFn();
            this.state.set(key, value);
            this.notifyListeners(key, { loading: false, data: value });
            return value;
        } catch (error) {
            this.notifyListeners(key, { loading: false, error: error.message });
            throw error;
        } finally {
            this.pending.delete(key);
        }
    }
    
    getState(key) {
        return this.state.get(key);
    }
    
    subscribe(key, listener) {
        if (!this.listeners.has(key)) {
            this.listeners.set(key, new Set());
        }
        this.listeners.get(key).add(listener);
        
        // Return unsubscribe function
        return () => {
            const keyListeners = this.listeners.get(key);
            if (keyListeners) {
                keyListeners.delete(listener);
            }
        };
    }
    
    notifyListeners(key, state) {
        const keyListeners = this.listeners.get(key);
        if (keyListeners) {
            keyListeners.forEach(listener => listener(state));
        }
    }
    
    async invalidate(key) {
        this.state.delete(key);
        this.notifyListeners(key, { loading: false, data: null });
    }
}

// Usage example
const stateManager = new AsyncStateManager();

async function loadUserProfile(userId) {
    return stateManager.setState(`user:${userId}`, async () => {
        const response = await fetch(`/api/users/${userId}`);
        return response.json();
    });
}

// Subscribe to state changes
const unsubscribe = stateManager.subscribe('user:123', (state) => {
    if (state.loading) {
        console.log('Loading user...');
    } else if (state.error) {
        console.error('Error:', state.error);
    } else {
        console.log('User loaded:', state.data);
    }
});
```

## Best Practices and Common Pitfalls

### Best Practices

```javascript
// 1. Always handle errors appropriately
async function goodErrorHandling() {
    try {
        const data = await riskyOperation();
        return { success: true, data };
    } catch (error) {
        console.error('Operation failed:', error);
        return { success: false, error: error.message };
    }
}

// 2. Use Promise.all for parallel operations
async function efficientParallelFetch() {
    const [users, posts, comments] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
    ]);
    
    return { users, posts, comments };
}

// 3. Validate responses before using them
async function validateResponse(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (!data || typeof data !== 'object') {
        throw new Error('Invalid response format');
    }
    
    return data;
}

// 4. Use appropriate timeout values
async function fetchWithReasonableTimeout() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    try {
        const response = await fetch('/api/data', {
            signal: controller.signal
        });
        return response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}
```

### Common Pitfalls to Avoid

```javascript
// ❌ Forgetting to await async operations
async function badExample1() {
    const data = fetchData(); // Missing await!
    console.log(data); // Will log a Promise, not the data
}

// ✅ Correct version
async function goodExample1() {
    const data = await fetchData();
    console.log(data); // Will log the actual data
}

// ❌ Using async/await in loops inefficiently
async function badExample2(ids) {
    const results = [];
    for (const id of ids) {
        const data = await fetchData(id); // Sequential execution
        results.push(data);
    }
    return results;
}

// ✅ Correct version for parallel execution
async function goodExample2(ids) {
    const promises = ids.map(id => fetchData(id));
    return Promise.all(promises); // Parallel execution
}

// ❌ Not handling errors properly
async function badExample3() {
    const data = await fetchData(); // If this throws, it will crash
    return data;
}

// ✅ Correct version with error handling
async function goodExample3() {
    try {
        const data = await fetchData();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        return null;
    }
}

// ❌ Creating unnecessary Promise wrappers
async function badExample4() {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await fetchData();
            resolve(data);
        } catch (error) {
            reject(error);
        }
    });
}

// ✅ Correct version - async functions already return Promises
async function goodExample4() {
    return fetchData(); // This already returns a Promise
}
```

## Summary

Async/await provides a powerful and intuitive way to work with asynchronous JavaScript:

1. **Cleaner syntax** than Promise chains
2. **Better error handling** with try/catch
3. **Sequential and parallel execution** patterns
4. **Advanced patterns** like async iteration and concurrency control
5. **Real-world applications** with proper error handling and state management

Master these patterns to build robust, efficient applications that handle asynchronous operations gracefully.
