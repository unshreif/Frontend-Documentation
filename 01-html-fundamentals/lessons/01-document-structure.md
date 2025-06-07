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
    <meta name="keywords" content="html, tutorial, web development">
    <meta name="author" content="Your Name">
    <title>Your Page Title - Keep it under 60 characters</title>
    
    <!-- External CSS -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body>
    <!-- Skip navigation for accessibility -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Page header -->
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
    
    <!-- Main content area -->
    <main id="main-content">
        <section>
            <h2>About This Page</h2>
            <p>This is where your main content goes.</p>
        </section>
    </main>
    
    <!-- Page footer -->
    <footer>
        <p>&copy; 2023 Your Website. All rights reserved.</p>
    </footer>
    
    <!-- JavaScript files -->
    <script src="script.js"></script>
</body>
</html>
```

## DOCTYPE Declaration

### What is DOCTYPE?
The DOCTYPE declaration tells the browser which version of HTML the document is written in and ensures the browser renders the page in standards mode.

```html
<!-- HTML5 DOCTYPE (always use this) -->
<!DOCTYPE html>

<!-- Older DOCTYPEs (for reference only - don't use) -->
<!-- XHTML 1.0 Strict -->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" 
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<!-- HTML 4.01 Transitional -->
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" 
    "http://www.w3.org/TR/html4/loose.dtd">
```

### Why DOCTYPE Matters:
- **Standards Mode**: Ensures modern CSS and JavaScript work correctly
- **Consistency**: Same rendering across different browsers
- **Validation**: Allows HTML validators to check your code
- **Future-proofing**: HTML5 DOCTYPE works with all modern browsers

## The HTML Element

### HTML Root Element with Language
```html
<!-- Basic HTML element -->
<html lang="en">
    <!-- All page content goes here -->
</html>

<!-- Multiple languages (for multilingual sites) -->
<html lang="en">
    <head>
        <!-- Head content -->
    </head>
    <body>
        <div lang="es">
            <p>Este párrafo está en español.</p>
        </div>
        <div lang="fr">
            <p>Ce paragraphe est en français.</p>
        </div>
    </body>
</html>

<!-- Right-to-left languages -->
<html lang="ar" dir="rtl">
    <!-- Arabic content -->
</html>

<!-- Language with region -->
<html lang="en-US">  <!-- American English -->
<html lang="en-GB">  <!-- British English -->
<html lang="zh-CN">  <!-- Simplified Chinese -->
```

### Language Attributes Explained:
- **`lang="en"`**: Tells browsers and screen readers the page language
- **`dir="rtl"`**: Sets text direction (right-to-left for Arabic, Hebrew)
- **SEO Benefits**: Search engines use language info for better indexing
- **Accessibility**: Screen readers pronounce content correctly

## The Head Section

### Essential Meta Tags
```html
<head>
    <!-- Character encoding - MUST be first in head -->
    <meta charset="UTF-8">
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- IE compatibility (if needed) -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- Page description for search engines -->
    <meta name="description" content="Learn HTML fundamentals with comprehensive tutorials and examples. Perfect for beginners starting their web development journey.">
    
    <!-- Keywords for SEO (less important now) -->
    <meta name="keywords" content="HTML, tutorial, web development, beginner, markup language">
    
    <!-- Author information -->
    <meta name="author" content="Jane Smith">
    
    <!-- Robots meta tag -->
    <meta name="robots" content="index, follow">
    
    <!-- Page title -->
    <title>HTML Fundamentals: Complete Beginner's Guide | WebDev Tutorials</title>
</head>
```

### Advanced Meta Tags
```html
<head>
    <!-- ...existing meta tags... -->
    
    <!-- Open Graph for social media sharing -->
    <meta property="og:title" content="HTML Fundamentals Tutorial">
    <meta property="og:description" content="Complete guide to learning HTML from scratch">
    <meta property="og:image" content="https://example.com/tutorial-image.jpg">
    <meta property="og:url" content="https://example.com/html-tutorial">
    <meta property="og:type" content="article">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@yourwebsite">
    <meta name="twitter:title" content="HTML Fundamentals Tutorial">
    <meta name="twitter:description" content="Complete guide to learning HTML from scratch">
    <meta name="twitter:image" content="https://example.com/tutorial-image.jpg">
    
    <!-- Canonical URL (prevents duplicate content issues) -->
    <link rel="canonical" href="https://example.com/html-tutorial">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="fonts/main-font.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="critical-styles.css" as="style">
    
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdn.example.com">
</head>
```

### Title Element Best Practices
```html
<!-- Good title examples -->
<title>Contact Us | ABC Company</title>
<title>iPhone 15 Pro Review: Features, Price, Specs | TechReview</title>
<title>How to Bake Chocolate Chip Cookies - Easy Recipe | FoodBlog</title>

<!-- Bad title examples -->
<title>Page</title>  <!-- Too vague -->
<title>This is the most amazing website you will ever see with incredible content that will blow your mind</title>  <!-- Too long -->
<title>HOME</title>  <!-- Not descriptive -->

<!-- Dynamic titles (server-side) -->
<title><?php echo $pageTitle; ?> | Your Website</title>

<!-- Title length guidelines -->
<!-- Keep under 60 characters for Google search results -->
<!-- Include primary keyword near the beginning -->
<!-- Make each page title unique -->
```

### Link Elements for External Resources
```html
<head>
    <!-- ...existing meta tags... -->
    
    <!-- CSS stylesheets -->
    <link rel="stylesheet" href="styles/main.css">
    <link rel="stylesheet" href="styles/responsive.css" media="screen and (max-width: 768px)">
    <link rel="stylesheet" href="styles/print.css" media="print">
    
    <!-- External CSS (Google Fonts) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    
    <!-- Favicon and app icons -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="manifest" href="/site.webmanifest">
    
    <!-- RSS feed -->
    <link rel="alternate" type="application/rss+xml" title="Site RSS Feed" href="/feed.xml">
    
    <!-- Previous/Next pages (for pagination) -->
    <link rel="prev" href="/page/1">
    <link rel="next" href="/page/3">
</head>
```

## The Body Section

### Basic Body Structure
```html
<body>
    <!-- Skip navigation for keyboard users -->
    <a href="#main-content" class="skip-link">Skip to main content</a>
    
    <!-- Site header -->
    <header role="banner">
        <div class="container">
            <div class="logo">
                <h1><a href="/">Your Website</a></h1>
            </div>
            
            <nav role="navigation" aria-label="Primary navigation">
                <ul>
                    <li><a href="/" aria-current="page">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Main content area -->
    <main id="main-content" role="main">
        <div class="container">
            <!-- Page heading -->
            <h1>Welcome to Our Website</h1>
            
            <!-- Breadcrumb navigation -->
            <nav aria-label="Breadcrumb">
                <ol>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li aria-current="page">Our Story</li>
                </ol>
            </nav>
            
            <!-- Main content sections -->
            <section>
                <h2>About Our Company</h2>
                <p>We are a leading provider of innovative solutions...</p>
            </section>
            
            <section>
                <h2>Our Services</h2>
                <p>We offer a wide range of services including...</p>
            </section>
        </div>
    </main>
    
    <!-- Sidebar (if needed) -->
    <aside role="complementary" aria-labelledby="sidebar-heading">
        <h2 id="sidebar-heading">Related Information</h2>
        <div class="widget">
            <h3>Recent Posts</h3>
            <ul>
                <li><a href="/post/1">Understanding HTML Structure</a></li>
                <li><a href="/post/2">CSS Basics for Beginners</a></li>
            </ul>
        </div>
    </aside>
    
    <!-- Site footer -->
    <footer role="contentinfo">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                        <li><a href="/sitemap">Sitemap</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Contact Info</h3>
                    <address>
                        123 Web Street<br>
                        Internet City, IC 12345<br>
                        <a href="tel:+1234567890">+1 (234) 567-890</a><br>
                        <a href="mailto:info@example.com">info@example.com</a>
                    </address>
                </div>
            </div>
            
            <div class="copyright">
                <p>&copy; <time datetime="2023">2023</time> Your Website. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- JavaScript files (before closing body tag) -->
    <script src="js/main.js"></script>
</body>
```

## Document Validation and Best Practices

### HTML Validation
```html
<!-- Valid HTML5 example -->
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
            <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
            
            <ul>
                <li>List item 1</li>
                <li>List item 2</li>
                <li>List item 3</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2023 Example Company</p>
    </footer>
</body>
</html>

<!-- Common validation errors to avoid -->

<!-- Missing closing tags -->
<p>This paragraph is missing its closing tag

<!-- Improperly nested elements -->
<p><strong>This is <em>improperly</strong> nested</em></p>
<!-- Should be: -->
<p><strong>This is <em>properly</em> nested</strong></p>

<!-- Invalid attributes -->
<img src="image.jpg">  <!-- Missing alt attribute -->
<!-- Should be: -->
<img src="image.jpg" alt="Description of image">

<!-- Using deprecated elements -->
<center>Don't use this</center>  <!-- Use CSS instead -->
<font color="red">Deprecated</font>  <!-- Use CSS instead -->
```

### Code Organization and Comments
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Well-Organized HTML Document</title>
    
    <!-- CSS Files -->
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>
    <!-- ==========================================================================
         HEADER
         ========================================================================== -->
    <header class="site-header">
        <!-- Site branding -->
        <div class="branding">
            <h1 class="site-title">
                <a href="/">Company Name</a>
            </h1>
        </div>
        
        <!-- Primary navigation -->
        <nav class="primary-nav">
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="/" class="nav-link">Home</a>
                </li>
                <li class="nav-item">
                    <a href="/about" class="nav-link">About</a>
                </li>
                <!-- More navigation items -->
            </ul>
        </nav>
    </header>
    
    <!-- ==========================================================================
         MAIN CONTENT
         ========================================================================== -->
    <main class="main-content">
        <!-- Hero section -->
        <section class="hero">
            <div class="container">
                <h1 class="hero-title">Welcome to Our Website</h1>
                <p class="hero-subtitle">Discover amazing content and services</p>
                <a href="/get-started" class="cta-button">Get Started</a>
            </div>
        </section>
        
        <!-- Features section -->
        <section class="features">
            <div class="container">
                <h2 class="section-title">Our Features</h2>
                
                <div class="features-grid">
                    <!-- Feature 1 -->
                    <div class="feature">
                        <h3 class="feature-title">Feature One</h3>
                        <p class="feature-description">
                            Description of the first feature and its benefits.
                        </p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="feature">
                        <h3 class="feature-title">Feature Two</h3>
                        <p class="feature-description">
                            Description of the second feature and its benefits.
                        </p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="feature">
                        <h3 class="feature-title">Feature Three</h3>
                        <p class="feature-description">
                            Description of the third feature and its benefits.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <!-- ==========================================================================
         FOOTER
         ========================================================================== -->
    <footer class="site-footer">
        <div class="container">
            <!-- Footer content -->
            <div class="footer-content">
                <p>&copy; 2023 Company Name. All rights reserved.</p>
            </div>
        </div>
    </footer>
    
    <!-- ==========================================================================
         JAVASCRIPT
         ========================================================================== -->
    <!-- External JavaScript libraries -->
    <script src="js/vendor/jquery.min.js"></script>
    
    <!-- Custom JavaScript -->
    <script src="js/main.js"></script>
    
    <!-- Analytics (if needed) -->
    <!-- <script>
        // Analytics code here
    </script> -->
</body>
</html>
```

## Common Document Patterns

### Blog Post Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn how to structure HTML documents properly with this comprehensive guide covering all essential elements.">
    <title>How to Structure HTML Documents | Web Development Blog</title>
    
    <!-- JSON-LD structured data for blog post -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "How to Structure HTML Documents",
        "author": {
            "@type": "Person",
            "name": "Jane Smith"
        },
        "datePublished": "2023-12-07",
        "dateModified": "2023-12-07",
        "description": "Learn how to structure HTML documents properly"
    }
    </script>
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/blog">Blog</a>
            <a href="/about">About</a>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h1>How to Structure HTML Documents</h1>
                <div class="post-meta">
                    <address class="author">
                        By <a rel="author" href="/authors/jane-smith">Jane Smith</a>
                    </address>
                    <time datetime="2023-12-07" pubdate>December 7, 2023</time>
                    <span class="reading-time">8 min read</span>
                </div>
            </header>
            
            <div class="post-content">
                <p class="lead">
                    Proper HTML document structure is the foundation of any good website...
                </p>
                
                <h2>Table of Contents</h2>
                <ol>
                    <li><a href="#introduction">Introduction</a></li>
                    <li><a href="#basic-structure">Basic Structure</a></li>
                    <li><a href="#best-practices">Best Practices</a></li>
                </ol>
                
                <section id="introduction">
                    <h2>Introduction</h2>
                    <p>HTML document structure provides the skeleton...</p>
                </section>
                
                <section id="basic-structure">
                    <h2>Basic Structure</h2>
                    <p>Every HTML document should start with...</p>
                </section>
                
                <section id="best-practices">
                    <h2>Best Practices</h2>
                    <p>Follow these guidelines for better code...</p>
                </section>
            </div>
            
            <footer class="post-footer">
                <div class="tags">
                    <span>Tags:</span>
                    <a href="/tags/html" rel="tag">HTML</a>
                    <a href="/tags/tutorial" rel="tag">Tutorial</a>
                    <a href="/tags/beginner" rel="tag">Beginner</a>
                </div>
                
                <div class="share-buttons">
                    <button type="button" class="share-twitter">Share on Twitter</button>
                    <button type="button" class="share-facebook">Share on Facebook</button>
                </div>
            </footer>
        </article>
        
        <aside>
            <h2>Related Posts</h2>
            <ul>
                <li><a href="/posts/html-basics">HTML Basics for Beginners</a></li>
                <li><a href="/posts/semantic-html">Understanding Semantic HTML</a></li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2023 Web Development Blog</p>
    </footer>
</body>
</html>
```

### E-commerce Product Page
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional wireless headphones with noise cancellation, 30-hour battery life, and premium sound quality. Free shipping available.">
    <title>Wireless Pro Headphones - Premium Audio | TechStore</title>
    
    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="Wireless Pro Headphones - Premium Audio">
    <meta property="og:description" content="Professional wireless headphones with noise cancellation">
    <meta property="og:image" content="https://example.com/headphones-main.jpg">
    <meta property="og:type" content="product">
    
    <!-- Product structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "Wireless Pro Headphones",
        "description": "Professional wireless headphones with noise cancellation",
        "sku": "WPH-001",
        "brand": {
            "@type": "Brand",
            "name": "TechBrand"
        },
        "offers": {
            "@type": "Offer",
            "price": "299.99",
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
        }
    }
    </script>
</head>
<body>
    <header>
        <div class="container">
            <h1 class="logo">
                <a href="/">TechStore</a>
            </h1>
            
            <nav>
                <ul>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/support">Support</a></li>
                    <li><a href="/cart">Cart (0)</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <main>
        <!-- Breadcrumb navigation -->
        <nav aria-label="Breadcrumb">
            <ol>
                <li><a href="/">Home</a></li>
                <li><a href="/categories/electronics">Electronics</a></li>
                <li><a href="/categories/audio">Audio</a></li>
                <li aria-current="page">Wireless Pro Headphones</li>
            </ol>
        </nav>
        
        <!-- Product details -->
        <div class="product-container">
            <div class="product-images">
                <img src="headphones-main.jpg" 
                     alt="Wireless Pro Headphones in black color"
                     class="main-image">
                
                <div class="thumbnail-images">
                    <img src="headphones-side.jpg" 
                         alt="Side view of headphones"
                         class="thumbnail">
                    <img src="headphones-detail.jpg" 
                         alt="Close-up of headphone controls"
                         class="thumbnail">
                </div>
            </div>
            
            <div class="product-info">
                <h1>Wireless Pro Headphones</h1>
                
                <div class="price">
                    <span class="current-price">$299.99</span>
                    <span class="original-price">$399.99</span>
                    <span class="discount">25% off</span>
                </div>
                
                <div class="product-features">
                    <h2>Key Features</h2>
                    <ul>
                        <li>Active noise cancellation</li>
                        <li>30-hour battery life</li>
                        <li>Quick charge: 5 min = 3 hours playback</li>
                        <li>Premium leather comfort</li>
                        <li>Bluetooth 5.0 connectivity</li>
                    </ul>
                </div>
                
                <form class="add-to-cart-form">
                    <div class="product-options">
                        <label for="color">Color:</label>
                        <select id="color" name="color" required>
                            <option value="">Choose a color</option>
                            <option value="black">Midnight Black</option>
                            <option value="white">Pearl White</option>
                            <option value="blue">Ocean Blue</option>
                        </select>
                    </div>
                    
                    <div class="quantity">
                        <label for="quantity">Quantity:</label>
                        <input type="number" 
                               id="quantity" 
                               name="quantity" 
                               min="1" 
                               max="10" 
                               value="1" 
                               required>
                    </div>
                    
                    <button type="submit" class="add-to-cart-btn">
                        Add to Cart - $299.99
                    </button>
                </form>
                
                <div class="shipping-info">
                    <p><strong>Free shipping</strong> on orders over $200</p>
                    <p><strong>2-day delivery</strong> available</p>
                    <p><strong>30-day returns</strong> - no questions asked</p>
                </div>
            </div>
        </div>
        
        <!-- Product description -->
        <section class="product-description">
            <h2>Product Description</h2>
            <p>
                Experience studio-quality sound with our Wireless Pro Headphones. 
                Featuring advanced noise cancellation technology and premium materials...
            </p>
        </section>
        
        <!-- Customer reviews -->
        <section class="reviews">
            <h2>Customer Reviews</h2>
            <div class="review-summary">
                <div class="rating">
                    <span class="stars">★★★★★</span>
                    <span class="rating-text">4.8 out of 5 stars</span>
                    <span class="review-count">(127 reviews)</span>
                </div>
            </div>
            
            <article class="review">
                <header class="review-header">
                    <h3 class="reviewer-name">Sarah Johnson</h3>
                    <div class="review-rating">★★★★★</div>
                    <time datetime="2023-11-15">November 15, 2023</time>
                </header>
                <p class="review-text">
                    "Absolutely love these headphones! The noise cancellation 
                    is incredible and the battery life is exactly as advertised."
                </p>
            </article>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>&copy; 2023 TechStore. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
```

## Accessibility and SEO Considerations

### Accessibility Features
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible HTML Document</title>
</head>
<body>
    <!-- Skip navigation links -->
    <nav aria-label="Skip navigation">
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <a href="#primary-nav" class="skip-link">Skip to navigation</a>
        <a href="#footer" class="skip-link">Skip to footer</a>
    </nav>
    
    <header role="banner">
        <h1>Accessible Website</h1>
        
        <!-- Primary navigation with ARIA -->
        <nav id="primary-nav" 
             role="navigation" 
             aria-label="Primary navigation">
            <ul>
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/services" aria-expanded="false">Services</a>
                    <ul aria-hidden="true">
                        <li><a href="/web-design">Web Design</a></li>
                        <li><a href="/development">Development</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    </header>
    
    <main id="main-content" role="main" tabindex="-1">
        <h1>Welcome to Our Accessible Site</h1>
        
        <!-- Form with proper labels and descriptions -->
        <section aria-labelledby="contact-heading">
            <h2 id="contact-heading">Contact Us</h2>
            
            <form>
                <div class="form-group">
                    <label for="full-name">Full Name (required)</label>
                    <input type="text" 
                           id="full-name" 
                           name="fullName" 
                           required
                           aria-required="true"
                           aria-describedby="name-help">
                    <div id="name-help" class="help-text">
                        Enter your first and last name
                    </div>
                </div>
                
                <fieldset>
                    <legend>Preferred Contact Method</legend>
                    <div class="radio-group">
                        <input type="radio" 
                               id="contact-email" 
                               name="contactMethod" 
                               value="email">
                        <label for="contact-email">Email</label>
                    </div>
                    <div class="radio-group">
                        <input type="radio" 
                               id="contact-phone" 
                               name="contactMethod" 
                               value="phone">
                        <label for="contact-phone">Phone</label>
                    </div>
                </fieldset>
                
                <button type="submit">Send Message</button>
            </form>
        </section>
        
        <!-- Data table with proper headers -->
        <section aria-labelledby="data-table-heading">
            <h2 id="data-table-heading">Sales Data</h2>
            
            <table>
                <caption>Monthly sales figures for 2023</caption>
                <thead>
                    <tr>
                        <th scope="col">Month</th>
                        <th scope="col">Sales ($)</th>
                        <th scope="col">Growth (%)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">January</th>
                        <td>$50,000</td>
                        <td>+15%</td>
                    </tr>
                    <tr>
                        <th scope="row">February</th>
                        <td>$55,000</td>
                        <td>+10%</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </main>
    
    <footer id="footer" role="contentinfo">
        <div class="container">
            <p>&copy; 2023 Accessible Website. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
```

This comprehensive lesson covers all essential aspects of HTML document structure, from basic syntax to advanced patterns and accessibility considerations. Students should practice creating different types of documents using these patterns and validate their HTML using tools like the W3C Markup Validator.
