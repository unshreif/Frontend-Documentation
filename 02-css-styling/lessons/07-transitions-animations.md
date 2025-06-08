# CSS Transitions and Animations

## Introduction

CSS transitions and animations allow you to create smooth, engaging effects that enhance user experience without JavaScript.

## CSS Transitions

### Basic Transition Syntax
```css
.element {
    /* Properties to transition */
    background-color: blue;
    transform: scale(1);
    opacity: 1;
    
    /* Transition configuration */
    transition-property: background-color, transform, opacity;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    transition-delay: 0s;
    
    /* Shorthand */
    transition: background-color 0.3s ease 0s,
                transform 0.3s ease 0s,
                opacity 0.3s ease 0s;
    
    /* Or even shorter */
    transition: all 0.3s ease;
}

.element:hover {
    background-color: red;
    transform: scale(1.1);
    opacity: 0.8;
}
```

### Transition Properties

#### Duration
```css
.fast { transition-duration: 0.1s; }
.normal { transition-duration: 0.3s; }
.slow { transition-duration: 0.8s; }
.very-slow { transition-duration: 2s; }
```

#### Timing Functions
```css
.linear { transition-timing-function: linear; }
.ease { transition-timing-function: ease; }          /* Default */
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* Custom cubic-bezier */
.custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* Step functions */
.steps { transition-timing-function: steps(4, end); }
```

#### Delay
```css
.no-delay { transition-delay: 0s; }
.short-delay { transition-delay: 0.1s; }
.long-delay { transition-delay: 0.5s; }

/* Staggered delays for multiple elements */
.item:nth-child(1) { transition-delay: 0.1s; }
.item:nth-child(2) { transition-delay: 0.2s; }
.item:nth-child(3) { transition-delay: 0.3s; }
```

### Common Transition Patterns

#### Button Hover Effects
```css
.btn {
    background: #007bff;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn:hover {
    background: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
}

.btn:active {
    transform: translateY(0);
    transition-duration: 0.1s;
}
```

#### Card Hover Effects
```css
.card {
    background: white;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
```

#### Navigation Links
```css
.nav-link {
    position: relative;
    color: #333;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: color 0.3s ease;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #007bff;
    transition: all 0.3s ease;
    transform: translateX(-50%);
}

.nav-link:hover {
    color: #007bff;
}

.nav-link:hover::after {
    width: 100%;
}
```

#### Form Elements
```css
.input {
    border: 2px solid #e0e0e0;
    padding: 0.75rem;
    border-radius: 4px;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Floating label effect */
.form-group {
    position: relative;
}

.form-group input {
    padding: 1rem 0.75rem 0.5rem;
}

.form-group label {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    color: #999;
    font-size: 1rem;
    transition: all 0.3s ease;
    pointer-events: none;
}

.form-group input:focus + label,
.form-group input:not(:placeholder-shown) + label {
    top: 0.25rem;
    font-size: 0.75rem;
    color: #007bff;
}
```

## CSS Animations

### Keyframes
```css
/* Define animation */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Multi-step animation */
@keyframes bounce {
    0% { transform: translateY(0); }
    25% { transform: translateY(-10px); }
    50% { transform: translateY(0); }
    75% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
}

/* Complex animation */
@keyframes colorPulse {
    0%, 100% {
        background-color: #007bff;
        transform: scale(1);
    }
    50% {
        background-color: #0056b3;
        transform: scale(1.05);
    }
}
```

### Animation Properties
```css
.animated-element {
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
    
    /* Shorthand */
    animation: fadeIn 1s ease-out 0.5s 1 normal forwards running;
    
    /* Multiple animations */
    animation: fadeIn 1s ease-out, bounce 2s ease-in-out infinite;
}
```

### Animation Fill Modes
```css
.forwards {
    animation-fill-mode: forwards;    /* Keeps final state */
}

.backwards {
    animation-fill-mode: backwards;   /* Applies initial keyframe before start */
}

.both {
    animation-fill-mode: both;        /* Both forwards and backwards */
}

.none {
    animation-fill-mode: none;        /* Default: no fill */
}
```

### Animation Direction
```css
.normal { animation-direction: normal; }           /* Default */
.reverse { animation-direction: reverse; }         /* Backwards */
.alternate { animation-direction: alternate; }     /* Forward then backward */
.alternate-reverse { animation-direction: alternate-reverse; }
```

### Animation Iteration
```css
.once { animation-iteration-count: 1; }           /* Default */
.twice { animation-iteration-count: 2; }
.infinite { animation-iteration-count: infinite; }
.partial { animation-iteration-count: 2.5; }      /* 2.5 times */
```

## Practical Animation Examples

### Loading Animations
```css
/* Spinner */
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #007bff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* Pulse */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}

.loading-pulse {
    animation: pulse 1.5s ease-in-out infinite;
}

/* Dots */
@keyframes dotPulse {
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}

.loading-dots span {
    display: inline-block;
    animation: dotPulse 1.4s ease-in-out infinite;
}

.loading-dots span:nth-child(1) { animation-delay: 0s; }
.loading-dots span:nth-child(2) { animation-delay: 0.2s; }
.loading-dots span:nth-child(3) { animation-delay: 0.4s; }
```

### Page Transitions
```css
/* Fade in elements on page load */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeInUp 0.8s ease-out forwards;
}

.fade-in:nth-child(1) { animation-delay: 0.1s; }
.fade-in:nth-child(2) { animation-delay: 0.2s; }
.fade-in:nth-child(3) { animation-delay: 0.3s; }

/* Slide in from side */
@keyframes slideInLeft {
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.slide-in-left {
    animation: slideInLeft 0.6s ease-out forwards;
}
```

### Interactive Animations
```css
/* Shake animation for errors */
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
}

.error {
    animation: shake 0.6s ease-in-out;
}

/* Success checkmark */
@keyframes checkmark {
    0% {
        height: 0;
        width: 0;
        opacity: 1;
    }
    20% {
        height: 0;
        width: 7px;
        opacity: 1;
    }
    40% {
        height: 14px;
        width: 7px;
        opacity: 1;
    }
    100% {
        height: 14px;
        width: 7px;
        opacity: 1;
    }
}

.checkmark::after {
    content: '';
    position: absolute;
    left: 12px;
    top: 6px;
    width: 7px;
    height: 14px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    animation: checkmark 0.4s ease-in-out;
}
```

### Hover Animations
```css
/* Image zoom on hover */
.image-container {
    overflow: hidden;
    border-radius: 8px;
}

.image-zoom {
    transition: transform 0.3s ease;
}

.image-container:hover .image-zoom {
    transform: scale(1.1);
}

/* Text reveal animation */
.text-reveal {
    position: relative;
    overflow: hidden;
}

.text-reveal::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, white, transparent);
    transition: left 0.5s ease;
}

.text-reveal:hover::after {
    left: 100%;
}

/* Flip card */
.flip-card {
    perspective: 1000px;
    width: 300px;
    height: 200px;
}

.flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
    transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-card-back {
    transform: rotateY(180deg);
}
```

## Performance Considerations

### Optimizing Animations
```css
/* Use transform and opacity for best performance */
.optimized {
    /* Good: GPU accelerated */
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.not-optimized {
    /* Avoid: causes layout recalculation */
    transition: width 0.3s ease, height 0.3s ease, left 0.3s ease;
}

/* Enable hardware acceleration */
.gpu-accelerated {
    transform: translateZ(0);  /* Force GPU layer */
    will-change: transform;    /* Hint to browser */
}

/* Clean up will-change after animation */
.element {
    will-change: transform;
}

.element.animation-complete {
    will-change: auto;
}
```

### Reducing Motion for Accessibility
```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Alternative: Provide simpler animations */
@media (prefers-reduced-motion: reduce) {
    .fade-in {
        animation: none;
        opacity: 1;
    }
    
    .slide-in {
        animation: none;
        transform: translateX(0);
    }
}
```

## Advanced Animation Techniques

### Staggered Animations
```css
/* Using CSS variables for staggered timing */
.stagger-item {
    animation: fadeInUp 0.6s ease-out forwards;
    animation-delay: calc(var(--index) * 0.1s);
}

/* Using nth-child for staggering */
.grid-item:nth-child(1) { animation-delay: 0.1s; }
.grid-item:nth-child(2) { animation-delay: 0.2s; }
.grid-item:nth-child(3) { animation-delay: 0.3s; }
.grid-item:nth-child(4) { animation-delay: 0.4s; }

/* Complex staggering pattern */
.matrix-item {
    animation: matrixReveal 0.8s ease-out forwards;
    animation-delay: calc((var(--row) + var(--col)) * 0.1s);
}
```

### Animation Chaining
```css
/* Chaining multiple animations */
@keyframes complexAnimation {
    0% {
        opacity: 0;
        transform: translateY(50px) scale(0.8);
    }
    50% {
        opacity: 1;
        transform: translateY(-10px) scale(1.1);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Sequential animations */
.sequence-1 {
    animation: fadeIn 0.5s ease-out 0s forwards,
               slideIn 0.5s ease-out 0.5s forwards,
               bounce 0.3s ease-out 1s forwards;
}
```

### CSS Animation Libraries Integration
```css
/* Custom animations inspired by popular libraries */
@keyframes bounceIn {
    0%, 20%, 40%, 60%, 80%, 100% {
        animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3);
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1);
    }
    40% {
        transform: scale3d(.9, .9, .9);
    }
    60% {
        opacity: 1;
        transform: scale3d(1.03, 1.03, 1.03);
    }
    80% {
        transform: scale3d(.97, .97, .97);
    }
    100% {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
}

.bounce-in {
    animation: bounceIn 0.75s ease-out;
}
```

## Exercise

Create an interactive animation showcase:

1. **Loading Animations**: Build various loading spinners and progress indicators
2. **Button Effects**: Create engaging hover and click animations for buttons
3. **Page Transitions**: Implement smooth transitions for content changes
4. **Interactive Cards**: Design cards with complex hover animations
5. **Form Feedback**: Add success/error animations for form validation

### Bonus Challenges:
- Create a CSS-only slideshow with smooth transitions
- Build an animated navigation menu with staggered reveals
- Design a particle-like animation using multiple elements
- Implement a morphing button that changes shape and content
- Create accessibility-friendly alternatives for all animations
