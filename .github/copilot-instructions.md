# Copilot Instructions for filmph.github.io

## Project Overview
This is a static website project, likely using Jekyll or a similar static site generator, as indicated by the presence of `_config.yml` and multiple `.html` files. The site appears to be a personal or portfolio site with sections for films, interviews, links, and a manifest for PWA support.

## Key Files and Structure
- `_config.yml`: Main configuration for site-wide settings. Edit this for global metadata, navigation, and build options.
- `index.html`, `film.html`, `interviews.html`, `links.html`: Main content pages. Each is a standalone HTML file.
- `css/styles.css`: Central stylesheet for all pages. Follow existing CSS conventions for layout and design.
- `manifest.json`: PWA manifest for mobile and installable experiences.
- `sw.js`: Service worker for offline support and caching.
- `README.md`: Currently empty; does not provide workflow or architectural guidance.

## Developer Workflows
- **Build/Serve**: If using Jekyll, run `jekyll serve` or `bundle exec jekyll serve` to preview locally. No build scripts or package managers detected.
- **Static Editing**: Directly edit HTML and CSS files. No templating or dynamic content detected.
- **PWA Features**: Update `manifest.json` and `sw.js` for changes to offline or installable behavior.

## Patterns and Conventions
- All content is managed in static HTML files; no includes, layouts, or templating found.
- CSS is centralized in `css/styles.css`. Avoid inline styles; use classes and selectors as defined.
- No JavaScript frameworks or build tools present. Any JS should be added as plain scripts.
- Site configuration is only in `_config.yml`.
- No tests, CI/CD, or automation scripts detected.

## Integration Points
- PWA: `manifest.json` and `sw.js` are used for progressive web app features. Ensure updates to these files are consistent.
- No external dependencies or APIs detected.

## Examples
- To add a new page, create a new `.html` file and link it in `index.html` and/or other navigation sections.
- To update site-wide settings (title, description), edit `_config.yml`.
- For style changes, update `css/styles.css` and reference classes in HTML files.

## Recommendations for AI Agents
- Respect the static site structure; do not introduce frameworks or build tools unless explicitly requested.
- When adding new features, follow the pattern of standalone HTML and centralized CSS.
- Document any new conventions in this file for future agents.

---
_Last updated: October 1, 2025_
