# Advanced CSS Techniques

Exploring modern CSS features for responsive design.

## CSS Custom Properties

### Dynamic Theming
```html
<div class="card">
    <h3>Dynamic Theming</h3>
    <p>This entire page uses CSS custom properties for consistent spacing, colors, and typography.</p>
    <div style="margin-top: var(--space-md);">
        <button class="button" onclick="toggleTheme()">Toggle Dark Mode</button>
        <button class="button" onclick="changeScale()" style="background: var(--color-text-muted); margin-left: var(--space-sm);">Change Scale</button>
    </div>
</div>
```

### CSS Variables Overview
```css
/* Color palette */
--color-primary-h: 220;
--color-primary-s: 60%;
--color-primary-l: 50%;
--color-primary-alpha: hsla(var(--color-primary-h) var(--color-primary-s) var(--color-primary-l) / 0.8);

/* Semantic color tokens */
--color-background: hsl(0 0% 100%);
--color-surface: hsl(0 0% 98%);
--color-text: hsl(var(--color-primary-h) 15% 15%);
--color-text-muted: hsl(var(--color-primary-h) 10% 60%);
--color-border: hsl(var(--color-primary-h) 20% 90%);

/* Spacing scale with fluid values */
--space-3xs: clamp(0.25rem, 0.23rem + 0.11vw, 0.3125rem);
--space-2xs: clamp(0.5rem, 0.46rem + 0.21vw, 0.625rem);
--space-xs: clamp(0.75rem, 0.69rem + 0.32vw, 0.9375rem);
--space-sm: clamp(1rem, 0.93rem + 0.32vw, 1.25rem);
--space-md: clamp(1.5rem, 1.39rem + 0.54vw, 1.875rem);
--space-lg: clamp(2rem, 1.86rem + 0.71vw, 2.5rem);
--space-xl: clamp(3rem, 2.79rem + 1.07vw, 3.75rem);
--space-2xl: clamp(4rem, 3.71rem + 1.43vw, 5rem);
--space-3xl: clamp(6rem, 5.57rem + 2.14vw, 7.5rem);

/* Typography scale */
--text-xs: clamp(0.75rem, 0.69rem + 0.32vw, 0.875rem);
--text-sm: clamp(0.875rem, 0.81rem + 0.32vw, 1rem);
--text-base: clamp(1rem, 0.93rem + 0.32vw, 1.125rem);
--text-lg: clamp(1.125rem, 1rem + 0.64vw, 1.375rem);
--text-xl: clamp(1.25rem, 1.09rem + 0.81vw, 1.625rem);
--text-2xl: clamp(1.5rem, 1.24rem + 1.29vw, 2.125rem);
--text-3xl: clamp(1.875rem, 1.48rem + 1.94vw, 2.75rem);
--text-4xl: clamp(2.25rem, 1.71rem + 2.74vw, 3.5rem);
--text-5xl: clamp(2.75rem, 2rem + 3.75vw, 4.5rem);

/* Layout tokens */
--container-max-width: 1200px;
--container-padding: var(--space-md);
--border-radius-sm: 0.25rem;
--border-radius: 0.5rem;
--border-radius-lg: 1rem;

/* Animation tokens */
--transition-quick: 150ms;
--transition-base: 250ms;
--transition-slow: 350ms;
--ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-in: cubic-bezier(0.55, 0.055, 0.675, 0.19);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);

/* Shadows */
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

### Dark Mode Example
```css
/* Dark mode color adjustments */
@media (prefers-color-scheme: dark) {
    :root {
        --color-background: hsl(var(--color-primary-h) 25% 8%);
        --color-surface: hsl(var(--color-primary-h) 20% 12%);
        --color-text: hsl(var(--color-primary-h) 15% 92%);
        --color-text-muted: hsl(var(--color-primary-h) 10% 70%);
        --color-border: hsl(var(--color-primary-h) 20% 25%);
        --color-primary-l: 65%;
    }
}
```

### High Contrast Mode Example
```css
/* High contrast mode */
@media (prefers-contrast: high) {
    :root {
        --color-text: hsl(0 0% 0%);
        --color-background: hsl(0 0% 100%);
        --color-border: hsl(0 0% 0%);
    }
}
```

### Reduced Motion Example
```css
/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    :root {
        --transition-quick: 0.01ms;
        --transition-base: 0.01ms;
        --transition-slow: 0.01ms;
    }
}
```

## CSS Grid and Flexbox

### CSS Grid Example
```css
.layout-grid {
    display: grid;
    grid-template-areas: 
        "header"
        "main"
        "sidebar"
        "footer";
    gap: var(--space-md);
    container-type: inline-size;
}

@container (min-width: 768px) {
    .layout-grid {
        grid-template-areas:
            "header header"
            "main sidebar"
            "footer footer";
        grid-template-columns: 1fr 300px;
    }
}

@container (min-width: 1200px) {
    .layout-grid {
        grid-template-areas:
            "header header header"
            "sidebar main ads"
            "footer footer footer";
        grid-template-columns: 250px 1fr 200px;
    }
}

.header { grid-area: header; }
.main { grid-area: main; }
.sidebar { grid-area: sidebar; }
.footer { grid-area: footer; }
.ads { grid-area: ads; }
```

### Flexbox Example
```css
.flex-stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.flex-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
    justify-content: flex-start;
    align-items: center;
}

.flex-sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-lg);
}

.flex-sidebar > :first-child {
    flex-basis: 20rem;
    flex-grow: 1;
}

.flex-sidebar > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-inline-size: 50%;
}
```

## Advanced Layout Techniques

### Container Queries
```css
/* Advanced Container Query System */
.responsive-container {
    container-type: inline-size;
    container-name: responsive-component;
}

.component {
    background: var(--color-surface);
    border-radius: var(--border-radius);
    padding: var(--space-md);
    box-shadow: var(--shadow);
    transition: all var(--transition-base) var(--ease-out);
}

/* Container query responsive behavior */
@container responsive-component (min-width: 300px) {
    .component {
        padding: var(--space-lg);
    }
    
    .component-title {
        font-size: var(--text-lg);
    }
}

@container responsive-component (min-width: 500px) {
    .component {
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: var(--space-md);
        align-items: center;
    }
    
    .component-icon {
        width: 48px;
        height: 48px;
    }
}

@container responsive-component (min-width: 700px) {
    .component {
        grid-template-columns: auto 1fr auto auto;
        gap: var(--space-lg);
    }
    
    .component-actions {
        display: flex;
        gap: var(--space-sm);
    }
}
```

### CSS Subgrid Example
```css
/* CSS Subgrid support (where available) */
@supports (grid-template-columns: subgrid) {
    .nested-grid-item {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        gap: var(--space-sm);
    }
}
```

### CSS Scroll Snap Example
```css
.scroll-container {
    scroll-snap-type: x mandatory;
    overflow-x: auto;
    display: flex;
    gap: var(--space-md);
    padding: var(--space-md);
}

.scroll-item {
    scroll-snap-align: start;
    flex: 0 0 80%;
    background: var(--color-surface);
    border-radius: var(--border-radius);
    padding: var(--space-lg);
}

@media (min-width: 48em) {
    .scroll-item {
        flex: 0 0 45%;
    }
}

@media (min-width: 64em) {
    .scroll-item {
        flex: 0 0 30%;
    }
}
```

### CSS Anchor Positioning (experimental)
```css
/* CSS Anchor Positioning (experimental) */
@supports (anchor-name: --my-anchor) {
    .anchor-element {
        anchor-name: --my-anchor;
        position: relative;
    }
    
    .positioned-element {
        position: absolute;
        position-anchor: --my-anchor;
        top: anchor(bottom);
        left: anchor(left);
    }
}
```

## CSS Feature Detection and Fallbacks

### Modern Feature Detection

```css
/* Progressive enhancement with feature queries */

/* Base styles for all browsers */
.layout {
    display: block;
}

.layout-item {
    margin-bottom: 1rem;
    padding: 1rem;
    background: #f0f0f0;
}

/* Enhanced layout for CSS Grid support */
@supports (display: grid) {
    .layout {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1rem;
    }
    
    .layout-item {
        margin-bottom: 0;
    }
}

/* Container queries with fallback */
@supports (container-type: inline-size) {
    .container-aware {
        container-type: inline-size;
    }
    
    @container (min-width: 400px) {
        .container-content {
            display: flex;
            gap: 1rem;
        }
    }
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
    @media (min-width: 400px) {
        .container-content {
            display: flex;
            gap: 1rem;
        }
    }
}

/* CSS Cascade Layers fallback */
@supports (selector(@layer)) {
    @layer components, utilities;
    
    @layer components {
        .button {
            background: blue;
            color: white;
        }
    }
    
    @layer utilities {
        .button-red {
            background: red !important;
        }
    }
}

@supports not (selector(@layer)) {
    .button {
        background: blue;
        color: white;
    }
    
    .button-red {
        background: red !important;
    }
}
```

### Browser Capability Testing

```javascript
// JavaScript feature detection for CSS capabilities
class CSSCapabilityDetector {
    constructor() {
        this.capabilities = new Map();
        this.detectCapabilities();
    }
    
    detectCapabilities() {
        // Test CSS Grid support
        this.capabilities.set('cssGrid', CSS.supports('display', 'grid'));
        
        // Test Container Queries support
        this.capabilities.set('containerQueries', CSS.supports('container-type', 'inline-size'));
        
        // Test CSS Custom Properties support
        this.capabilities.set('customProperties', CSS.supports('--custom', 'value'));
        
        // Test Object-fit support
        this.capabilities.set('objectFit', CSS.supports('object-fit', 'cover'));
        
        // Test CSS Logical Properties support
        this.capabilities.set('logicalProperties', CSS.supports('margin-inline-start', '1rem'));
        
        // Test CSS Functions support
        this.capabilities.set('clampFunction', CSS.supports('width', 'clamp(1rem, 5vw, 3rem)'));
        this.capabilities.set('minFunction', CSS.supports('width', 'min(100%, 500px)'));
        this.capabilities.set('maxFunction', CSS.supports('width', 'max(300px, 50%)'));
        
        // Test Color Functions support
        this.capabilities.set('colorMix', CSS.supports('background', 'color-mix(in srgb, red, blue)'));
        
        // Test CSS Nesting support
        this.capabilities.set('cssNesting', CSS.supports('selector(&)'));
        
        // Test Cascade Layers support
        this.capabilities.set('cascadeLayers', CSS.supports('selector(@layer)'));
        
        // Test CSS Scroll Snap support
        this.capabilities.set('scrollSnap', CSS.supports('scroll-snap-type', 'x mandatory'));
        
        // Test CSS Subgrid support
        this.capabilities.set('subgrid', CSS.supports('grid-template-columns', 'subgrid'));
        
        // Test Backdrop Filter support
        this.capabilities.set('backdropFilter', CSS.supports('backdrop-filter', 'blur(10px)'));
        
        this.applyCapabilityClasses();
    }
    
    applyCapabilityClasses() {
        const html = document.documentElement;
        
        this.capabilities.forEach((supported, feature) => {
            const className = supported ? `supports-${feature}` : `no-${feature}`;
            html.classList.add(className);
        });
    }
    
    hasCapability(feature) {
        return this.capabilities.get(feature) || false;
    }
    
    getCapabilityReport() {
        const report = {};
        this.capabilities.forEach((supported, feature) => {
            report[feature] = supported;
        });
        return report;
    }
}

// Initialize capability detection
const cssCapabilities = new CSSCapabilityDetector();
console.log('CSS Capabilities:', cssCapabilities.getCapabilityReport());
```

## Performance Optimization Techniques

### CSS Performance Best Practices

```css
/* Performance-optimized CSS */

/* Use efficient selectors */
.component { /* Good: class selector */ }
.component .title { /* Good: specific but not overly complex */ }

/* Avoid expensive selectors */
/* * { } */ /* Avoid: universal selector */
/* [data-attribute*="value"] { } */ /* Avoid: complex attribute selectors */
/* div > div > div > span { } */ /* Avoid: deeply nested selectors */

/* Optimize for GPU acceleration */
.animated-element {
    /* Use transform instead of changing position */
    transform: translateX(0);
    will-change: transform;
    
    /* Use opacity instead of visibility */
    opacity: 1;
    
    /* Promote to own layer */
    transform: translateZ(0);
}

/* Contain layout recalculations */
.isolated-component {
    contain: layout style paint;
}

/* Optimize font loading */
@font-face {
    font-family: 'CustomFont';
    src: url('font.woff2') format('woff2');
    font-display: swap; /* Prevent invisible text during font load */
    unicode-range: U+0000-00FF; /* Subset fonts */
}

/* Use CSS Grid efficiently */
.efficient-grid {
    display: grid;
    /* Use fr units for better performance */
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    /* Prefer gap over margins for grid items */
    gap: 1rem;
}

/* Minimize repaints with transform */
.hover-effect {
    transition: transform 0.2s ease;
}

.hover-effect:hover {
    /* Use transform instead of changing dimensions */
    transform: scale(1.05);
}

/* Optimize images with CSS */
.optimized-image {
    /* Use object-fit for consistent sizing */
    object-fit: cover;
    
    /* Set aspect ratio to prevent layout shift */
    aspect-ratio: 16/9;
    
    /* Optimize rendering */
    image-rendering: crisp-edges;
}
```

## Best Practices Summary

### Modern CSS Guidelines

✅ **Use Container Queries**: For true component-based responsive design  
✅ **Leverage CSS Custom Properties**: For maintainable and dynamic styles  
✅ **Apply Feature Queries**: For progressive enhancement  
✅ **Utilize CSS Grid and Flexbox**: For modern layout techniques  
✅ **Implement Logical Properties**: For international and writing mode support  
✅ **Optimize Performance**: Use efficient selectors and GPU acceleration  
✅ **Plan for Fallbacks**: Ensure compatibility across browsers  

❌ **Overuse !important**: Maintain clean cascade hierarchy  
❌ **Complex Selectors**: Keep selectors simple and performant  
❌ **Hardcoded Values**: Use custom properties for maintainability  
❌ **Ignore Browser Support**: Test across target browsers  
❌ **Skip Feature Detection**: Always provide fallbacks  

### CSS Architecture Recommendations

1. **Layer Styles**: Use cascade layers for better organization
2. **Component-First**: Design reusable, container-aware components
3. **Progressive Enhancement**: Start with basic support and enhance
4. **Performance Conscious**: Monitor CSS performance impact
5. **Future-Friendly**: Use modern CSS features with appropriate fallbacks

This comprehensive advanced CSS system provides the foundation for cutting-edge responsive designs that work across all modern browsers while gracefully degrading for older ones.