# CSS Functions and Custom Properties

## Introduction

CSS custom properties (variables) and functions provide powerful tools for creating maintainable, dynamic stylesheets.

## CSS Custom Properties (Variables)

### Basic Variable Declaration
```css
:root {
    /* Global variables */
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --success-color: #28a745;
    --danger-color: #dc3545;
    --warning-color: #ffc107;
    
    /* Typography variables */
    --font-family-base: 'Helvetica Neue', Arial, sans-serif;
    --font-family-mono: 'Monaco', 'Consolas', monospace;
    --font-size-base: 1rem;
    --font-weight-normal: 400;
    --font-weight-bold: 700;
    --line-height-base: 1.5;
    
    /* Spacing variables */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 3rem;
    
    /* Border radius */
    --border-radius-sm: 0.25rem;
    --border-radius-md: 0.5rem;
    --border-radius-lg: 1rem;
    
    /* Shadows */
    --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
    --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
    --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
    
    /* Transitions */
    --transition-fast: 0.15s ease-in-out;
    --transition-normal: 0.3s ease-in-out;
    --transition-slow: 0.5s ease-in-out;
}
```

### Using Variables
```css
.button {
    background-color: var(--primary-color);
    color: white;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--border-radius-md);
    font-family: var(--font-family-base);
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-sm);
}

.button:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}
```

### Variable Fallbacks
```css
.element {
    /* Fallback value if variable doesn't exist */
    color: var(--text-color, #333);
    font-size: var(--font-size, 1rem);
    
    /* Multiple fallbacks */
    background: var(--bg-color, var(--fallback-color, white));
}
```

### Local Variables
```css
.card {
    /* Local variables scoped to this component */
    --card-padding: 1.5rem;
    --card-background: white;
    --card-border-color: #e0e0e0;
    
    padding: var(--card-padding);
    background: var(--card-background);
    border: 1px solid var(--card-border-color);
    border-radius: var(--border-radius-md);
}

.card.featured {
    /* Override local variables */
    --card-background: var(--primary-color);
    --card-border-color: var(--primary-color);
    color: white;
}
```

### Dynamic Variables with JavaScript
```css
.dynamic-element {
    --progress: 0%;
    --rotation: 0deg;
    
    width: var(--progress);
    transform: rotate(var(--rotation));
    transition: all var(--transition-normal);
}
```

```javascript
// Update CSS variables from JavaScript
document.documentElement.style.setProperty('--progress', '75%');
document.documentElement.style.setProperty('--rotation', '45deg');

// Get CSS variable value
const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--primary-color');
```

## CSS Functions

### calc() Function
```css
.responsive-container {
    /* Mathematical calculations */
    width: calc(100% - 2rem);
    height: calc(100vh - 60px);
    margin: calc(var(--spacing-md) * 2);
    
    /* Mixed units */
    font-size: calc(1rem + 2vw);
    padding: calc(var(--spacing-sm) + 5px);
    
    /* Complex calculations */
    grid-template-columns: repeat(3, calc((100% - 2rem) / 3));
}

.responsive-typography {
    /* Fluid typography */
    font-size: calc(1rem + (2 - 1) * ((100vw - 20rem) / (80 - 20)));
    /* Minimum 1rem, maximum 2rem, scales between 20rem and 80rem viewport */
}
```

### clamp() Function
```css
.fluid-design {
    /* clamp(minimum, preferred, maximum) */
    font-size: clamp(1rem, 2.5vw, 2rem);
    width: clamp(200px, 50%, 600px);
    padding: clamp(0.5rem, 3vw, 2rem);
    
    /* Responsive spacing */
    margin-bottom: clamp(1rem, 4vw, 3rem);
}

.container {
    /* Responsive container width */
    width: clamp(320px, 90%, 1200px);
    margin: 0 auto;
    padding: clamp(1rem, 5vw, 3rem);
}
```

### min() and max() Functions
```css
.flexible-sizing {
    /* Use the smaller value */
    width: min(90%, 600px);
    height: min(50vh, 400px);
    
    /* Use the larger value */
    min-height: max(200px, 20vh);
    font-size: max(1rem, 3vw);
}

.grid-responsive {
    /* Responsive grid columns */
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
}
```

### Color Functions

#### RGB/HSL Functions
```css
.color-variations {
    /* RGB with variables */
    --red: 255;
    --green: 100;
    --blue: 50;
    
    background: rgb(var(--red), var(--green), var(--blue));
    border-color: rgba(var(--red), var(--green), var(--blue), 0.5);
    
    /* HSL with variables */
    --hue: 210;
    --saturation: 50%;
    --lightness: 50%;
    
    color: hsl(var(--hue), var(--saturation), var(--lightness));
    box-shadow: 0 4px 12px hsla(var(--hue), var(--saturation), 20%, 0.3);
}
```

#### Modern Color Functions (Limited Support)
```css
.modern-colors {
    /* Color-mix function */
    background: color-mix(in srgb, var(--primary-color) 70%, white);
    
    /* Relative color syntax */
    border-color: hsl(from var(--primary-color) h s calc(l * 0.8));
}
```

### Transform Functions
```css
.transforms {
    /* Individual transform functions */
    transform: translateX(calc(var(--offset) * 1px));
    transform: rotate(calc(var(--angle) * 1deg));
    transform: scale(var(--scale-factor, 1));
    
    /* Combined transforms with variables */
    transform: 
        translateX(var(--x, 0))
        translateY(var(--y, 0))
        rotate(var(--rotation, 0deg))
        scale(var(--scale, 1));
}

.dynamic-transform {
    --mouse-x: 0;
    --mouse-y: 0;
    
    transform: 
        perspective(1000px)
        rotateX(calc(var(--mouse-y) * 0.1deg))
        rotateY(calc(var(--mouse-x) * 0.1deg));
}
```

### Filter Functions
```css
.image-effects {
    /* Static filters */
    filter: 
        brightness(1.2)
        contrast(1.1)
        saturate(1.3)
        blur(2px);
    
    /* Dynamic filters with variables */
    --brightness: 1;
    --contrast: 1;
    --blur: 0px;
    
    filter: 
        brightness(var(--brightness))
        contrast(var(--contrast))
        blur(var(--blur));
    
    transition: filter var(--transition-normal);
}

.hover-effects:hover {
    --brightness: 1.1;
    --contrast: 1.2;
}
```

## Practical Design Systems

### Color System
```css
:root {
    /* Base colors */
    --color-primary-h: 210;
    --color-primary-s: 100%;
    --color-primary-l: 50%;
    
    /* Generate color variations */
    --color-primary: hsl(var(--color-primary-h), var(--color-primary-s), var(--color-primary-l));
    --color-primary-light: hsl(var(--color-primary-h), var(--color-primary-s), 70%);
    --color-primary-dark: hsl(var(--color-primary-h), var(--color-primary-s), 30%);
    --color-primary-pale: hsl(var(--color-primary-h), 30%, 95%);
    
    /* Semantic colors */
    --color-success: hsl(120, 60%, 50%);
    --color-warning: hsl(45, 100%, 60%);
    --color-error: hsl(0, 70%, 55%);
    --color-info: hsl(200, 80%, 55%);
    
    /* Neutral colors */
    --color-gray-100: hsl(0, 0%, 98%);
    --color-gray-200: hsl(0, 0%, 95%);
    --color-gray-300: hsl(0, 0%, 90%);
    --color-gray-400: hsl(0, 0%, 70%);
    --color-gray-500: hsl(0, 0%, 50%);
    --color-gray-600: hsl(0, 0%, 40%);
    --color-gray-700: hsl(0, 0%, 30%);
    --color-gray-800: hsl(0, 0%, 20%);
    --color-gray-900: hsl(0, 0%, 10%);
}
```

### Typography Scale
```css
:root {
    /* Modular scale ratio */
    --scale-ratio: 1.25;
    --font-size-base: 1rem;
    
    /* Calculate font sizes */
    --font-size-xs: calc(var(--font-size-base) / var(--scale-ratio) / var(--scale-ratio));
    --font-size-sm: calc(var(--font-size-base) / var(--scale-ratio));
    --font-size-md: var(--font-size-base);
    --font-size-lg: calc(var(--font-size-base) * var(--scale-ratio));
    --font-size-xl: calc(var(--font-size-base) * var(--scale-ratio) * var(--scale-ratio));
    --font-size-xxl: calc(var(--font-size-base) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));
    
    /* Responsive typography */
    --font-size-h1: clamp(2rem, 5vw, 3rem);
    --font-size-h2: clamp(1.5rem, 4vw, 2.25rem);
    --font-size-h3: clamp(1.25rem, 3vw, 1.75rem);
}

h1 { font-size: var(--font-size-h1); }
h2 { font-size: var(--font-size-h2); }
h3 { font-size: var(--font-size-h3); }
```

### Spacing System
```css
:root {
    /* Base spacing unit */
    --space-base: 1rem;
    
    /* Spacing scale */
    --space-3xs: calc(var(--space-base) * 0.125);  /* 2px */
    --space-2xs: calc(var(--space-base) * 0.25);   /* 4px */
    --space-xs: calc(var(--space-base) * 0.5);     /* 8px */
    --space-sm: calc(var(--space-base) * 0.75);    /* 12px */
    --space-md: var(--space-base);                 /* 16px */
    --space-lg: calc(var(--space-base) * 1.5);     /* 24px */
    --space-xl: calc(var(--space-base) * 2);       /* 32px */
    --space-2xl: calc(var(--space-base) * 3);      /* 48px */
    --space-3xl: calc(var(--space-base) * 4);      /* 64px */
    
    /* Responsive spacing */
    --space-responsive-sm: clamp(var(--space-sm), 2vw, var(--space-md));
    --space-responsive-md: clamp(var(--space-md), 4vw, var(--space-xl));
    --space-responsive-lg: clamp(var(--space-lg), 6vw, var(--space-3xl));
}
```

## Component-Based Variables

### Button Component
```css
.btn {
    /* Component-specific variables */
    --btn-padding-y: var(--space-xs);
    --btn-padding-x: var(--space-md);
    --btn-font-size: var(--font-size-md);
    --btn-border-radius: var(--border-radius-md);
    --btn-border-width: 1px;
    --btn-transition: all var(--transition-fast);
    
    /* Default colors */
    --btn-bg: var(--color-gray-200);
    --btn-color: var(--color-gray-800);
    --btn-border-color: var(--color-gray-300);
    
    /* Hover states */
    --btn-bg-hover: var(--color-gray-300);
    --btn-border-color-hover: var(--color-gray-400);
    
    /* Implementation */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--btn-padding-y) var(--btn-padding-x);
    font-size: var(--btn-font-size);
    background: var(--btn-bg);
    color: var(--btn-color);
    border: var(--btn-border-width) solid var(--btn-border-color);
    border-radius: var(--btn-border-radius);
    cursor: pointer;
    transition: var(--btn-transition);
}

.btn:hover {
    background: var(--btn-bg-hover);
    border-color: var(--btn-border-color-hover);
}

/* Button variants */
.btn--primary {
    --btn-bg: var(--color-primary);
    --btn-color: white;
    --btn-border-color: var(--color-primary);
    --btn-bg-hover: var(--color-primary-dark);
    --btn-border-color-hover: var(--color-primary-dark);
}

.btn--success {
    --btn-bg: var(--color-success);
    --btn-color: white;
    --btn-border-color: var(--color-success);
}

/* Button sizes */
.btn--small {
    --btn-padding-y: var(--space-2xs);
    --btn-padding-x: var(--space-xs);
    --btn-font-size: var(--font-size-sm);
}

.btn--large {
    --btn-padding-y: var(--space-sm);
    --btn-padding-x: var(--space-lg);
    --btn-font-size: var(--font-size-lg);
}
```

### Card Component
```css
.card {
    /* Card variables */
    --card-bg: white;
    --card-border-color: var(--color-gray-200);
    --card-border-radius: var(--border-radius-lg);
    --card-shadow: var(--shadow-sm);
    --card-shadow-hover: var(--shadow-md);
    --card-padding: var(--space-lg);
    --card-transition: all var(--transition-normal);
    
    background: var(--card-bg);
    border: 1px solid var(--card-border-color);
    border-radius: var(--card-border-radius);
    box-shadow: var(--card-shadow);
    padding: var(--card-padding);
    transition: var(--card-transition);
}

.card:hover {
    box-shadow: var(--card-shadow-hover);
    transform: translateY(-2px);
}

.card--dark {
    --card-bg: var(--color-gray-800);
    --card-border-color: var(--color-gray-700);
    color: var(--color-gray-100);
}
```

## Theme System

### Light/Dark Theme
```css
:root {
    /* Light theme (default) */
    --theme-bg: white;
    --theme-color: var(--color-gray-900);
    --theme-border: var(--color-gray-200);
    --theme-shadow: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
    /* Dark theme */
    --theme-bg: var(--color-gray-900);
    --theme-color: var(--color-gray-100);
    --theme-border: var(--color-gray-700);
    --theme-shadow: rgba(0, 0, 0, 0.3);
}

/* Apply theme variables */
body {
    background: var(--theme-bg);
    color: var(--theme-color);
    transition: background-color var(--transition-normal), color var(--transition-normal);
}

.card {
    background: var(--theme-bg);
    border-color: var(--theme-border);
    box-shadow: 0 2px 8px var(--theme-shadow);
}
```

### Multi-theme System
```css
:root {
    /* Default theme */
    --primary-hue: 210;
    --primary-saturation: 100%;
}

[data-theme="red"] {
    --primary-hue: 0;
}

[data-theme="green"] {
    --primary-hue: 120;
}

[data-theme="purple"] {
    --primary-hue: 270;
}

/* Generate theme colors */
.themed-element {
    --primary: hsl(var(--primary-hue), var(--primary-saturation), 50%);
    --primary-light: hsl(var(--primary-hue), var(--primary-saturation), 70%);
    --primary-dark: hsl(var(--primary-hue), var(--primary-saturation), 30%);
    
    background: var(--primary);
    border-color: var(--primary-dark);
}
```

## Advanced Techniques

### Container Query Variables
```css
.responsive-component {
    --columns: 1;
    --gap: var(--space-md);
    
    display: grid;
    grid-template-columns: repeat(var(--columns), 1fr);
    gap: var(--gap);
}

@container (min-width: 400px) {
    .responsive-component {
        --columns: 2;
    }
}

@container (min-width: 600px) {
    .responsive-component {
        --columns: 3;
        --gap: var(--space-lg);
    }
}
```

### Animation with Variables
```css
.animated-element {
    --duration: 1s;
    --delay: 0s;
    --easing: ease-in-out;
    --from-x: -100px;
    --to-x: 0px;
    
    animation: slideIn var(--duration) var(--easing) var(--delay) forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(var(--from-x));
        opacity: 0;
    }
    to {
        transform: translateX(var(--to-x));
        opacity: 1;
    }
}

/* Staggered animations */
.stagger-item:nth-child(1) { --delay: 0.1s; }
.stagger-item:nth-child(2) { --delay: 0.2s; }
.stagger-item:nth-child(3) { --delay: 0.3s; }
```

### Debug Mode
```css
:root {
    --debug: 0;
}

[data-debug="true"] {
    --debug: 1;
}

.debug-element {
    outline: calc(var(--debug) * 2px) solid red;
    background: rgba(255, 0, 0, calc(var(--debug) * 0.1));
}
```

## Exercise

Create a complete design system:

1. **Color System**: Define primary, secondary, and semantic colors with variations
2. **Typography Scale**: Implement a modular typography system
3. **Spacing System**: Create consistent spacing using variables
4. **Component Library**: Build button, card, and form components
5. **Theme System**: Implement light/dark theme switching

### Bonus Challenges:
- Create a CSS-only theme switcher using custom properties
- Build a responsive component system using container queries and variables
- Implement a design token system with semantic naming
- Create animated components that use variables for timing and easing
