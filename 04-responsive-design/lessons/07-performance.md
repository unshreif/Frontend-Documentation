# Performance Optimization Strategies

## Introduction to Responsive Performance

Performance is critical for responsive design success. Users expect fast loading times across all devices, especially on mobile networks where bandwidth and processing power may be limited.

### Core Web Vitals for Responsive Design

```javascript
// Measuring Core Web Vitals
class WebVitalsMonitor {
    constructor() {
        this.metrics = {};
        this.initializeMetrics();
    }
    
    initializeMetrics() {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            this.metrics.lcp = lastEntry.startTime;
            this.reportMetric('LCP', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
        
        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                this.metrics.fid = entry.processingStart - entry.startTime;
                this.reportMetric('FID', entry.processingStart - entry.startTime);
            });
        }).observe({ entryTypes: ['first-input'] });
        
        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
            this.reportMetric('CLS', clsValue);
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    reportMetric(name, value) {
        console.log(`${name}: ${value}`);
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                metric_name: name,
                metric_value: Math.round(value),
                custom_parameter_1: this.getDeviceType()
            });
        }
    }
    
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }
}

// Initialize monitoring
new WebVitalsMonitor();
```

## Critical Rendering Path Optimization

### Critical CSS Extraction

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Performance Optimized Responsive Site</title>
    
    <!-- Critical CSS inlined -->
    <style>
        /* Critical above-the-fold styles */
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
        
        /* Critical header styles */
        .header {
            background: #2c3e50;
            color: white;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1rem;
        }
        
        /* Critical hero styles */
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        
        .hero-title {
            font-size: clamp(2rem, 5vw, 4rem);
            margin-bottom: 1rem;
            line-height: 1.2;
        }
        
        /* Critical button styles */
        .btn {
            display: inline-block;
            padding: 1rem 2rem;
            background: #e74c3c;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: 500;
            transition: background-color 0.3s ease;
        }
        
        /* Critical responsive grid */
        .grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 2rem;
            margin: 2rem 0;
        }
        
        @media (min-width: 768px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 1024px) {
            .grid {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        /* Prevent layout shift */
        .card {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            overflow: hidden;
            min-height: 300px;
        }
        
        .card-image {
            width: 100%;
            height: 200px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Loading states */
        .loading {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    </style>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/images/hero-mobile.webp" as="image" media="(max-width: 767px)">
    <link rel="preload" href="/images/hero-desktop.webp" as="image" media="(min-width: 768px)">
    
    <!-- DNS prefetch for external resources -->
    <link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="dns-prefetch" href="//cdnjs.cloudflare.com">
    
    <!-- Non-critical CSS loaded asynchronously -->
    <link rel="preload" href="/css/non-critical.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/css/non-critical.css"></noscript>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>Performance First</h1>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2 class="hero-title">Lightning Fast Responsive Design</h2>
            <p>Optimized for performance across all devices</p>
            <a href="#features" class="btn">Get Started</a>
        </div>
    </section>
    
    <main class="container">
        <section id="features">
            <div class="grid">
                <div class="card">
                    <div class="card-image loading" data-src="/images/feature1.webp">
                        <span>Feature 1</span>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image loading" data-src="/images/feature2.webp">
                        <span>Feature 2</span>
                    </div>
                </div>
                <div class="card">
                    <div class="card-image loading" data-src="/images/feature3.webp">
                        <span>Feature 3</span>
                    </div>
                </div>
            </div>
        </section>
    </main>
    
    <script>
        // Critical JavaScript inlined
        
        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    if (src) {
                        const image = new Image();
                        image.onload = () => {
                            img.style.backgroundImage = `url(${src})`;
                            img.classList.remove('loading');
                        };
                        image.src = src;
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all lazy load images
        document.querySelectorAll('[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
        
        // Load non-critical JavaScript asynchronously
        const script = document.createElement('script');
        script.src = '/js/non-critical.js';
        script.async = true;
        document.head.appendChild(script);
    </script>
</body>
</html>
```

## Resource Prioritization Strategies

### Advanced Resource Loading

```javascript
// Resource priority manager
class ResourcePriorityManager {
    constructor() {
        this.networkInfo = this.getNetworkInfo();
        this.deviceInfo = this.getDeviceInfo();
        this.loadingStrategy = this.determineLoadingStrategy();
        
        this.initializeResourceLoading();
    }
    
    getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        return {
            effectiveType: connection?.effectiveType || 'unknown',
            downlink: connection?.downlink || 0,
            rtt: connection?.rtt || 0,
            saveData: connection?.saveData || false
        };
    }
    
    getDeviceInfo() {
        return {
            memory: navigator.deviceMemory || 4,
            cores: navigator.hardwareConcurrency || 4,
            mobile: /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            touchScreen: 'ontouchstart' in window
        };
    }
    
    determineLoadingStrategy() {
        // Adaptive loading based on device and network
        if (this.networkInfo.saveData || this.networkInfo.effectiveType === 'slow-2g') {
            return 'minimal';
        }
        
        if (this.networkInfo.effectiveType === '2g' || this.deviceInfo.memory <= 2) {
            return 'light';
        }
        
        if (this.networkInfo.effectiveType === '3g' || this.deviceInfo.memory <= 4) {
            return 'medium';
        }
        
        return 'full';
    }
    
    initializeResourceLoading() {
        switch (this.loadingStrategy) {
            case 'minimal':
                this.loadMinimalResources();
                break;
            case 'light':
                this.loadLightResources();
                break;
            case 'medium':
                this.loadMediumResources();
                break;
            case 'full':
                this.loadFullResources();
                break;
        }
    }
    
    loadMinimalResources() {
        // Load only essential resources
        console.log('Loading minimal resources for low-end device/network');
        
        // Skip non-essential images
        document.querySelectorAll('[data-src]').forEach(img => {
            if (!img.classList.contains('critical')) {
                img.style.display = 'none';
            }
        });
        
        // Disable animations
        document.documentElement.classList.add('reduce-motion');
    }
    
    loadLightResources() {
        // Load essential + some enhanced features
        console.log('Loading light resources');
        
        // Load low-quality images
        this.loadImagesWithQuality('low');
        
        // Defer non-critical scripts
        setTimeout(() => {
            this.loadNonCriticalScripts();
        }, 2000);
    }
    
    loadMediumResources() {
        // Load most features with some optimization
        console.log('Loading medium resources');
        
        this.loadImagesWithQuality('medium');
        
        // Load enhanced features after initial render
        requestIdleCallback(() => {
            this.loadEnhancedFeatures();
        });
    }
    
    loadFullResources() {
        // Load all features and highest quality assets
        console.log('Loading full resources');
        
        this.loadImagesWithQuality('high');
        this.loadEnhancedFeatures();
        this.enableAdvancedFeatures();
    }
    
    loadImagesWithQuality(quality) {
        const qualityMap = {
            low: { suffix: '-low', format: 'webp' },
            medium: { suffix: '-med', format: 'webp' },
            high: { suffix: '-high', format: 'avif' }
        };
        
        const settings = qualityMap[quality];
        
        document.querySelectorAll('[data-src]').forEach(img => {
            const baseSrc = img.dataset.src;
            const optimizedSrc = baseSrc.replace(/\.(jpg|png)$/, `${settings.suffix}.${settings.format}`);
            img.dataset.src = optimizedSrc;
        });
    }
    
    loadNonCriticalScripts() {
        const scripts = [
            '/js/analytics.js',
            '/js/social-widgets.js',
            '/js/enhanced-features.js'
        ];
        
        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        });
    }
    
    loadEnhancedFeatures() {
        // Load features that enhance but aren't critical
        import('/js/modules/animations.js').then(module => {
            module.initializeAnimations();
        });
        
        import('/js/modules/interactions.js').then(module => {
            module.initializeInteractions();
        });
    }
    
    enableAdvancedFeatures() {
        // Enable features for high-end devices
        document.documentElement.classList.add('advanced-features');
        
        // Enable service worker for caching
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js');
        }
    }
}

// Initialize resource management
new ResourcePriorityManager();
```

## Bundle Splitting and Code Splitting

### Dynamic Import Strategy

```javascript
// Route-based code splitting for responsive components
class ResponsiveComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.componentMap = new Map();
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadComponent(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        // Observe all components marked for lazy loading
        document.querySelectorAll('[data-component]').forEach(el => {
            this.observer.observe(el);
        });
    }
    
    async loadComponent(element) {
        const componentName = element.dataset.component;
        
        if (this.loadedComponents.has(componentName)) {
            return;
        }
        
        try {
            // Show loading state
            element.classList.add('component-loading');
            
            // Dynamic import based on viewport size
            const viewportWidth = window.innerWidth;
            let componentModule;
            
            if (viewportWidth < 768) {
                // Load mobile-optimized component
                componentModule = await import(`/components/mobile/${componentName}.js`);
            } else if (viewportWidth < 1024) {
                // Load tablet-optimized component
                componentModule = await import(`/components/tablet/${componentName}.js`);
            } else {
                // Load desktop component with full features
                componentModule = await import(`/components/desktop/${componentName}.js`);
            }
            
            // Initialize component
            const ComponentClass = componentModule.default;
            const componentInstance = new ComponentClass(element);
            
            this.componentMap.set(componentName, componentInstance);
            this.loadedComponents.add(componentName);
            
            // Remove loading state
            element.classList.remove('component-loading');
            element.classList.add('component-loaded');
            
            // Stop observing this element
            this.observer.unobserve(element);
            
        } catch (error) {
            console.error(`Failed to load component ${componentName}:`, error);
            element.classList.add('component-error');
        }
    }
    
    // Preload components for faster navigation
    preloadComponent(componentName) {
        if (this.loadedComponents.has(componentName)) {
            return Promise.resolve();
        }
        
        const viewportWidth = window.innerWidth;
        let modulePath;
        
        if (viewportWidth < 768) {
            modulePath = `/components/mobile/${componentName}.js`;
        } else if (viewportWidth < 1024) {
            modulePath = `/components/tablet/${componentName}.js`;
        } else {
            modulePath = `/components/desktop/${componentName}.js`;
        }
        
        return import(modulePath);
    }
    
    // Handle viewport changes
    handleViewportChange() {
        // Reload components if viewport category changed
        const newCategory = this.getViewportCategory();
        
        if (newCategory !== this.currentCategory) {
            this.currentCategory = newCategory;
            this.reloadComponents();
        }
    }
    
    getViewportCategory() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }
    
    reloadComponents() {
        // Reload components optimized for new viewport
        this.componentMap.forEach((instance, name) => {
            if (instance.shouldReloadOnViewportChange) {
                this.loadComponent(instance.element);
            }
        });
    }
}

// Initialize component loader
const componentLoader = new ResponsiveComponentLoader();

// Handle viewport changes
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        componentLoader.handleViewportChange();
    }, 250);
});
```

## Network-Aware Loading

### Adaptive Content Delivery

```javascript
// Network-aware content delivery system
class NetworkAwareLoader {
    constructor() {
        this.connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        this.previousConnectionType = null;
        this.setupNetworkMonitoring();
        this.adaptContentToNetwork();
    }
    
    setupNetworkMonitoring() {
        if (this.connection) {
            this.connection.addEventListener('change', () => {
                this.handleNetworkChange();
            });
        }
        
        // Monitor performance metrics
        this.performanceObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach(entry => {
                if (entry.entryType === 'navigation') {
                    this.analyzePerformance(entry);
                }
            });
        });
        
        this.performanceObserver.observe({ entryTypes: ['navigation'] });
    }
    
    adaptContentToNetwork() {
        const connectionType = this.getConnectionType();
        const dataMode = this.getDataMode();
        
        console.log(`Adapting content for ${connectionType} connection, data mode: ${dataMode}`);
        
        switch (connectionType) {
            case 'slow':
                this.enableSlowNetworkMode();
                break;
            case 'medium':
                this.enableMediumNetworkMode();
                break;
            case 'fast':
                this.enableFastNetworkMode();
                break;
        }
        
        if (dataMode === 'save') {
            this.enableDataSavingMode();
        }
    }
    
    getConnectionType() {
        if (!this.connection) return 'unknown';
        
        const { effectiveType, downlink, rtt } = this.connection;
        
        if (effectiveType === 'slow-2g' || effectiveType === '2g' || downlink < 0.5) {
            return 'slow';
        }
        
        if (effectiveType === '3g' || (downlink >= 0.5 && downlink < 2)) {
            return 'medium';
        }
        
        return 'fast';
    }
    
    getDataMode() {
        return this.connection?.saveData ? 'save' : 'normal';
    }
    
    enableSlowNetworkMode() {
        document.documentElement.classList.add('slow-network');
        
        // Reduce image quality
        this.updateImageQuality('low');
        
        // Disable auto-playing media
        this.disableAutoPlayMedia();
        
        // Simplify animations
        this.simplifyAnimations();
        
        // Defer non-critical resources
        this.deferNonCriticalResources();
    }
    
    enableMediumNetworkMode() {
        document.documentElement.classList.add('medium-network');
        
        // Medium image quality
        this.updateImageQuality('medium');
        
        // Limited auto-play
        this.limitAutoPlayMedia();
        
        // Reduced animations
        this.reduceAnimations();
    }
    
    enableFastNetworkMode() {
        document.documentElement.classList.add('fast-network');
        
        // High image quality
        this.updateImageQuality('high');
        
        // Enable all features
        this.enableAllFeatures();
        
        // Preload next page resources
        this.preloadNextPageResources();
    }
    
    enableDataSavingMode() {
        document.documentElement.classList.add('data-save-mode');
        
        // Show data saving indicator
        this.showDataSavingIndicator();
        
        // Ask before loading heavy content
        this.makeHeavyContentOptional();
        
        // Compress data requests
        this.enableDataCompression();
    }
    
    updateImageQuality(quality) {
        const qualitySettings = {
            low: { format: 'webp', quality: 50 },
            medium: { format: 'webp', quality: 75 },
            high: { format: 'avif', quality: 90 }
        };
        
        const settings = qualitySettings[quality];
        
        document.querySelectorAll('img[data-adaptive]').forEach(img => {
            const baseSrc = img.dataset.src || img.src;
            const optimizedSrc = this.generateOptimizedImageUrl(baseSrc, settings);
            
            if (img.dataset.src) {
                img.dataset.src = optimizedSrc;
            } else {
                img.src = optimizedSrc;
            }
        });
    }
    
    generateOptimizedImageUrl(src, settings) {
        // This would integrate with your image optimization service
        const params = new URLSearchParams({
            format: settings.format,
            quality: settings.quality,
            auto: 'compress'
        });
        
        return `${src}?${params.toString()}`;
    }
    
    disableAutoPlayMedia() {
        document.querySelectorAll('video[autoplay]').forEach(video => {
            video.removeAttribute('autoplay');
            video.preload = 'none';
        });
    }
    
    simplifyAnimations() {
        document.documentElement.classList.add('reduced-animations');
        
        // Disable complex CSS animations
        const style = document.createElement('style');
        style.textContent = `
            .reduced-animations * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    handleNetworkChange() {
        const newConnectionType = this.getConnectionType();
        
        if (newConnectionType !== this.previousConnectionType) {
            console.log(`Network changed from ${this.previousConnectionType} to ${newConnectionType}`);
            
            this.previousConnectionType = newConnectionType;
            this.adaptContentToNetwork();
            
            // Notify user of network change if significant
            if (newConnectionType === 'slow' && this.previousConnectionType === 'fast') {
                this.notifySlowNetwork();
            }
        }
    }
    
    notifySlowNetwork() {
        // Show subtle notification
        const notification = document.createElement('div');
        notification.className = 'network-notification';
        notification.textContent = 'Slow network detected. Content optimized for faster loading.';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    analyzePerformance(entry) {
        const loadTime = entry.loadEventEnd - entry.fetchStart;
        const dnsTime = entry.domainLookupEnd - entry.domainLookupStart;
        const connectTime = entry.connectEnd - entry.connectStart;
        
        // Adjust loading strategy based on performance
        if (loadTime > 3000) {
            console.log('Slow page load detected, enabling aggressive optimization');
            this.enableAggressiveOptimization();
        }
    }
    
    enableAggressiveOptimization() {
        // Implement aggressive performance optimizations
        this.enableSlowNetworkMode();
        this.enableDataSavingMode();
        
        // Cache frequently accessed resources
        this.cacheEssentialResources();
    }
}

// Initialize network-aware loading
new NetworkAwareLoader();
```

## Performance Monitoring and Analytics

### Real User Monitoring (RUM)

```javascript
// Comprehensive performance monitoring
class PerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.reportingEndpoint = '/api/performance';
        this.setupObservers();
        this.trackUserInteractions();
    }
    
    setupObservers() {
        // Core Web Vitals
        this.observeLCP();
        this.observeFID();
        this.observeCLS();
        
        // Custom metrics
        this.observeResourceLoading();
        this.observeUserTimings();
        this.observeLongTasks();
    }
    
    observeLCP() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            const lastEntry = entries[entries.length - 1];
            
            this.metrics.set('LCP', {
                value: lastEntry.startTime,
                element: lastEntry.element?.tagName || 'unknown',
                url: lastEntry.url || '',
                timestamp: Date.now()
            });
            
            this.reportMetric('LCP', lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
    
    observeFID() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                const fid = entry.processingStart - entry.startTime;
                
                this.metrics.set('FID', {
                    value: fid,
                    eventType: entry.name,
                    target: entry.target?.tagName || 'unknown',
                    timestamp: Date.now()
                });
                
                this.reportMetric('FID', fid);
            });
        }).observe({ entryTypes: ['first-input'] });
    }
    
    observeCLS() {
        let clsValue = 0;
        let sessionValue = 0;
        let sessionEntries = [];
        
        new PerformanceObserver((entryList) => {
            for (const entry of entryList.getEntries()) {
                if (!entry.hadRecentInput) {
                    const firstSessionEntry = sessionEntries[0];
                    const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
                    
                    if (!firstSessionEntry || entry.startTime - lastSessionEntry.startTime > 1000) {
                        sessionValue = entry.value;
                        sessionEntries = [entry];
                    } else {
                        sessionValue += entry.value;
                        sessionEntries.push(entry);
                    }
                    
                    if (sessionValue > clsValue) {
                        clsValue = sessionValue;
                        
                        this.metrics.set('CLS', {
                            value: clsValue,
                            entries: sessionEntries.map(e => ({
                                startTime: e.startTime,
                                value: e.value,
                                sources: e.sources?.map(s => s.node?.tagName) || []
                            })),
                            timestamp: Date.now()
                        });
                        
                        this.reportMetric('CLS', clsValue);
                    }
                }
            }
        }).observe({ entryTypes: ['layout-shift'] });
    }
    
    observeResourceLoading() {
        new PerformanceObserver((entryList) => {
            const entries = entryList.getEntries();
            entries.forEach(entry => {
                if (entry.initiatorType === 'img' || entry.initiatorType === 'css' || entry.initiatorType === 'script') {
                    this.trackResourcePerformance(entry);
                }
            });
        }).observe({ entryTypes: ['resource'] });
    }
    
    trackResourcePerformance(entry) {
        const resourceMetrics = {
            name: entry.name,
            type: entry.initiatorType,
            duration: entry.duration,
            transferSize: entry.transferSize,
            encodedBodySize: entry.encodedBodySize,
            decodedBodySize: entry.decodedBodySize,
            renderBlockingStatus: entry.renderBlockingStatus,
            timestamp: Date.now()
        };
        
        // Track slow loading resources
        if (entry.duration > 1000) {
            this.reportSlowResource(resourceMetrics);
        }
    }
    
    trackUserInteractions() {
        // Track interaction responsiveness
        let interactionCount = 0;
        
        ['click', 'touchstart', 'keydown'].forEach(eventType => {
            document.addEventListener(eventType, (event) => {
                const startTime = performance.now();
                
                requestAnimationFrame(() => {
                    const endTime = performance.now();
                    const interactionTime = endTime - startTime;
                    
                    this.metrics.set(`interaction_${++interactionCount}`, {
                        type: eventType,
                        duration: interactionTime,
                        target: event.target.tagName,
                        timestamp: Date.now()
                    });
                    
                    if (interactionTime > 100) {
                        this.reportSlowInteraction(eventType, interactionTime);
                    }
                });
            }, { passive: true });
        });
    }
    
    reportMetric(name, value) {
        const deviceInfo = this.getDeviceInfo();
        const networkInfo = this.getNetworkInfo();
        
        const report = {
            metric: name,
            value: Math.round(value),
            url: window.location.href,
            userAgent: navigator.userAgent,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            device: deviceInfo,
            network: networkInfo,
            timestamp: Date.now()
        };
        
        this.sendReport(report);
    }
    
    getDeviceInfo() {
        return {
            type: this.getDeviceType(),
            memory: navigator.deviceMemory || 'unknown',
            cores: navigator.hardwareConcurrency || 'unknown',
            pixelRatio: window.devicePixelRatio || 1
        };
    }
    
    getDeviceType() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    }
    
    getNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        return {
            effectiveType: connection?.effectiveType || 'unknown',
            downlink: connection?.downlink || 'unknown',
            rtt: connection?.rtt || 'unknown',
            saveData: connection?.saveData || false
        };
    }
    
    sendReport(report) {
        // Use sendBeacon for reliability
        if (navigator.sendBeacon) {
            navigator.sendBeacon(this.reportingEndpoint, JSON.stringify(report));
        } else {
            // Fallback to fetch
            fetch(this.reportingEndpoint, {
                method: 'POST',
                body: JSON.stringify(report),
                headers: {
                    'Content-Type': 'application/json'
                },
                keepalive: true
            }).catch(err => console.log('Failed to send performance report:', err));
        }
    }
    
    generatePerformanceReport() {
        return {
            metrics: Object.fromEntries(this.metrics),
            summary: this.generateSummary(),
            recommendations: this.generateRecommendations()
        };
    }
    
    generateSummary() {
        const lcp = this.metrics.get('LCP')?.value || 0;
        const fid = this.metrics.get('FID')?.value || 0;
        const cls = this.metrics.get('CLS')?.value || 0;
        
        return {
            overallScore: this.calculateOverallScore(lcp, fid, cls),
            coreWebVitals: {
                LCP: { value: lcp, rating: this.rateLCP(lcp) },
                FID: { value: fid, rating: this.rateFID(fid) },
                CLS: { value: cls, rating: this.rateCLS(cls) }
            }
        };
    }
    
    calculateOverallScore(lcp, fid, cls) {
        const lcpScore = lcp <= 2500 ? 100 : lcp <= 4000 ? 50 : 0;
        const fidScore = fid <= 100 ? 100 : fid <= 300 ? 50 : 0;
        const clsScore = cls <= 0.1 ? 100 : cls <= 0.25 ? 50 : 0;
        
        return Math.round((lcpScore + fidScore + clsScore) / 3);
    }
    
    rateLCP(value) {
        if (value <= 2500) return 'good';
        if (value <= 4000) return 'needs-improvement';
        return 'poor';
    }
    
    rateFID(value) {
        if (value <= 100) return 'good';
        if (value <= 300) return 'needs-improvement';
        return 'poor';
    }
    
    rateCLS(value) {
        if (value <= 0.1) return 'good';
        if (value <= 0.25) return 'needs-improvement';
        return 'poor';
    }
}

// Initialize performance monitoring
const performanceMonitor = new PerformanceMonitor();

// Report performance on page unload
window.addEventListener('beforeunload', () => {
    const report = performanceMonitor.generatePerformanceReport();
    navigator.sendBeacon('/api/performance/summary', JSON.stringify(report));
});
```

## Best Practices Summary

### Performance Optimization Checklist

✅ **Critical Rendering Path**: Inline critical CSS, preload key resources  
✅ **Resource Prioritization**: Use `rel="preload"` for critical resources  
✅ **Code Splitting**: Split bundles by route and device capability  
✅ **Network Awareness**: Adapt content delivery to connection quality  
✅ **Image Optimization**: Use modern formats with appropriate compression  
✅ **Lazy Loading**: Load non-critical resources when needed  
✅ **Performance Monitoring**: Track Core Web Vitals and user experience  

❌ **Blocking Resources**: Avoid render-blocking CSS/JS  
❌ **Heavy Initial Bundles**: Don't load everything upfront  
❌ **Ignored Network Conditions**: Adapt to user's connection  
❌ **Unoptimized Images**: Compress and use appropriate formats  
❌ **Missing Monitoring**: Track performance metrics consistently  

This comprehensive performance optimization system ensures your responsive designs load quickly and provide excellent user experiences across all devices and network conditions.
