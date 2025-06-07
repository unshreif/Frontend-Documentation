# Media Queries Deep Dive

## Understanding Media Queries

### Basic Syntax and Structure
```css
/* Basic media query syntax */
@media media-type and (media-feature: value) {
    /* CSS rules */
}

/* Most common: screen type with width condition */
@media screen and (max-width: 768px) {
    .container {
        padding: 1rem;
    }
}

/* Multiple conditions */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .sidebar {
        width: 25%;
    }
}

/* OR logic using commas */
@media screen and (max-width: 480px), screen and (orientation: portrait) {
    .nav-menu {
        display: none;
    }
}
```

### Media Types
```css
/* Screen devices (default) */
@media screen {
    body { font-family: Arial, sans-serif; }
}

/* Print styles */
@media print {
    body { 
        font-family: "Times New Roman", serif;
        font-size: 12pt;
        color: black;
        background: white;
    }
    
    .no-print { display: none; }
    .page-break { page-break-before: always; }
}

/* All media types */
@media all {
    * { box-sizing: border-box; }
}

/* Speech synthesis (accessibility) */
@media speech {
    body { voice-family: male; }
    h1 { voice-stress: strong; }
}
```

## Width-Based Media Queries

### Standard Breakpoint Strategy
```css
/* Mobile-first approach */
/* Base styles for mobile (no media query needed) */
.container {
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
}

.grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

/* Small tablets and large phones */
@media screen and (min-width: 480px) {
    .container {
        padding: 1.5rem;
    }
}

/* Tablets */
@media screen and (min-width: 768px) {
    .container {
        max-width: 750px;
        padding: 2rem;
    }
    
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Small laptops */
@media screen and (min-width: 1024px) {
    .container {
        max-width: 1000px;
    }
    
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Large screens */
@media screen and (min-width: 1200px) {
    .container {
        max-width: 1170px;
    }
    
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* Extra large screens */
@media screen and (min-width: 1600px) {
    .container {
        max-width: 1400px;
    }
    
    .grid {
        grid-template-columns: repeat(5, 1fr);
        gap: 2rem;
    }
}
```

### Advanced Width Queries
```css
/* Range queries (modern browsers) */
@media screen and (480px <= width <= 768px) {
    /* Styles for tablets only */
    .tablet-specific {
        display: block;
    }
}

/* Container queries (cutting edge) */
@container (min-width: 300px) {
    .card {
        display: flex;
        flex-direction: row;
    }
}

/* Custom breakpoints for specific components */
.navigation {
    /* Mobile navigation styles */
}

@media screen and (min-width: 900px) {
    /* Switch to horizontal navigation at 900px 
       (different from main breakpoints) */
    .navigation {
        display: flex;
        justify-content: space-between;
    }
}
```

## Orientation and Aspect Ratio

### Orientation Queries
```css
/* Portrait orientation (height > width) */
@media screen and (orientation: portrait) {
    .hero-image {
        height: 50vh;
        object-fit: cover;
    }
    
    .sidebar {
        order: 2; /* Move sidebar below main content */
    }
}

/* Landscape orientation (width > height) */
@media screen and (orientation: landscape) {
    .hero-image {
        height: 100vh;
        width: 50vw;
        object-fit: cover;
    }
    
    .two-column {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}

/* Specific device orientations */
@media screen and (min-width: 768px) and (orientation: landscape) {
    /* Tablet landscape specific styles */
    .content {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
    }
}
```

### Aspect Ratio Queries
```css
/* Wide screens (cinematic aspect ratios) */
@media screen and (min-aspect-ratio: 16/9) {
    .hero-video {
        width: 100vw;
        height: 56.25vw; /* 16:9 aspect ratio */
    }
}

/* Square or tall screens */
@media screen and (max-aspect-ratio: 1/1) {
    .image-gallery {
        grid-template-columns: 1fr;
    }
}

/* Ultra-wide monitors */
@media screen and (min-aspect-ratio: 21/9) {
    .main-content {
        max-width: 70%;
        margin: 0 auto;
    }
    
    .sidebar {
        position: fixed;
        right: 0;
        width: 25%;
    }
}

/* Vertical phones and tablets */
@media screen and (max-aspect-ratio: 3/4) {
    .card-layout {
        grid-template-columns: 1fr;
    }
    
    .navigation {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
}
```

## High-DPI and Resolution Queries

### Device Pixel Ratio
```css
/* Standard resolution */
.logo {
    background-image: url('logo.png');
    width: 200px;
    height: 100px;
}

/* High-DPI displays (Retina, etc.) */
@media screen and (-webkit-min-device-pixel-ratio: 2),
       screen and (min-resolution: 192dpi),
       screen and (min-resolution: 2dppx) {
    .logo {
        background-image: url('logo@2x.png');
        background-size: 200px 100px;
    }
}

/* Extra high-DPI displays */
@media screen and (-webkit-min-device-pixel-ratio: 3),
       screen and (min-resolution: 288dpi),
       screen and (min-resolution: 3dppx) {
    .logo {
        background-image: url('logo@3x.png');
        background-size: 200px 100px;
    }
}

/* Print resolution */
@media print and (min-resolution: 300dpi) {
    .print-logo {
        background-image: url('logo-print-hires.png');
    }
}
```

### Resolution-Specific Optimizations
```css
/* Low-resolution optimizations */
@media screen and (max-resolution: 150dpi) {
    .complex-shadow {
        box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
}

/* High-resolution enhancements */
@media screen and (min-resolution: 200dpi) {
    .complex-shadow {
        box-shadow: 
            0 1px 3px rgba(0,0,0,0.12),
            0 1px 2px rgba(0,0,0,0.24);
    }
    
    .thin-border {
        border-width: 0.5px; /* Sub-pixel borders on high-DPI */
    }
}
```

## Advanced Media Features

### Color and Display Capabilities
```css
/* Color support */
@media screen and (color) {
    .colorful-design {
        background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    }
}

/* Monochrome displays */
@media screen and (monochrome) {
    .image {
        filter: grayscale(100%);
    }
}

/* Color gamut support */
@media screen and (color-gamut: srgb) {
    .wide-color {
        color: color(display-p3 1 0 0); /* P3 red when supported */
    }
}

/* High contrast mode */
@media screen and (prefers-contrast: high) {
    .button {
        border: 3px solid;
        background: white;
        color: black;
    }
}

/* Reduced motion preference */
@media screen and (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Dark mode preference */
@media screen and (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #ffffff;
        --accent-color: #4a9eff;
    }
    
    body {
        background-color: var(--bg-color);
        color: var(--text-color);
    }
}

/* Light mode preference */
@media screen and (prefers-color-scheme: light) {
    :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --accent-color: #007bff;
    }
}
```

### Interaction Capabilities
```css
/* Touch-capable devices */
@media screen and (pointer: coarse) {
    .button {
        min-height: 44px; /* Minimum touch target size */
        min-width: 44px;
        padding: 12px 16px;
    }
    
    .dropdown {
        display: none; /* Hide hover-dependent dropdowns */
    }
}

/* Precise pointing devices (mouse) */
@media screen and (pointer: fine) {
    .button {
        padding: 8px 12px;
    }
    
    .hover-effect:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
}

/* Hover capability */
@media screen and (hover: hover) {
    .card:hover {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }
}

/* No hover capability */
@media screen and (hover: none) {
    .card {
        /* Remove hover-dependent styling */
        transition: none;
    }
}

/* Any hover capability available */
@media screen and (any-hover: hover) {
    .tooltip {
        display: block;
    }
}
```

## Complex Media Query Combinations

### Real-World Component Adaptations
```css
/* Navigation component with multiple breakpoints */
.navigation {
    /* Mobile: hamburger menu */
    position: relative;
}

.nav-toggle {
    display: block;
    background: none;
    border: none;
    cursor: pointer;
}

.nav-menu {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.nav-menu.active {
    display: block;
}

/* Small tablets: still hamburger but larger touch targets */
@media screen and (min-width: 480px) and (pointer: coarse) {
    .nav-toggle {
        padding: 12px;
        font-size: 1.2rem;
    }
    
    .nav-menu a {
        padding: 16px 20px;
        font-size: 1.1rem;
    }
}

/* Large tablets and up: horizontal navigation */
@media screen and (min-width: 768px) {
    .nav-toggle {
        display: none;
    }
    
    .nav-menu {
        display: flex !important;
        position: static;
        box-shadow: none;
        background: transparent;
    }
    
    .nav-menu a {
        padding: 8px 16px;
    }
}

/* Desktop with hover capability */
@media screen and (min-width: 768px) and (hover: hover) {
    .nav-menu a:hover {
        background-color: #f0f0f0;
        color: #007bff;
    }
}

/* Large screens: add more spacing */
@media screen and (min-width: 1200px) {
    .nav-menu a {
        padding: 12px 24px;
        font-size: 1.1rem;
    }
}
```

### Card Layout Responsive System
```css
.card-grid {
    display: grid;
    gap: 1rem;
    padding: 1rem;
}

/* Mobile: single column */
@media screen and (max-width: 479px) {
    .card-grid {
        grid-template-columns: 1fr;
    }
    
    .card {
        padding: 1rem;
    }
}

/* Large mobile/small tablet: 2 columns */
@media screen and (min-width: 480px) and (max-width: 767px) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

/* Tablet: 3 columns, but 2 on portrait */
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .card-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 2rem;
    }
}

@media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
    .card-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

/* Desktop: 4 columns */
@media screen and (min-width: 1024px) {
    .card-grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
        padding: 2rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}

/* Large desktop: 5 columns */
@media screen and (min-width: 1400px) {
    .card-grid {
        grid-template-columns: repeat(5, 1fr);
        max-width: 1600px;
    }
}

/* Dark mode adaptations */
@media screen and (prefers-color-scheme: dark) {
    .card {
        background-color: #2a2a2a;
        color: #ffffff;
        border-color: #444444;
    }
}

/* High contrast mode */
@media screen and (prefers-contrast: high) {
    .card {
        border: 2px solid;
        background-color: white;
        color: black;
    }
}

/* Reduced motion */
@media screen and (prefers-reduced-motion: reduce) {
    .card {
        transition: none;
    }
}

/* Touch devices: larger touch targets */
@media screen and (pointer: coarse) {
    .card .button {
        min-height: 44px;
        padding: 12px 16px;
    }
}
```

## Media Query Organization and Best Practices

### CSS Organization Strategies
```css
/* Method 1: Mobile-first with component grouping */
/* Base styles (mobile) */
.header {
    padding: 1rem;
    background: #333;
}

.navigation {
    display: none;
}

.main-content {
    padding: 1rem;
}

/* Tablet styles */
@media screen and (min-width: 768px) {
    .header {
        padding: 1.5rem 2rem;
    }
    
    .navigation {
        display: block;
    }
    
    .main-content {
        padding: 2rem;
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media screen and (min-width: 1024px) {
    .header {
        padding: 2rem;
    }
    
    .main-content {
        max-width: 1000px;
        padding: 3rem;
    }
}

/* Method 2: Breakpoint-first organization */
/* All mobile styles */
@media screen and (max-width: 767px) {
    .mobile-menu { display: block; }
    .desktop-menu { display: none; }
    .sidebar { order: 2; }
}

/* All tablet styles */
@media screen and (min-width: 768px) and (max-width: 1023px) {
    .container { max-width: 750px; }
    .grid { grid-template-columns: repeat(2, 1fr); }
}

/* All desktop styles */
@media screen and (min-width: 1024px) {
    .container { max-width: 1200px; }
    .grid { grid-template-columns: repeat(3, 1fr); }
    .sidebar { width: 25%; }
}
```

### Performance Optimization
```css
/* Use efficient selectors in media queries */
/* Good: specific, efficient selectors */
@media screen and (max-width: 768px) {
    .nav-item { padding: 0.5rem; }
    .card-title { font-size: 1.2rem; }
}

/* Avoid: overly complex selectors in media queries */
@media screen and (max-width: 768px) {
    .container .row .col .card .header .title { /* Too specific */ }
}

/* Minimize media query repetition */
/* Instead of repeating the same query: */
@media screen and (max-width: 768px) {
    .element1 { /* styles */ }
}
@media screen and (max-width: 768px) {
    .element2 { /* styles */ }
}

/* Group them together: */
@media screen and (max-width: 768px) {
    .element1 { /* styles */ }
    .element2 { /* styles */ }
}
```

## Testing and Debugging Media Queries

### Browser Developer Tools
```css
/* Add visual debugging for breakpoints */
body::before {
    content: "Mobile";
    position: fixed;
    top: 0;
    right: 0;
    background: red;
    color: white;
    padding: 0.5rem;
    z-index: 9999;
    font-size: 0.8rem;
}

@media screen and (min-width: 480px) {
    body::before { 
        content: "Large Mobile"; 
        background: orange; 
    }
}

@media screen and (min-width: 768px) {
    body::before { 
        content: "Tablet"; 
        background: yellow; 
        color: black; 
    }
}

@media screen and (min-width: 1024px) {
    body::before { 
        content: "Desktop"; 
        background: green; 
    }
}

@media screen and (min-width: 1200px) {
    body::before { 
        content: "Large Desktop"; 
        background: blue; 
    }
}

/* Remove in production */
@media print {
    body::before { display: none; }
}
```

### JavaScript Integration
```javascript
// Check media query matches in JavaScript
const mobileQuery = window.matchMedia('(max-width: 768px)');
const tabletQuery = window.matchMedia('(min-width: 769px) and (max-width: 1023px)');
const desktopQuery = window.matchMedia('(min-width: 1024px)');

function handleScreenChange() {
    if (mobileQuery.matches) {
        console.log('Mobile view');
        // Mobile-specific JavaScript
    } else if (tabletQuery.matches) {
        console.log('Tablet view');
        // Tablet-specific JavaScript
    } else if (desktopQuery.matches) {
        console.log('Desktop view');
        // Desktop-specific JavaScript
    }
}

// Listen for changes
mobileQuery.addListener(handleScreenChange);
tabletQuery.addListener(handleScreenChange);
desktopQuery.addListener(handleScreenChange);

// Initial check
handleScreenChange();
```

## Practical Exercise: Responsive Media Query System

Create a comprehensive responsive layout using advanced media query techniques:

### Requirements:
1. **Progressive Enhancement**: Start with mobile-first approach
2. **Multiple Breakpoints**: Handle phones, tablets, desktops, and large screens
3. **Orientation Handling**: Different layouts for portrait vs landscape
4. **Accessibility**: Support for reduced motion and high contrast
5. **Dark Mode**: Implement prefers-color-scheme
6. **Touch Optimization**: Larger targets for touch devices
7. **Print Styles**: Optimized layout for printing

### Deliverables:
- Complete CSS with organized media queries
- Test across different devices and orientations
- Validate accessibility features
- Performance analysis and optimization
