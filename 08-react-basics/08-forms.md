# Forms in React

## Introduction to React Forms

Forms are essential for user interaction in web applications. React provides powerful tools for handling form data, validation, and submission with controlled and uncontrolled components.

## Controlled Components

### Basic Controlled Form

```jsx
import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    // Here you would typically send data to an API
    submitForm(formData);
  };

  const submitForm = async (data) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          required
        />
      </div>
      
      <button type="submit">Send Message</button>
    </form>
  );
}
```

### Different Input Types

```jsx
function RegistrationForm() {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    gender: '',
    interests: [],
    newsletter: false,
    agreeToTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'interests') {
        // Handle checkbox arrays
        setUserData(prev => ({
          ...prev,
          interests: checked 
            ? [...prev.interests, value]
            : prev.interests.filter(interest => interest !== value)
        }));
      } else {
        // Handle single checkbox
        setUserData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setUserData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userData.password !== userData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!userData.agreeToTerms) {
      alert('You must agree to the terms and conditions');
      return;
    }
    
    console.log('Registration data:', userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Text Input */}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          minLength="3"
          required
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={userData.email}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Password Input */}
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={userData.password}
          onChange={handleInputChange}
          minLength="8"
          required
        />
      </div>

      {/* Password Confirmation */}
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* Number Input */}
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={userData.age}
          onChange={handleInputChange}
          min="13"
          max="120"
          required
        />
      </div>

      {/* Select Dropdown */}
      <div>
        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          name="gender"
          value={userData.gender}
          onChange={handleInputChange}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
      </div>

      {/* Checkbox Group */}
      <fieldset>
        <legend>Interests:</legend>
        <div>
          <input
            type="checkbox"
            id="tech"
            name="interests"
            value="technology"
            checked={userData.interests.includes('technology')}
            onChange={handleInputChange}
          />
          <label htmlFor="tech">Technology</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="sports"
            name="interests"
            value="sports"
            checked={userData.interests.includes('sports')}
            onChange={handleInputChange}
          />
          <label htmlFor="sports">Sports</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="music"
            name="interests"
            value="music"
            checked={userData.interests.includes('music')}
            onChange={handleInputChange}
          />
          <label htmlFor="music">Music</label>
        </div>
      </fieldset>

      {/* Single Checkbox */}
      <div>
        <input
          type="checkbox"
          id="newsletter"
          name="newsletter"
          checked={userData.newsletter}
          onChange={handleInputChange}
        />
        <label htmlFor="newsletter">Subscribe to newsletter</label>
      </div>

      {/* Required Checkbox */}
      <div>
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          checked={userData.agreeToTerms}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="agreeToTerms">
          I agree to the <a href="/terms" target="_blank">terms and conditions</a>
        </label>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
```

## Form Validation

### Real-time Validation

```jsx
function ValidatedForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'username':
        if (!value) {
          error = 'Username is required';
        } else if (value.length < 3) {
          error = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          error = 'Username can only contain letters, numbers, and underscores';
        }
        break;

      case 'email':
        if (!value) {
          error = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value) {
          error = 'Password is required';
        } else if (value.length < 8) {
          error = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          error = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;

      case 'confirmPassword':
        if (!value) {
          error = 'Please confirm your password';
        } else if (value !== formData.password) {
          error = 'Passwords do not match';
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field if it has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true
    });

    // Submit if no errors
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted successfully:', formData);
      alert('Registration successful!');
    }
  };

  const getFieldClass = (fieldName) => {
    if (!touched[fieldName]) return '';
    return errors[fieldName] ? 'error' : 'valid';
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClass('username')}
          aria-invalid={errors.username ? 'true' : 'false'}
          aria-describedby={errors.username ? 'username-error' : undefined}
        />
        {errors.username && (
          <span id="username-error" className="error-message" role="alert">
            {errors.username}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClass('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="error-message" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClass('password')}
          aria-invalid={errors.password ? 'true' : 'false'}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        {errors.password && (
          <span id="password-error" className="error-message" role="alert">
            {errors.password}
          </span>
        )}
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          className={getFieldClass('confirmPassword')}
          aria-invalid={errors.confirmPassword ? 'true' : 'false'}
          aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
        />
        {errors.confirmPassword && (
          <span id="confirm-password-error" className="error-message" role="alert">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <button 
        type="submit"
        disabled={Object.values(errors).some(error => error !== '')}
      >
        Register
      </button>
    </form>
  );
}
```

### Custom Form Hook

```jsx
function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (fieldName, value) => {
    if (validationRules[fieldName]) {
      return validationRules[fieldName](value, values);
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({
      ...prev,
      [name]: newValue
    }));

    // Clear error if field becomes valid
    if (touched[name]) {
      const error = validate(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    const error = validate(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAll = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(initialValues).forEach(field => {
      newTouched[field] = true;
      const error = validate(field, values[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid: Object.keys(errors).every(key => !errors[key])
  };
}

// Using the custom hook
function LoginForm() {
  const validationRules = {
    email: (value) => {
      if (!value) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Invalid email format';
      return '';
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    isValid
  } = useForm({ email: '', password: '' }, validationRules);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateAll()) {
      console.log('Login data:', values);
      // Perform login
      performLogin(values);
    }
  };

  const performLogin = async (credentials) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.email && errors.email && (
          <span className="error">{errors.email}</span>
        )}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.password && errors.password && (
          <span className="error">{errors.password}</span>
        )}
      </div>

      <button type="submit" disabled={!isValid}>
        Login
      </button>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </form>
  );
}
```

## Dynamic Forms

### Multi-Step Form

```jsx
function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Step 2: Address
    street: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Preferences
    notifications: false,
    marketing: false,
    newsletter: true
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final form data:', formData);
    alert('Form submitted successfully!');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            data={formData} 
            updateData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <AddressStep 
            data={formData} 
            updateData={updateFormData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <PreferencesStep 
            data={formData} 
            updateData={updateFormData}
            onPrev={prevStep}
            onSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-form">
      <div className="progress-bar">
        <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {renderStep()}
      </form>
    </div>
  );
}

function PersonalInfoStep({ data, updateData, onNext }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!data.firstName) newErrors.firstName = 'First name is required';
    if (!data.lastName) newErrors.lastName = 'Last name is required';
    if (!data.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) newErrors.email = 'Invalid email';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="form-step">
      <h2>Personal Information</h2>
      
      <div>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={data.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={data.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={data.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-navigation">
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}

// Similar components for AddressStep and PreferencesStep...
```

### Dynamic Field Generation

```jsx
function DynamicForm() {
  const [formSchema, setFormSchema] = useState([
    {
      id: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      placeholder: 'Enter your name'
    },
    {
      id: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      placeholder: 'Enter your email'
    }
  ]);

  const [formData, setFormData] = useState({});

  const addField = () => {
    const newField = {
      id: `field_${Date.now()}`,
      type: 'text',
      label: 'New Field',
      required: false,
      placeholder: 'Enter value'
    };
    
    setFormSchema(prev => [...prev, newField]);
  };

  const removeField = (fieldId) => {
    setFormSchema(prev => prev.filter(field => field.id !== fieldId));
    setFormData(prev => {
      const newData = { ...prev };
      delete newData[fieldId];
      return newData;
    });
  };

  const updateField = (fieldId, updates) => {
    setFormSchema(prev => prev.map(field => 
      field.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const handleInputChange = (fieldId, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderField = (field) => {
    const { id, type, label, required, placeholder, options } = field;

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <input
            key={id}
            type={type}
            id={id}
            value={formData[id] || ''}
            onChange={(e) => handleInputChange(id, e.target.value)}
            placeholder={placeholder}
            required={required}
          />
        );

      case 'textarea':
        return (
          <textarea
            key={id}
            id={id}
            value={formData[id] || ''}
            onChange={(e) => handleInputChange(id, e.target.value)}
            placeholder={placeholder}
            required={required}
            rows={4}
          />
        );

      case 'select':
        return (
          <select
            key={id}
            id={id}
            value={formData[id] || ''}
            onChange={(e) => handleInputChange(id, e.target.value)}
            required={required}
          >
            <option value="">Select an option</option>
            {options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'checkbox':
        return (
          <input
            key={id}
            type="checkbox"
            id={id}
            checked={formData[id] || false}
            onChange={(e) => handleInputChange(id, e.target.checked)}
          />
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dynamic form data:', formData);
  };

  return (
    <div className="dynamic-form">
      <h2>Dynamic Form Builder</h2>
      
      <div className="form-builder">
        <h3>Form Fields</h3>
        {formSchema.map(field => (
          <div key={field.id} className="field-builder">
            <div className="field-config">
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateField(field.id, { label: e.target.value })}
                placeholder="Field label"
              />
              
              <select
                value={field.type}
                onChange={(e) => updateField(field.id, { type: e.target.value })}
              >
                <option value="text">Text</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="number">Number</option>
                <option value="textarea">Textarea</option>
                <option value="select">Select</option>
                <option value="checkbox">Checkbox</option>
              </select>
              
              <label>
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                />
                Required
              </label>
              
              <button type="button" onClick={() => removeField(field.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
        
        <button type="button" onClick={addField}>
          Add Field
        </button>
      </div>

      <div className="form-preview">
        <h3>Form Preview</h3>
        <form onSubmit={handleSubmit}>
          {formSchema.map(field => (
            <div key={field.id} className="form-field">
              <label htmlFor={field.id}>
                {field.label}
                {field.required && <span className="required">*</span>}
              </label>
              {renderField(field)}
            </div>
          ))}
          
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
```

## Uncontrolled Components and Refs

### Basic Uncontrolled Form

```jsx
import React, { useRef } from 'react';

function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };
    
    console.log('Form data:', formData);
    
    // Reset form
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          ref={nameRef}
          defaultValue=""
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          ref={emailRef}
          defaultValue=""
          required
        />
      </div>
      
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          ref={messageRef}
          defaultValue=""
          rows="4"
          required
        />
      </div>
      
      <button type="submit">Send</button>
    </form>
  );
}
```

### File Upload Form

```jsx
function FileUploadForm() {
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef();

  const handleFileUpload = async (e) => {
    e.preventDefault();
    
    const file = fileInputRef.current.files[0];
    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('uploading');
      setUploadProgress(0);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Monitor upload progress
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        }
      });

      if (response.ok) {
        setUploadStatus('success');
        setUploadProgress(100);
        fileInputRef.current.value = '';
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload error:', error);
    }
  };

  return (
    <form onSubmit={handleFileUpload}>
      <div>
        <label htmlFor="file">Choose file:</label>
        <input
          type="file"
          id="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          required
        />
      </div>

      {uploadStatus === 'uploading' && (
        <div className="upload-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span>{uploadProgress}%</span>
        </div>
      )}

      {uploadStatus === 'success' && (
        <div className="success-message">
          File uploaded successfully!
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="error-message">
          Upload failed. Please try again.
        </div>
      )}

      <button 
        type="submit" 
        disabled={uploadStatus === 'uploading'}
      >
        {uploadStatus === 'uploading' ? 'Uploading...' : 'Upload File'}
      </button>
    </form>
  );
}
```

## Advanced Form Patterns

### Form with Nested Objects

```jsx
function ProfileForm() {
  const [profile, setProfile] = useState({
    personal: {
      firstName: '',
      lastName: '',
      dateOfBirth: ''
    },
    contact: {
      email: '',
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: ''
      }
    },
    preferences: {
      theme: 'light',
      notifications: {
        email: true,
        sms: false,
        push: true
      }
    }
  });

  const updateNestedField = (path, value) => {
    setProfile(prev => {
      const newProfile = { ...prev };
      const keys = path.split('.');
      let current = newProfile;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newProfile;
    });
  };

  const handleChange = (path) => (e) => {
    const { type, checked, value } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    updateNestedField(path, newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile data:', profile);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Personal Information</legend>
        
        <input
          type="text"
          placeholder="First Name"
          value={profile.personal.firstName}
          onChange={handleChange('personal.firstName')}
        />
        
        <input
          type="text"
          placeholder="Last Name"
          value={profile.personal.lastName}
          onChange={handleChange('personal.lastName')}
        />
        
        <input
          type="date"
          value={profile.personal.dateOfBirth}
          onChange={handleChange('personal.dateOfBirth')}
        />
      </fieldset>

      <fieldset>
        <legend>Contact Information</legend>
        
        <input
          type="email"
          placeholder="Email"
          value={profile.contact.email}
          onChange={handleChange('contact.email')}
        />
        
        <input
          type="tel"
          placeholder="Phone"
          value={profile.contact.phone}
          onChange={handleChange('contact.phone')}
        />
        
        <input
          type="text"
          placeholder="Street Address"
          value={profile.contact.address.street}
          onChange={handleChange('contact.address.street')}
        />
        
        <input
          type="text"
          placeholder="City"
          value={profile.contact.address.city}
          onChange={handleChange('contact.address.city')}
        />
      </fieldset>

      <fieldset>
        <legend>Preferences</legend>
        
        <select
          value={profile.preferences.theme}
          onChange={handleChange('preferences.theme')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
        
        <label>
          <input
            type="checkbox"
            checked={profile.preferences.notifications.email}
            onChange={handleChange('preferences.notifications.email')}
          />
          Email Notifications
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={profile.preferences.notifications.sms}
            onChange={handleChange('preferences.notifications.sms')}
          />
          SMS Notifications
        </label>
      </fieldset>

      <button type="submit">Save Profile</button>
    </form>
  );
}
```

## Form Libraries Integration

### Using Formik (Example Structure)

```jsx
// Example of how you might integrate Formik
// Note: This requires installing Formik library

/*
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
});

function FormikExample() {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <Field type="email" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" />
          </div>
          
          <div>
            <Field type="password" name="password" placeholder="Password" />
            <ErrorMessage name="password" component="div" />
          </div>
          
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
}
*/
```

## Best Practices

### Form Accessibility

```jsx
function AccessibleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  return (
    <form>
      <div className="form-group">
        <label htmlFor="name">
          Full Name <span aria-label="required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={errors.name ? 'true' : 'false'}
          aria-describedby={errors.name ? 'name-error' : 'name-help'}
        />
        <div id="name-help" className="help-text">
          Enter your first and last name
        </div>
        {errors.name && (
          <div id="name-error" className="error-text" role="alert">
            {errors.name}
          </div>
        )}
      </div>

      {/* ...more fields */}
      
      <button type="submit" aria-describedby="submit-help">
        Send Message
      </button>
      <div id="submit-help" className="help-text">
        Your message will be sent to our support team
      </div>
    </form>
  );
}
```

### Performance Optimization

```jsx
import { memo, useCallback, useMemo } from 'react';

const FormField = memo(({ field, value, onChange, error }) => {
  return (
    <div className="form-field">
      <label htmlFor={field.id}>{field.label}</label>
      <input
        type={field.type}
        id={field.id}
        value={value}
        onChange={onChange}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
});

function OptimizedForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState({});

  const fields = useMemo(() => [
    { id: 'name', label: 'Name', type: 'text' },
    { id: 'email', label: 'Email', type: 'email' },
    { id: 'phone', label: 'Phone', type: 'tel' }
  ], []);

  const handleFieldChange = useCallback((fieldId) => (e) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: e.target.value
    }));
  }, []);

  return (
    <form>
      {fields.map(field => (
        <FormField
          key={field.id}
          field={field}
          value={formData[field.id]}
          onChange={handleFieldChange(field.id)}
          error={errors[field.id]}
        />
      ))}
    </form>
  );
}
```

## Testing Forms

### Testing Controlled Components

```jsx
// Example test structure (using Jest and React Testing Library)
/*
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  test('updates input values when typing', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, 'John Doe');
    
    expect(nameInput).toHaveValue('John Doe');
  });

  test('shows validation errors for empty required fields', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: /submit/i });
    await user.click(submitButton);
    
    expect(screen.getByText(/name is required/i)).toBeInTheDocument();
  });

  test('submits form with valid data', async () => {
    const mockSubmit = jest.fn();
    const user = userEvent.setup();
    
    render(<ContactForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: ''
      });
    });
  });
});
*/
```

## Common Patterns and Pitfalls

### Avoiding Common Mistakes

```jsx
// ❌ Bad: Mutating state directly
function BadForm() {
  const [user, setUser] = useState({ name: '', preferences: { theme: 'light' } });
  
  const handleChange = (e) => {
    user.name = e.target.value; // Don't mutate state directly
    setUser(user); // This won't trigger re-render
  };
  
  return <input onChange={handleChange} value={user.name} />;
}

// ✅ Good: Creating new state objects
function GoodForm() {
  const [user, setUser] = useState({ name: '', preferences: { theme: 'light' } });
  
  const handleChange = (e) => {
    setUser(prev => ({
      ...prev,
      name: e.target.value
    }));
  };
  
  return <input onChange={handleChange} value={user.name} />;
}

// ❌ Bad: Not preventing default form submission
function BadSubmitForm() {
  const handleSubmit = () => {
    // This will cause page reload
    console.log('Submitting...');
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}

// ✅ Good: Preventing default behavior
function GoodSubmitForm() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    console.log('Submitting...');
  };
  
  return <form onSubmit={handleSubmit}>...</form>;
}
```

## Exercises

### Exercise 1: Registration Form
Create a complete user registration form with:
- All input types (text, email, password, select, checkbox, radio)
- Real-time validation
- Password confirmation
- Terms agreement checkbox
- Form submission handling

### Exercise 2: Multi-Step Wizard
Build a multi-step form wizard:
- 3-4 steps with different content
- Progress indicator
- Navigation between steps
- Data persistence across steps
- Final review step

### Exercise 3: Dynamic Survey Form
Create a survey form that:
- Loads questions from an array/API
- Supports different question types
- Implements conditional logic (show/hide questions)
- Calculates progress
- Saves responses locally

### Exercise 4: Form Builder
Build a form builder application:
- Drag and drop interface
- Field configuration panel
- Live preview
- Export form schema
- Import existing forms

## Key Takeaways

- **Controlled vs Uncontrolled**: Prefer controlled components for most use cases
- **Validation**: Implement both client-side and server-side validation
- **Accessibility**: Use proper labels, ARIA attributes, and semantic HTML
- **Performance**: Memoize callbacks and optimize re-renders
- **User Experience**: Provide clear feedback and error messages
- **Testing**: Write comprehensive tests for form behavior
- **State Management**: Keep form state organized and immutable

## Next Steps

In the next lesson, we'll explore Conditional Rendering patterns, learning how to dynamically show and hide content based on application state and user interactions.
