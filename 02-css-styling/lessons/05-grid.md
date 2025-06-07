# CSS Grid Layout

## Introduction

CSS Grid is a powerful 2-dimensional layout system that allows you to create complex layouts with rows and columns.

## Basic Grid Setup

```css
.container {
    display: grid;
    grid-template-columns: 200px 200px 200px; /* 3 columns of 200px */
    grid-template-rows: 100px 100px; /* 2 rows of 100px */
    gap: 10px; /* Space between grid items */
}
```

## Grid Template Columns & Rows

### Fixed Sizes
```css
.grid {
    grid-template-columns: 100px 200px 150px;
    grid-template-rows: 50px 100px;
}
```

### Flexible Units (fr)
```css
.grid {
    grid-template-columns: 1fr 2fr 1fr; /* Second column is twice as wide */
    grid-template-rows: 100px 1fr; /* Second row takes remaining space */
}
```

### repeat() Function
```css
.grid {
    grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Responsive */
}
```

### minmax() Function
```css
.grid {
    grid-template-columns: minmax(200px, 1fr) 200px;
    grid-template-rows: minmax(100px, auto);
}
```

## Grid Lines and Areas

### Line-based Placement
```css
.item1 {
    grid-column-start: 1;
    grid-column-end: 3; /* Spans 2 columns */
    grid-row-start: 1;
    grid-row-end: 2;
}

/* Shorthand */
.item2 {
    grid-column: 1 / 3; /* From line 1 to line 3 */
    grid-row: 2 / 4; /* From line 2 to line 4 */
}

/* Span notation */
.item3 {
    grid-column: 1 / span 2; /* Start at line 1, span 2 columns */
    grid-row: span 2; /* Span 2 rows from auto-placed start */
}
```

### Named Grid Areas
```css
.container {
    display: grid;
    grid-template-areas: 
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-columns: 200px 1fr 1fr;
    grid-template-rows: 80px 1fr 60px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Alignment Properties

### Justify Items (Horizontal)
```css
.container {
    justify-items: start;    /* Default */
    justify-items: center;   /* Center items horizontally */
    justify-items: end;      /* Align to end */
    justify-items: stretch;  /* Fill the cell */
}
```

### Align Items (Vertical)
```css
.container {
    align-items: start;      /* Default */
    align-items: center;     /* Center items vertically */
    align-items: end;        /* Align to bottom */
    align-items: stretch;    /* Fill the cell height */
}
```

### Justify Content (Grid Container)
```css
.container {
    justify-content: start;         /* Default */
    justify-content: center;        /* Center entire grid */
    justify-content: space-between; /* Space between tracks */
    justify-content: space-around;  /* Space around tracks */
    justify-content: space-evenly;  /* Equal space everywhere */
}
```

## Responsive Grid Patterns

### Auto-fit with minmax
```css
.responsive-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}
```

### Auto-fill vs Auto-fit
```css
/* Creates empty columns if space available */
.auto-fill {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Stretches existing columns to fill space */
.auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

## Common Layout Patterns

### Holy Grail Layout
```css
.holy-grail {
    display: grid;
    grid-template-areas:
        "header header header"
        "nav main aside"
        "footer footer footer";
    grid-template-columns: 200px 1fr 200px;
    grid-template-rows: auto 1fr auto;
    min-height: 100vh;
}
```

### Card Grid
```css
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem;
}

.card {
    background: white;
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### Masonry-like Layout
```css
.masonry {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-auto-rows: 10px; /* Small row height for flexibility */
    gap: 15px;
}

.masonry-item {
    grid-row-end: span var(--row-span); /* Set via JavaScript */
}
```

## Grid vs Flexbox

### When to Use Grid
- 2-dimensional layouts (rows AND columns)
- Complex layouts with overlapping content
- When you need precise control over both axes
- Layout-first approach

### When to Use Flexbox
- 1-dimensional layouts (row OR column)
- Component-level layouts
- Content-first approach
- Simple alignment tasks

## Practical Example: Dashboard Layout

```html
<div class="dashboard">
    <header class="header">Dashboard Header</header>
    <nav class="sidebar">Navigation</nav>
    <main class="main">
        <div class="card">Analytics</div>
        <div class="card">Sales</div>
        <div class="card">Users</div>
        <div class="card wide">Chart</div>
    </main>
    <footer class="footer">Footer</footer>
</div>
```

```css
.dashboard {
    display: grid;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr 40px;
    height: 100vh;
}

.main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
    padding: 1rem;
}

.card.wide {
    grid-column: 1 / -1; /* Span all columns */
}

/* Responsive */
@media (max-width: 768px) {
    .dashboard {
        grid-template-areas:
            "header"
            "main"
            "sidebar"
            "footer";
        grid-template-columns: 1fr;
        grid-template-rows: 60px 1fr auto 40px;
    }
}
```

## Exercise

Create a photo gallery using CSS Grid:
1. Responsive grid that adjusts to screen size
2. Featured images that span multiple columns
3. Proper spacing and alignment
4. Mobile-friendly layout
