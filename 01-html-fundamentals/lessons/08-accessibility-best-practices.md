<!-- Contact form section -->
<form id="contact-form" 
      action="/submit-form" 
      method="POST" 
      role="form" 
      aria-labelledby="contact-form-title"
      novalidate>
    
    <h2 id="contact-form-title">Contact Us</h2>
    
    <div class="form-group">
        <label for="contact-name">
            Name
            <span aria-label="required" class="required">*</span>
        </label>
        <input type="text" 
               id="contact-name" 
               name="name" 
               required
               aria-required="true"
               aria-invalid="false"
               aria-describedby="name-help name-error">
        <div id="name-help" class="help-text">
            Please enter your full name
        </div>
        <div id="name-error" 
             class="error-text" 
             role="alert" 
             aria-live="polite">
            <!-- Dynamic error message -->
        </div>
    </div>
    
    <div class="form-group">
        <label for="contact-email">
            Email
            <span aria-label="required" class="required">*</span>
        </label>
        <input type="email" 
               id="contact-email" 
               name="email" 
               required
               aria-required="true"
               aria-invalid="false"
               aria-describedby="email-help email-error">
        <div id="email-help" class="help-text">
            We'll never share your email with anyone else
        </div>
        <div id="email-error" 
             class="error-text" 
             role="alert" 
             aria-live="polite">
            <!-- Dynamic error message -->
        </div>
    </div>
    
    <div class="form-group">
        <label for="contact-phone">
            Phone
        </label>
        <input type="tel" 
               id="contact-phone" 
               name="phone"
               aria-invalid="false"
               aria-describedby="phone-help phone-error">
        <div id="phone-help" class="help-text">
            Optional - Include country code, e.g., +1
        </div>
        <div id="phone-error" 
             class="error-text" 
             role="alert" 
             aria-live="polite">
            <!-- Dynamic error message -->
        </div>
    </div>
    
    <div class="form-group">
        <label for="contact-reason">
            Reason for Contact
            <span aria-label="required" class="required">*</span>
        </label>
        <select id="contact-reason" 
                name="reason"
                required
                aria-required="true"
                aria-invalid="false"
                aria-describedby="reason-help reason-error">
            <option value="">Select a reason</option>
            <option value="question">I have a question</option>
            <option value="feedback">Feedback about your services</option>
            <option value="other">Other inquiries</option>
        </select>
        <div id="reason-help" class="help-text">
            Please select the reason for your contact
        </div>
        <div id="reason-error" 
             class="error-text" 
             role="alert" 
             aria-live="polite">
            <!-- Dynamic error message -->
        </div>
    </div>
    
    <div class="form-group">
        <label for="contact-message">
            Message
            <span aria-label="required" class="required">*</span>
        </label>
        <textarea id="contact-message" 
                  name="message"
                  rows="5"
                  required
                  aria-required="true"
                  aria-invalid="false"
                  aria-describedby="message-help message-error message-count">
        </textarea>
        <div id="message-help" class="help-text">
            Tell us how we can help you (minimum 10 characters)
        </div>
        <div id="message-count" class="char-counter">
            <span id="current-count">0</span> characters (minimum 10)
        </div>
        <div id="message-error" 
             class="error-text" 
             role="alert" 
             aria-live="polite">
            <!-- Dynamic error message -->
        </div>
    </div>
    
    <div class="form-actions">
        <button type="submit" 
                class="btn-primary"
                aria-describedby="submit-help">
            Send Message
        </button>
        <div id="submit-help" class="help-text">
            Press Enter or click to send your message
        </div>
    </div>
</form>