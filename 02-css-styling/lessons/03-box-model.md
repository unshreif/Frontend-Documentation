# CSS Box Model

## Understanding the Box Model

Every HTML element is essentially a rectangular box. The CSS box model describes how the different parts of this box are calculated and rendered.

## Box Model Components

```css
.box {
    /* Content area */
    width: 300px;
    height: 200px;
    
    /* Padding - space inside the element */
    padding: 20px;
    
    /* Border - surrounds the padding */
    border: 5px solid #333;
    
    /* Margin - space outside the element */
    margin: 15px;
}
```

### Visual Representation
```
┌─────────────────────────────────────┐ ← Margin
│ ┌─────────────────────────────────┐ │ ← Border
│ │ ┌─────────────────────────────┐ │ │ ← Padding
│ │ │                             │ │ │ ← Content
│ │ │         Content Area        │ │ │
│ │ │                             │ │ │
│ │ └─────────────────────────────┘ │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Box Sizing Property

### Content Box (Default)
```css
.content-box {
    box-sizing: content-box; /* Default value */
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 300px + 40px + 10px = 350px */
}
```

### Border Box (Recommended)
```css
.border-box {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 300px (includes padding and border) */
    /* Content width = 300px - 40px - 10px = 250px */
}

/* Global border-box reset */
*,
*::before,
*::after {
    box-sizing: border-box;
}
```

## Margin Properties

### Individual Margins
```css
.element {
    margin-top: 10px;
    margin-right: 15px;
    margin-bottom: 20px;
    margin-left: 25px;
}
```

### Margin Shorthand
```css
/* All sides */
.all-margins { margin: 20px; }

/* Vertical | Horizontal */
.vh-margins { margin: 10px 20px; }

/* Top | Horizontal | Bottom */
.thb-margins { margin: 10px 20px 15px; }

/* Top | Right | Bottom | Left (clockwise) */
.individual-margins { margin: 10px 15px 20px 25px; }
```

### Auto Margins and Centering
```css
/* Center horizontally */
.center-horizontal {
    width: 800px;
    margin: 0 auto;
}

/* Push element to the right */
.push-right {
    margin-left: auto;
}

/* Center with specific top/bottom margins */
.center-with-spacing {
    width: 600px;
    margin: 2rem auto;
}
```

### Margin Collapse
```css
/* Adjacent margins collapse to the larger value */
.first-element {
    margin-bottom: 30px;
}

.second-element {
    margin-top: 20px;
    /* Actual space between elements = 30px (not 50px) */
}

/* Prevent margin collapse */
.parent {
    padding: 1px; /* or border, or overflow: hidden */
}

.child {
    margin-top: 20px; /* Won't collapse with parent */
}
```

## Padding Properties

### Individual Padding
```css
.element {
    padding-top: 10px;
    padding-right: 15px;
    padding-bottom: 20px;
    padding-left: 25px;
}
```

### Padding Shorthand
```css
/* Same syntax as margin */
.all-padding { padding: 20px; }
.vh-padding { padding: 10px 20px; }
.thb-padding { padding: 10px 20px 15px; }
.individual-padding { padding: 10px 15px 20px 25px; }
```

### Practical Padding Examples
```css
/* Button padding */
.button {
    padding: 0.75rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
}

/* Card content padding */
.card {
    padding: 1.5rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Form input padding */
.form-input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
```

## Border Properties

### Border Width
```css
.borders {
    border-width: thin;        /* keyword */
    border-width: 2px;         /* specific value */
    border-width: 1px 2px 3px 4px; /* individual sides */
}
```

### Border Style
```css
.border-styles {
    border-style: solid;    /* Most common */
    border-style: dashed;
    border-style: dotted;
    border-style: double;
    border-style: groove;
    border-style: ridge;
    border-style: inset;
    border-style: outset;
    border-style: none;
    border-style: hidden;
}
```

### Border Color
```css
.border-colors {
    border-color: red;
    border-color: #ff0000;
    border-color: rgb(255, 0, 0);
    border-color: red green blue yellow; /* individual sides */
}
```

### Border Shorthand
```css
.border-shorthand {
    border: 2px solid #333;
    border: 1px dashed red;
    border: 5px double blue;
}

/* Individual sides */
.individual-borders {
    border-top: 3px solid red;
    border-right: 2px dashed green;
    border-bottom: 1px dotted blue;
    border-left: 4px solid purple;
}
```

### Border Radius
```css
/* Rounded corners */
.rounded {
    border-radius: 8px;           /* All corners */
    border-radius: 10px 20px;     /* Top-left/bottom-right | top-right/bottom-left */
    border-radius: 5px 10px 15px 20px; /* Individual corners clockwise */
}

/* Specific corners */
.specific-corners {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
}

/* Circle */
.circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
}

/* Pill shape */
.pill {
    border-radius: 25px; /* Half the height */
}
```

## Width and Height

### Fixed Dimensions
```css
.fixed-size {
    width: 300px;
    height: 200px;
}
```

### Percentage Dimensions
```css
.percentage-size {
    width: 100%;        /* Full width of parent */
    height: 50%;        /* Half height of parent */
}
```

### Min and Max Dimensions
```css
.responsive-container {
    width: 100%;
    max-width: 1200px;  /* Won't exceed 1200px */
    min-width: 320px;   /* Won't go below 320px */
    
    height: auto;
    min-height: 400px;  /* At least 400px tall */
    max-height: 80vh;   /* Won't exceed 80% of viewport height */
}

/* Responsive images */
.responsive-image {
    max-width: 100%;
    height: auto;
}
```

### Viewport Units
```css
.viewport-sizing {
    width: 100vw;       /* Full viewport width */
    height: 100vh;      /* Full viewport height */
    
    width: 50vw;        /* Half viewport width */
    height: 75vh;       /* 75% of viewport height */
}

/* Full-screen hero section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

## Display Property and Box Types

### Block Elements
```css
.block-element {
    display: block;
    /* Takes full width available */
    /* Starts on new line */
    /* Can have width, height, margin, padding */
}
```

### Inline Elements
```css
.inline-element {
    display: inline;
    /* Only takes necessary width */
    /* Doesn't start on new line */
    /* Width and height ignored */
    /* Vertical margin/padding may overlap */
}
```

### Inline-Block Elements
```css
.inline-block-element {
    display: inline-block;
    /* Combination of inline and block */
    /* Doesn't start on new line */
    /* Can have width, height, margin, padding */
}
```

## Practical Examples

### Card Component
```css
.card {
    /* Box model setup */
    box-sizing: border-box;
    width: 100%;
    max-width: 350px;
    
    /* Spacing */
    margin: 1rem;
    padding: 1.5rem;
    
    /* Visual styling */
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
    margin: -1.5rem -1.5rem 1rem -1.5rem;
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-bottom: 1px solid #e0e0e0;
    border-radius: 12px 12px 0 0;
}

.card-content {
    margin-bottom: 1rem;
}

.card-footer {
    margin: 1rem -1.5rem -1.5rem -1.5rem;
    padding: 1rem 1.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    border-radius: 0 0 12px 12px;
}
```

### Button System
```css
.btn {
    /* Base button styles */
    display: inline-block;
    padding: 0.75rem 1.5rem;
    margin: 0.25rem;
    
    border: 2px solid transparent;
    border-radius: 6px;
    
    font-size: 1rem;
    line-height: 1.5;
    text-align: center;
    text-decoration: none;
    
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
    color: white;
}

.btn-secondary {
    background-color: transparent;
    border-color: #6c757d;
    color: #6c757d;
}

.btn-large {
    padding: 1rem 2rem;
    font-size: 1.125rem;
}

.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}
```

### Layout Container
```css
.container {
    /* Responsive container */
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

/* Responsive padding */
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

@media (min-width: 992px) {
    .container {
        padding: 0 2.5rem;
    }
}
```

## Common Box Model Issues and Solutions

### Calculating Total Dimensions
```css
/* Problem: Hard to calculate total size */
.content-box-problem {
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 300 + 40 + 10 = 350px */
}

/* Solution: Use border-box */
.border-box-solution {
    box-sizing: border-box;
    width: 300px;
    padding: 20px;
    border: 5px solid black;
    /* Total width = 300px exactly */
}
```

### Collapsing Margins
```css
/* Problem: Unexpected spacing */
.margin-collapse-issue {
    margin-bottom: 20px;
}

.margin-collapse-issue + .margin-collapse-issue {
    margin-top: 30px;
    /* Actual space = 30px, not 50px */
}

/* Solutions */
.prevent-collapse {
    /* Method 1: Use padding instead */
    padding-bottom: 20px;
}

.prevent-collapse-parent {
    /* Method 2: Add border or padding to parent */
    border-top: 1px solid transparent;
    /* or */
    padding-top: 1px;
    /* or */
    overflow: hidden;
}
```

### Centering Elements
```css
/* Horizontal centering with margin auto */
.center-horizontal {
    width: 600px;
    margin: 0 auto;
}

/* Centering with flexbox (parent) */
.flex-center-parent {
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Centering with absolute positioning */
.absolute-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## Exercise

Create a responsive card layout using the box model:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Box Model Exercise</title>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Card Title</h3>
            </div>
            <div class="card-content">
                <p>This is the card content area. It should have proper spacing and be easy to read.</p>
                <p>Add more content here to test the box model.</p>
            </div>
            <div class="card-footer">
                <button class="btn btn-primary">Action</button>
                <button class="btn btn-secondary">Cancel</button>
            </div>
        </div>
    </div>
</body>
</html>
```

### Requirements:
1. Use `box-sizing: border-box` for all elements
2. Create a centered container with max-width
3. Style the card with padding, margins, borders, and border-radius
4. Create button styles with proper spacing
5. Make the layout responsive
6. Ensure proper spacing between all elements
