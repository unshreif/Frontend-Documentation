# Text Elements in HTML - Complete Guide

## Introduction to Text Elements

Text elements are the foundation of web content. They provide structure, meaning, and visual hierarchy to your content while maintaining semantic value for search engines and assistive technologies.

## Headings (h1-h6)

### Understanding Heading Hierarchy
HTML provides six levels of headings that create a document outline:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document Structure with Headings</title>
</head>
<body>
    <!-- Main page title - only one h1 per page -->
    <h1>The Complete Guide to Web Development</h1>
    
    <!-- Major sections -->
    <h2>Frontend Development</h2>
    <h3>HTML Fundamentals</h3>
    <h4>Document Structure</h4>
    <h5>Head Section Elements</h5>
    <h6>Meta Tags and SEO</h6>
    
    <h4>Semantic Elements</h4>
    <h5>Header and Navigation</h5>
    <h5>Main Content Areas</h5>
    
    <h3>CSS Styling</h3>
    <h4>Selectors and Properties</h4>
    <h4>Layout Techniques</h4>
    
    <h2>Backend Development</h2>
    <h3>Server-Side Languages</h3>
    <h3>Databases</h3>
    
    <h2>DevOps and Deployment</h2>
    <h3>Version Control</h3>
    <h3>Hosting and Domains</h3>
</body>
</html>
```

### Heading Best Practices
```html
<!-- GOOD: Proper heading hierarchy -->
<article>
    <h1>Article Title</h1>
    <h2>Main Section</h2>
    <h3>Subsection</h3>
    <h3>Another Subsection</h3>
    <h2>Another Main Section</h2>
    <h3>Its Subsection</h3>
</article>

<!-- BAD: Skipping heading levels -->
<article>
    <h1>Article Title</h1>
    <h4>Subsection</h4> <!-- Skips h2 and h3 -->
    <h2>Main Section</h2> <!-- Goes backwards -->
</article>

<!-- GOOD: Multiple h1s in different sections (HTML5) -->
<main>
    <article>
        <h1>First Article Title</h1>
        <p>Article content...</p>
    </article>
    
    <article>
        <h1>Second Article Title</h1>
        <p>Article content...</p>
    </article>
</main>

<!-- Headings for styling vs. structure -->
<!-- BAD: Using headings for visual styling -->
<h3>This should be large text</h3> <!-- If it's not actually a heading -->

<!-- GOOD: Use CSS for styling -->
<p class="large-text">This should be large text</p>
```

## Paragraphs and Basic Text Formatting

### Paragraph Elements
```html
<!-- Basic paragraphs -->
<p>
    This is a standard paragraph. Paragraphs are block-level elements that 
    automatically create space above and below their content. They're the 
    most common way to structure body text on web pages.
</p>

<p>
    Each paragraph should contain a single idea or concept. When you want to 
    move to a new idea, start a new paragraph. This makes content easier to 
    read and understand.
</p>

<!-- Paragraphs with inline elements -->
<p>
    You can include <strong>important information</strong> and 
    <em>emphasized text</em> within paragraphs. You might also include 
    <a href="https://example.com">links to other pages</a> or websites.
</p>

<!-- Long-form content with proper paragraph structure -->
<article>
    <h1>The Art of Writing for the Web</h1>
    
    <p class="lead">
        Writing for the web requires a different approach than traditional print media. 
        Web readers scan content quickly, looking for key information and actionable insights.
    </p>
    
    <p>
        <strong>Scannable content</strong> is essential for web success. Users typically 
        read in an F-pattern, focusing on headings, the first few words of paragraphs, 
        and bullet points. This reading behavior means writers must front-load important 
        information and use clear, descriptive headings.
    </p>
    
    <p>
        Keep paragraphs short—ideally 2-3 sentences maximum. Long blocks of text 
        intimidate readers and reduce engagement. Each paragraph should make one main 
        point and flow logically to the next.
    </p>
</article>
```

### Text Emphasis and Importance
```html
<!-- Strong importance (usually bold) -->
<p>
    <strong>Warning:</strong> This action cannot be undone. Please review 
    your selection carefully before proceeding.
</p>

<p>
    The most <strong>critical factor</strong> in web performance is page load speed.
</p>

<!-- Emphasis (usually italic) -->
<p>
    The word <em>semantic</em> refers to meaning in language and code structure.
</p>

<p>
    She didn't just like the movie—she <em>loved</em> it.
</p>

<!-- Bold and italic for styling (not semantic meaning) -->
<p>
    Sometimes you need <b>bold text</b> or <i>italic text</i> purely for 
    visual styling without semantic importance.
</p>

<!-- Combining emphasis elements -->
<p>
    This is <strong><em>very important and emphasized</em></strong> information.
</p>

<p>
    <em>The Great Gatsby</em> is a novel by <strong>F. Scott Fitzgerald</strong>.
</p>
```

### Advanced Text Elements
```html
<!-- Highlighted text -->
<p>
    Search results for "web development": 
    <mark>HTML</mark>, CSS, and JavaScript are the core technologies for 
    <mark>web development</mark>.
</p>

<!-- Small text (fine print, disclaimers) -->
<p>
    Get 50% off your first order!
    <small>Offer valid for new customers only. Terms and conditions apply.</small>
</p>

<!-- Subscript and superscript -->
<p>
    The chemical formula for water is H<sub>2</sub>O.
</p>

<p>
    Einstein's famous equation: E = mc<sup>2</sup>
</p>

<p>
    The 4<sup>th</sup> of July is Independence Day.
</p>

<!-- Deleted and inserted text -->
<p>
    The meeting is scheduled for <del>Tuesday</del> <ins>Wednesday</ins> at 2 PM.
</p>

<p>
    Original price: <del>$99.99</del> Sale price: <ins>$79.99</ins>
</p>

<!-- Code and keyboard elements -->
<p>
    To copy text, press <kbd>Ctrl</kbd> + <kbd>C</kbd> on Windows or 
    <kbd>Cmd</kbd> + <kbd>C</kbd> on Mac.
</p>

<p>
    The <code>console.log()</code> function is used to output messages 
    to the browser's developer console.
</p>

<p>
    Use the <code>&lt;strong&gt;</code> element for important text.
</p>

<!-- Variable text -->
<p>
    Welcome back, <var>username</var>! You have <var>messageCount</var> new messages.
</p>

<!-- Sample output -->
<p>
    When you run the command, you should see: <samp>Process completed successfully</samp>
</p>
```

## Lists

### Unordered Lists
```html
<!-- Basic unordered list -->
<h2>Web Development Skills</h2>
<ul>
    <li>HTML - Structure and content</li>
    <li>CSS - Styling and layout</li>
    <li>JavaScript - Interactivity and behavior</li>
    <li>Version Control - Git and GitHub</li>
    <li>Responsive Design - Mobile-first approach</li>
</ul>

<!-- Nested unordered lists -->
<h2>Frontend Technologies</h2>
<ul>
    <li>HTML
        <ul>
            <li>Semantic elements</li>
            <li>Forms and inputs</li>
            <li>Accessibility features</li>
        </ul>
    </li>
    <li>CSS
        <ul>
            <li>Flexbox and Grid</li>
            <li>Animations and transitions</li>
            <li>Preprocessors (Sass, Less)</li>
        </ul>
    </li>
    <li>JavaScript
        <ul>
            <li>ES6+ features</li>
            <li>DOM manipulation</li>
            <li>Async programming</li>
            <li>Frameworks
                <ul>
                    <li>React</li>
                    <li>Vue</li>
                    <li>Angular</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<!-- Lists with different content types -->
<h2>Project Resources</h2>
<ul>
    <li>
        <strong>Design Assets</strong>
        <ul>
            <li><a href="style-guide.pdf">Brand Style Guide</a></li>
            <li><a href="wireframes.zip">Wireframe Files</a></li>
            <li><a href="assets/">Image Assets Folder</a></li>
        </ul>
    </li>
    <li>
        <strong>Development Tools</strong>
        <ul>
            <li>Code Editor: <a href="https://code.visualstudio.com/">VS Code</a></li>
            <li>Version Control: <a href="https://git-scm.com/">Git</a></li>
            <li>Browser DevTools: Built into modern browsers</li>
        </ul>
    </li>
</ul>
```

### Ordered Lists
```html
<!-- Basic ordered list -->
<h2>Website Development Process</h2>
<ol>
    <li>Planning and research</li>
    <li>Create wireframes and mockups</li>
    <li>Set up development environment</li>
    <li>Build HTML structure</li>
    <li>Add CSS styling</li>
    <li>Implement JavaScript functionality</li>
    <li>Test across devices and browsers</li>
    <li>Deploy to production server</li>
</ol>

<!-- Ordered list with custom starting number -->
<h3>Advanced Steps</h3>
<ol start="9">
    <li>Set up analytics and monitoring</li>
    <li>Optimize for search engines</li>
    <li>Implement security measures</li>
    <li>Create backup procedures</li>
</ol>

<!-- Reversed ordered list -->
<h2>Top Programming Languages (2023)</h2>
<ol reversed>
    <li>JavaScript</li>
    <li>Python</li>
    <li>Java</li>
    <li>TypeScript</li>
    <li>C#</li>
</ol>

<!-- Nested ordered lists -->
<h2>Complete Web Development Course</h2>
<ol>
    <li>HTML Fundamentals
        <ol>
            <li>Document structure</li>
            <li>Text elements</li>
            <li>Links and navigation</li>
            <li>Images and media</li>
            <li>Forms and inputs</li>
        </ol>
    </li>
    <li>CSS Fundamentals
        <ol>
            <li>Selectors and properties</li>
            <li>Box model and layout</li>
            <li>Flexbox and Grid</li>
            <li>Responsive design</li>
            <li>Animations</li>
        </ol>
    </li>
    <li>JavaScript Fundamentals
        <ol>
            <li>Variables and data types</li>
            <li>Functions and scope</li>
            <li>DOM manipulation</li>
            <li>Event handling</li>
            <li>Async programming</li>
        </ol>
    </li>
</ol>

<!-- Different numbering types -->
<h3>Project Phases</h3>
<ol type="A">
    <li>Discovery Phase</li>
    <li>Design Phase</li>
    <li>Development Phase</li>
    <li>Testing Phase</li>
    <li>Launch Phase</li>
</ol>

<ol type="I">
    <li>Initial Consultation</li>
    <li>Proposal and Agreement</li>
    <li>Project Kickoff</li>
</ol>
```

### Description Lists
```html
<!-- Basic description list -->
<h2>Web Development Glossary</h2>
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - the standard markup language for creating web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - used for describing the presentation of a document</dd>
    
    <dt>JavaScript</dt>
    <dd>A programming language that enables dynamic content and interactivity on web pages</dd>
    
    <dt>DOM</dt>
    <dd>Document Object Model - a programming interface for HTML and XML documents</dd>
    
    <dt>API</dt>
    <dd>Application Programming Interface - a set of protocols and tools for building software</dd>
</dl>

<!-- Multiple definitions for one term -->
<dl>
    <dt>Git</dt>
    <dd>A distributed version control system for tracking changes in source code</dd>
    <dd>A command-line tool used by developers for collaboration and code management</dd>
    
    <dt>Framework</dt>
    <dd>A pre-written code library that provides a foundation for developing applications</dd>
    <dd>Examples include React, Angular, Vue for JavaScript development</dd>
</dl>

<!-- Complex description list with multiple terms -->
<dl>
    <dt>Frontend</dt>
    <dt>Client-side</dt>
    <dd>The part of a web application that users interact with directly in their browser</dd>
    
    <dt>Backend</dt>
    <dt>Server-side</dt>
    <dd>The part of a web application that runs on the server and handles data processing</dd>
</dl>

<!-- Description list for structured content -->
<h2>Team Members</h2>
<dl>
    <dt>Sarah Johnson</dt>
    <dd>
        <strong>Role:</strong> Lead Developer<br>
        <strong>Experience:</strong> 5 years<br>
        <strong>Specialties:</strong> React, Node.js, Database Design
    </dd>
    
    <dt>Mike Chen</dt>
    <dd>
        <strong>Role:</strong> UI/UX Designer<br>
        <strong>Experience:</strong> 3 years<br>
        <strong>Specialties:</strong> User Research, Prototyping, Visual Design
    </dd>
    
    <dt>Alex Rivera</dt>
    <dd>
        <strong>Role:</strong> DevOps Engineer<br>
        <strong>Experience:</strong> 4 years<br>
        <strong>Specialties:</strong> AWS, Docker, CI/CD Pipelines
    </dd>
</dl>
```

## Quotations and Citations

### Blockquotes
```html
<!-- Basic blockquote -->
<blockquote>
    <p>
        The best way to get started is to quit talking and begin doing.
    </p>
</blockquote>

<!-- Blockquote with citation -->
<blockquote cite="https://www.apple.com/stevejobs/">
    <p>
        Innovation distinguishes between a leader and a follower.
    </p>
    <footer>
        — <cite>Steve Jobs</cite>, Co-founder of Apple Inc.
    </footer>
</blockquote>

<!-- Long blockquote with multiple paragraphs -->
<blockquote cite="https://www.w3.org/standards/webdesign/accessibility">
    <p>
        The power of the Web is in its universality. Access by everyone 
        regardless of disability is an essential aspect.
    </p>
    <p>
        When the Web meets this requirement, it is accessible to people 
        with a diverse range of hearing, movement, sight, and cognitive ability.
    </p>
    <footer>
        — <cite>Tim Berners-Lee</cite>, W3C Director and inventor of the World Wide Web
    </footer>
</blockquote>

<!-- Blockquote in article context -->
<article>
    <h1>The Importance of Web Accessibility</h1>
    
    <p>
        Web accessibility ensures that websites and applications can be used 
        by people with disabilities. This isn't just a nice-to-have feature—it's 
        a fundamental aspect of inclusive design.
    </p>
    
    <blockquote>
        <p>
            Accessibility is not a feature, it's a fundamental aspect of good design.
        </p>
        <footer>
            — <cite>Inclusive Design Principles</cite>
        </footer>
    </blockquote>
    
    <p>
        By following accessibility guidelines, we create better experiences 
        for all users, not just those with disabilities.
    </p>
</article>
```

### Inline Quotes
```html
<!-- Basic inline quotes -->
<p>
    As Maya Angelou once said, <q>If you don't like something, change it. 
    If you can't change it, change your attitude.</q>
</p>

<p>
    The term <q>responsive design</q> was coined by Ethan Marcotte in 2010.
</p>

<!-- Inline quotes with citation -->
<p>
    Albert Einstein famously noted that <q cite="https://example.com/einstein-quotes">
    imagination is more important than knowledge</q>, a principle that applies 
    perfectly to creative problem-solving in web development.
</p>

<!-- Nested quotes -->
<p>
    The instructor explained, <q>When someone asks you about semantic HTML, 
    remember what Tim Berners-Lee said: <q>The power of the Web is in its universality.</q>
    This is why we use proper HTML elements.</q>
</p>

<!-- Language-specific quotes -->
<p lang="fr">
    En français, on dit <q>Bonjour le monde</q> pour dire <q lang="en">Hello World</q>.
</p>
```

### Citation Elements
```html
<!-- Citing works -->
<p>
    For more information about web standards, see 
    <cite>HTML5: The Missing Manual</cite> by Matthew MacDonald.
</p>

<p>
    The research was published in 
    <cite>Journal of Web Accessibility</cite>, Volume 12, Issue 3.
</p>

<!-- Citing people -->
<p>
    <cite>Steve Krug</cite> wrote extensively about web usability in his book 
    <cite>Don't Make Me Think</cite>.
</p>

<!-- Citations in academic context -->
<article>
    <h1>Mobile-First Design Principles</h1>
    
    <p>
        The mobile-first approach to web design has gained significant traction 
        since <cite>Luke Wroblewski</cite> introduced the concept in his 2011 book 
        <cite>Mobile First</cite>.
    </p>
    
    <p>
        Recent studies published in <cite>UX Design Research Quarterly</cite> 
        show that mobile-first websites have 40% better performance metrics 
        compared to desktop-first designs.
    </p>
    
    <blockquote cite="https://abookapart.com/products/mobile-first">
        <p>
            Mobile first isn't just about making things fit on smaller screens—it's 
            about embracing the constraints of mobile to create better experiences 
            for everyone.
        </p>
        <footer>
            — <cite>Luke Wroblewski</cite>, <cite>Mobile First</cite>
        </footer>
    </blockquote>
</article>
```

## Preformatted Text and Code

### Preformatted Text
```html
<!-- Basic preformatted text -->
<pre>
This text preserves    spacing
    and line breaks
        exactly as written.

It's useful for:
- ASCII art
- Code formatting
- Preserving exact layout
</pre>

<!-- Code blocks -->
<pre><code>
function greetUser(name) {
    console.log("Hello, " + name + "!");
}

greetUser("World");
</code></pre>

<!-- Preformatted text with semantic meaning -->
<h3>File Directory Structure</h3>
<pre>
project/
├── index.html
├── styles/
│   ├── main.css
│   └── responsive.css
├── scripts/
│   ├── app.js
│   └── utils.js
└── images/
    ├── logo.png
    └── background.jpg
</pre>

<!-- Email template example -->
<h3>Email Format</h3>
<pre>
To: user@example.com
From: noreply@oursite.com
Subject: Welcome to Our Service

Dear [User Name],

Thank you for joining our platform...

Best regards,
The Team
</pre>
```

### Code Elements
```html
<!-- Inline code -->
<p>
    Use the <code>document.getElementById()</code> method to select elements by their ID.
</p>

<p>
    The CSS property <code>display: flex</code> creates a flexible container.
</p>

<!-- Code blocks with syntax highlighting hints -->
<h3>HTML Example</h3>
<pre><code class="language-html">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Example&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

<h3>CSS Example</h3>
<pre><code class="language-css">
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background-color: #333;
    color: white;
    padding: 1rem 0;
}
</code></pre>

<h3>JavaScript Example</h3>
<pre><code class="language-javascript">
const button = document.querySelector('.submit-btn');
button.addEventListener('click', function(event) {
    event.preventDefault();
    console.log('Button clicked!');
});
</code></pre>
```

## Text Direction and Language

### Bidirectional Text
```html
<!-- Mixed language content -->
<p>
    The word <span lang="ar" dir="rtl">مرحبا</span> means "hello" in Arabic.
</p>

<p>
    In Hebrew, you write <span lang="he" dir="rtl">שלום עולם</span> for "hello world".
</p>

<!-- Document with RTL language -->
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>موقع باللغة العربية</title>
</head>
<body>
    <h1>مرحبا بكم في موقعنا</h1>
    <p>هذا نص باللغة العربية يُقرأ من اليمين إلى اليسار.</p>
</body>
</html>

<!-- Override text direction -->
<p dir="ltr">
    This paragraph is left-to-right even in an RTL document.
</p>

<p dir="rtl">
    This paragraph is right-to-left even in an LTR document.
</p>
```

## Accessibility Considerations

### Screen Reader Friendly Text
```html
<!-- Accessible headings with proper hierarchy -->
<main>
    <h1>Web Accessibility Guide</h1>
    
    <section aria-labelledby="visual-design">
        <h2 id="visual-design">Visual Design Principles</h2>
        <h3>Color Contrast</h3>
        <p>Ensure sufficient contrast between text and background colors.</p>
        
        <h3>Typography</h3>
        <p>Use readable font sizes and appropriate line spacing.</p>
    </section>
    
    <section aria-labelledby="navigation">
        <h2 id="navigation">Navigation Structure</h2>
        <h3>Skip Links</h3>
        <p>Provide skip navigation links for keyboard users.</p>
    </section>
</main>

<!-- Text with pronunciation hints -->
<p>
    The abbreviation <abbr title="World Wide Web Consortium">W3C</abbr> 
    sets web standards.
</p>

<p>
    Dr. <span title="pronounced as doctor">Dr.</span> Smith will see you now.
</p>

<!-- Hidden text for screen readers -->
<a href="document.pdf">
    Download Report
    <span class="sr-only">(PDF, 2.3 MB)</span>
</a>

<button>
    <span aria-hidden="true">❤️</span>
    <span class="sr-only">Add to favorites</span>
</button>
```

## Practical Examples

### Blog Post Structure
```html
<article>
    <header>
        <h1>Getting Started with Web Development in 2024</h1>
        <p class="meta">
            Published on <time datetime="2024-01-15">January 15, 2024</time> 
            by <address class="author">Sarah Johnson</address>
        </p>
        <p class="lead">
            Web development continues to evolve rapidly. Here's what you need to know 
            to start your journey in 2024.
        </p>
    </header>
    
    <section>
        <h2>Essential Technologies</h2>
        <p>
            Modern web development requires understanding several core technologies. 
            Let's explore the <strong>fundamental building blocks</strong> every 
            developer should master.
        </p>
        
        <h3>Frontend Fundamentals</h3>
        <ol>
            <li><strong>HTML5</strong> - Semantic structure and accessibility</li>
            <li><strong>CSS3</strong> - Modern styling and layout techniques</li>
            <li><strong>JavaScript ES6+</strong> - Interactive functionality</li>
        </ol>
        
        <h3>Development Tools</h3>
        <ul>
            <li>Code editors (VS Code, Sublime Text)</li>
            <li>Version control (Git and GitHub)</li>
            <li>Browser developer tools</li>
            <li>Package managers (npm, yarn)</li>
        </ul>
    </section>
    
    <section>
        <h2>Learning Path Recommendations</h2>
        <p>
            As <cite>MDN Web Docs</cite> suggests, the best approach is to 
            <q>start with the basics and build complexity gradually</q>.
        </p>
        
        <blockquote cite="https://developer.mozilla.org/en-US/docs/Learn">
            <p>
                Learning web development is a journey, not a destination. 
                Focus on understanding fundamentals before moving to frameworks.
            </p>
            <footer>— <cite>MDN Learning Guide</cite></footer>
        </blockquote>
        
        <h3>Beginner Timeline</h3>
        <dl>
            <dt>Weeks 1-2</dt>
            <dd>HTML structure and semantic elements</dd>
            
            <dt>Weeks 3-4</dt>
            <dd>CSS styling, flexbox, and grid</dd>
            
            <dt>Weeks 5-8</dt>
            <dd>JavaScript fundamentals and DOM manipulation</dd>
            
            <dt>Weeks 9-12</dt>
            <dd>Build your first complete project</dd>
        </dl>
    </section>
    
    <footer>
        <p>
            <small>
                This article was last updated on <time datetime="2024-01-15">January 15, 2024</time>. 
                For the latest web development trends, follow our 
                <a href="/newsletter">monthly newsletter</a>.
            </small>
        </p>
    </footer>
</article>
```

### Documentation Page
```html
<main>
    <h1>API Documentation</h1>
    
    <section>
        <h2>Getting Started</h2>
        <p>
            Welcome to our API documentation. This guide will help you integrate 
            our services into your application.
        </p>
        
        <h3>Authentication</h3>
        <p>
            All API requests require an authentication token. Include your token 
            in the <code>Authorization</code> header:
        </p>
        
        <pre><code>
Authorization: Bearer YOUR_API_TOKEN
        </code></pre>
        
        <h3>Base URL</h3>
        <p>All API requests should be made to:</p>
        <pre><code>https://api.example.com/v1/</code></pre>
    </section>
    
    <section>
        <h2>Endpoints</h2>
        
        <h3>Get User Information</h3>
        <dl>
            <dt>Endpoint</dt>
            <dd><code>GET /users/{id}</code></dd>
            
            <dt>Description</dt>
            <dd>Retrieves detailed information about a specific user</dd>
            
            <dt>Parameters</dt>
            <dd>
                <ul>
                    <li><code>id</code> (required) - The user's unique identifier</li>
                </ul>
            </dd>
            
            <dt>Example Response</dt>
            <dd>
                <pre><code>
{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "created_at": "2024-01-15T10:30:00Z"
}
                </code></pre>
            </dd>
        </dl>
    </section>
    
    <section>
        <h2>Error Handling</h2>
        <p>
            The API returns standard HTTP status codes. Here are the most common:
        </p>
        
        <dl>
            <dt><code>200 OK</code></dt>
            <dd>Request was successful</dd>
            
            <dt><code>400 Bad Request</code></dt>
            <dd>Invalid request parameters</dd>
            
            <dt><code>401 Unauthorized</code></dt>
            <dd>Invalid or missing authentication token</dd>
            
            <dt><code>404 Not Found</code></dt>
            <dd>Requested resource doesn't exist</dd>
            
            <dt><code>500 Internal Server Error</code></dt>
            <dd>Server error occurred</dd>
        </dl>
    </section>
</main>
```

## Exercises

### Exercise 1: Create a Recipe Page
Create a complete recipe page that demonstrates proper use of headings, lists, and text formatting:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Classic Chocolate Chip Cookies Recipe</title>
</head>
<body>
    <!-- Your task: Create a recipe page with proper semantic structure -->
    <!-- Include: title, description, ingredients list, step-by-step instructions -->
    <!-- Use appropriate headings, emphasis, and list elements -->
</body>
</html>
```

### Exercise 2: Build a Technical Tutorial
Create a tutorial page explaining how to set up a development environment:

- Use proper heading hierarchy
- Include code examples with `<code>` and `<pre>` elements
- Add quotes from documentation or experts
- Structure content with appropriate lists
- Include accessibility considerations

### Exercise 3: Design a Team Page
Create a team member showcase using description lists and proper text elements:

- Team member names and roles
- Biographical information
- Skills and expertise
- Contact information
- Proper use of emphasis and importance

### Assessment Criteria
For each exercise, ensure:
- [ ] Proper heading hierarchy (h1-h6)
- [ ] Appropriate use of semantic text elements
- [ ] Well-structured lists (ul, ol, dl)
- [ ] Correct use of emphasis vs importance
- [ ] Proper quotation and citation markup
- [ ] Code elements used appropriately
- [ ] Accessibility considerations included
- [ ] Valid HTML5 structure
- [ ] Readable and meaningful content organization
