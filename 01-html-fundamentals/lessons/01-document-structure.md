# HTML Document Structure - Complete Guide

## What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of web documents using a system of tags and attributes.

### Key Concepts:
- **Elements**: Building blocks of HTML (e.g., `<p>`, `<h1>`, `<div>`)
- **Tags**: Markup that defines elements (opening `<tag>` and closing `</tag>`)
- **Attributes**: Additional information about elements (e.g., `class="example"`)
- **Content**: Text and other elements between opening and closing tags

## The HTML5 Document Template

### Complete Basic Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="A brief description of your page content">
    <title>Your Page Title - Keep it under 60 characters</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Welcome to My Website</h1>
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <section>
            <h2>About This Page</h2>
            <p>This is where your main content goes.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
    </footer>
</body>
</html>
```

## DOCTYPE Declaration

The DOCTYPE declaration tells the browser which version of HTML the document uses. Always use the HTML5 DOCTYPE:

```html
<!DOCTYPE html>
```

### Why DOCTYPE Matters:
- **Standards Mode**: Ensures modern CSS and JavaScript work correctly
- **Consistency**: Same rendering across different browsers
- **Validation**: Allows HTML validators to check your code

## The HTML Element

```html
<html lang="en">
    <!-- All page content goes here -->
</html>
```

### Language Attributes:
- **`lang="en"`**: Tells browsers and screen readers the page language
- **SEO Benefits**: Search engines use language info for better indexing
- **Accessibility**: Screen readers pronounce content correctly

## The Head Section

### Essential Meta Tags
```html
<head>
    <!-- Character encoding - MUST be first -->
    <meta charset="UTF-8">
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Page description for search engines -->
    <meta name="description" content="Learn HTML fundamentals with comprehensive tutorials and examples.">
    
    <!-- Page title -->
    <title>HTML Fundamentals: Complete Beginner's Guide</title>
    
    <!-- CSS stylesheet -->
    <link rel="stylesheet" href="styles.css">
</head>
```

### Title Element Best Practices
```html
<!-- Good title examples -->
<title>Contact Us | ABC Company</title>
<title>iPhone 15 Pro Review: Features, Price, Specs | TechReview</title>

<!-- Keep under 60 characters for search results -->
<!-- Include primary keyword near the beginning -->
<!-- Make each page title unique -->
```

## The Body Section

```html
<body>
    <!-- Site header -->
    <header>
        <h1>Your Website</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- Main content area -->
    <main>
        <h1>Welcome to Our Website</h1>
        
        <section>
            <h2>About Our Company</h2>
            <p>We are a leading provider of innovative solutions...</p>
        </section>
    </main>
    
    <!-- Site footer -->
    <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
    </footer>
</body>
```

## Document Validation

### Valid HTML5 Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valid HTML5 Document</title>
</head>
<body>
    <header>
        <h1>Page Title</h1>
    </header>
    
    <main>
        <section>
            <h2>Section Title</h2>
            <p>This is a paragraph with <strong>bold text</strong>.</p>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Example Company</p>
    </footer>
</body>
</html>
```

### Common Validation Errors to Avoid
```html
<!-- Missing closing tags -->
<p>This paragraph is missing its closing tag

<!-- Improperly nested elements -->
<p><strong>This is <em>improperly</strong> nested</em></p>
<!-- Should be: -->
<p><strong>This is <em>properly</em> nested</strong></p>

<!-- Missing required attributes -->
<img src="image.jpg">  <!-- Missing alt attribute -->
<!-- Should be: -->
<img src="image.jpg" alt="Description of image">
```

This lesson provides the foundation for understanding HTML document structure and best practices for creating valid, accessible web pages.
