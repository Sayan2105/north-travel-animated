# Northbound Cinematic Landing Page Prototype

Fresh build using real HTML/CSS/JS + GSAP ScrollTrigger. No Three.js, no WebGL.

## Included

- Hero stargazing image from the supplied asset
- Multiple lightweight shooting stars
- 3-viewport hero scroll timeline
- Black cinematic transition
- Scroll-controlled bike video timeline
- Responsive source hooks for desktop and mobile video
- Small branding overlay to cover the fixed generator watermark in the free prototype footage
- HTML text layered over the cinema for SEO/accessibility
- Separate admin.html settings panel using localStorage for the prototype
- Final CTA with WhatsApp, Instagram and email
- Placeholder final mountain scene until the final summit image is supplied

## Files

- `index.html` public site
- `styles.css` public styles
- `app.js` animation + settings binding
- `admin.html` content/settings editor
- `admin.css` editor styles
- `admin.js` editor logic
- `assets/images/hero-stargazing.webp`
- `assets/video/scene-bike.webm`
- `assets/video/scene-bike.mp4`

## Important

The DemoAI watermark visible in the supplied free video is not removed from the source. The prototype places a client branding layer over that fixed area because the watermark does not move.

For production, replace the free watermarked footage with a clean licensed source.

The current settings editor is intentionally a prototype. When this moves into Laravel + Filament, store the same settings in the database and render the content server-side so the SEO content remains first-class HTML.
