# Text Content and Formatting in HTML

## Introduction to HTML Text Elements

Text is the foundation of web content. HTML provides many elements for structuring and formatting text content semantically.

## Headings and Document Hierarchy

### Heading Elements (h1-h6)
```html
<!-- Proper heading hierarchy -->
<main>
    <h1>Main Page Title</h1>
    
    <section>
        <h2>Chapter One</h2>
        <p>Introduction to the first chapter...</p>
        
        <h3>Section 1.1</h3>
        <p>Content for subsection...</p>
        
        <h3>Section 1.2</h3>
        <p>More subsection content...</p>
    </section>
    
    <section>
        <h2>Chapter Two</h2>
        <p>Second chapter content...</p>
    </section>
</main>

<!-- Bad: Skipping heading levels -->
<h1>Main Title</h1>
<h3>Subtitle</h3> <!-- Should be h2 -->

<!-- Bad: Using headings for styling -->
<h4 class="small-text">This should be a paragraph</h4>
<!-- Should be: -->
<p class="subtitle">This should be a paragraph</p>
```

### Heading Best Practices
- Use only one `<h1>` per page
- Don't skip heading levels (h1 → h3)
- Use headings for structure, not styling
- Keep headings descriptive and concise

## Paragraphs and Text Flow

### Basic Paragraphs
```html
<section>
    <h2>Introduction to HTML</h2>
    
    <p>
        HTML is the foundation of all web pages. It provides structure 
        and meaning to content on the internet.
    </p>
    
    <p>
        Every HTML document consists of elements that define different 
        parts of the content. These elements tell the browser how to 
        display and organize information.
    </p>
</section>
```

### Line Breaks and Horizontal Rules
```html
<!-- Line breaks for addresses or poetry -->
<address>
    John Smith<br>
    123 Main Street<br>
    Anytown, ST 12345
</address>

<blockquote>
    Roses are red<br>
    Violets are blue<br>
    HTML is awesome<br>
    And so are you!
</blockquote>

<!-- Horizontal rule for thematic breaks -->
<section>
    <h2>Chapter One</h2>
    <p>Content of chapter one...</p>
</section>

<hr>

<section>
    <h2>Chapter Two</h2>
    <p>Content of chapter two...</p>
</section>
```

## Text Formatting Elements

### Emphasis and Importance
```html
<p>
    This is <em>emphasized text</em> (usually italic) and 
    this is <strong>important text</strong> (usually bold).
</p>

<p>
    Use <em>em</em> for stress emphasis in speech, and 
    <strong>strong</strong> for importance or urgency.
</p>

<!-- Visual-only formatting (use sparingly) -->
<p>
    This is <i>italic text</i> (for terms, foreign words) and 
    this is <b>bold text</b> (for keywords, product names).
</p>

<p>
    The term <i lang="fr">café</i> comes from French.
    Press the <b>Submit</b> button to continue.
</p>
```

### Inline Code and Programming Elements
```html
<p>
    To create a paragraph, use the <code>&lt;p&gt;</code> element.
    The <var>x</var> variable represents the user's input.
</p>

<p>
    Press <kbd>Ctrl + S</kbd> to save your document.
    The function returned <samp>Error: File not found</samp>.
</p>

<!-- Preformatted code blocks -->
<pre><code>function greet(name) {
    return "Hello, " + name + "!");
}

console.log(greet("World"));</code></pre>
```

### Subscript and Superscript
```html
<p>
    The chemical formula for water is H<sub>2</sub>O.
    Einstein's famous equation is E = mc<sup>2</sup>.
</p>

<p>
    This is the 1<sup>st</sup> example and 
    CO<sub>2</sub> is carbon dioxide.
</p>
```

### Small Text and Fine Print
```html
<article>
    <h1>Product Special Offer</h1>
    <p>Get 50% off all products this weekend!</p>
    
    <footer>
        <small>
            Offer valid until Sunday. Terms and conditions apply. 
            Cannot be combined with other offers.
        </small>
    </footer>
</article>
```

## Quotations and Citations

### Blockquotes
```html
<blockquote cite="https://example.com/quote-source">
    <p>
        "The best way to predict the future is to invent it."
    </p>
    <footer>
        — <cite>Alan Kay</cite>, computer scientist
    </footer>
</blockquote>

<!-- Multiple paragraph blockquote -->
<blockquote>
    <p>
        "Innovation distinguishes between a leader and a follower."
    </p>
    <p>
        "Stay hungry. Stay foolish."
    </p>
    <footer>
        — <cite>Steve Jobs</cite>
    </footer>
</blockquote>
```

### Inline Quotes
```html
<p>
    As Maya Angelou once said, 
    <q cite="https://example.com/source">
        If you don't like something, change it. 
        If you can't change it, change your attitude.
    </q>
</p>
```

### Citations and References
```html
<p>
    According to <cite>The Elements of Style</cite> by Strunk and White,
    clear writing is essential for effective communication.
</p>

<p>
    The study published in <cite>Nature Magazine</cite> shows 
    promising results for the new treatment.
</p>
```

## Abbreviations and Definitions

### Abbreviations and Acronyms
```html
<p>
    <abbr title="HyperText Markup Language">HTML</abbr> is the 
    standard markup language for web pages.
</p>

<p>
    The <abbr title="World Wide Web Consortium">W3C</abbr> 
    maintains web standards. Contact us via 
    <abbr title="Electronic Mail">email</abbr>.
</p>
```

### Definitions
```html
<p>
    A <dfn>variable</dfn> is a named storage location in programming 
    that can hold a value.
</p>

<p>
    <dfn title="Cascading Style Sheets">CSS</dfn> is used to style 
    HTML documents.
</p>

<!-- Definition lists -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - the standard markup language for web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - used for styling HTML documents</dd>
    
    <dt>JavaScript</dt>
    <dd>A programming language that adds interactivity to web pages</dd>
</dl>
```

## Special Text Elements

### Highlighted Text
```html
<p>
    When searching for "HTML tutorial", the results will show 
    <mark>HTML tutorial</mark> highlighted in the text.
</p>

<p>
    The important parts of the contract are <mark>highlighted</mark> 
    for your review.
</p>
```

### Inserted and Deleted Text
```html
<p>
    The meeting is scheduled for 
    <del datetime="2023-12-07T14:00">2:00 PM</del> 
    <ins datetime="2023-12-07T15:00">3:00 PM</ins> 
    on Friday.
</p>

<p>
    Our price is 
    <del>$299.99</del> 
    <ins>$199.99</ins> 
    for a limited time.
</p>
```

### Strikethrough Text
```html
<p>
    <s>This offer has expired.</s> 
    Check our new deals below!
</p>

<p>
    <s>Out of stock</s> Back in stock soon!
</p>
```

## Address and Contact Information

### Address Element
```html
<section>
    <h2>Contact Information</h2>
    
    <address>
        <strong>Web Development Company</strong><br>
        123 Internet Avenue<br>
        Digital City, DC 12345<br>
        <a href="tel:+1234567890">+1 (234) 567-890</a><br>
        <a href="mailto:info@example.com">info@example.com</a>
    </address>
</section>

<!-- Author contact information -->
<article>
    <h1>Understanding HTML5</h1>
    <p>HTML5 introduces many new features...</p>
    
    <footer>
        <address>
            Written by <a href="mailto:jane.smith@example.com">Jane Smith</a><br>
            Senior Web Developer
        </address>
    </footer>
</article>
```

## Time and Dates

### Time Element
```html
<article>
    <h1>HTML5 Released</h1>
    <p>
        HTML5 was officially released on 
        <time datetime="2014-10-28">October 28, 2014</time>.
    </p>
    
    <p>
        The meeting is scheduled for 
        <time datetime="2023-12-15T14:30:00">
            Friday, December 15th at 2:30 PM
        </time>.
    </p>
    
    <footer>
        <p>
            Published on 
            <time datetime="2023-12-07" pubdate>December 7, 2023</time>
        </p>
    </footer>
</article>
```

## Best Practices for Text Content

### Semantic Text Guidelines
```html
<!-- Good: Semantic meaning -->
<p>
    This is <em>really important</em> to understand.
    The <strong>deadline</strong> is tomorrow.
</p>

<!-- Avoid: Styling-only elements -->
<p>
    This is <i>really important</i> to understand.  <!-- Use <em> -->
    The <b>deadline</b> is tomorrow.               <!-- Use <strong> -->
</p>

<!-- Good: Proper use of inline elements -->
<p>
    To install the package, run <code>npm install</code> in your terminal.
    The file <code>index.html</code> contains the main page structure.
</p>

<!-- Good: Accessibility considerations -->
<p>
    The price is now 
    <del>
        <span class="visually-hidden">was </span>$99.99
    </del>
    <ins>
        <span class="visually-hidden">now </span>$79.99
    </ins>
</p>
```

### Common Text Content Mistakes
```html
<!-- Bad: Empty paragraphs for spacing -->
<p>Content here</p>
<p>&nbsp;</p>  <!-- Use CSS margins instead -->
<p>More content</p>

<!-- Bad: Multiple line breaks -->
<p>
    Line one<br><br><br>
    Line two  <!-- Use CSS margins/padding instead -->
</p>

<!-- Bad: Incorrect heading usage -->
<h3>Main Title</h3>  <!-- Should be h1 -->
<h1>Subtitle</h1>    <!-- Should be h2 -->

<!-- Good: Proper structure -->
<h1>Main Title</h1>
<h2>Subtitle</h2>
<p>Content with proper spacing using CSS.</p>
```

This comprehensive lesson covers all essential HTML text elements and formatting options, providing students with the knowledge to create well-structured, semantic text content.
