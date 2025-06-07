# Tables and Lists - Complete Guide

## Understanding Lists

### Unordered Lists (Bullet Points)
```html
<!-- Basic unordered list -->
<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>

<!-- List with nested content -->
<ul>
    <li>
        <strong>Web Development</strong>
        <p>Learn to build websites and web applications</p>
    </li>
    <li>
        <strong>Mobile Development</strong>
        <p>Create apps for iOS and Android platforms</p>
    </li>
    <li>
        <strong>Data Science</strong>
        <p>Analyze data and build machine learning models</p>
    </li>
</ul>

<!-- Nested lists -->
<ul>
    <li>Frontend Technologies
        <ul>
            <li>HTML5</li>
            <li>CSS3
                <ul>
                    <li>Flexbox</li>
                    <li>Grid</li>
                    <li>Animations</li>
                </ul>
            </li>
            <li>JavaScript
                <ul>
                    <li>ES6+ Features</li>
                    <li>DOM Manipulation</li>
                    <li>Async Programming</li>
                </ul>
            </li>
        </ul>
    </li>
    <li>Backend Technologies
        <ul>
            <li>Node.js</li>
            <li>Python
                <ul>
                    <li>Django</li>
                    <li>Flask</li>
                    <li>FastAPI</li>
                </ul>
            </li>
            <li>Databases
                <ul>
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>Redis</li>
                </ul>
            </li>
        </ul>
    </li>
</ul>

<!-- List with different content types -->
<ul class="feature-list">
    <li>
        <img src="icons/fast.svg" alt="Speed icon">
        <h3>Lightning Fast</h3>
        <p>Our platform delivers content in milliseconds</p>
    </li>
    <li>
        <img src="icons/secure.svg" alt="Security icon">
        <h3>Highly Secure</h3>
        <p>Enterprise-grade security protects your data</p>
    </li>
    <li>
        <img src="icons/scalable.svg" alt="Scalability icon">
        <h3>Infinitely Scalable</h3>
        <p>Grows with your business needs automatically</p>
    </li>
</ul>
```

### Ordered Lists (Numbered)
```html
<!-- Basic ordered list -->
<ol>
    <li>Plan your project</li>
    <li>Design the layout</li>
    <li>Write the code</li>
    <li>Test thoroughly</li>
    <li>Deploy to production</li>
</ol>

<!-- Custom numbering -->
<ol start="5">
    <li>Advanced JavaScript concepts</li>
    <li>React.js fundamentals</li>
    <li>State management</li>
</ol>

<!-- Reversed numbering -->
<ol reversed>
    <li>Deploy application</li>
    <li>Final testing</li>
    <li>Code review</li>
    <li>Initial development</li>
    <li>Project planning</li>
</ol>

<!-- Different numbering types -->
<ol type="A">
    <li>Section A: Introduction</li>
    <li>Section B: Main Content</li>
    <li>Section C: Conclusion</li>
</ol>

<ol type="I">
    <li>Chapter I: Beginning</li>
    <li>Chapter II: Development</li>
    <li>Chapter III: Resolution</li>
</ol>

<ol type="a">
    <li>subsection a</li>
    <li>subsection b</li>
    <li>subsection c</li>
</ol>

<ol type="i">
    <li>point i</li>
    <li>point ii</li>
    <li>point iii</li>
</ol>

<!-- Recipe example with detailed steps -->
<article>
    <h2>Chocolate Chip Cookies Recipe</h2>
    
    <section>
        <h3>Ingredients</h3>
        <ul>
            <li>2¼ cups all-purpose flour</li>
            <li>1 tsp baking soda</li>
            <li>1 tsp salt</li>
            <li>1 cup butter, softened</li>
            <li>¾ cup granulated sugar</li>
            <li>¾ cup packed brown sugar</li>
            <li>2 large eggs</li>
            <li>2 tsp vanilla extract</li>
            <li>2 cups chocolate chips</li>
        </ul>
    </section>
    
    <section>
        <h3>Instructions</h3>
        <ol>
            <li>
                <strong>Preheat oven</strong> to 375°F (190°C)
                <p>Make sure your oven is fully preheated before baking</p>
            </li>
            <li>
                <strong>Mix dry ingredients</strong>
                <p>In a medium bowl, whisk together flour, baking soda, and salt</p>
            </li>
            <li>
                <strong>Cream butter and sugars</strong>
                <p>Beat softened butter with both sugars until light and fluffy (about 2-3 minutes)</p>
            </li>
            <li>
                <strong>Add eggs and vanilla</strong>
                <p>Beat in eggs one at a time, then add vanilla extract</p>
            </li>
            <li>
                <strong>Combine wet and dry ingredients</strong>
                <p>Gradually mix in the flour mixture until just combined</p>
            </li>
            <li>
                <strong>Fold in chocolate chips</strong>
                <p>Gently stir in chocolate chips with a wooden spoon</p>
            </li>
            <li>
                <strong>Shape and bake</strong>
                <p>Drop rounded tablespoons of dough onto ungreased baking sheets. Bake for 9-11 minutes until golden brown.</p>
            </li>
            <li>
                <strong>Cool and enjoy</strong>
                <p>Let cool on baking sheet for 2 minutes, then transfer to wire rack</p>
            </li>
        </ol>
    </section>
</article>
```

### Description Lists
```html
<!-- Basic description list -->
<dl>
    <dt>HTML</dt>
    <dd>HyperText Markup Language - the structure of web pages</dd>
    
    <dt>CSS</dt>
    <dd>Cascading Style Sheets - controls the presentation and layout</dd>
    
    <dt>JavaScript</dt>
    <dd>Programming language that adds interactivity to web pages</dd>
</dl>

<!-- Multiple descriptions for one term -->
<dl>
    <dt>JavaScript</dt>
    <dd>A high-level programming language</dd>
    <dd>Interpreted and dynamic</dd>
    <dd>Prototype-based object-oriented</dd>
    <dd>Supports functional programming</dd>
</dl>

<!-- Multiple terms for one description -->
<dl>
    <dt>Frontend</dt>
    <dt>Client-side</dt>
    <dt>UI</dt>
    <dd>The user-facing part of a web application</dd>
    
    <dt>Backend</dt>
    <dt>Server-side</dt>
    <dt>API</dt>
    <dd>The server logic and database interactions</dd>
</dl>

<!-- Complex description list with nested content -->
<dl class="glossary">
    <dt id="responsive-design">Responsive Design</dt>
    <dd>
        <p>An approach to web design that makes web pages render well on a variety of devices and window or screen sizes.</p>
        <p><strong>Key principles:</strong></p>
        <ul>
            <li>Flexible layouts</li>
            <li>Flexible images and media</li>
            <li>Media queries</li>
        </ul>
        <p><em>See also:</em> <a href="#mobile-first">Mobile First</a></p>
    </dd>
    
    <dt id="mobile-first">Mobile First</dt>
    <dd>
        <p>A design strategy that starts with designing for mobile devices and then progressively enhancing for larger screens.</p>
        <p><strong>Benefits:</strong></p>
        <ol>
            <li>Better performance on mobile devices</li>
            <li>Forces focus on essential content</li>
            <li>Future-proof approach</li>
        </ol>
    </dd>
</dl>

<!-- FAQ using description lists -->
<section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <dl>
        <dt>What is the difference between HTML elements and tags?</dt>
        <dd>
            <p>HTML <strong>tags</strong> are the markup syntax (like <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code>), while <strong>elements</strong> are the complete structure including the opening tag, content, and closing tag.</p>
        </dd>
        
        <dt>Do I need to close all HTML tags?</dt>
        <dd>
            <p>Most HTML tags need to be closed, but some are self-closing (like <code>&lt;img&gt;</code>, <code>&lt;br&gt;</code>, <code>&lt;hr&gt;</code>). In XHTML and when writing HTML with XML syntax, all tags must be properly closed.</p>
        </dd>
        
        <dt>What's the difference between class and id attributes?</dt>
        <dd>
            <p>The <code>id</code> attribute should be unique on a page and is used for specific targeting, while <code>class</code> can be used multiple times and is for grouping elements with similar styling or behavior.</p>
        </dd>
    </dl>
</section>
```

## Understanding Tables

### Basic Table Structure
```html
<!-- Simple table -->
<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
        <th>City</th>
    </tr>
    <tr>
        <td>Alice Johnson</td>
        <td>28</td>
        <td>New York</td>
    </tr>
    <tr>
        <td>Bob Smith</td>
        <td>34</td>
        <td>Los Angeles</td>
    </tr>
    <tr>
        <td>Carol Davis</td>
        <td>29</td>
        <td>Chicago</td>
    </tr>
</table>

<!-- Table with proper semantic structure -->
<table>
    <caption>Employee Information - Q4 2023</caption>
    <thead>
        <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Full Name</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Start Date</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>001</td>
            <td>Alice Johnson</td>
            <td>Engineering</td>
            <td>$85,000</td>
            <td>2022-03-15</td>
        </tr>
        <tr>
            <td>002</td>
            <td>Bob Smith</td>
            <td>Marketing</td>
            <td>$65,000</td>
            <td>2021-07-22</td>
        </tr>
        <tr>
            <td>003</td>
            <td>Carol Davis</td>
            <td>Design</td>
            <td>$70,000</td>
            <td>2023-01-10</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Total Employees</td>
            <td colspan="2">3 people</td>
        </tr>
    </tfoot>
</table>
```

### Advanced Table Features
```html
<!-- Table with column and row spanning -->
<table class="schedule">
    <caption>Weekly Class Schedule</caption>
    <thead>
        <tr>
            <th scope="col">Time</th>
            <th scope="col">Monday</th>
            <th scope="col">Tuesday</th>
            <th scope="col">Wednesday</th>
            <th scope="col">Thursday</th>
            <th scope="col">Friday</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">9:00 AM</th>
            <td>Math</td>
            <td>Science</td>
            <td>Math</td>
            <td>Science</td>
            <td>Math</td>
        </tr>
        <tr>
            <th scope="row">10:00 AM</th>
            <td colspan="2">Assembly</td>
            <td>English</td>
            <td>Art</td>
            <td>English</td>
        </tr>
        <tr>
            <th scope="row">11:00 AM</th>
            <td>English</td>
            <td>Math</td>
            <td rowspan="2">Lab Work</td>
            <td>Music</td>
            <td>Science</td>
        </tr>
        <tr>
            <th scope="row">12:00 PM</th>
            <td colspan="2">Lunch Break</td>
            <td>Lunch</td>
            <td>Lunch</td>
        </tr>
    </tbody>
</table>

<!-- Financial data table with complex headers -->
<table class="financial-report">
    <caption>
        Quarterly Financial Report - 2023
        <details>
            <summary>Table Description</summary>
            <p>This table shows revenue, expenses, and profit for each quarter of 2023, broken down by department.</p>
        </details>
    </caption>
    
    <thead>
        <tr>
            <th rowspan="2" scope="col">Department</th>
            <th colspan="3" scope="colgroup">Q1 2023</th>
            <th colspan="3" scope="colgroup">Q2 2023</th>
            <th colspan="3" scope="colgroup">Q3 2023</th>
            <th colspan="3" scope="colgroup">Q4 2023</th>
        </tr>
        <tr>
            <th scope="col">Revenue</th>
            <th scope="col">Expenses</th>
            <th scope="col">Profit</th>
            <th scope="col">Revenue</th>
            <th scope="col">Expenses</th>
            <th scope="col">Profit</th>
            <th scope="col">Revenue</th>
            <th scope="col">Expenses</th>
            <th scope="col">Profit</th>
            <th scope="col">Revenue</th>
            <th scope="col">Expenses</th>
            <th scope="col">Profit</th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <th scope="row">Sales</th>
            <td>$450K</td>
            <td>$200K</td>
            <td>$250K</td>
            <td>$520K</td>
            <td>$230K</td>
            <td>$290K</td>
            <td>$580K</td>
            <td>$250K</td>
            <td>$330K</td>
            <td>$620K</td>
            <td>$270K</td>
            <td>$350K</td>
        </tr>
        <tr>
            <th scope="row">Marketing</th>
            <td>$150K</td>
            <td>$120K</td>
            <td>$30K</td>
            <td>$180K</td>
            <td>$140K</td>
            <td>$40K</td>
            <td>$200K</td>
            <td>$160K</td>
            <td>$40K</td>
            <td>$220K</td>
            <td>$180K</td>
            <td>$40K</td>
        </tr>
        <tr>
            <th scope="row">Development</th>
            <td>$300K</td>
            <td>$280K</td>
            <td>$20K</td>
            <td>$350K</td>
            <td>$310K</td>
            <td>$40K</td>
            <td>$400K</td>
            <td>$340K</td>
            <td>$60K</td>
            <td>$450K</td>
            <td>$370K</td>
            <td>$80K</td>
        </tr>
    </tbody>
    
    <tfoot>
        <tr>
            <th scope="row">Total</th>
            <td>$900K</td>
            <td>$600K</td>
            <td>$300K</td>
            <td>$1050K</td>
            <td>$680K</td>
            <td>$370K</td>
            <td>$1180K</td>
            <td>$750K</td>
            <td>$430K</td>
            <td>$1290K</td>
            <td>$820K</td>
            <td>$470K</td>
        </tr>
    </tfoot>
</table>
```

### Accessible Tables
```html
<!-- Table with comprehensive accessibility features -->
<table id="product-comparison" 
       aria-labelledby="comparison-title"
       aria-describedby="comparison-desc">
    
    <caption id="comparison-title">
        Smartphone Comparison Chart
        <div id="comparison-desc" class="table-description">
            Compare features, pricing, and specifications across three popular smartphone models
        </div>
    </caption>
    
    <thead>
        <tr>
            <th scope="col">Feature</th>
            <th scope="col">
                <img src="phone1.jpg" alt="iPhone 15 Pro">
                iPhone 15 Pro
            </th>
            <th scope="col">
                <img src="phone2.jpg" alt="Samsung Galaxy S23">
                Samsung Galaxy S23
            </th>
            <th scope="col">
                <img src="phone3.jpg" alt="Google Pixel 8">
                Google Pixel 8
            </th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <th scope="row">Price</th>
            <td>
                <span class="price">$999</span>
                <span class="currency">USD</span>
            </td>
            <td>
                <span class="price">$799</span>
                <span class="currency">USD</span>
            </td>
            <td>
                <span class="price">$699</span>
                <span class="currency">USD</span>
            </td>
        </tr>
        
        <tr>
            <th scope="row">Screen Size</th>
            <td>6.1 inches</td>
            <td>6.1 inches</td>
            <td>6.2 inches</td>
        </tr>
        
        <tr>
            <th scope="row">Camera</th>
            <td>
                <ul class="feature-list">
                    <li>48MP main</li>
                    <li>12MP ultrawide</li>
                    <li>12MP telephoto</li>
                </ul>
            </td>
            <td>
                <ul class="feature-list">
                    <li>50MP main</li>
                    <li>12MP ultrawide</li>
                    <li>10MP telephoto</li>
                </ul>
            </td>
            <td>
                <ul class="feature-list">
                    <li>50MP main</li>
                    <li>12MP ultrawide</li>
                </ul>
            </td>
        </tr>
        
        <tr>
            <th scope="row">Battery Life</th>
            <td>
                <span class="rating" aria-label="4 out of 5 stars">★★★★☆</span>
                <span class="text">Up to 23 hours video</span>
            </td>
            <td>
                <span class="rating" aria-label="4 out of 5 stars">★★★★☆</span>
                <span class="text">Up to 22 hours video</span>
            </td>
            <td>
                <span class="rating" aria-label="5 out of 5 stars">★★★★★</span>
                <span class="text">Up to 24 hours video</span>
            </td>
        </tr>
        
        <tr>
            <th scope="row">Storage Options</th>
            <td>128GB, 256GB, 512GB, 1TB</td>
            <td>128GB, 256GB, 512GB</td>
            <td>128GB, 256GB</td>
        </tr>
        
        <tr>
            <th scope="row">5G Support</th>
            <td>
                <span class="checkmark" aria-label="Yes">✓</span>
                <span class="sr-only">Yes</span>
            </td>
            <td>
                <span class="checkmark" aria-label="Yes">✓</span>
                <span class="sr-only">Yes</span>
            </td>
            <td>
                <span class="checkmark" aria-label="Yes">✓</span>
                <span class="sr-only">Yes</span>
            </td>
        </tr>
        
        <tr>
            <th scope="row">Water Resistance</th>
            <td>IP68</td>
            <td>IP68</td>
            <td>IP68</td>
        </tr>
    </tbody>
    
    <tfoot>
        <tr>
            <th scope="row">Overall Rating</th>
            <td>
                <span class="rating" aria-label="4.5 out of 5 stars">★★★★⯨</span>
                <span class="rating-text">4.5/5</span>
            </td>
            <td>
                <span class="rating" aria-label="4 out of 5 stars">★★★★☆</span>
                <span class="rating-text">4.0/5</span>
            </td>
            <td>
                <span class="rating" aria-label="4.2 out of 5 stars">★★★★⯨</span>
                <span class="rating-text">4.2/5</span>
            </td>
        </tr>
    </tfoot>
</table>

<!-- Data table with sortable headers -->
<table class="sortable-table" id="employee-table">
    <caption>
        Employee Directory
        <div class="table-controls">
            <label for="table-filter">Filter employees:</label>
            <input type="search" 
                   id="table-filter" 
                   placeholder="Search by name or department..."
                   aria-controls="employee-table">
        </div>
    </caption>
    
    <thead>
        <tr>
            <th scope="col" 
                aria-sort="none"
                tabindex="0"
                role="button"
                aria-label="Sort by employee name">
                Employee Name
                <span class="sort-indicator" aria-hidden="true"></span>
            </th>
            <th scope="col" 
                aria-sort="none"
                tabindex="0"
                role="button"
                aria-label="Sort by department">
                Department
                <span class="sort-indicator" aria-hidden="true"></span>
            </th>
            <th scope="col" 
                aria-sort="none"
                tabindex="0"
                role="button"
                aria-label="Sort by hire date">
                Hire Date
                <span class="sort-indicator" aria-hidden="true"></span>
            </th>
            <th scope="col" 
                aria-sort="none"
                tabindex="0"
                role="button"
                aria-label="Sort by salary">
                Salary
                <span class="sort-indicator" aria-hidden="true"></span>
            </th>
        </tr>
    </thead>
    
    <tbody>
        <tr>
            <th scope="row">Alice Johnson</th>
            <td>Engineering</td>
            <td>
                <time datetime="2022-03-15">March 15, 2022</time>
            </td>
            <td>$85,000</td>
        </tr>
        <tr>
            <th scope="row">Bob Smith</th>
            <td>Marketing</td>
            <td>
                <time datetime="2021-07-22">July 22, 2021</time>
            </td>
            <td>$65,000</td>
        </tr>
        <tr>
            <th scope="row">Carol Davis</th>
            <td>Design</td>
            <td>
                <time datetime="2023-01-10">January 10, 2023</time>
            </td>
            <td>$70,000</td>
        </tr>
    </tbody>
</table>
```

### Responsive Table Techniques
```html
<!-- Responsive table with horizontal scroll -->
<div class="table-container">
    <table class="responsive-table">
        <caption>Product Inventory - All Locations</caption>
        <thead>
            <tr>
                <th scope="col">Product ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Category</th>
                <th scope="col">Stock (NYC)</th>
                <th scope="col">Stock (LA)</th>
                <th scope="col">Stock (Chicago)</th>
                <th scope="col">Stock (Miami)</th>
                <th scope="col">Total Stock</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td data-label="Product ID">PRD-001</td>
                <td data-label="Product Name">Wireless Headphones</td>
                <td data-label="Category">Electronics</td>
                <td data-label="Stock (NYC)">45</td>
                <td data-label="Stock (LA)">32</td>
                <td data-label="Stock (Chicago)">28</td>
                <td data-label="Stock (Miami)">15</td>
                <td data-label="Total Stock">120</td>
                <td data-label="Unit Price">$99.99</td>
                <td data-label="Total Value">$11,998.80</td>
            </tr>
            <!-- More rows... -->
        </tbody>
    </table>
</div>

<!-- Table that transforms to cards on mobile -->
<table class="card-table">
    <caption class="visually-hidden">Customer Orders Summary</caption>
    <thead>
        <tr>
            <th scope="col">Order #</th>
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Total</th>
            <th scope="col">Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td data-label="Order #">
                <strong>#ORD-12345</strong>
            </td>
            <td data-label="Customer">
                <div class="customer-info">
                    <img src="avatar1.jpg" alt="" class="customer-avatar">
                    <span class="customer-name">John Doe</span>
                    <span class="customer-email">john@example.com</span>
                </div>
            </td>
            <td data-label="Date">
                <time datetime="2023-12-07">Dec 7, 2023</time>
            </td>
            <td data-label="Status">
                <span class="status-badge status-pending">Pending</span>
            </td>
            <td data-label="Total">
                <span class="amount">$299.99</span>
            </td>
            <td data-label="Actions">
                <div class="action-buttons">
                    <button type="button" class="btn-small">View</button>
                    <button type="button" class="btn-small">Edit</button>
                </div>
            </td>
        </tr>
        <!-- More rows... -->
    </tbody>
</table>
```

## Complex List and Table Examples

### Navigation Menu with Nested Lists
```html
<nav class="main-navigation" aria-label="Main navigation">
    <ul class="nav-menu">
        <li class="nav-item">
            <a href="/" class="nav-link">Home</a>
        </li>
        
        <li class="nav-item has-submenu">
            <a href="/products" 
               class="nav-link" 
               aria-expanded="false"
               aria-haspopup="true">
                Products
            </a>
            <ul class="submenu" aria-hidden="true">
                <li class="submenu-item">
                    <a href="/products/laptops" class="submenu-link">Laptops</a>
                </li>
                <li class="submenu-item">
                    <a href="/products/desktops" class="submenu-link">Desktops</a>
                </li>
                <li class="submenu-item has-submenu">
                    <a href="/products/accessories" 
                       class="submenu-link"
                       aria-expanded="false"
                       aria-haspopup="true">
                        Accessories
                    </a>
                    <ul class="sub-submenu" aria-hidden="true">
                        <li><a href="/products/accessories/mice">Mice</a></li>
                        <li><a href="/products/accessories/keyboards">Keyboards</a></li>
                        <li><a href="/products/accessories/monitors">Monitors</a></li>
                    </ul>
                </li>
            </ul>
        </li>
        
        <li class="nav-item">
            <a href="/services" class="nav-link">Services</a>
        </li>
        
        <li class="nav-item">
            <a href="/support" class="nav-link">Support</a>
        </li>
        
        <li class="nav-item">
            <a href="/contact" class="nav-link">Contact</a>
        </li>
    </ul>
</nav>
```

### Product Listing with Rich Content
```html
<section class="product-grid">
    <h2>Featured Products</h2>
    
    <ul class="products-list">
        <li class="product-card">
            <article>
                <header class="product-header">
                    <img src="laptop-pro.jpg" 
                         alt="MacBook Pro 16-inch laptop"
                         class="product-image">
                    <div class="product-badges">
                        <span class="badge badge-new">New</span>
                        <span class="badge badge-sale">20% Off</span>
                    </div>
                </header>
                
                <div class="product-content">
                    <h3 class="product-title">
                        <a href="/products/macbook-pro-16">MacBook Pro 16"</a>
                    </h3>
                    
                    <div class="product-rating">
                        <span class="stars" aria-label="4.5 out of 5 stars">
                            ★★★★⯨
                        </span>
                        <span class="rating-count">(127 reviews)</span>
                    </div>
                    
                    <p class="product-description">
                        Powerful laptop with M3 Pro chip, 18GB unified memory, 
                        and all-day battery life.
                    </p>
                    
                    <dl class="product-specs">
                        <dt>Processor</dt>
                        <dd>Apple M3 Pro chip</dd>
                        
                        <dt>Memory</dt>
                        <dd>18GB unified memory</dd>
                        
                        <dt>Storage</dt>
                        <dd>512GB SSD</dd>
                        
                        <dt>Display</dt>
                        <dd>16.2-inch Liquid Retina XDR</dd>
                    </dl>
                </div>
                
                <footer class="product-footer">
                    <div class="pricing">
                        <span class="current-price">$2,399</span>
                        <span class="original-price">$2,999</span>
                    </div>
                    
                    <div class="product-actions">
                        <button type="button" class="btn-primary">Add to Cart</button>
                        <button type="button" class="btn-secondary" aria-label="Add to wishlist">
                            ♡
                        </button>
                    </div>
                </footer>
            </article>
        </li>
        
        <!-- More product cards... -->
    </ul>
</section>
```

### Complex Data Table with Interactive Features
```html
<div class="data-table-wrapper">
    <div class="table-toolbar">
        <div class="table-filters">
            <label for="dept-filter">Department:</label>
            <select id="dept-filter" name="department">
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="sales">Sales</option>
            </select>
            
            <label for="status-filter">Status:</label>
            <select id="status-filter" name="status">
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
            </select>
        </div>
        
        <div class="table-actions">
            <button type="button" class="btn-export">Export CSV</button>
            <button type="button" class="btn-print">Print</button>
        </div>
    </div>
    
    <div class="table-container" role="region" aria-label="Employee data table" tabindex="0">
        <table class="data-table" 
               id="employees-table"
               aria-rowcount="156" 
               aria-colcount="8">
            
            <caption>
                Employee Database
                <div class="table-summary">
                    Showing <span id="visible-rows">10</span> of <span id="total-rows">156</span> employees
                </div>
            </caption>
            
            <thead>
                <tr aria-rowindex="1">
                    <th scope="col" 
                        aria-colindex="1"
                        aria-sort="none"
                        class="sortable">
                        <button type="button" class="sort-button">
                            Employee ID
                            <span class="sort-icon" aria-hidden="true">↕</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="2"
                        aria-sort="ascending"
                        class="sortable sorted">
                        <button type="button" class="sort-button">
                            Name
                            <span class="sort-icon" aria-hidden="true">↑</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="3"
                        aria-sort="none"
                        class="sortable">
                        <button type="button" class="sort-button">
                            Department
                            <span class="sort-icon" aria-hidden="true">↕</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="4"
                        aria-sort="none"
                        class="sortable">
                        <button type="button" class="sort-button">
                            Position
                            <span class="sort-icon" aria-hidden="true">↕</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="5"
                        aria-sort="none"
                        class="sortable">
                        <button type="button" class="sort-button">
                            Hire Date
                            <span class="sort-icon" aria-hidden="true">↕</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="6"
                        aria-sort="none"
                        class="sortable">
                        <button type="button" class="sort-button">
                            Salary
                            <span class="sort-icon" aria-hidden="true">↕</span>
                        </button>
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="7">
                        Status
                    </th>
                    
                    <th scope="col" 
                        aria-colindex="8">
                        Actions
                    </th>
                </tr>
            </thead>
            
            <tbody>
                <tr aria-rowindex="2">
                    <td aria-colindex="1">
                        <strong>EMP001</strong>
                    </td>
                    <td aria-colindex="2">
                        <div class="employee-info">
                            <img src="avatars/alice.jpg" 
                                 alt="" 
                                 class="employee-avatar">
                            <div class="employee-details">
                                <span class="employee-name">Alice Johnson</span>
                                <span class="employee-email">alice@company.com</span>
                            </div>
                        </div>
                    </td>
                    <td aria-colindex="3">Engineering</td>
                    <td aria-colindex="4">Senior Developer</td>
                    <td aria-colindex="5">
                        <time datetime="2022-03-15">Mar 15, 2022</time>
                    </td>
                    <td aria-colindex="6">
                        <span class="salary">$95,000</span>
                    </td>
                    <td aria-colindex="7">
                        <span class="status-badge status-active">Active</span>
                    </td>
                    <td aria-colindex="8">
                        <div class="action-menu">
                            <button type="button" 
                                    class="action-trigger"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    aria-label="Actions for Alice Johnson">
                                ⋮
                            </button>
                            <ul class="action-list" role="menu" aria-hidden="true">
                                <li role="none">
                                    <button type="button" role="menuitem">View Profile</button>
                                </li>
                                <li role="none">
                                    <button type="button" role="menuitem">Edit</button>
                                </li>
                                <li role="none">
                                    <button type="button" role="menuitem">Deactivate</button>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                
                <!-- More employee rows... -->
            </tbody>
        </table>
    </div>
    
    <div class="table-pagination">
        <div class="pagination-info">
            Showing 1-10 of 156 employees
        </div>
        
        <nav aria-label="Table pagination">
            <ul class="pagination">
                <li>
                    <button type="button" disabled>Previous</button>
                </li>
                <li>
                    <button type="button" aria-current="page" class="current">1</button>
                </li>
                <li>
                    <button type="button">2</button>
                </li>
                <li>
                    <button type="button">3</button>
                </li>
                <li>
                    <span>...</span>
                </li>
                <li>
                    <button type="button">16</button>
                </li>
                <li>
                    <button type="button">Next</button>
                </li>
            </ul>
        </nav>
    </div>
</div>
```

This comprehensive lesson covers all aspects of lists and tables in HTML, from basic structure to advanced accessibility features and responsive design patterns.
