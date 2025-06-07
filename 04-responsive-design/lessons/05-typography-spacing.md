# Typography & Spacing Systems

## Responsive Typography Fundamentals

Responsive typography ensures readability and visual hierarchy across all devices while maintaining brand consistency and accessibility standards.

### The Challenge of Responsive Text

```css
/* Problems with fixed typography */
.title {
    font-size: 48px; /* Too large on mobile, too small on 4K displays */
    line-height: 1.2; /* May be too tight on mobile */
    margin-bottom: 24px; /* Fixed spacing doesn't scale */
}

/* Responsive typography solutions */
.responsive-title {
    /* Fluid typography using clamp() */
    font-size: clamp(1.5rem, 4vw, 3rem);
    line-height: clamp(1.2, 1.4, 1.6);
    margin-bottom: clamp(1rem, 3vw, 2rem);
}
```

## Modern Fluid Typography

### CSS clamp() Function

```css
/* Typography scale using clamp() */
:root {
    /* Fluid font sizes */
    --font-size-xs: clamp(0.75rem, 0.69rem + 0.32vw, 0.875rem);
    --font-size-sm: clamp(0.875rem, 0.81rem + 0.32vw, 1rem);
    --font-size-base: clamp(1rem, 0.93rem + 0.32vw, 1.125rem);
    --font-size-lg: clamp(1.125rem, 1rem + 0.64vw, 1.375rem);
    --font-size-xl: clamp(1.25rem, 1.09rem + 0.81vw, 1.625rem);
    --font-size-2xl: clamp(1.5rem, 1.24rem + 1.29vw, 2.125rem);
    --font-size-3xl: clamp(1.875rem, 1.48rem + 1.94vw, 2.75rem);
    --font-size-4xl: clamp(2.25rem, 1.71rem + 2.74vw, 3.5rem);
    --font-size-5xl: clamp(2.75rem, 2rem + 3.75vw, 4.5rem);
    
    /* Fluid spacing */
    --space-xs: clamp(0.25rem, 0.23rem + 0.11vw, 0.3125rem);
    --space-sm: clamp(0.5rem, 0.46rem + 0.21vw, 0.625rem);
    --space-md: clamp(1rem, 0.93rem + 0.32vw, 1.125rem);
    --space-lg: clamp(1.5rem, 1.39rem + 0.54vw, 1.75rem);
    --space-xl: clamp(2rem, 1.79rem + 1.07vw, 2.5rem);
    --space-2xl: clamp(3rem, 2.57rem + 2.14vw, 4rem);
    --space-3xl: clamp(4rem, 3.36rem + 3.21vw, 5.5rem);
    
    /* Fluid line heights */
    --line-height-tight: clamp(1.1, 1.2, 1.3);
    --line-height-normal: clamp(1.4, 1.5, 1.6);
    --line-height-relaxed: clamp(1.6, 1.7, 1.8);
}

/* Typography classes */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
.text-4xl { font-size: var(--font-size-4xl); }
.text-5xl { font-size: var(--font-size-5xl); }

/* Spacing utilities */
.space-xs { margin: var(--space-xs); }
.space-sm { margin: var(--space-sm); }
.space-md { margin: var(--space-md); }
.space-lg { margin: var(--space-lg); }
.space-xl { margin: var(--space-xl); }
.space-2xl { margin: var(--space-2xl); }
.space-3xl { margin: var(--space-3xl); }
```

### Advanced Typography System

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Typography System</title>
    
    <style>
        /* Typography foundation */
        :root {
            /* Base font settings */
            --font-family-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            --font-family-serif: Georgia, 'Times New Roman', Times, serif;
            --font-family-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
            
            /* Fluid typography scale */
            --font-size-xs: clamp(0.75rem, 0.69rem + 0.32vw, 0.875rem);
            --font-size-sm: clamp(0.875rem, 0.81rem + 0.32vw, 1rem);
            --font-size-base: clamp(1rem, 0.93rem + 0.32vw, 1.125rem);
            --font-size-lg: clamp(1.125rem, 1rem + 0.64vw, 1.375rem);
            --font-size-xl: clamp(1.25rem, 1.09rem + 0.81vw, 1.625rem);
            --font-size-2xl: clamp(1.5rem, 1.24rem + 1.29vw, 2.125rem);
            --font-size-3xl: clamp(1.875rem, 1.48rem + 1.94vw, 2.75rem);
            --font-size-4xl: clamp(2.25rem, 1.71rem + 2.74vw, 3.5rem);
            --font-size-5xl: clamp(2.75rem, 2rem + 3.75vw, 4.5rem);
            --font-size-6xl: clamp(3.5rem, 2.5rem + 5vw, 6rem);
            
            /* Font weights */
            --font-weight-thin: 100;
            --font-weight-light: 300;
            --font-weight-normal: 400;
            --font-weight-medium: 500;
            --font-weight-semibold: 600;
            --font-weight-bold: 700;
            --font-weight-extrabold: 800;
            --font-weight-black: 900;
            
            /* Line heights */
            --line-height-none: 1;
            --line-height-tight: 1.25;
            --line-height-snug: 1.375;
            --line-height-normal: 1.5;
            --line-height-relaxed: 1.625;
            --line-height-loose: 2;
            
            /* Letter spacing */
            --letter-spacing-tighter: -0.05em;
            --letter-spacing-tight: -0.025em;
            --letter-spacing-normal: 0;
            --letter-spacing-wide: 0.025em;
            --letter-spacing-wider: 0.05em;
            --letter-spacing-widest: 0.1em;
            
            /* Spacing scale */
            --space-px: 1px;
            --space-0: 0;
            --space-1: clamp(0.25rem, 0.23rem + 0.11vw, 0.3125rem);
            --space-2: clamp(0.5rem, 0.46rem + 0.21vw, 0.625rem);
            --space-3: clamp(0.75rem, 0.69rem + 0.32vw, 0.9375rem);
            --space-4: clamp(1rem, 0.93rem + 0.32vw, 1.25rem);
            --space-5: clamp(1.25rem, 1.16rem + 0.43vw, 1.5625rem);
            --space-6: clamp(1.5rem, 1.39rem + 0.54vw, 1.875rem);
            --space-8: clamp(2rem, 1.86rem + 0.71vw, 2.5rem);
            --space-10: clamp(2.5rem, 2.32rem + 0.89vw, 3.125rem);
            --space-12: clamp(3rem, 2.79rem + 1.07vw, 3.75rem);
            --space-16: clamp(4rem, 3.71rem + 1.43vw, 5rem);
            --space-20: clamp(5rem, 4.64rem + 1.79vw, 6.25rem);
            --space-24: clamp(6rem, 5.57rem + 2.14vw, 7.5rem);
            --space-32: clamp(8rem, 7.43rem + 2.86vw, 10rem);
            
            /* Colors */
            --color-text-primary: #1f2937;
            --color-text-secondary: #6b7280;
            --color-text-muted: #9ca3af;
            --color-accent: #3b82f6;
        }
        
        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            :root {
                --color-text-primary: #f9fafb;
                --color-text-secondary: #d1d5db;
                --color-text-muted: #9ca3af;
                --color-accent: #60a5fa;
            }
        }
        
        /* Base typography */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: var(--font-family-sans);
            font-size: var(--font-size-base);
            line-height: var(--line-height-normal);
            color: var(--color-text-primary);
            background-color: #ffffff;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #111827;
            }
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 var(--space-4);
        }
        
        /* Heading hierarchy */
        h1, .h1 {
            font-size: var(--font-size-5xl);
            font-weight: var(--font-weight-bold);
            line-height: var(--line-height-tight);
            letter-spacing: var(--letter-spacing-tight);
            margin-bottom: var(--space-6);
            color: var(--color-text-primary);
        }
        
        h2, .h2 {
            font-size: var(--font-size-4xl);
            font-weight: var(--font-weight-semibold);
            line-height: var(--line-height-tight);
            letter-spacing: var(--letter-spacing-tight);
            margin-bottom: var(--space-5);
            color: var(--color-text-primary);
        }
        
        h3, .h3 {
            font-size: var(--font-size-3xl);
            font-weight: var(--font-weight-semibold);
            line-height: var(--line-height-snug);
            margin-bottom: var(--space-4);
            color: var(--color-text-primary);
        }
        
        h4, .h4 {
            font-size: var(--font-size-2xl);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-snug);
            margin-bottom: var(--space-3);
            color: var(--color-text-primary);
        }
        
        h5, .h5 {
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-normal);
            margin-bottom: var(--space-2);
            color: var(--color-text-primary);
        }
        
        h6, .h6 {
            font-size: var(--font-size-lg);
            font-weight: var(--font-weight-medium);
            line-height: var(--line-height-normal);
            margin-bottom: var(--space-2);
            color: var(--color-text-secondary);
        }
        
        /* Body text styles */
        p {
            font-size: var(--font-size-base);
            line-height: var(--line-height-relaxed);
            margin-bottom: var(--space-4);
            color: var(--color-text-secondary);
        }
        
        .lead {
            font-size: var(--font-size-xl);
            font-weight: var(--font-weight-light);
            line-height: var(--line-height-relaxed);
            margin-bottom: var(--space-6);
            color: var(--color-text-primary);
        }
        
        .small {
            font-size: var(--font-size-sm);
            color: var(--color-text-muted);
        }
        
        /* Typography utilities */
        .font-sans { font-family: var(--font-family-sans); }
        .font-serif { font-family: var(--font-family-serif); }
        .font-mono { font-family: var(--font-family-mono); }
        
        .font-thin { font-weight: var(--font-weight-thin); }
        .font-light { font-weight: var(--font-weight-light); }
        .font-normal { font-weight: var(--font-weight-normal); }
        .font-medium { font-weight: var(--font-weight-medium); }
        .font-semibold { font-weight: var(--font-weight-semibold); }
        .font-bold { font-weight: var(--font-weight-bold); }
        .font-extrabold { font-weight: var(--font-weight-extrabold); }
        .font-black { font-weight: var(--font-weight-black); }
        
        .leading-none { line-height: var(--line-height-none); }
        .leading-tight { line-height: var(--line-height-tight); }
        .leading-snug { line-height: var(--line-height-snug); }
        .leading-normal { line-height: var(--line-height-normal); }
        .leading-relaxed { line-height: var(--line-height-relaxed); }
        .leading-loose { line-height: var(--line-height-loose); }
        
        .tracking-tighter { letter-spacing: var(--letter-spacing-tighter); }
        .tracking-tight { letter-spacing: var(--letter-spacing-tight); }
        .tracking-normal { letter-spacing: var(--letter-spacing-normal); }
        .tracking-wide { letter-spacing: var(--letter-spacing-wide); }
        .tracking-wider { letter-spacing: var(--letter-spacing-wider); }
        .tracking-widest { letter-spacing: var(--letter-spacing-widest); }
        
        /* Text alignment */
        .text-left { text-align: left; }
        .text-center { text-align: center; }
        .text-right { text-align: right; }
        .text-justify { text-align: justify; }
        
        /* Text colors */
        .text-primary { color: var(--color-text-primary); }
        .text-secondary { color: var(--color-text-secondary); }
        .text-muted { color: var(--color-text-muted); }
        .text-accent { color: var(--color-accent); }
        
        /* Spacing utilities */
        .m-0 { margin: 0; }
        .mt-0 { margin-top: 0; }
        .mr-0 { margin-right: 0; }
        .mb-0 { margin-bottom: 0; }
        .ml-0 { margin-left: 0; }
        .mx-0 { margin-left: 0; margin-right: 0; }
        .my-0 { margin-top: 0; margin-bottom: 0; }
        
        .m-1 { margin: var(--space-1); }
        .mt-1 { margin-top: var(--space-1); }
        .mr-1 { margin-right: var(--space-1); }
        .mb-1 { margin-bottom: var(--space-1); }
        .ml-1 { margin-left: var(--space-1); }
        .mx-1 { margin-left: var(--space-1); margin-right: var(--space-1); }
        .my-1 { margin-top: var(--space-1); margin-bottom: var(--space-1); }
        
        .m-2 { margin: var(--space-2); }
        .mt-2 { margin-top: var(--space-2); }
        .mr-2 { margin-right: var(--space-2); }
        .mb-2 { margin-bottom: var(--space-2); }
        .ml-2 { margin-left: var(--space-2); }
        .mx-2 { margin-left: var(--space-2); margin-right: var(--space-2); }
        .my-2 { margin-top: var(--space-2); margin-bottom: var(--space-2); }
        
        .m-4 { margin: var(--space-4); }
        .mt-4 { margin-top: var(--space-4); }
        .mr-4 { margin-right: var(--space-4); }
        .mb-4 { margin-bottom: var(--space-4); }
        .ml-4 { margin-left: var(--space-4); }
        .mx-4 { margin-left: var(--space-4); margin-right: var(--space-4); }
        .my-4 { margin-top: var(--space-4); margin-bottom: var(--space-4); }
        
        .m-6 { margin: var(--space-6); }
        .mt-6 { margin-top: var(--space-6); }
        .mr-6 { margin-right: var(--space-6); }
        .mb-6 { margin-bottom: var(--space-6); }
        .ml-6 { margin-left: var(--space-6); }
        .mx-6 { margin-left: var(--space-6); margin-right: var(--space-6); }
        .my-6 { margin-top: var(--space-6); margin-bottom: var(--space-6); }
        
        .m-8 { margin: var(--space-8); }
        .mt-8 { margin-top: var(--space-8); }
        .mr-8 { margin-right: var(--space-8); }
        .mb-8 { margin-bottom: var(--space-8); }
        .ml-8 { margin-left: var(--space-8); }
        .mx-8 { margin-left: var(--space-8); margin-right: var(--space-8); }
        .my-8 { margin-top: var(--space-8); margin-bottom: var(--space-8); }
        
        /* Padding utilities */
        .p-0 { padding: 0; }
        .pt-0 { padding-top: 0; }
        .pr-0 { padding-right: 0; }
        .pb-0 { padding-bottom: 0; }
        .pl-0 { padding-left: 0; }
        .px-0 { padding-left: 0; padding-right: 0; }
        .py-0 { padding-top: 0; padding-bottom: 0; }
        
        .p-1 { padding: var(--space-1); }
        .pt-1 { padding-top: var(--space-1); }
        .pr-1 { padding-right: var(--space-1); }
        .pb-1 { padding-bottom: var(--space-1); }
        .pl-1 { padding-left: var(--space-1); }
        .px-1 { padding-left: var(--space-1); padding-right: var(--space-1); }
        .py-1 { padding-top: var(--space-1); padding-bottom: var(--space-1); }
        
        .p-2 { padding: var(--space-2); }
        .pt-2 { padding-top: var(--space-2); }
        .pr-2 { padding-right: var(--space-2); }
        .pb-2 { padding-bottom: var(--space-2); }
        .pl-2 { padding-left: var(--space-2); }
        .px-2 { padding-left: var(--space-2); padding-right: var(--space-2); }
        .py-2 { padding-top: var(--space-2); padding-bottom: var(--space-2); }
        
        .p-4 { padding: var(--space-4); }
        .pt-4 { padding-top: var(--space-4); }
        .pr-4 { padding-right: var(--space-4); }
        .pb-4 { padding-bottom: var(--space-4); }
        .pl-4 { padding-left: var(--space-4); }
        .px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }
        .py-4 { padding-top: var(--space-4); padding-bottom: var(--space-4); }
        
        .p-6 { padding: var(--space-6); }
        .pt-6 { padding-top: var(--space-6); }
        .pr-6 { padding-right: var(--space-6); }
        .pb-6 { padding-bottom: var(--space-6); }
        .pl-6 { padding-left: var(--space-6); }
        .px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
        .py-6 { padding-top: var(--space-6); padding-bottom: var(--space-6); }
        
        .p-8 { padding: var(--space-8); }
        .pt-8 { padding-top: var(--space-8); }
        .pr-8 { padding-right: var(--space-8); }
        .pb-8 { padding-bottom: var(--space-8); }
        .pl-8 { padding-left: var(--space-8); }
        .px-8 { padding-left: var(--space-8); padding-right: var(--space-8); }
        .py-8 { padding-top: var(--space-8); padding-bottom: var(--space-8); }
        
        /* Content sections */
        .section {
            padding: var(--space-12) 0;
        }
        
        .section-sm {
            padding: var(--space-8) 0;
        }
        
        .section-lg {
            padding: var(--space-16) 0;
        }
        
        /* Cards and content blocks */
        .card {
            background: white;
            border-radius: 8px;
            padding: var(--space-6);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: var(--space-6);
            transition: box-shadow 0.3s ease;
        }
        
        @media (prefers-color-scheme: dark) {
            .card {
                background: #1f2937;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
            }
        }
        
        .card:hover {
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }
        
        /* Quote styles */
        blockquote {
            border-left: 4px solid var(--color-accent);
            padding: var(--space-4) var(--space-6);
            margin: var(--space-6) 0;
            background: rgba(59, 130, 246, 0.05);
            font-style: italic;
            font-size: var(--font-size-lg);
            line-height: var(--line-height-relaxed);
        }
        
        /* Code styles */
        code {
            font-family: var(--font-family-mono);
            font-size: 0.875em;
            background: rgba(59, 130, 246, 0.1);
            padding: 0.2em 0.4em;
            border-radius: 3px;
            color: var(--color-accent);
        }
        
        pre {
            font-family: var(--font-family-mono);
            background: #f8f9fa;
            padding: var(--space-4);
            border-radius: 6px;
            overflow-x: auto;
            margin: var(--space-4) 0;
            font-size: var(--font-size-sm);
            line-height: var(--line-height-relaxed);
        }
        
        @media (prefers-color-scheme: dark) {
            pre {
                background: #1f2937;
                color: #d1d5db;
            }
        }
        
        /* List styles */
        ul, ol {
            margin: var(--space-4) 0;
            padding-left: var(--space-6);
        }
        
        li {
            margin-bottom: var(--space-2);
            line-height: var(--line-height-relaxed);
        }
        
        /* Link styles */
        a {
            color: var(--color-accent);
            text-decoration: underline;
            text-decoration-thickness: 2px;
            text-underline-offset: 3px;
            transition: all 0.2s ease;
        }
        
        a:hover {
            text-decoration-thickness: 3px;
            text-underline-offset: 2px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 640px) {
            .container {
                padding: 0 var(--space-2);
            }
            
            h1, .h1 {
                font-size: var(--font-size-4xl);
            }
            
            h2, .h2 {
                font-size: var(--font-size-3xl);
            }
            
            .card {
                padding: var(--space-4);
            }
            
            blockquote {
                padding: var(--space-3) var(--space-4);
                margin: var(--space-4) 0;
            }
        }
        
        /* Print styles */
        @media print {
            body {
                font-size: 12pt;
                line-height: 1.4;
                color: #000;
            }
            
            h1 { font-size: 24pt; }
            h2 { font-size: 20pt; }
            h3 { font-size: 16pt; }
            h4 { font-size: 14pt; }
            h5 { font-size: 12pt; }
            h6 { font-size: 10pt; }
            
            .card {
                box-shadow: none;
                border: 1px solid #ccc;
            }
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
            * {
                transition: none !important;
                animation: none !important;
            }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
            a {
                text-decoration-thickness: 3px;
            }
            
            .card {
                border: 2px solid var(--color-text-primary);
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="section">
            <h1 class="text-center">Responsive Typography & Spacing</h1>
            <p class="lead text-center">
                A comprehensive system for fluid typography and spacing that adapts beautifully across all devices.
            </p>
        </header>
        
        <section class="section">
            <h2>Typography Scale</h2>
            <p>Our typography system uses fluid scaling with CSS clamp() to ensure optimal readability across all screen sizes.</p>
            
            <div class="card">
                <h1 class="mb-2">Heading 1 - Main Page Title</h1>
                <h2 class="mb-2">Heading 2 - Section Title</h2>
                <h3 class="mb-2">Heading 3 - Subsection Title</h3>
                <h4 class="mb-2">Heading 4 - Article Title</h4>
                <h5 class="mb-2">Heading 5 - Content Header</h5>
                <h6 class="mb-2">Heading 6 - Small Header</h6>
                
                <p class="lead">Lead paragraph - Introductory text that stands out from regular body text.</p>
                
                <p>Regular paragraph text with optimal line height and spacing for comfortable reading. This text scales fluidly based on viewport size.</p>
                
                <p class="small">Small text for captions, footnotes, and secondary information.</p>
            </div>
        </section>
        
        <section class="section">
            <h2>Font Families & Weights</h2>
            <p>Choose from three font families with multiple weight options:</p>
            
            <div class="card">
                <h3 class="font-sans">Sans-serif Font Family</h3>
                <div class="mb-4">
                    <p class="font-thin">Font weight: Thin (100)</p>
                    <p class="font-light">Font weight: Light (300)</p>
                    <p class="font-normal">Font weight: Normal (400)</p>
                    <p class="font-medium">Font weight: Medium (500)</p>
                    <p class="font-semibold">Font weight: Semibold (600)</p>
                    <p class="font-bold">Font weight: Bold (700)</p>
                    <p class="font-extrabold">Font weight: Extra Bold (800)</p>
                    <p class="font-black">Font weight: Black (900)</p>
                </div>
                
                <h3 class="font-serif">Serif Font Family</h3>
                <p class="font-serif">Traditional serif fonts for a more formal, elegant appearance. Perfect for long-form content and traditional designs.</p>
                
                <h3 class="font-mono">Monospace Font Family</h3>
                <p class="font-mono">Fixed-width fonts perfect for code examples, technical documentation, and data displays where alignment matters.</p>
            </div>
        </section>
        
        <section class="section">
            <h2>Line Height & Letter Spacing</h2>
            <p>Proper vertical rhythm and character spacing improve readability:</p>
            
            <div class="card">
                <h3>Line Height Variations</h3>
                <p class="leading-tight">Tight line height (1.25) - For headings and display text where space is limited.</p>
                <p class="leading-normal">Normal line height (1.5) - The default setting for most body text content.</p>
                <p class="leading-relaxed">Relaxed line height (1.625) - For improved readability in long-form content.</p>
                <p class="leading-loose">Loose line height (2.0) - For maximum readability and accessibility.</p>
                
                <h3 class="mt-6">Letter Spacing Options</h3>
                <p class="tracking-tight">Tight letter spacing for condensed layouts</p>
                <p class="tracking-normal">Normal letter spacing for regular text</p>
                <p class="tracking-wide">Wide letter spacing for emphasis</p>
                <p class="tracking-wider">Wider letter spacing for headings</p>
                <p class="tracking-widest">Widest spacing for dramatic effect</p>
            </div>
        </section>
        
        <section class="section">
            <h2>Spacing System</h2>
            <p>Consistent spacing creates visual harmony and improves content scanability:</p>
            
            <div class="card">
                <h3>Margin Examples</h3>
                <div style="background: #f3f4f6; padding: 1rem; margin-bottom: 1rem;">
                    <div class="m-1" style="background: #ddd6fe; padding: 0.5rem;">Margin 1</div>
                </div>
                <div style="background: #f3f4f6; padding: 1rem; margin-bottom: 1rem;">
                    <div class="m-2" style="background: #ddd6fe; padding: 0.5rem;">Margin 2</div>
                </div>
                <div style="background: #f3f4f6; padding: 1rem; margin-bottom: 1rem;">
                    <div class="m-4" style="background: #ddd6fe; padding: 0.5rem;">Margin 4</div>
                </div>
                <div style="background: #f3f4f6; padding: 1rem; margin-bottom: 1rem;">
                    <div class="m-6" style="background: #ddd6fe; padding: 0.5rem;">Margin 6</div>
                </div>
                
                <h3 class="mt-6">Padding Examples</h3>
                <div class="p-1" style="background: #fef3c7; margin-bottom: 0.5rem;">Padding 1</div>
                <div class="p-2" style="background: #fef3c7; margin-bottom: 0.5rem;">Padding 2</div>
                <div class="p-4" style="background: #fef3c7; margin-bottom: 0.5rem;">Padding 4</div>
                <div class="p-6" style="background: #fef3c7;">Padding 6</div>
            </div>
        </section>
        
        <section class="section">
            <h2>Text Alignment & Colors</h2>
            <div class="card">
                <p class="text-left">Left-aligned text for natural reading flow</p>
                <p class="text-center">Center-aligned text for headings and emphasis</p>
                <p class="text-right">Right-aligned text for special layouts</p>
                <p class="text-justify">Justified text creates clean edges on both sides, though it should be used sparingly as it can create uneven spacing between words.</p>
                
                <h3 class="mt-6">Color Variations</h3>
                <p class="text-primary">Primary text color for main content</p>
                <p class="text-secondary">Secondary text color for supporting content</p>
                <p class="text-muted">Muted text color for less important information</p>
                <p class="text-accent">Accent color for highlights and emphasis</p>
            </div>
        </section>
        
        <section class="section">
            <h2>Content Examples</h2>
            
            <div class="card">
                <h3>Blockquote Example</h3>
                <blockquote>
                    "Good typography is invisible. When done well, it allows content to shine without drawing attention to itself."
                </blockquote>
                
                <h3>Code Examples</h3>
                <p>Inline code: <code>font-size: clamp(1rem, 2.5vw, 1.5rem)</code></p>
                
                <pre><code>/* CSS Fluid Typography */
.heading {
    font-size: clamp(1.5rem, 4vw, 3rem);
    line-height: clamp(1.2, 1.4, 1.6);
    margin-bottom: clamp(1rem, 3vw, 2rem);
}</code></pre>
                
                <h3>List Examples</h3>
                <ul>
                    <li>Unordered list item with proper spacing</li>
                    <li>Another list item showing consistent rhythm</li>
                    <li>Final item demonstrating vertical spacing</li>
                </ul>
                
                <ol>
                    <li>Ordered list with numbered items</li>
                    <li>Sequential content organization</li>
                    <li>Clear hierarchy and spacing</li>
                </ol>
            </div>
        </section>
        
        <footer class="section text-center">
            <p class="text-muted">
                This typography system scales fluidly across all devices while maintaining optimal readability and visual hierarchy.
            </p>
        </footer>
    </div>
</body>
</html>
```

## Modular Scale Typography

### Mathematical Typography Scaling

```css
/* Perfect Fourth Scale (1.333) */
:root {
    --scale-ratio: 1.333;
    --font-size-base: 1rem;
    
    /* Calculated scale */
    --font-size-xs: calc(var(--font-size-base) / var(--scale-ratio) / var(--scale-ratio));
    --font-size-sm: calc(var(--font-size-base) / var(--scale-ratio));
    --font-size-md: var(--font-size-base);
    --font-size-lg: calc(var(--font-size-base) * var(--scale-ratio));
    --font-size-xl: calc(var(--font-size-base) * var(--scale-ratio) * var(--scale-ratio));
    --font-size-2xl: calc(var(--font-size-base) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));
    --font-size-3xl: calc(var(--font-size-base) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio) * var(--scale-ratio));
}

/* Alternative scales for different designs */
/* Major Third (1.25) - Conservative */
.scale-conservative {
    --scale-ratio: 1.25;
}

/* Perfect Fifth (1.5) - Dramatic */
.scale-dramatic {
    --scale-ratio: 1.5;
}

/* Golden Ratio (1.618) - Harmonious */
.scale-golden {
    --scale-ratio: 1.618;
}
```

### Responsive Type Scale

```css
/* Responsive modular scale */
:root {
    /* Mobile scale (smaller ratio) */
    --scale-ratio: 1.2;
    --font-size-base: 1rem;
}

/* Tablet scale (medium ratio) */
@media (min-width: 768px) {
    :root {
        --scale-ratio: 1.333;
        --font-size-base: 1.125rem;
    }
}

/* Desktop scale (larger ratio) */
@media (min-width: 1024px) {
    :root {
        --scale-ratio: 1.414;
        --font-size-base: 1.25rem;
    }
}

/* Typography classes using the scale */
.text-xs { font-size: var(--font-size-xs); }
.text-sm { font-size: var(--font-size-sm); }
.text-base { font-size: var(--font-size-base); }
.text-lg { font-size: var(--font-size-lg); }
.text-xl { font-size: var(--font-size-xl); }
.text-2xl { font-size: var(--font-size-2xl); }
.text-3xl { font-size: var(--font-size-3xl); }
```

## Advanced Spacing Techniques

### Vertical Rhythm System

```css
/* Baseline grid system */
:root {
    --baseline: 1.5rem; /* 24px at 16px base */
    --baseline-sm: 1.25rem; /* 20px for mobile */
}

/* Maintain vertical rhythm */
h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote {
    margin-bottom: var(--baseline);
    line-height: var(--baseline);
}

/* Adjust for different text sizes */
h1 {
    line-height: calc(var(--baseline) * 2);
    margin-bottom: calc(var(--baseline) * 1.5);
}

h2 {
    line-height: calc(var(--baseline) * 1.5);
    margin-bottom: var(--baseline);
}

/* Small text maintains grid */
.small-text {
    font-size: 0.875rem;
    line-height: var(--baseline);
}

/* Mobile adjustments */
@media (max-width: 768px) {
    h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote {
        margin-bottom: var(--baseline-sm);
        line-height: var(--baseline-sm);
    }
}
```

### Contextual Spacing

```css
/* Flow utility for automatic spacing */
.flow > * + * {
    margin-top: var(--flow-space, 1rem);
}

/* Different flow contexts */
.flow-sm { --flow-space: 0.5rem; }
.flow-md { --flow-space: 1rem; }
.flow-lg { --flow-space: 1.5rem; }
.flow-xl { --flow-space: 2rem; }

/* Prose-specific spacing */
.prose {
    --flow-space: 1.25rem;
}

.prose h2 {
    margin-top: 2em;
    margin-bottom: 0.75em;
}

.prose h3 {
    margin-top: 1.5em;
    margin-bottom: 0.5em;
}

.prose p {
    margin-bottom: 1.25em;
}

.prose ul, .prose ol {
    margin: 1.25em 0;
}

.prose li {
    margin: 0.5em 0;
}
```

## Performance Optimization

### Font Loading Strategies

```html
<!-- Critical font preloading -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font display optimization -->
<style>
    @font-face {
        font-family: 'Inter';
        src: url('/fonts/inter-var.woff2') format('woff2-variations');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap; /* Prevent invisible text during font load */
    }
    
    /* Fallback font matching */
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    }
</style>
```

### CSS Font Loading API

```javascript
// Progressive font enhancement
class FontLoader {
    constructor() {
        this.fonts = [
            { family: 'Inter', weight: '400', style: 'normal' },
            { family: 'Inter', weight: '600', style: 'normal' },
            { family: 'Inter', weight: '700', style: 'normal' }
        ];
        this.loadFonts();
    }
    
    async loadFonts() {
        try {
            // Check if fonts are already loaded
            const fontPromises = this.fonts.map(font => {
                return new FontFace(
                    font.family,
                    `url('/fonts/${font.family.toLowerCase()}-${font.weight}.woff2')`
                ).load();
            });
            
            const loadedFonts = await Promise.all(fontPromises);
            
            // Add fonts to document
            loadedFonts.forEach(font => {
                document.fonts.add(font);
            });
            
            // Add class to enable enhanced typography
            document.documentElement.classList.add('fonts-loaded');
            
        } catch (error) {
            console.warn('Font loading failed:', error);
            // Graceful fallback - system fonts will be used
        }
    }
}

// Initialize font loading
if ('FontFace' in window) {
    new FontLoader();
} else {
    // Fallback for older browsers
    document.documentElement.classList.add('fonts-loaded');
}
```

## Accessibility Considerations

### Reading Experience Optimization

```css
/* Improved text readability */
:root {
    /* Minimum contrast ratios */
    --text-contrast-normal: 4.5; /* WCAG AA */
    --text-contrast-large: 3.0;  /* WCAG AA for large text */
    
    /* Optimal line lengths */
    --line-length-min: 45ch;
    --line-length-max: 75ch;
    --line-length-optimal: 66ch;
}

/* Reading-optimized container */
.readable-content {
    max-width: var(--line-length-optimal);
    margin: 0 auto;
    font-size: clamp(1rem, 2.5vw, 1.125rem);
    line-height: 1.6;
}

/* Focus improvements */
*:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    :root {
        --color-text-primary: #000000;
        --color-text-secondary: #000000;
        --color-background: #ffffff;
    }
    
    a {
        text-decoration: underline;
        text-decoration-thickness: 2px;
    }
}

/* Reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        transition: none !important;
        animation: none !important;
    }
}

/* Print optimization */
@media print {
    body {
        font-size: 12pt;
        line-height: 1.4;
        color: #000;
        background: #fff;
    }
    
    h1 { font-size: 20pt; page-break-after: avoid; }
    h2 { font-size: 16pt; page-break-after: avoid; }
    h3 { font-size: 14pt; page-break-after: avoid; }
    
    p, li {
        orphans: 3;
        widows: 3;
    }
    
    blockquote {
        page-break-inside: avoid;
    }
}
```

## Best Practices Summary

### Typography Guidelines

✅ **Fluid Scaling**: Use `clamp()` for responsive typography  
✅ **Modular Scale**: Maintain consistent proportions  
✅ **Vertical Rhythm**: Align text to a baseline grid  
✅ **Optimal Line Length**: Keep lines between 45-75 characters  
✅ **Adequate Line Height**: Use 1.4-1.6 for body text  
✅ **Font Loading**: Optimize with `font-display: swap`  

❌ **Fixed Sizes**: Avoid pixel-based font sizes  
❌ **Too Many Fonts**: Limit to 2-3 font families  
❌ **Poor Contrast**: Ensure WCAG AA compliance  
❌ **Cramped Spacing**: Provide adequate white space  
❌ **Inconsistent Scale**: Use systematic sizing  

### Spacing Best Practices

✅ **Consistent System**: Use a mathematical scale  
✅ **Contextual Spacing**: Adjust for content type  
✅ **Responsive Spacing**: Scale with viewport  
✅ **Semantic Spacing**: Reflect content hierarchy  
✅ **Accessibility**: Consider touch targets and readability  

This comprehensive typography and spacing system provides the foundation for readable, accessible, and visually appealing responsive designs.
