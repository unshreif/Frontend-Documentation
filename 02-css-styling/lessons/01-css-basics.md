# CSS Basics

## What is CSS?

CSS (Cascading Style Sheets) controls the presentation and layout of HTML documents.

## CSS Syntax

```css
selector {
    property: value;
    property: value;
}
```

Example:
```css
h1 {
    color: blue;
    font-size: 2em;
    text-align: center;
}
```

## Ways to Add CSS

### 1. Inline CSS
```html
<h1 style="color: blue; font-size: 2em;">Heading</h1>
```

### 2. Internal CSS
```html
<head>
    <style>
        h1 {
            color: blue;
            font-size: 2em;
        }
    </style>
</head>
```

### 3. External CSS (Recommended)
```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

## Basic Properties

### Colors
```css
.element {
    color: red;                    /* Text color */
    background-color: #f0f0f0;     /* Background color */
    border-color: rgb(255, 0, 0);  /* Border color */
}
```

### Typography
```css
.text {
    font-family: Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    text-decoration: underline;
}
```

### Spacing
```css
.box {
    margin: 10px;          /* Space outside element */
    padding: 15px;         /* Space inside element */
    border: 1px solid black;
}
```

## Color Systems

### Named Colors
```css
color: red;
color: blue;
color: forestgreen;
```

### Hexadecimal
```css
color: #ff0000;  /* Red */
color: #00ff00;  /* Green */
color: #0000ff;  /* Blue */
```

### RGB/RGBA
```css
color: rgb(255, 0, 0);        /* Red */
color: rgba(255, 0, 0, 0.5);  /* Red with 50% transparency */
```

### HSL/HSLA
```css
color: hsl(0, 100%, 50%);      /* Red */
color: hsla(0, 100%, 50%, 0.5); /* Red with 50% transparency */
```

## CSS Units

### Absolute Units
- `px` - pixels
- `pt` - points
- `cm` - centimeters

### Relative Units
- `em` - relative to parent font-size
- `rem` - relative to root font-size
- `%` - percentage of parent
- `vw` - viewport width
- `vh` - viewport height

## Exercise

Style the HTML exercise from lesson 1 with:
1. Different colors for headings
2. Custom font family
3. Proper spacing with margins and padding
4. Background color for the page
