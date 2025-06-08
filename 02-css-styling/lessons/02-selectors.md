# CSS Selectors and Specificity

## Introduction to Selectors

CSS selectors are patterns used to select and style HTML elements.

## Basic Selectors

### Element Selector
```css
/* Selects all <p> elements */
p {
    color: blue;
}

/* Selects all <h1> elements */
h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}
```

### Class Selector
```css
/* Selects elements with class="highlight" */
.highlight {
    background-color: yellow;
    padding: 0.5rem;
}

/* Multiple classes */
.btn.primary {
    background-color: #007bff;
    color: white;
}
```

### ID Selector
```css
/* Selects element with id="header" */
#header {
    background-color: #333;
    color: white;
    padding: 2rem;
}

/* IDs should be unique per page */
#navigation {
    position: fixed;
    top: 0;
    width: 100%;
}
```

### Universal Selector
```css
/* Selects all elements */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

## Attribute Selectors

### Basic Attribute Selectors
```css
/* Elements with specific attribute */
[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Elements with specific attribute value */
[type="text"] {
    border: 1px solid #ccc;
    padding: 0.5rem;
}

/* Case-insensitive attribute value */
[type="text" i] {
    /* Matches TEXT, text, Text, etc. */
}
```

### Advanced Attribute Selectors
```css
/* Attribute contains specific value */
[class*="btn"] {
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

/* Attribute starts with specific value */
[href^="https://"] {
    color: green;
}

/* Attribute ends with specific value */
[href$=".pdf"] {
    background-image: url('pdf-icon.png');
    padding-left: 20px;
}

/* Attribute contains word in space-separated list */
[class~="active"] {
    font-weight: bold;
}

/* Attribute starts with value followed by hyphen */
[lang|="en"] {
    /* Matches en, en-US, en-GB, etc. */
}
```

## Pseudo-classes

### Dynamic Pseudo-classes
```css
/* Link states */
a:link { color: blue; }
a:visited { color: purple; }
a:hover { color: red; }
a:active { color: orange; }

/* Form states */
input:focus {
    outline: 2px solid #007bff;
    border-color: #007bff;
}

input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

input:checked + label {
    font-weight: bold;
}

input:invalid {
    border-color: red;
}

input:valid {
    border-color: green;
}
```

### Structural Pseudo-classes
```css
/* First and last child */
li:first-child {
    margin-top: 0;
}

li:last-child {
    margin-bottom: 0;
}

/* Nth child selectors */
tr:nth-child(odd) {
    background-color: #f9f9f9;
}

tr:nth-child(even) {
    background-color: white;
}

tr:nth-child(3n) {
    /* Every 3rd element */
    font-weight: bold;
}

tr:nth-child(3n+1) {
    /* 1st, 4th, 7th, etc. */
    color: blue;
}

/* First/last of type */
h2:first-of-type {
    margin-top: 0;
}

p:last-of-type {
    margin-bottom: 0;
}

/* Only child */
p:only-child {
    text-align: center;
}

/* Empty elements */
div:empty {
    display: none;
}

/* Root element */
:root {
    --main-color: #333;
    --accent-color: #007bff;
}
```

### Negation Pseudo-class
```css
/* Select all inputs except submit buttons */
input:not([type="submit"]) {
    margin-bottom: 1rem;
}

/* Select all elements except those with class .special */
p:not(.special) {
    line-height: 1.6;
}

/* Multiple conditions in :not() */
input:not([type="submit"]):not([type="reset"]) {
    border: 1px solid #ccc;
}
```

## Pseudo-elements

### Content Pseudo-elements
```css
/* First line and first letter */
p::first-line {
    font-weight: bold;
}

p::first-letter {
    font-size: 2em;
    float: left;
    margin-right: 0.2em;
}

/* Before and after */
.quote::before {
    content: """;
    font-size: 2em;
    color: #ccc;
}

.quote::after {
    content: """;
    font-size: 2em;
    color: #ccc;
}

/* Adding icons with pseudo-elements */
.external-link::after {
    content: " ↗";
    font-size: 0.8em;
}

.required::after {
    content: " *";
    color: red;
}
```

### Form Pseudo-elements
```css
/* Placeholder styling */
input::placeholder {
    color: #999;
    font-style: italic;
}

/* File input styling */
input[type="file"]::file-selector-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

/* Selection styling */
::selection {
    background-color: #007bff;
    color: white;
}
```

## Combinators

### Descendant Combinator (Space)
```css
/* Selects all <p> elements inside <div> elements */
div p {
    margin-bottom: 1rem;
}

/* Multiple levels */
article section p {
    font-size: 1.1rem;
}
```

### Child Combinator (>)
```css
/* Selects direct <li> children of <ul> */
ul > li {
    list-style-type: disc;
}

/* Only direct children, not nested */
.menu > li {
    display: inline-block;
}
```

### Adjacent Sibling Combinator (+)
```css
/* Selects <p> immediately following <h2> */
h2 + p {
    margin-top: 0;
    font-weight: bold;
}

/* Form labels */
input + label {
    margin-left: 0.5rem;
}
```

### General Sibling Combinator (~)
```css
/* Selects all <p> elements that follow <h2> */
h2 ~ p {
    color: #666;
}

/* All siblings after specific element */
.active ~ .sibling {
    opacity: 0.5;
}
```

## Selector Specificity

### Specificity Calculation
```css
/* Specificity: 0-0-0-1 (1 element) */
p { color: red; }

/* Specificity: 0-0-1-0 (1 class) */
.highlight { color: blue; }

/* Specificity: 0-1-0-0 (1 ID) */
#header { color: green; }

/* Specificity: 0-0-1-1 (1 class + 1 element) */
p.highlight { color: purple; }

/* Specificity: 0-1-1-1 (1 ID + 1 class + 1 element) */
#header .nav a { color: orange; }

/* Inline styles: 1-0-0-0 */
/* style="color: yellow;" */

/* !important: Overrides specificity */
p { color: black !important; }
```

### Managing Specificity
```css
/* Use classes instead of IDs for styling */
.header { /* Better than #header */ }

/* Keep specificity low */
.nav-link { /* Better than .nav ul li a */ }

/* Use specific context when needed */
.sidebar .nav-link {
    font-size: 0.9rem;
}

/* Avoid !important unless absolutely necessary */
.utility-hidden {
    display: none !important; /* OK for utilities */
}
```

## Advanced Selectors

### CSS4 Selectors (Limited Support)
```css
/* Has pseudo-class (limited support) */
div:has(img) {
    border: 2px solid #ccc;
}

/* Where pseudo-class (better specificity control) */
:where(.btn, .button) {
    padding: 0.5rem 1rem;
    border-radius: 4px;
}

/* Is pseudo-class */
:is(h1, h2, h3) {
    line-height: 1.2;
    margin-bottom: 1rem;
}
```

### Complex Selector Examples
```css
/* Form validation styling */
.form-group:has(input:invalid) .error-message {
    display: block;
    color: red;
}

/* Table styling */
table tbody tr:nth-child(even) td {
    background-color: #f9f9f9;
}

/* Navigation active states */
.nav-item:hover .dropdown-menu,
.nav-item:focus-within .dropdown-menu {
    display: block;
}

/* Card components */
.card:hover .card-overlay,
.card:focus-within .card-overlay {
    opacity: 1;
    transform: translateY(0);
}
```

## Practical Examples

### Navigation Menu
```css
/* Main navigation */
.nav {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav > li {
    position: relative;
}

.nav > li > a {
    display: block;
    padding: 1rem;
    text-decoration: none;
    color: #333;
    transition: background-color 0.3s;
}

.nav > li > a:hover,
.nav > li > a:focus {
    background-color: #f5f5f5;
}

/* Dropdown menu */
.nav li ul {
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    display: none;
}

.nav li:hover ul,
.nav li:focus-within ul {
    display: block;
}

.nav li ul li a {
    padding: 0.75rem 1rem;
    white-space: nowrap;
}
```

### Form Styling
```css
/* Form container */
.form-group {
    margin-bottom: 1.5rem;
    position: relative;
}

/* Label styling */
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

/* Required field indicator */
.form-group label.required::after {
    content: " *";
    color: red;
}

/* Input styling */
.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s, box-shadow 0.3s;
}

/* Focus states */
.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Error states */
.form-group input:invalid,
.form-group.error input {
    border-color: #dc3545;
}

.form-group input:invalid:focus,
.form-group.error input:focus {
    box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.25);
}

/* Success states */
.form-group input:valid {
    border-color: #28a745;
}

/* Error message */
.form-group .error-message {
    display: none;
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #dc3545;
}

.form-group.error .error-message,
.form-group:has(input:invalid) .error-message {
    display: block;
}
```

### Card Components
```css
/* Base card */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

/* Card sections */
.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e9ecef;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e9ecef;
}

/* Card with image */
.card:has(.card-image) .card-body {
    padding-top: 1rem;
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

/* Card variants */
.card.featured {
    border: 2px solid #007bff;
}

.card.featured .card-header {
    background-color: #007bff;
    color: white;
}
```

## Performance Considerations

### Efficient Selectors
```css
/* Good: Specific and efficient */
.nav-item { }
.btn-primary { }

/* Avoid: Overly complex selectors */
/* div > ul > li > a > span { } */

/* Good: Use classes for frequently styled elements */
.article-title { }

/* Avoid: Deep descendant selectors */
/* article section div p span { } */
```

### CSS Organization
```css
/* Group related selectors */
.btn,
.button,
input[type="submit"],
input[type="button"] {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

/* Use logical grouping */
/* Typography */
h1, h2, h3, h4, h5, h6 { font-family: 'Heading Font', sans-serif; }
p, li, td { font-family: 'Body Font', sans-serif; }

/* Layout */
.container, .wrapper { max-width: 1200px; margin: 0 auto; }
.row { display: flex; flex-wrap: wrap; }
```

## Exercise

Create a comprehensive selector exercise:

1. **Navigation Menu**: Style a multi-level navigation using descendant and pseudo-class selectors
2. **Form Validation**: Use attribute and pseudo-class selectors for form styling
3. **Table Styling**: Apply nth-child selectors for alternating row colors
4. **Card Grid**: Use various selectors for hover effects and component states
5. **Typography**: Implement a type scale using element and pseudo-element selectors

### Bonus Challenges:
- Implement a "dark mode" toggle using CSS custom properties and selectors
- Create accessible focus indicators using pseudo-classes
- Build a responsive navigation menu that works without JavaScript
- Style form validation states using only CSS selectors
