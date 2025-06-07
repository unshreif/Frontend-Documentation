# Browser Developer Tools Guide

Master the essential tools for front-end development and debugging.

## 🔧 Chrome DevTools

### Elements Panel
```
Inspect and modify HTML/CSS in real-time
- Edit HTML directly
- Modify CSS properties
- Computed styles analysis
- Box model visualization
```

#### Key Features
- **Element Selection**: Click elements or use Ctrl+Shift+C
- **Edit HTML**: Double-click to edit, right-click for options
- **CSS Editing**: Click values to edit, checkbox to toggle
- **Styles**: See cascaded styles and specificity
- **Computed**: Final computed values for all properties

#### Pro Tips
```javascript
// Console shortcuts for selected element
$0 // Currently selected element
$1 // Previously selected element
$_ // Result of last console expression

// Element utilities
dir($0) // Show element properties
copy($0) // Copy element to clipboard
```

### Console Panel
```javascript
// Logging levels
console.log("General information");
console.info("Informational message");
console.warn("Warning message");
console.error("Error message");

// Grouping logs
console.group("User Details");
console.log("Name: John");
console.log("Age: 30");
console.groupEnd();

// Timing
console.time("fetch-data");
// ... some operation
console.timeEnd("fetch-data");

// Table format
const users = [{name: "John", age: 30}, {name: "Jane", age: 25}];
console.table(users);

// Assert conditions
console.assert(1 === 2, "Math is broken!");
```

### Network Panel
Monitor all network requests and responses:

#### Key Metrics
- **Size**: Download size vs transferred size
- **Time**: Response time breakdown
- **Status**: HTTP status codes
- **Type**: Resource type (XHR, JS, CSS, IMG)

#### Filtering Options
```
Filter by:
- Resource type (JS, CSS, IMG, XHR, etc.)
- Status codes
- Domain
- Custom filters
```

#### Performance Analysis
- Waterfall view for request timing
- Response headers and preview
- Security tab for HTTPS details
- Cookies and cache information

### Performance Panel
Profile runtime performance:

#### Recording Performance
1. Click record button
2. Interact with your page
3. Stop recording
4. Analyze the results

#### Key Metrics
- **FPS**: Frames per second
- **CPU**: JavaScript execution time
- **Network**: Request timeline
- **Screenshots**: Visual progress

### Application Panel
Manage storage and application data:

#### Storage Types
- **Local Storage**: Persistent key-value storage
- **Session Storage**: Session-specific storage
- **IndexedDB**: Client-side database
- **Cookies**: HTTP cookies
- **Cache Storage**: Service worker caches

#### Service Workers
- Registration status
- Update on reload
- Push notifications
- Background sync

## 🦊 Firefox Developer Tools

### Unique Features

#### CSS Grid Inspector
```css
.container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
}
```
- Visual grid overlay
- Line numbers and names
- Grid track sizing

#### Flexbox Inspector
```css
.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```
- Flex container and item highlighting
- Flex properties visualization

#### Font Panel
- Font family detection
- Font file sources
- Font-face declarations

## 📱 Mobile Testing

### Chrome Device Mode
```
Toggle device toolbar: Ctrl+Shift+M (Windows) / Cmd+Shift+M (Mac)
```

#### Features
- Device presets (iPhone, iPad, Galaxy, etc.)
- Custom viewport sizes
- Network throttling
- Geolocation simulation
- Device orientation

#### Touch Simulation
```javascript
// Test touch events
element.addEventListener('touchstart', handler);
element.addEventListener('touchmove', handler);
element.addEventListener('touchend', handler);
```

### Responsive Design Testing
```css
/* Test these breakpoints */
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 1024px) { /* Small desktop */ }
@media (min-width: 1200px) { /* Large desktop */ }
```

## 🔍 Debugging Techniques

### JavaScript Debugging
```javascript
// Breakpoints in code
debugger; // Execution will pause here

// Conditional breakpoints
if (user.id === 123) {
    debugger; // Only pause for specific user
}

// Console debugging
console.trace(); // Show call stack
console.count('function-calls'); // Count function calls
console.profile('myProfile'); // Start CPU profiling
```

### CSS Debugging
```css
/* Debug borders */
* { border: 1px solid red !important; }

/* Debug box model */
* { box-sizing: border-box; }

/* Debug z-index */
.debug-z-index * {
    background: rgba(255,0,0,0.2);
    outline: 1px solid red;
}
```

### Network Debugging
```javascript
// Simulate network conditions
// DevTools > Network > Throttling

// Monitor fetch requests
const originalFetch = window.fetch;
window.fetch = function(...args) {
    console.log('Fetch called with:', args);
    return originalFetch.apply(this, args);
};
```

## 🛠️ Useful Extensions

### Development Extensions
- **React Developer Tools**: Component inspection
- **Redux DevTools**: State management debugging
- **Vue.js DevTools**: Vue component debugging
- **Lighthouse**: Performance and accessibility auditing

### Testing Extensions
- **WAVE**: Accessibility evaluation
- **axe DevTools**: Accessibility testing
- **ColorZilla**: Color picker and analyzer
- **WhatFont**: Font identification

## 📊 Performance Analysis

### Core Web Vitals
```javascript
// Largest Contentful Paint (LCP)
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('LCP:', entry.startTime);
    }
}).observe({entryTypes: ['largest-contentful-paint']});

// First Input Delay (FID)
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        console.log('FID:', entry.processingStart - entry.startTime);
    }
}).observe({entryTypes: ['first-input']});

// Cumulative Layout Shift (CLS)
new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
            console.log('CLS:', entry.value);
        }
    }
}).observe({entryTypes: ['layout-shift']});
```

### Memory Analysis
```javascript
// Monitor memory usage
console.log(performance.memory);

// Heap snapshots in DevTools
// Memory > Take heap snapshot
// Compare snapshots to find memory leaks
```

## 🎯 Best Practices

### Daily Workflow
1. **Always test in multiple browsers**
2. **Use mobile-first approach**
3. **Profile performance regularly**
4. **Check accessibility compliance**
5. **Validate HTML/CSS**
6. **Monitor network usage**

### Debugging Checklist
- [ ] Check console for errors
- [ ] Validate HTML markup
- [ ] Test responsive design
- [ ] Verify accessibility
- [ ] Check performance metrics
- [ ] Test user interactions
- [ ] Validate forms and inputs

### Performance Checklist
- [ ] Optimize images (WebP, lazy loading)
- [ ] Minify CSS/JavaScript
- [ ] Use HTTP/2 and compression
- [ ] Implement caching strategies
- [ ] Reduce HTTP requests
- [ ] Optimize fonts and assets
