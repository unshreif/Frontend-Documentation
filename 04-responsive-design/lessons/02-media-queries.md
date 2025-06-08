# Media Queries Mastery & Best Practices

## Understanding Media Queries

Media queries are the cornerstone of responsive design, allowing you to apply different styles based on device characteristics. Modern media queries go far beyond basic screen width detection, offering sophisticated targeting based on user preferences, device capabilities, and environmental conditions.

### Modern Media Query Syntax

#### Basic Structure and Advanced Features

```css
/* Basic width-based media query */
@media screen and (min-width: 768px) {
    /* Styles for tablets and larger */
}

/* Multiple conditions with logical operators */
@media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Styles specifically for tablets */
}

/* Orientation-based queries */
@media screen and (orientation: landscape) {
    /* Landscape-specific styles */
}

@media screen and (orientation: portrait) {
    /* Portrait-specific styles */
}

/* High-resolution display targeting */
@media screen and (-webkit-min-device-pixel-ratio: 2),
       screen and (min-resolution: 192dpi),
       screen and (min-resolution: 2dppx) {
    /* High DPI styles */
}

/* Dark mode preference */
@media (prefers-color-scheme: dark) {
    /* Dark theme styles */
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
    /* Accessibility-friendly animations */
}

/* Hover capability detection */
@media (hover: hover) {
    /* Styles for devices that can hover */
}

@media (hover: none) {
    /* Styles for touch-only devices */
}

/* Pointer precision detection */
@media (pointer: coarse) {
    /* Touch interface optimizations */
}

@media (pointer: fine) {
    /* Mouse/trackpad interface optimizations */
}
```

### Comprehensive Media Query Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Advanced Media Queries Example</title>
    
    <style>
        /* CSS Custom Properties for theming */
        :root {
            --primary-color: #3498db;
            --secondary-color: #2ecc71;
            --background-color: #ffffff;
            --text-color: #333333;
            --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            --border-radius: 8px;
            --spacing-unit: 1rem;
            --font-size-base: 1rem;
            --font-size-large: 1.25rem;
            --font-size-xl: 1.5rem;
        }

        /* Dark mode color scheme */
        @media (prefers-color-scheme: dark) {
            :root {
                --primary-color: #5dade2;
                --secondary-color: #58d68d;
                --background-color: #1a1a1a;
                --text-color: #e0e0e0;
                --card-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
        }

        /* Base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--background-color);
            color: var(--text-color);
            line-height: 1.6;
            font-size: var(--font-size-base);
            transition: background-color 0.3s ease, color 0.3s ease;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--spacing-unit);
        }

        /* Header component */
        .header {
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            padding: 2rem 0;
            text-align: center;
        }

        .header-title {
            font-size: var(--font-size-xl);
            margin-bottom: 0.5rem;
        }

        .header-subtitle {
            opacity: 0.9;
            font-size: var(--font-size-base);
        }

        /* Navigation */
        .navigation {
            background: var(--background-color);
            box-shadow: var(--card-shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-list {
            list-style: none;
            display: flex;
            flex-direction: column;
            padding: 1rem 0;
        }

        .nav-item {
            margin: 0.25rem 0;
        }

        .nav-link {
            display: block;
            padding: 1rem var(--spacing-unit);
            color: var(--text-color);
            text-decoration: none;
            border-radius: var(--border-radius);
            transition: all 0.3s ease;
        }

        /* Content grid */
        .content-grid {
            display: grid;
            gap: var(--spacing-unit);
            padding: 2rem 0;
        }

        .card {
            background: var(--background-color);
            border-radius: var(--border-radius);
            box-shadow: var(--card-shadow);
            padding: 1.5rem;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-title {
            font-size: var(--font-size-large);
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        .card-content {
            line-height: 1.7;
        }

        /* Media query for hover-capable devices */
        @media (hover: hover) {
            .nav-link:hover {
                background-color: var(--primary-color);
                color: white;
                transform: translateX(5px);
            }

            .card:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
        }

        /* Media query for touch devices */
        @media (hover: none) and (pointer: coarse) {
            .nav-link {
                padding: 1.25rem var(--spacing-unit);
                font-size: 1.125rem;
            }

            .card {
                padding: 2rem;
            }

            /* Larger touch targets */
            button, .nav-link, .card {
                min-height: 44px;
            }
        }

        /* Small devices (portrait phones) */
        @media screen and (max-width: 575px) {
            :root {
                --spacing-unit: 0.75rem;
                --font-size-base: 0.875rem;
            }

            .header {
                padding: 1.5rem 0;
            }

            .content-grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }
        }

        /* Medium devices (tablets) */
        @media screen and (min-width: 576px) and (max-width: 991px) {
            .nav-list {
                flex-direction: row;
                justify-content: center;
                flex-wrap: wrap;
            }

            .nav-item {
                margin: 0 0.5rem;
            }

            .content-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1.5rem;
            }
        }

        /* Large devices (desktops) */
        @media screen and (min-width: 992px) {
            :root {
                --font-size-base: 1.125rem;
                --font-size-large: 1.5rem;
                --font-size-xl: 2rem;
            }

            .nav-list {
                flex-direction: row;
                justify-content: center;
            }

            .nav-item {
                margin: 0 1rem;
            }

            .content-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 2rem;
            }
        }

        /* Extra large devices */
        @media screen and (min-width: 1200px) {
            .content-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 2.5rem;
            }
        }

        /* Landscape orientation specific styles */
        @media screen and (orientation: landscape) and (max-height: 600px) {
            .header {
                padding: 1rem 0;
            }

            .header-title {
                font-size: var(--font-size-large);
            }

            .navigation {
                position: static;
            }
        }

        /* High resolution displays */
        @media screen and (-webkit-min-device-pixel-ratio: 2),
               screen and (min-resolution: 192dpi) {
            .card {
                border: 1px solid rgba(0, 0, 0, 0.1);
            }
        }

        /* Reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .card:hover {
                transform: none;
            }
        }

        /* Print styles */
        @media print {
            .navigation {
                display: none;
            }

            .header {
                background: none !important;
                color: black !important;
            }

            .card {
                break-inside: avoid;
                box-shadow: none;
                border: 1px solid #ccc;
            }

            .content-grid {
                grid-template-columns: 1fr 1fr;
            }
        }

        /* Light theme enforcement for users who prefer it */
        @media (prefers-color-scheme: light) {
            .force-light-theme {
                --background-color: #ffffff;
                --text-color: #333333;
            }
        }

        /* Container query simulation (future-proofing) */
        .sidebar {
            container-type: inline-size;
        }

        /* When supported, use actual container queries */
        @supports (container-type: inline-size) {
            @container (min-width: 300px) {
                .sidebar-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                }
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1 class="header-title">Advanced Media Queries</h1>
            <p class="header-subtitle">Responsive design that adapts to devices, preferences, and capabilities</p>
        </div>
    </header>

    <nav class="navigation">
        <div class="container">
            <ul class="nav-list">
                <li class="nav-item"><a href="#width" class="nav-link">Width Queries</a></li>
                <li class="nav-item"><a href="#orientation" class="nav-link">Orientation</a></li>
                <li class="nav-item"><a href="#preferences" class="nav-link">User Preferences</a></li>
                <li class="nav-item"><a href="#capabilities" class="nav-link">Device Capabilities</a></li>
                <li class="nav-item"><a href="#resolution" class="nav-link">High Resolution</a></li>
            </ul>
        </div>
    </nav>

    <main class="container">
        <div class="content-grid">
            <article class="card" id="width">
                <h2 class="card-title">Width-Based Queries</h2>
                <div class="card-content">
                    <p>Traditional responsive breakpoints that adapt layout based on viewport width. These form the foundation of responsive design.</p>
                    <ul style="margin-top: 1rem; padding-left: 1.5rem;">
                        <li>Mobile: < 576px</li>
                        <li>Tablet: 576px - 991px</li>
                        <li>Desktop: 992px - 1199px</li>
                        <li>Large: ≥ 1200px</li>
                    </ul>
                </div>
            </article>

            <article class="card" id="orientation">
                <h2 class="card-title">Orientation Queries</h2>
                <div class="card-content">
                    <p>Adapt interfaces based on device orientation. Particularly useful for mobile devices and tablets.</p>
                    <p style="margin-top: 1rem;">Try rotating your device to see different layouts and optimizations for landscape vs portrait viewing.</p>
                </div>
            </article>

            <article class="card" id="preferences">
                <h2 class="card-title">User Preferences</h2>
                <div class="card-content">
                    <p>Respect user system preferences like dark mode, reduced motion, and high contrast needs.</p>
                    <p style="margin-top: 1rem;">This page automatically adapts to your system's dark mode setting and respects motion preferences.</p>
                </div>
            </article>

            <article class="card" id="capabilities">
                <h2 class="card-title">Device Capabilities</h2>
                <div class="card-content">
                    <p>Detect input methods (hover, pointer precision) to optimize interactions for touch vs mouse users.</p>
                    <p style="margin-top: 1rem;">Hover effects and touch targets automatically adjust based on your input method.</p>
                </div>
            </article>

            <article class="card" id="resolution">
                <h2 class="card-title">High Resolution</h2>
                <div class="card-content">
                    <p>Optimize visual elements for high-DPI displays while maintaining performance on standard screens.</p>
                    <p style="margin-top: 1rem;">Enhanced visual details appear automatically on retina and high-resolution displays.</p>
                </div>
            </article>

            <article class="card">
                <h2 class="card-title">Print Optimization</h2>
                <div class="card-content">
                    <p>Special styles for print media ensure your content looks great on paper.</p>
                    <p style="margin-top: 1rem;">Try printing this page to see print-optimized layout and styling.</p>
                </div>
            </article>
        </div>
    </main>

    <script>
        // Dynamic media query monitoring
        const MediaQueryMonitor = {
            queries: {
                mobile: '(max-width: 575px)',
                tablet: '(min-width: 576px) and (max-width: 991px)',
                desktop: '(min-width: 992px)',
                landscape: '(orientation: landscape)',
                darkMode: '(prefers-color-scheme: dark)',
                reducedMotion: '(prefers-reduced-motion: reduce)',
                hover: '(hover: hover)',
                touchDevice: '(hover: none) and (pointer: coarse)'
            },

            init() {
                this.setupListeners();
                this.updateStatus();
            },

            setupListeners() {
                Object.entries(this.queries).forEach(([name, query]) => {
                    const mql = window.matchMedia(query);
                    mql.addListener(() => this.updateStatus());
                });
            },

            updateStatus() {
                const status = {};
                Object.entries(this.queries).forEach(([name, query]) => {
                    status[name] = window.matchMedia(query).matches;
                });

                // Update body classes based on active queries
                document.body.className = Object.entries(status)
                    .filter(([name, matches]) => matches)
                    .map(([name]) => `mq-${name}`)
                    .join(' ');

                // Log current breakpoint for debugging
                console.log('Active media queries:', status);
            }
        };

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', () => {
            MediaQueryMonitor.init();
        });
    </script>
</body>
</html>
```

## Advanced Media Query Techniques

### Container Queries (Future-Proofing)

```css
/* Container queries for component-based responsive design */
.sidebar {
    container-type: inline-size;
    container-name: sidebar;
}

@container sidebar (min-width: 300px) {
    .sidebar-content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
}

@container sidebar (min-width: 500px) {
    .sidebar-content {
        grid-template-columns: repeat(3, 1fr);
    }
}

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
    @media (min-width: 768px) {
        .sidebar-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
    }
}
```

### Complex Media Query Logic

```css
/* Complex condition combining multiple factors */
@media screen 
       and (min-width: 768px) 
       and (max-width: 1023px) 
       and (orientation: landscape) 
       and (hover: hover) {
    /* Styles for landscape tablets with hover capability */
    .tablet-landscape-hover {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 2rem;
    }
}

/* Using logical operators */
@media screen and (min-width: 768px),
       screen and (orientation: landscape) and (min-height: 600px) {
    /* Either tablet+ width OR landscape with sufficient height */
    .flexible-layout {
        display: flex;
        flex-direction: row;
    }
}

/* Excluding specific conditions */
@media screen and (min-width: 768px) and (not (hover: none)) {
    /* Tablet+ with hover capability (not touch-only) */
    .hover-enhanced {
        transition: all 0.3s ease;
    }
    
    .hover-enhanced:hover {
        transform: scale(1.05);
    }
}
```

### Custom Breakpoint System

```css
/* Define custom properties for breakpoints */
:root {
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --breakpoint-xxl: 1400px;
}

/* Organized breakpoint mixins (using PostCSS or Sass) */
@custom-media --mobile (width <= 575px);
@custom-media --tablet (576px <= width <= 991px);
@custom-media --desktop (width >= 992px);
@custom-media --large-desktop (width >= 1200px);

/* Usage with custom media queries */
@media (--mobile) {
    .mobile-only {
        display: block;
    }
}

@media (--tablet) {
    .tablet-optimized {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
}
```

## Performance-Optimized Media Queries

### Efficient Media Query Organization

```css
/* Group related styles together */
/* Mobile-first base styles */
.component {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.component-title {
    font-size: 1.25rem;
    margin-bottom: 1rem;
}

.component-content {
    flex: 1;
}

/* Progressive enhancement for larger screens */
@media (min-width: 48em) {
    .component {
        flex-direction: row;
        align-items: center;
        padding: 1.5rem;
    }
    
    .component-title {
        font-size: 1.5rem;
        margin-bottom: 0;
        margin-right: 2rem;
        flex-shrink: 0;
    }
}

@media (min-width: 64em) {
    .component {
        padding: 2rem;
        border-radius: 12px;
    }
    
    .component-title {
        font-size: 1.75rem;
        margin-right: 3rem;
    }
}

/* High-resolution enhancements */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .component {
        box-shadow: 0 2px 8px rgba(0,0,0,0.12);
        border: 1px solid rgba(0,0,0,0.06);
    }
}
```

### Media Query Performance Best Practices

```css
/* Combine related queries to reduce redundancy */
@media (min-width: 768px) {
    /* All tablet+ styles together */
    .navigation { flex-direction: row; }
    .content { grid-template-columns: 1fr 1fr; }
    .sidebar { display: block; }
    .footer { text-align: left; }
}

/* Avoid over-specific queries that cause unnecessary recalculation */
/* ❌ Poor performance */
@media (min-width: 768px) and (max-width: 769px) {
    /* Very narrow range causes frequent recalculation */
}

/* ✅ Better performance */
@media (min-width: 768px) {
    /* Broader range, more stable */
}

/* Use em units for accessibility and consistency */
@media (min-width: 48em) { /* 768px at default font size */
    /* Scales with user's font size preferences */
}
```

## User Preference Media Queries

### Accessibility-Focused Queries

```css
/* Dark mode support */
@media (prefers-color-scheme: dark) {
    :root {
        --bg-color: #1a1a1a;
        --text-color: #e0e0e0;
        --accent-color: #4a9eff;
        --border-color: #333;
    }
    
    .card {
        background: #2a2a2a;
        border: 1px solid var(--border-color);
    }
    
    .button {
        background: var(--accent-color);
        color: white;
    }
}

/* Light mode (explicit) */
@media (prefers-color-scheme: light) {
    :root {
        --bg-color: #ffffff;
        --text-color: #333333;
        --accent-color: #0066cc;
        --border-color: #e0e0e0;
    }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
    
    .parallax {
        transform: none !important;
    }
}

/* High contrast preference */
@media (prefers-contrast: high) {
    .button {
        border: 2px solid currentColor;
        font-weight: bold;
    }
    
    .card {
        border: 2px solid #000;
    }
    
    a {
        text-decoration: underline;
        font-weight: bold;
    }
}

/* Transparency reduction */
@media (prefers-reduced-transparency: reduce) {
    .glass-effect {
        backdrop-filter: none;
        background: solid-color;
    }
    
    .modal-overlay {
        background: rgba(0, 0, 0, 0.8);
    }
}
```

### Device Capability Queries

```css
/* Hover capability detection */
@media (hover: hover) and (pointer: fine) {
    /* Mouse or trackpad users */
    .interactive-element:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .tooltip {
        display: none;
    }
    
    .interactive-element:hover .tooltip {
        display: block;
    }
}

@media (hover: none) and (pointer: coarse) {
    /* Touch screen users */
    .interactive-element {
        min-height: 44px;
        min-width: 44px;
        padding: 12px;
    }
    
    .tooltip {
        display: block;
        position: static;
        margin-top: 8px;
    }
    
    /* Remove hover states that don't work on touch */
    .interactive-element:hover {
        transform: none;
        box-shadow: inherit;
    }
}

/* Any-hover: device has some hover capability */
@media (any-hover: hover) {
    .dropdown {
        display: none;
    }
    
    .dropdown-trigger:hover .dropdown {
        display: block;
    }
}

/* Any-pointer: device has some precise pointing capability */
@media (any-pointer: fine) {
    .precision-controls {
        display: flex;
    }
    
    .slider {
        width: 200px;
    }
}

@media (any-pointer: coarse) {
    .precision-controls {
        display: none;
    }
    
    .slider {
        width: 100%;
        height: 40px;
    }
}
```

## Media Query Architecture Patterns

### Component-Based Media Queries

```css
/* Component-specific breakpoints */
.card-component {
    /* Mobile base */
    display: block;
    padding: 1rem;
    margin: 1rem 0;
}

/* Card component tablet breakpoint */
@media (min-width: 30em) { /* 480px */
    .card-component {
        display: flex;
        align-items: center;
        padding: 1.5rem;
    }
    
    .card-component__image {
        flex: 0 0 120px;
        margin-right: 1rem;
    }
    
    .card-component__content {
        flex: 1;
    }
}

/* Card component desktop breakpoint */
@media (min-width: 48em) { /* 768px */
    .card-component {
        padding: 2rem;
    }
    
    .card-component__image {
        flex: 0 0 160px;
        margin-right: 2rem;
    }
}
```

### Utility-First Media Query Classes

```css
/* Responsive display utilities */
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

/* Mobile-first responsive utilities */
@media (min-width: 576px) {
    .d-sm-none { display: none; }
    .d-sm-block { display: block; }
    .d-sm-flex { display: flex; }
    .d-sm-grid { display: grid; }
}

@media (min-width: 768px) {
    .d-md-none { display: none; }
    .d-md-block { display: block; }
    .d-md-flex { display: flex; }
    .d-md-grid { display: grid; }
}

@media (min-width: 992px) {
    .d-lg-none { display: none; }
    .d-lg-block { display: block; }
    .d-lg-flex { display: flex; }
    .d-lg-grid { display: grid; }
}

/* Responsive spacing utilities */
.p-1 { padding: 0.5rem; }
.p-2 { padding: 1rem; }
.p-3 { padding: 1.5rem; }

@media (min-width: 768px) {
    .p-md-1 { padding: 0.5rem; }
    .p-md-2 { padding: 1rem; }
    .p-md-3 { padding: 1.5rem; }
    .p-md-4 { padding: 2rem; }
}

/* Responsive text alignment */
.text-center { text-align: center; }
.text-left { text-align: left; }

@media (min-width: 768px) {
    .text-md-left { text-align: left; }
    .text-md-center { text-align: center; }
    .text-md-right { text-align: right; }
}
```

## Testing and Debugging Media Queries

### JavaScript Media Query Testing

```javascript
// Media query testing utilities
const MediaQueryTester = {
    // Test if a media query matches
    test(query) {
        return window.matchMedia(query).matches;
    },
    
    // Get current breakpoint
    getCurrentBreakpoint() {
        const breakpoints = {
            xs: '(max-width: 575px)',
            sm: '(min-width: 576px) and (max-width: 767px)',
            md: '(min-width: 768px) and (max-width: 991px)',
            lg: '(min-width: 992px) and (max-width: 1199px)',
            xl: '(min-width: 1200px)'
        };
        
        for (const [name, query] of Object.entries(breakpoints)) {
            if (this.test(query)) {
                return name;
            }
        }
        return 'unknown';
    },
    
    // Monitor breakpoint changes
    watchBreakpoints(callback) {
        const queries = [
            '(max-width: 575px)',
            '(min-width: 576px)',
            '(min-width: 768px)',
            '(min-width: 992px)',
            '(min-width: 1200px)'
        ];
        
        queries.forEach(query => {
            const mql = window.matchMedia(query);
            mql.addListener(callback);
        });
    },
    
    // Get all active media queries
    getActiveQueries() {
        const queries = {
            mobile: '(max-width: 767px)',
            tablet: '(min-width: 768px) and (max-width: 991px)',
            desktop: '(min-width: 992px)',
            touch: '(hover: none) and (pointer: coarse)',
            hover: '(hover: hover)',
            darkMode: '(prefers-color-scheme: dark)',
            reducedMotion: '(prefers-reduced-motion: reduce)',
            landscape: '(orientation: landscape)',
            portrait: '(orientation: portrait)',
            highRes: '(-webkit-min-device-pixel-ratio: 2)'
        };
        
        const active = {};
        Object.entries(queries).forEach(([name, query]) => {
            active[name] = this.test(query);
        });
        
        return active;
    }
};

// Usage examples
console.log('Current breakpoint:', MediaQueryTester.getCurrentBreakpoint());
console.log('Is mobile?', MediaQueryTester.test('(max-width: 767px)'));
console.log('Active queries:', MediaQueryTester.getActiveQueries());

// Watch for breakpoint changes
MediaQueryTester.watchBreakpoints(() => {
    console.log('Breakpoint changed to:', MediaQueryTester.getCurrentBreakpoint());
});
```

### CSS Custom Properties with Media Queries

```css
/* Dynamic spacing system using custom properties */
:root {
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 1.5rem;
    --spacing-lg: 2rem;
    --spacing-xl: 3rem;
    
    --container-padding: var(--spacing-sm);
    --section-padding: var(--spacing-md);
    --component-gap: var(--spacing-sm);
}

@media (min-width: 768px) {
    :root {
        --container-padding: var(--spacing-md);
        --section-padding: var(--spacing-lg);
        --component-gap: var(--spacing-md);
    }
}

@media (min-width: 1200px) {
    :root {
        --container-padding: var(--spacing-lg);
        --section-padding: var(--spacing-xl);
        --component-gap: var(--spacing-lg);
    }
}

/* Use the dynamic values */
.container {
    padding: 0 var(--container-padding);
}

.section {
    padding: var(--section-padding) 0;
}

.component-grid {
    gap: var(--component-gap);
}
```

## Best Practices and Common Pitfalls

### Media Query Organization Best Practices

```css
/* ✅ Good: Organized, mobile-first approach */
/* Base mobile styles */
.navigation {
    display: flex;
    flex-direction: column;
    background: #333;
}

/* Progressive enhancement */
@media (min-width: 768px) {
    .navigation {
        flex-direction: row;
        justify-content: space-between;
    }
}

@media (min-width: 1024px) {
    .navigation {
        padding: 0 2rem;
    }
}

/* ❌ Poor: Desktop-first, disorganized */
.navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 2rem;
    background: #333;
}

@media (max-width: 1023px) {
    .navigation {
        padding: 0 1rem;
    }
}

@media (max-width: 767px) {
    .navigation {
        flex-direction: column;
        justify-content: flex-start;
    }
}
```

### Performance Considerations

```css
/* ✅ Efficient: Grouped queries */
@media (min-width: 768px) {
    .header { padding: 2rem 0; }
    .navigation { flex-direction: row; }
    .content { grid-template-columns: 1fr 1fr; }
    .sidebar { display: block; }
    .footer { text-align: left; }
}

/* ❌ Inefficient: Repeated queries */
@media (min-width: 768px) {
    .header { padding: 2rem 0; }
}

@media (min-width: 768px) {
    .navigation { flex-direction: row; }
}

@media (min-width: 768px) {
    .content { grid-template-columns: 1fr 1fr; }
}
```

This comprehensive media queries lesson provides students with advanced techniques, modern features, and practical implementation strategies for creating sophisticated responsive designs that adapt to various device capabilities and user preferences.
