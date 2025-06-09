# API Fundamentals & HTTP Protocol

## What are APIs?

An **Application Programming Interface (API)** is a set of protocols, routines, and tools that allows different software applications to communicate with each other. In web development, APIs typically refer to web APIs that enable communication between a client (like a web browser) and a server over HTTP.

### Types of APIs

```javascript
// RESTful API - Resource-based URLs
GET    /api/users          // Get all users
GET    /api/users/123      // Get user with ID 123
POST   /api/users          // Create a new user
PUT    /api/users/123      // Update user 123 (complete replacement)
PATCH  /api/users/123      // Partial update of user 123
DELETE /api/users/123      // Delete user 123

// GraphQL API - Query-based
const query = `
  query GetUser($id: ID!) {
    user(id: $id) {
      name
      email
      posts {
        title
        createdAt
      }
    }
  }
`;

// SOAP API - XML-based (legacy)
const soapRequest = `
  <soap:Envelope>
    <soap:Body>
      <GetUser>
        <UserId>123</UserId>
      </GetUser>
    </soap:Body>
  </soap:Envelope>
`;
```

## HTTP Protocol Fundamentals

### HTTP Methods

```javascript
// HTTP methods and their purposes
const httpMethods = {
    GET: {
        purpose: 'Retrieve data',
        idempotent: true,
        safe: true,
        cacheable: true,
        example: 'GET /api/users/123'
    },
    POST: {
        purpose: 'Create new resource',
        idempotent: false,
        safe: false,
        cacheable: false,
        example: 'POST /api/users'
    },
    PUT: {
        purpose: 'Update/replace entire resource',
        idempotent: true,
        safe: false,
        cacheable: false,
        example: 'PUT /api/users/123'
    },
    PATCH: {
        purpose: 'Partial update of resource',
        idempotent: false,
        safe: false,
        cacheable: false,
        example: 'PATCH /api/users/123'
    },
    DELETE: {
        purpose: 'Remove resource',
        idempotent: true,
        safe: false,
        cacheable: false,
        example: 'DELETE /api/users/123'
    },
    HEAD: {
        purpose: 'Get headers only (no body)',
        idempotent: true,
        safe: true,
        cacheable: true,
        example: 'HEAD /api/users/123'
    },
    OPTIONS: {
        purpose: 'Get allowed methods for resource',
        idempotent: true,
        safe: true,
        cacheable: false,
        example: 'OPTIONS /api/users'
    }
};

// Practical examples of HTTP methods
class UserAPI {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    // GET - Retrieve data
    async getUsers(page = 1, limit = 10) {
        const url = `${this.baseUrl}/users?page=${page}&limit=${limit}`;
        const response = await fetch(url);
        return response.json();
    }

    // POST - Create new resource
    async createUser(userData) {
        const response = await fetch(`${this.baseUrl}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    // PUT - Complete replacement
    async replaceUser(id, userData) {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }

    // PATCH - Partial update
    async updateUser(id, updates) {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        return response.json();
    }

    // DELETE - Remove resource
    async deleteUser(id) {
        const response = await fetch(`${this.baseUrl}/users/${id}`, {
            method: 'DELETE'
        });
        return response.ok;
    }
}
```

### HTTP Status Codes

```javascript
// Comprehensive status code handling
class HttpStatusHandler {
    static handle(response) {
        const { status, statusText } = response;

        // 1xx Informational
        if (status >= 100 && status < 200) {
            console.log(`Informational: ${status} ${statusText}`);
            return 'continue';
        }

        // 2xx Success
        if (status >= 200 && status < 300) {
            switch (status) {
                case 200: return 'ok';           // OK - Standard success
                case 201: return 'created';      // Created - Resource created
                case 202: return 'accepted';     // Accepted - Request accepted
                case 204: return 'no-content';   // No Content - Success, no body
                default: return 'success';
            }
        }

        // 3xx Redirection
        if (status >= 300 && status < 400) {
            switch (status) {
                case 301: throw new Error('Moved Permanently');
                case 302: throw new Error('Found (Temporary Redirect)');
                case 304: return 'not-modified'; // Not Modified - Use cache
                case 307: throw new Error('Temporary Redirect');
                case 308: throw new Error('Permanent Redirect');
                default: throw new Error(`Redirection: ${status} ${statusText}`);
            }
        }

        // 4xx Client Errors
        if (status >= 400 && status < 500) {
            switch (status) {
                case 400: throw new Error('Bad Request - Invalid syntax');
                case 401: throw new Error('Unauthorized - Authentication required');
                case 403: throw new Error('Forbidden - Access denied');
                case 404: throw new Error('Not Found - Resource does not exist');
                case 405: throw new Error('Method Not Allowed');
                case 409: throw new Error('Conflict - Resource conflict');
                case 422: throw new Error('Unprocessable Entity - Validation failed');
                case 429: throw new Error('Too Many Requests - Rate limited');
                default: throw new Error(`Client Error: ${status} ${statusText}`);
            }
        }

        // 5xx Server Errors
        if (status >= 500) {
            switch (status) {
                case 500: throw new Error('Internal Server Error');
                case 501: throw new Error('Not Implemented');
                case 502: throw new Error('Bad Gateway');
                case 503: throw new Error('Service Unavailable');
                case 504: throw new Error('Gateway Timeout');
                default: throw new Error(`Server Error: ${status} ${statusText}`);
            }
        }
    }
}

// Usage in API calls
async function robustApiCall(url, options = {}) {
    try {
        const response = await fetch(url, options);
        const result = HttpStatusHandler.handle(response);
        
        if (result === 'no-content') {
            return null;
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error.message);
        throw error;
    }
}
```

### HTTP Headers

```javascript
// Understanding and working with HTTP headers
class HeaderManager {
    constructor() {
        this.defaultHeaders = new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'User-Agent': 'MyApp/1.0.0'
        });
    }

    // Common request headers
    getRequestHeaders(options = {}) {
        const headers = new Headers(this.defaultHeaders);
        
        // Authentication
        if (options.token) {
            headers.set('Authorization', `Bearer ${options.token}`);
        }
        
        if (options.apiKey) {
            headers.set('X-API-Key', options.apiKey);
        }

        // Caching
        if (options.noCache) {
            headers.set('Cache-Control', 'no-cache');
            headers.set('Pragma', 'no-cache');
        }

        // Custom headers
        if (options.customHeaders) {
            Object.entries(options.customHeaders).forEach(([key, value]) => {
                headers.set(key, value);
            });
        }

        return headers;
    }

    // Parse response headers
    parseResponseHeaders(response) {
        const headerInfo = {
            contentType: response.headers.get('content-type'),
            contentLength: response.headers.get('content-length'),
            lastModified: response.headers.get('last-modified'),
            etag: response.headers.get('etag'),
            cacheControl: response.headers.get('cache-control'),
            rateLimit: {
                limit: response.headers.get('x-ratelimit-limit'),
                remaining: response.headers.get('x-ratelimit-remaining'),
                reset: response.headers.get('x-ratelimit-reset')
            },
            corsHeaders: {
                allowOrigin: response.headers.get('access-control-allow-origin'),
                allowMethods: response.headers.get('access-control-allow-methods'),
                allowHeaders: response.headers.get('access-control-allow-headers')
            }
        };

        // Convert timestamps
        if (headerInfo.lastModified) {
            headerInfo.lastModifiedDate = new Date(headerInfo.lastModified);
        }

        if (headerInfo.rateLimit.reset) {
            headerInfo.rateLimit.resetDate = new Date(
                parseInt(headerInfo.rateLimit.reset) * 1000
            );
        }

        return headerInfo;
    }
}

// Practical header usage
async function apiCallWithHeaders(url, data, options = {}) {
    const headerManager = new HeaderManager();
    const headers = headerManager.getRequestHeaders(options);

    const response = await fetch(url, {
        method: data ? 'POST' : 'GET',
        headers,
        body: data ? JSON.stringify(data) : undefined
    });

    const headerInfo = headerManager.parseResponseHeaders(response);
    console.log('Response headers:', headerInfo);

    // Handle rate limiting
    if (headerInfo.rateLimit.remaining === '0') {
        const resetTime = headerInfo.rateLimit.resetDate;
        console.warn(`Rate limit exceeded. Resets at: ${resetTime}`);
    }

    return response.json();
}
```

## REST API Design Principles

### RESTful Resource Design

```javascript
// RESTful URL structure examples
const restfulUrls = {
    // Resources (nouns, not verbs)
    users: '/api/users',                    // Collection
    user: '/api/users/123',                 // Individual resource
    userPosts: '/api/users/123/posts',      // Nested collection
    userPost: '/api/users/123/posts/456',   // Nested resource

    // Query parameters for filtering, sorting, pagination
    filteredUsers: '/api/users?role=admin&active=true',
    sortedUsers: '/api/users?sort=name&order=asc',
    paginatedUsers: '/api/users?page=2&limit=20',
    
    // Version your APIs
    v1: '/api/v1/users',
    v2: '/api/v2/users',

    // Bad examples (avoid these)
    badUrls: {
        verbs: '/api/getUsers',             // Don't use verbs
        actions: '/api/users/deleteAll',    // Use HTTP methods instead
        mixed: '/api/user/123'              // Be consistent with plural/singular
    }
};

// RESTful API client implementation
class RestfulClient {
    constructor(baseUrl, version = 'v1') {
        this.baseUrl = `${baseUrl}/api/${version}`;
    }

    // Generic CRUD operations
    async getCollection(resource, params = {}) {
        const url = new URL(`${this.baseUrl}/${resource}`);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch ${resource}`);
        return response.json();
    }

    async getResource(resource, id) {
        const response = await fetch(`${this.baseUrl}/${resource}/${id}`);
        if (response.status === 404) return null;
        if (!response.ok) throw new Error(`Failed to fetch ${resource}/${id}`);
        return response.json();
    }

    async createResource(resource, data) {
        const response = await fetch(`${this.baseUrl}/${resource}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Failed to create ${resource}`);
        return response.json();
    }

    async updateResource(resource, id, data) {
        const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Failed to update ${resource}/${id}`);
        return response.json();
    }

    async patchResource(resource, id, data) {
        const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error(`Failed to patch ${resource}/${id}`);
        return response.json();
    }

    async deleteResource(resource, id) {
        const response = await fetch(`${this.baseUrl}/${resource}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error(`Failed to delete ${resource}/${id}`);
        return response.status === 204;
    }

    // Nested resource operations
    async getNestedCollection(parentResource, parentId, childResource, params = {}) {
        const url = new URL(`${this.baseUrl}/${parentResource}/${parentId}/${childResource}`);
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });

        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch nested ${childResource}`);
        return response.json();
    }

    async createNestedResource(parentResource, parentId, childResource, data) {
        const response = await fetch(
            `${this.baseUrl}/${parentResource}/${parentId}/${childResource}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }
        );
        if (!response.ok) throw new Error(`Failed to create nested ${childResource}`);
        return response.json();
    }
}

// Usage examples
async function demonstrateRestfulClient() {
    const api = new RestfulClient('https://api.example.com');

    try {
        // Get all users with pagination
        const users = await api.getCollection('users', {
            page: 1,
            limit: 10,
            sort: 'name'
        });

        // Get specific user
        const user = await api.getResource('users', 123);

        // Create new user
        const newUser = await api.createResource('users', {
            name: 'John Doe',
            email: 'john@example.com'
        });

        // Update user
        const updatedUser = await api.updateResource('users', newUser.id, {
            name: 'John Smith',
            email: 'john.smith@example.com'
        });

        // Partial update
        await api.patchResource('users', newUser.id, {
            lastLoginAt: new Date().toISOString()
        });

        // Get user's posts
        const userPosts = await api.getNestedCollection('users', newUser.id, 'posts');

        // Create new post for user
        const newPost = await api.createNestedResource('users', newUser.id, 'posts', {
            title: 'My First Post',
            content: 'Hello, world!'
        });

        // Delete user
        await api.deleteResource('users', newUser.id);

    } catch (error) {
        console.error('API operation failed:', error.message);
    }
}
```

## CORS and Security Considerations

### Understanding CORS

```javascript
// CORS (Cross-Origin Resource Sharing) handling
class CorsAwareClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async makeRequest(url, options = {}) {
        try {
            // Set CORS mode explicitly
            const response = await fetch(url, {
                ...options,
                mode: 'cors', // Enable CORS
                credentials: 'same-origin', // or 'include' for cross-origin cookies
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    ...options.headers
                }
            });

            return response;
        } catch (error) {
            if (error.message.includes('CORS')) {
                console.error('CORS error - check server configuration:', error);
                throw new Error('Cross-origin request blocked by CORS policy');
            }
            throw error;
        }
    }

    // Preflight request handling for complex requests
    async checkPreflightSupport(url) {
        try {
            const response = await fetch(url, {
                method: 'OPTIONS',
                headers: {
                    'Access-Control-Request-Method': 'POST',
                    'Access-Control-Request-Headers': 'Content-Type, Authorization'
                }
            });

            const allowedMethods = response.headers.get('Access-Control-Allow-Methods');
            const allowedHeaders = response.headers.get('Access-Control-Allow-Headers');
            const maxAge = response.headers.get('Access-Control-Max-Age');

            return {
                supported: response.ok,
                allowedMethods: allowedMethods?.split(', ') || [],
                allowedHeaders: allowedHeaders?.split(', ') || [],
                maxAge: maxAge ? parseInt(maxAge) : 0
            };
        } catch (error) {
            return { supported: false, error: error.message };
        }
    }
}

// Security best practices
class SecureApiClient {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.apiKey = options.apiKey;
        this.csrfToken = options.csrfToken;
    }

    // Secure request with CSRF protection
    async secureRequest(endpoint, options = {}) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add API key if available
        if (this.apiKey) {
            headers['X-API-Key'] = this.apiKey;
        }

        // Add CSRF token for state-changing operations
        if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(options.method)) {
            if (this.csrfToken) {
                headers['X-CSRF-Token'] = this.csrfToken;
            }
        }

        // Validate HTTPS for sensitive operations
        if (options.requireHttps && !this.baseUrl.startsWith('https://')) {
            throw new Error('HTTPS required for this operation');
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
            credentials: 'same-origin' // Prevent credential leakage
        });

        return response;
    }

    // Input sanitization
    sanitizeInput(data) {
        if (typeof data === 'string') {
            return data
                .replace(/[<>]/g, '') // Remove potential HTML tags
                .trim()
                .substring(0, 1000); // Limit length
        }

        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            Object.keys(data).forEach(key => {
                sanitized[key] = this.sanitizeInput(data[key]);
            });
            return sanitized;
        }

        return data;
    }

    async createResource(endpoint, data, options = {}) {
        const sanitizedData = this.sanitizeInput(data);
        
        return this.secureRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(sanitizedData),
            requireHttps: true,
            ...options
        });
    }
}
```

## API Documentation and Testing

### Self-Documenting API Client

```javascript
// API client with built-in documentation
class DocumentedApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.endpoints = new Map();
    }

    // Register endpoint documentation
    registerEndpoint(name, config) {
        this.endpoints.set(name, {
            ...config,
            usage: config.usage || `await api.${name}(${config.parameters?.join(', ') || ''})`
        });
    }

    // Get documentation for all endpoints
    getDocumentation() {
        const docs = [];
        this.endpoints.forEach((config, name) => {
            docs.push({
                name,
                method: config.method,
                path: config.path,
                description: config.description,
                parameters: config.parameters || [],
                example: config.usage,
                returnType: config.returnType || 'Promise<any>'
            });
        });
        return docs;
    }

    // Dynamic method creation with documentation
    createMethod(name, config) {
        this.registerEndpoint(name, config);
        
        this[name] = async (...args) => {
            const url = this.baseUrl + this.interpolatePath(config.path, args);
            const options = this.buildOptions(config, args);
            
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error(`${name} failed: ${response.statusText}`);
            }
            
            return config.returnJson !== false ? response.json() : response;
        };
    }

    interpolatePath(path, args) {
        return path.replace(/:(\w+)/g, (match, param) => {
            const index = parseInt(param) || 0;
            return args[index] || match;
        });
    }

    buildOptions(config, args) {
        const options = {
            method: config.method || 'GET',
            headers: { 'Accept': 'application/json' }
        };

        if (config.body && args[config.bodyIndex || -1]) {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(args[config.bodyIndex || -1]);
        }

        return options;
    }
}

// Usage: Creating a documented API client
const api = new DocumentedApiClient('https://api.example.com');

// Register API methods with documentation
api.createMethod('getUsers', {
    method: 'GET',
    path: '/users',
    description: 'Retrieve all users',
    parameters: [],
    returnType: 'Promise<User[]>'
});

api.createMethod('getUser', {
    method: 'GET',
    path: '/users/:0',
    description: 'Retrieve a specific user by ID',
    parameters: ['userId'],
    returnType: 'Promise<User>'
});

api.createMethod('createUser', {
    method: 'POST',
    path: '/users',
    description: 'Create a new user',
    parameters: ['userData'],
    body: true,
    bodyIndex: 0,
    returnType: 'Promise<User>'
});

// Generate documentation
console.table(api.getDocumentation());

// Use the API
async function testApi() {
    try {
        const users = await api.getUsers();
        const user = await api.getUser(123);
        const newUser = await api.createUser({ name: 'John', email: 'john@example.com' });
    } catch (error) {
        console.error('API test failed:', error.message);
    }
}
```

This comprehensive introduction to APIs provides the foundation for understanding HTTP protocols, RESTful design principles, security considerations, and practical implementation patterns. The next lessons will build upon these concepts to cover more advanced topics like promises, async/await, and error handling.
