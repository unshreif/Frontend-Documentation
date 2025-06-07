# Forms and Input Elements - Complete Guide

## Form Structure and Basics

### The Form Element
```html
<!-- Basic form structure -->
<form action="/submit-contact" method="POST" enctype="multipart/form-data">
    <!-- Form controls go here -->
</form>

<!-- Form attributes explained -->
<form 
    action="/process-form"           <!-- Where to send data -->
    method="POST"                    <!-- HTTP method (GET/POST) -->
    enctype="application/x-www-form-urlencoded"  <!-- Default encoding -->
    target="_blank"                  <!-- Where to display response -->
    novalidate                       <!-- Disable browser validation -->
    autocomplete="on"                <!-- Enable autocomplete -->
    name="contactForm"               <!-- Form name for JavaScript -->
    id="contact-form">               <!-- Unique identifier -->
    
    <!-- Form content -->
</form>

<!-- Different encoding types -->
<!-- For text data (default) -->
<form enctype="application/x-www-form-urlencoded">

<!-- For file uploads -->
<form enctype="multipart/form-data">

<!-- For plain text (rarely used) -->
<form enctype="text/plain">
```

### Form Methods in Detail
```html
<!-- GET method - data in URL, visible, limited size -->
<form action="/search" method="GET">
    <label for="query">Search:</label>
    <input type="text" id="query" name="q" placeholder="Enter search terms">
    <button type="submit">Search</button>
</form>
<!-- Results in: /search?q=user+input -->

<!-- POST method - data in request body, hidden, unlimited size -->
<form action="/register" method="POST">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required>
    
    <button type="submit">Register</button>
</form>

<!-- Form without action submits to same page -->
<form method="POST">
    <input type="text" name="feedback" placeholder="Your feedback">
    <button type="submit">Submit Feedback</button>
</form>
```

## Text Input Elements

### Basic Text Inputs
```html
<!-- Text input variations -->
<form>
    <!-- Basic text input -->
    <label for="firstName">First Name:</label>
    <input type="text" 
           id="firstName" 
           name="firstName" 
           value="Default value"
           placeholder="Enter your first name"
           maxlength="50"
           minlength="2"
           required
           autocomplete="given-name"
           spellcheck="true">
    
    <!-- Password input -->
    <label for="password">Password:</label>
    <input type="password" 
           id="password" 
           name="password" 
           placeholder="Enter secure password"
           minlength="8"
           maxlength="128"
           pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
           title="Password must contain at least 8 characters including uppercase, lowercase, number and special character"
           required
           autocomplete="new-password">
    
    <!-- Email input with validation -->
    <label for="email">Email Address:</label>
    <input type="email" 
           id="email" 
           name="email" 
           placeholder="user@example.com"
           pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
           title="Please enter a valid email address"
           required
           autocomplete="email">
    
    <!-- Phone number -->
    <label for="phone">Phone Number:</label>
    <input type="tel" 
           id="phone" 
           name="phone" 
           placeholder="+1 (555) 123-4567"
           pattern="[\+]?[\d\s\-\(\)]{10,}"
           title="Please enter a valid phone number"
           autocomplete="tel">
    
    <!-- URL input -->
    <label for="website">Website:</label>
    <input type="url" 
           id="website" 
           name="website" 
           placeholder="https://www.example.com"
           pattern="https?://.+"
           title="Please enter a valid URL starting with http:// or https://"
           autocomplete="url">
</form>
```

### Advanced Text Inputs
```html
<!-- Search input with datalist -->
<label for="productSearch">Product Search:</label>
<input type="search" 
       id="productSearch" 
       name="productSearch" 
       list="products"
       placeholder="Start typing product name..."
       autocomplete="off">

<datalist id="products">
    <option value="Laptop">
    <option value="Desktop Computer">
    <option value="Tablet">
    <option value="Smartphone">
    <option value="Smart Watch">
    <option value="Headphones">
    <option value="Keyboard">
    <option value="Mouse">
</datalist>

<!-- Hidden inputs for form data -->
<input type="hidden" name="formVersion" value="2.1">
<input type="hidden" name="timestamp" value="">
<input type="hidden" name="userId" value="12345">

<!-- Readonly and disabled inputs -->
<label for="username">Username (cannot be changed):</label>
<input type="text" 
       id="username" 
       name="username" 
       value="johndoe123" 
       readonly>

<label for="accountType">Account Type:</label>
<input type="text" 
       id="accountType" 
       name="accountType" 
       value="Premium" 
       disabled>

<!-- Multi-line text -->
<label for="comments">Additional Comments:</label>
<textarea id="comments" 
          name="comments" 
          rows="5" 
          cols="40"
          maxlength="500"
          placeholder="Enter your comments here (max 500 characters)"
          wrap="soft"
          required></textarea>

<!-- Character counter for textarea -->
<div class="char-counter">
    <span id="charCount">0</span>/500 characters
</div>
```

## Number and Date Inputs

### Number Inputs
```html
<!-- Basic number input -->
<label for="age">Age:</label>
<input type="number" 
       id="age" 
       name="age" 
       min="13" 
       max="120" 
       step="1" 
       value="25"
       required>

<!-- Price with decimal steps -->
<label for="price">Price ($):</label>
<input type="number" 
       id="price" 
       name="price" 
       min="0" 
       max="999999.99" 
       step="0.01" 
       placeholder="0.00">

<!-- Quantity with specific increments -->
<label for="quantity">Quantity (dozens):</label>
<input type="number" 
       id="quantity" 
       name="quantity" 
       min="1" 
       max="100" 
       step="12" 
       value="12">

<!-- Range slider -->
<label for="volume">Volume Level:</label>
<input type="range" 
       id="volume" 
       name="volume" 
       min="0" 
       max="100" 
       step="5" 
       value="50"
       oninput="updateVolumeDisplay(this.value)">
<output id="volumeDisplay">50</output>%

<!-- Dual range for price filtering -->
<fieldset>
    <legend>Price Range</legend>
    <label for="minPrice">Min Price: $</label>
    <input type="range" id="minPrice" name="minPrice" min="0" max="1000" value="100">
    <output id="minPriceDisplay">100</output>
    
    <label for="maxPrice">Max Price: $</label>
    <input type="range" id="maxPrice" name="maxPrice" min="0" max="1000" value="500">
    <output id="maxPriceDisplay">500</output>
</fieldset>
```

### Date and Time Inputs
```html
<!-- Date picker -->
<label for="birthDate">Birth Date:</label>
<input type="date" 
       id="birthDate" 
       name="birthDate" 
       min="1900-01-01" 
       max="2023-12-31"
       value="1990-01-01"
       required>

<!-- Date range for events -->
<fieldset>
    <legend>Event Duration</legend>
    <label for="startDate">Start Date:</label>
    <input type="date" id="startDate" name="startDate" required>
    
    <label for="endDate">End Date:</label>
    <input type="date" id="endDate" name="endDate" required>
</fieldset>

<!-- Time picker -->
<label for="appointmentTime">Appointment Time:</label>
<input type="time" 
       id="appointmentTime" 
       name="appointmentTime" 
       min="09:00" 
       max="17:00" 
       step="1800"
       value="10:00"
       required>

<!-- DateTime local -->
<label for="eventDateTime">Event Date & Time:</label>
<input type="datetime-local" 
       id="eventDateTime" 
       name="eventDateTime" 
       min="2023-01-01T00:00" 
       max="2024-12-31T23:59"
       required>

<!-- Month picker -->
<label for="creditCardExpiry">Credit Card Expiry:</label>
<input type="month" 
       id="creditCardExpiry" 
       name="creditCardExpiry" 
       min="2023-01"
       required>

<!-- Week picker -->
<label for="vacationWeek">Vacation Week:</label>
<input type="week" 
       id="vacationWeek" 
       name="vacationWeek" 
       min="2023-W01" 
       max="2024-W52">
```

## Selection Elements

### Radio Buttons
```html
<!-- Basic radio button group -->
<fieldset>
    <legend>Preferred Contact Method</legend>
    
    <input type="radio" id="contactEmail" name="contactMethod" value="email" checked>
    <label for="contactEmail">Email</label>
    
    <input type="radio" id="contactPhone" name="contactMethod" value="phone">
    <label for="contactPhone">Phone</label>
    
    <input type="radio" id="contactSms" name="contactMethod" value="sms">
    <label for="contactSms">SMS</label>
    
    <input type="radio" id="contactMail" name="contactMethod" value="mail">
    <label for="contactMail">Postal Mail</label>
</fieldset>

<!-- Radio buttons with descriptions -->
<fieldset>
    <legend>Subscription Plan</legend>
    
    <div class="radio-option">
        <input type="radio" id="planBasic" name="plan" value="basic" data-price="9.99">
        <label for="planBasic">
            <strong>Basic Plan</strong> - $9.99/month
            <br>
            <small>Up to 5 projects, 1GB storage, Email support</small>
        </label>
    </div>
    
    <div class="radio-option">
        <input type="radio" id="planPro" name="plan" value="pro" data-price="19.99" checked>
        <label for="planPro">
            <strong>Pro Plan</strong> - $19.99/month
            <br>
            <small>Unlimited projects, 10GB storage, Priority support</small>
        </label>
    </div>
    
    <div class="radio-option">
        <input type="radio" id="planEnterprise" name="plan" value="enterprise" data-price="49.99">
        <label for="planEnterprise">
            <strong>Enterprise Plan</strong> - $49.99/month
            <br>
            <small>Everything in Pro + Custom integrations, Dedicated support</small>
        </label>
    </div>
</fieldset>
```

### Checkboxes
```html
<!-- Single checkbox for agreements -->
<div class="checkbox-group">
    <input type="checkbox" id="agreeTerms" name="agreeTerms" value="yes" required>
    <label for="agreeTerms">
        I agree to the <a href="/terms" target="_blank">Terms of Service</a> 
        and <a href="/privacy" target="_blank">Privacy Policy</a>
    </label>
</div>

<div class="checkbox-group">
    <input type="checkbox" id="newsletter" name="newsletter" value="yes" checked>
    <label for="newsletter">Subscribe to our newsletter for updates and promotions</label>
</div>

<!-- Multiple checkbox selection -->
<fieldset>
    <legend>Areas of Interest (Select all that apply)</legend>
    
    <div class="checkbox-group">
        <input type="checkbox" id="interestTech" name="interests" value="technology">
        <label for="interestTech">Technology</label>
    </div>
    
    <div class="checkbox-group">
        <input type="checkbox" id="interestDesign" name="interests" value="design">
        <label for="interestDesign">Design</label>
    </div>
    
    <div class="checkbox-group">
        <input type="checkbox" id="interestMarketing" name="interests" value="marketing">
        <label for="interestMarketing">Marketing</label>
    </div>
    
    <div class="checkbox-group">
        <input type="checkbox" id="interestBusiness" name="interests" value="business">
        <label for="interestBusiness">Business</label>
    </div>
    
    <div class="checkbox-group">
        <input type="checkbox" id="interestEducation" name="interests" value="education">
        <label for="interestEducation">Education</label>
    </div>
</fieldset>

<!-- Checkbox with indeterminate state (JavaScript controlled) -->
<div class="checkbox-group">
    <input type="checkbox" id="selectAll" onchange="toggleAll(this)">
    <label for="selectAll">Select All Items</label>
</div>

<div class="checkbox-subgroup">
    <input type="checkbox" class="item-checkbox" id="item1" name="items" value="item1">
    <label for="item1">Item 1</label>
    
    <input type="checkbox" class="item-checkbox" id="item2" name="items" value="item2">
    <label for="item2">Item 2</label>
    
    <input type="checkbox" class="item-checkbox" id="item3" name="items" value="item3">
    <label for="item3">Item 3</label>
</div>
```

### Select Dropdowns
```html
<!-- Basic select -->
<label for="country">Country:</label>
<select id="country" name="country" required>
    <option value="">-- Please choose a country --</option>
    <option value="us">United States</option>
    <option value="ca">Canada</option>
    <option value="uk">United Kingdom</option>
    <option value="au">Australia</option>
    <option value="de">Germany</option>
    <option value="fr">France</option>
    <option value="jp">Japan</option>
</select>

<!-- Select with option groups -->
<label for="timezone">Time Zone:</label>
<select id="timezone" name="timezone" required>
    <option value="">-- Select Time Zone --</option>
    
    <optgroup label="North America">
        <option value="est">Eastern Standard Time (UTC-5)</option>
        <option value="cst">Central Standard Time (UTC-6)</option>
        <option value="mst">Mountain Standard Time (UTC-7)</option>
        <option value="pst" selected>Pacific Standard Time (UTC-8)</option>
    </optgroup>
    
    <optgroup label="Europe">
        <option value="gmt">Greenwich Mean Time (UTC+0)</option>
        <option value="cet">Central European Time (UTC+1)</option>
        <option value="eet">Eastern European Time (UTC+2)</option>
    </optgroup>
    
    <optgroup label="Asia">
        <option value="jst">Japan Standard Time (UTC+9)</option>
        <option value="cst-asia">China Standard Time (UTC+8)</option>
        <option value="ist">India Standard Time (UTC+5:30)</option>
    </optgroup>
</select>

<!-- Multiple selection -->
<label for="skills">Programming Skills (Hold Ctrl/Cmd to select multiple):</label>
<select id="skills" name="skills" multiple size="8" required>
    <option value="html">HTML</option>
    <option value="css">CSS</option>
    <option value="javascript">JavaScript</option>
    <option value="python">Python</option>
    <option value="java">Java</option>
    <option value="csharp">C#</option>
    <option value="php">PHP</option>
    <option value="ruby">Ruby</option>
    <option value="go">Go</option>
    <option value="rust">Rust</option>
</select>

<!-- Cascading selects (dependent dropdowns) -->
<label for="category">Product Category:</label>
<select id="category" name="category" onchange="updateSubcategories()" required>
    <option value="">-- Select Category --</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
    <option value="books">Books</option>
    <option value="home">Home & Garden</option>
</select>

<label for="subcategory">Subcategory:</label>
<select id="subcategory" name="subcategory" disabled>
    <option value="">-- Select Category First --</option>
</select>
```

## File Upload Elements

### Basic File Upload
```html
<!-- Single file upload -->
<label for="avatar">Profile Picture:</label>
<input type="file" 
       id="avatar" 
       name="avatar" 
       accept="image/png, image/jpeg, image/gif"
       required>

<!-- Multiple file upload -->
<label for="documents">Upload Documents:</label>
<input type="file" 
       id="documents" 
       name="documents" 
       accept=".pdf,.doc,.docx,.txt"
       multiple
       required>

<!-- Specific file types -->
<label for="csvFile">CSV Data File:</label>
<input type="file" 
       id="csvFile" 
       name="csvFile" 
       accept=".csv,text/csv"
       required>

<!-- Image files with preview -->
<label for="gallery">Gallery Images:</label>
<input type="file" 
       id="gallery" 
       name="gallery" 
       accept="image/*"
       multiple
       onchange="previewImages(this)">

<div id="imagePreview" class="image-preview-container">
    <!-- Preview images will be inserted here -->
</div>

<!-- File upload with drag and drop area -->
<div class="file-upload-area" 
     ondrop="dropHandler(event)" 
     ondragover="dragOverHandler(event)">
    
    <input type="file" 
           id="dragDropFile" 
           name="dragDropFile" 
           accept="*/*"
           multiple
           style="display: none;"
           onchange="handleFileSelect(this)">
    
    <label for="dragDropFile" class="file-upload-label">
        <div class="upload-icon">📁</div>
        <div class="upload-text">
            <strong>Click to select files</strong> or drag and drop them here
        </div>
        <div class="upload-subtext">
            Maximum file size: 10MB per file
        </div>
    </label>
</div>

<div id="fileList" class="file-list">
    <!-- Selected files will be listed here -->
</div>
```

## Form Buttons and Actions

### Button Types
```html
<!-- Submit button (default type) -->
<button type="submit">Submit Form</button>
<input type="submit" value="Submit Form">

<!-- Reset button -->
<button type="reset">Reset Form</button>
<input type="reset" value="Clear All Fields">

<!-- Generic button (for JavaScript actions) -->
<button type="button" onclick="validateForm()">Validate Before Submit</button>
<input type="button" value="Add Another Item" onclick="addFormSection()">

<!-- Image submit button -->
<input type="image" 
       src="submit-button.png" 
       alt="Submit Form" 
       width="120" 
       height="40">

<!-- Button with custom styling and icons -->
<button type="submit" class="primary-button">
    <span class="button-icon">✓</span>
    Save Changes
</button>

<button type="button" class="secondary-button" onclick="cancelEdit()">
    <span class="button-icon">✕</span>
    Cancel
</button>

<!-- Disabled button -->
<button type="submit" disabled id="submitBtn">
    Please fill all required fields
</button>

<!-- Button with loading state -->
<button type="submit" id="loadingBtn" onclick="showLoading(this)">
    <span class="button-text">Submit</span>
    <span class="loading-spinner" style="display: none;">⟳</span>
</button>
```

## Advanced Form Elements

### Fieldsets and Organization
```html
<!-- Grouped form sections -->
<form>
    <fieldset>
        <legend>Personal Information</legend>
        
        <div class="form-row">
            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            
            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
        </div>
        
        <div class="form-row">
            <div class="form-group">
                <label for="birthDate">Date of Birth:</label>
                <input type="date" id="birthDate" name="birthDate" required>
            </div>
            
            <div class="form-group">
                <label for="gender">Gender:</label>
                <select id="gender" name="gender">
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
        </div>
    </fieldset>
    
    <fieldset>
        <legend>Contact Information</legend>
        
        <div class="form-group">
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" required>
            <small class="help-text">We'll never share your email with anyone else.</small>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="tel" id="phone" name="phone">
            <small class="help-text">Optional - for account recovery only.</small>
        </div>
        
        <fieldset class="address-fieldset">
            <legend>Mailing Address</legend>
            
            <div class="form-group">
                <label for="street">Street Address:</label>
                <input type="text" id="street" name="street" required>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="city">City:</label>
                    <input type="text" id="city" name="city" required>
                </div>
                
                <div class="form-group">
                    <label for="state">State/Province:</label>
                    <input type="text" id="state" name="state" required>
                </div>
                
                <div class="form-group">
                    <label for="zipCode">ZIP/Postal Code:</label>
                    <input type="text" id="zipCode" name="zipCode" required>
                </div>
            </div>
        </fieldset>
    </fieldset>
    
    <fieldset>
        <legend>Preferences</legend>
        
        <div class="form-group">
            <label>Communication Preferences:</label>
            <div class="checkbox-group">
                <input type="checkbox" id="emailUpdates" name="preferences" value="email">
                <label for="emailUpdates">Email updates</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="smsNotifications" name="preferences" value="sms">
                <label for="smsNotifications">SMS notifications</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="newsletter" name="preferences" value="newsletter" checked>
                <label for="newsletter">Monthly newsletter</label>
            </div>
        </div>
    </fieldset>
    
    <div class="form-actions">
        <button type="reset" class="secondary-button">Clear Form</button>
        <button type="submit" class="primary-button">Create Account</button>
    </div>
</form>
```

### Custom Form Controls
```html
<!-- Color picker -->
<label for="brandColor">Brand Color:</label>
<input type="color" 
       id="brandColor" 
       name="brandColor" 
       value="#007bff">

<!-- Progress indicator -->
<label for="completionProgress">Completion Progress:</label>
<progress id="completionProgress" value="75" max="100">75%</progress>

<!-- Meter for ratings -->
<label for="rating">User Rating:</label>
<meter id="rating" value="4.5" min="0" max="5" optimum="5">4.5 out of 5</meter>

<!-- Output for calculated values -->
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
    <label for="a">First Number:</label>
    <input type="number" id="a" name="a" value="0">
    +
    <label for="b">Second Number:</label>
    <input type="number" id="b" name="b" value="0">
    =
    <output name="result" for="a b">0</output>
</form>

<!-- Keygen (deprecated but educational) -->
<!-- <keygen name="security" challenge="573895"> -->
```

## Form Validation and Accessibility

### HTML5 Validation Attributes
```html
<form novalidate> <!-- Disable browser validation for custom handling -->
    <!-- Required field validation -->
    <label for="username">Username:</label>
    <input type="text" 
           id="username" 
           name="username" 
           required
           aria-describedby="username-help username-error">
    <div id="username-help" class="help-text">
        Choose a unique username (3-20 characters)
    </div>
    <div id="username-error" class="error-text" role="alert" aria-live="polite">
        <!-- Error messages will appear here -->
    </div>
    
    <!-- Pattern validation -->
    <label for="productCode">Product Code:</label>
    <input type="text" 
           id="productCode" 
           name="productCode" 
           pattern="[A-Z]{2}[0-9]{4}"
           title="Product code must be 2 uppercase letters followed by 4 numbers (e.g., AB1234)"
           placeholder="AB1234"
           required
           aria-describedby="productCode-help">
    <div id="productCode-help" class="help-text">
        Format: 2 letters + 4 numbers (e.g., AB1234)
    </div>
    
    <!-- Length validation -->
    <label for="bio">Biography:</label>
    <textarea id="bio" 
              name="bio" 
              minlength="50" 
              maxlength="500"
              placeholder="Tell us about yourself (50-500 characters)"
              aria-describedby="bio-help bio-counter">
    </textarea>
    <div id="bio-help" class="help-text">
        Share your background and interests (minimum 50 characters)
    </div>
    <div id="bio-counter" class="char-counter">
        <span id="currentLength">0</span>/500 characters
    </div>
    
    <!-- Custom validation messages -->
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" 
           id="confirmPassword" 
           name="confirmPassword" 
           required
           oninput="validatePasswordMatch()"
           aria-describedby="confirmPassword-error">
    <div id="confirmPassword-error" class="error-text" role="alert">
        <!-- Password match validation message -->
    </div>
</form>
```

### Accessibility Features
```html
<!-- Form with comprehensive accessibility -->
<form>
    <fieldset>
        <legend>Contact Information Form</legend>
        
        <!-- Required field indicator -->
        <p class="required-note">
            <span aria-hidden="true">*</span> Required fields
        </p>
        
        <!-- Accessible error summary -->
        <div id="error-summary" class="error-summary" role="alert" aria-live="polite" style="display: none;">
            <h3>Please correct the following errors:</h3>
            <ul id="error-list">
                <!-- Error list will be populated here -->
            </ul>
        </div>
        
        <!-- Form groups with proper labeling -->
        <div class="form-group">
            <label for="fullName">
                Full Name <span class="required" aria-label="required">*</span>
            </label>
            <input type="text" 
                   id="fullName" 
                   name="fullName" 
                   required
                   aria-required="true"
                   aria-describedby="fullName-help fullName-error"
                   autocomplete="name">
            <div id="fullName-help" class="help-text">
                Enter your first and last name as they appear on official documents
            </div>
            <div id="fullName-error" class="error-text" role="alert" aria-live="polite">
                <!-- Error message appears here -->
            </div>
        </div>
        
        <!-- Email with validation -->
        <div class="form-group">
            <label for="emailAddress">
                Email Address <span class="required" aria-label="required">*</span>
            </label>
            <input type="email" 
                   id="emailAddress" 
                   name="emailAddress" 
                   required
                   aria-required="true"
                   aria-describedby="emailAddress-help emailAddress-error"
                   autocomplete="email">
            <div id="emailAddress-help" class="help-text">
                We'll use this to send you important updates about your account
            </div>
            <div id="emailAddress-error" class="error-text" role="alert" aria-live="polite">
                <!-- Error message appears here -->
            </div>
        </div>
        
        <!-- Radio group with fieldset -->
        <fieldset class="form-group">
            <legend>Preferred Contact Method <span class="required" aria-label="required">*</span></legend>
            <div class="radio-group" role="radiogroup" aria-required="true">
                <div class="radio-option">
                    <input type="radio" id="contactEmail" name="contactMethod" value="email" required>
                    <label for="contactEmail">Email</label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="contactPhone" name="contactMethod" value="phone" required>
                    <label for="contactPhone">Phone</label>
                </div>
                <div class="radio-option">
                    <input type="radio" id="contactText" name="contactMethod" value="text" required>
                    <label for="contactText">Text Message</label>
                </div>
            </div>
            <div id="contactMethod-error" class="error-text" role="alert" aria-live="polite">
                <!-- Error message appears here -->
            </div>
        </fieldset>
        
        <!-- Submit button -->
        <div class="form-actions">
            <button type="submit" class="primary-button">
                Submit Contact Information
            </button>
        </div>
    </fieldset>
</form>
```

## Complex Form Examples

### Multi-Step Form
```html
<!-- Step indicator -->
<div class="form-steps" role="tablist" aria-label="Form completion steps">
    <div class="step active" role="tab" aria-selected="true" aria-controls="step1">
        <span class="step-number">1</span>
        <span class="step-title">Personal Info</span>
    </div>
    <div class="step" role="tab" aria-selected="false" aria-controls="step2">
        <span class="step-number">2</span>
        <span class="step-title">Contact Details</span>
    </div>
    <div class="step" role="tab" aria-selected="false" aria-controls="step3">
        <span class="step-number">3</span>
        <span class="step-title">Preferences</span>
    </div>
    <div class="step" role="tab" aria-selected="false" aria-controls="step4">
        <span class="step-number">4</span>
        <span class="step-title">Review</span>
    </div>
</div>

<form id="multiStepForm">
    <!-- Step 1: Personal Information -->
    <div id="step1" class="form-step active" role="tabpanel" aria-labelledby="step1-tab">
        <h2>Personal Information</h2>
        
        <div class="form-row">
            <div class="form-group">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
        </div>
        
        <div class="form-group">
            <label for="birthDate">Date of Birth *</label>
            <input type="date" id="birthDate" name="birthDate" required>
        </div>
        
        <div class="form-actions">
            <button type="button" class="next-button" onclick="nextStep()">
                Next Step
            </button>
        </div>
    </div>
    
    <!-- Step 2: Contact Details -->
    <div id="step2" class="form-step" role="tabpanel" aria-labelledby="step2-tab" style="display: none;">
        <h2>Contact Details</h2>
        
        <div class="form-group">
            <label for="email">Email Address *</label>
            <input type="email" id="email" name="email" required>
        </div>
        
        <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone">
        </div>
        
        <div class="form-actions">
            <button type="button" class="prev-button" onclick="prevStep()">
                Previous
            </button>
            <button type="button" class="next-button" onclick="nextStep()">
                Next Step
            </button>
        </div>
    </div>
    
    <!-- Step 3: Preferences -->
    <div id="step3" class="form-step" role="tabpanel" aria-labelledby="step3-tab" style="display: none;">
        <h2>Your Preferences</h2>
        
        <fieldset>
            <legend>Notification Preferences</legend>
            <div class="checkbox-group">
                <input type="checkbox" id="emailNotifications" name="notifications" value="email" checked>
                <label for="emailNotifications">Email notifications</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="smsNotifications" name="notifications" value="sms">
                <label for="smsNotifications">SMS notifications</label>
            </div>
        </fieldset>
        
        <div class="form-actions">
            <button type="button" class="prev-button" onclick="prevStep()">
                Previous
            </button>
            <button type="button" class="next-button" onclick="nextStep()">
                Review & Submit
            </button>
        </div>
    </div>
    
    <!-- Step 4: Review -->
    <div id="step4" class="form-step" role="tabpanel" aria-labelledby="step4-tab" style="display: none;">
        <h2>Review Your Information</h2>
        
        <div id="reviewData" class="review-section">
            <!-- Form data will be displayed here for review -->
        </div>
        
        <div class="form-actions">
            <button type="button" class="prev-button" onclick="prevStep()">
                Previous
            </button>
            <button type="submit" class="submit-button">
                Submit Form
            </button>
        </div>
    </div>
</form>
```

### Survey Form
```html
<form id="surveyForm" class="survey-form">
    <header>
        <h1>Customer Satisfaction Survey</h1>
        <p>Help us improve our services by sharing your feedback. This survey takes about 5 minutes to complete.</p>
    </header>
    
    <!-- Rating scales -->
    <fieldset>
        <legend>Rate Your Experience</legend>
        
        <div class="rating-question">
            <label>Overall satisfaction with our service:</label>
            <div class="rating-scale" role="radiogroup" aria-labelledby="satisfaction-label">
                <span id="satisfaction-label" class="sr-only">Rate from 1 (Very Dissatisfied) to 5 (Very Satisfied)</span>
                <label class="rating-option">
                    <input type="radio" name="satisfaction" value="1" required>
                    <span class="rating-text">1 - Very Dissatisfied</span>
                </label>
                <label class="rating-option">
                    <input type="radio" name="satisfaction" value="2" required>
                    <span class="rating-text">2 - Dissatisfied</span>
                </label>
                <label class="rating-option">
                    <input type="radio" name="satisfaction" value="3" required>
                    <span class="rating-text">3 - Neutral</span>
                </label>
                <label class="rating-option">
                    <input type="radio" name="satisfaction" value="4" required>
                    <span class="rating-text">4 - Satisfied</span>
                </label>
                <label class="rating-option">
                    <input type="radio" name="satisfaction" value="5" required>
                    <span class="rating-text">5 - Very Satisfied</span>
                </label>
            </div>
        </div>
        
        <!-- Likelihood to recommend -->
        <div class="rating-question">
            <label>How likely are you to recommend us to a friend? (0-10 scale)</label>
            <div class="nps-scale">
                <input type="range" 
                       id="npsScore" 
                       name="npsScore" 
                       min="0" 
                       max="10" 
                       value="7"
                       oninput="updateNPSDisplay(this.value)">
                <div class="nps-labels">
                    <span>Not at all likely (0)</span>
                    <span id="npsValue">7</span>
                    <span>Extremely likely (10)</span>
                </div>
            </div>
        </div>
    </fieldset>
    
    <!-- Multiple choice questions -->
    <fieldset>
        <legend>Tell Us More</legend>
        
        <div class="form-group">
            <label>How did you hear about us? (Select all that apply)</label>
            <div class="checkbox-group">
                <input type="checkbox" id="sourceSearch" name="sources" value="search">
                <label for="sourceSearch">Search engine</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="sourceSocial" name="sources" value="social">
                <label for="sourceSocial">Social media</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="sourceReferral" name="sources" value="referral">
                <label for="sourceReferral">Friend/family referral</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="sourceAd" name="sources" value="advertisement">
                <label for="sourceAd">Advertisement</label>
            </div>
            <div class="checkbox-group">
                <input type="checkbox" id="sourceOther" name="sources" value="other">
                <label for="sourceOther">Other</label>
            </div>
        </div>
        
        <!-- Open-ended questions -->
        <div class="form-group">
            <label for="improvements">What could we improve?</label>
            <textarea id="improvements" 
                      name="improvements" 
                      rows="4" 
                      placeholder="Please share your suggestions for how we can improve our service..."
                      maxlength="1000"></textarea>
            <div class="char-counter">
                <span id="improvementsCount">0</span>/1000 characters
            </div>
        </div>
        
        <div class="form-group">
            <label for="additionalComments">Additional comments (optional)</label>
            <textarea id="additionalComments" 
                      name="additionalComments" 
                      rows="3" 
                      placeholder="Any other feedback you'd like to share..."></textarea>
        </div>
    </fieldset>
    
    <!-- Demographics (optional) -->
    <fieldset>
        <legend>Demographics (Optional)</legend>
        <p class="fieldset-description">This information helps us better understand our customers. All fields in this section are optional.</p>
        
        <div class="form-row">
            <div class="form-group">
                <label for="ageGroup">Age Group</label>
                <select id="ageGroup" name="ageGroup">
                    <option value="">Prefer not to say</option>
                    <option value="18-24">18-24</option>
                    <option value="25-34">25-34</option>
                    <option value="35-44">35-44</option>
                    <option value="45-54">45-54</option>
                    <option value="55-64">55-64</option>
                    <option value="65+">65+</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="location">Location</label>
                <select id="location" name="location">
                    <option value="">Prefer not to say</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="australia">Australia/Oceania</option>
                    <option value="africa">Africa</option>
                    <option value="south-america">South America</option>
                </select>
            </div>
        </div>
    </fieldset>
    
    <!-- Contact information -->
    <fieldset>
        <legend>Follow-up Contact (Optional)</legend>
        
        <div class="checkbox-group">
            <input type="checkbox" id="contactPermission" name="contactPermission" value="yes">
            <label for="contactPermission">
                I'd like to be contacted about my feedback
            </label>
        </div>
        
        <div id="contactFields" style="display: none;">
            <div class="form-group">
                <label for="contactEmail">Email Address</label>
                <input type="email" id="contactEmail" name="contactEmail">
            </div>
            
            <div class="form-group">
                <label for="contactName">Name</label>
                <input type="text" id="contactName" name="contactName">
            </div>
        </div>
    </fieldset>
    
    <!-- Privacy and submission -->
    <div class="form-footer">
        <div class="privacy-notice">
            <p>
                <strong>Privacy Notice:</strong> Your responses will be kept confidential and used only to improve our services. 
                We will not share your individual responses with third parties.
            </p>
        </div>
        
        <div class="form-actions">
            <button type="button" class="secondary-button" onclick="clearForm()">
                Clear Form
            </button>
            <button type="submit" class="primary-button">
                Submit Survey
            </button>
        </div>
    </div>
</form>
```

## Practical Exercises

### Exercise 1: Contact Form
Create a comprehensive contact form with the following requirements:
- Name, email, phone, subject, and message fields
- Proper validation and error handling
- Accessibility features (ARIA labels, error announcements)
- Mobile-friendly design

### Exercise 2: Registration Form
Build a multi-step user registration form:
- Step 1: Basic information (name, email, password)
- Step 2: Profile details (bio, interests, profile picture)
- Step 3: Privacy settings and preferences
- Step 4: Review and confirm

### Exercise 3: Survey Form
Create an interactive survey form with:
- Various question types (multiple choice, rating scales, text)
- Conditional questions (show/hide based on previous answers)
- Progress indicator
- Data validation and submission handling

### Exercise 4: E-commerce Checkout
Build a checkout form for an online store:
- Customer information
- Billing and shipping addresses
- Payment method selection
- Order review and confirmation
- Form persistence (save progress)

### Assessment Criteria:
- [ ] Semantic HTML structure
- [ ] Proper form validation
- [ ] Accessibility compliance
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] User experience optimization
- [ ] Error handling and feedback
- [ ] Data security considerations
