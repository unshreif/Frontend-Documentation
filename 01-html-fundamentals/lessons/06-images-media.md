# Images and Media Elements

## The Image Element

### Basic Image Syntax
```html
<img src="path/to/image.jpg" alt="Description of the image">
```

### Essential Image Attributes

#### src (Source)
The `src` attribute specifies the path to the image file:
```html
<!-- Relative paths -->
<img src="images/logo.png" alt="Company logo">
<img src="../assets/photo.jpg" alt="Photo">

<!-- Absolute paths -->
<img src="https://example.com/image.jpg" alt="External image">

<!-- Data URLs (base64 encoded) -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" alt="1x1 pixel">
```

#### alt (Alternative Text)
Critical for accessibility and SEO:
```html
<!-- Descriptive alt text -->
<img src="sunset.jpg" alt="Golden sunset over calm ocean with silhouetted palm trees">

<!-- Functional alt text for icons -->
<img src="search-icon.png" alt="Search">

<!-- Empty alt for decorative images -->
<img src="decoration.png" alt="">

<!-- Don't do this -->
<img src="photo.jpg" alt="photo"> <!-- Too generic -->
<img src="image1.jpg" alt="image1"> <!-- Filename as alt text -->
```

#### width and height
Control image dimensions:
```html
<!-- Fixed dimensions -->
<img src="photo.jpg" alt="Portrait" width="300" height="400">

<!-- Maintain aspect ratio (specify only one) -->
<img src="landscape.jpg" alt="Mountain view" width="600">

<!-- CSS is preferred for styling -->
<img src="photo.jpg" alt="Portrait" style="width: 300px; height: auto;">
```

#### title
Provides tooltip text:
```html
<img src="chart.png" alt="Sales data for Q3 2023" title="Hover for additional chart information">
```

#### loading
Control when images load:
```html
<!-- Lazy loading (loads when near viewport) -->
<img src="large-image.jpg" alt="High resolution photo" loading="lazy">

<!-- Eager loading (default behavior) -->
<img src="hero-image.jpg" alt="Main banner" loading="eager">
```

## Responsive Images

### srcset Attribute
Provide multiple image sources for different screen densities:
```html
<!-- Different resolutions for same image -->
<img src="photo-800w.jpg" 
     srcset="photo-400w.jpg 400w,
             photo-800w.jpg 800w,
             photo-1200w.jpg 1200w"
     sizes="(max-width: 600px) 400px,
            (max-width: 900px) 800px,
            1200px"
     alt="Responsive landscape photo">

<!-- High DPI displays -->
<img src="logo.png" 
     srcset="logo.png 1x,
             logo@2x.png 2x,
             logo@3x.png 3x"
     alt="Company logo">
```

### Picture Element
For art direction and format selection:
```html
<picture>
    <!-- WebP format for modern browsers -->
    <source srcset="hero.webp" type="image/webp">
    
    <!-- AVIF format for cutting-edge browsers -->
    <source srcset="hero.avif" type="image/avif">
    
    <!-- Different crops for different screen sizes -->
    <source media="(max-width: 600px)" srcset="hero-mobile.jpg">
    <source media="(max-width: 1200px)" srcset="hero-tablet.jpg">
    
    <!-- Fallback image -->
    <img src="hero.jpg" alt="Hero image showing product in action">
</picture>
```

### Figure and Figcaption
Semantic markup for images with captions:
```html
<figure>
    <img src="chart.png" alt="Quarterly sales data showing 15% growth">
    <figcaption>
        <strong>Q3 Sales Growth:</strong> Our sales increased by 15% compared to the previous quarter,
        driven primarily by increased online purchases and new product launches.
    </figcaption>
</figure>

<!-- Multiple images in one figure -->
<figure>
    <img src="before.jpg" alt="Website design before redesign">
    <img src="after.jpg" alt="Website design after redesign">
    <figcaption>Before and after comparison of our website redesign project</figcaption>
</figure>
```

## Audio Element

### Basic Audio Implementation
```html
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    <source src="audio.wav" type="audio/wav">
    <p>Your browser doesn't support HTML5 audio. <a href="audio.mp3">Download the audio file</a>.</p>
</audio>
```

### Audio Attributes
```html
<audio controls preload="metadata" loop>
    <source src="background-music.mp3" type="audio/mpeg">
    <source src="background-music.ogg" type="audio/ogg">
    Your browser does not support the audio element.
</audio>
```

#### Common Audio Attributes:
- `controls`: Shows play/pause/volume controls
- `autoplay`: Automatically starts playing (not recommended)
- `loop`: Repeats the audio when it ends
- `muted`: Starts muted
- `preload`: 
  - `none`: Don't preload
  - `metadata`: Preload only metadata
  - `auto`: Preload the entire file

### Accessible Audio Controls
```html
<figure>
    <audio controls aria-labelledby="audio-title" aria-describedby="audio-desc">
        <source src="podcast-episode-1.mp3" type="audio/mpeg">
        <source src="podcast-episode-1.ogg" type="audio/ogg">
        <p>Your browser doesn't support HTML5 audio. <a href="podcast-episode-1.mp3">Download the podcast</a>.</p>
    </audio>
    <figcaption>
        <h3 id="audio-title">Podcast Episode 1: Getting Started with Web Development</h3>
        <p id="audio-desc">Duration: 45 minutes. In this episode, we discuss the fundamentals of HTML, CSS, and JavaScript.</p>
    </figcaption>
</figure>
```

## Video Element

### Basic Video Implementation
```html
<video controls width="640" height="360">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogg" type="video/ogg">
    <p>Your browser doesn't support HTML5 video. <a href="video.mp4">Download the video</a>.</p>
</video>
```

### Video with Poster and Attributes
```html
<video controls 
       width="800" 
       height="450" 
       poster="video-thumbnail.jpg"
       preload="metadata"
       aria-labelledby="video-title"
       aria-describedby="video-desc">
    <source src="tutorial.mp4" type="video/mp4">
    <source src="tutorial.webm" type="video/webm">
    
    <!-- Subtitles and captions -->
    <track kind="subtitles" src="tutorial-en.vtt" srclang="en" label="English" default>
    <track kind="subtitles" src="tutorial-es.vtt" srclang="es" label="Español">
    <track kind="captions" src="tutorial-captions.vtt" srclang="en" label="English Captions">
    
    <p>Your browser doesn't support HTML5 video. <a href="tutorial.mp4">Download the video</a>.</p>
</video>

<div>
    <h3 id="video-title">Web Development Tutorial: Building Your First Website</h3>
    <p id="video-desc">This 20-minute tutorial covers HTML basics, CSS styling, and JavaScript interactivity.</p>
</div>
```

### Video Accessibility with Tracks
```html
<video controls>
    <source src="presentation.mp4" type="video/mp4">
    
    <!-- Subtitles (translation) -->
    <track kind="subtitles" src="subs-en.vtt" srclang="en" label="English" default>
    <track kind="subtitles" src="subs-fr.vtt" srclang="fr" label="Français">
    
    <!-- Captions (includes sound effects, music cues) -->
    <track kind="captions" src="captions-en.vtt" srclang="en" label="English Captions">
    
    <!-- Descriptions (for visually impaired) -->
    <track kind="descriptions" src="descriptions-en.vtt" srclang="en" label="Audio Descriptions">
    
    <!-- Chapters -->
    <track kind="chapters" src="chapters.vtt" srclang="en" label="Chapters">
</video>
```

### WebVTT Caption File Example
```vtt
WEBVTT

00:00:00.000 --> 00:00:05.000
Welcome to our web development tutorial series.

00:00:05.001 --> 00:00:10.000
In this video, we'll cover HTML fundamentals.

00:00:10.001 --> 00:00:15.000
[upbeat music playing]
Let's start with document structure.
```

## Embedded Content

### iframe Element
```html
<!-- YouTube video embed -->
<iframe width="560" 
        height="315" 
        src="https://www.youtube.com/embed/VIDEO_ID" 
        title="YouTube video player"
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
</iframe>

<!-- Google Maps embed -->
<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.1..."
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
        title="Our office location">
</iframe>

<!-- Responsive iframe -->
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
    <iframe src="https://www.youtube.com/embed/VIDEO_ID"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            frameborder="0"
            allowfullscreen
            title="Responsive video">
    </iframe>
</div>
```

## Image Optimization Best Practices

### File Formats
```html
<!-- Use appropriate formats -->
<!-- JPEG for photos with many colors -->
<img src="photo.jpg" alt="Colorful landscape photo">

<!-- PNG for images with transparency or few colors -->
<img src="logo.png" alt="Company logo with transparent background">

<!-- WebP for modern browsers (smaller file sizes) -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Optimized image">
</picture>

<!-- SVG for simple graphics and icons -->
<img src="icon.svg" alt="Scalable icon">
```

### Performance Optimization
```html
<!-- Lazy loading for images below the fold -->
<img src="large-image.jpg" 
     alt="Detailed infographic" 
     loading="lazy"
     decoding="async">

<!-- Priority hints for important images -->
<img src="hero-image.jpg" 
     alt="Main product showcase" 
     fetchpriority="high">

<!-- Preload critical images -->
<link rel="preload" as="image" href="hero-image.jpg">
```

## Accessibility Considerations

### Writing Effective Alt Text
```html
<!-- Good alt text examples -->
<img src="chart.png" alt="Sales increased 25% from January to June 2023">

<img src="team-photo.jpg" alt="Five team members standing in office, smiling at camera">

<img src="warning-icon.png" alt="Warning: This action cannot be undone">

<!-- Context-dependent alt text -->
<a href="profile.html">
    <img src="john-doe.jpg" alt="John Doe"> <!-- Name is sufficient in link context -->
</a>

<img src="john-doe.jpg" alt="John Doe, Senior Developer, wearing blue shirt and glasses">
<!-- More descriptive when not in link -->
```

### Complex Images
```html
<!-- Charts and graphs -->
<figure>
    <img src="complex-chart.png" alt="Bar chart showing quarterly revenue">
    <figcaption>
        <p>Quarterly Revenue 2023:</p>
        <ul>
            <li>Q1: $2.3 million</li>
            <li>Q2: $2.8 million</li>
            <li>Q3: $3.1 million</li>
            <li>Q4: $3.5 million</li>
        </ul>
    </figcaption>
</figure>

<!-- Or link to detailed description -->
<img src="complex-diagram.png" 
     alt="Network architecture diagram" 
     aria-describedby="diagram-description">

<div id="diagram-description">
    <h3>Detailed Description</h3>
    <p>The network diagram shows three main components...</p>
</div>
```

## Practical Exercise

### Build a Media-Rich Article
Create an HTML page that includes:

1. **Hero Image**: Responsive image with multiple sources
2. **Article Content**: Text with inline images and figures
3. **Image Gallery**: Grid of images with captions
4. **Video Section**: Embedded video with captions
5. **Audio Player**: Podcast or audio content
6. **Infographic**: Complex image with detailed alt text

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Media-Rich Article Example</title>
    <style>
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .gallery figure {
            margin: 0;
        }
        
        .responsive-video {
            position: relative;
            padding-bottom: 56.25%;
            height: 0;
            overflow: hidden;
            margin: 2rem 0;
        }
        
        .responsive-video iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <article>
        <header>
            <!-- Hero image implementation here -->
        </header>
        
        <section>
            <!-- Article content with media elements -->
        </section>
        
        <section class="gallery">
            <!-- Image gallery -->
        </section>
        
        <section>
            <!-- Video and audio content -->
        </section>
    </article>
</body>
</html>
```

### Assessment Criteria
- [ ] All images have appropriate alt text
- [ ] Responsive images work on different screen sizes
- [ ] Media elements are accessible with keyboard navigation
- [ ] Video includes captions or subtitles
- [ ] Audio has meaningful descriptions
- [ ] Page loads efficiently with optimized media
- [ ] Semantic HTML structure is maintained
