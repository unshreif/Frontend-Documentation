# Modern CSS Features

## Introduction

Modern CSS includes many new features that are transforming how we write styles, from logical properties to advanced color functions and cascade layers.

## CSS Cascade Layers

### Layer Declaration and Usage
```css
/* Declare layers in order of priority (lowest to highest) */
@layer reset, base, components, utilities;

/* Reset layer - lowest priority */
@layer reset {
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
}

/* Base layer */
@layer base {
    body {
        font-family: system-ui, sans-serif;
        line-height: 1.6;
        color: #333;
    }
    
    h1, h2, h3 {
        line-height: 1.2;
        margin-bottom: 0.5em;
    }
}

/* Components layer */
@layer components {
    .btn {
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.2s ease;
    }
    
    .btn-primary {
        background: #007bff;
        color: white;
    }
}

/* Utilities layer - highest priority */
@layer utilities {
    .text-center { text-align: center !important; }
    .d-none { display: none !important; }
    .mt-4 { margin-top: 1rem !important; }
}
```

### Nested Layers
```css
@layer framework {
    @layer reset, base, components;
    
    @layer reset {
        /* Framework reset styles */
    }
    
    @layer components {
        @layer buttons, forms, navigation;
        
        @layer buttons {
            .btn { /* Button styles */ }
        }
        
        @layer forms {
            .form-control { /* Form styles */ }
        }
    }
}

@layer application {
    /* Application styles - higher priority than framework */
    .btn {
        /* Override framework button styles */
    }
}
```

### Anonymous Layers
```css
/* Import into anonymous layer */
@import url('framework.css') layer;
@import url('theme.css') layer(theme);

/* Anonymous layer for third-party styles */
@layer {
    /* Styles that need to be isolated */
    .third-party-component {
        all: initial; /* Reset all properties */
        /* Component styles */
    }
}
```

## Logical Properties

### Logical vs Physical Properties
```css
/* Physical properties (old way) */
.element-physical {
    margin-top: 1rem;
    margin-right: 0.5rem;
    margin-bottom: 1rem;
    margin-left: 0.5rem;
    border-left: 3px solid blue;
    text-align: left;
}

/* Logical properties (new way) */
.element-logical {
    margin-block-start: 1rem;
    margin-inline-end: 0.5rem;
    margin-block-end: 1rem;
    margin-inline-start: 0.5rem;
    border-inline-start: 3px solid blue;
    text-align: start;
}

/* Shorthand logical properties */
.element-shorthand {
    margin-block: 1rem;        /* margin-block-start and margin-block-end */
    margin-inline: 0.5rem;     /* margin-inline-start and margin-inline-end */
    padding-block: 2rem 1rem;  /* padding-block-start: 2rem; padding-block-end: 1rem; */
    padding-inline: 1rem;      /* padding-inline-start and padding-inline-end */
}
```

### Size and Position Logical Properties
```css
.logical-sizing {
    /* Logical width/height */
    inline-size: 300px;        /* width in horizontal writing mode */
    block-size: 200px;         /* height in horizontal writing mode */
    
    /* Logical min/max sizes */
    min-inline-size: 200px;
    max-inline-size: 500px;
    min-block-size: 100px;
    max-block-size: 400px;
}

.logical-positioning {
    /* Logical positioning */
    inset-block-start: 10px;   /* top in horizontal writing mode */
    inset-inline-end: 10px;    /* right in horizontal writing mode */
    inset-block-end: 10px;     /* bottom in horizontal writing mode */
    inset-inline-start: 10px;  /* left in horizontal writing mode */
    
    /* Shorthand */
    inset-block: 10px;         /* inset-block-start and inset-block-end */
    inset-inline: 10px;        /* inset-inline-start and inset-inline-end */
    inset: 10px;               /* all four logical directions */
}
```

### Writing Modes and Direction
```css
/* Writing mode examples */
.horizontal-text {
    writing-mode: horizontal-tb; /* Default: top to bottom, left to right */
}

.vertical-text {
    writing-mode: vertical-rl;   /* Right to left, top to bottom (Japanese) */
    writing-mode: vertical-lr;   /* Left to right, top to bottom (Mongolian) */
}

/* Text direction */
.rtl-text {
    direction: rtl; /* Right to left (Arabic, Hebrew) */
}

/* Logical properties adapt automatically */
.adaptive-layout {
    margin-inline-start: 2rem;  /* Left in LTR, right in RTL */
    border-inline-end: 1px solid #ccc;
    text-align: start;          /* Left in LTR, right in RTL */
}
```

## CSS Nesting

### Basic Nesting
```css
.card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    
    /* Nested selectors */
    & .card-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
        color: #333;
    }
    
    & .card-content {
        line-height: 1.6;
        color: #666;
    }
    
    /* Pseudo-classes */
    &:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transform: translateY(-2px);
    }
    
    /* Pseudo-elements */
    &::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(45deg, #007bff, #28a745);
        mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        mask-composite: xor;
    }
}
```

### Advanced Nesting Patterns
```css
.navigation {
    display: flex;
    gap: 1rem;
    
    /* Direct child selector */
    & > .nav-item {
        position: relative;
        
        /* Nested descendant */
        & .nav-link {
            text-decoration: none;
            color: #333;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.2s ease;
            
            /* Multiple levels of nesting */
            &:hover {
                background: rgba(0,123,255,0.1);
                color: #007bff;
            }
            
            &.active {
                background: #007bff;
                color: white;
            }
        }
        
        /* Dropdown menu */
        & .dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            border: 1px solid #ddd;
            border-radius: 4px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.2s ease;
            
            /* Show dropdown on hover */
            .nav-item:hover & {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
        }
    }
    
    /* Media queries in nesting */
    @media (max-width: 768px) {
        & {
            flex-direction: column;
            position: fixed;
            top: 0;
            left: -100%;
            width: 80%;
            height: 100vh;
            background: white;
            transition: left 0.3s ease;
        }
        
        &.open {
            left: 0;
        }
    }
}
```

### Container Queries in Nesting
```css
.responsive-component {
    container-type: inline-size;
    
    & .component-content {
        padding: 1rem;
        
        /* Container query within nesting */
        @container (min-width: 400px) {
            & {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
                padding: 1.5rem;
            }
        }
        
        @container (min-width: 600px) {
            & {
                grid-template-columns: 1fr 1fr 1fr;
                padding: 2rem;
            }
        }
    }
}
```

## Advanced Color Functions

### Color Mixing
```css
.color-mixing {
    /* Mix colors in different color spaces */
    background: color-mix(in srgb, #ff0000 50%, #0000ff);
    border-color: color-mix(in hsl, hsl(200 50% 50%) 70%, white);
    color: color-mix(in oklch, oklch(0.7 0.15 180) 30%, black);
}

/* Dynamic color mixing with custom properties */
.dynamic-colors {
    --primary: #007bff;
    --mix-amount: 20%;
    
    background: color-mix(in srgb, var(--primary) var(--mix-amount), white);
    border: 1px solid color-mix(in srgb, var(--primary) 80%, black);
}
```

### Relative Color Syntax
```css
.relative-colors {
    --base-color: hsl(200 50% 50%);
    
    /* Create variations of the base color */
    background: hsl(from var(--base-color) h s calc(l * 1.2));
    border-color: hsl(from var(--base-color) h calc(s * 0.8) calc(l * 0.8));
    color: hsl(from var(--base-color) calc(h + 180) s l);
}

/* RGB relative colors */
.rgb-relative {
    --accent: rgb(255 100 50);
    
    background: rgb(from var(--accent) r g b / 0.5);
    box-shadow: 0 4px 12px rgb(from var(--accent) r g b / 0.3);
}

/* OKLCH relative colors for better perceptual uniformity */
.oklch-relative {
    --brand: oklch(0.7 0.15 200);
    
    /* Lighter variant */
    background: oklch(from var(--brand) calc(l * 1.2) c h);
    
    /* More saturated variant */
    border-color: oklch(from var(--brand) l calc(c * 1.5) h);
    
    /* Complementary color */
    color: oklch(from var(--brand) l c calc(h + 180));
}
```

### Color Contrast Functions
```css
.contrast-colors {
    --bg-color: #333;
    
    /* Automatically choose contrasting text color */
    color: light-dark(#333, #fff);
    
    /* Based on color-contrast function (future) */
    color: color-contrast(var(--bg-color) vs white, black);
}

/* System color adaptation */
.system-colors {
    background: Canvas;
    color: CanvasText;
    border: 1px solid ButtonBorder;
    
    /* Accent colors */
    accent-color: AccentColor;
}
```

## Advanced Selectors

### :has() Pseudo-class
```css
/* Style parent based on children */
.card:has(img) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
}

.form-group:has(input:invalid) {
    border-color: red;
}

.form-group:has(input:invalid) .error-message {
    display: block;
}

/* Complex :has() selectors */
.article:has(> .featured-image) .article-title {
    color: white;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
}

.sidebar:has(.widget:nth-child(n+4)) {
    grid-template-columns: 1fr 1fr;
}
```

### :is() and :where() Pseudo-classes
```css
/* :is() - normal specificity */
:is(h1, h2, h3) {
    line-height: 1.2;
    margin-block: 1em 0.5em;
}

:is(.card, .panel, .widget) :is(h1, h2, h3) {
    color: #333;
    font-weight: 600;
}

/* :where() - zero specificity */
:where(h1, h2, h3) {
    line-height: 1.2; /* Easy to override */
}

:where(.btn, .button, input[type="submit"]) {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
}

/* Complex selector grouping */
:is(.dark-theme, [data-theme="dark"]) :is(.card, .panel) {
    background: #2d3748;
    color: #f7fafc;
}
```

## CSS Math Functions

### Advanced calc() Usage
```css
.advanced-calc {
    /* Complex calculations */
    width: calc(100% - 2 * var(--sidebar-width, 250px));
    
    /* Responsive font size with constraints */
    font-size: calc(1rem + (2 - 1) * ((100vw - 20rem) / (80 - 20)));
    
    /* Geometric calculations */
    transform: rotate(calc(var(--angle, 0) * 1deg));
    
    /* Color channel calculations */
    background: hsl(
        calc(var(--hue, 200) + var(--offset, 0)),
        calc(var(--saturation, 50%) * var(--factor, 1)),
        calc(var(--lightness, 50%) + var(--adjustment, 0%))
    );
}
```

### min(), max(), and clamp()
```css
.responsive-sizing {
    /* Responsive width with limits */
    width: clamp(200px, 50vw, 800px);
    
    /* Responsive padding */
    padding: clamp(1rem, 5vw, 3rem);
    
    /* Responsive grid columns */
    grid-template-columns: repeat(auto-fit, minmax(clamp(200px, 30vw, 300px), 1fr));
    
    /* Complex responsive font size */
    font-size: clamp(
        1rem,
        calc(1rem + (2 - 1) * ((100vw - 20rem) / (80 - 20))),
        2rem
    );
}

.flexible-layouts {
    /* Flexible sidebar */
    width: max(200px, 20vw);
    
    /* Responsive gap */
    gap: min(2rem, 5vw);
    
    /* Optimal content width */
    max-width: min(100% - 2rem, 800px);
}
```

### round(), mod(), and rem()
```css
.math-functions {
    /* Round to nearest increment */
    width: round(calc(100% / 3), 1px);
    
    /* Modular spacing */
    margin-top: mod(var(--index) * 0.5rem, 2rem);
    
    /* Remainder calculations */
    transform: translateX(rem(var(--scroll-position), 100px));
    
    /* Complex modular scales */
    font-size: calc(1rem * pow(1.25, round(var(--scale-step), 1)));
}
```

## CSS Anchoring (Future Feature)

### Anchor Positioning
```css
/* Define anchor */
.anchor-element {
    anchor-name: --my-anchor;
}

/* Position relative to anchor */
.positioned-element {
    position: absolute;
    
    /* Position relative to anchor */
    top: anchor(--my-anchor bottom);
    left: anchor(--my-anchor left);
    
    /* With fallback */
    top: anchor(--my-anchor bottom, 100px);
    
    /* Anchor size */
    width: anchor-size(--my-anchor width);
}

/* Anchor queries */
@supports (anchor-name: --test) {
    .tooltip {
        position: absolute;
        anchor-default: --trigger;
        
        /* Position above or below based on space */
        bottom: calc(anchor(top) - 10px);
        left: anchor(center);
        
        /* Fallback position if no space above */
        position-fallback: --tooltip-fallback;
    }
    
    @position-fallback --tooltip-fallback {
        @try {
            top: calc(anchor(bottom) + 10px);
            left: anchor(center);
        }
        
        @try {
            top: anchor(top);
            left: calc(anchor(right) + 10px);
        }
    }
}
```

## View Transitions API

### Basic View Transitions
```css
/* Enable view transitions */
@view-transition {
    navigation: auto;
}

/* Default transition */
::view-transition {
    /* Custom transition duration */
    --transition-duration: 0.5s;
}

/* Customize specific transitions */
::view-transition-old(root) {
    animation: slide-out-left var(--transition-duration) ease-in;
}

::view-transition-new(root) {
    animation: slide-in-right var(--transition-duration) ease-out;
}

@keyframes slide-out-left {
    to { transform: translateX(-100%); }
}

@keyframes slide-in-right {
    from { transform: translateX(100%); }
}
```

### Named View Transitions
```css
/* Named transition elements */
.page-title {
    view-transition-name: page-title;
}

.hero-image {
    view-transition-name: hero-image;
}

/* Custom animations for named elements */
::view-transition-old(page-title) {
    animation: fade-scale-out 0.3s ease-in;
}

::view-transition-new(page-title) {
    animation: fade-scale-in 0.3s ease-out;
}

@keyframes fade-scale-out {
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}

@keyframes fade-scale-in {
    from {
        opacity: 0;
        transform: scale(1.05);
    }
}
```

## Performance and Optimization

### CSS Containment
```css
.performance-optimized {
    /* Layout containment */
    contain: layout;
    
    /* Style containment */
    contain: style;
    
    /* Paint containment */
    contain: paint;
    
    /* Size containment */
    contain: size;
    
    /* Strict containment (all types) */
    contain: strict;
    
    /* Content visibility for virtual scrolling */
    content-visibility: auto;
    contain-intrinsic-size: 200px 100px;
}

.isolated-component {
    /* Isolate component for better performance */
    contain: layout style paint;
    
    /* Prevent style recalculation leakage */
    isolation: isolate;
}
```

### CSS Grid Performance
```css
.optimized-grid {
    display: grid;
    
    /* Use subgrid for better performance */
    grid-template-rows: subgrid;
    
    /* Optimize for animation */
    will-change: grid-template-columns;
    
    /* Contain grid calculations */
    contain: layout;
}

.masonry-performance {
    /* Efficient masonry with content-visibility */
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    
    & > * {
        content-visibility: auto;
        contain-intrinsic-size: 250px 300px;
    }
}
```

## Complete Modern CSS Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern CSS Features Demo</title>
    <style>
        /* Cascade layers */
        @layer reset, base, components, utilities;
        
        @layer reset {
            *, *::before, *::after {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
            }
        }
        
        @layer base {
            :root {
                --primary-hue: 220;
                --primary-sat: 70%;
                --primary-light: 50%;
                --primary: oklch(0.6 0.15 var(--primary-hue));
            }
            
            body {
                font-family: system-ui, sans-serif;
                line-height: 1.6;
                color: light-dark(#333, #f0f0f0);
                background: light-dark(#fff, #1a1a1a);
            }
        }
        
        @layer components {
            .modern-container {
                container-type: inline-size;
                max-inline-size: 1200px;
                margin-inline: auto;
                padding-inline: clamp(1rem, 5vw, 3rem);
                
                & .grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: clamp(1rem, 3vw, 2rem);
                    
                    @container (min-width: 600px) {
                        & {
                            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                        }
                    }
                }
                
                & .card {
                    background: color-mix(in srgb, var(--primary) 5%, Canvas);
                    border: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
                    border-radius: 12px;
                    padding-block: 1.5rem;
                    padding-inline: 1.5rem;
                    position: relative;
                    contain: layout style;
                    
                    /* Logical property transitions */
                    transition: 
                        border-color 0.3s ease,
                        transform 0.3s ease;
                    
                    &:hover {
                        border-color: var(--primary);
                        transform: translateY(-4px);
                    }
                    
                    /* Has selector for conditional styling */
                    &:has(.card-image) {
                        display: grid;
                        grid-template-rows: auto 1fr;
                        gap: 1rem;
                    }
                    
                    & .card-title {
                        font-size: clamp(1.125rem, 2.5vw, 1.5rem);
                        color: color-mix(in srgb, var(--primary) 80%, CanvasText);
                        margin-block-end: 0.5rem;
                    }
                    
                    & .card-content {
                        color: color-mix(in srgb, CanvasText 80%, transparent);
                        line-height: 1.6;
                    }
                }
            }
            
            .modern-nav {
                background: Canvas;
                border-block-end: 1px solid color-mix(in srgb, var(--primary) 20%, transparent);
                position: sticky;
                inset-block-start: 0;
                z-index: 100;
                
                & .nav-content {
                    max-inline-size: 1200px;
                    margin-inline: auto;
                    padding-inline: clamp(1rem, 5vw, 3rem);
                    padding-block: 1rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                & .nav-links {
                    display: flex;
                    gap: 2rem;
                    list-style: none;
                    
                    & a {
                        color: CanvasText;
                        text-decoration: none;
                        padding-block: 0.5rem;
                        padding-inline: 1rem;
                        border-radius: 6px;
                        transition: all 0.2s ease;
                        
                        &:hover {
                            background: color-mix(in srgb, var(--primary) 10%, transparent);
                            color: var(--primary);
                        }
                    }
                }
            }
        }
        
        @layer utilities {
            .sr-only {
                position: absolute;
                inline-size: 1px;
                block-size: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            .full-bleed {
                inline-size: 100vw;
                margin-inline-start: calc(50% - 50vw);
            }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
</head>
<body>
    <nav class="modern-nav">
        <div class="nav-content">
            <h1>Modern CSS</h1>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    
    <main class="modern-container">
        <div class="grid">
            <article class="card">
                <h2 class="card-title">Cascade Layers</h2>
                <div class="card-content">
                    <p>Organize CSS with explicit layer ordering for better maintainability and predictable specificity.</p>
                </div>
            </article>
            
            <article class="card">
                <img class="card-image" src="https://picsum.photos/300/150" alt="" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h2 class="card-title">Logical Properties</h2>
                    <div class="card-content">
                        <p>Write internationalization-friendly CSS that adapts to different writing modes and text directions.</p>
                    </div>
                </div>
            </article>
            
            <article class="card">
                <h2 class="card-title">Container Queries</h2>
                <div class="card-content">
                    <p>Responsive design based on container size rather than viewport, enabling truly modular components.</p>
                </div>
            </article>
            
            <article class="card">
                <h2 class="card-title">Color Functions</h2>
                <div class="card-content">
                    <p>Advanced color manipulation with color-mix(), relative color syntax, and better color spaces.</p>
                </div>
            </article>
        </div>
    </main>
</body>
</html>
```

## Exercise

Implement modern CSS features:

1. **Cascade Layers**: Organize a component library using layers
2. **Logical Properties**: Create a layout that works in RTL languages
3. **Container Queries**: Build components that adapt to their container
4. **Color System**: Implement advanced color functions and custom properties
5. **Modern Selectors**: Use :has(), :is(), and :where() effectively

### Bonus Challenges:
- Create a view transition for a single-page application
- Implement anchor positioning for tooltips and popovers
- Build a component system using CSS nesting
- Design accessible color schemes with automatic contrast
- Optimize performance using CSS containment and content-visibility
