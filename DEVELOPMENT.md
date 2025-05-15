# Development Guide for AI Safety Norway Website

This document provides technical details for developers working on the AI Safety Norway website.

## 🌐 Website Structure

The AI Safety Norway website is built using [Eleventy](https://www.11ty.dev/), a powerful static site generator. The website is designed to be multilingual (Norwegian and English) and focuses on promoting AI safety awareness and research in Norway.

### Key Technical Components

- **Static Site Generator**: Eleventy (11ty)
- **CSS**: Custom CSS with modular organization (no framework)
- **JavaScript**: Vanilla JS with modular organization
- **Build System**: npm scripts
- **Deployment**: GitHub Pages with custom domain

## 🛠️ Development Environment

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/aisnorway/aisn-website.git
   cd aisn-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```

The development server will be available at http://localhost:8080 with live reloading.

## 🌍 Internationalization System

The website uses a custom internationalization system:

- Translation strings are stored in JSON files in `_data/i18n/` directory
- `en.json` for English and `no.json` for Norwegian
- Content is accessed using the `i18n` filter in templates
- URLs are language-prefixed (e.g., `/en/about/`, `/no/om-oss/`)

### Adding/Updating Translations

To update text content on the website, locate the appropriate string in the language files:

1. Open `_data/i18n/en.json` and/or `_data/i18n/no.json`
2. Find the relevant section (organized hierarchically)
3. Update the text value
4. Ensure you update both language files to maintain consistency

For example, updating homepage content:

```json
"home": {
  "problem": {
    "title": "The Challenge We Face",
    "points": [
      {
        "title": "The AI Arms Race",
        "description": "Competition between leading AI labs and nation states is driving a race towards increasingly advanced AI systems at the cost of everyone's safety."
      },
      // ...
    ]
  }
}
```

## 📝 Content Management

### Homepage Sections

The homepage is constructed from several sections defined in `_includes/sections/home-content.njk`. Each section pulls content from the internationalization files.

#### Updating "The Challenge We Face" Section

This section contains highlight cards and feature cards:

1. **Highlight Cards** - The top row of cards with icons
   - Content in `i18n/[lang].json` under `home.problem.highlights`
   - Icons can be changed in `_includes/sections/home-content.njk`

2. **Feature Cards** - The main content cards
   - Content in `i18n/[lang].json` under `home.problem.points`

### Adding Newsletter Articles

Create a new Markdown file in the appropriate language directory:

```
en/newsletter/your-article-slug.md  # English article
no/nyhetsbrev/your-article-slug.md  # Norwegian article
```

Add the required front matter:

```yaml
---
layout: post.njk
title: "Your Article Title"
date: 2024-08-15
author: "Author Name"
lang: en  # or "no" for Norwegian
permalink: /en/newsletter/your-article-slug/  # or /no/nyhetsbrev/your-article-slug/ for Norwegian
description: "A brief excerpt that summarizes your article."
image: "/img/articles/your-featured-image.jpg"  # Featured image path
---

Article content goes here in Markdown format.
```

## 🎨 Styling

The CSS is organized in a modular architecture:

- `css/base/` - Core styles and variables
- `css/components/` - Reusable component styles (cards, buttons, etc.)
- `css/pages/` - Page-specific styles
- `css/sections/` - Section-specific styles
- `css/utils/` - Utility styles

### Adding/Modifying Styles

1. Locate the appropriate CSS file for the component or page you want to modify
2. Make your changes following the existing patterns and variable usage
3. Avoid adding inline styles in HTML templates
4. Use CSS custom properties (`--variable-name`) for consistent theming

## 🚀 Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch:

1. Commit your changes
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

2. Push to main branch to trigger deployment
   ```bash
   git push origin main
   ```

The GitHub Actions workflow will build and deploy the site to the custom domain.

## 📋 Best Practices

1. **Internationalization**:
   - Always update both language files when changing content
   - Test both language versions of the site

2. **Responsive Design**:
   - Test all changes on mobile, tablet, and desktop viewports
   - Use the existing responsive breakpoints

3. **Performance**:
   - Optimize images before adding them to the site
   - Minimize JavaScript usage

4. **Accessibility**:
   - Maintain proper heading hierarchy
   - Include alt text for images
   - Ensure sufficient color contrast
   - Test keyboard navigation

5. **Git Workflow**:
   - Make atomic commits with clear messages
   - For major changes, consider using feature branches
   - Include relevant issue numbers in commit messages

## 🤝 Getting Help

If you encounter issues or have questions about the codebase, please:

1. Check existing documentation in the `docs/` folder
2. Create an issue in the GitHub repository
3. Contact the project maintainer 