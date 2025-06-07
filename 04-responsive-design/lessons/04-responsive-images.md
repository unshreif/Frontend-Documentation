# Responsive Images & Media Optimization

## Introduction to Responsive Images

Responsive images adapt to different screen sizes, pixel densities, and network conditions to provide optimal user experiences while minimizing bandwidth usage.

### The Problem with Fixed Images

```html
<!-- Problems with non-responsive images -->
<img src="large-image.jpg" alt="Example"> 
<!-- Issues:
- Same large file served to all devices
- Mobile users download unnecessary data
- Poor performance on slow connections
- Blurry on high-DPI screens
-->
```

## Responsive Image Techniques

### 1. CSS-Based Responsive Images

```css
/* Basic responsive image */
.responsive-image {
    max-width: 100%;
    height: auto;
    display: block;
}

/* Responsive background images */
.hero-section {
    background-image: url('hero-mobile.jpg');
    background-size: cover;
    background-position: center;
    height: 300px;
}

@media (min-width: 768px) {
    .hero-section {
        background-image: url('hero-tablet.jpg');
        height: 400px;
    }
}

@media (min-width: 1200px) {
    .hero-section {
        background-image: url('hero-desktop.jpg');
        height: 500px;
    }
}

/* Object-fit for maintaining aspect ratios */
.image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-radius: 8px;
}

.fitted-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

/* Different object-fit values */
.cover { object-fit: cover; } /* Crop to fill */
.contain { object-fit: contain; } /* Fit entirely within */
.fill { object-fit: fill; } /* Stretch to fill */
.scale-down { object-fit: scale-down; } /* Smaller of contain or none */
```

### 2. HTML srcset Attribute

```html
<!-- Resolution switching: same image, different sizes -->
<img src="image-400.jpg"
     srcset="image-400.jpg 400w,
             image-800.jpg 800w,
             image-1200.jpg 1200w,
             image-1600.jpg 1600w"
     sizes="(max-width: 600px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
     alt="Responsive image example">

<!-- Pixel density switching: same size, different resolutions -->
<img src="logo.png"
     srcset="logo.png 1x,
             logo@2x.png 2x,
             logo@3x.png 3x"
     alt="Company logo">

<!-- Combining width and pixel density -->
<img src="product-400.jpg"
     srcset="product-400.jpg 400w,
             product-800.jpg 800w,
             product-800@2x.jpg 800w 2x,
             product-1200.jpg 1200w,
             product-1200@2x.jpg 1200w 2x"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="Product image">
```

### 3. Picture Element for Art Direction

```html
<!-- Art direction: different crops for different screens -->
<picture>
    <!-- Mobile: portrait crop -->
    <source media="(max-width: 767px)" 
            srcset="hero-mobile-400.jpg 400w,
                    hero-mobile-800.jpg 800w"
            sizes="100vw">
    
    <!-- Tablet: landscape crop -->
    <source media="(min-width: 768px) and (max-width: 1199px)" 
            srcset="hero-tablet-800.jpg 800w,
                    hero-tablet-1200.jpg 1200w"
            sizes="100vw">
    
    <!-- Desktop: wide crop with focal point -->
    <source media="(min-width: 1200px)" 
            srcset="hero-desktop-1200.jpg 1200w,
                    hero-desktop-1800.jpg 1800w,
                    hero-desktop-2400.jpg 2400w"
            sizes="100vw">
    
    <!-- Fallback -->
    <img src="hero-desktop-1200.jpg" 
         alt="Team collaboration in modern office space">
</picture>

<!-- Format switching: modern formats with fallbacks -->
<picture>
    <!-- AVIF format (newest, best compression) -->
    <source srcset="image.avif" type="image/avif">
    
    <!-- WebP format (good compression, wide support) -->
    <source srcset="image.webp" type="image/webp">
    
    <!-- JPEG fallback (universal support) -->
    <img src="image.jpg" alt="Image description">
</picture>

<!-- Complex art direction with multiple formats -->
<picture>
    <!-- Mobile AVIF -->
    <source media="(max-width: 767px)"
            srcset="mobile-image.avif"
            type="image/avif">
    
    <!-- Mobile WebP -->
    <source media="(max-width: 767px)"
            srcset="mobile-image.webp"
            type="image/webp">
    
    <!-- Mobile JPEG -->
    <source media="(max-width: 767px)"
            srcset="mobile-image.jpg">
    
    <!-- Desktop AVIF -->
    <source srcset="desktop-image.avif"
            type="image/avif">
    
    <!-- Desktop WebP -->
    <source srcset="desktop-image.webp"
            type="image/webp">
    
    <!-- Desktop JPEG fallback -->
    <img src="desktop-image.jpg"
         alt="Detailed product showcase">
</picture>
```

## Complete Responsive Image Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Images Showcase</title>
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Hero Section with Art Direction */
        .hero {
            position: relative;
            overflow: hidden;
            border-radius: 12px;
            margin: 2rem 0;
        }
        
        .hero-image {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .hero-content {
            position: absolute;
            bottom: 2rem;
            left: 2rem;
            color: white;
            max-width: 500px;
        }
        
        .hero-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
        }
        
        .hero-text {
            font-size: 1.1rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.7);
        }
        
        /* Responsive Gallery */
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin: 3rem 0;
        }
        
        .gallery-item {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .gallery-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .gallery-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
        }
        
        .gallery-content {
            padding: 1.5rem;
        }
        
        .gallery-title {
            font-size: 1.25rem;
            margin-bottom: 0.5rem;
            color: #2c3e50;
        }
        
        .gallery-description {
            color: #7f8c8d;
            font-size: 0.9rem;
        }
        
        /* Product Showcase */
        .product-showcase {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
            margin: 4rem 0;
            padding: 2rem;
            background: #f8f9fa;
            border-radius: 12px;
        }
        
        .product-image-container {
            position: relative;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .product-image {
            width: 100%;
            height: auto;
            display: block;
        }
        
        .product-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: #e74c3c;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .product-info h2 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #2c3e50;
        }
        
        .product-info p {
            margin-bottom: 1.5rem;
            color: #555;
        }
        
        .product-features {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .product-features li {
            padding: 0.5rem 0;
            color: #666;
        }
        
        .product-features li::before {
            content: "✓ ";
            color: #27ae60;
            font-weight: bold;
            margin-right: 0.5rem;
        }
        
        .cta-button {
            background: #3498db;
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 6px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .cta-button:hover {
            background: #2980b9;
        }
        
        /* Mobile Optimizations */
        @media (max-width: 768px) {
            .hero-content {
                bottom: 1rem;
                left: 1rem;
                right: 1rem;
            }
            
            .hero-title {
                font-size: 1.5rem;
            }
            
            .hero-text {
                font-size: 1rem;
            }
            
            .product-showcase {
                grid-template-columns: 1fr;
                gap: 2rem;
                text-align: center;
            }
            
            .gallery {
                grid-template-columns: 1fr;
            }
        }
        
        /* High DPI optimizations */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .logo {
                background-image: url('logo@2x.png');
                background-size: 200px 50px;
            }
        }
        
        /* Lazy loading styles */
        .lazy-image {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy-image.loaded {
            opacity: 1;
        }
        
        .lazy-image.loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Responsive Images Showcase</h1>
        
        <!-- Hero Section with Art Direction -->
        <section class="hero">
            <picture>
                <!-- Mobile: Vertical crop focusing on people -->
                <source media="(max-width: 767px)"
                        srcset="hero-mobile-400.webp 400w,
                                hero-mobile-600.webp 600w"
                        sizes="100vw"
                        type="image/webp">
                
                <source media="(max-width: 767px)"
                        srcset="hero-mobile-400.jpg 400w,
                                hero-mobile-600.jpg 600w"
                        sizes="100vw">
                
                <!-- Tablet: Balanced composition -->
                <source media="(min-width: 768px) and (max-width: 1199px)"
                        srcset="hero-tablet-800.webp 800w,
                                hero-tablet-1200.webp 1200w"
                        sizes="100vw"
                        type="image/webp">
                
                <source media="(min-width: 768px) and (max-width: 1199px)"
                        srcset="hero-tablet-800.jpg 800w,
                                hero-tablet-1200.jpg 1200w"
                        sizes="100vw">
                
                <!-- Desktop: Wide landscape with full context -->
                <source media="(min-width: 1200px)"
                        srcset="hero-desktop-1200.webp 1200w,
                                hero-desktop-1800.webp 1800w,
                                hero-desktop-2400.webp 2400w"
                        sizes="100vw"
                        type="image/webp">
                
                <source media="(min-width: 1200px)"
                        srcset="hero-desktop-1200.jpg 1200w,
                                hero-desktop-1800.jpg 1800w,
                                hero-desktop-2400.jpg 2400w"
                        sizes="100vw">
                
                <!-- Fallback -->
                <img src="hero-desktop-1200.jpg"
                     alt="Modern workspace with diverse team collaborating on design project"
                     class="hero-image">
            </picture>
            
            <div class="hero-content">
                <h2 class="hero-title">Responsive Images in Action</h2>
                <p class="hero-text">See how the same content adapts to different screen sizes with optimized crops and formats.</p>
            </div>
        </section>
        
        <!-- Responsive Gallery -->
        <section class="gallery">
            <article class="gallery-item">
                <picture>
                    <source srcset="gallery1.avif" type="image/avif">
                    <source srcset="gallery1.webp" type="image/webp">
                    <img src="gallery1.jpg"
                         srcset="gallery1-300.jpg 300w,
                                 gallery1-600.jpg 600w,
                                 gallery1-900.jpg 900w"
                         sizes="(max-width: 600px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                         alt="Creative workspace with design tools"
                         class="gallery-image"
                         loading="lazy">
                </picture>
                <div class="gallery-content">
                    <h3 class="gallery-title">Design Process</h3>
                    <p class="gallery-description">From concept to completion, see how modern design workflows incorporate responsive thinking.</p>
                </div>
            </article>
            
            <article class="gallery-item">
                <picture>
                    <source srcset="gallery2.avif" type="image/avif">
                    <source srcset="gallery2.webp" type="image/webp">
                    <img src="gallery2.jpg"
                         srcset="gallery2-300.jpg 300w,
                                 gallery2-600.jpg 600w,
                                 gallery2-900.jpg 900w"
                         sizes="(max-width: 600px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                         alt="Multiple devices displaying responsive website"
                         class="gallery-image"
                         loading="lazy">
                </picture>
                <div class="gallery-content">
                    <h3 class="gallery-title">Multi-Device Testing</h3>
                    <p class="gallery-description">Ensuring consistent experiences across all devices and screen sizes.</p>
                </div>
            </article>
            
            <article class="gallery-item">
                <picture>
                    <source srcset="gallery3.avif" type="image/avif">
                    <source srcset="gallery3.webp" type="image/webp">
                    <img src="gallery3.jpg"
                         srcset="gallery3-300.jpg 300w,
                                 gallery3-600.jpg 600w,
                                 gallery3-900.jpg 900w"
                         sizes="(max-width: 600px) 100vw,
                                (max-width: 1200px) 50vw,
                                33vw"
                         alt="Performance optimization dashboard"
                         class="gallery-image"
                         loading="lazy">
                </picture>
                <div class="gallery-content">
                    <h3 class="gallery-title">Performance Optimization</h3>
                    <p class="gallery-description">Optimizing images for faster loading while maintaining visual quality.</p>
                </div>
            </article>
        </section>
        
        <!-- Product Showcase -->
        <section class="product-showcase">
            <div class="product-image-container">
                <picture>
                    <source media="(max-width: 767px)"
                            srcset="product-mobile.avif"
                            type="image/avif">
                    <source media="(max-width: 767px)"
                            srcset="product-mobile.webp"
                            type="image/webp">
                    <source media="(max-width: 767px)"
                            srcset="product-mobile.jpg">
                    
                    <source srcset="product-desktop.avif"
                            type="image/avif">
                    <source srcset="product-desktop.webp"
                            type="image/webp">
                    
                    <img src="product-desktop.jpg"
                         alt="Premium responsive design toolkit interface"
                         class="product-image">
                </picture>
                <div class="product-badge">New</div>
            </div>
            
            <div class="product-info">
                <h2>Responsive Design Toolkit</h2>
                <p>Everything you need to create stunning responsive websites that work perfectly on every device.</p>
                
                <ul class="product-features">
                    <li>Mobile-first component library</li>
                    <li>Automated image optimization</li>
                    <li>Cross-browser testing tools</li>
                    <li>Performance monitoring</li>
                    <li>Accessibility compliance checking</li>
                </ul>
                
                <button class="cta-button">Get Started Today</button>
            </div>
        </section>
    </div>
    
    <script>
        // Lazy loading implementation
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loading');
                        
                        img.onload = () => {
                            img.classList.remove('loading');
                            img.classList.add('loaded');
                        };
                        
                        observer.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => imageObserver.observe(img));
        }
        
        // Preload critical images
        const criticalImages = [
            'hero-mobile-400.webp',
            'hero-tablet-800.webp',
            'hero-desktop-1200.webp'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    </script>
</body>
</html>
```

## Advanced Responsive Image Techniques

### Lazy Loading with Intersection Observer

```javascript
// Advanced lazy loading with placeholder and progressive enhancement
class ResponsiveImageLoader {
    constructor() {
        this.imageObserver = null;
        this.images = document.querySelectorAll('[data-src]');
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.createObserver();
            this.observeImages();
        } else {
            // Fallback for older browsers
            this.loadAllImages();
        }
    }
    
    createObserver() {
        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before entering viewport
            threshold: 0.01
        });
    }
    
    observeImages() {
        this.images.forEach(img => this.imageObserver.observe(img));
    }
    
    loadImage(img) {
        // Add loading state
        img.classList.add('loading');
        
        // Create new image element to test loading
        const imageLoader = new Image();
        
        imageLoader.onload = () => {
            // Update src attributes
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
            img.src = img.dataset.src;
            
            // Update classes
            img.classList.remove('loading');
            img.classList.add('loaded');
            
            // Remove data attributes
            delete img.dataset.src;
            delete img.dataset.srcset;
        };
        
        imageLoader.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
        };
        
        // Start loading
        imageLoader.src = img.dataset.src;
    }
    
    loadAllImages() {
        this.images.forEach(img => this.loadImage(img));
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ResponsiveImageLoader();
});
```

### Dynamic Image Sizing

```javascript
// Dynamic responsive image sizing based on container
function updateImageSizes() {
    const images = document.querySelectorAll('[data-dynamic-sizes]');
    
    images.forEach(img => {
        const container = img.closest('[data-container]');
        const containerWidth = container.offsetWidth;
        
        // Calculate appropriate sizes attribute
        let sizes = '';
        
        if (containerWidth <= 480) {
            sizes = '100vw';
        } else if (containerWidth <= 768) {
            sizes = '50vw';
        } else if (containerWidth <= 1200) {
            sizes = '33vw';
        } else {
            sizes = '25vw';
        }
        
        img.sizes = sizes;
    });
}

// Update on resize
window.addEventListener('resize', debounce(updateImageSizes, 250));

// Debounce function to limit resize event frequency
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
```

## Image Format Optimization

### Modern Format Support Detection

```javascript
// Feature detection for modern image formats
class ImageFormatSupport {
    constructor() {
        this.supportCache = {};
        this.detectSupport();
    }
    
    async detectSupport() {
        const formats = ['avif', 'webp'];
        
        for (const format of formats) {
            this.supportCache[format] = await this.supportsFormat(format);
        }
        
        this.updateImageSources();
    }
    
    supportsFormat(format) {
        return new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            
            // Test images (1x1 pixel)
            const testImages = {
                webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
                avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI='
            };
            
            img.src = testImages[format];
        });
    }
    
    updateImageSources() {
        const pictures = document.querySelectorAll('picture[data-format-switching]');
        
        pictures.forEach(picture => {
            const sources = picture.querySelectorAll('source');
            
            sources.forEach(source => {
                const format = source.dataset.format;
                if (!this.supportCache[format]) {
                    source.remove();
                }
            });
        });
    }
}

// Initialize format detection
new ImageFormatSupport();
```

### Performance Monitoring

```javascript
// Image performance monitoring
class ImagePerformanceMonitor {
    constructor() {
        this.metrics = {
            totalImages: 0,
            loadedImages: 0,
            errorImages: 0,
            totalBytes: 0,
            loadTimes: []
        };
        
        this.observeImages();
    }
    
    observeImages() {
        const images = document.querySelectorAll('img');
        this.metrics.totalImages = images.length;
        
        images.forEach(img => {
            const startTime = performance.now();
            
            img.addEventListener('load', () => {
                const loadTime = performance.now() - startTime;
                this.metrics.loadedImages++;
                this.metrics.loadTimes.push(loadTime);
                
                // Estimate file size (not exact, but useful for monitoring)
                this.estimateImageSize(img);
                
                this.updateMetrics();
            });
            
            img.addEventListener('error', () => {
                this.metrics.errorImages++;
                this.updateMetrics();
            });
        });
    }
    
    estimateImageSize(img) {
        // Rough estimation based on dimensions and typical compression
        const area = img.naturalWidth * img.naturalHeight;
        const estimatedSize = area * 0.5; // Rough JPEG compression estimate
        this.metrics.totalBytes += estimatedSize;
    }
    
    updateMetrics() {
        const progress = (this.metrics.loadedImages + this.metrics.errorImages) / this.metrics.totalImages;
        
        if (progress === 1) {
            this.reportMetrics();
        }
    }
    
    reportMetrics() {
        const avgLoadTime = this.metrics.loadTimes.reduce((a, b) => a + b, 0) / this.metrics.loadTimes.length;
        
        console.log('Image Performance Metrics:', {
            totalImages: this.metrics.totalImages,
            loadedImages: this.metrics.loadedImages,
            errorImages: this.metrics.errorImages,
            averageLoadTime: Math.round(avgLoadTime),
            estimatedTotalSize: Math.round(this.metrics.totalBytes / 1024) + 'KB'
        });
        
        // Send to analytics service
        if (typeof gtag !== 'undefined') {
            gtag('event', 'image_performance', {
                custom_parameter_1: avgLoadTime,
                custom_parameter_2: this.metrics.totalBytes
            });
        }
    }
}

// Initialize monitoring
new ImagePerformanceMonitor();
```

## Best Practices Summary

### Image Optimization Checklist

✅ **Choose the right technique:**
- `srcset` for resolution switching
- `<picture>` for art direction
- CSS for simple responsive scaling

✅ **Optimize formats:**
- Use AVIF for best compression (with fallbacks)
- Use WebP for good compression and support
- Always provide JPEG/PNG fallbacks

✅ **Performance optimization:**
- Implement lazy loading for below-fold images
- Use appropriate `sizes` attributes
- Preload critical images
- Monitor Core Web Vitals

✅ **Accessibility:**
- Provide meaningful alt text
- Consider users with slow connections
- Test with screen readers

✅ **Testing:**
- Test across multiple devices and network conditions
- Validate that correct images are served
- Monitor performance metrics
