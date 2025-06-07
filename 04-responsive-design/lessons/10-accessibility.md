# Accessibility & Inclusive Design

## Introduction to Responsive Accessibility

Accessibility in responsive design ensures that websites work for everyone, regardless of device, ability, or assistive technology. True accessibility goes beyond compliance—it creates inclusive experiences that benefit all users.

### The Intersection of Responsive Design and Accessibility

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Responsive Design</title>
    
    <style>
        /* Accessible responsive foundation */
        :root {
            /* WCAG AA compliant color contrast ratios */
            --color-text: hsl(220 15% 15%); /* 4.8:1 contrast */
            --color-text-secondary: hsl(220 10% 45%); /* 4.5:1 contrast */
            --color-background: hsl(0 0% 100%);
            --color-primary: hsl(220 90% 45%); /* 4.7:1 contrast */
            --color-focus: hsl(220 90% 50%);
            --color-error: hsl(0 65% 40%); /* 4.5:1 contrast */
            --color-success: hsl(120 50% 35%); /* 4.5:1 contrast */
            
            /* Accessible spacing for touch targets */
            --touch-target-min: 44px; /* WCAG 2.1 AA minimum */
            --touch-target-comfortable: 48px; /* Material Design */
            --spacing-unit: 0.5rem;
            
            /* Accessible typography */
            --font-size-base: 1rem; /* 16px minimum */
            --line-height-base: 1.5; /* WCAG recommended */
            --line-height-headings: 1.3;
            
            /* Focus outline thickness */
            --focus-outline-width: 2px;
            --focus-outline-offset: 2px;
        }
        
        /* Dark mode with maintained contrast */
        @media (prefers-color-scheme: dark) {
            :root {
                --color-text: hsl(220 15% 90%);
                --color-text-secondary: hsl(220 10% 75%);
                --color-background: hsl(220 15% 10%);
                --color-primary: hsl(220 90% 65%);
                --color-focus: hsl(220 90% 70%);
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            :root {
                --color-text: hsl(0 0% 0%);
                --color-background: hsl(0 0% 100%);
                --color-primary: hsl(220 100% 30%);
                --focus-outline-width: 3px;
            }
        }
        
        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            :root {
                --transition-duration: 0.01ms;
                --animation-duration: 0.01ms;
            }
            
            *,
            *::before,
            *::after {
                animation-duration: var(--animation-duration) !important;
                animation-iteration-count: 1 !important;
                transition-duration: var(--transition-duration) !important;
                scroll-behavior: auto !important;
            }
        }
        
        /* Base accessible styles */
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            font-size: var(--font-size-base);
            line-height: var(--line-height-base);
            color: var(--color-text);
            background-color: var(--color-background);
            margin: 0;
            padding: 0;
        }
        
        /* Accessible focus management */
        :focus {
            outline: var(--focus-outline-width) solid var(--color-focus);
            outline-offset: var(--focus-outline-offset);
        }
        
        /* Remove default focus for mouse users, keep for keyboard */
        :focus:not(:focus-visible) {
            outline: none;
        }
        
        :focus-visible {
            outline: var(--focus-outline-width) solid var(--color-focus);
            outline-offset: var(--focus-outline-offset);
        }
        
        /* Skip link for keyboard navigation */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-text);
            color: var(--color-background);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            font-weight: 500;
        }
        
        .skip-link:focus {
            top: 6px;
        }
        
        /* Accessible responsive container */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 calc(var(--spacing-unit) * 2);
        }
        
        /* Accessible responsive navigation */
        .nav {
            background: var(--color-background);
            border-bottom: 1px solid var(--color-text-secondary);
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .nav-toggle {
            display: none;
            background: none;
            border: 2px solid var(--color-primary);
            color: var(--color-primary);
            padding: calc(var(--spacing-unit) * 1.5);
            min-width: var(--touch-target-min);
            min-height: var(--touch-target-min);
            cursor: pointer;
            border-radius: 4px;
            position: relative;
        }
        
        .nav-toggle[aria-expanded="true"] .nav-toggle-text::after {
            content: " (expanded)";
        }
        
        .nav-menu {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            gap: calc(var(--spacing-unit) * 2);
        }
        
        .nav-link {
            display: block;
            padding: calc(var(--spacing-unit) * 2);
            color: var(--color-text);
            text-decoration: none;
            min-height: var(--touch-target-min);
            display: flex;
            align-items: center;
            border-radius: 4px;
            transition: background-color 0.2s ease;
        }
        
        .nav-link:hover,
        .nav-link:focus {
            background-color: var(--color-primary);
            color: var(--color-background);
        }
        
        .nav-link[aria-current="page"] {
            background-color: var(--color-text-secondary);
            color: var(--color-background);
            font-weight: 600;
        }
        
        /* Mobile navigation */
        @media (max-width: 768px) {
            .nav-toggle {
                display: block;
            }
            
            .nav-menu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--color-background);
                flex-direction: column;
                gap: 0;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            
            .nav-menu[aria-hidden="false"] {
                display: flex;
            }
            
            .nav-link {
                border-bottom: 1px solid var(--color-text-secondary);
                border-radius: 0;
            }
        }
        
        /* Accessible form controls */
        .form-group {
            margin-bottom: calc(var(--spacing-unit) * 3);
        }
        
        .form-label {
            display: block;
            margin-bottom: var(--spacing-unit);
            font-weight: 500;
            color: var(--color-text);
        }
        
        .form-input {
            width: 100%;
            padding: calc(var(--spacing-unit) * 2);
            border: 2px solid var(--color-text-secondary);
            border-radius: 4px;
            font-size: var(--font-size-base);
            color: var(--color-text);
            background-color: var(--color-background);
            min-height: var(--touch-target-min);
            transition: border-color 0.2s ease;
        }
        
        .form-input:focus {
            border-color: var(--color-focus);
            outline: none;
        }
        
        .form-input:invalid {
            border-color: var(--color-error);
        }
        
        .form-input[aria-describedby] {
            margin-bottom: var(--spacing-unit);
        }
        
        .form-help {
            font-size: 0.875rem;
            color: var(--color-text-secondary);
            margin-top: var(--spacing-unit);
        }
        
        .form-error {
            color: var(--color-error);
            font-size: 0.875rem;
            margin-top: var(--spacing-unit);
            display: flex;
            align-items: center;
            gap: var(--spacing-unit);
        }
        
        .form-error::before {
            content: "⚠";
            font-weight: bold;
        }
        
        /* Accessible button styles */
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: var(--spacing-unit);
            padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 3);
            min-height: var(--touch-target-min);
            border: 2px solid transparent;
            border-radius: 4px;
            font-size: var(--font-size-base);
            font-weight: 500;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
        }
        
        .btn-primary {
            background-color: var(--color-primary);
            color: var(--color-background);
            border-color: var(--color-primary);
        }
        
        .btn-primary:hover,
        .btn-primary:focus {
            background-color: var(--color-text);
            border-color: var(--color-text);
        }
        
        .btn-secondary {
            background-color: transparent;
            color: var(--color-primary);
            border-color: var(--color-primary);
        }
        
        .btn-secondary:hover,
        .btn-secondary:focus {
            background-color: var(--color-primary);
            color: var(--color-background);
        }
        
        .btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .btn:disabled:hover,
        .btn:disabled:focus {
            background-color: var(--color-primary);
            border-color: var(--color-primary);
        }
        
        /* Accessible card components */
        .card {
            background: var(--color-background);
            border: 1px solid var(--color-text-secondary);
            border-radius: 8px;
            padding: calc(var(--spacing-unit) * 3);
            margin-bottom: calc(var(--spacing-unit) * 3);
        }
        
        .card-title {
            margin: 0 0 calc(var(--spacing-unit) * 2) 0;
            font-size: 1.25rem;
            line-height: var(--line-height-headings);
            color: var(--color-text);
        }
        
        .card-content {
            margin-bottom: calc(var(--spacing-unit) * 2);
        }
        
        /* Accessible responsive grid */
        .grid {
            display: grid;
            gap: calc(var(--spacing-unit) * 3);
            grid-template-columns: 1fr;
        }
        
        @media (min-width: 768px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 1024px) {
            .grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* Screen reader only content */
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        /* Focus trap for modals */
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: calc(var(--spacing-unit) * 2);
        }
        
        .modal-content {
            background: var(--color-background);
            border-radius: 8px;
            padding: calc(var(--spacing-unit) * 4);
            max-width: 500px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .modal-close {
            position: absolute;
            top: calc(var(--spacing-unit) * 2);
            right: calc(var(--spacing-unit) * 2);
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            padding: var(--spacing-unit);
            min-width: var(--touch-target-min);
            min-height: var(--touch-target-min);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
        }
        
        /* Accessible data tables */
        .table-container {
            overflow-x: auto;
            margin: calc(var(--spacing-unit) * 3) 0;
        }
        
        .table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--color-text-secondary);
        }
        
        .table th,
        .table td {
            padding: calc(var(--spacing-unit) * 2);
            text-align: left;
            border-bottom: 1px solid var(--color-text-secondary);
            min-height: var(--touch-target-min);
        }
        
        .table th {
            background-color: var(--color-text-secondary);
            color: var(--color-background);
            font-weight: 600;
            position: sticky;
            top: 0;
        }
        
        .table tr:nth-child(even) {
            background-color: rgba(0, 0, 0, 0.02);
        }
        
        /* Status and alert messages */
        .alert {
            padding: calc(var(--spacing-unit) * 3);
            border-radius: 4px;
            margin: calc(var(--spacing-unit) * 2) 0;
            border-left: 4px solid;
            display: flex;
            align-items: flex-start;
            gap: calc(var(--spacing-unit) * 2);
        }
        
        .alert-success {
            background-color: hsl(120 50% 95%);
            border-color: var(--color-success);
            color: var(--color-success);
        }
        
        .alert-error {
            background-color: hsl(0 50% 95%);
            border-color: var(--color-error);
            color: var(--color-error);
        }
        
        .alert-icon {
            font-weight: bold;
            font-size: 1.25rem;
        }
    </style>
</head>
<body>
    <!-- Skip navigation for screen readers -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <header>
        <nav class="nav" role="navigation" aria-label="Main navigation">
            <div class="container">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <h1 style="margin: 0; font-size: 1.5rem;">Accessible Design</h1>
                    
                    <button class="nav-toggle" 
                            aria-expanded="false" 
                            aria-controls="nav-menu"
                            aria-label="Toggle navigation menu">
                        <span class="nav-toggle-text">Menu</span>
                    </button>
                    
                    <ul class="nav-menu" id="nav-menu" aria-hidden="true">
                        <li><a href="#home" class="nav-link" aria-current="page">Home</a></li>
                        <li><a href="#about" class="nav-link">About</a></li>
                        <li><a href="#services" class="nav-link">Services</a></li>
                        <li><a href="#contact" class="nav-link">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    
    <main id="main-content">
        <div class="container">
            <section style="padding: calc(var(--spacing-unit) * 6) 0;">
                <h2>Accessible Responsive Design</h2>
                <p>This page demonstrates accessibility best practices in responsive web design, ensuring usability for all users across all devices.</p>
                
                <div class="alert alert-success" role="alert" aria-live="polite">
                    <span class="alert-icon" aria-hidden="true">✓</span>
                    <div>
                        <strong>Accessibility Features Active:</strong> This page includes skip navigation, proper focus management, ARIA labels, and WCAG compliant color contrast.
                    </div>
                </div>
            </section>
            
            <section style="padding: calc(var(--spacing-unit) * 4) 0;">
                <h2>Accessible Form Example</h2>
                <form>
                    <div class="form-group">
                        <label for="name" class="form-label">Full Name <span aria-label="required">*</span></label>
                        <input type="text" 
                               id="name" 
                               class="form-input" 
                               required 
                               aria-describedby="name-help"
                               autocomplete="name">
                        <div id="name-help" class="form-help">Enter your first and last name</div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address <span aria-label="required">*</span></label>
                        <input type="email" 
                               id="email" 
                               class="form-input" 
                               required 
                               aria-describedby="email-help email-error"
                               autocomplete="email">
                        <div id="email-help" class="form-help">We'll never share your email address</div>
                        <div id="email-error" class="form-error" role="alert" style="display: none;">
                            Please enter a valid email address
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="message" class="form-label">Message</label>
                        <textarea id="message" 
                                  class="form-input" 
                                  rows="4" 
                                  aria-describedby="message-help"></textarea>
                        <div id="message-help" class="form-help">Optional: Tell us how we can help you</div>
                    </div>
                    
                    <div style="display: flex; gap: calc(var(--spacing-unit) * 2); flex-wrap: wrap;">
                        <button type="submit" class="btn btn-primary">
                            <span>Send Message</span>
                            <span class="sr-only">(form will be submitted)</span>
                        </button>
                        <button type="reset" class="btn btn-secondary">Reset Form</button>
                    </div>
                </form>
            </section>
            
            <section style="padding: calc(var(--spacing-unit) * 4) 0;">
                <h2>Accessible Data Table</h2>
                <div class="table-container">
                    <table class="table" role="table" aria-label="User information">
                        <caption>List of users with their contact information</caption>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John Doe</td>
                                <td>john@example.com</td>
                                <td>+1 (555) 123-4567</td>
                                <td><span style="color: var(--color-success);">Active</span></td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);">
                                        Edit<span class="sr-only"> John Doe</span>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Jane Smith</td>
                                <td>jane@example.com</td>
                                <td>+1 (555) 987-6543</td>
                                <td><span style="color: var(--color-error);">Inactive</span></td>
                                <td>
                                    <button class="btn btn-secondary" style="padding: var(--spacing-unit) calc(var(--spacing-unit) * 2);">
                                        Edit<span class="sr-only"> Jane Smith</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            
            <section style="padding: calc(var(--spacing-unit) * 4) 0;">
                <h2>Responsive Cards with Accessibility</h2>
                <div class="grid">
                    <article class="card">
                        <h3 class="card-title">Screen Reader Support</h3>
                        <div class="card-content">
                            <p>All content is properly structured with semantic HTML and ARIA labels for screen reader compatibility.</p>
                        </div>
                        <button class="btn btn-primary">Learn More</button>
                    </article>
                    
                    <article class="card">
                        <h3 class="card-title">Keyboard Navigation</h3>
                        <div class="card-content">
                            <p>Every interactive element is accessible via keyboard navigation with clear focus indicators.</p>
                        </div>
                        <button class="btn btn-primary">Learn More</button>
                    </article>
                    
                    <article class="card">
                        <h3 class="card-title">Color Contrast</h3>
                        <div class="card-content">
                            <p>All text meets WCAG AA contrast requirements for readability across all devices.</p>
                        </div>
                        <button class="btn btn-primary">Learn More</button>
                    </article>
                </div>
            </section>
        </div>
    </main>
    
    <footer style="background: var(--color-text-secondary); color: var(--color-background); padding: calc(var(--spacing-unit) * 6) 0; margin-top: calc(var(--spacing-unit) * 8);">
        <div class="container">
            <p>&copy; 2024 Accessible Design Example. All rights reserved.</p>
        </div>
    </footer>
    
    <!-- Modal example -->
    <div class="modal" style="display: none;" role="dialog" aria-labelledby="modal-title" aria-modal="true">
        <div class="modal-content">
            <button class="modal-close" aria-label="Close modal">&times;</button>
            <h2 id="modal-title">Modal Title</h2>
            <p>This is an accessible modal dialog with proper focus management and ARIA attributes.</p>
            <div style="margin-top: calc(var(--spacing-unit) * 3);">
                <button class="btn btn-primary">Confirm</button>
                <button class="btn btn-secondary" style="margin-left: calc(var(--spacing-unit) * 2);">Cancel</button>
            </div>
        </div>
    </div>
    
    <script>
        // Accessible navigation toggle
        function setupNavigation() {
            const navToggle = document.querySelector('.nav-toggle');
            const navMenu = document.querySelector('.nav-menu');
            
            navToggle.addEventListener('click', () => {
                const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
                
                navToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.setAttribute('aria-hidden', isExpanded);
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.nav')) {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
                    navToggle.setAttribute('aria-expanded', 'false');
                    navMenu.setAttribute('aria-hidden', 'true');
                    navToggle.focus();
                }
            });
        }
        
        // Accessible form validation
        function setupFormValidation() {
            const form = document.querySelector('form');
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('email-error');
            
            form.addEventListener('submit', (e) => {
                let isValid = true;
                
                // Email validation
                if (emailInput.value && !emailInput.value.includes('@')) {
                    emailError.style.display = 'block';
                    emailInput.setAttribute('aria-invalid', 'true');
                    isValid = false;
                } else {
                    emailError.style.display = 'none';
                    emailInput.setAttribute('aria-invalid', 'false');
                }
                
                if (!isValid) {
                    e.preventDefault();
                    // Focus first invalid field
                    const firstInvalid = form.querySelector('[aria-invalid="true"]');
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                }
            });
            
            // Real-time validation
            emailInput.addEventListener('blur', () => {
                if (emailInput.value && !emailInput.value.includes('@')) {
                    emailError.style.display = 'block';
                    emailInput.setAttribute('aria-invalid', 'true');
                } else {
                    emailError.style.display = 'none';
                    emailInput.setAttribute('aria-invalid', 'false');
                }
            });
        }
        
        // Focus management for modals
        function setupModalFocusManagement() {
            const modal = document.querySelector('.modal');
            const modalClose = document.querySelector('.modal-close');
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            
            function trapFocus(e) {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusable = focusableContent[0];
                const lastFocusable = focusableContent[focusableContent.length - 1];
                
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstFocusable) {
                            e.preventDefault();
                            lastFocusable.focus();
                        }
                    } else {
                        if (document.activeElement === lastFocusable) {
                            e.preventDefault();
                            firstFocusable.focus();
                        }
                    }
                }
                
                if (e.key === 'Escape') {
                    closeModal();
                }
            }
            
            function openModal() {
                modal.style.display = 'flex';
                modalClose.focus();
                document.addEventListener('keydown', trapFocus);
                document.body.style.overflow = 'hidden';
            }
            
            function closeModal() {
                modal.style.display = 'none';
                document.removeEventListener('keydown', trapFocus);
                document.body.style.overflow = '';
            }
            
            modalClose.addEventListener('click', closeModal);
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeModal();
                }
            });
        }
        
        // Announce dynamic content changes
        function announceToScreenReader(message, priority = 'polite') {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', priority);
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            
            setTimeout(() => {
                document.body.removeChild(announcement);
            }, 1000);
        }
        
        // Initialize accessibility features
        document.addEventListener('DOMContentLoaded', () => {
            setupNavigation();
            setupFormValidation();
            setupModalFocusManagement();
            
            // Announce page load
            announceToScreenReader('Page loaded successfully');
        });
        
        // Detect if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable or reduce animations
            document.documentElement.style.setProperty('--transition-duration', '0.01ms');
        }
        
        // Listen for changes in motion preference
        prefersReducedMotion.addEventListener('change', () => {
            if (prefersReducedMotion.matches) {
                document.documentElement.style.setProperty('--transition-duration', '0.01ms');
            } else {
                document.documentElement.style.setProperty('--transition-duration', '0.2s');
            }
        });
    </script>
</body>
</html>
```

## Advanced Accessibility Testing

### Automated Accessibility Testing

```javascript
// Comprehensive accessibility testing suite
class AccessibilityTester {
    constructor() {
        this.violations = [];
        this.testResults = new Map();
    }
    
    async runFullAccessibilityAudit() {
        console.log('Starting comprehensive accessibility audit...');
        
        // Test color contrast
        await this.testColorContrast();
        
        // Test keyboard navigation
        await this.testKeyboardNavigation();
        
        // Test screen reader compatibility
        await this.testScreenReaderCompatibility();
        
        // Test touch accessibility
        await this.testTouchAccessibility();
        
        // Test responsive accessibility
        await this.testResponsiveAccessibility();
        
        return this.generateAccessibilityReport();
    }
    
    async testColorContrast() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, span, label');
        const violations = [];
        
        textElements.forEach(element => {
            const styles = window.getComputedStyle(element);
            const contrast = this.calculateContrastRatio(
                styles.color,
                this.getBackgroundColor(element)
            );
            
            const fontSize = parseFloat(styles.fontSize);
            const fontWeight = parseInt(styles.fontWeight);
            const isLarge = fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700);
            
            const requiredRatio = isLarge ? 3 : 4.5;
            
            if (contrast < requiredRatio) {
                violations.push({
                    element: element.tagName.toLowerCase(),
                    text: element.textContent.substring(0, 50),
                    contrast: contrast.toFixed(2),
                    required: requiredRatio,
                    location: this.getElementLocation(element)
                });
            }
        });
        
        this.testResults.set('colorContrast', {
            passed: violations.length === 0,
            violations,
            totalElements: textElements.length
        });
    }
    
    async testKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [role="button"], [role="link"]'
        );
        
        const violations = [];
        
        focusableElements.forEach(element => {
            // Test if element is actually focusable
            element.focus();
            if (document.activeElement !== element) {
                violations.push({
                    element: element.tagName.toLowerCase(),
                    issue: 'Element not focusable',
                    location: this.getElementLocation(element)
                });
            }
            
            // Test focus indicator
            const styles = window.getComputedStyle(element, ':focus');
            if (styles.outline === 'none' && styles.boxShadow === 'none') {
                violations.push({
                    element: element.tagName.toLowerCase(),
                    issue: 'No visible focus indicator',
                    location: this.getElementLocation(element)
                });
            }
        });
        
        this.testResults.set('keyboardNavigation', {
            passed: violations.length === 0,
            violations,
            totalElements: focusableElements.length
        });
    }
    
    async testScreenReaderCompatibility() {
        const violations = [];
        
        // Test heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        let previousLevel = 0;
        
        headings.forEach(heading => {
            const level = parseInt(heading.tagName.substring(1));
            if (level > previousLevel + 1) {
                violations.push({
                    element: heading.tagName.toLowerCase(),
                    issue: `Heading level ${level} follows level ${previousLevel}`,
                    location: this.getElementLocation(heading)
                });
            }
            previousLevel = level;
        });
        
        // Test alt text for images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.alt && !img.getAttribute('aria-label') && !img.getAttribute('aria-labelledby')) {
                violations.push({
                    element: 'img',
                    issue: 'Missing alternative text',
                    location: this.getElementLocation(img)
                });
            }
        });
        
        // Test form labels
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const hasLabel = document.querySelector(`label[for="${input.id}"]`) ||
                           input.getAttribute('aria-label') ||
                           input.getAttribute('aria-labelledby');
            
            if (!hasLabel) {
                violations.push({
                    element: input.tagName.toLowerCase(),
                    issue: 'Missing label',
                    location: this.getElementLocation(input)
                });
            }
        });
        
        this.testResults.set('screenReader', {
            passed: violations.length === 0,
            violations
        });
    }
    
    async testTouchAccessibility() {
        const touchTargets = document.querySelectorAll('button, a, input, select, textarea, [role="button"], [role="link"]');
        const violations = [];
        
        touchTargets.forEach(element => {
            const rect = element.getBoundingClientRect();
            const minSize = 44; // WCAG 2.1 AA minimum
            
            if (rect.width < minSize || rect.height < minSize) {
                violations.push({
                    element: element.tagName.toLowerCase(),
                    issue: `Touch target too small: ${rect.width}x${rect.height}px (minimum: ${minSize}x${minSize}px)`,
                    location: this.getElementLocation(element)
                });
            }
        });
        
        this.testResults.set('touchAccessibility', {
            passed: violations.length === 0,
            violations,
            totalElements: touchTargets.length
        });
    }
    
    async testResponsiveAccessibility() {
        const viewports = [320, 768, 1024, 1440];
        const violations = [];
        
        for (const viewport of viewports) {
            // Simulate viewport change
            window.resizeTo(viewport, 800);
            await new Promise(resolve => setTimeout(resolve, 100));
            
            // Test horizontal scrolling
            if (document.documentElement.scrollWidth > viewport) {
                violations.push({
                    viewport,
                    issue: 'Horizontal scrolling detected',
                    scrollWidth: document.documentElement.scrollWidth
                });
            }
            
            // Test content visibility
            const hiddenContent = document.querySelectorAll('[aria-hidden="true"]');
            hiddenContent.forEach(element => {
                if (element.textContent.trim() && this.isEssentialContent(element)) {
                    violations.push({
                        viewport,
                        element: element.tagName.toLowerCase(),
                        issue: 'Essential content hidden',
                        location: this.getElementLocation(element)
                    });
                }
            });
        }
        
        this.testResults.set('responsiveAccessibility', {
            passed: violations.length === 0,
            violations
        });
    }
    
    calculateContrastRatio(foreground, background) {
        const fgLum = this.getLuminance(foreground);
        const bgLum = this.getLuminance(background);
        
        const lighter = Math.max(fgLum, bgLum);
        const darker = Math.min(fgLum, bgLum);
        
        return (lighter + 0.05) / (darker + 0.05);
    }
    
    getLuminance(color) {
        const rgb = this.parseColor(color);
        if (!rgb) return 0.5;
        
        const [r, g, b] = rgb.map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
        });
        
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }
    
    parseColor(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])] : null;
    }
    
    getBackgroundColor(element) {
        let bg = window.getComputedStyle(element).backgroundColor;
        let parent = element.parentElement;
        
        while (bg === 'rgba(0, 0, 0, 0)' && parent) {
            bg = window.getComputedStyle(parent).backgroundColor;
            parent = parent.parentElement;
        }
        
        return bg === 'rgba(0, 0, 0, 0)' ? 'rgb(255, 255, 255)' : bg;
    }
    
    getElementLocation(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        };
    }
    
    isEssentialContent(element) {
        // Check if content contains important navigation, form controls, or primary content
        const essentialSelectors = ['nav', 'main', 'form', '[role="main"]', '[role="navigation"]'];
        return essentialSelectors.some(selector => element.matches(selector) || element.closest(selector));
    }
    
    generateAccessibilityReport() {
        const report = {
            timestamp: new Date().toISOString(),
            overallScore: 0,
            totalViolations: 0,
            testResults: {}
        };
        
        let passedTests = 0;
        let totalTests = 0;
        
        this.testResults.forEach((result, testName) => {
            report.testResults[testName] = result;
            report.totalViolations += result.violations.length;
            
            if (result.passed) passedTests++;
            totalTests++;
        });
        
        report.overallScore = Math.round((passedTests / totalTests) * 100);
        report.wcagCompliance = this.assessWCAGCompliance(report.totalViolations);
        
        return report;
    }
    
    assessWCAGCompliance(violationCount) {
        if (violationCount === 0) return 'AA Compliant';
        if (violationCount <= 3) return 'Mostly Compliant';
        if (violationCount <= 10) return 'Partially Compliant';
        return 'Non-Compliant';
    }
}
```

## Best Practices Summary

### Accessibility Guidelines for Responsive Design

✅ **Color Contrast**: Maintain WCAG AA (4.5:1) or AAA (7:1) contrast ratios  
✅ **Touch Targets**: Minimum 44px × 44px for all interactive elements  
✅ **Keyboard Navigation**: Full keyboard accessibility with visible focus indicators  
✅ **Screen Reader Support**: Semantic HTML with proper ARIA labels  
✅ **Responsive Text**: Ensure readability at all zoom levels (up to 200%)  
✅ **Motion Preferences**: Respect `prefers-reduced-motion` settings  
✅ **Error Handling**: Clear, accessible error messages and validation  

❌ **Color-Only Information**: Don't rely solely on color to convey information  
❌ **Tiny Touch Targets**: Avoid buttons smaller than 44px on any axis  
❌ **Missing Focus States**: Always provide visible focus indicators  
❌ **Inaccessible Forms**: Label all form controls properly  
❌ **Auto-Playing Media**: Respect user preferences for motion and sound  

### Responsive Accessibility Testing Checklist

- [ ] Test with screen readers (NVDA, JAWS, VoiceOver)
- [ ] Verify keyboard navigation at all breakpoints
- [ ] Check color contrast ratios in all themes
- [ ] Test touch target sizes on actual devices
- [ ] Validate with accessibility testing tools
- [ ] Test with users who have disabilities
- [ ] Verify responsive zoom functionality (up to 200%)
- [ ] Check motion and animation preferences

This comprehensive accessibility framework ensures that responsive designs are truly inclusive and usable by everyone, regardless of ability or device.
