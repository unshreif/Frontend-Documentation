# Semantic HTML - Building Meaningful Web Content

## What is Semantic HTML?

Semantic HTML uses elements that carry meaning about the content they contain, rather than just defining appearance. These elements describe the purpose and structure of content.

### Benefits of Semantic HTML:
- **Accessibility**: Screen readers can better navigate content
- **SEO**: Search engines understand page structure better
- **Maintainability**: Code is easier to read and maintain
- **Future-proofing**: Works better with new technologies

## Document Structure Elements

### Header Element
```html
<!-- Page header -->
<header>
    <h1>Company Name</h1>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
    </nav>
</header>

<!-- Article header -->
<article>
    <header>
        <h1>Article Title</h1>
        <p>By John Doe</p>
        <time datetime="2023-12-07">December 7, 2023</time>
    </header>
    <p>Article content goes here...</p>
</article>
```

### Main Content Element
```html
<!-- Every page should have exactly one main element -->
<main>
    <h1>Page Title</h1>
    
    <section>
        <h2>Introduction</h2>
        <p>Welcome to our comprehensive guide...</p>
    </section>
    
    <section>
        <h2>Key Features</h2>
        <p>Here are the main features...</p>
    </section>
</main>
```

### Navigation Elements
```html
<!-- Primary navigation -->
<nav aria-label="Primary navigation">
    <ul>
        <li><a href="/" aria-current="page">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li><a href="/about">About</a></li>
    </ul>
</nav>

<!-- Breadcrumb navigation -->
<nav aria-label="Breadcrumb">
    <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/category">Category</a></li>
        <li aria-current="page">Current Page</li>
    </ol>
</nav>
```

## Content Sectioning Elements

### Section Element
```html
<!-- Good use of section -->
<main>
    <h1>Web Development Guide</h1>
    
    <section>
        <h2>HTML Basics</h2>
        <p>HTML is the foundation of web development...</p>
        
        <section>
            <h3>Document Structure</h3>
            <p>Every HTML document should have...</p>
        </section>
    </section>
    
    <section>
        <h2>CSS Fundamentals</h2>
        <p>CSS controls the visual presentation...</p>
    </section>
</main>

<!-- Bad: Section without heading -->
<section>
    <p>This section has no heading</p> <!-- Should have h2, h3, etc. -->
</section>

<!-- Use div for styling containers -->
<div class="container">
    <p>This is just styled content</p>
</div>
```

### Article Element
```html
<!-- Blog post article -->
<article>
    <header>
        <h1>10 Tips for Better Web Design</h1>
        <p>By <a href="/authors/jane-doe">Jane Doe</a>
           on <time datetime="2023-12-07">December 7, 2023</time></p>
    </header>
    
    <p>Great web design combines aesthetics with functionality...</p>
    
    <section>
        <h2>1. Keep It Simple</h2>
        <p>Simplicity is key to effective design...</p>
    </section>
    
    <footer>
        <p>Tags: 
            <a href="/tags/design" rel="tag">Design</a>,
            <a href="/tags/tips" rel="tag">Tips</a>
        </p>
    </footer>
</article>
```

### Aside Element
```html
<!-- Sidebar with related content -->
<main>
    <article>
        <h1>Introduction to Web Development</h1>
        <p>Web development is the process of creating websites...</p>
    </article>
    
    <aside>
        <h2>Related Articles</h2>
        <ul>
            <li><a href="/html-basics">HTML Basics</a></li>
            <li><a href="/css-fundamentals">CSS Fundamentals</a></li>
        </ul>
    </aside>
</main>
```

### Footer Element
```html
<!-- Site footer -->
<footer>
    <section>
        <h3>Quick Links</h3>
        <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
    </section>
    
    <p>&copy; 2023 Company Name. All rights reserved.</p>
</footer>

<!-- Article footer -->
<article>
    <h1>How to Build Better Websites</h1>
    <p>Building great websites requires attention to detail...</p>
    
    <footer>
        <p>Originally published in <cite>Web Design Magazine</cite></p>
        <div>
            <a href="/share/twitter">Share on Twitter</a>
            <a href="/share/facebook">Share on Facebook</a>
        </div>
    </footer>
</article>
```

## Best Practices

### Semantic vs Non-Semantic Examples
```html
<!-- Non-semantic approach (bad) -->
<div class="header">
    <div class="nav">
        <div class="nav-item">Home</div>
    </div>
</div>
<div class="main-content">
    <div class="article">
        <div class="title">Article Title</div>
    </div>
</div>

<!-- Semantic approach (good) -->
<header>
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
        </ul>
    </nav>
</header>
<main>
    <article>
        <h1>Article Title</h1>
    </article>
</main>
```

### When to Use Which Element
- **article**: For standalone content (blog posts, products, comments)
- **section**: For thematic groupings with headings
- **aside**: For tangentially related content (sidebars, callouts)
- **div**: For styling/layout purposes only
- **header/footer**: For introductory/concluding content

This lesson teaches students to write meaningful, accessible, and SEO-friendly HTML using proper semantic elements.
