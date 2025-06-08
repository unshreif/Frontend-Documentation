# Fetch API & HTTP Requests

## Introduction to the Fetch API

The Fetch API provides a modern, promise-based approach to making HTTP requests in JavaScript. It's the successor to XMLHttpRequest and offers a cleaner, more flexible interface for network communication.

### Basic Fetch Syntax

```javascript
// Basic GET request
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// Using async/await (preferred)
async function fetchUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}
```

### Understanding the Response Object

```javascript
async function examineResponse() {
    const response = await fetch('https://api.example.com/users');
    
    console.log('Status:', response.status);        // 200, 404, 500, etc.
    console.log('Status Text:', response.statusText); // "OK", "Not Found", etc.
    console.log('Headers:', response.headers);
    console.log('URL:', response.url);
    console.log('OK:', response.ok);                // true if status 200-299
    
    // Response can only be consumed once
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}

// Different ways to consume response body
async function consumeResponse() {
    const response = await fetch('https://api.example.com/data');
    
    // JSON data
    const jsonData = await response.json();
    
    // Plain text
    const textData = await response.text();
    
    // Binary data
    const blobData = await response.blob();
    
    // Form data
    const formData = await response.formData();
    
    // Array buffer
    const arrayBuffer = await response.arrayBuffer();
}
```

## HTTP Methods and Request Configuration

### GET Requests with Parameters

```javascript
// URL parameters
const baseUrl = 'https://api.example.com/users';
const params = new URLSearchParams({
    page: 1,
    limit: 10,
    sort: 'name',
    filter: 'active'
});

const url = `${baseUrl}?${params.toString()}`;
// Results in: https://api.example.com/users?page=1&limit=10&sort=name&filter=active

async function fetchUsersWithParams(page = 1, limit = 10) {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });
    
    const response = await fetch(`https://api.example.com/users?${params}`);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Helper function for building URLs
function buildApiUrl(baseUrl, endpoint, params = {}) {
    const url = new URL(endpoint, baseUrl);
    Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
            url.searchParams.append(key, params[key]);
        }
    });
    return url.toString();
}

const apiUrl = buildApiUrl(
    'https://api.example.com',
    '/users',
    { page: 1, limit: 20, active: true }
);
```

### POST Requests

```javascript
// Basic POST with JSON data
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
}

// Usage
const newUser = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
};

createUser(newUser)
    .then(createdUser => console.log('User created:', createdUser))
    .catch(error => console.error('Failed to create user:', error));

// POST with form data
async function uploadFile(file, additionalData = {}) {
    const formData = new FormData();
    formData.append('file', file);
    
    // Add additional fields
    Object.keys(additionalData).forEach(key => {
        formData.append(key, additionalData[key]);
    });
    
    const response = await fetch('https://api.example.com/upload', {
        method: 'POST',
        body: formData // Don't set Content-Type header, let browser set it
    });
    
    if (!response.ok) {
        throw new Error(`Upload failed! status: ${response.status}`);
    }
    
    return await response.json();
}

// POST with URL-encoded data
async function submitForm(formData) {
    const params = new URLSearchParams();
    Object.keys(formData).forEach(key => {
        params.append(key, formData[key]);
    });
    
    const response = await fetch('https://api.example.com/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params
    });
    
    return await response.json();
}
```

### PUT, PATCH, and DELETE Requests

```javascript
// PUT - Complete resource replacement
async function updateUser(userId, userData) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error(`Update failed! status: ${response.status}`);
    }
    
    return await response.json();
}

// PATCH - Partial resource update
async function patchUser(userId, updates) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
        throw new Error(`Patch failed! status: ${response.status}`);
    }
    
    return await response.json();
}

// DELETE
async function deleteUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'DELETE'
    });
    
    if (!response.ok) {
        throw new Error(`Delete failed! status: ${response.status}`);
    }
    
    // Some APIs return 204 No Content for successful deletes
    return response.status === 204 ? null : await response.json();
}
```

## Headers and Authentication

### Working with Headers

```javascript
// Reading response headers
async function examineHeaders() {
    const response = await fetch('https://api.example.com/users');
    
    // Get specific header
    const contentType = response.headers.get('content-type');
    const rateLimit = response.headers.get('x-rate-limit-remaining');
    
    // Check if header exists
    const hasAuth = response.headers.has('authorization');
    
    // Iterate through all headers
    for (const [name, value] of response.headers) {
        console.log(`${name}: ${value}`);
    }
    
    // Convert headers to object
    const headerObj = Object.fromEntries(response.headers.entries());
    console.log(headerObj);
}

// Setting request headers
async function fetchWithHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('User-Agent', 'MyApp/1.0');
    headers.append('X-Custom-Header', 'custom-value');
    
    const response = await fetch('https://api.example.com/users', {
        headers: headers
    });
    
    return await response.json();
}

// Alternative header syntax
async function fetchWithHeadersObject() {
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'MyApp/1.0'
        }
    });
    
    return await response.json();
}
```

### Authentication Methods

```javascript
// API Key authentication
async function fetchWithApiKey(apiKey) {
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'X-API-Key': apiKey,
            'Accept': 'application/json'
        }
    });
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
}

// Bearer token authentication
async function fetchWithBearerToken(token) {
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
        }
    });
    
    if (response.status === 401) {
        throw new Error('Authentication failed - invalid token');
    }
    
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    return await response.json();
}

// Basic authentication
async function fetchWithBasicAuth(username, password) {
    const credentials = btoa(`${username}:${password}`);
    
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'Authorization': `Basic ${credentials}`,
            'Accept': 'application/json'
        }
    });
    
    return await response.json();
}

// Custom authentication header
async function fetchWithCustomAuth(sessionId) {
    const response = await fetch('https://api.example.com/users', {
        headers: {
            'X-Session-ID': sessionId,
            'Accept': 'application/json'
        }
    });
    
    return await response.json();
}
```

## Request Configuration Options

### Advanced Fetch Options

```javascript
// Complete fetch configuration
async function advancedFetch() {
    const controller = new AbortController();
    
    // Abort request after 5 seconds
    setTimeout(() => controller.abort(), 5000);
    
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache'
            },
            mode: 'cors',        // cors, no-cors, same-origin
            credentials: 'same-origin', // omit, same-origin, include
            cache: 'default',    // default, no-cache, reload, force-cache, only-if-cached
            redirect: 'follow',  // follow, error, manual
            referrerPolicy: 'no-referrer-when-downgrade',
            signal: controller.signal
        });
        
        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
        } else {
            console.error('Request failed:', error);
        }
        throw error;
    }
}

// Request with timeout using AbortController
function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    return fetch(url, {
        ...options,
        signal: controller.signal
    }).finally(() => {
        clearTimeout(id);
    });
}

// Usage
fetchWithTimeout('https://api.example.com/slow-endpoint', {}, 3000)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
        if (error.name === 'AbortError') {
            console.log('Request timed out');
        } else {
            console.error('Request failed:', error);
        }
    });
```

### CORS and Cross-Origin Requests

```javascript
// Handling CORS
async function fetchCorsData() {
    try {
        const response = await fetch('https://api.external.com/data', {
            mode: 'cors',
            credentials: 'include', // Include cookies in cross-origin requests
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`CORS request failed: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        if (error.message.includes('CORS')) {
            console.error('CORS policy violation - check server configuration');
        }
        throw error;
    }
}

// Fallback for CORS issues using JSONP (for GET requests only)
function jsonpFetch(url, callbackParam = 'callback') {
    return new Promise((resolve, reject) => {
        const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        const script = document.createElement('script');
        
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            resolve(data);
        };
        
        script.onerror = function() {
            delete window[callbackName];
            document.body.removeChild(script);
            reject(new Error('JSONP request failed'));
        };
        
        const separator = url.includes('?') ? '&' : '?';
        script.src = `${url}${separator}${callbackParam}=${callbackName}`;
        document.body.appendChild(script);
    });
}
```

## Error Handling and Response Validation

### Comprehensive Error Handling

```javascript
// Custom error classes
class HttpError extends Error {
    constructor(response) {
        super(`HTTP Error: ${response.status} ${response.statusText}`);
        this.name = 'HttpError';
        this.response = response;
        this.status = response.status;
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NetworkError';
    }
}

// Enhanced fetch with error handling
async function robustFetch(url, options = {}) {
    try {
        const response = await fetch(url, options);
        
        // Check if response is ok (status 200-299)
        if (!response.ok) {
            throw new HttpError(response);
        }
        
        return response;
    } catch (error) {
        // Network errors, CORS errors, etc.
        if (error instanceof TypeError) {
            throw new NetworkError('Network request failed - check connection');
        }
        
        // AbortError
        if (error.name === 'AbortError') {
            throw new Error('Request was cancelled');
        }
        
        // Re-throw other errors
        throw error;
    }
}

// API client with built-in error handling
class ApiClient {
    constructor(baseUrl, defaultOptions = {}) {
        this.baseUrl = baseUrl;
        this.defaultOptions = defaultOptions;
    }
    
    async request(endpoint, options = {}) {
        const url = new URL(endpoint, this.baseUrl).toString();
        const config = { ...this.defaultOptions, ...options };
        
        try {
            const response = await robustFetch(url, config);
            
            // Handle different content types
            const contentType = response.headers.get('content-type');
            
            if (contentType?.includes('application/json')) {
                return await response.json();
            } else if (contentType?.includes('text/')) {
                return await response.text();
            } else {
                return await response.blob();
            }
        } catch (error) {
            // Add context to error
            error.url = url;
            error.options = config;
            throw error;
        }
    }
    
    async get(endpoint, params = {}) {
        const url = new URL(endpoint, this.baseUrl);
        Object.keys(params).forEach(key => {
            url.searchParams.append(key, params[key]);
        });
        
        return this.request(url.pathname + url.search);
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data) {
        return this.request(endpoint, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
}

// Usage example
const api = new ApiClient('https://api.example.com', {
    headers: {
        'Authorization': 'Bearer your-token-here',
        'Accept': 'application/json'
    }
});

try {
    const users = await api.get('/users', { page: 1, limit: 10 });
    const newUser = await api.post('/users', { name: 'John', email: 'john@example.com' });
    await api.delete(`/users/${newUser.id}`);
} catch (error) {
    if (error instanceof HttpError) {
        console.error(`HTTP Error ${error.status}:`, error.message);
    } else if (error instanceof NetworkError) {
        console.error('Network Error:', error.message);
    } else {
        console.error('Unexpected Error:', error.message);
    }
}
```

### Response Validation

```javascript
// Response schema validation
function validateUserResponse(data) {
    const requiredFields = ['id', 'name', 'email'];
    const errors = [];
    
    if (!data || typeof data !== 'object') {
        throw new Error('Response must be an object');
    }
    
    requiredFields.forEach(field => {
        if (!(field in data)) {
            errors.push(`Missing required field: ${field}`);
        }
    });
    
    if (data.email && !isValidEmail(data.email)) {
        errors.push('Invalid email format');
    }
    
    if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return data;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Usage with validation
async function fetchAndValidateUser(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);
        
        if (!response.ok) {
            throw new HttpError(response);
        }
        
        const userData = await response.json();
        return validateUserResponse(userData);
    } catch (error) {
        console.error('Failed to fetch and validate user:', error.message);
        throw error;
    }
}
```

## Real-World Examples

### Building a Complete API Service

```javascript
class UserService {
    constructor(apiKey) {
        this.baseUrl = 'https://api.example.com';
        this.apiKey = apiKey;
        this.defaultHeaders = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-API-Key': apiKey
        };
    }
    
    async getAllUsers(page = 1, limit = 10) {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString()
        });
        
        const response = await fetch(
            `${this.baseUrl}/users?${params}`,
            { headers: this.defaultHeaders }
        );
        
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    async getUserById(id) {
        const response = await fetch(
            `${this.baseUrl}/users/${id}`,
            { headers: this.defaultHeaders }
        );
        
        if (response.status === 404) {
            return null; // User not found
        }
        
        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    async createUser(userData) {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: this.defaultHeaders,
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to create user');
        }
        
        return await response.json();
    }
    
    async updateUser(id, updates) {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PATCH',
            headers: this.defaultHeaders,
            body: JSON.stringify(updates)
        });
        
        if (!response.ok) {
            throw new Error(`Failed to update user: ${response.statusText}`);
        }
        
        return await response.json();
    }
    
    async deleteUser(id) {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'DELETE',
            headers: this.defaultHeaders
        });
        
        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.statusText}`);
        }
        
        return response.status === 204;
    }
    
    async searchUsers(query) {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(
            `${this.baseUrl}/users/search?${params}`,
            { headers: this.defaultHeaders }
        );
        
        if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
        }
        
        return await response.json();
    }
}

// Usage example
async function demonstrateUserService() {
    const userService = new UserService('your-api-key');
    
    try {
        // Fetch all users
        const users = await userService.getAllUsers(1, 5);
        console.log('Users:', users);
        
        // Create a new user
        const newUser = await userService.createUser({
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: 'user'
        });
        console.log('Created user:', newUser);
        
        // Update the user
        const updatedUser = await userService.updateUser(newUser.id, {
            role: 'admin'
        });
        console.log('Updated user:', updatedUser);
        
        // Search for users
        const searchResults = await userService.searchUsers('jane');
        console.log('Search results:', searchResults);
        
        // Delete the user
        const deleted = await userService.deleteUser(newUser.id);
        console.log('User deleted:', deleted);
        
    } catch (error) {
        console.error('Error:', error.message);
    }
}

demonstrateUserService();
```

## Summary and Best Practices

### Key Takeaways

1. **Always handle errors**: Use try/catch blocks and check response.ok
2. **Use async/await**: More readable than promise chains
3. **Validate responses**: Check data structure and required fields
4. **Handle timeouts**: Use AbortController for request cancellation
5. **Set appropriate headers**: Content-Type, Accept, Authorization
6. **Use URL and URLSearchParams**: For safe URL construction
7. **Consider CORS**: Understand cross-origin request limitations

### Performance Best Practices

```javascript
// Cache responses when appropriate
const cache = new Map();

async function cachedFetch(url, ttl = 300000) { // 5 minutes TTL
    const cached = cache.get(url);
    
    if (cached && Date.now() - cached.timestamp < ttl) {
        return cached.data;
    }
    
    const data = await fetch(url).then(r => r.json());
    cache.set(url, { data, timestamp: Date.now() });
    
    return data;
}

// Implement request deduplication
const pendingRequests = new Map();

async function deduplicatedFetch(url) {
    if (pendingRequests.has(url)) {
        return pendingRequests.get(url);
    }
    
    const promise = fetch(url).then(r => r.json());
    pendingRequests.set(url, promise);
    
    try {
        const result = await promise;
        return result;
    } finally {
        pendingRequests.delete(url);
    }
}
```

The Fetch API is a powerful tool for modern web development. Master these patterns and you'll be able to build robust, efficient applications that communicate effectively with APIs and handle various network scenarios gracefully.
