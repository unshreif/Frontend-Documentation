# CSS Selectors and Specificity

## Basic Selectors

### Universal Selector
```css
/* Selects all elements */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Use sparingly as it can impact performance */
```

### Type Selectors (Element Selectors)
```css
/* Select all paragraphs */
p {
    line-height: 1.6;
    margin-bottom: 1rem;
}

/* Select all headings */
h1, h2, h3, h4, h5, h6 {
    font-family: 'Arial', sans-serif;
    font-weight: bold;
    margin-bottom: 0.5rem;
}

/* Select all links */
a {
    color: #007bff;
    text-decoration: none;
}
```

### Class Selectors
```css
/* Single class */
.button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* Multiple classes (both must be present) */
.button.primary {
    background-color: #0056b3;
    font-weight: bold;
}

.button.large {
    padding: 0.75rem 1.5rem;
    font-size: 1.2rem;
}

/* Element with specific class */
button.danger {
    background-color: #dc3545;
}

div.container {
    max-width: 1200px;
    margin: 0 auto;
}
```

### ID Selectors
```css
/* Unique element identifier */
#header {
    background-color: #333;
    color: white;
    padding: 1rem;
}

#navigation {
    display: flex;
    justify-content: space-between;
}

/* ID selectors are highly specific - use sparingly */
#main-content {
    min-height: 100vh;
    padding: 2rem;
}
```

## Attribute Selectors

### Basic Attribute Selectors
```css
/* Elements with specific attribute */
input[required] {
    border: 2px solid #ff6b6b;
}

img[alt] {
    /* Images with alt text */
    border: 2px solid green;
}

a[href] {
    /* Links with href attribute */
    color: blue;
}
```

### Attribute Value Selectors
```css
/* Exact value match */
input[type="email"] {
    background-image: url('email-icon.png');
}

input[type="password"] {
    background-image: url('lock-icon.png');
}

a[target="_blank"] {
    /* External links */
    color: #e74c3c;
}

/* Contains word (space-separated) */
a[class~="external"] {
    /* Elements with "external" as one of the class names */
    text-decoration: underline;
}

/* Starts with value */
a[href^="https://"] {
    /* Secure links */
    color: #27ae60;
}

a[href^="mailto:"] {
    /* Email links */
    color: #f39c12;
}

/* Ends with value */
a[href$=".pdf"] {
    /* PDF links */
    background: url('pdf-icon.png') no-repeat left center;
    padding-left: 20px;
}

img[src$=".jpg"],
img[src$=".jpeg"],
img[src$=".png"] {
    /* Image files */
    max-width: 100%;
    height: auto;
}

/* Contains substring anywhere */
a[href*="youtube"] {
    /* YouTube links */
    color: #ff0000;
}

/* Language attribute (starts with) */
div[lang|="en"] {
    /* en, en-US, en-GB, etc. */
    font-family: "Times New Roman", serif;
}
```

### Case-Insensitive Attribute Selectors
```css
/* Case-insensitive matching (modern browsers) */
a[href$=".PDF" i] {
    /* Matches .pdf, .PDF, .Pdf, etc. */
    background: url('pdf-icon.png') no-repeat left center;
    padding-left: 20px;
}
```

## Pseudo-Classes

### Link and User Action Pseudo-Classes
```css
/* Link states */
a:link {
    /* Unvisited links */
    color: #007bff;
}

a:visited {
    /* Visited links */
    color: #6f42c1;
}

a:hover {
    /* Mouse hover */
    color: #0056b3;
    text-decoration: underline;
}

a:active {
    /* Being clicked */
    color: #004085;
}

a:focus {
    /* Keyboard focus */
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Interactive elements */
button:hover {
    background-color: #0056b3;
    transform: translateY(-1px);
}

button:active {
    transform: translateY(0);
}

button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
    opacity: 0.6;
}
```

### Structural Pseudo-Classes
```css
/* First and last child */
p:first-child {
    margin-top: 0;
}

p:last-child {
    margin-bottom: 0;
}

/* Only child */
img:only-child {
    display: block;
    margin: 0 auto;
}

/* nth-child selectors */
li:nth-child(odd) {
    /* 1st, 3rd, 5th, etc. */
    background-color: #f8f9fa;
}

li:nth-child(even) {
    /* 2nd, 4th, 6th, etc. */
    background-color: #e9ecef;
}

li:nth-child(3n) {
    /* Every 3rd item (3, 6, 9, etc.) */
    font-weight: bold;
}

li:nth-child(3n+1) {
    /* 1st, 4th, 7th, etc. */
    color: #007bff;
}

/* First and last n children */
li:nth-child(-n+3) {
    /* First 3 children */
    font-size: 1.2rem;
}

li:nth-last-child(-n+2) {
    /* Last 2 children */
    color: #dc3545;
}

/* Type-specific structural selectors */
h2:first-of-type {
    margin-top: 0;
}

img:last-of-type {
    margin-bottom: 2rem;
}

p:nth-of-type(2n) {
    /* Every 2nd paragraph */
    font-style: italic;
}
```

### Form Pseudo-Classes
```css
/* Form validation states */
input:valid {
    border-color: #28a745;
}

input:invalid {
    border-color: #dc3545;
}

input:required {
    background-color: #fff3cd;
}

input:optional {
    background-color: #f8f9fa;
}

/* Form interaction states */
input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

input:disabled {
    background-color: #e9ecef;
    cursor: not-allowed;
}

input:read-only {
    background-color: #f8f9fa;
}

/* Checkbox and radio states */
input[type="checkbox"]:checked + label {
    font-weight: bold;
    color: #28a745;
}

input[type="radio"]:checked + label {
    color: #007bff;
}
```

### Other Useful Pseudo-Classes
```css
/* Empty elements */
p:empty {
    display: none;
}

/* Root element */
:root {
    /* Define CSS custom properties */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --font-size-base: 1rem;
}

/* Target element (from URL fragment) */
:target {
    background-color: #fff3cd;
    border-left: 4px solid #ffc107;
    padding-left: 1rem;
}

/* Not selector (exclusion) */
input:not([type="submit"]) {
    /* All inputs except submit buttons */
    margin-bottom: 1rem;
}

li:not(:last-child) {
    /* All list items except the last one */
    border-bottom: 1px solid #dee2e6;
}
```

## Pseudo-Elements

### Content Generation
```css
/* Before and after content */
.quote::before {
    content: '"';
    font-size: 2rem;
    color: #6c757d;
    vertical-align: top;
}

.quote::after {
    content: '"';
    font-size: 2rem;
    color: #6c757d;
    vertical-align: bottom;
}

/* Adding icons */
.external-link::after {
    content: " ↗";
    font-size: 0.8rem;
    color: #6c757d;
}

.required-field::after {
    content: " *";
    color: #dc3545;
    font-weight: bold;
}

/* Tooltips */
.tooltip {
    position: relative;
}

.tooltip::after {
    content: attr(data-tooltip);
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
}

.tooltip:hover::after {
    opacity: 1;
}
```

### Text Selection and Formatting
```css
/* First line of paragraphs */
p::first-line {
    font-weight: bold;
    font-size: 1.1rem;
}

/* First letter (drop caps) */
.article::first-letter {
    float: left;
    font-size: 3rem;
    line-height: 1;
    margin: 0 0.1rem 0 0;
    color: #007bff;
}

/* Text selection */
::selection {
    background-color: #007bff;
    color: white;
}

::-moz-selection {
    background-color: #007bff;
    color: white;
}

/* Placeholder text */
input::placeholder {
    color: #6c757d;
    opacity: 1;
}

input::-webkit-input-placeholder {
    color: #6c757d;
}

input::-moz-placeholder {
    color: #6c757d;
}
```

## Combinators

### Descendant Combinator (Space)
```css
/* All paragraphs inside articles */
article p {
    text-align: justify;
    line-height: 1.8;
}

/* All links inside navigation */
nav a {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
}

/* Nested selectors */
.sidebar ul li a {
    display: block;
    padding: 0.25rem 0.5rem;
    border-bottom: 1px solid #dee2e6;
}
```

### Child Combinator (>)
```css
/* Direct children only */
.menu > li {
    /* Only immediate li children of .menu */
    float: left;
    margin-right: 1rem;
}

.card > h3 {
    /* Only h3 elements that are direct children of .card */
    margin-top: 0;
    color: #007bff;
}

/* Difference between descendant and child */
.parent p {
    /* All p elements inside .parent (any level) */
    color: blue;
}

.parent > p {
    /* Only p elements that are immediate children of .parent */
    color: red;
}
```

### Adjacent Sibling Combinator (+)
```css
/* Immediately following sibling */
h2 + p {
    /* Paragraph immediately after h2 */
    font-weight: bold;
    margin-top: 0;
}

.alert + .alert {
    /* Alert immediately after another alert */
    margin-top: -1px; /* Avoid double borders */
}

label + input {
    /* Input immediately after label */
    margin-left: 0.5rem;
}
```

### General Sibling Combinator (~)
```css
/* Any following sibling */
h2 ~ p {
    /* All paragraphs that follow h2 (same parent) */
    margin-left: 1rem;
}

.active ~ li {
    /* All li elements that follow .active */
    opacity: 0.6;
}

input:checked ~ label {
    /* Labels that follow checked input */
    font-weight: bold;
    color: #28a745;
}
```

## Specificity

### Specificity Calculation
```css
/* Specificity values (inline, IDs, classes, elements) */

/* 0,0,0,1 */
p { color: black; }

/* 0,0,1,0 */
.text { color: blue; }

/* 0,0,1,1 */
p.text { color: green; }

/* 0,0,2,0 */
.text.large { color: purple; }

/* 0,1,0,0 */
#content { color: red; }

/* 0,1,1,1 */
#content p.text { color: orange; }

/* 1,0,0,0 */
/* style="color: yellow;" (inline styles) */
```

### Practical Specificity Examples
```css
/* Low specificity - easy to override */
.btn {
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
}

/* Medium specificity */
.header .btn {
    background-color: #28a745;
}

/* Higher specificity */
.header .navigation .btn {
    background-color: #dc3545;
}

/* Avoid overly specific selectors */
/* BAD */
.header .navigation .menu .item .link.active {
    color: #ffc107;
}

/* BETTER */
.nav-link.active {
    color: #ffc107;
}
```

### Managing Specificity
```css
/* Use classes instead of IDs for styling */
/* Instead of this: */
#header { background: blue; }

/* Use this: */
.header { background: blue; }

/* Use CSS custom properties for easier overrides */
.button {
    background-color: var(--button-color, #007bff);
    color: var(--button-text-color, white);
}

/* Override with lower specificity */
.button--secondary {
    --button-color: #6c757d;
}

/* Use !important sparingly and document why */
.utility-hidden {
    display: none !important; /* Utility class that should always work */
}
```

## Advanced Selector Techniques

### Complex Combinations
```css
/* Multiple conditions */
input[type="text"]:focus:valid {
    border-color: #28a745;
    box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.25);
}

/* Conditional styling based on siblings */
input:checked + .toggle-content {
    display: block;
}

input:not(:checked) + .toggle-content {
    display: none;
}

/* Parent selector workaround using :has() (when available) */
.card:has(.card-image) {
    /* Style cards that contain images */
    border: 2px solid #dee2e6;
}

/* Fallback pattern for parent styling */
.card-with-image {
    border: 2px solid #dee2e6;
}
```

### Practical Pattern Examples
```css
/* Skip links for accessibility */
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    background: #000;
    color: white;
    padding: 8px;
    text-decoration: none;
    z-index: 1000;
}

.skip-link:focus {
    top: 6px;
}

/* Focus indicators for keyboard navigation */
button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Print styles */
@media print {
    .no-print {
        display: none !important;
    }
    
    a[href^="http"]:after {
        content: " (" attr(href) ")";
    }
}
```

## Exercise: Build a Component Library

Create CSS for a button component system using advanced selectors:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Selectors Exercise</title>
</head>
<body>
    <!-- Your task: Style these elements using the techniques above -->
    <nav class="navigation">
        <a href="#" class="nav-link active">Home</a>
        <a href="#" class="nav-link">About</a>
        <a href="#" class="nav-link">Services</a>
        <a href="#" class="nav-link">Contact</a>
    </nav>

    <main class="content">
        <article class="post">
            <h2>Article Title</h2>
            <p>First paragraph with <a href="#">internal link</a> and <a href="https://example.com" target="_blank">external link</a>.</p>
            <p>Second paragraph with different styling.</p>
            <p>Last paragraph in article.</p>
        </article>
        
        <form class="contact-form">
            <label for="name">Name *</label>
            <input type="text" id="name" required>
            
            <label for="email">Email *</label>
            <input type="email" id="email" required>
            
            <label for="message">Message</label>
            <textarea id="message"></textarea>
            
            <button type="submit">Send Message</button>
        </form>
    </main>
</body>
</html>
```

### Requirements:
1. Style navigation links with hover and active states
2. Style external links differently from internal links
3. Apply different styling to first, middle, and last paragraphs
4. Create focus styles for form elements
5. Style required fields differently
6. Use attribute selectors for input types
7. Implement proper specificity hierarchy
