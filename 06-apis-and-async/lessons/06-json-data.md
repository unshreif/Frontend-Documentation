# JSON Data Handling & Transformation

## Understanding JSON in Modern Applications

JSON (JavaScript Object Notation) is the standard data format for web APIs. Effective JSON handling involves parsing, validation, transformation, and error management to build robust applications.

### JSON Parsing and Serialization

```javascript
// Safe JSON parsing with error handling
class SafeJSON {
    static parse(jsonString, defaultValue = null) {
        try {
            return JSON.parse(jsonString);
        } catch (error) {
            console.warn('JSON parse error:', error.message);
            return defaultValue;
        }
    }
    
    static stringify(data, space = null) {
        try {
            return JSON.stringify(data, null, space);
        } catch (error) {
            console.error('JSON stringify error:', error.message);
            return null;
        }
    }
    
    // Parse with type validation
    static parseWithValidation(jsonString, validator) {
        const data = this.parse(jsonString);
        
        if (data === null) {
            throw new Error('Invalid JSON format');
        }
        
        if (validator && !validator(data)) {
            throw new Error('JSON data validation failed');
        }
        
        return data;
    }
    
    // Parse with transformation
    static parseAndTransform(jsonString, transformer) {
        const data = this.parse(jsonString);
        
        if (data === null) {
            return null;
        }
        
        return transformer ? transformer(data) : data;
    }
}

// Advanced JSON handling with reviver/replacer
class JSONProcessor {
    constructor() {
        this.datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;
    }
    
    // Custom reviver for parsing
    reviver(key, value) {
        // Convert ISO date strings to Date objects
        if (typeof value === 'string' && this.datePattern.test(value)) {
            return new Date(value);
        }
        
        // Convert numeric strings to numbers where appropriate
        if (typeof value === 'string' && /^\d+$/.test(value) && key.includes('id')) {
            return parseInt(value, 10);
        }
        
        return value;
    }
    
    // Custom replacer for stringifying
    replacer(key, value) {
        // Convert Date objects to ISO strings
        if (value instanceof Date) {
            return value.toISOString();
        }
        
        // Remove undefined values
        if (value === undefined) {
            return null;
        }
        
        // Hide sensitive fields
        if (key === 'password' || key === 'secret') {
            return '[HIDDEN]';
        }
        
        return value;
    }
    
    parse(jsonString) {
        return JSON.parse(jsonString, this.reviver.bind(this));
    }
    
    stringify(data, space = null) {
        return JSON.stringify(data, this.replacer.bind(this), space);
    }
}

// Usage examples
const processor = new JSONProcessor();

const userData = {
    id: '123',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'secret123',
    createdAt: '2023-01-15T10:30:00Z',
    lastLogin: undefined
};

const jsonString = processor.stringify(userData, 2);
console.log('Serialized:', jsonString);

const parsed = processor.parse(jsonString);
console.log('Parsed:', parsed);
console.log('Created at type:', typeof parsed.createdAt); // Date object
```

### Data Validation and Schema Checking

```javascript
// JSON Schema validator
class JSONValidator {
    constructor() {
        this.schemas = new Map();
    }
    
    // Register a schema
    registerSchema(name, schema) {
        this.schemas.set(name, schema);
    }
    
    // Validate data against a schema
    validate(data, schemaName) {
        const schema = this.schemas.get(schemaName);
        if (!schema) {
            throw new Error(`Schema '${schemaName}' not found`);
        }
        
        return this.validateAgainstSchema(data, schema);
    }
    
    validateAgainstSchema(data, schema) {
        const errors = [];
        
        // Type validation
        if (schema.type && typeof data !== schema.type) {
            errors.push(`Expected type ${schema.type}, got ${typeof data}`);
        }
        
        // Required fields validation
        if (schema.required && Array.isArray(schema.required)) {
            for (const field of schema.required) {
                if (!(field in data) || data[field] === undefined || data[field] === null) {
                    errors.push(`Required field '${field}' is missing`);
                }
            }
        }
        
        // Properties validation
        if (schema.properties && typeof data === 'object') {
            for (const [key, propSchema] of Object.entries(schema.properties)) {
                if (key in data) {
                    const propErrors = this.validateAgainstSchema(data[key], propSchema);
                    errors.push(...propErrors.map(err => `${key}: ${err}`));
                }
            }
        }
        
        // Array validation
        if (schema.type === 'array' && Array.isArray(data)) {
            if (schema.items) {
                data.forEach((item, index) => {
                    const itemErrors = this.validateAgainstSchema(item, schema.items);
                    errors.push(...itemErrors.map(err => `[${index}]: ${err}`));
                });
            }
            
            if (schema.minItems && data.length < schema.minItems) {
                errors.push(`Array must have at least ${schema.minItems} items`);
            }
            
            if (schema.maxItems && data.length > schema.maxItems) {
                errors.push(`Array must have at most ${schema.maxItems} items`);
            }
        }
        
        // String validation
        if (schema.type === 'string' && typeof data === 'string') {
            if (schema.minLength && data.length < schema.minLength) {
                errors.push(`String must be at least ${schema.minLength} characters`);
            }
            
            if (schema.maxLength && data.length > schema.maxLength) {
                errors.push(`String must be at most ${schema.maxLength} characters`);
            }
            
            if (schema.pattern && !new RegExp(schema.pattern).test(data)) {
                errors.push(`String does not match pattern ${schema.pattern}`);
            }
        }
        
        // Number validation
        if (schema.type === 'number' && typeof data === 'number') {
            if (schema.minimum !== undefined && data < schema.minimum) {
                errors.push(`Number must be at least ${schema.minimum}`);
            }
            
            if (schema.maximum !== undefined && data > schema.maximum) {
                errors.push(`Number must be at most ${schema.maximum}`);
            }
        }
        
        return errors;
    }
}

// Schema definitions
const validator = new JSONValidator();

validator.registerSchema('user', {
    type: 'object',
    required: ['id', 'name', 'email'],
    properties: {
        id: { type: 'number' },
        name: { 
            type: 'string', 
            minLength: 2, 
            maxLength: 50 
        },
        email: { 
            type: 'string', 
            pattern: '^[^@]+@[^@]+\.[^@]+$' 
        },
        age: { 
            type: 'number', 
            minimum: 0, 
            maximum: 150 
        },
        tags: {
            type: 'array',
            items: { type: 'string' },
            maxItems: 10
        }
    }
});

validator.registerSchema('product', {
    type: 'object',
    required: ['id', 'name', 'price'],
    properties: {
        id: { type: 'number' },
        name: { type: 'string', minLength: 1 },
        price: { type: 'number', minimum: 0 },
        category: { type: 'string' },
        inStock: { type: 'boolean' }
    }
});

// Validation usage
function validateUserData(userData) {
    const errors = validator.validate(userData, 'user');
    
    if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors.join(', ')}`);
    }
    
    return true;
}

// Example validation
try {
    const user = {
        id: 123,
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        tags: ['developer', 'javascript']
    };
    
    validateUserData(user);
    console.log('User data is valid');
} catch (error) {
    console.error('Validation error:', error.message);
}
```

### Data Transformation Pipelines

```javascript
// Data transformation utilities
class DataTransformer {
    constructor() {
        this.transformers = [];
    }
    
    // Add transformation step
    pipe(transformer) {
        this.transformers.push(transformer);
        return this;
    }
    
    // Execute all transformations
    transform(data) {
        return this.transformers.reduce((result, transformer) => {
            return transformer(result);
        }, data);
    }
    
    // Static transformation methods
    static mapKeys(keyMapping) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.map(item => DataTransformer.mapKeys(keyMapping)(item));
            }
            
            if (typeof data === 'object' && data !== null) {
                const result = {};
                for (const [oldKey, newKey] of Object.entries(keyMapping)) {
                    if (oldKey in data) {
                        result[newKey] = data[oldKey];
                    }
                }
                
                // Copy unmapped keys
                for (const [key, value] of Object.entries(data)) {
                    if (!(key in keyMapping)) {
                        result[key] = value;
                    }
                }
                
                return result;
            }
            
            return data;
        };
    }
    
    static pick(keys) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.map(item => DataTransformer.pick(keys)(item));
            }
            
            if (typeof data === 'object' && data !== null) {
                const result = {};
                for (const key of keys) {
                    if (key in data) {
                        result[key] = data[key];
                    }
                }
                return result;
            }
            
            return data;
        };
    }
    
    static omit(keys) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.map(item => DataTransformer.omit(keys)(item));
            }
            
            if (typeof data === 'object' && data !== null) {
                const result = { ...data };
                for (const key of keys) {
                    delete result[key];
                }
                return result;
            }
            
            return data;
        };
    }
    
    static addFields(fields) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.map(item => ({ ...item, ...fields }));
            }
            
            if (typeof data === 'object' && data !== null) {
                return { ...data, ...fields };
            }
            
            return data;
        };
    }
    
    static filter(predicate) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.filter(predicate);
            }
            
            return data;
        };
    }
    
    static sort(compareFn) {
        return (data) => {
            if (Array.isArray(data)) {
                return [...data].sort(compareFn);
            }
            
            return data;
        };
    }
    
    static groupBy(keySelector) {
        return (data) => {
            if (Array.isArray(data)) {
                return data.reduce((groups, item) => {
                    const key = typeof keySelector === 'function' 
                        ? keySelector(item) 
                        : item[keySelector];
                    
                    if (!groups[key]) {
                        groups[key] = [];
                    }
                    
                    groups[key].push(item);
                    return groups;
                }, {});
            }
            
            return data;
        };
    }
}

// API response transformation pipeline
class APIResponseTransformer {
    static createUserTransformer() {
        return new DataTransformer()
            .pipe(DataTransformer.mapKeys({
                'user_id': 'id',
                'full_name': 'name',
                'email_address': 'email',
                'created_date': 'createdAt'
            }))
            .pipe(DataTransformer.omit(['password', 'internal_id']))
            .pipe(DataTransformer.addFields({
                type: 'user',
                processed: true
            }))
            .pipe((data) => {
                // Convert date strings to Date objects
                if (data.createdAt) {
                    data.createdAt = new Date(data.createdAt);
                }
                return data;
            });
    }
    
    static createProductTransformer() {
        return new DataTransformer()
            .pipe(DataTransformer.pick(['id', 'name', 'price', 'category', 'inStock']))
            .pipe((data) => {
                // Format price
                if (typeof data.price === 'number') {
                    data.formattedPrice = `$${data.price.toFixed(2)}`;
                }
                
                // Add availability status
                data.availability = data.inStock ? 'available' : 'out-of-stock';
                
                return data;
            });
    }
}

// Usage examples
const rawUserData = {
    user_id: 123,
    full_name: 'John Doe',
    email_address: 'john@example.com',
    password: 'secret123',
    internal_id: 'INT_123',
    created_date: '2023-01-15T10:30:00Z',
    extra_field: 'some value'
};

const userTransformer = APIResponseTransformer.createUserTransformer();
const transformedUser = userTransformer.transform(rawUserData);

console.log('Transformed user:', transformedUser);
// Output: {
//   id: 123,
//   name: 'John Doe',
//   email: 'john@example.com',
//   createdAt: Date object,
//   extra_field: 'some value',
//   type: 'user',
//   processed: true
// }

// Array transformation
const products = [
    { id: 1, name: 'Laptop', price: 999.99, category: 'electronics', inStock: true },
    { id: 2, name: 'Book', price: 29.95, category: 'books', inStock: false },
    { id: 3, name: 'Phone', price: 699.00, category: 'electronics', inStock: true }
];

const productTransformer = new DataTransformer()
    .pipe(APIResponseTransformer.createProductTransformer().transform)
    .pipe(DataTransformer.filter(product => product.inStock))
    .pipe(DataTransformer.sort((a, b) => a.price - b.price));

const transformedProducts = productTransformer.transform(products);
console.log('Transformed products:', transformedProducts);
```

### Nested Data Processing

```javascript
// Deep data manipulation utilities
class DeepDataProcessor {
    // Deep merge objects
    static deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }
    
    // Get nested value using dot notation
    static getNestedValue(obj, path, defaultValue = undefined) {
        return path.split('.').reduce((current, key) => {
            return current && current[key] !== undefined ? current[key] : defaultValue;
        }, obj);
    }
    
    // Set nested value using dot notation
    static setNestedValue(obj, path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        
        const target = keys.reduce((current, key) => {
            if (current[key] === undefined) {
                current[key] = {};
            }
            return current[key];
        }, obj);
        
        target[lastKey] = value;
        return obj;
    }
    
    // Deep clone with circular reference handling
    static deepClone(obj, seen = new WeakMap()) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof RegExp) {
            return new RegExp(obj);
        }
        
        if (seen.has(obj)) {
            return seen.get(obj);
        }
        
        if (Array.isArray(obj)) {
            const clone = [];
            seen.set(obj, clone);
            
            for (let i = 0; i < obj.length; i++) {
                clone[i] = this.deepClone(obj[i], seen);
            }
            
            return clone;
        }
        
        const clone = {};
        seen.set(obj, clone);
        
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = this.deepClone(obj[key], seen);
            }
        }
        
        return clone;
    }
    
    // Flatten nested object
    static flatten(obj, prefix = '', result = {}) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const newKey = prefix ? `${prefix}.${key}` : key;
                
                if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                    this.flatten(obj[key], newKey, result);
                } else {
                    result[newKey] = obj[key];
                }
            }
        }
        
        return result;
    }
    
    // Unflatten object
    static unflatten(obj) {
        const result = {};
        
        for (const key in obj) {
            this.setNestedValue(result, key, obj[key]);
        }
        
        return result;
    }
}

// Complex data processing example
class UserDataProcessor {
    constructor() {
        this.processor = DeepDataProcessor;
    }
    
    processUserProfile(rawData) {
        // Start with a deep clone to avoid mutations
        const data = this.processor.deepClone(rawData);
        
        // Extract and process nested user information
        const profile = {
            id: this.processor.getNestedValue(data, 'user.id'),
            name: this.processor.getNestedValue(data, 'user.profile.name'),
            email: this.processor.getNestedValue(data, 'user.contact.email'),
            phone: this.processor.getNestedValue(data, 'user.contact.phone'),
            address: {
                street: this.processor.getNestedValue(data, 'user.address.street'),
                city: this.processor.getNestedValue(data, 'user.address.city'),
                country: this.processor.getNestedValue(data, 'user.address.country')
            },
            preferences: this.processor.getNestedValue(data, 'user.settings.preferences', {}),
            metadata: {
                createdAt: new Date(this.processor.getNestedValue(data, 'user.created_at')),
                lastLogin: new Date(this.processor.getNestedValue(data, 'user.last_login')),
                isActive: this.processor.getNestedValue(data, 'user.status') === 'active'
            }
        };
        
        // Add computed fields
        profile.fullAddress = [
            profile.address.street,
            profile.address.city,
            profile.address.country
        ].filter(Boolean).join(', ');
        
        profile.accountAge = Math.floor(
            (Date.now() - profile.metadata.createdAt.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        return profile;
    }
    
    mergeUserUpdates(existingProfile, updates) {
        return this.processor.deepMerge(existingProfile, updates);
    }
    
    flattenForStorage(profile) {
        return this.processor.flatten(profile);
    }
    
    unflattenFromStorage(flatData) {
        return this.processor.unflatten(flatData);
    }
}

// Usage example
const rawUserData = {
    user: {
        id: 123,
        profile: {
            name: 'John Doe',
            avatar: 'avatar.jpg'
        },
        contact: {
            email: 'john@example.com',
            phone: '+1234567890'
        },
        address: {
            street: '123 Main St',
            city: 'Boston',
            country: 'USA'
        },
        settings: {
            preferences: {
                theme: 'dark',
                notifications: true
            }
        },
        created_at: '2023-01-15T10:30:00Z',
        last_login: '2023-12-01T15:45:00Z',
        status: 'active'
    }
};

const userProcessor = new UserDataProcessor();
const processedProfile = userProcessor.processUserProfile(rawUserData);

console.log('Processed profile:', processedProfile);

// Demonstrate flattening/unflattening
const flattened = userProcessor.flattenForStorage(processedProfile);
console.log('Flattened:', flattened);

const unflattened = userProcessor.unflattenFromStorage(flattened);
console.log('Unflattened:', unflattened);
```

### Performance Optimization

```javascript
// JSON processing performance optimizations
class OptimizedJSONProcessor {
    constructor() {
        this.parseCache = new Map();
        this.stringifyCache = new Map();
        this.maxCacheSize = 1000;
    }
    
    // Cached parsing for repeated JSON strings
    cachedParse(jsonString) {
        if (this.parseCache.has(jsonString)) {
            return this.parseCache.get(jsonString);
        }
        
        try {
            const result = JSON.parse(jsonString);
            
            // Manage cache size
            if (this.parseCache.size >= this.maxCacheSize) {
                const firstKey = this.parseCache.keys().next().value;
                this.parseCache.delete(firstKey);
            }
            
            this.parseCache.set(jsonString, result);
            return result;
        } catch (error) {
            console.error('JSON parse error:', error.message);
            return null;
        }
    }
    
    // Streaming JSON parser for large data
    async streamingParse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        let buffer = '';
        const objects = [];
        let braceCount = 0;
        let inString = false;
        let escaped = false;
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                
                if (done) break;
                
                buffer += decoder.decode(value, { stream: true });
                
                // Parse complete JSON objects from buffer
                let i = 0;
                while (i < buffer.length) {
                    const char = buffer[i];
                    
                    if (escaped) {
                        escaped = false;
                    } else if (char === '\\' && inString) {
                        escaped = true;
                    } else if (char === '"') {
                        inString = !inString;
                    } else if (!inString) {
                        if (char === '{') {
                            braceCount++;
                        } else if (char === '}') {
                            braceCount--;
                            
                            if (braceCount === 0) {
                                // Complete object found
                                const objectString = buffer.substring(0, i + 1);
                                try {
                                    const obj = JSON.parse(objectString);
                                    objects.push(obj);
                                } catch (error) {
                                    console.error('Parse error in streaming:', error.message);
                                }
                                
                                buffer = buffer.substring(i + 1);
                                i = -1; // Reset counter
                            }
                        }
                    }
                    
                    i++;
                }
            }
        } finally {
            reader.releaseLock();
        }
        
        return objects;
    }
    
    // Memory-efficient large array processing
    processLargeArray(array, processor, batchSize = 1000) {
        const results = [];
        
        for (let i = 0; i < array.length; i += batchSize) {
            const batch = array.slice(i, i + batchSize);
            const processedBatch = batch.map(processor);
            results.push(...processedBatch);
            
            // Allow other tasks to run
            if (i % (batchSize * 10) === 0) {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(this.processLargeArray(
                            array.slice(i + batchSize), 
                            processor, 
                            batchSize
                        ).then(remaining => [...results, ...remaining]));
                    }, 0);
                });
            }
        }
        
        return Promise.resolve(results);
    }
    
    clearCache() {
        this.parseCache.clear();
        this.stringifyCache.clear();
    }
}

// Usage
const processor = new OptimizedJSONProcessor();

// Streaming large JSON response
async function processLargeDataStream() {
    const response = await fetch('/api/large-dataset');
    const objects = await processor.streamingParse(response);
    
    console.log(`Processed ${objects.length} objects from stream`);
    return objects;
}

// Large array processing
async function processLargeUserList(users) {
    const processed = await processor.processLargeArray(users, user => ({
        ...user,
        processedAt: new Date(),
        fullName: `${user.firstName} ${user.lastName}`
    }));
    
    return processed;
}
```

## Summary

This lesson covered comprehensive JSON data handling including:

1. **Safe Parsing**: Error handling, custom revivers/replacers, type conversion
2. **Validation**: Schema-based validation, custom validators
3. **Transformation**: Data pipelines, key mapping, filtering, sorting
4. **Nested Processing**: Deep merge, flattening, nested value access
5. **Performance**: Caching, streaming, memory-efficient processing

These techniques enable robust handling of JSON data in modern web applications, ensuring data integrity and optimal performance.
