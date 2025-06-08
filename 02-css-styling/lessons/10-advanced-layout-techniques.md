# Advanced CSS Layout Techniques

## Introduction

Modern CSS provides powerful layout tools beyond basic flexbox and grid, including subgrid, container queries, and advanced positioning techniques.

## CSS Subgrid

### Basic Subgrid Implementation
```css
.parent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
}

.subgrid-item {
    display: grid;
    grid-column: span 2;
    grid-row: span 2;
    
    /* Inherit parent grid lines */
    grid-template-columns: subgrid;
    grid-template-rows: subgrid;
    gap: inherit;
}

.subgrid-child {
    background: lightblue;
    padding: 1rem;
}
```

### Card Layout with Subgrid
```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.card {
    display: grid;
    grid-template-rows: subgrid;
    grid-row: span 4; /* header, content, actions, footer */
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
}

.card-header {
    background: #f8f9fa;
    padding: 1rem;
    grid-row: 1;
}

.card-content {
    padding: 1rem;
    grid-row: 2 / 4; /* Spans content and actions area */
}

.card-footer {
    background: #f8f9fa;
    padding: 1rem;
    grid-row: 4;
    margin-top: auto;
}
```

## Container Queries

### Size-based Container Queries
```css
.component-container {
    container-type: inline-size;
    container-name: card-container;
}

.responsive-card {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Adjust layout based on container width */
@container card-container (min-width: 400px) {
    .responsive-card {
        display: flex;
        gap: 1rem;
        padding: 1.5rem;
    }
    
    .card-image {
        flex: 0 0 150px;
    }
    
    .card-content {
        flex: 1;
    }
}

@container card-container (min-width: 600px) {
    .responsive-card {
        padding: 2rem;
    }
    
    .card-image {
        flex: 0 0 200px;
    }
    
    .card-title {
        font-size: 1.5rem;
    }
}
```

### Style-based Container Queries
```css
.theme-container {
    container-type: style;
    container-name: theme;
}

@container style(--theme: dark) {
    .themed-component {
        background: #2d3748;
        color: #f7fafc;
    }
}

@container style(--theme: light) {
    .themed-component {
        background: #f7fafc;
        color: #2d3748;
    }
}
```

## Advanced Grid Patterns

### Masonry Layout with CSS Grid
```css
.masonry-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-auto-rows: 10px;
    gap: 10px;
}

.masonry-item {
    grid-row-end: span var(--row-span);
    background: white;
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Set via JavaScript based on content height */
.masonry-item:nth-child(1) { --row-span: 30; }
.masonry-item:nth-child(2) { --row-span: 25; }
.masonry-item:nth-child(3) { --row-span: 35; }
```

### Complex Grid Layout
```css
.magazine-layout {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(8, 100px);
    gap: 1rem;
    height: 100vh;
    padding: 1rem;
}

.hero-article {
    grid-column: 1 / 9;
    grid-row: 1 / 5;
    background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
                url('hero-image.jpg');
    background-size: cover;
    background-position: center;
    color: white;
    display: flex;
    align-items: end;
    padding: 2rem;
    border-radius: 12px;
}

.featured-articles {
    grid-column: 9 / 13;
    grid-row: 1 / 5;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 1rem;
}

.secondary-articles {
    grid-column: 1 / 13;
    grid-row: 5 / 9;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}
```

## Advanced Flexbox Techniques

### Flexible Multi-row Layout
```css
.flex-wrap-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-content: flex-start;
}

.flex-item {
    flex: 1 1 300px;
    min-height: 200px;
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
}

/* Featured items take more space */
.flex-item.featured {
    flex: 2 1 400px;
}

/* Small items */
.flex-item.small {
    flex: 0 1 200px;
}
```

### Intrinsic Web Design
```css
.intrinsic-layout {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    
    /* Let content determine the size */
    width: fit-content;
    max-width: 100%;
    margin: 0 auto;
}

.intrinsic-item {
    flex: 1 1 0;
    min-width: min-content;
    max-width: max-content;
    width: fit-content;
}
```

## Positioning Techniques

### Sticky Positioning
```css
.sticky-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: box-shadow 0.3s ease;
}

.sticky-sidebar {
    position: sticky;
    top: 2rem;
    height: fit-content;
    max-height: calc(100vh - 4rem);
    overflow-y: auto;
}

/* Sticky table headers */
.sticky-table {
    overflow: auto;
    max-height: 400px;
}

.sticky-table th {
    position: sticky;
    top: 0;
    background: white;
    z-index: 1;
}
```

### Advanced Absolute Positioning
```css
.overlay-container {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.overlay {
    position: absolute;
    inset: 0; /* Shorthand for top: 0, right: 0, bottom: 0, left: 0 */
    background: linear-gradient(
        to bottom,
        transparent 0%,
        transparent 60%,
        rgba(0,0,0,0.8) 100%
    );
    display: flex;
    align-items: end;
    padding: 2rem;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.overlay-container:hover .overlay {
    opacity: 1;
}
```

## Multi-column Layout

### CSS Columns
```css
.article-columns {
    column-count: 3;
    column-gap: 2rem;
    column-rule: 1px solid #ddd;
    text-align: justify;
}

.article-columns h2 {
    column-span: all;
    margin: 2rem 0 1rem;
    text-align: center;
}

.pull-quote {
    column-span: all;
    font-size: 1.2em;
    font-style: italic;
    text-align: center;
    margin: 2rem 0;
    padding: 1rem;
    background: #f8f9fa;
    border-left: 4px solid #007bff;
}

/* Responsive columns */
@media (max-width: 768px) {
    .article-columns {
        column-count: 1;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .article-columns {
        column-count: 2;
    }
}
```

## Scroll-driven Animations

### Scroll Timeline
```css
@supports (animation-timeline: scroll()) {
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #007bff 0%, #28a745 100%);
        transform-origin: left;
        animation: progress-bar linear;
        animation-timeline: scroll(root);
    }
    
    @keyframes progress-bar {
        0% { transform: scaleX(0); }
        100% { transform: scaleX(1); }
    }
}

/* Fallback for browsers without scroll timeline */
@supports not (animation-timeline: scroll()) {
    .scroll-progress {
        /* JavaScript implementation fallback */
        transition: transform 0.1s ease-out;
    }
}
```

### View Timeline
```css
@supports (animation-timeline: view()) {
    .fade-in-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        animation: fade-in-up linear forwards;
        animation-timeline: view();
        animation-range: entry 0% entry 100%;
    }
    
    @keyframes fade-in-up {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
```

## Layout Composition

### Component-based Layout System
```css
/* Layout primitives */
.stack {
    display: flex;
    flex-direction: column;
    gap: var(--space, 1rem);
}

.cluster {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space, 1rem);
    justify-content: var(--justify, flex-start);
    align-items: var(--align, center);
}

.center {
    box-sizing: content-box;
    margin-left: auto;
    margin-right: auto;
    max-width: var(--measure, 60ch);
    padding-left: var(--gutter, 1rem);
    padding-right: var(--gutter, 1rem);
}

.sidebar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space, 1rem);
}

.sidebar > :first-child {
    flex-basis: var(--sidebar-width, 20rem);
    flex-grow: 1;
}

.sidebar > :last-child {
    flex-basis: 0;
    flex-grow: 999;
    min-width: var(--content-min, 50%);
}

/* Usage */
.page-layout {
    --space: 2rem;
    --sidebar-width: 15rem;
    --content-min: 60%;
}
```

### Grid Area Template System
```css
.layout-system {
    display: grid;
    grid-template-areas: var(--layout);
    grid-template-columns: var(--columns);
    grid-template-rows: var(--rows);
    gap: var(--gap, 1rem);
    min-height: 100vh;
}

/* Layout variations */
.layout-home {
    --layout: 
        "header header header"
        "hero hero sidebar"
        "content content sidebar"
        "footer footer footer";
    --columns: 1fr 1fr 300px;
    --rows: auto 1fr 2fr auto;
}

.layout-article {
    --layout:
        "header header"
        "content sidebar"
        "footer footer";
    --columns: 1fr 300px;
    --rows: auto 1fr auto;
}

.layout-full {
    --layout: "content";
    --columns: 1fr;
    --rows: 1fr;
}

/* Responsive layout switching */
@media (max-width: 768px) {
    .layout-home,
    .layout-article {
        --layout:
            "header"
            "hero"
            "content"
            "sidebar"
            "footer";
        --columns: 1fr;
        --rows: auto auto 1fr auto auto;
    }
}
```

## Performance Optimization

### Content Visibility
```css
.optimize-rendering {
    /* Skip rendering for off-screen content */
    content-visibility: auto;
    
    /* Provide size hint to prevent layout shifts */
    contain-intrinsic-size: 300px;
}

.heavy-component {
    /* Strict containment for performance */
    contain: layout style paint;
}

.auto-height-component {
    content-visibility: auto;
    contain-intrinsic-size: auto 500px;
}
```

### Container Queries Performance
```css
.performance-container {
    /* Only track inline-size changes */
    container-type: inline-size;
    
    /* Avoid style queries when possible */
    container-name: perf-container;
}

@container perf-container (min-width: 400px) {
    /* Efficient container query */
    .perf-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
```

## Accessibility Considerations

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    .layout-animations {
        /* Disable layout animations */
        transition: none !important;
        animation: none !important;
    }
    
    .scroll-effects {
        /* Provide instant feedback */
        transform: none !important;
    }
}

@media (prefers-reduced-motion: no-preference) {
    .layout-animations {
        transition: all 0.3s ease;
    }
    
    .scroll-effects {
        transition: transform 0.2s ease;
    }
}
```

### High Contrast Mode
```css
@media (prefers-contrast: high) {
    .layout-components {
        border: 2px solid;
        background: Canvas;
        color: CanvasText;
    }
    
    .layout-focus {
        outline: 3px solid Highlight;
        outline-offset: 2px;
    }
}
```

## Complete Advanced Layout Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Layout Demo</title>
    <style>
        /* Modern reset */
        *, *::before, *::after {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            font-family: system-ui, sans-serif;
            line-height: 1.6;
        }
        
        /* Advanced grid layout */
        .advanced-layout {
            display: grid;
            grid-template-columns: 
                [full-start] minmax(1rem, 1fr)
                [content-start] minmax(0, 800px)
                [content-end] minmax(1rem, 1fr)
                [full-end];
            grid-template-rows: auto 1fr auto;
            min-height: 100vh;
        }
        
        .header {
            grid-column: full;
            background: #333;
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .header-content {
            grid-column: content;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .main-content {
            grid-column: content;
            container-type: inline-size;
            container-name: main;
        }
        
        .article-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 2rem 0;
        }
        
        @container main (min-width: 800px) {
            .article-grid {
                grid-template-columns: 2fr 1fr;
            }
            
            .featured-article {
                grid-row: span 2;
            }
        }
        
        .article-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            display: grid;
            grid-template-rows: auto 1fr auto;
            transition: transform 0.3s ease;
        }
        
        .article-card:hover {
            transform: translateY(-4px);
        }
        
        .footer {
            grid-column: full;
            background: #f8f9fa;
            padding: 2rem 0;
            margin-top: 4rem;
        }
        
        .footer-content {
            grid-column: content;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        /* Subgrid for aligned card content */
        @supports (grid-template-rows: subgrid) {
            .article-grid {
                grid-template-rows: masonry; /* Future CSS */
            }
            
            .article-card {
                display: grid;
                grid-template-rows: subgrid;
                grid-row: span 3;
            }
        }
    </style>
</head>
<body>
    <div class="advanced-layout">
        <header class="header">
            <div class="header-content">
                <h1>Advanced Layout</h1>
                <nav>Navigation</nav>
            </div>
        </header>
        
        <main class="main-content">
            <div class="article-grid">
                <article class="article-card featured-article">
                    <img src="https://picsum.photos/400/200" alt="" style="width: 100%; height: 200px; object-fit: cover;">
                    <div style="padding: 1.5rem;">
                        <h2>Featured Article</h2>
                        <p>This is a featured article with more content and a larger layout.</p>
                    </div>
                    <footer style="padding: 1rem 1.5rem; background: #f8f9fa;">
                        <small>Author • Date</small>
                    </footer>
                </article>
                
                <article class="article-card">
                    <img src="https://picsum.photos/400/150" alt="" style="width: 100%; height: 150px; object-fit: cover;">
                    <div style="padding: 1rem;">
                        <h3>Article Title</h3>
                        <p>Article content here.</p>
                    </div>
                    <footer style="padding: 0.75rem 1rem; background: #f8f9fa;">
                        <small>Author • Date</small>
                    </footer>
                </article>
                
                <article class="article-card">
                    <img src="https://picsum.photos/400/150?random=2" alt="" style="width: 100%; height: 150px; object-fit: cover;">
                    <div style="padding: 1rem;">
                        <h3>Another Article</h3>
                        <p>More article content.</p>
                    </div>
                    <footer style="padding: 0.75rem 1rem; background: #f8f9fa;">
                        <small>Author • Date</small>
                    </footer>
                </article>
            </div>
        </main>
        
        <footer class="footer">
            <div class="footer-content">
                <div>
                    <h4>Column 1</h4>
                    <p>Footer content</p>
                </div>
                <div>
                    <h4>Column 2</h4>
                    <p>More footer content</p>
                </div>
                <div>
                    <h4>Column 3</h4>
                    <p>Additional footer content</p>
                </div>
            </div>
        </footer>
    </div>
</body>
</html>
```

## Exercise

Create an advanced layout system:

1. **Container Query Layout**: Build components that adapt based on container size
2. **Subgrid Implementation**: Create aligned card layouts using subgrid
3. **Intrinsic Web Design**: Implement flexible layouts that adapt to content
4. **Performance Optimization**: Use content-visibility and containment
5. **Advanced Positioning**: Combine sticky, absolute, and grid positioning

### Bonus Challenges:
- Implement scroll-driven animations with proper fallbacks
- Create a masonry layout using CSS Grid
- Build a responsive magazine layout with complex grid areas
- Design a component library with layout primitives
- Implement advanced accessibility features for complex layouts
