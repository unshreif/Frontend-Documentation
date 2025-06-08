# Flexbox for Responsive Layouts

## Introduction to Responsive Flexbox

Flexbox is perfect for creating responsive, one-dimensional layouts that adapt fluidly to different screen sizes. While CSS Grid excels at two-dimensional layouts, Flexbox shines for component-level responsive design and content-driven layouts.

## Flexbox Fundamentals for Responsive Design

### Basic Responsive Flex Container

```css
/* Mobile-first responsive container */
.flex-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

/* Tablet and up: horizontal layout */
@media (min-width: 768px) {
    .flex-container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 1.5rem;
    }
}

/* Desktop and up: enhanced spacing */
@media (min-width: 1024px) {
    .flex-container {
        padding: 2rem;
        gap: 2rem;
    }
}
```

### Responsive Flex Items

```css
/* Base flex item styles */
.flex-item {
    flex: 1; /* Equal distribution */
    min-width: 0; /* Allows shrinking below content size */
    padding: 1rem;
    background: white;
    border-radius: 8px;
}

/* Specific flex behaviors */
.flex-item--grow {
    flex: 2; /* Takes twice as much space */
}

.flex-item--shrink {
    flex: 0 1 auto; /* Doesn't grow, can shrink */
}

.flex-item--fixed {
    flex: 0 0 200px; /* Fixed width, no grow/shrink */
}

/* Responsive flex basis */
.flex-item--responsive {
    flex: 1 1 300px; /* Min 300px, then grows equally */
}

@media (max-width: 767px) {
    .flex-item--responsive {
        flex: 1 1 100%; /* Full width on mobile */
    }
}
```

## Responsive Navigation with Flexbox

### Mobile-First Navigation

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Flexbox Navigation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
        }

        /* Header container */
        .header {
            background: #2c3e50;
            color: white;
            padding: 1rem;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }

        /* Logo section */
        .logo-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
        }

        /* Mobile menu toggle */
        .menu-toggle {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0.5rem;
            display: block;
        }

        /* Navigation menu */
        .nav-menu {
            display: none;
            flex-direction: column;
            gap: 0.5rem;
            list-style: none;
        }

        .nav-menu.active {
            display: flex;
        }

        .nav-menu a {
            color: white;
            text-decoration: none;
            padding: 0.75rem 1rem;
            border-radius: 4px;
            transition: background-color 0.3s ease;
        }

        .nav-menu a:hover,
        .nav-menu a:focus {
            background-color: rgba(255, 255, 255, 0.1);
        }

        /* Tablet and up: horizontal navigation */
        @media (min-width: 768px) {
            .header-content {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                gap: 2rem;
            }

            .menu-toggle {
                display: none;
            }

            .nav-menu {
                display: flex !important;
                flex-direction: row;
                gap: 1rem;
            }

            .nav-menu a {
                padding: 0.5rem 1rem;
            }
        }

        /* Desktop: enhanced spacing */
        @media (min-width: 1024px) {
            .header {
                padding: 1.5rem;
            }

            .nav-menu {
                gap: 1.5rem;
            }

            .nav-menu a {
                padding: 0.75rem 1.5rem;
            }
        }

        /* Dropdown menu styles */
        .nav-item {
            position: relative;
        }

        .dropdown {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #34495e;
            border-radius: 4px;
            padding: 0.5rem 0;
            min-width: 200px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .dropdown a {
            display: block;
            padding: 0.5rem 1rem;
            border-radius: 0;
        }

        /* Desktop dropdown behavior */
        @media (min-width: 768px) {
            .nav-item:hover .dropdown {
                display: block;
            }
        }

        /* Mobile dropdown behavior */
        @media (max-width: 767px) {
            .dropdown {
                position: static;
                background: transparent;
                box-shadow: none;
                padding-left: 1rem;
            }

            .nav-item.active .dropdown {
                display: block;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="header-content">
            <div class="logo-section">
                <div class="logo">FlexNav</div>
                <button class="menu-toggle" aria-label="Toggle navigation menu">
                    ☰
                </button>
            </div>
            
            <nav>
                <ul class="nav-menu" id="nav-menu">
                    <li class="nav-item">
                        <a href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="#about">About</a>
                        <ul class="dropdown">
                            <li><a href="#team">Our Team</a></li>
                            <li><a href="#history">History</a></li>
                            <li><a href="#mission">Mission</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#services">Services</a>
                        <ul class="dropdown">
                            <li><a href="#web-design">Web Design</a></li>
                            <li><a href="#development">Development</a></li>
                            <li><a href="#consulting">Consulting</a></li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="#portfolio">Portfolio</a>
                    </li>
                    <li class="nav-item">
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <main style="padding: 2rem; min-height: 100vh;">
        <div style="max-width: 1200px; margin: 0 auto;">
            <h1>Responsive Flexbox Navigation</h1>
            <p>This navigation demonstrates responsive behavior using Flexbox. Try resizing your browser window to see how it adapts to different screen sizes.</p>
        </div>
    </main>

    <script>
        // Mobile menu toggle functionality
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('#nav-menu');

        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.header-content')) {
                navMenu.classList.remove('active');
            }
        });

        // Handle dropdown on mobile
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const link = item.querySelector('a');
            const dropdown = item.querySelector('.dropdown');
            
            if (dropdown) {
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 767) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 767) {
                navMenu.classList.remove('active');
                navItems.forEach(item => item.classList.remove('active'));
            }
        });
    </script>
</body>
</html>
```

## Responsive Card Layouts with Flexbox

### Flexible Card Grid

```css
/* Responsive card container */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    padding: 1.5rem;
    justify-content: center;
}

/* Base card styles */
.card {
    flex: 1 1 300px; /* Grow, shrink, min 300px */
    max-width: 400px; /* Prevent cards from getting too wide */
    min-height: 250px;
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Card content layout */
.card-header {
    flex: 0 0 auto;
    margin-bottom: 1rem;
}

.card-content {
    flex: 1; /* Takes remaining space */
    margin-bottom: 1rem;
}

.card-footer {
    flex: 0 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
}

/* Responsive card sizing */
@media (max-width: 767px) {
    .card-container {
        gap: 1rem;
        padding: 1rem;
    }
    
    .card {
        flex: 1 1 100%; /* Full width on mobile */
        max-width: none;
    }
}

@media (min-width: 768px) and (max-width: 1023px) {
    .card {
        flex: 1 1 calc(50% - 0.75rem); /* Two columns on tablet */
    }
}

@media (min-width: 1024px) {
    .card-container {
        gap: 2rem;
        padding: 2rem;
    }
    
    .card {
        flex: 1 1 calc(33.333% - 1.33rem); /* Three columns on desktop */
    }
}
```

### Advanced Responsive Flexbox Patterns

```css
/* Responsive sidebar layout */
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 1rem;
}

.main-content {
    flex: 1;
    padding: 1rem;
    order: 1; /* Content first on mobile */
}

.sidebar {
    flex: 0 0 auto;
    padding: 1rem;
    background: #f8f9fa;
    order: 2; /* Sidebar second on mobile */
}

@media (min-width: 1024px) {
    .layout {
        flex-direction: row;
        gap: 2rem;
    }
    
    .main-content {
        flex: 1;
        order: 2; /* Content second on desktop */
    }
    
    .sidebar {
        flex: 0 0 300px; /* Fixed width on desktop */
        order: 1; /* Sidebar first on desktop */
    }
}

/* Responsive header with flexible elements */
.page-header {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-title {
    order: 1;
}

.header-actions {
    order: 2;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.header-meta {
    order: 3;
    font-size: 0.875rem;
    color: #666;
}

@media (min-width: 768px) {
    .page-header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
    
    .header-title {
        order: 1;
        flex: 1;
    }
    
    .header-meta {
        order: 2;
        flex: 0 0 auto;
    }
    
    .header-actions {
        order: 3;
        flex: 0 0 auto;
        flex-direction: row;
        gap: 1rem;
    }
}
```

## Responsive Form Layouts

### Flexible Form Design

```css
/* Responsive form container */
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Form groups */
.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

@media (min-width: 768px) {
    .form-row {
        flex-direction: row;
    }
    
    .form-row .form-group {
        flex: 1;
    }
}

/* Form controls */
.form-control {
    padding: 0.75rem;
    border: 2px solid #e1e5e9;
    border-radius: 6px;
    font-size: 1rem;
    transition: border-color 0.3s ease;
}

.form-control:focus {
    outline: none;
    border-color: #007bff;
}

/* Responsive button group */
.button-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1rem;
}

@media (min-width: 768px) {
    .button-group {
        flex-direction: row;
        justify-content: flex-end;
    }
    
    .button-group .btn {
        flex: 0 0 auto;
    }
}

/* Button styles */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-primary {
    background: #007bff;
    color: white;
}

.btn-secondary {
    background: #6c757d;
    color: white;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}
```

## Responsive Media Objects

### Flexible Media Layout

```css
/* Media object pattern */
.media {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.media-object {
    flex: 0 0 auto;
    border-radius: 50%;
    overflow: hidden;
}

.media-content {
    flex: 1;
    min-width: 0; /* Allows text to truncate */
}

/* Responsive media sizes */
@media (max-width: 767px) {
    .media {
        flex-direction: column;
        text-align: center;
    }
    
    .media-object {
        align-self: center;
        width: 80px;
        height: 80px;
    }
}

@media (min-width: 768px) {
    .media-object {
        width: 60px;
        height: 60px;
    }
}

@media (min-width: 1024px) {
    .media {
        gap: 1.5rem;
    }
    
    .media-object {
        width: 80px;
        height: 80px;
    }
}

/* Reverse media object */
.media--reverse {
    flex-direction: row-reverse;
}

@media (max-width: 767px) {
    .media--reverse {
        flex-direction: column;
    }
}
```

## Performance Considerations

### Efficient Flexbox

```css
/* Optimize for performance */
.flex-container {
    /* Use transform instead of changing flex properties */
    transform: translateZ(0); /* Enable hardware acceleration */
}

/* Avoid expensive flex calculations on scroll */
.scrollable-flex {
    will-change: scroll-position;
}

/* Use specific flex values to avoid recalculation */
.fixed-flex {
    flex: 0 0 200px; /* More performant than flex: none */
}

/* Minimize layout thrashing */
.responsive-flex {
    contain: layout; /* Contain layout changes */
}
```

### Accessibility with Flexbox

```css
/* Maintain logical tab order */
.flex-container {
    /* Don't rely solely on visual order */
}

.flex-item {
    /* Use order sparingly and maintain logical tab order */
    order: 1;
}

/* Focus management */
.flex-item:focus-within {
    outline: 2px solid #007bff;
    outline-offset: 2px;
}

/* Screen reader considerations */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
```

## Complete Responsive Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Flexbox Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }

        /* Page layout */
        .page {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
        }

        .header {
            flex: 0 0 auto;
            background: #007bff;
            color: white;
            padding: 1rem;
        }

        .main {
            flex: 1;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            padding: 2rem;
        }

        .footer {
            flex: 0 0 auto;
            background: #343a40;
            color: white;
            padding: 1rem;
            text-align: center;
        }

        /* Hero section */
        .hero {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 2rem;
            border-radius: 12px;
        }

        /* Content sections */
        .content-section {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .section-header {
            text-align: center;
            margin-bottom: 2rem;
        }

        /* Card grid */
        .card-grid {
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            justify-content: center;
        }

        .card {
            flex: 1 1 300px;
            max-width: 400px;
            background: white;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
        }

        .card:hover {
            transform: translateY(-5px);
        }

        /* Responsive behavior */
        @media (max-width: 767px) {
            .main {
                padding: 1rem;
                gap: 1rem;
            }
            
            .hero {
                padding: 2rem 1rem;
            }
            
            .card {
                flex: 1 1 100%;
                max-width: none;
            }
            
            .card-grid {
                gap: 1rem;
            }
        }

        @media (min-width: 768px) {
            .card {
                flex: 1 1 calc(50% - 1rem);
            }
        }

        @media (min-width: 1024px) {
            .main {
                max-width: 1200px;
                margin: 0 auto;
                width: 100%;
            }
            
            .content-section {
                flex-direction: row;
                align-items: flex-start;
            }
            
            .card {
                flex: 1 1 calc(33.333% - 1.33rem);
            }
        }
    </style>
</head>
<body>
    <div class="page">
        <header class="header">
            <h1>Responsive Flexbox Demo</h1>
        </header>
        
        <main class="main">
            <section class="hero">
                <h2>Welcome to Flexible Design</h2>
                <p>Experience responsive layouts that adapt beautifully to any screen size</p>
            </section>
            
            <section class="content-section">
                <div class="section-header">
                    <h2>Our Features</h2>
                    <p>Discover what makes our approach special</p>
                </div>
                
                <div class="card-grid">
                    <div class="card">
                        <h3>Responsive</h3>
                        <p>Layouts that work perfectly on any device, from mobile phones to large desktop screens.</p>
                    </div>
                    
                    <div class="card">
                        <h3>Flexible</h3>
                        <p>Components that grow and shrink intelligently based on available space and content.</p>
                    </div>
                    
                    <div class="card">
                        <h3>Accessible</h3>
                        <p>Built with accessibility in mind, ensuring everyone can use and navigate your content.</p>
                    </div>
                    
                    <div class="card">
                        <h3>Performance</h3>
                        <p>Optimized for speed and efficiency, delivering fast load times across all devices.</p>
                    </div>
                    
                    <div class="card">
                        <h3>Modern</h3>
                        <p>Utilizing the latest CSS features and best practices for contemporary web development.</p>
                    </div>
                    
                    <div class="card">
                        <h3>Maintainable</h3>
                        <p>Clean, organized code that's easy to understand, modify, and extend over time.</p>
                    </div>
                </div>
            </section>
        </main>
        
        <footer class="footer">
            <p>&copy; 2024 Responsive Flexbox Demo. Built with modern CSS.</p>
        </footer>
    </div>
</body>
</html>
```

## Best Practices for Responsive Flexbox

### 1. Start Mobile-First
- Design for mobile devices first
- Use `flex-direction: column` as the base
- Progressive enhancement for larger screens

### 2. Use Appropriate Flex Values
- `flex: 1` for equal distribution
- `flex: 0 0 auto` for fixed-size items
- `flex: 1 1 300px` for responsive with minimum width

### 3. Combine with CSS Grid
- Use Grid for page layout
- Use Flexbox for component layout
- Leverage the strengths of both

### 4. Performance Optimization
- Avoid changing flex properties during animations
- Use `transform` for animations instead
- Consider `contain: layout` for complex layouts

### 5. Accessibility Considerations
- Maintain logical source order
- Use `order` property sparingly
- Ensure keyboard navigation works correctly
- Test with screen readers

## Common Flexbox Pitfalls

### ❌ Avoid These Mistakes:
- Overusing `order` property
- Not setting `min-width: 0` on flex items with text
- Using flexbox for grid-like layouts
- Neglecting mobile-first approach

### ✅ Best Practices:
- Use semantic HTML structure
- Keep source order logical
- Use appropriate flex values
- Test across devices and browsers
- Consider accessibility from the start

This comprehensive lesson provides students with practical skills for creating responsive layouts using Flexbox, from basic concepts to advanced patterns and real-world applications.
