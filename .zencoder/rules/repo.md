# Repository Info

- Name: Portfolio Site
- Stack: Static HTML, CSS-in-HTML, vanilla JavaScript
- Entry point: index.html
- Notable external deps:
  - Font Awesome 6 (CDN)
  - Animate.css (CDN)
- Features already present:
  - Section-based layout (Hero, About, Skills, Projects, Certifications, Education, Experience, Contact)
  - AOS-like custom classes with IntersectionObserver and scroll-triggered animations
  - Smooth scroll and scroll-to-top button
  - Mobile menu created at runtime

# Editing Guidance
- Keep all paths relative to index.html as it’s a single-page site.
- Prefer updating styles inside the <style> block within index.html.
- Use semantic, accessible elements; avoid intrusive animations.

# Future Ideas
- Extract CSS and JS to separate files for maintainability.
- Add dark mode (data-theme), persisted via localStorage.
- Optional: background floating shapes with reduced opacity and pointer-events: none.