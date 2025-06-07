# Links and Navigation

## Basic Links

```html
<!-- External link -->
<a href="https://www.example.com">Visit Example.com</a>

<!-- Internal link -->
<a href="about.html">About Us</a>

<!-- Email link -->
<a href="mailto:contact@example.com">Send Email</a>

<!-- Phone link -->
<a href="tel:+1234567890">Call Us</a>
```

## Link Attributes

```html
<!-- Open in new tab -->
<a href="https://example.com" target="_blank" rel="noopener">External Site</a>

<!-- Download link -->
<a href="document.pdf" download="my-document.pdf">Download PDF</a>

<!-- Link with title -->
<a href="page.html" title="This tooltip appears on hover">Hover me</a>
```

## Page Anchors

```html
<!-- Link to section on same page -->
<a href="#section1">Go to Section 1</a>

<!-- Target section -->
<h2 id="section1">Section 1</h2>
<p>Content of section 1...</p>
```

## Navigation Structure

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

## Breadcrumb Navigation

```html
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/category/">Category</a></li>
        <li aria-current="page">Current Page</li>
    </ol>
</nav>
```

## Accessibility Best Practices

- Use descriptive link text
- Avoid "click here" or "read more"
- Use `aria-label` for context when needed
- Ensure sufficient color contrast

```html
<!-- Bad -->
<a href="article.html">Click here</a>

<!-- Good -->
<a href="article.html">Read our article about web accessibility</a>

<!-- Context for screen readers -->
<a href="report.pdf" aria-label="Download 2023 annual report PDF">Download Report</a>
```
