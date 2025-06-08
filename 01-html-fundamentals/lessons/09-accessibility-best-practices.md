# Accessibility Best Practices in HTML

## Introduction to Web Accessibility

Web accessibility ensures that websites and applications can be used by people with disabilities. This includes users with visual, auditory, motor, or cognitive impairments.

### Why Accessibility Matters
- **Legal Requirements**: Many countries have accessibility laws (ADA, WCAG)
- **Inclusive Design**: Reach a broader audience
- **Better UX**: Accessible sites are better for everyone
- **SEO Benefits**: Search engines favor accessible content

## WCAG Guidelines Overview

The Web Content Accessibility Guidelines (WCAG) are organized around four principles:

### POUR Principles
1. **Perceivable**: Information must be presentable in ways users can perceive
2. **Operable**: Interface components must be operable
3. **Understandable**: Information and UI operation must be understandable
4. **Robust**: Content must be robust enough for various assistive technologies

## Semantic HTML for Accessibility

### Proper Heading Structure
```html
<!-- Good: Logical heading hierarchy -->
<main>
    <h1>Web Accessibility Guide</h1>
    
    <section>
        <h2>Visual Accessibility</h2>
        <h3>Color Contrast</h3>
        <p>Ensure sufficient contrast between text and background...</p>
        
        <h3>Text Size</h3>
        <p>Use relative units for scalable text...</p>
    </section>
    
    <section>
        <h2>Motor Accessibility</h2>
        <h3>Keyboard Navigation</h3>
        <p>All interactive elements must be keyboard accessible...</p>
    </section>
</main>

<!-- Bad: Skipping heading levels -->
<h1>Main Title</h1>
<h4>Subsection</h4> <!-- Should be h2 -->
```

### Landmark Elements
```html
<body>
    <header>
        <h1>Site Title</h1>
        <nav aria-label="Primary navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <h1>Page Title</h1>
        <!-- Main content -->
    </main>
    
    <aside aria-label="Related articles">
        <h2>Related Content</h2>
        <!-- Sidebar content -->
    </aside>
    
    <footer>
        <p>&copy; 2023 Company Name</p>
    </footer>
</body>
```

## Images and Alternative Text

### Writing Effective Alt Text
```html
<!-- Informative images -->
<img src="chart.png" alt="Sales increased 25% from Q1 to Q2 2023">

<!-- Decorative images -->
<img src="decoration.png" alt="" role="presentation">

<!-- Complex images with detailed descriptions -->
<figure>
    <img src="complex-chart.png" alt="Quarterly revenue chart" aria-describedby="chart-desc">
    <figcaption id="chart-desc">
        Detailed description: Q1 revenue was $2M, Q2 was $2.5M, 
        Q3 was $3M, and Q4 was $3.2M, showing consistent growth.
    </figcaption>
</figure>

<!-- Icons with meaning -->
<button>
    <img src="save-icon.png" alt="Save document">
    Save
</button>

<!-- Background images with text alternatives -->
<div class="hero-section" role="img" aria-label="Mountain landscape at sunset">
    <h1>Welcome to Nature Adventures</h1>
</div>
```

## Form Accessibility

### Labels and Form Controls
```html
<!-- Explicit labels -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email" required>

<!-- Implicit labels -->
<label>
    Phone Number
    <input type="tel" name="phone">
</label>

<!-- Multiple labels for same input -->
<fieldset>
    <legend>Personal Information</legend>
    <label for="fname" id="fname-label">First Name</label>
    <input type="text" id="fname" name="firstname" aria-labelledby="fname-label" required>
</fieldset>

<!-- Error handling -->
<label for="password">Password</label>
<input type="password" 
       id="password" 
       name="password" 
       aria-describedby="pwd-help pwd-error"
       aria-invalid="true"
       required>
<div id="pwd-help">Must be at least 8 characters</div>
<div id="pwd-error" role="alert">Password is too short</div>
```

### Radio Buttons and Checkboxes
```html
<!-- Radio button group -->
<fieldset>
    <legend>Preferred Contact Method</legend>
    <input type="radio" id="contact-email" name="contact" value="email">
    <label for="contact-email">Email</label>
    
    <input type="radio" id="contact-phone" name="contact" value="phone">
    <label for="contact-phone">Phone</label>
    
    <input type="radio" id="contact-mail" name="contact" value="mail">
    <label for="contact-mail">Mail</label>
</fieldset>

<!-- Checkbox group -->
<fieldset>
    <legend>Newsletter Preferences</legend>
    <input type="checkbox" id="news-tech" name="newsletters" value="tech">
    <label for="news-tech">Technology Updates</label>
    
    <input type="checkbox" id="news-product" name="newsletters" value="product">
    <label for="news-product">Product Announcements</label>
</fieldset>
```

## ARIA Attributes

### Essential ARIA Attributes
```html
<!-- aria-label: Provides accessible name -->
<button aria-label="Close dialog">×</button>

<!-- aria-labelledby: References element that labels current element -->
<h2 id="billing">Billing Address</h2>
<fieldset aria-labelledby="billing">
    <!-- Form fields -->
</fieldset>

<!-- aria-describedby: References element that describes current element -->
<input type="password" 
       aria-describedby="pwd-requirements">
<div id="pwd-requirements">
    Password must contain at least 8 characters
</div>

<!-- aria-expanded: Indicates if collapsible element is expanded -->
<button aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
</ul>

<!-- aria-hidden: Hides decorative content from screen readers -->
<button>
    <span aria-hidden="true">💾</span>
    Save Document
</button>
```

### Live Regions
```html
<!-- Status messages -->
<div aria-live="polite" id="status"></div>
<script>
// When status changes, screen readers announce it
document.getElementById('status').textContent = 'Document saved successfully';
</script>

<!-- Alert messages -->
<div role="alert" aria-live="assertive" id="error-message"></div>

<!-- Progress updates -->
<div aria-live="polite" aria-atomic="true" id="progress">
    <div>Upload progress: <span id="percent">25</span>% complete</div>
</div>
```

## Keyboard Navigation

### Focus Management
```html
<!-- Skip navigation links -->
<body>
    <a href="#main" class="skip-link">Skip to main content</a>
    <a href="#nav" class="skip-link">Skip to navigation</a>
    
    <nav id="nav">
        <!-- Navigation content -->
    </nav>
    
    <main id="main">
        <!-- Main content -->
    </main>
</body>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 6px;
    z-index: 1000;
    padding: 8px;
    background: #000;
    color: #fff;
    text-decoration: none;
}

.skip-link:focus {
    top: 6px;
}
</style>

<!-- Tab index management -->
<div role="tablist">
    <button role="tab" 
            aria-selected="true" 
            aria-controls="panel1" 
            id="tab1"
            tabindex="0">Tab 1</button>
    <button role="tab" 
            aria-selected="false" 
            aria-controls="panel2" 
            id="tab2"
            tabindex="-1">Tab 2</button>
</div>
```

### Focus Indicators
```html
<style>
/* Ensure visible focus indicators */
button:focus,
input:focus,
select:focus,
textarea:focus,
a:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
}

/* Custom focus styles */
.custom-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.5);
}
</style>
```

## Tables and Data

### Accessible Table Structure
```html
<table>
    <caption>
        Quarterly Sales Report 2023
        <details>
            <summary>Table Description</summary>
            <p>This table shows sales figures for each quarter, broken down by region.</p>
        </details>
    </caption>
    
    <thead>
        <tr>
            <th scope="col">Region</th>
            <th scope="col">Q1</th>
            <th scope="col">Q2</th>
            <th scope="col">Q3</th>
            <th scope="col">Q4</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <th scope="row">North</th>
            <td>$125,000</td>
            <td>$130,000</td>
            <td>$128,000</td>
            <td>$135,000</td>
        </tr>
        <tr>
            <th scope="row">South</th>
            <td>$98,000</td>
            <td>$102,000</td>
            <td>$105,000</td>
            <td>$110,000</td>
        </tr>
    </tbody>
</table>
```

## Color and Contrast

### Meeting WCAG Guidelines
```html
<!-- Ensure sufficient color contrast -->
<style>
/* Good: High contrast */
.high-contrast {
    background: #ffffff;
    color: #000000; /* 21:1 contrast ratio */
}

/* Good: Meets AA standard */
.good-contrast {
    background: #0066cc;
    color: #ffffff; /* 4.5:1 contrast ratio */
}

/* Bad: Insufficient contrast */
.poor-contrast {
    background: #cccccc;
    color: #999999; /* 2.3:1 - fails WCAG */
}
</style>

<!-- Don't rely solely on color for meaning -->
<div class="status-message">
    <span class="icon" aria-hidden="true">✓</span>
    <span class="text">Success: Document saved</span>
</div>

<div class="error-message">
    <span class="icon" aria-hidden="true">⚠</span>
    <span class="text">Error: Please check your input</span>
</div>
```

## Media Accessibility

### Video Accessibility
```html
<video controls>
    <source src="tutorial.mp4" type="video/mp4">
    
    <!-- Captions for deaf/hard of hearing -->
    <track kind="captions" 
           src="tutorial-captions.vtt" 
           srclang="en" 
           label="English Captions" 
           default>
    
    <!-- Subtitles for translation -->
    <track kind="subtitles" 
           src="tutorial-spanish.vtt" 
           srclang="es" 
           label="Spanish Subtitles">
    
    <!-- Audio descriptions for blind/visually impaired -->
    <track kind="descriptions" 
           src="tutorial-descriptions.vtt" 
           srclang="en" 
           label="Audio Descriptions">
    
    <p>Your browser doesn't support HTML5 video. 
       <a href="tutorial.mp4">Download the video</a>.</p>
</video>
```

### Audio Accessibility
```html
<audio controls>
    <source src="podcast.mp3" type="audio/mpeg">
    
    <!-- Transcript link -->
    <p><a href="podcast-transcript.html">Read transcript</a></p>
    
    <p>Your browser doesn't support HTML5 audio. 
       <a href="podcast.mp3">Download the audio</a>.</p>
</audio>

<!-- Embedded transcript -->
<details>
    <summary>Podcast Transcript</summary>
    <div>
        <p><strong>Host:</strong> Welcome to our web development podcast...</p>
        <p><strong>Guest:</strong> Thanks for having me...</p>
    </div>
</details>
```

## Testing for Accessibility

### Manual Testing Checklist
- [ ] Navigate using only keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Test with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Check color contrast ratios
- [ ] Verify all images have appropriate alt text
- [ ] Ensure forms are properly labeled
- [ ] Test responsive design at 200% zoom
- [ ] Validate HTML markup

### Automated Testing Tools
```html
<!-- Include accessibility testing in development -->
<script>
// Example: Using axe-core for automated testing
if (typeof axe !== 'undefined') {
    axe.run(function (err, results) {
        if (err) throw err;
        console.log(results.violations);
    });
}
</script>
```

## Common Accessibility Mistakes

### What to Avoid
```html
<!-- Bad: Missing alt text -->
<img src="important-chart.jpg">

<!-- Bad: Non-descriptive link text -->
<a href="report.pdf">Click here</a>

<!-- Bad: Using placeholder as label -->
<input type="email" placeholder="Email address">

<!-- Bad: Removing focus indicators -->
<style>
*:focus { outline: none; } /* Don't do this! */
</style>

<!-- Bad: Color-only error indication -->
<input type="email" style="border-color: red;">

<!-- Bad: Auto-playing media -->
<video autoplay>
    <source src="video.mp4">
</video>
```

### Best Practices Summary
1. **Use semantic HTML** - Choose elements based on meaning, not appearance
2. **Provide alternative text** for all meaningful images
3. **Ensure keyboard accessibility** - All interactive elements must be keyboard accessible
4. **Use sufficient color contrast** - Meet WCAG AA standards (4.5:1 for normal text)
5. **Label form controls** properly - Every input needs an associated label
6. **Structure content logically** - Use headings to create a clear hierarchy
7. **Test with assistive technologies** - Don't assume, verify with actual tools
8. **Write clear, simple language** - Make content understandable for all users

This comprehensive lesson covers the essential aspects of web accessibility, providing students with the knowledge to create inclusive web experiences.
