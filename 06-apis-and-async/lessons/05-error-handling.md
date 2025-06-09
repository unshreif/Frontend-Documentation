# Advanced Error Handling in Async Operations

## Understanding Async Error Types

Asynchronous operations introduce unique error scenarios that require specialized handling strategies beyond traditional try-catch blocks.

### Common Async Error Categories

```javascript
// Network errors - connection issues, timeouts
class NetworkError extends Error {
    constructor(message, cause) {
        super(message);
        this.name = 'NetworkError';
        this.cause = cause;
        this.timestamp = new Date();
    }
}

// HTTP errors - server responses with error status codes
class HTTPError extends Error {
    constructor(message, status, response) {
        super(message);
        this.name = 'HTTPError';
        this.status = status;
        this.response = response;
        this.timestamp = new Date();
    }
}

// Validation errors - data format or content issues
class ValidationError extends Error {
    constructor(message, field, value) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
        this.timestamp = new Date();
    }
}

// Timeout errors - operations taking too long
class TimeoutError extends Error {
    constructor(message, timeout) {
        super(message);
        this.name = 'TimeoutError';
        this.timeout = timeout;
        this.timestamp = new Date();
    }
}

// Business logic errors - application-specific failures
class BusinessError extends Error {
    constructor(message, code, context) {
        super(message);
        this.name = 'BusinessError';
        this.code = code;
        this.context = context;
        this.timestamp = new Date();
    }
}
```

### Error Classification and Handling Strategy

```javascript
class ErrorHandler {
    constructor() {
        this.errorHandlers = new Map();
        this.fallbackHandler = this.defaultErrorHandler.bind(this);
        this.setupDefaultHandlers();
    }
    
    setupDefaultHandlers() {
        this.addHandler(NetworkError, this.handleNetworkError.bind(this));
        this.addHandler(HTTPError, this.handleHTTPError.bind(this));
        this.addHandler(ValidationError, this.handleValidationError.bind(this));
        this.addHandler(TimeoutError, this.handleTimeoutError.bind(this));
        this.addHandler(BusinessError, this.handleBusinessError.bind(this));
    }
    
    addHandler(errorType, handler) {
        this.errorHandlers.set(errorType, handler);
    }
    
    async handle(error, context = {}) {
        const handler = this.errorHandlers.get(error.constructor) || this.fallbackHandler;
        
        try {
            return await handler(error, context);
        } catch (handlerError) {
            console.error('Error in error handler:', handlerError);
            return this.defaultErrorHandler(error, context);
        }
    }
    
    handleNetworkError(error, context) {
        console.warn('Network error detected:', error.message);
        
        // Suggest retry for transient network issues
        if (this.isRetryableNetworkError(error)) {
            return {
                shouldRetry: true,
                delay: 1000,
                maxRetries: 3,
                userMessage: 'Connection issue detected. Retrying...'
            };
        }
        
        return {
            shouldRetry: false,
            userMessage: 'Network unavailable. Please check your connection.'
        };
    }
    
    handleHTTPError(error, context) {
        const { status } = error;
        
        switch (Math.floor(status / 100)) {
            case 4: // 4xx Client Errors
                return this.handleClientError(error, context);
            case 5: // 5xx Server Errors
                return this.handleServerError(error, context);
            default:
                return this.defaultErrorHandler(error, context);
        }
    }
    
    handleClientError(error, context) {
        const { status } = error;
        
        switch (status) {
            case 400:
                return {
                    shouldRetry: false,
                    userMessage: 'Invalid request. Please check your input.',
                    action: 'SHOW_VALIDATION_ERRORS'
                };
            case 401:
                return {
                    shouldRetry: false,
                    userMessage: 'Authentication required.',
                    action: 'REDIRECT_TO_LOGIN'
                };
            case 403:
                return {
                    shouldRetry: false,
                    userMessage: 'Access denied.',
                    action: 'SHOW_PERMISSION_ERROR'
                };
            case 404:
                return {
                    shouldRetry: false,
                    userMessage: 'Resource not found.',
                    action: 'SHOW_NOT_FOUND'
                };
            case 429:
                return {
                    shouldRetry: true,
                    delay: 5000,
                    maxRetries: 2,
                    userMessage: 'Too many requests. Please wait...'
                };
            default:
                return {
                    shouldRetry: false,
                    userMessage: 'Request failed. Please try again.'
                };
        }
    }
    
    handleServerError(error, context) {
        return {
            shouldRetry: true,
            delay: 2000,
            maxRetries: 3,
            userMessage: 'Server error. Retrying...',
            action: 'LOG_FOR_MONITORING'
        };
    }
    
    handleValidationError(error, context) {
        return {
            shouldRetry: false,
            userMessage: `Validation failed: ${error.message}`,
            action: 'HIGHLIGHT_FIELD',
            field: error.field
        };
    }
    
    handleTimeoutError(error, context) {
        return {
            shouldRetry: true,
            delay: 1000,
            maxRetries: 2,
            userMessage: 'Request timed out. Retrying...'
        };
    }
    
    handleBusinessError(error, context) {
        return {
            shouldRetry: false,
            userMessage: error.message,
            action: 'SHOW_BUSINESS_ERROR',
            code: error.code
        };
    }
    
    defaultErrorHandler(error, context) {
        console.error('Unhandled error:', error);
        return {
            shouldRetry: false,
            userMessage: 'An unexpected error occurred. Please try again.'
        };
    }
    
    isRetryableNetworkError(error) {
        const retryableMessages = [
            'fetch',
            'network',
            'timeout',
            'connection',
            'ECONNRESET',
            'ETIMEDOUT'
        ];
        
        return retryableMessages.some(msg => 
            error.message.toLowerCase().includes(msg.toLowerCase())
        );
    }
}
```

## Retry Mechanisms and Circuit Breakers

### Exponential Backoff Retry

```javascript
class RetryManager {
    constructor(options = {}) {
        this.maxRetries = options.maxRetries || 3;
        this.baseDelay = options.baseDelay || 1000;
        this.maxDelay = options.maxDelay || 30000;
        this.backoffFactor = options.backoffFactor || 2;
        this.jitter = options.jitter || true;
    }
    
    async executeWithRetry(asyncFn, options = {}) {
        const maxRetries = options.maxRetries || this.maxRetries;
        let lastError;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                const result = await asyncFn();
                return result;
            } catch (error) {
                lastError = error;
                
                if (attempt === maxRetries) {
                    throw new Error(`Failed after ${maxRetries} retries: ${error.message}`);
                }
                
                if (!this.shouldRetry(error, attempt)) {
                    throw error;
                }
                
                const delay = this.calculateDelay(attempt);
                console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
                
                await this.sleep(delay);
            }
        }
        
        throw lastError;
    }
    
    shouldRetry(error, attempt) {
        // Don't retry client errors (4xx) except 429 (rate limit)
        if (error instanceof HTTPError) {
            const status = error.status;
            return status >= 500 || status === 429 || status === 408;
        }
        
        // Retry network and timeout errors
        if (error instanceof NetworkError || error instanceof TimeoutError) {
            return true;
        }
        
        // Don't retry validation or business errors
        if (error instanceof ValidationError || error instanceof BusinessError) {
            return false;
        }
        
        // Default to retry for unknown errors
        return true;
    }
    
    calculateDelay(attempt) {
        let delay = this.baseDelay * Math.pow(this.backoffFactor, attempt);
        
        // Apply maximum delay cap
        delay = Math.min(delay, this.maxDelay);
        
        // Add jitter to prevent thundering herd
        if (this.jitter) {
            delay = delay * (0.5 + Math.random() * 0.5);
        }
        
        return Math.floor(delay);
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Usage example
const retryManager = new RetryManager({
    maxRetries: 3,
    baseDelay: 1000,
    backoffFactor: 2
});

async function fetchUserData(userId) {
    return retryManager.executeWithRetry(async () => {
        const response = await fetch(`/api/users/${userId}`);
        
        if (!response.ok) {
            throw new HTTPError(
                `HTTP ${response.status}: ${response.statusText}`,
                response.status,
                response
            );
        }
        
        return response.json();
    });
}
```

### Circuit Breaker Pattern

```javascript
class CircuitBreaker {
    constructor(options = {}) {
        this.failureThreshold = options.failureThreshold || 5;
        this.recoveryTimeout = options.recoveryTimeout || 60000;
        this.monitoringPeriod = options.monitoringPeriod || 10000;
        
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.successCount = 0;
        this.requestCount = 0;
        
        this.metrics = {
            totalRequests: 0,
            totalFailures: 0,
            totalTimeouts: 0
        };
        
        this.listeners = [];
    }
    
    async execute(asyncFn, fallbackFn = null) {
        this.requestCount++;
        this.metrics.totalRequests++;
        
        if (this.state === 'OPEN') {
            if (this.shouldAttemptReset()) {
                this.state = 'HALF_OPEN';
                console.log('Circuit breaker: Attempting reset (HALF_OPEN)');
            } else {
                const error = new Error('Circuit breaker is OPEN');
                this.notifyListeners('REJECTED', { error });
                return this.executeFallback(fallbackFn, error);
            }
        }
        
        try {
            const result = await asyncFn();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure(error);
            return this.executeFallback(fallbackFn, error);
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.successCount++;
        
        if (this.state === 'HALF_OPEN') {
            this.state = 'CLOSED';
            console.log('Circuit breaker: Reset successful (CLOSED)');
            this.notifyListeners('CLOSED');
        }
    }
    
    onFailure(error) {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        this.metrics.totalFailures++;
        
        if (error instanceof TimeoutError) {
            this.metrics.totalTimeouts++;
        }
        
        if (this.state === 'HALF_OPEN') {
            this.state = 'OPEN';
            console.log('Circuit breaker: Reset failed (OPEN)');
            this.notifyListeners('OPENED', { error });
        } else if (this.shouldTrip()) {
            this.state = 'OPEN';
            console.log('Circuit breaker: Failure threshold reached (OPEN)');
            this.notifyListeners('OPENED', { error });
        }
        
        throw error;
    }
    
    shouldTrip() {
        return this.failureCount >= this.failureThreshold;
    }
    
    shouldAttemptReset() {
        return this.lastFailureTime && 
               (Date.now() - this.lastFailureTime) >= this.recoveryTimeout;
    }
    
    async executeFallback(fallbackFn, originalError) {
        if (fallbackFn) {
            try {
                return await fallbackFn(originalError);
            } catch (fallbackError) {
                console.error('Fallback failed:', fallbackError);
                throw originalError;
            }
        }
        throw originalError;
    }
    
    getMetrics() {
        const failureRate = this.metrics.totalRequests > 0 
            ? this.metrics.totalFailures / this.metrics.totalRequests 
            : 0;
            
        return {
            state: this.state,
            failureCount: this.failureCount,
            successCount: this.successCount,
            failureRate: Math.round(failureRate * 100),
            ...this.metrics
        };
    }
    
    addListener(callback) {
        this.listeners.push(callback);
    }
    
    notifyListeners(event, data = {}) {
        this.listeners.forEach(callback => {
            try {
                callback(event, { ...data, metrics: this.getMetrics() });
            } catch (error) {
                console.error('Circuit breaker listener error:', error);
            }
        });
    }
    
    reset() {
        this.state = 'CLOSED';
        this.failureCount = 0;
        this.successCount = 0;
        this.lastFailureTime = null;
        console.log('Circuit breaker: Manual reset');
        this.notifyListeners('RESET');
    }
}

// Enhanced API client with circuit breaker
class ResilientAPIClient {
    constructor(baseURL, options = {}) {
        this.baseURL = baseURL;
        this.circuitBreaker = new CircuitBreaker(options.circuitBreaker);
        this.retryManager = new RetryManager(options.retry);
        this.errorHandler = new ErrorHandler();
        
        this.setupCircuitBreakerMonitoring();
    }
    
    setupCircuitBreakerMonitoring() {
        this.circuitBreaker.addListener((event, data) => {
            console.log(`Circuit breaker event: ${event}`, data.metrics);
            
            if (event === 'OPENED') {
                this.notifyServiceDegradation();
            } else if (event === 'CLOSED') {
                this.notifyServiceRecovery();
            }
        });
    }
    
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        
        return this.circuitBreaker.execute(
            () => this.retryManager.executeWithRetry(
                () => this.performRequest(url, options)
            ),
            (error) => this.getFallbackResponse(endpoint, error)
        );
    }
    
    async performRequest(url, options) {
        const controller = new AbortController();
        const timeout = options.timeout || 10000;
        
        const timeoutId = setTimeout(() => {
            controller.abort();
        }, timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                throw new HTTPError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    response
                );
            }
            
            return response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new TimeoutError(`Request timeout after ${timeout}ms`, timeout);
            }
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new NetworkError('Network request failed', error);
            }
            
            throw error;
        }
    }
    
    getFallbackResponse(endpoint, error) {
        // Return cached data or default values
        const cachedData = this.getCachedData(endpoint);
        if (cachedData) {
            console.log('Returning cached data due to circuit breaker');
            return { ...cachedData, _fromCache: true };
        }
        
        // Return minimal default response
        return {
            error: 'Service temporarily unavailable',
            _fallback: true,
            timestamp: new Date().toISOString()
        };
    }
    
    getCachedData(endpoint) {
        // Implementation would integrate with caching layer
        return null;
    }
    
    notifyServiceDegradation() {
        // Notify monitoring systems or user
        console.warn('Service degraded - circuit breaker opened');
    }
    
    notifyServiceRecovery() {
        console.log('Service recovered - circuit breaker closed');
    }
    
    getHealth() {
        return this.circuitBreaker.getMetrics();
    }
}
```

## Graceful Degradation Strategies

### Progressive Enhancement Pattern

```javascript
class ProgressiveAPIClient {
    constructor(config) {
        this.primaryEndpoint = config.primary;
        this.fallbackEndpoints = config.fallbacks || [];
        this.cacheManager = new CacheManager();
        this.offlineDetector = new OfflineDetector();
    }
    
    async getData(request) {
        // Strategy 1: Try primary endpoint
        try {
            if (this.offlineDetector.isOnline()) {
                const data = await this.fetchFromPrimary(request);
                this.cacheManager.store(request, data);
                return { data, source: 'primary', quality: 'high' };
            }
        } catch (error) {
            console.warn('Primary endpoint failed:', error.message);
        }
        
        // Strategy 2: Try fallback endpoints
        for (const [index, endpoint] of this.fallbackEndpoints.entries()) {
            try {
                const data = await this.fetchFromEndpoint(endpoint, request);
                this.cacheManager.store(request, data);
                return { data, source: `fallback-${index}`, quality: 'medium' };
            } catch (error) {
                console.warn(`Fallback ${index} failed:`, error.message);
            }
        }
        
        // Strategy 3: Return cached data
        const cachedData = this.cacheManager.get(request);
        if (cachedData) {
            return { 
                data: cachedData, 
                source: 'cache', 
                quality: 'low',
                stale: true 
            };
        }
        
        // Strategy 4: Return minimal fallback
        return {
            data: this.getMinimalFallback(request),
            source: 'fallback',
            quality: 'minimal'
        };
    }
    
    async fetchFromPrimary(request) {
        const response = await fetch(this.primaryEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        });
        
        if (!response.ok) {
            throw new HTTPError(`Primary endpoint failed`, response.status, response);
        }
        
        return response.json();
    }
    
    async fetchFromEndpoint(endpoint, request) {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(request),
            timeout: 5000 // Shorter timeout for fallbacks
        });
        
        if (!response.ok) {
            throw new HTTPError(`Fallback endpoint failed`, response.status, response);
        }
        
        return response.json();
    }
    
    getMinimalFallback(request) {
        // Return basic structure with default values
        return {
            id: request.id || 'unknown',
            status: 'unavailable',
            message: 'Service temporarily unavailable',
            timestamp: new Date().toISOString()
        };
    }
}

class CacheManager {
    constructor(ttl = 300000) { // 5 minutes
        this.cache = new Map();
        this.ttl = ttl;
    }
    
    store(key, data) {
        this.cache.set(this.getKey(key), {
            data,
            timestamp: Date.now()
        });
    }
    
    get(key) {
        const entry = this.cache.get(this.getKey(key));
        if (!entry) return null;
        
        if (Date.now() - entry.timestamp > this.ttl) {
            this.cache.delete(this.getKey(key));
            return null;
        }
        
        return entry.data;
    }
    
    getKey(request) {
        return JSON.stringify(request);
    }
}

class OfflineDetector {
    constructor() {
        this.online = navigator.onLine;
        this.setupListeners();
    }
    
    setupListeners() {
        window.addEventListener('online', () => {
            this.online = true;
            console.log('Connection restored');
        });
        
        window.addEventListener('offline', () => {
            this.online = false;
            console.log('Connection lost');
        });
    }
    
    isOnline() {
        return this.online;
    }
}
```

## Error Monitoring and Logging

### Comprehensive Error Tracking

```javascript
class ErrorTracker {
    constructor(config = {}) {
        this.endpoint = config.endpoint;
        this.batchSize = config.batchSize || 10;
        this.flushInterval = config.flushInterval || 30000;
        this.errorQueue = [];
        this.sessionId = this.generateSessionId();
        this.startTime = Date.now();
        
        this.setupErrorListeners();
        this.startPeriodicFlush();
    }
    
    setupErrorListeners() {
        // Catch unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.trackError({
                type: 'unhandled_promise_rejection',
                error: event.reason,
                promise: event.promise
            });
        });
        
        // Catch uncaught exceptions
        window.addEventListener('error', (event) => {
            this.trackError({
                type: 'uncaught_exception',
                error: event.error,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });
    }
    
    trackError(errorInfo) {
        const errorEntry = {
            id: this.generateErrorId(),
            sessionId: this.sessionId,
            timestamp: Date.now(),
            url: window.location.href,
            userAgent: navigator.userAgent,
            ...errorInfo,
            stackTrace: this.getStackTrace(errorInfo.error),
            context: this.gatherContext()
        };
        
        this.errorQueue.push(errorEntry);
        
        if (this.errorQueue.length >= this.batchSize) {
            this.flush();
        }
        
        // Log to console for development
        console.error('Error tracked:', errorEntry);
    }
    
    trackAsyncError(error, operation, context = {}) {
        this.trackError({
            type: 'async_operation_error',
            error,
            operation,
            context,
            ...context
        });
    }
    
    getStackTrace(error) {
        if (error && error.stack) {
            return error.stack.split('\n').slice(0, 10); // Limit stack trace
        }
        return null;
    }
    
    gatherContext() {
        return {
            timestamp: Date.now(),
            sessionDuration: Date.now() - this.startTime,
            memory: this.getMemoryInfo(),
            connection: this.getConnectionInfo(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
    
    getMemoryInfo() {
        if (performance.memory) {
            return {
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize,
                limit: performance.memory.jsHeapSizeLimit
            };
        }
        return null;
    }
    
    getConnectionInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            return {
                effectiveType: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt
            };
        }
        return null;
    }
    
    async flush() {
        if (this.errorQueue.length === 0) return;
        
        const errors = [...this.errorQueue];
        this.errorQueue = [];
        
        try {
            if (this.endpoint) {
                await fetch(this.endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ errors })
                });
            }
        } catch (error) {
            console.error('Failed to send error report:', error);
            // Re-queue errors for next attempt
            this.errorQueue.unshift(...errors);
        }
    }
    
    startPeriodicFlush() {
        setInterval(() => {
            this.flush();
        }, this.flushInterval);
    }
    
    generateSessionId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    generateErrorId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

// Integration with async operations
class MonitoredAPIClient {
    constructor(baseURL, errorTracker) {
        this.baseURL = baseURL;
        this.errorTracker = errorTracker;
    }
    
    async request(endpoint, options = {}) {
        const operation = `${options.method || 'GET'} ${endpoint}`;
        const startTime = Date.now();
        
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            
            if (!response.ok) {
                const error = new HTTPError(
                    `HTTP ${response.status}`,
                    response.status,
                    response
                );
                
                this.errorTracker.trackAsyncError(error, operation, {
                    endpoint,
                    duration: Date.now() - startTime,
                    status: response.status
                });
                
                throw error;
            }
            
            return response.json();
        } catch (error) {
            this.errorTracker.trackAsyncError(error, operation, {
                endpoint,
                duration: Date.now() - startTime,
                options
            });
            
            throw error;
        }
    }
}
```

## Real-World Error Handling Examples

### Complete Error Handling System

```javascript
class ProductionErrorHandler {
    constructor(config) {
        this.config = config;
        this.retryManager = new RetryManager(config.retry);
        this.circuitBreaker = new CircuitBreaker(config.circuitBreaker);
        this.errorTracker = new ErrorTracker(config.tracking);
        this.notificationManager = new NotificationManager(config.notifications);
    }
    
    async handleAsyncOperation(operation, context = {}) {
        try {
            return await this.circuitBreaker.execute(
                () => this.retryManager.executeWithRetry(operation),
                (error) => this.getFallbackResult(error, context)
            );
        } catch (error) {
            return this.handleFinalError(error, context);
        }
    }
    
    getFallbackResult(error, context) {
        // Try to get cached result
        const cached = this.getCachedResult(context);
        if (cached) {
            return { ...cached, _source: 'cache' };
        }
        
        // Return default result
        return this.getDefaultResult(context);
    }
    
    handleFinalError(error, context) {
        // Track the error
        this.errorTracker.trackAsyncError(error, context.operation, context);
        
        // Notify relevant parties
        this.notificationManager.notifyError(error, context);
        
        // Return user-friendly error response
        return {
            success: false,
            error: this.getUserFriendlyMessage(error),
            code: error.code || 'UNKNOWN_ERROR',
            timestamp: new Date().toISOString()
        };
    }
    
    getUserFriendlyMessage(error) {
        const messageMap = {
            'NetworkError': 'Connection problem. Please check your internet.',
            'TimeoutError': 'Request took too long. Please try again.',
            'HTTPError': 'Server error. Please try again later.',
            'ValidationError': 'Invalid input. Please check your data.',
            'BusinessError': error.message
        };
        
        return messageMap[error.constructor.name] || 'Something went wrong. Please try again.';
    }
    
    getCachedResult(context) {
        // Implementation depends on caching strategy
        return null;
    }
    
    getDefaultResult(context) {
        return {
            success: false,
            message: 'Service temporarily unavailable',
            _fallback: true
        };
    }
}

class NotificationManager {
    constructor(config = {}) {
        this.config = config;
        this.channels = new Map();
        this.setupChannels();
    }
    
    setupChannels() {
        if (this.config.email) {
            this.channels.set('email', new EmailNotifier(this.config.email));
        }
        if (this.config.slack) {
            this.channels.set('slack', new SlackNotifier(this.config.slack));
        }
        if (this.config.webhook) {
            this.channels.set('webhook', new WebhookNotifier(this.config.webhook));
        }
    }
    
    async notifyError(error, context) {
        const severity = this.calculateSeverity(error, context);
        
        if (severity >= this.config.notificationThreshold) {
            const notification = this.formatNotification(error, context, severity);
            
            await Promise.allSettled(
                Array.from(this.channels.values()).map(channel =>
                    channel.send(notification)
                )
            );
        }
    }
    
    calculateSeverity(error, context) {
        let severity = 1;
        
        if (error instanceof BusinessError) severity = 2;
        if (error instanceof HTTPError && error.status >= 500) severity = 3;
        if (error instanceof NetworkError) severity = 2;
        if (context.criticalOperation) severity += 1;
        
        return Math.min(severity, 5);
    }
    
    formatNotification(error, context, severity) {
        return {
            title: `Error Alert - Severity ${severity}`,
            message: error.message,
            error: error.constructor.name,
            context,
            timestamp: new Date().toISOString(),
            severity
        };
    }
}

// Usage example
const errorHandler = new ProductionErrorHandler({
    retry: {
        maxRetries: 3,
        baseDelay: 1000,
        backoffFactor: 2
    },
    circuitBreaker: {
        failureThreshold: 5,
        recoveryTimeout: 60000
    },
    tracking: {
        endpoint: '/api/errors',
        batchSize: 10
    },
    notifications: {
        notificationThreshold: 3,
        email: { /* email config */ },
        slack: { /* slack config */ }
    }
});

// Using the error handler
async function fetchUserProfile(userId) {
    return errorHandler.handleAsyncOperation(
        async () => {
            const response = await fetch(`/api/users/${userId}`);
            if (!response.ok) {
                throw new HTTPError(`Failed to fetch user`, response.status, response);
            }
            return response.json();
        },
        {
            operation: 'fetchUserProfile',
            userId,
            criticalOperation: true
        }
    );
}
```

## Summary

This lesson covered comprehensive error handling strategies for asynchronous operations:

1. **Error Classification** - Different error types and appropriate responses
2. **Retry Mechanisms** - Exponential backoff and intelligent retry logic
3. **Circuit Breakers** - Preventing cascade failures and enabling recovery
4. **Graceful Degradation** - Progressive fallback strategies
5. **Error Monitoring** - Tracking and reporting for continuous improvement

These patterns ensure robust applications that handle failures gracefully and provide excellent user experiences even when things go wrong.
