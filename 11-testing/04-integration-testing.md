# Integration Testing Strategies

## 🎯 Learning Objectives
- Understand integration testing principles and scope
- Master API integration testing techniques
- Implement database integration testing
- Test component interactions effectively
- Use Mock Service Worker (MSW) for realistic API mocking
- Implement contract testing fundamentals

## What is Integration Testing?

Integration testing verifies that different modules or services work correctly together. Unlike unit tests that isolate components, integration tests focus on the interactions between components.

### Integration Test Scope

```javascript
// Example: Testing user service integration with multiple dependencies
class UserService {
  constructor(database, emailService, validationService) {
    this.database = database;
    this.emailService = emailService;
    this.validationService = validationService;
  }

  async createUser(userData) {
    // Validation
    const validationResult = await this.validationService.validateUser(userData);
    if (!validationResult.isValid) {
      throw new Error(`Validation failed: ${validationResult.errors.join(', ')}`);
    }

    // Database operation
    const user = await this.database.createUser({
      ...userData,
      id: generateId(),
      createdAt: new Date(),
      isVerified: false
    });

    // Email operation
    await this.emailService.sendWelcomeEmail(user.email, {
      name: user.name,
      verificationToken: user.verificationToken
    });

    return user;
  }
}
```

## API Integration Testing

### Testing REST API Endpoints

```javascript
// apiClient.js
class ApiClient {
  constructor(baseUrl, authToken) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  async get(endpoint) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  async post(endpoint, data) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HTTP ${response.status}: ${errorData.message}`);
    }

    return response.json();
  }
}

// apiClient.integration.test.js
describe('API Client Integration Tests', () => {
  let apiClient;
  let mockServer;

  beforeAll(async () => {
    // Start test server
    mockServer = await startTestServer();
    apiClient = new ApiClient('http://localhost:3001', 'test-token');
  });

  afterAll(async () => {
    await mockServer.close();
  });

  describe('User API Integration', () => {
    test('should fetch user list successfully', async () => {
      // Arrange
      const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
      ];
      
      // Mock server response
      mockServer.get('/users', (req, res) => {
        res.json(mockUsers);
      });

      // Act
      const users = await apiClient.get('/users');

      // Assert
      expect(users).toEqual(mockUsers);
      expect(users).toHaveLength(2);
    });

    test('should create user and return created data', async () => {
      // Arrange
      const newUser = {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        role: 'user'
      };

      const createdUser = {
        id: 3,
        ...newUser,
        createdAt: '2023-01-01T00:00:00.000Z'
      };

      mockServer.post('/users', (req, res) => {
        expect(req.body).toEqual(newUser);
        res.status(201).json(createdUser);
      });

      // Act
      const result = await apiClient.post('/users', newUser);

      // Assert
      expect(result).toEqual(createdUser);
      expect(result.id).toBe(3);
    });

    test('should handle API errors gracefully', async () => {
      // Arrange
      mockServer.get('/users/999', (req, res) => {
        res.status(404).json({ message: 'User not found' });
      });

      // Act & Assert
      await expect(apiClient.get('/users/999'))
        .rejects.toThrow('HTTP 404: User not found');
    });
  });
});
```

### Mock Service Worker (MSW) for API Mocking

```javascript
// mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Users API
  rest.get('/api/users', (req, res, ctx) => {
    const page = req.url.searchParams.get('page') || '1';
    const limit = req.url.searchParams.get('limit') || '10';
    
    const users = Array.from({ length: parseInt(limit) }, (_, index) => ({
      id: (parseInt(page) - 1) * parseInt(limit) + index + 1,
      name: `User ${(parseInt(page) - 1) * parseInt(limit) + index + 1}`,
      email: `user${(parseInt(page) - 1) * parseInt(limit) + index + 1}@example.com`
    }));

    return res(
      ctx.status(200),
      ctx.json({
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 100,
          hasMore: parseInt(page) * parseInt(limit) < 100
        }
      })
    );
  }),

  rest.post('/api/users', async (req, res, ctx) => {
    const userData = await req.json();
    
    // Validation simulation
    if (!userData.email || !userData.name) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Email and name are required' })
      );
    }

    const createdUser = {
      id: Math.floor(Math.random() * 1000),
      ...userData,
      createdAt: new Date().toISOString()
    };

    return res(
      ctx.status(201),
      ctx.json(createdUser)
    );
  }),

  rest.get('/api/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    
    if (id === '999') {
      return res(
        ctx.status(404),
        ctx.json({ message: 'User not found' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        id: parseInt(id),
        name: `User ${id}`,
        email: `user${id}@example.com`
      })
    );
  })
];

// mocks/server.js
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

// setupTests.js
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// userService.integration.test.js
import { server } from '../mocks/server';
import { rest } from 'msw';
import { UserService } from './userService';

describe('UserService Integration with API', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService('http://localhost/api');
  });

  test('should fetch paginated users', async () => {
    const result = await userService.getUsers({ page: 1, limit: 5 });

    expect(result.users).toHaveLength(5);
    expect(result.pagination.page).toBe(1);
    expect(result.pagination.limit).toBe(5);
  });

  test('should handle network errors', async () => {
    // Override handler for this test
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res.networkError('Network connection failed');
      })
    );

    await expect(userService.getUsers())
      .rejects.toThrow('Network connection failed');
  });

  test('should retry failed requests', async () => {
    let attempts = 0;
    
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        attempts++;
        if (attempts < 3) {
          return res(ctx.status(500));
        }
        return res(ctx.json({ users: [] }));
      })
    );

    const result = await userService.getUsers();
    
    expect(attempts).toBe(3);
    expect(result.users).toEqual([]);
  });
});
```

## Database Integration Testing

### Testing with Test Database

```javascript
// database/testDb.js
import { Pool } from 'pg';

class TestDatabase {
  constructor() {
    this.pool = new Pool({
      user: 'test',
      host: 'localhost',
      database: 'test_db',
      password: 'test',
      port: 5432,
    });
  }

  async query(text, params) {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  }

  async setupTables() {
    await this.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_active BOOLEAN DEFAULT true
      )
    `);

    await this.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        published BOOLEAN DEFAULT false
      )
    `);
  }

  async seedTestData() {
    // Insert test users
    await this.query(`
      INSERT INTO users (name, email, role) VALUES
      ('John Doe', 'john@example.com', 'admin'),
      ('Jane Smith', 'jane@example.com', 'user'),
      ('Bob Wilson', 'bob@example.com', 'user')
      ON CONFLICT (email) DO NOTHING
    `);

    // Insert test posts
    await this.query(`
      INSERT INTO posts (title, content, user_id, published) VALUES
      ('First Post', 'This is the first post', 1, true),
      ('Draft Post', 'This is a draft', 2, false),
      ('Published Post', 'This is published', 2, true)
    `);
  }

  async cleanup() {
    await this.query('TRUNCATE TABLE posts, users RESTART IDENTITY CASCADE');
  }

  async close() {
    await this.pool.end();
  }
}

// userRepository.js
class UserRepository {
  constructor(database) {
    this.db = database;
  }

  async findById(id) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  async findByEmail(email) {
    const result = await this.db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  async create(userData) {
    const { name, email, role = 'user' } = userData;
    const result = await this.db.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING *',
      [name, email, role]
    );
    return result.rows[0];
  }

  async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    
    const result = await this.db.query(
      `UPDATE users SET ${setClause} WHERE id = $1 RETURNING *`,
      [id, ...values]
    );
    return result.rows[0];
  }

  async delete(id) {
    const result = await this.db.query(
      'DELETE FROM users WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }

  async findUsersWithPosts() {
    const result = await this.db.query(`
      SELECT 
        u.id, u.name, u.email, u.role,
        COUNT(p.id) as post_count,
        ARRAY_AGG(
          CASE WHEN p.id IS NOT NULL THEN
            json_build_object(
              'id', p.id,
              'title', p.title,
              'published', p.published
            )
          END
        ) FILTER (WHERE p.id IS NOT NULL) as posts
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      GROUP BY u.id, u.name, u.email, u.role
      ORDER BY u.id
    `);
    return result.rows;
  }
}

// userRepository.integration.test.js
describe('UserRepository Integration Tests', () => {
  let testDb;
  let userRepository;

  beforeAll(async () => {
    testDb = new TestDatabase();
    await testDb.setupTables();
    userRepository = new UserRepository(testDb);
  });

  beforeEach(async () => {
    await testDb.cleanup();
    await testDb.seedTestData();
  });

  afterAll(async () => {
    await testDb.close();
  });

  describe('User CRUD operations', () => {
    test('should create new user', async () => {
      const userData = {
        name: 'Alice Cooper',
        email: 'alice@example.com',
        role: 'admin'
      };

      const createdUser = await userRepository.create(userData);

      expect(createdUser).toMatchObject(userData);
      expect(createdUser.id).toBeDefined();
      expect(createdUser.created_at).toBeDefined();
      expect(createdUser.is_active).toBe(true);
    });

    test('should find user by ID', async () => {
      const user = await userRepository.findById(1);

      expect(user).toMatchObject({
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'admin'
      });
    });

    test('should find user by email', async () => {
      const user = await userRepository.findByEmail('jane@example.com');

      expect(user).toMatchObject({
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'user'
      });
    });

    test('should update user data', async () => {
      const updates = {
        name: 'John Updated',
        role: 'super_admin'
      };

      const updatedUser = await userRepository.update(1, updates);

      expect(updatedUser.name).toBe('John Updated');
      expect(updatedUser.role).toBe('super_admin');
      expect(updatedUser.email).toBe('john@example.com'); // Unchanged
    });

    test('should delete user', async () => {
      const deletedUser = await userRepository.delete(1);

      expect(deletedUser.id).toBe(1);

      // Verify user is deleted
      const user = await userRepository.findById(1);
      expect(user).toBeUndefined();
    });

    test('should handle duplicate email constraint', async () => {
      const userData = {
        name: 'Duplicate User',
        email: 'john@example.com', // Already exists
        role: 'user'
      };

      await expect(userRepository.create(userData))
        .rejects.toThrow(/duplicate key value violates unique constraint/);
    });
  });

  describe('Complex queries', () => {
    test('should fetch users with their posts', async () => {
      const usersWithPosts = await userRepository.findUsersWithPosts();

      expect(usersWithPosts).toHaveLength(3);
      
      // John (admin) has 1 post
      const john = usersWithPosts.find(u => u.email === 'john@example.com');
      expect(john.post_count).toBe('1');
      expect(john.posts).toHaveLength(1);
      expect(john.posts[0].title).toBe('First Post');

      // Jane has 2 posts
      const jane = usersWithPosts.find(u => u.email === 'jane@example.com');
      expect(jane.post_count).toBe('2');
      expect(jane.posts).toHaveLength(2);

      // Bob has no posts
      const bob = usersWithPosts.find(u => u.email === 'bob@example.com');
      expect(bob.post_count).toBe('0');
      expect(bob.posts).toBeNull();
    });
  });

  describe('Transaction testing', () => {
    test('should rollback on error', async () => {
      const client = await testDb.pool.connect();
      
      try {
        await client.query('BEGIN');
        
        // Create a user
        await client.query(
          'INSERT INTO users (name, email) VALUES ($1, $2)',
          ['Transaction User', 'transaction@example.com']
        );
        
        // This should fail due to duplicate email
        await client.query(
          'INSERT INTO users (name, email) VALUES ($1, $2)',
          ['Another User', 'transaction@example.com']
        );
        
        await client.query('COMMIT');
      } catch (error) {
        await client.query('ROLLBACK');
      } finally {
        client.release();
      }

      // Verify no user was created
      const user = await userRepository.findByEmail('transaction@example.com');
      expect(user).toBeUndefined();
    });
  });
});
```

## Component Integration Testing

### Testing React Component Interactions

```javascript
// components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { UserService } from '../services/UserService';
import { NotificationService } from '../services/NotificationService';

export function UserProfile({ userId, onUserUpdate }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUser();
  }, [userId]);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await UserService.getUser(userId);
      setUser(userData);
    } catch (err) {
      setError(err.message);
      NotificationService.showError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (userData) => {
    try {
      setLoading(true);
      const updatedUser = await UserService.updateUser(userId, userData);
      setUser(updatedUser);
      setEditing(false);
      onUserUpdate?.(updatedUser);
      NotificationService.showSuccess('Profile updated successfully');
    } catch (err) {
      setError(err.message);
      NotificationService.showError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div data-testid="loading">Loading...</div>;
  if (error) return <div data-testid="error">Error: {error}</div>;
  if (!user) return <div data-testid="not-found">User not found</div>;

  return (
    <div data-testid="user-profile">
      {editing ? (
        <UserEditForm
          user={user}
          onSave={handleSave}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <UserDisplayView
          user={user}
          onEdit={() => setEditing(true)}
        />
      )}
    </div>
  );
}

// UserProfile.integration.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserProfile } from './UserProfile';
import { UserService } from '../services/UserService';
import { NotificationService } from '../services/NotificationService';

// Mock services
jest.mock('../services/UserService');
jest.mock('../services/NotificationService');

const mockUserService = UserService as jest.Mocked<typeof UserService>;
const mockNotificationService = NotificationService as jest.Mocked<typeof NotificationService>;

describe('UserProfile Integration Tests', () => {
  const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    bio: 'Software developer'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should load and display user profile', async () => {
    mockUserService.getUser.mockResolvedValueOnce(mockUser);

    const onUserUpdate = jest.fn();
    render(<UserProfile userId={1} onUserUpdate={onUserUpdate} />);

    // Should show loading initially
    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Should load and display user data
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(mockUserService.getUser).toHaveBeenCalledWith(1);
  });

  test('should handle edit and save workflow', async () => {
    const user = userEvent.setup();
    mockUserService.getUser.mockResolvedValueOnce(mockUser);
    
    const updatedUser = { ...mockUser, name: 'John Updated' };
    mockUserService.updateUser.mockResolvedValueOnce(updatedUser);

    const onUserUpdate = jest.fn();
    render(<UserProfile userId={1} onUserUpdate={onUserUpdate} />);

    // Wait for user to load
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    // Click edit button
    await user.click(screen.getByRole('button', { name: /edit/i }));

    // Should show edit form
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();

    // Update name
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    await user.clear(nameInput);
    await user.type(nameInput, 'John Updated');

    // Save changes
    await user.click(screen.getByRole('button', { name: /save/i }));

    // Should call update service
    await waitFor(() => {
      expect(mockUserService.updateUser).toHaveBeenCalledWith(1, {
        ...mockUser,
        name: 'John Updated'
      });
    });

    // Should call callback
    expect(onUserUpdate).toHaveBeenCalledWith(updatedUser);

    // Should show success notification
    expect(mockNotificationService.showSuccess).toHaveBeenCalledWith(
      'Profile updated successfully'
    );

    // Should return to display view
    expect(screen.getByText('John Updated')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /name/i })).not.toBeInTheDocument();
  });

  test('should handle API errors gracefully', async () => {
    const error = new Error('Failed to load user');
    mockUserService.getUser.mockRejectedValueOnce(error);

    render(<UserProfile userId={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText('Error: Failed to load user')).toBeInTheDocument();
    expect(mockNotificationService.showError).toHaveBeenCalledWith(
      'Failed to load user profile'
    );
  });

  test('should handle save errors and stay in edit mode', async () => {
    const user = userEvent.setup();
    mockUserService.getUser.mockResolvedValueOnce(mockUser);
    mockUserService.updateUser.mockRejectedValueOnce(new Error('Save failed'));

    render(<UserProfile userId={1} />);

    // Wait for user to load and enter edit mode
    await waitFor(() => {
      expect(screen.getByTestId('user-profile')).toBeInTheDocument();
    });

    await user.click(screen.getByRole('button', { name: /edit/i }));

    // Try to save
    await user.click(screen.getByRole('button', { name: /save/i }));

    await waitFor(() => {
      expect(mockNotificationService.showError).toHaveBeenCalledWith(
        'Failed to update profile'
      );
    });

    // Should stay in edit mode
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
  });
});
```

## Contract Testing

### API Contract Testing with Pact

```javascript
// consumer.pact.test.js
import { Pact } from '@pact-foundation/pact';
import { UserApiClient } from './UserApiClient';

describe('User API Pact Tests', () => {
  const provider = new Pact({
    consumer: 'frontend-app',
    provider: 'user-service',
    port: 1234,
    log: './logs/pact.log',
    dir: './pacts',
    logLevel: 'INFO'
  });

  beforeAll(() => provider.setup());
  afterEach(() => provider.verify());
  afterAll(() => provider.finalize());

  describe('Get User by ID', () => {
    test('should return user when valid ID provided', async () => {
      // Arrange
      const expectedUser = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        role: 'user'
      };

      await provider.addInteraction({
        state: 'user with ID 1 exists',
        uponReceiving: 'a request for user with ID 1',
        withRequest: {
          method: 'GET',
          path: '/api/users/1',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer token123'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: expectedUser
        }
      });

      // Act
      const client = new UserApiClient('http://localhost:1234');
      const user = await client.getUser(1);

      // Assert
      expect(user).toEqual(expectedUser);
    });

    test('should return 404 when user not found', async () => {
      await provider.addInteraction({
        state: 'user with ID 999 does not exist',
        uponReceiving: 'a request for user with ID 999',
        withRequest: {
          method: 'GET',
          path: '/api/users/999',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer token123'
          }
        },
        willRespondWith: {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          },
          body: {
            error: 'User not found'
          }
        }
      });

      const client = new UserApiClient('http://localhost:1234');
      
      await expect(client.getUser(999))
        .rejects.toThrow('User not found');
    });
  });
});
```

## Performance Integration Testing

### Testing Response Times and Load

```javascript
// performance.integration.test.js
describe('Performance Integration Tests', () => {
  let apiClient;

  beforeEach(() => {
    apiClient = new ApiClient('http://localhost:3000');
  });

  test('should respond within acceptable time limits', async () => {
    const startTime = Date.now();
    
    await apiClient.get('/api/users?limit=100');
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
  });

  test('should handle concurrent requests efficiently', async () => {
    const concurrentRequests = 10;
    const requests = Array(concurrentRequests).fill(null).map((_, index) => 
      apiClient.get(`/api/users/${index + 1}`)
    );

    const startTime = Date.now();
    const results = await Promise.all(requests);
    const endTime = Date.now();

    const totalTime = endTime - startTime;
    const averageTime = totalTime / concurrentRequests;

    expect(results).toHaveLength(concurrentRequests);
    expect(averageTime).toBeLessThan(500); // Average should be under 500ms
  });

  test('should handle rate limiting gracefully', async () => {
    const requests = Array(100).fill(null).map(() => 
      apiClient.get('/api/users')
    );

    const results = await Promise.allSettled(requests);
    
    const successful = results.filter(r => r.status === 'fulfilled');
    const rateLimited = results.filter(r => 
      r.status === 'rejected' && r.reason.message.includes('429')
    );

    expect(successful.length).toBeGreaterThan(0);
    expect(rateLimited.length).toBeGreaterThan(0);
  });
});
```

## Best Practices for Integration Testing

### 1. Test Environment Management

```javascript
// testEnvironment.js
class TestEnvironment {
  static async setup() {
    // Start test database
    await this.startTestDatabase();
    
    // Start mock services
    await this.startMockServices();
    
    // Seed test data
    await this.seedTestData();
    
    console.log('Test environment ready');
  }

  static async teardown() {
    // Clean up data
    await this.cleanupTestData();
    
    // Stop services
    await this.stopServices();
    
    console.log('Test environment cleaned up');
  }

  static async resetBetweenTests() {
    // Reset to known state
    await this.resetTestData();
    
    // Clear caches
    await this.clearCaches();
  }
}

// In test files
beforeAll(async () => {
  await TestEnvironment.setup();
});

afterAll(async () => {
  await TestEnvironment.teardown();
});

beforeEach(async () => {
  await TestEnvironment.resetBetweenTests();
});
```

### 2. Data Management Patterns

```javascript
// testDataManager.js
class TestDataManager {
  constructor(database) {
    this.db = database;
    this.createdIds = new Set();
  }

  async createUser(overrides = {}) {
    const userData = {
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      role: 'user',
      ...overrides
    };

    const user = await this.db.createUser(userData);
    this.createdIds.add(`user:${user.id}`);
    return user;
  }

  async createPost(userId, overrides = {}) {
    const postData = {
      title: 'Test Post',
      content: 'Test content',
      userId,
      ...overrides
    };

    const post = await this.db.createPost(postData);
    this.createdIds.add(`post:${post.id}`);
    return post;
  }

  async cleanup() {
    // Clean up in reverse order of creation
    for (const id of Array.from(this.createdIds).reverse()) {
      const [type, entityId] = id.split(':');
      
      if (type === 'post') {
        await this.db.deletePost(entityId);
      } else if (type === 'user') {
        await this.db.deleteUser(entityId);
      }
    }
    
    this.createdIds.clear();
  }
}
```

### 3. Async Testing Patterns

```javascript
// Waiting for async operations
test('should process async operations correctly', async () => {
  const result = await userService.processUser(userData);
  
  // Wait for async side effects
  await waitFor(async () => {
    const notifications = await notificationService.getNotifications(result.id);
    expect(notifications).toHaveLength(1);
  });
  
  // Or with custom polling
  await waitForCondition(
    async () => {
      const status = await jobService.getJobStatus(result.jobId);
      return status === 'completed';
    },
    { timeout: 10000, interval: 100 }
  );
});

async function waitForCondition(condition, options = {}) {
  const { timeout = 5000, interval = 100 } = options;
  const startTime = Date.now();
  
  while (Date.now() - startTime < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, interval));
  }
  
  throw new Error(`Condition not met within ${timeout}ms`);
}
```

## Common Integration Testing Pitfalls

### ❌ Pitfalls to Avoid

1. **Shared Test State**
   ```javascript
   // ❌ Bad - tests affect each other
   describe('User tests', () => {
     const user = { id: 1, name: 'John' };
     
     test('should update user name', () => {
       user.name = 'Updated John';
       expect(updateUser(user)).toBeTruthy();
     });
     
     test('should have original name', () => {
       expect(user.name).toBe('John'); // Fails!
     });
   });
   ```

2. **Testing Implementation Instead of Integration**
   ```javascript
   // ❌ Bad - testing mocked interactions
   test('should call database method', () => {
     const mockDb = jest.fn();
     const service = new UserService(mockDb);
     
     service.getUser(1);
     
     expect(mockDb).toHaveBeenCalled(); // Not testing integration
   });
   ```

3. **Slow and Unreliable Tests**
   ```javascript
   // ❌ Bad - using real external services
   test('should send email', async () => {
     await emailService.send('real@email.com', 'Subject', 'Body');
     // This is slow and unreliable
   });
   ```

### ✅ Best Practices

1. **Isolated Test Data**
   ```javascript
   // ✅ Good - each test creates own data
   beforeEach(async () => {
     testUser = await testDataManager.createUser();
   });
   
   afterEach(async () => {
     await testDataManager.cleanup();
   });
   ```

2. **Test Real Integrations with Controlled Environment**
   ```javascript
   // ✅ Good - testing real integration with test environment
   test('should save user to database', async () => {
     const user = await userService.create(userData);
     
     // Verify in database
     const savedUser = await testDb.findUser(user.id);
     expect(savedUser).toMatchObject(userData);
   });
   ```

## 🏃‍♂️ Hands-on Exercise

Build integration tests for a blog application with the following features:

1. **User Management**: Registration, authentication, profile updates
2. **Post Management**: Create, read, update, delete posts
3. **Comment System**: Add comments to posts
4. **Email Notifications**: Send notifications for new comments

Your tests should cover:
- API endpoint integration
- Database operations
- Service interactions
- Error handling
- Performance characteristics

## Key Takeaways

- **Test Real Interactions**: Focus on how components work together
- **Use Test Doubles Strategically**: Mock external services, use real internal components
- **Environment Management**: Set up isolated, reproducible test environments
- **Data Management**: Create and clean up test data systematically
- **Performance Awareness**: Monitor response times and resource usage
- **Contract Testing**: Ensure API contracts are maintained between services

## Next Steps

In the next lesson, we'll explore **End-to-End Testing with Cypress**, where you'll learn to test complete user workflows and ensure your application works correctly from the user's perspective.

---

**Resources:**
- [Testing Library Integration Testing](https://testing-library.com/docs/ecosystem-user-event/)
- [Mock Service Worker Documentation](https://mswjs.io/)
- [Pact Contract Testing](https://pact.io/)
- [Database Testing Best Practices](https://www.ontestautomation.com/database-testing-best-practices/)
