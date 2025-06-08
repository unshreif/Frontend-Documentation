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

# Flexible Grid Systems & Modern Layouts

## Modern CSS Grid Fundamentals

CSS Grid provides powerful two-dimensional layout capabilities that revolutionize how we create responsive grid systems. Unlike traditional float-based or flexbox grids, CSS Grid offers precise control over both rows and columns.

### CSS Grid Basics

```css
/* Basic grid container setup */
.grid-container {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-gap: 1rem;
    padding: 1rem;
}

/* Responsive grid items */
.grid-item {
    grid-column: span 12; /* Full width on mobile */
    background: white;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

/* Tablet layouts */
@media (min-width: 768px) {
    .grid-item {
        grid-column: span 6; /* Half width on tablet */
    }
    
    .grid-item.featured {
        grid-column: span 12; /* Featured items full width */
    }
    
    .grid-item.quarter {
        grid-column: span 3; /* Quarter width for small items */
    }
}

/* Desktop layouts */
@media (min-width: 1024px) {
    .grid-container {
        grid-template-columns: repeat(12, 1fr);
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .grid-item {
        grid-column: span 4; /* Third width on desktop */
    }
    
    .grid-item.featured {
        grid-column: span 8; /* Featured items 2/3 width */
    }
    
    .grid-item.sidebar {
        grid-column: span 4; /* Sidebar 1/3 width */
    }
}
```

### Advanced Grid Layouts

```css
/* Complex magazine-style layout */
.magazine-grid {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(4, minmax(200px, auto));
    gap: 1rem;
    padding: 1rem;
}

/* Mobile: Stack all items */
.magazine-grid .article {
    grid-column: 1 / -1;
    grid-row: auto;
}

/* Tablet: Two-column layout */
@media (min-width: 768px) {
    .magazine-grid {
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(3, minmax(250px, auto));
    }
    
    .article-hero {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
    }
    
    .article-secondary {
        grid-column: 3 / 5;
        grid-row: 1 / 2;
    }
    
    .article-tertiary {
        grid-column: 3 / 5;
        grid-row: 2 / 3;
    }
    
    .article-small {
        grid-column: span 2;
        grid-row: 3 / 4;
    }
}

/* Desktop: Full magazine layout */
@media (min-width: 1024px) {
    .magazine-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, minmax(200px, auto));
    }
    
    .article-hero {
        grid-column: 1 / 4;
        grid-row: 1 / 3;
    }
    
    .article-secondary {
        grid-column: 4 / 7;
        grid-row: 1 / 2;
    }
    
    .article-tertiary {
        grid-column: 4 / 6;
        grid-row: 2 / 3;
    }
    
    .article-sidebar {
        grid-column: 6 / 7;
        grid-row: 2 / 4;
    }
    
    .article-small {
        grid-column: span 2;
        grid-row: 3 / 4;
    }
}
```

## Flexbox for Responsive Components

### Flexible Navigation Systems

```css
/* Mobile-first navigation */
.navigation {
    display: flex;
    flex-direction: column;
    background: #2c3e50;
    position: fixed;
    top: 0;
    left: -100%;
    width: 80%;
    height: 100vh;
    padding: 2rem 0;
    transition: left 0.3s ease;
    z-index: 1000;
}

.navigation.active {
    left: 0;
}

.nav-item {
    flex: none;
    padding: 1rem 2rem;
    color: white;
    text-decoration: none;
    border-bottom: 1px solid #34495e;
    transition: background-color 0.3s ease;
}

.nav-item:hover {
    background-color: #34495e;
}

/* Tablet: Horizontal navigation */
@media (min-width: 768px) {
    .navigation {
        position: static;
        flex-direction: row;
        width: auto;
        height: auto;
        background: transparent;
        padding: 0;
    }
    
    .nav-item {
        flex: 1;
        text-align: center;
        border-bottom: none;
        border-right: 1px solid #34495e;
        padding: 1rem;
    }
    
    .nav-item:last-child {
        border-right: none;
    }
}

/* Desktop: Spaced navigation with dropdowns */
@media (min-width: 1024px) {
    .navigation {
        justify-content: space-between;
        align-items: center;
    }
    
    .nav-item {
        flex: none;
        position: relative;
        border: none;
        margin: 0 1rem;
    }
    
    .nav-item:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        min-width: 200px;
        background: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 4px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
    }
}
```

### Responsive Card Layouts

```css
/* Flexible card container */
.card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem;
}

/* Mobile: Full-width cards */
.card {
    flex: 1 1 100%;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-content {
    padding: 1.5rem;
}

.card-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    color: #2c3e50;
}

.card-description {
    color: #7f8c8d;
    line-height: 1.6;
    margin-bottom: 1rem;
}

.card-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.card-button {
    flex: 1;
    padding: 0.75rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.card-button:hover {
    background: #2980b9;
}

/* Tablet: Two cards per row */
@media (min-width: 768px) {
    .card {
        flex: 1 1 calc(50% - 0.5rem);
    }
    
    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }
    
    .card-actions {
        flex-wrap: nowrap;
    }
    
    .card-button {
        flex: none;
        min-width: 100px;
    }
}

/* Desktop: Three cards per row */
@media (min-width: 1024px) {
    .card {
        flex: 1 1 calc(33.333% - 0.67rem);
    }
    
    .card-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
}

/* Large screens: Four cards per row */
@media (min-width: 1400px) {
    .card {
        flex: 1 1 calc(25% - 0.75rem);
    }
}
```

## Hybrid Grid + Flexbox Layouts

### Dashboard Layout System

```css
/* Main dashboard container */
.dashboard {
    display: grid;
    min-height: 100vh;
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    gap: 0;
}

/* Header area */
.dashboard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    background: #2c3e50;
    color: white;
    position: sticky;
    top: 0;
    z-index: 100;
}

.dashboard-title {
    font-size: 1.25rem;
    font-weight: 600;
}

.dashboard-user {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Main content area */
.dashboard-main {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
    overflow: auto;
}

/* Sidebar navigation (hidden on mobile) */
.dashboard-sidebar {
    display: none;
}

/* Footer */
.dashboard-footer {
    padding: 1rem;
    background: #ecf0f1;
    text-align: center;
    color: #7f8c8d;
}

/* Widget grid within main content */
.widget-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.widget {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.widget-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #ecf0f1;
}

.widget-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #2c3e50;
}

.widget-actions {
    display: flex;
    gap: 0.5rem;
}

/* Tablet layout */
@media (min-width: 768px) {
    .dashboard {
        grid-template-columns: auto 1fr;
        grid-template-areas:
            "sidebar header"
            "sidebar main"
            "sidebar footer";
    }
    
    .dashboard-header {
        grid-area: header;
    }
    
    .dashboard-main {
        grid-area: main;
        grid-template-columns: repeat(2, 1fr);
    }
    
    .dashboard-sidebar {
        grid-area: sidebar;
        display: flex;
        flex-direction: column;
        width: 250px;
        background: #34495e;
        padding: 1rem 0;
    }
    
    .dashboard-footer {
        grid-area: footer;
    }
    
    .sidebar-nav {
        display: flex;
        flex-direction: column;
    }
    
    .sidebar-item {
        padding: 1rem 1.5rem;
        color: #bdc3c7;
        text-decoration: none;
        transition: background-color 0.3s ease;
    }
    
    .sidebar-item:hover,
    .sidebar-item.active {
        background-color: #2c3e50;
        color: white;
    }
    
    .widget-grid {
        display: contents; /* Let widgets participate in parent grid */
    }
    
    .widget.full-width {
        grid-column: 1 / -1;
    }
}

/* Desktop layout */
@media (min-width: 1024px) {
    .dashboard-main {
        grid-template-columns: repeat(3, 1fr);
        padding: 2rem;
    }
    
    .widget.half-width {
        grid-column: span 2;
    }
    
    .widget.third-width {
        grid-column: span 1;
    }
    
    .widget.full-width {
        grid-column: 1 / -1;
    }
}

/* Large desktop */
@media (min-width: 1400px) {
    .dashboard-main {
        grid-template-columns: repeat(4, 1fr);
    }
    
    .widget.quarter-width {
        grid-column: span 1;
    }
    
    .widget.half-width {
        grid-column: span 2;
    }
    
    .widget.three-quarter-width {
        grid-column: span 3;
    }
}
```

### Responsive Form Layouts

```css
/* Form container */
.form-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.form-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
}

/* Form field groups */
.field-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field-label {
    font-weight: 600;
    color: #2c3e50;
}

.field-input {
    padding: 0.75rem;
    border: 1px solid #bdc3c7;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.field-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.field-error {
    color: #e74c3c;
    font-size: 0.875rem;
}

/* Multi-column layouts for larger screens */
@media (min-width: 768px) {
    .form-container {
        max-width: 800px;
        padding: 3rem;
    }
    
    .form-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }
    
    .field-group.full-width {
        grid-column: 1 / -1;
    }
    
    .field-group.half-width {
        grid-column: span 1;
    }
    
    /* Inline field groups */
    .field-group.inline {
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }
    
    .field-group.inline .field-label {
        flex: none;
        min-width: 120px;
    }
    
    .field-group.inline .field-input {
        flex: 1;
    }
}

/* Form action buttons */
.form-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid #ecf0f1;
    flex-wrap: wrap;
}

.form-button {
    padding: 0.75rem 2rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 120px;
}

.form-button.primary {
    background: #3498db;
    color: white;
}

.form-button.primary:hover {
    background: #2980b9;
}

.form-button.secondary {
    background: #ecf0f1;
    color: #2c3e50;
}

.form-button.secondary:hover {
    background: #d5dbdb;
}

@media (min-width: 768px) {
    .form-actions {
        flex-wrap: nowrap;
        justify-content: flex-end;
    }
    
    .form-button {
        flex: none;
    }
}
```

## Custom Grid Framework

### CSS Custom Properties Grid System

```css
/* CSS Grid Framework with Custom Properties */
:root {
    --grid-columns: 12;
    --grid-gap: 1rem;
    --grid-max-width: 1200px;
    --grid-padding: 1rem;
}

/* Container */
.container {
    width: 100%;
    max-width: var(--grid-max-width);
    margin: 0 auto;
    padding: 0 var(--grid-padding);
}

.container-fluid {
    width: 100%;
    padding: 0 var(--grid-padding);
}

/* Grid system */
.row {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
    width: 100%;
}

/* Column classes */
.col {
    grid-column: 1 / -1; /* Full width by default */
}

/* Generate column classes */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Responsive column classes */
@media (min-width: 576px) {
    .col-sm-1 { grid-column: span 1; }
    .col-sm-2 { grid-column: span 2; }
    .col-sm-3 { grid-column: span 3; }
    .col-sm-4 { grid-column: span 4; }
    .col-sm-5 { grid-column: span 5; }
    .col-sm-6 { grid-column: span 6; }
    .col-sm-7 { grid-column: span 7; }
    .col-sm-8 { grid-column: span 8; }
    .col-sm-9 { grid-column: span 9; }
    .col-sm-10 { grid-column: span 10; }
    .col-sm-11 { grid-column: span 11; }
    .col-sm-12 { grid-column: span 12; }
}

@media (min-width: 768px) {
    .col-md-1 { grid-column: span 1; }
    .col-md-2 { grid-column: span 2; }
    .col-md-3 { grid-column: span 3; }
    .col-md-4 { grid-column: span 4; }
    .col-md-5 { grid-column: span 5; }
    .col-md-6 { grid-column: span 6; }
    .col-md-7 { grid-column: span 7; }
    .col-md-8 { grid-column: span 8; }
    .col-md-9 { grid-column: span 9; }
    .col-md-10 { grid-column: span 10; }
    .col-md-11 { grid-column: span 11; }
    .col-md-12 { grid-column: span 12; }
}

@media (min-width: 992px) {
    .col-lg-1 { grid-column: span 1; }
    .col-lg-2 { grid-column: span 2; }
    .col-lg-3 { grid-column: span 3; }
    .col-lg-4 { grid-column: span 4; }
    .col-lg-5 { grid-column: span 5; }
    .col-lg-6 { grid-column: span 6; }
    .col-lg-7 { grid-column: span 7; }
    .col-lg-8 { grid-column: span 8; }
    .col-lg-9 { grid-column: span 9; }
    .col-lg-10 { grid-column: span 10; }
    .col-lg-11 { grid-column: span 11; }
    .col-lg-12 { grid-column: span 12; }
}

@media (min-width: 1200px) {
    .col-xl-1 { grid-column: span 1; }
    .col-xl-2 { grid-column: span 2; }
    .col-xl-3 { grid-column: span 3; }
    .col-xl-4 { grid-column: span 4; }
    .col-xl-5 { grid-column: span 5; }
    .col-xl-6 { grid-column: span 6; }
    .col-xl-7 { grid-column: span 7; }
    .col-xl-8 { grid-column: span 8; }
    .col-xl-9 { grid-column: span 9; }
    .col-xl-10 { grid-column: span 10; }
    .col-xl-11 { grid-column: span 11; }
    .col-xl-12 { grid-column: span 12; }
}

/* Grid utilities */
.gap-0 { gap: 0; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 1rem; }
.gap-4 { gap: 1.5rem; }
.gap-5 { gap: 3rem; }

/* Alignment utilities */
.justify-start { justify-content: start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: end; }
.justify-between { justify-content: space-between; }
.justify-around { justify-content: space-around; }
.justify-evenly { justify-content: space-evenly; }

.align-start { align-content: start; }
.align-center { align-content: center; }
.align-end { align-content: end; }
.align-stretch { align-content: stretch; }

.items-start { align-items: start; }
.items-center { align-items: center; }
.items-end { align-items: end; }
.items-stretch { align-items: stretch; }
```

This comprehensive grid systems lesson provides students with modern techniques for creating flexible, responsive layouts using CSS Grid, Flexbox, and hybrid approaches.