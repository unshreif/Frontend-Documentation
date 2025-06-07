# Responsive Design with CSS

## Introduction to Responsive Design

Responsive design ensures your website looks and functions well on all devices and screen sizes.

## Viewport Meta Tag

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <!-- Essential viewport meta tag -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Design</title>
</head>
<body>
    <!-- Your content -->
</body>
</html>
```

## Mobile-First Approach

### Start with Mobile Styles
```css
/* Base styles (mobile first) */
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

.card {
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### Progressive Enhancement
```css
/* Tablet styles */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
        max-width: 1200px;
    }
    
    .grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
    
    .card {
        padding: 1.5rem;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
    
    .card {
        padding: 2rem;
    }
}

/* Large desktop styles */
@media (min-width: 1200px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
    }
}
```

## Media Queries

### Syntax and Types
```css
/* Basic media query */
@media screen and (min-width: 768px) {
    /* Styles for screens 768px and wider */
}

/* Multiple conditions */
@media screen and (min-width: 768px) and (max-width: 1023px) {
    /* Styles for tablets only */
}

/* Orientation queries */
@media (orientation: landscape) {
    /* Landscape orientation */
}

@media (orientation: portrait) {
    /* Portrait orientation */
}

/* High DPI displays */
@media (-webkit-min-device-pixel-ratio: 2),
       (min-resolution: 192dpi) {
    /* Retina displays */
    .logo {
        background-image: url('logo@2x.png');
        background-size: 100px 50px;
    }
}

/* Print styles */
@media print {
    .no-print {
        display: none !important;
    }
    
    body {
        font-size: 12pt;
        color: black;
        background: white;
    }
}
```

### Common Breakpoints
```css
/* Mobile devices */
@media (max-width: 767px) {
    /* Mobile styles */
}

/* Tablets */
@media (min-width: 768px) and (max-width: 1023px) {
    /* Tablet styles */
}

/* Desktop */
@media (min-width: 1024px) {
    /* Desktop styles */
}

/* Large desktop */
@media (min-width: 1200px) {
    /* Large desktop styles */
}

/* Extra large screens */
@media (min-width: 1440px) {
    /* XL desktop styles */
}
```

## Flexible Units

### Relative Units
```css
/* Font sizes with rem */
body {
    font-size: 16px; /* Base font size */
}

h1 { font-size: 2.5rem; }    /* 40px */
h2 { font-size: 2rem; }      /* 32px */
h3 { font-size: 1.5rem; }    /* 24px */
p { font-size: 1rem; }       /* 16px */
small { font-size: 0.875rem; } /* 14px */

/* Spacing with rem */
.section {
    padding: 2rem 0;     /* 32px top/bottom */
    margin-bottom: 3rem; /* 48px bottom */
}

/* Responsive with em (relative to parent) */
.button {
    font-size: 1rem;
    padding: 0.75em 1.5em; /* Scales with font-size */
    border-radius: 0.25em;
}
```

### Viewport Units
```css
/* Full viewport dimensions */
.hero {
    height: 100vh;        /* Full viewport height */
    width: 100vw;         /* Full viewport width */
}

/* Partial viewport dimensions */
.sidebar {
    height: 80vh;         /* 80% of viewport height */
    width: 25vw;          /* 25% of viewport width */
}

/* Minimum viewport dimensions */
.section {
    min-height: 50vh;     /* At least 50% of viewport height */
}

/* Text scaling with viewport */
.hero-title {
    font-size: calc(2rem + 2vw); /* Responsive font size */
}

/* New viewport units (better support) */
.modern-hero {
    height: 100dvh;       /* Dynamic viewport height */
    height: 100svh;       /* Small viewport height */
    height: 100lvh;       /* Large viewport height */
}
```

### Percentage Units
```css
/* Flexible widths */
.container {
    width: 90%;           /* 90% of parent width */
    max-width: 1200px;    /* But not larger than 1200px */
    margin: 0 auto;       /* Center horizontally */
}

/* Responsive columns */
.column {
    width: 100%;          /* Mobile: full width */
}

@media (min-width: 768px) {
    .column {
        width: 48%;       /* Tablet: ~half width */
        margin: 1%;       /* Small margins */
    }
}

@media (min-width: 1024px) {
    .column {
        width: 31.33%;    /* Desktop: ~third width */
        margin: 1%;
    }
}
```

## Responsive Images

### Basic Responsive Images
```css
/* Make images responsive */
img {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Responsive background images */
.hero-image {
    background-image: url('hero-mobile.jpg');
    background-size: cover;
    background-position: center;
    height: 50vh;
}

@media (min-width: 768px) {
    .hero-image {
        background-image: url('hero-tablet.jpg');
        height: 60vh;
    }
}

@media (min-width: 1024px) {
    .hero-image {
        background-image: url('hero-desktop.jpg');
        height: 70vh;
    }
}
```

### Advanced Image Techniques
```html
<!-- Art direction with picture element -->
<picture>
    <source media="(min-width: 1024px)" srcset="hero-desktop.jpg">
    <source media="(min-width: 768px)" srcset="hero-tablet.jpg">
    <img src="hero-mobile.jpg" alt="Hero image">
</picture>

<!-- Responsive images with srcset -->
<img src="image-400.jpg"
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w"
     sizes="(max-width: 768px) 100vw,
            (max-width: 1024px) 50vw,
            33vw"
     alt="Responsive image">
```

```css
/* Responsive image containers */
.image-container {
    position: relative;
    width: 100%;
    overflow: hidden;
}

/* Aspect ratio containers */
.aspect-ratio-16-9 {
    aspect-ratio: 16 / 9;
}

.aspect-ratio-4-3 {
    aspect-ratio: 4 / 3;
}

.aspect-ratio-1-1 {
    aspect-ratio: 1 / 1;
}

/* Fallback for older browsers */
.aspect-ratio-16-9-fallback {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 9/16 = 0.5625 */
}

.aspect-ratio-16-9-fallback img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

## Responsive Typography

### Fluid Typography
```css
/* Basic responsive text scaling */
body {
    font-size: 14px;
}

@media (min-width: 768px) {
    body {
        font-size: 16px;
    }
}

@media (min-width: 1024px) {
    body {
        font-size: 18px;
    }
}

/* Fluid typography with clamp() */
.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
    /* Minimum: 1.5rem, Preferred: 4vw, Maximum: 3rem */
}

.body-text {
    font-size: clamp(0.875rem, 2.5vw, 1.125rem);
    line-height: clamp(1.4, 1.5, 1.6);
}

/* Responsive line height */
.content {
    line-height: 1.4;
}

@media (min-width: 768px) {
    .content {
        line-height: 1.6;
    }
}
```

### Reading Experience
```css
/* Optimal reading width */
.content {
    max-width: 65ch; /* ~65 characters wide */
    margin: 0 auto;
    padding: 0 1rem;
}

/* Responsive font scaling system */
:root {
    --font-size-sm: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
    --font-size-base: clamp(1rem, 0.34vw + 0.91rem, 1.19rem);
    --font-size-md: clamp(1.25rem, 0.61vw + 1.1rem, 1.58rem);
    --font-size-lg: clamp(1.56rem, 1vw + 1.31rem, 2.11rem);
    --font-size-xl: clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
    --font-size-xxl: clamp(2.44rem, 2.38vw + 1.85rem, 3.75rem);
}

.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-md { font-size: var(--font-size-md); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-xxl { font-size: var(--font-size-xxl); }
```

## Responsive Layout Patterns

### Flexible Grid System
```css
/* Responsive grid with CSS Grid */
.grid {
    display: grid;
    gap: 1rem;
    
    /* Mobile: 1 column */
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .grid {
        /* Tablet: 2 columns */
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
}

@media (min-width: 1024px) {
    .grid {
        /* Desktop: 3 columns */
        grid-template-columns: repeat(3, 1fr);
    }
}

@media (min-width: 1200px) {
    .grid {
        /* Large desktop: 4 columns */
        grid-template-columns: repeat(4, 1fr);
        gap: 3rem;
    }
}

/* Auto-responsive grid */
.auto-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}
```

### Flexible Flexbox Layouts
```css
/* Responsive navigation */
.nav {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .nav {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
}

/* Responsive card layout */
.card-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .card-container {
        flex-direction: row;
        flex-wrap: wrap;
    }
    
    .card {
        flex: 1 1 300px; /* Grow, shrink, min 300px */
        max-width: 400px;
    }
}

/* Responsive sidebar layout */
.layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.sidebar {
    order: 2; /* Sidebar after content on mobile */
}

.main-content {
    order: 1; /* Content first on mobile */
}

@media (min-width: 1024px) {
    .layout {
        flex-direction: row;
    }
    
    .sidebar {
        flex: 0 0 300px; /* Fixed width sidebar */
        order: 1; /* Sidebar first on desktop */
    }
    
    .main-content {
        flex: 1; /* Flexible main content */
        order: 2;
    }
}
```

## Container Queries (Modern Approach)

```css
/* Container queries for component-based responsive design */
.card-container {
    container-type: inline-size;
    container-name: card;
}

.card {
    padding: 1rem;
    background: white;
    border-radius: 8px;
}

/* Style based on container size, not viewport */
@container card (min-width: 400px) {
    .card {
        padding: 2rem;
        display: flex;
        gap: 1rem;
    }
    
    .card-content {
        flex: 1;
    }
}

@container card (min-width: 600px) {
    .card {
        padding: 3rem;
    }
    
    .card-title {
        font-size: 2rem;
    }
}
```

## Performance Considerations

### Critical CSS
```html
<head>
    <!-- Inline critical CSS for above-the-fold content -->
    <style>
        /* Critical styles here */
        .header, .hero, .nav {
            /* Inline styles for initial render */
        }
    </style>
    
    <!-- Load non-critical CSS asynchronously -->
    <link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="styles.css"></noscript>
</head>
```

### Responsive Loading
```css
/* Hide complex layouts on mobile */
@media (max-width: 767px) {
    .desktop-only {
        display: none;
    }
}

/* Simplified animations for mobile */
@media (max-width: 767px) {
    .animated-element {
        animation: none !important;
        transition: none !important;
    }
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Complete Responsive Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Layout Example</title>
    <style>
        /* Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, -apple-system, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        /* Container */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Header */
        .header {
            background: #333;
            color: white;
            padding: 1rem 0;
        }
        
        .header-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        /* Navigation */
        .nav {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
        
        .nav a {
            color: white;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        
        .nav a:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        
        /* Main layout */
        .main-layout {
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem 0;
        }
        
        /* Content grid */
        .content-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
        
        /* Cards */
        .card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 8px;
            margin-bottom: 1rem;
        }
        
        /* Tablet styles */
        @media (min-width: 768px) {
            .container {
                padding: 0 2rem;
            }
            
            .header-content {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            }
            
            .nav {
                flex-direction: row;
                gap: 1rem;
            }
            
            .content-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem;
            }
            
            .card {
                padding: 2rem;
            }
        }
        
        /* Desktop styles */
        @media (min-width: 1024px) {
            .main-layout {
                flex-direction: row;
                gap: 3rem;
            }
            
            .content {
                flex: 1;
            }
            
            .sidebar {
                flex: 0 0 300px;
            }
            
            .content-grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* Large desktop */
        @media (min-width: 1200px) {
            .content-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 3rem;
            }
        }
        
        /* Print styles */
        @media print {
            .nav, .sidebar {
                display: none;
            }
            
            .container {
                max-width: none;
                padding: 0;
            }
            
            .card {
                break-inside: avoid;
                box-shadow: none;
                border: 1px solid #ccc;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1>Responsive Site</h1>
                <nav class="nav">
                    <a href="#home">Home</a>
                    <a href="#about">About</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </div>
    </header>
    
    <div class="container">
        <div class="main-layout">
            <main class="content">
                <div class="content-grid">
                    <div class="card">
                        <img src="https://picsum.photos/300/200?random=1" alt="Sample image">
                        <h3>Card Title 1</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>
                    <div class="card">
                        <img src="https://picsum.photos/300/200?random=2" alt="Sample image">
                        <h3>Card Title 2</h3>
                        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div class="card">
                        <img src="https://picsum.photos/300/200?random=3" alt="Sample image">
                        <h3>Card Title 3</h3>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation.</p>
                    </div>
                    <div class="card">
                        <img src="https://picsum.photos/300/200?random=4" alt="Sample image">
                        <h3>Card Title 4</h3>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
                    </div>
                </div>
            </main>
            
            <aside class="sidebar">
                <div class="card">
                    <h3>Sidebar Content</h3>
                    <p>This sidebar appears below the main content on mobile and to the side on desktop.</p>
                </div>
            </aside>
        </div>
    </div>
</body>
</html>
```

## Exercise

Create a responsive portfolio website:

1. **Mobile-first approach** with progressive enhancement
2. **Responsive navigation** that collapses on mobile
3. **Flexible grid system** for project showcase
4. **Responsive typography** using fluid units
5. **Optimized images** for different screen sizes
6. **Print-friendly styles**

### Bonus Challenges:
- Implement container queries for component responsiveness
- Add responsive animations that respect `prefers-reduced-motion`
- Create a responsive table that transforms into cards on mobile
- Implement responsive image loading based on device capabilities
