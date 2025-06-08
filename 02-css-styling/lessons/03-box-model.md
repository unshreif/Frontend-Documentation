# CSS Box Model

## Introduction to the Box Model

Every HTML element is essentially a rectangular box, and the CSS box model describes how these boxes are structured and how their dimensions are calculated.

## The Box Model Components

```css
.box {
    /* Content area */
    width: 200px;
    height: 100px;
    
    /* Padding - space inside the element */
    padding: 20px;
    
    /* Border - the edge of the element */
    border: 2px solid #333;
    
    /* Margin - space outside the element */
    margin: 10px;
}
```

### Visual Representation
```
┌─────────────────────────────────────────┐ ← Margin
│ ┌─────────────────────────────────────┐ │ ← Border
│ │ ┌─────────────────────────────────┐ │ │ ← Padding
│ │ │                                 │ │ │
│ │ │            Content              │ │ │ ← Content Area
│ │ │                                 │ │ │
│ │ └─────────────────────────────────┘ │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Box Sizing

### Content-box (Default)
```css
.content-box {
    box-sizing: content-box; /* Default */
    width: 200px;
    padding: 20px;
    border: 2px solid black;
    /* Total width = 200px + 40px + 4px = 244px */
}
```

### Border-box (Recommended)
```css
.border-box {
    box-sizing: border-box;
    width: 200px;
    padding: 20px;
    border: 2px solid black;
    /* Total width = 200px (includes padding and border) */
    /* Content width = 200px - 40px - 4px = 156px */
}

/* Global border-box reset */
*, *::before, *::after {
    box-sizing: border-box;
}
```

## Margin Properties

### Individual Margins
```css
.element {
    margin-top: 10px;
    margin-right: 15px;
    margin-bottom: 10px;
    margin-left: 15px;
}
```

### Shorthand Syntax
```css
.element {
    margin: 10px;                    /* All sides */
    margin: 10px 15px;               /* Top/bottom, left/right */
    margin: 10px 15px 20px;          /* Top, left/right, bottom */
    margin: 10px 15px 20px 25px;     /* Top, right, bottom, left (clockwise) */
}
```

### Auto Margins
```css
/* Center horizontally */
.center {
    width: 300px;
    margin: 0 auto;
}

/* Push to right */
.push-right {
    margin-left: auto;
}

/* Center with specific top margin */
.center-with-margin {
    width: 300px;
    margin: 2rem auto;
}
```

### Margin Collapse
```css
/* Vertical margins collapse */
.box1 {
    margin-bottom: 20px;
}

.box2 {
    margin-top: 30px;
    /* Actual space between boxes: 30px (not 50px) */
}

/* Prevent margin collapse */
.container {
    overflow: hidden;  /* Creates new block formatting context */
}

.no-collapse {
    padding-top: 1px;  /* Prevents collapse */
}
```

## Padding Properties

### Individual Padding
```css
.element {
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 10px;
    padding-left: 15px;
}
```

### Shorthand Syntax
```css
.element {
    padding: 10px;                   /* All sides */
    padding: 10px 15px;              /* Top/bottom, left/right */
    padding: 10px 15px 20px;         /* Top, left/right, bottom */
    padding: 10px 15px 20px 25px;    /* Top, right, bottom, left */
}
```

### Responsive Padding
```css
.responsive-padding {
    padding: 1rem;
}

@media (min-width: 768px) {
    .responsive-padding {
        padding: 2rem;
    }
}

@media (min-width: 1024px) {
    .responsive-padding {
        padding: 3rem;
    }
}
```

## Border Properties

### Border Basics
```css
.element {
    border-width: 2px;
    border-style: solid;
    border-color: #333;
    
    /* Shorthand */
    border: 2px solid #333;
}
```

### Individual Borders
```css
.element {
    border-top: 1px solid red;
    border-right: 2px dashed blue;
    border-bottom: 3px dotted green;
    border-left: 4px double orange;
}
```

### Border Styles
```css
.borders {
    border-style: solid;      /* ──────── */
    border-style: dashed;     /* ┄┄┄┄┄┄┄┄ */
    border-style: dotted;     /* ········ */
    border-style: double;     /* ════════ */
    border-style: groove;     /* 3D groove */
    border-style: ridge;      /* 3D ridge */
    border-style: inset;      /* 3D inset */
    border-style: outset;     /* 3D outset */
    border-style: none;       /* No border */
    border-style: hidden;     /* Hidden border */
}
```

### Border Radius
```css
.rounded {
    border-radius: 8px;                    /* All corners */
    border-radius: 10px 20px;              /* Top-left/bottom-right, top-right/bottom-left */
    border-radius: 10px 20px 30px;         /* Top-left, top-right/bottom-left, bottom-right */
    border-radius: 10px 20px 30px 40px;    /* Top-left, top-right, bottom-right, bottom-left */
}

/* Specific corners */
.specific-corners {
    border-top-left-radius: 10px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 30px;
    border-bottom-left-radius: 40px;
}

/* Common patterns */
.circle {
    border-radius: 50%;
}

.pill {
    border-radius: 50px;
}

.card {
    border-radius: 12px;
}
```

## Width and Height

### Dimension Properties
```css
.dimensions {
    width: 300px;
    height: 200px;
    
    /* Minimum and maximum */
    min-width: 200px;
    max-width: 500px;
    min-height: 100px;
    max-height: 400px;
}
```

### Percentage and Relative Units
```css
.responsive {
    width: 100%;              /* Full width of parent */
    max-width: 600px;         /* But not larger than 600px */
    height: 50vh;             /* 50% of viewport height */
    min-height: 300px;        /* But at least 300px */
}
```

### Aspect Ratio
```css
/* Modern approach */
.aspect-ratio {
    aspect-ratio: 16 / 9;     /* 16:9 aspect ratio */
    width: 100%;
}

.square {
    aspect-ratio: 1;          /* Square */
}

/* Fallback for older browsers */
.aspect-ratio-fallback {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;   /* 9/16 = 0.5625 = 56.25% */
    height: 0;
}

.aspect-ratio-fallback > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

## Display and Box Types

### Block vs Inline
```css
/* Block elements */
.block {
    display: block;
    width: 100%;              /* Takes full width */
    margin: 1rem 0;           /* Vertical margins work */
}

/* Inline elements */
.inline {
    display: inline;
    /* width and height don't apply */
    /* vertical margins/padding don't affect layout */
}

/* Inline-block */
.inline-block {
    display: inline-block;
    width: 200px;             /* Width works */
    vertical-align: top;      /* Control vertical alignment */
}
```

### Modern Display Values
```css
.flex {
    display: flex;
    /* Creates a flex container */
}

.grid {
    display: grid;
    /* Creates a grid container */
}

.contents {
    display: contents;
    /* Element disappears, children take its place */
}
```

## Overflow

### Overflow Control
```css
.overflow-examples {
    width: 200px;
    height: 100px;
}

.visible { overflow: visible; }     /* Default: content spills out */
.hidden { overflow: hidden; }       /* Clip content */
.scroll { overflow: scroll; }       /* Always show scrollbars */
.auto { overflow: auto; }           /* Scrollbars when needed */

/* Individual axes */
.scroll-y {
    overflow-x: hidden;
    overflow-y: auto;
}
```

### Text Overflow
```css
.text-overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;          /* Shows "..." */
    width: 200px;
}

/* Multi-line text overflow */
.multi-line-ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3;            /* Show 3 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```

## Practical Examples

### Card Component
```css
.card {
    /* Box model setup */
    box-sizing: border-box;
    width: 100%;
    max-width: 400px;
    
    /* Spacing */
    margin: 1rem;
    padding: 0;
    
    /* Visual styling */
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    
    /* Overflow control */
    overflow: hidden;
}

.card-header {
    padding: 1.5rem;
    border-bottom: 1px solid #e0e0e0;
    background: #f8f9fa;
}

.card-body {
    padding: 1.5rem;
}

.card-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid #e0e0e0;
    background: #f8f9fa;
}
```

### Button Component
```css
.btn {
    /* Box model */
    display: inline-block;
    box-sizing: border-box;
    
    /* Dimensions */
    min-width: 120px;
    height: 44px;
    
    /* Spacing */
    padding: 0.75rem 1.5rem;
    margin: 0.25rem;
    
    /* Typography */
    font-size: 1rem;
    font-weight: 500;
    text-align: center;
    text-decoration: none;
    line-height: 1.2;
    
    /* Visual */
    background: #007bff;
    color: white;
    border: 2px solid #007bff;
    border-radius: 6px;
    cursor: pointer;
    
    /* Interaction */
    transition: all 0.2s ease;
}

.btn:hover {
    background: #0056b3;
    border-color: #0056b3;
    transform: translateY(-1px);
}

.btn:active {
    transform: translateY(0);
}

/* Button sizes */
.btn-small {
    min-width: 80px;
    height: 32px;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.btn-large {
    min-width: 160px;
    height: 56px;
    padding: 1rem 2rem;
    font-size: 1.125rem;
}
```

### Layout Container
```css
.container {
    /* Box model */
    box-sizing: border-box;
    width: 100%;
    max-width: 1200px;
    
    /* Spacing */
    margin: 0 auto;
    padding: 0 1rem;
}

/* Responsive spacing */
@media (min-width: 576px) {
    .container {
        padding: 0 1.5rem;
    }
}

@media (min-width: 768px) {
    .container {
        padding: 0 2rem;
    }
}

@media (min-width: 1200px) {
    .container {
        padding: 0 3rem;
    }
}
```

### Form Elements
```css
.form-group {
    margin-bottom: 1.5rem;
}

.form-control {
    /* Box model */
    box-sizing: border-box;
    width: 100%;
    
    /* Spacing */
    padding: 0.75rem;
    margin: 0;
    
    /* Visual */
    border: 1px solid #ced4da;
    border-radius: 4px;
    background: white;
    
    /* Typography */
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    
    /* Interaction */
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Textarea specific */
textarea.form-control {
    min-height: 120px;
    resize: vertical;
}

/* Select specific */
select.form-control {
    background-image: url("data:image/svg+xml,..."); /* Dropdown arrow */
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 16px 12px;
    padding-right: 2.25rem;
}
```

## Common Box Model Issues

### Avoiding Layout Problems
```css
/* Global border-box reset */
html {
    box-sizing: border-box;
}

*, *::before, *::after {
    box-sizing: inherit;
}

/* Prevent horizontal scrollbars */
.container {
    max-width: 100%;
    overflow-x: hidden;
}

/* Maintain aspect ratios for images */
img {
    max-width: 100%;
    height: auto;
}

/* Prevent content overflow */
.content {
    word-wrap: break-word;
    overflow-wrap: break-word;
}
```

### Debugging Box Model
```css
/* Temporary debug styles */
.debug * {
    outline: 1px solid red;
}

.debug-margin * {
    background-color: rgba(255, 0, 0, 0.1);
}

.debug-padding * {
    background-color: rgba(0, 255, 0, 0.1);
}

/* Show box model in browser dev tools */
.debug-box {
    /* Use browser dev tools to inspect */
    /* Right-click → Inspect Element → Computed tab */
}
```

## Performance Considerations

### Efficient Box Model
```css
/* Use efficient resets */
.efficient-reset {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Avoid complex borders that trigger repaints */
.performance-border {
    border: 1px solid #ccc;
    /* Better than gradient borders or complex shadows */
}

/* Use transform instead of changing margins for animations */
.animated-element {
    transition: transform 0.3s ease;
}

.animated-element:hover {
    transform: translateY(-4px);
    /* Better than changing margin-top */
}
```

## Exercise

Create a complete card-based layout:

1. **Card Grid**: Create a responsive grid of cards using the box model
2. **Button System**: Build various button sizes and states
3. **Form Layout**: Design a contact form with proper spacing
4. **Navigation**: Create a navigation bar with proper padding and margins
5. **Responsive Spacing**: Implement a spacing system that works across devices

### Bonus Challenges:
- Create a "holy grail" layout using only box model properties (no flexbox/grid)
- Build a responsive image gallery with consistent spacing
- Design a pricing table with aligned elements
- Implement a collapsible sidebar with smooth transitions
