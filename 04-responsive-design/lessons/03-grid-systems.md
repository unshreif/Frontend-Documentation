<!-- ...existing code... -->
                
                <aside class="sidebar-content">
                    <h3>Sidebar</h3>
                    <p>Related content and navigation</p>
                </aside>
                
                <main class="main-content">
                    <h3>Main Content</h3>
                    <p>Primary article content area</p>
                </main>
            </div>
        </section>
        
        <section>
            <h2>Card Grid System</h2>
            <p>Flexible card layout with consistent heights:</p>
            
            <div class="card-grid">
                <div class="card">
                    <div class="card-image">🎨</div>
                    <div class="card-content">
                        <h3 class="card-title">Design System</h3>
                        <p>Build consistent user interfaces with reusable components and design tokens.</p>
                    </div>
                    <div class="card-actions">
                        <button class="button">Learn More</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-image">⚡</div>
                    <div class="card-content">
                        <h3 class="card-title">Performance</h3>
                        <p>Optimize your grid layouts for maximum performance across all devices.</p>
                    </div>
                    <div class="card-actions">
                        <button class="button">Optimize</button>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-image">📱</div>
                    <div class="card-content">
                        <h3 class="card-title">Responsive Design</h3>
                        <p>Create layouts that work perfectly on every screen size and device type.</p>
                    </div>
                    <div class="card-actions">
                        <button class="button">Explore</button>
                    </div>
                </div>
            </div>
        </section>
        
        <section>
            <h2>Dashboard Layout</h2>
            <p>Complex dashboard with various widget sizes:</p>
            
            <div class="dashboard">
                <div class="widget widget-large">
                    <div>
                        <h3>Main Chart</h3>
                        <p>Primary data visualization</p>
                    </div>
                </div>
                
                <div class="widget widget-medium">
                    <div>
                        <h4>Analytics</h4>
                        <p>Key metrics</p>
                    </div>
                </div>
                
                <div class="widget widget-small">KPI 1</div>
                <div class="widget widget-small">KPI 2</div>
                <div class="widget widget-small">KPI 3</div>
                <div class="widget widget-small">KPI 4</div>
                
                <div class="widget widget-medium">
                    <div>
                        <h4>Reports</h4>
                        <p>Generated insights</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</body>
</html>

## Flexbox Layout Systems

### Flexible Navigation Patterns

```css
/* Responsive Navigation with Flexbox */
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #2c3e50;
    color: white;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.nav-link:hover {
    background-color: rgba(255,255,255,0.1);
}

/* Mobile Navigation */
@media (max-width: 768px) {
    .navbar {
        flex-direction: column;
        gap: 1rem;
    }
    
    .nav-menu {
        flex-direction: column;
        width: 100%;
        text-align: center;
        gap: 0;
    }
    
    .nav-link {
        display: block;
        padding: 1rem;
        border-bottom: 1px solid rgba(255,255,255,0.1);
    }
}
```

### Component Layout Patterns

```css
/* Flexible Form Layout */
.form-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
}

.form-row {
    display: flex;
    gap: 1rem;
}

.form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

/* Responsive form adjustments */
@media (max-width: 480px) {
    .form-row {
        flex-direction: column;
    }
}

/* Flexible Media Object */
.media-object {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
}

.media-object-image {
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #3498db;
}

.media-object-content {
    flex: 1;
}

.media-object-title {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
}

/* Centered Content Layout */
.center-layout {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    text-align: center;
    padding: 2rem;
}
```

## Hybrid Grid + Flexbox Layouts

### Advanced Layout Combinations

```css
/* Page layout using both Grid and Flexbox */
.page-container {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}

.page-header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #34495e;
    color: white;
}

.page-sidebar {
    grid-area: sidebar;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    background: #ecf0f1;
}

.page-main {
    grid-area: main;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 2rem;
}

.page-footer {
    grid-area: footer;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: #2c3e50;
    color: white;
}

/* Content sections using flexbox */
.content-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.section-content {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.content-card {
    flex: 1 1 300px;
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Mobile responsive */
@media (max-width: 768px) {
    .page-container {
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
    }
    
    .page-header {
        flex-direction: column;
        gap: 1rem;
    }
    
    .content-card {
        flex: 1 1 100%;
    }
}
```

## Custom Grid Framework

### Building a Responsive Grid System

```css
/* Custom 12-column grid system */
.container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.5rem;
}

.col {
    flex: 1;
    padding: 0 0.5rem;
    margin-bottom: 1rem;
}

/* Column width classes */
.col-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
.col-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
.col-3 { flex: 0 0 25%; max-width: 25%; }
.col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
.col-5 { flex: 0 0 41.666667%; max-width: 41.666667%; }
.col-6 { flex: 0 0 50%; max-width: 50%; }
.col-7 { flex: 0 0 58.333333%; max-width: 58.333333%; }
.col-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
.col-9 { flex: 0 0 75%; max-width: 75%; }
.col-10 { flex: 0 0 83.333333%; max-width: 83.333333%; }
.col-11 { flex: 0 0 91.666667%; max-width: 91.666667%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }

/* Responsive breakpoints */
@media (min-width: 576px) {
    .col-sm-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
    .col-sm-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
    .col-sm-3 { flex: 0 0 25%; max-width: 25%; }
    .col-sm-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
    .col-sm-6 { flex: 0 0 50%; max-width: 50%; }
    .col-sm-12 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 768px) {
    .col-md-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
    .col-md-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
    .col-md-3 { flex: 0 0 25%; max-width: 25%; }
    .col-md-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
    .col-md-6 { flex: 0 0 50%; max-width: 50%; }
    .col-md-8 { flex: 0 0 66.666667%; max-width: 66.666667%; }
    .col-md-12 { flex: 0 0 100%; max-width: 100%; }
}

@media (min-width: 992px) {
    .col-lg-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
    .col-lg-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
    .col-lg-3 { flex: 0 0 25%; max-width: 25%; }
    .col-lg-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
    .col-lg-6 { flex: 0 0 50%; max-width: 50%; }
    .col-lg-9 { flex: 0 0 75%; max-width: 75%; }
    .col-lg-12 { flex: 0 0 100%; max-width: 100%; }
}

/* Utility classes */
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.align-center { align-items: center; }
.align-start { align-items: flex-start; }
.align-end { align-items: flex-end; }

/* Example usage */
.example-layout {
    /* Header spanning full width */
    .header-row {
        background: #3498db;
        color: white;
        padding: 2rem;
    }
    
    /* Three-column layout on desktop, single column on mobile */
    .content-row {
        margin: 2rem 0;
    }
    
    .sidebar {
        background: #ecf0f1;
        padding: 1.5rem;
        border-radius: 8px;
    }
    
    .main-content {
        background: white;
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .secondary-sidebar {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 8px;
    }
}
```

### Usage Example

```html
<!-- Custom Grid Framework Usage -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <header class="header-row">
                <h1>Responsive Grid Example</h1>
            </header>
        </div>
    </div>
    
    <div class="row content-row">
        <div class="col-12 col-md-3 col-lg-2">
            <aside class="sidebar">
                <h3>Sidebar</h3>
                <p>Navigation and secondary content</p>
            </aside>
        </div>
        
        <div class="col-12 col-md-6 col-lg-8">
            <main class="main-content">
                <h2>Main Content</h2>
                <p>Primary content area that adapts to screen size</p>
            </main>
        </div>
        
        <div class="col-12 col-md-3 col-lg-2">
            <aside class="secondary-sidebar">
                <h3>Secondary</h3>
                <p>Additional information</p>
            </aside>
        </div>
    </div>
</div>
```

## Performance Optimization

### Grid System Best Practices

```css
/* Efficient grid patterns */

/* Use CSS custom properties for consistency */
:root {
    --grid-gap: 1rem;
    --grid-max-width: 1200px;
    --grid-columns: 12;
}

/* Minimize layout recalculations */
.efficient-grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
    max-width: var(--grid-max-width);
    margin: 0 auto;
    
    /* Use contain for better performance */
    contain: layout style;
}

/* Prefer transform over changing layout properties */
.animated-grid-item {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.animated-grid-item:hover {
    transform: translateY(-5px) scale(1.02);
}

/* Avoid frequent flex-basis changes */
.performance-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.performance-flex-item {
    flex: 1 1 300px; /* Fixed flex-basis for consistency */
    min-width: 0; /* Prevent overflow */
}
```

## Grid System Troubleshooting

### Common Issues and Solutions

```css
/* Fix: Grid items overflowing container */
.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    
    /* Ensure container constrains items */
    overflow: hidden;
}

.grid-item {
    /* Prevent text overflow */
    overflow-wrap: break-word;
    min-width: 0;
}

/* Fix: Uneven grid item heights in flexbox */
.equal-height-flex {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.flex-item {
    flex: 1 1 300px;
    display: flex; /* Make item a flex container */
    flex-direction: column;
}

.flex-item-content {
    flex: 1; /* Content area grows to fill available space */
}

.flex-item-footer {
    margin-top: auto; /* Push footer to bottom */
}

/* Fix: Grid gaps on mobile */
@media (max-width: 480px) {
    .mobile-optimized-grid {
        gap: 0.5rem; /* Smaller gaps on mobile */
        padding: 0.5rem; /* Account for container padding */
    }
}

/* Fix: Nested grid issues */
.parent-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.nested-grid {
    display: grid;
    grid-template-columns: subgrid; /* Use subgrid when supported */
    gap: 1rem;
}

/* Fallback for browsers without subgrid */
@supports not (grid-template-columns: subgrid) {
    .nested-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```