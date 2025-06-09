# Fetch API & Modern HTTP Clients

## Introduction to Fetch API

The Fetch API provides a modern, promise-based interface for making HTTP requests. It offers more flexibility and power than XMLHttpRequest, with better error handling, request/response customization, and streaming capabilities.

### Basic Fetch Operations

```javascript
// Simple GET request
async function basicFetch() {
    try {
        const response = await fetch('https://api.example.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Users:', data);
        return data;
    } catch (error) {
        console.error('Fetch failed:', error.message);
        throw error;
    }
}

// POST request with JSON data
async function createUser(userData) {
    try {
        const response = await fetch('https://api.example.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(`Failed to create user: ${errorData.message || response.statusText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('User creation failed:', error.message);
        throw error;
    }
}

// PUT request for complete replacement
async function updateUser(userId, userData) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
        throw new Error(`Update failed: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
}

// PATCH request for partial updates
async function patchUser(userId, updates) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
        throw new Error(`Patch failed: ${response.status}`);
    }
    
    return response.json();
}

// DELETE request
async function deleteUser(userId) {
    const response = await fetch(`https://api.example.com/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${getAuthToken()}`
        }
    });
    
    if (!response.ok) {
        throw new Error(`Delete failed: ${response.status}`);
    }
    
    // Some APIs return 204 No Content for successful deletes
    return response.status === 204 || response.status === 200;
}

function getAuthToken() {
    return localStorage.getItem('authToken') || '';
}
```

### Advanced Fetch Configuration

```javascript
// Comprehensive fetch wrapper with advanced options
class FetchClient {
    constructor(options = {}) {
        this.baseURL = options.baseURL || '';
        this.defaultTimeout = options.timeout || 10000;
        this.defaultHeaders = options.headers || {};
        this.retries = options.retries || 0;
        this.retryDelay = options.retryDelay || 1000;
    }
    
    async request(url, options = {}) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 
            options.timeout || this.defaultTimeout
        );
        
        const fullUrl = url.startsWith('http') ? url : `${this.baseURL}${url}`;
        
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            },
            signal: controller.signal
        };
        
        try {
            let lastError;
            
            for (let attempt = 0; attempt <= this.retries; attempt++) {
                try {
                    const response = await fetch(fullUrl, config);
                    clearTimeout(timeoutId);
                    
                    await this.validateResponse(response);
                    return response;
                } catch (error) {
                    lastError = error;
                    
                    if (attempt < this.retries && this.shouldRetry(error)) {
                        console.log(`Attempt ${attempt + 1} failed, retrying in ${this.retryDelay}ms...`);
                        await this.delay(this.retryDelay * Math.pow(2, attempt));
                        continue;
                    }
                    
                    throw error;
                }
            }
            
            throw lastError;
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error(`Request timeout after ${options.timeout || this.defaultTimeout}ms`);
            }
            
            throw error;
        }
    }
    
    async validateResponse(response) {
        if (!response.ok) {
            let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
            
            try {
                const errorData = await response.clone().json();
                errorMessage = errorData.message || errorData.error || errorMessage;
            } catch {
                // Response is not JSON, use status text
            }
            
            const error = new Error(errorMessage);
            error.status = response.status;
            error.response = response;
            throw error;
        }
    }
    
    shouldRetry(error) {
        // Retry on network errors or specific HTTP status codes
        return error.name === 'TypeError' || // Network error
               error.status >= 500 ||        // Server errors
               error.status === 429;         // Rate limited
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async get(url, options = {}) {
        const response = await this.request(url, { ...options, method: 'GET' });
        return this.parseResponse(response);
    }
    
    async post(url, data, options = {}) {
        const response = await this.request(url, {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
        return this.parseResponse(response);
    }
    
    async put(url, data, options = {}) {
        const response = await this.request(url, {
            ...options,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
        return this.parseResponse(response);
    }
    
    async patch(url, data, options = {}) {
        const response = await this.request(url, {
            ...options,
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data)
        });
        return this.parseResponse(response);
    }
    
    async delete(url, options = {}) {
        const response = await this.request(url, { ...options, method: 'DELETE' });
        
        // Handle different response types for DELETE
        if (response.status === 204) {
            return true; // No content
        }
        
        return this.parseResponse(response);
    }
    
    async parseResponse(response) {
        const contentType = response.headers.get('content-type');
        
        if (contentType?.includes('application/json')) {
            return response.json();
        } else if (contentType?.includes('text/')) {
            return response.text();
        } else if (contentType?.includes('application/octet-stream')) {
            return response.blob();
        } else {
            return response.arrayBuffer();
        }
    }
}

// Usage example
const apiClient = new FetchClient({
    baseURL: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    retryDelay: 1000,
    headers: {
        'Accept': 'application/json',
        'User-Agent': 'MyApp/1.0.0'
    }
});

// Simple usage
const users = await apiClient.get('/users');
const newUser = await apiClient.post('/users', { name: 'John', email: 'john@example.com' });
```

### Request and Response Interceptors

```javascript
// HTTP client with interceptor support
class InterceptorClient extends FetchClient {
    constructor(options = {}) {
        super(options);
        this.requestInterceptors = [];
        this.responseInterceptors = [];
    }
    
    // Add request interceptor
    addRequestInterceptor(interceptor) {
        this.requestInterceptors.push(interceptor);
        
        // Return function to remove interceptor
        return () => {
            const index = this.requestInterceptors.indexOf(interceptor);
            if (index !== -1) {
                this.requestInterceptors.splice(index, 1);
            }
        };
    }
    
    // Add response interceptor
    addResponseInterceptor(interceptor) {
        this.responseInterceptors.push(interceptor);
        
        return () => {
            const index = this.responseInterceptors.indexOf(interceptor);
            if (index !== -1) {
                this.responseInterceptors.splice(index, 1);
            }
        };
    }
    
    async request(url, options = {}) {
        let requestConfig = { url, ...options };
        
        // Apply request interceptors
        for (const interceptor of this.requestInterceptors) {
            try {
                requestConfig = await interceptor(requestConfig);
            } catch (error) {
                console.error('Request interceptor error:', error);
                throw error;
            }
        }
        
        try {
            let response = await super.request(requestConfig.url, requestConfig);
            
            // Apply response interceptors
            for (const interceptor of this.responseInterceptors) {
                try {
                    response = await interceptor(response, requestConfig);
                } catch (error) {
                    console.error('Response interceptor error:', error);
                    throw error;
                }
            }
            
            return response;
        } catch (error) {
            // Apply error interceptors
            for (const interceptor of this.responseInterceptors) {
                if (interceptor.onError) {
                    try {
                        await interceptor.onError(error, requestConfig);
                    } catch (interceptorError) {
                        console.error('Error interceptor failed:', interceptorError);
                    }
                }
            }
            throw error;
        }
    }
}

// Common interceptors
const authInterceptor = (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return config;
};

const loggingInterceptor = (config) => {
    console.log(`→ ${config.method || 'GET'} ${config.url}`);
    console.log('Request config:', config);
    return config;
};

const responseLoggingInterceptor = (response, request) => {
    console.log(`← ${response.status} ${request.method || 'GET'} ${request.url}`);
    return response;
};

const retryInterceptor = {
    onError: async (error, config) => {
        if (error.status === 401 && !config._retry) {
            config._retry = true;
            
            try {
                // Attempt to refresh token
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await fetch('/api/auth/refresh', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ refreshToken })
                });
                
                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('authToken', data.token);
                    
                    // Retry original request
                    config.headers['Authorization'] = `Bearer ${data.token}`;
                    return fetch(config.url, config);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('authToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        }
    }
};

// Setup client with interceptors
const client = new InterceptorClient({
    baseURL: 'https://api.example.com',
    timeout: 10000
});

client.addRequestInterceptor(authInterceptor);
client.addRequestInterceptor(loggingInterceptor);
client.addResponseInterceptor(responseLoggingInterceptor);
client.addResponseInterceptor(retryInterceptor);
```

### File Upload and Download

```javascript
// Advanced file upload with progress tracking
class FileUploadClient {
    constructor(endpoint, options = {}) {
        this.endpoint = endpoint;
        this.chunkSize = options.chunkSize || 1024 * 1024; // 1MB chunks
        this.maxRetries = options.maxRetries || 3;
        this.timeout = options.timeout || 30000;
    }
    
    // Simple file upload
    async uploadFile(file, onProgress, additionalData = {}) {
        const formData = new FormData();
        formData.append('file', file);
        
        // Add additional form fields
        Object.entries(additionalData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        
        return this.uploadWithProgress(formData, onProgress);
    }
    
    // Upload with XMLHttpRequest for progress tracking
    async uploadWithProgress(formData, onProgress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable && onProgress) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress({
                        loaded: event.loaded,
                        total: event.total,
                        percentage: Math.round(percentComplete)
                    });
                }
            });
            
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (error) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Upload failed: ${xhr.status} ${xhr.statusText}`));
                }
            });
            
            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed due to network error'));
            });
            
            xhr.addEventListener('timeout', () => {
                reject(new Error('Upload timeout'));
            });
            
            xhr.open('POST', this.endpoint);
            xhr.timeout = this.timeout;
            
            // Add authentication if available
            const token = localStorage.getItem('authToken');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }
            
            xhr.send(formData);
        });
    }
    
    // Chunked upload for large files
    async uploadLargeFile(file, onProgress, metadata = {}) {
        const totalChunks = Math.ceil(file.size / this.chunkSize);
        const uploadId = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        try {
            // Initialize upload session
            await this.initializeUpload(uploadId, {
                filename: file.name,
                fileSize: file.size,
                totalChunks,
                mimeType: file.type,
                ...metadata
            });
            
            // Upload chunks
            for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
                const start = chunkIndex * this.chunkSize;
                const end = Math.min(start + this.chunkSize, file.size);
                const chunk = file.slice(start, end);
                
                await this.uploadChunk(uploadId, chunkIndex, chunk);
                
                if (onProgress) {
                    onProgress({
                        uploaded: end,
                        total: file.size,
                        percentage: Math.round((end / file.size) * 100),
                        chunksCompleted: chunkIndex + 1,
                        totalChunks
                    });
                }
            }
            
            // Finalize upload
            return await this.finalizeUpload(uploadId);
        } catch (error) {
            // Cleanup on error
            await this.abortUpload(uploadId).catch(() => {});
            throw error;
        }
    }
    
    async initializeUpload(uploadId, metadata) {
        const response = await fetch(`${this.endpoint}/initialize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ uploadId, ...metadata })
        });
        
        if (!response.ok) {
            throw new Error(`Failed to initialize upload: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    async uploadChunk(uploadId, chunkIndex, chunk) {
        for (let attempt = 0; attempt < this.maxRetries; attempt++) {
            try {
                const formData = new FormData();
                formData.append('uploadId', uploadId);
                formData.append('chunkIndex', chunkIndex.toString());
                formData.append('chunk', chunk);
                
                const response = await fetch(`${this.endpoint}/chunk`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                if (response.ok) {
                    return response.json();
                }
                
                throw new Error(`Chunk upload failed: ${response.statusText}`);
            } catch (error) {
                if (attempt === this.maxRetries - 1) {
                    throw error;
                }
                
                // Exponential backoff
                await new Promise(resolve => 
                    setTimeout(resolve, 1000 * Math.pow(2, attempt))
                );
            }
        }
    }
    
    async finalizeUpload(uploadId) {
        const response = await fetch(`${this.endpoint}/finalize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({ uploadId })
        });
        
        if (!response.ok) {
            throw new Error(`Failed to finalize upload: ${response.statusText}`);
        }
        
        return response.json();
    }
    
    async abortUpload(uploadId) {
        try {
            await fetch(`${this.endpoint}/abort`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({ uploadId })
            });
        } catch (error) {
            console.warn('Failed to abort upload:', error);
        }
    }
}

// File download with progress
class FileDownloader {
    async downloadFile(url, filename, onProgress) {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }
        
        const contentLength = response.headers.get('content-length');
        const total = contentLength ? parseInt(contentLength, 10) : 0;
        
        if (!response.body) {
            throw new Error('ReadableStream not supported');
        }
        
        let loaded = 0;
        const chunks = [];
        const reader = response.body.getReader();
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                chunks.push(value);
                loaded += value.length;
                
                if (onProgress && total > 0) {
                    onProgress({
                        loaded,
                        total,
                        percentage: Math.round((loaded / total) * 100)
                    });
                }
            }
            
            const blob = new Blob(chunks);
            this.downloadBlob(blob, filename);
            
            return blob;
        } finally {
            reader.releaseLock();
        }
    }
    
    downloadBlob(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    // Resume download support
    async resumeDownload(url, filename, startByte = 0, onProgress) {
        const response = await fetch(url, {
            headers: {
                'Range': `bytes=${startByte}-`,
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            }
        });
        
        if (!response.ok && response.status !== 206) {
            throw new Error(`Resume download failed: ${response.status}`);
        }
        
        const contentRange = response.headers.get('content-range');
        const match = contentRange?.match(/bytes (\d+)-(\d+)\/(\d+)/);
        const total = match ? parseInt(match[3], 10) : 0;
        
        return this.downloadFile(response, filename, (progress) => {
            if (onProgress) {
                onProgress({
                    loaded: startByte + progress.loaded,
                    total: total || startByte + progress.total,
                    percentage: total ? Math.round(((startByte + progress.loaded) / total) * 100) : 0
                });
            }
        });
    }
}
```

### Streaming and Real-time Data

```javascript
// Server-Sent Events client
class SSEClient {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.eventSource = null;
        this.listeners = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = options.maxReconnectAttempts || 5;
        this.reconnectInterval = options.reconnectInterval || 3000;
        this.connected = false;
    }
    
    connect() {
        try {
            this.eventSource = new EventSource(this.url);
            this.setupEventHandlers();
        } catch (error) {
            console.error('Failed to create EventSource:', error);
            this.handleReconnect();
        }
    }
    
    setupEventHandlers() {
        this.eventSource.onopen = (event) => {
            console.log('SSE connection opened');
            this.connected = true;
            this.reconnectAttempts = 0;
            this.emit('connect', event);
        };
        
        this.eventSource.onmessage = (event) => {
            this.handleMessage('message', event);
        };
        
        this.eventSource.onerror = (error) => {
            console.error('SSE error:', error);
            this.connected = false;
            this.emit('error', error);
            
            if (this.eventSource.readyState === EventSource.CLOSED) {
                this.handleReconnect();
            }
        };
        
        // Set up custom event listeners
        this.listeners.forEach((callbacks, eventType) => {
            if (eventType !== 'message') {
                this.eventSource.addEventListener(eventType, (event) => {
                    this.handleMessage(eventType, event);
                });
            }
        });
    }
    
    on(eventType, callback) {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType).push(callback);
        
        // If already connected, add listener to EventSource
        if (this.eventSource && eventType !== 'message') {
            this.eventSource.addEventListener(eventType, (event) => {
                this.handleMessage(eventType, event);
            });
        }
        
        // Return unsubscribe function
        return () => this.off(eventType, callback);
    }
    
    off(eventType, callback) {
        if (this.listeners.has(eventType)) {
            const callbacks = this.listeners.get(eventType);
            const index = callbacks.indexOf(callback);
            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    emit(eventType, event) {
        if (this.listeners.has(eventType)) {
            this.listeners.get(eventType).forEach(callback => {
                try {
                    callback(event);
                } catch (error) {
                    console.error(`Error in SSE listener for ${eventType}:`, error);
                }
            });
        }
    }
    
    handleMessage(eventType, event) {
        try {
            let data = event.data;
            
            // Try to parse JSON
            try {
                data = JSON.parse(event.data);
            } catch {
                // Keep as string if not valid JSON
            }
            
            this.emit(eventType, { ...event, parsedData: data });
        } catch (error) {
            console.error(`Error handling SSE message for ${eventType}:`, error);
        }
    }
    
    handleReconnect() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('Max SSE reconnection attempts reached');
            this.emit('maxReconnectAttemptsReached');
            return;
        }
        
        this.reconnectAttempts++;
        const delay = this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1);
        
        console.log(`Reconnecting SSE in ${delay}ms... (attempt ${this.reconnectAttempts})`);
        
        setTimeout(() => {
            this.connect();
        }, delay);
    }
    
    close() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = null;
            this.connected = false;
        }
    }
    
    getReadyState() {
        return this.eventSource ? this.eventSource.readyState : EventSource.CLOSED;
    }
}

// ReadableStream processing for chunked responses
class StreamProcessor {
    async processTextStream(response, onChunk, onComplete) {
        if (!response.body) {
            throw new Error('Response body is not available for streaming');
        }
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                buffer += decoder.decode(value, { stream: true });
                
                // Process complete lines
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer
                
                for (const line of lines) {
                    if (line.trim()) {
                        onChunk(line.trim());
                    }
                }
            }
            
            // Process remaining buffer
            if (buffer.trim()) {
                onChunk(buffer.trim());
            }
            
            if (onComplete) {
                onComplete();
            }
        } finally {
            reader.releaseLock();
        }
    }
    
    async processJSONStream(response, onObject, onComplete) {
        await this.processTextStream(
            response,
            (chunk) => {
                try {
                    const obj = JSON.parse(chunk);
                    onObject(obj);
                } catch (error) {
                    console.warn('Invalid JSON chunk:', chunk);
                }
            },
            onComplete
        );
    }
    
    // Process NDJSON (Newline Delimited JSON)
    async processNDJSONStream(response, onObject, onComplete) {
        await this.processTextStream(response, onObject, onComplete);
    }
}

// Usage examples
async function demonstrateStreaming() {
    // Server-Sent Events
    const sseClient = new SSEClient('/api/events');
    
    // Listen for different event types
    sseClient.on('user-update', (event) => {
        console.log('User updated:', event.parsedData);
    });
    
    sseClient.on('system-notification', (event) => {
        console.log('System notification:', event.parsedData);
    });
    
    sseClient.on('error', (error) => {
        console.error('SSE error:', error);
    });
    
    sseClient.on('connect', () => {
        console.log('Connected to event stream');
    });
    
    sseClient.connect();
    
    // Stream processing
    const processor = new StreamProcessor();
    
    // Process streaming JSON responses
    try {
        const response = await fetch('/api/stream/data');
        
        await processor.processJSONStream(
            response,
            (data) => {
                console.log('Received data chunk:', data);
            },
            () => {
                console.log('Stream processing complete');
            }
        );
    } catch (error) {
        console.error('Stream processing failed:', error);
    }
    
    // Process NDJSON stream
    try {
        const logsResponse = await fetch('/api/logs/stream');
        
        await processor.processNDJSONStream(
            logsResponse,
            (logEntry) => {
                console.log('Log entry:', logEntry);
            },
            () => {
                console.log('Log stream complete');
            }
        );
    } catch (error) {
        console.error('Log stream processing failed:', error);
    }
}
```

## Summary

This lesson covered the Fetch API and modern HTTP client patterns:

1. **Basic Operations**: GET, POST, PUT, PATCH, DELETE with proper error handling
2. **Advanced Configuration**: Timeout, retries, custom headers, response parsing
3. **Interceptors**: Request/response middleware for authentication and logging
4. **File Operations**: Upload/download with progress tracking, chunked uploads
5. **Streaming**: Server-Sent Events, ReadableStream processing
6. **Real-time Data**: Event-driven communication patterns

The Fetch API provides a powerful foundation for building robust HTTP clients that handle complex real-world scenarios while maintaining clean, promise-based code.
