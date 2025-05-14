# AI Safety Norway Website

This repository contains the official website for AI Safety Norway, built using the [Eleventy](https://www.11ty.dev/) static site generator. The site is designed to be multilingual (Norwegian and English) and focuses on promoting research and awareness of AI safety in Norway.

The website is hosted at [aisafety.no](https://aisafety.no/).

## 🌟 Recent Updates

The website has undergone significant improvements:

- **Newsletter System**: Implemented a dedicated newsletter section for both languages
- **Team Information**: Updated team structure with proper contact information
- **Performance Optimization**: Removed unused CSS code and simplified JavaScript
- **Content Structure**: Better organization of content in both languages
- **Usability Improvements**: Fixed display issues and improved responsive layout
- **Deployment**: Set up automatic deployment via GitHub Pages with custom domain aisafety.no

See [CHANGES.md](CHANGES.md) for a detailed changelog.

## 📋 Project Structure

```
├── _11ty/                  # Eleventy configuration and plugins
│   ├── config/             # Modular config components
│   │   ├── collections-config.js
│   │   ├── filters-config.js
│   │   ├── i18n-config.js
│   │   └── markdown-config.js
│   └── translation-helper.js
├── _data/                  # Global data files
│   └── i18n/               # Translation files
│       ├── en.json         # English translations
│       └── no.json         # Norwegian translations
├── _includes/              # Template components
│   ├── sections/           # Page section components
│   ├── about.njk
│   ├── base.njk            # Base template
│   ├── contact.njk
│   ├── home.njk
│   ├── newsletter.njk
│   ├── post.njk            # Individual newsletter article template
│   └── quotes.njk
├── _site/                  # Generated site (not in repo)
├── css/                    # Stylesheets
│   ├── base/               # Core styles
│   ├── components/         # Component styles
│   ├── pages/              # Page-specific styles
│   │   ├── home.css        # Homepage styles
│   │   ├── about.css       # About page styles
│   │   ├── contact.css     # Contact page styles
│   │   ├── newsletter.css  # Newsletter list page styles
│   │   ├── post.css        # Individual article styles
│   │   └── quotes.css      # Quotes page styles
│   ├── sections/           # Section styles
│   └── main.css            # Main stylesheet (imports others)
├── en/                     # English content
│   ├── pages/              # English pages
│   └── newsletter/         # English newsletter articles
├── js/                     # JavaScript
│   └── main.js             # Main JavaScript file
├── no/                     # Norwegian content
│   ├── pages/              # Norwegian pages
│   └── nyhetsbrev/         # Norwegian newsletter articles
├── img/                    # Image assets
│   ├── articles/           # Article images
│   ├── team/               # Team member photos
│   └── logo/               # Site logo
├── .eleventy.js            # Eleventy configuration
├── index.html              # Site entry point
├── package.json            # Project dependencies
└── README.md               # This file
```

## 🌐 Multilingual Architecture

The site is built with multilingual support from the ground up:

- Content is organized in language-specific directories (`/en/` and `/no/`)
- Translation strings are stored in JSON files in `_data/i18n/`
- The default language is Norwegian (`no`)
- URLs are prefixed with language codes (e.g., `/en/about/`, `/no/om-oss/`)
- Language switcher automatically detects and links to translations

## 🚀 Development Workflow

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/aisnorway/aisn-website.git
   cd aisn-website
   ```

2. Install dependencies
   ```bash
   npm install
   ```

### Available Scripts

- `npm start` - Start the development server with hot reloading
- `npm run build` - Build the site for production (with optimization)
- `npm run clean` - Remove the generated site directory

### Development Server

Run the development server to preview changes in real-time:

```bash
npm start
```

The site will be available at http://localhost:8080.

## 🌐 Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch. The workflow is defined in `.github/workflows/build-deploy.yml`.

### Custom Domain Setup

The website uses the custom domain [aisafety.no](https://aisafety.no/). The domain configuration is managed through:

1. A `CNAME` file in the repository root
2. GitHub Pages settings in the repository settings
3. DNS configuration with your domain registrar pointing to GitHub Pages

To set up the DNS records for your domain, add these records at your domain registrar:

| Type  | Name          | Value                     |
|-------|---------------|---------------------------|
| A     | @             | 185.199.108.153           |
| A     | @             | 185.199.109.153           |
| A     | @             | 185.199.110.153           |
| A     | @             | 185.199.111.153           |
| CNAME | www           | aisnorway.github.io       |

## 📝 Content Management

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

For more information about newsletter article styling and best practices, see the detailed [Newsletter Guide](docs/newsletter-guide.md) documentation.

### Adding Images in Articles

To include images in your article content, use standard Markdown syntax:

```md
![Alt text for the image](/img/articles/some-image-name.jpg)
```

For more control, you can also use HTML:

```md
<img src="/img/articles/some-image-name.jpg" alt="Description of image" class="article-image" />
```

### Updating the Logo

The site includes a PNG logo in the header. To update it:

1. Replace the file at `img/logo/logo.png` with your PNG logo
2. For best results, design your logo with a height of approximately 40px

### Adding Translations

1. For page content, create corresponding files in both language directories
2. For UI elements, add translation strings to `_data/i18n/en.json` and `_data/i18n/no.json`

## 🔧 Technical Architecture

### CSS Architecture

- **Modular Organization**: CSS is organized into logical directories
- **Responsive Design**: Mobile-first approach with consistent breakpoints
- **Design System**: Custom variables for colors, spacing, and typography

### JavaScript Architecture

- Modular organization using object-based components
- Progressive enhancement approach
- Mobile and touch device optimizations

## 📚 Documentation

For more detailed documentation:

- [CHANGES.md](CHANGES.md) - Detailed list of recent changes and improvements
- [DEVELOPMENT.md](DEVELOPMENT.md) - Developer guide with technical details
- [CONTRIBUTING.md](CONTRIBUTING.md) - Guide for contributors
- [docs/i18n-guide.md](docs/i18n-guide.md) - Guide for internationalizing content
- [docs/updating-logo.md](docs/updating-logo.md) - Instructions for updating the logo

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on the contribution workflow, coding standards, and pull request process.

## 📄 License

This project is licensed under the ISC License - see the repository for details.

## 🙏 Acknowledgements

- Built with [Eleventy](https://www.11ty.dev/)
- Uses [Luxon](https://moment.github.io/luxon/) for date handling
- Styling based on [PicoCSS](https://picocss.com/) 