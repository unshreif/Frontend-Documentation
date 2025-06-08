# CSS Organization and Methodologies

## Introduction

Organizing CSS effectively is crucial for maintainable, scalable, and collaborative web development.

## CSS Architecture Principles

### Scalability
```css
/* Bad: Overly specific selectors */
.header .nav .menu .item .link {
    color: blue;
}

/* Good: Component-based approach */
.nav-link {
    color: blue;
}

.nav-link--active {
    color: darkblue;
    font-weight: bold;
}
```

### Maintainability
```css
/* Bad: Magic numbers and unclear relationships */
.element {
    margin-top: 23px;
    padding: 17px;
    border-radius: 8px;
}

/* Good: Consistent system with variables */
:root {
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --border-radius: 0.5rem;
}

.element {
    margin-top: var(--spacing-lg);
    padding: var(--spacing-md);
    border-radius: var(--border-radius);
}
```

### Reusability
```css
/* Bad: Repetitive styles */
.button-primary {
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: blue;
    color: white;
}

.button-secondary {
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: gray;
    color: white;
}

/* Good: Base class with variations */
.btn {
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    transition: all 0.2s ease;
}

.btn--primary {
    background: blue;
    color: white;
}

.btn--secondary {
    background: gray;
    color: white;
}
```

## BEM Methodology

### BEM Structure
```css
/* Block: Independent component */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
}

/* Element: Part of a block */
.card__header {
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
}

.card__title {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0;
}

.card__content {
    line-height: 1.6;
}

.card__footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
}

.card__action {
    display: inline-block;
    margin-right: 0.5rem;
}

/* Modifier: Variation of block or element */
.card--featured {
    border: 2px solid #007bff;
    background: #f8f9ff;
}

.card--compact {
    padding: 1rem;
}

.card__title--large {
    font-size: 1.5rem;
}

.card__content--highlight {
    background: #fff3cd;
    padding: 0.75rem;
    border-radius: 4px;
}
```

### BEM HTML Structure
```html
<div class="card card--featured">
    <header class="card__header">
        <h2 class="card__title card__title--large">Featured Article</h2>
    </header>
    <div class="card__content">
        <p>This is the card content...</p>
        <div class="card__content card__content--highlight">
            Important information
        </div>
    </div>
    <footer class="card__footer">
        <a href="#" class="card__action btn btn--primary">Read More</a>
        <a href="#" class="card__action btn btn--secondary">Share</a>
    </footer>
</div>
```

### Complex BEM Examples
```css
/* Navigation component */
.nav {
    display: flex;
    align-items: center;
    padding: 1rem;
}

.nav__brand {
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    color: inherit;
}

.nav__menu {
    display: flex;
    margin-left: auto;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav__item {
    margin-left: 1rem;
}

.nav__link {
    text-decoration: none;
    color: inherit;
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;
}

.nav__link--active {
    background-color: #e9ecef;
    font-weight: bold;
}

.nav__link:hover {
    background-color: #f8f9fa;
}

.nav--dark {
    background-color: #333;
    color: white;
}

.nav--dark .nav__link:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

.nav--dark .nav__link--active {
    background-color: rgba(255, 255, 255, 0.2);
}
```

## Atomic CSS / Utility-First

### Utility Classes
```css
/* Spacing utilities */
.m-0 { margin: 0; }
.m-1 { margin: 0.25rem; }
.m-2 { margin: 0.5rem; }
.m-3 { margin: 0.75rem; }
.m-4 { margin: 1rem; }
.m-5 { margin: 1.25rem; }

.mt-0 { margin-top: 0; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }

.p-0 { padding: 0; }
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }

/* Display utilities */
.d-none { display: none; }
.d-block { display: block; }
.d-inline { display: inline; }
.d-inline-block { display: inline-block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Flexbox utilities */
.flex-row { flex-direction: row; }
.flex-column { flex-direction: column; }
.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.align-start { align-items: flex-start; }
.align-center { align-items: center; }
.align-end { align-items: flex-end; }

/* Typography utilities */
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.font-thin { font-weight: 100; }
.font-normal { font-weight: 400; }
.font-bold { font-weight: 700; }

/* Color utilities */
.text-primary { color: #007bff; }
.text-secondary { color: #6c757d; }
.text-success { color: #28a745; }
.text-danger { color: #dc3545; }
.bg-primary { background-color: #007bff; }
.bg-secondary { background-color: #6c757d; }
.bg-light { background-color: #f8f9fa; }
.bg-dark { background-color: #343a40; }

/* Border utilities */
.border { border: 1px solid #dee2e6; }
.border-0 { border: 0; }
.border-top { border-top: 1px solid #dee2e6; }
.border-right { border-right: 1px solid #dee2e6; }
.border-bottom { border-bottom: 1px solid #dee2e6; }
.border-left { border-left: 1px solid #dee2e6; }
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-full { border-radius: 50%; }

/* Responsive utilities */
@media (min-width: 576px) {
    .d-sm-none { display: none; }
    .d-sm-block { display: block; }
    .d-sm-flex { display: flex; }
    .text-sm-left { text-align: left; }
    .text-sm-center { text-align: center; }
}

@media (min-width: 768px) {
    .d-md-none { display: none; }
    .d-md-block { display: block; }
    .d-md-flex { display: flex; }
    .text-md-left { text-align: left; }
    .text-md-center { text-align: center; }
}
```

### Utility-First Example
```html
<div class="d-flex justify-between align-center p-4 bg-light border rounded">
    <h1 class="text-xl font-bold text-primary m-0">Dashboard</h1>
    <div class="d-flex align-center">
        <span class="text-sm text-secondary mr-3">Welcome, User</span>
        <button class="btn bg-primary text-white px-4 py-2 rounded">Logout</button>
    </div>
</div>

<div class="d-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">
    <div class="bg-white p-4 border rounded shadow-sm">
        <h2 class="text-lg font-bold mb-3">Statistics</h2>
        <div class="d-flex justify-between">
            <span class="text-secondary">Total Users</span>
            <span class="font-bold">1,234</span>
        </div>
    </div>
</div>
```

## OOCSS (Object-Oriented CSS)

### Separation of Structure and Skin
```css
/* Structure */
.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid;
    border-radius: 0.25rem;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

/* Skins */
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;
    color: white;
}

.btn-outline {
    background-color: transparent;
    color: #007bff;
    border-color: #007bff;
}

/* Sizes */
.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.btn-lg {
    padding: 1rem 2rem;
    font-size: 1.125rem;
}
```

### Separation of Container and Content
```css
/* Bad: Location-dependent styling */
.sidebar h3 {
    font-size: 1.25rem;
    color: #666;
}

.footer h3 {
    font-size: 1.25rem;
    color: #666;
}

/* Good: Reusable heading object */
.heading-section {
    font-size: 1.25rem;
    color: #666;
    margin-bottom: 1rem;
    font-weight: 600;
}

/* Used anywhere */
.sidebar .heading-section { }
.footer .heading-section { }
.main .heading-section { }
```

## SMACSS (Scalable and Modular Architecture)

### Category Organization
```css
/* ===== BASE ===== */
/* Default styles for HTML elements */
html {
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: inherit;
}

body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
}

h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0.5em;
    line-height: 1.2;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* ===== LAYOUT ===== */
/* Major containing elements */
.l-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 1000;
}

.l-main {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
}

.l-sidebar {
    width: 250px;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
    overflow-y: auto;
}

.l-content {
    margin-left: 250px;
    padding: 2rem;
}

.l-footer {
    background: #f8f9fa;
    padding: 2rem 0;
    border-top: 1px solid #dee2e6;
}

/* ===== MODULES ===== */
/* Reusable components */
.card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.btn {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s;
}

.nav {
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-item {
    display: block;
}

.nav-link {
    display: block;
    padding: 0.75rem 1rem;
    color: inherit;
    text-decoration: none;
    transition: background-color 0.2s;
}

.nav-link:hover {
    background-color: rgba(0,0,0,0.05);
}

/* ===== STATE ===== */
/* State-based styles */
.is-hidden {
    display: none !important;
}

.is-visible {
    display: block !important;
}

.is-active {
    font-weight: bold;
    background-color: #e9ecef;
}

.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.is-loading {
    position: relative;
    pointer-events: none;
}

.is-loading::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255,255,255,0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.has-error {
    border-color: #dc3545 !important;
    box-shadow: 0 0 0 0.2rem rgba(220,53,69,0.25) !important;
}

.has-success {
    border-color: #28a745 !important;
    box-shadow: 0 0 0 0.2rem rgba(40,167,69,0.25) !important;
}

/* ===== THEME ===== */
/* Visual design variations */
.theme-dark {
    background-color: #2c3e50;
    color: #ecf0f1;
}

.theme-dark .card {
    background-color: #34495e;
    color: #ecf0f1;
}

.theme-dark .btn {
    border-color: #7f8c8d;
}
```

## File Organization

### Folder Structure
```
styles/
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│   └── _base.scss
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│   ├── _sidebar.scss
│   └── _grid.scss
├── components/
│   ├── _buttons.scss
│   ├── _cards.scss
│   ├── _forms.scss
│   ├── _navigation.scss
│   └── _modals.scss
├── pages/
│   ├── _home.scss
│   ├── _about.scss
│   └── _contact.scss
├── themes/
│   ├── _light.scss
│   └── _dark.scss
├── utilities/
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _functions.scss
│   └── _helpers.scss
├── vendors/
│   ├── _normalize.scss
│   └── _bootstrap-overrides.scss
└── main.scss
```

### Main Import File
```scss
// main.scss

// Utilities (loaded first)
@import 'utilities/variables';
@import 'utilities/functions';
@import 'utilities/mixins';

// Vendor files
@import 'vendors/normalize';

// Base styles
@import 'base/base';
@import 'base/typography';

// Layout
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';

// Components
@import 'components/buttons';
@import 'components/cards';
@import 'components/forms';
@import 'components/navigation';
@import 'components/modals';

// Pages
@import 'pages/home';
@import 'pages/about';
@import 'pages/contact';

// Themes
@import 'themes/light';
@import 'themes/dark';

// Utilities (loaded last)
@import 'utilities/helpers';
```

## CSS Naming Conventions

### Consistent Naming Patterns
```css
/* Component-based naming */
.component-name { }
.component-name__element { }
.component-name--modifier { }
.component-name__element--modifier { }

/* Utility naming */
.u-text-center { }
.u-margin-bottom-small { }
.u-display-none { }

/* Layout naming */
.l-container { }
.l-grid { }
.l-sidebar { }

/* State naming */
.is-active { }
.is-hidden { }
.is-loading { }
.has-error { }

/* JavaScript hooks */
.js-toggle-menu { }
.js-submit-form { }
.js-modal-trigger { }
```

### Semantic Naming
```css
/* Good: Semantic names */
.btn--primary { }
.text--success { }
.card--featured { }
.navigation--mobile { }

/* Avoid: Presentational names */
.btn--blue { }
.text--green { }
.card--large-shadow { }
.navigation--hamburger { }

/* Context-specific naming */
.product-card { }
.user-profile { }
.article-meta { }
.checkout-form { }
```

## Performance Optimization

### CSS Structure for Performance
```css
/* Efficient selectors - specific to general */
.navigation-item { }
.button { }
.card { }

/* Avoid expensive selectors */
/* Bad */
div > ul > li > a { }
[class*="icon-"] { }
:nth-child(2n+1) { }

/* Good */
.nav-link { }
.icon { }
.table-row--odd { }

/* Group related properties */
.optimized-element {
    /* Layout properties first */
    display: flex;
    position: relative;
    width: 100%;
    height: auto;
    
    /* Spacing */
    margin: 1rem 0;
    padding: 1rem;
    
    /* Typography */
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.5;
    
    /* Visual */
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    
    /* Behavioral */
    cursor: pointer;
    transition: all 0.2s ease;
}
```

### Critical CSS Strategy
```html
<head>
    <!-- Critical CSS inlined -->
    <style>
        /* Above-the-fold styles */
        .header { /* ... */ }
        .hero { /* ... */ }
        .navigation { /* ... */ }
    </style>
    
    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="preload" href="main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="main.css"></noscript>
</head>
```

## Documentation and Comments

### CSS Documentation
```css
/**
 * Button Component
 * 
 * A flexible button component with multiple variants and sizes.
 * 
 * @example
 * <button class="btn btn--primary btn--large">Click me</button>
 */
.btn {
    /* Base button styles */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--btn-padding-y) var(--btn-padding-x);
    border: 1px solid transparent;
    border-radius: var(--btn-border-radius);
    font-family: inherit;
    font-size: var(--btn-font-size);
    font-weight: 500;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;
    
    /* Prevent button from shrinking */
    flex-shrink: 0;
}

/**
 * Button Variants
 * Modify the appearance of buttons
 */
.btn--primary {
    background-color: var(--color-primary);
    border-color: var(--color-primary);
    color: white;
}

.btn--primary:hover {
    background-color: var(--color-primary-dark);
    border-color: var(--color-primary-dark);
}

/**
 * Button Sizes
 * @modifier small - Smaller button for compact layouts
 * @modifier large - Larger button for emphasis
 */
.btn--small {
    --btn-padding-y: 0.5rem;
    --btn-padding-x: 1rem;
    --btn-font-size: 0.875rem;
}

.btn--large {
    --btn-padding-y: 1rem;
    --btn-padding-x: 2rem;
    --btn-font-size: 1.125rem;
}
```

## Exercise

Create a comprehensive CSS architecture:

1. **Component System**: Build a complete set of reusable components using BEM
2. **Utility Framework**: Create a utility-first CSS framework
3. **File Organization**: Structure CSS files using SMACSS principles
4. **Theme System**: Implement multiple themes with proper organization
5. **Documentation**: Document components with examples and usage guidelines

### Bonus Challenges:
- Create a CSS style guide with live examples
- Build a component library with variants and states
- Implement a naming convention guide with tools for enforcement
- Create a performance-optimized CSS build process
- Design a CSS architecture that scales for large teams
