/**
 * ==================================================================
 * Eleventy Configuration File (.eleventy.js)
 * ==================================================================
 * 
 * This file configures the Eleventy static site generator for the 
 * AI Safety Norway website. It defines the site structure, custom filters,
 * collections, and other settings needed to generate the static site.
 * 
 * Project: AI Safety Norway Website
 * Repository: https://github.com/ai-safety-norway/website
 * 
 * Eleventy Docs: https://www.11ty.dev/docs/config/
 * 
 * Key components:
 * - Passthrough copy for static assets
 * - Date formatting filters
 * - Content excerpt generation
 * - Post collections for articles
 * - Markdown processing configuration
 * - Directory structure configuration
 * - Internationalization support
 */

// ------------------------------------------------------------------------
// Multilingual Support Configuration
// ------------------------------------------------------------------------
// 
// This website uses a consistent language path structure:
// - /en/* for English content
// - /no/* for Norwegian content
// 
// The language-specific content is managed through:
// 1. Separate directories for language-specific pages
// 2. Shared templates in _includes for each page type
// 3. Translation JSON files in _data/i18n
//
// Root-level pages (/about/, /contact/, etc.) redirect to the appropriate 
// language version based on the user's preference stored in localStorage.
//
// To support this architecture, we:
// - Use language codes as prefixes for all URLs
// - Generate alternate language links for SEO
// - Provide language utility functions in language-utils.njk
// ------------------------------------------------------------------------

// Import Dependencies
const { DateTime } = require("luxon");
// Import markdown-it for Markdown parsing customization
const markdownIt = require("markdown-it");
// Import fs for file system operations
const fs = require("fs");
const path = require("path");
// Import custom plugins
const translationHelper = require("./_11ty/translation-helper");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

// Import configuration modules
const i18nConfig = require("./_11ty/config/i18n-config");
const filtersConfig = require("./_11ty/config/filters-config");
const collectionsConfig = require("./_11ty/config/collections-config");
const markdownConfig = require("./_11ty/config/markdown-config");
const optimizationConfig = require("./_11ty/config/optimization-config");
const seoConfig = require("./_11ty/config/seo-config");

module.exports = function(eleventyConfig) {

  // Load custom plugins
  eleventyConfig.addPlugin(translationHelper);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  // ==================================================================
  // Passthrough File Copy
  // ==================================================================
  // Copies files/folders directly to the output directory (_site).
  // Useful for static assets like CSS, images, fonts, etc.
  // Docs: https://www.11ty.dev/docs/copy/
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("img"); // Uncomment if you add an images folder
  eleventyConfig.addPassthroughCopy("site.webmanifest");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("google-site-verification.txt");
  // eleventyConfig.addPassthroughCopy("admin"); // Example for Netlify CMS admin folder

  // ==================================================================
  // SEO Specific Configuration
  // ==================================================================
  seoConfig(eleventyConfig);

  // ==================================================================
  // Internationalization (i18n) Configuration
  // ==================================================================
  i18nConfig(eleventyConfig);

  // ==================================================================
  // Custom Filters
  // ==================================================================
  filtersConfig(eleventyConfig);

  // ==================================================================
  // Collections
  // ==================================================================
  collectionsConfig(eleventyConfig);

  // ==================================================================
  // Markdown Parsing Configuration
  // ==================================================================
  markdownConfig(eleventyConfig);

  // ==================================================================
  // Production Optimizations
  // ==================================================================
  optimizationConfig(eleventyConfig);

  // ==================================================================
  // Global Settings & Directory Configuration
  // ==================================================================
  return {
    // --- Directory Structure --- 
    // Define where Eleventy looks for files and where it outputs them.
    // Paths are relative to the project root.
    dir: {
      // Source files folder (templates, content)
      // We use '.' to look in the root, including /pages, /posts, /index.md etc.
      input: ".", 
      // Output folder for the generated site
      output: "_site", 
      // Folder for includes (partials, macros), relative to project root
      includes: "_includes",
      // Folder for layouts, relative to project root
      // Often the same as includes. Used by front matter `layout: 'base.njk'`
      layouts: "_includes", 
      // Folder for site-wide data files (global data), relative to project root
      data: "_data" 
    },

    // --- Template Processing & Engines --- 
    // Control which files Eleventy processes and how.
    // Specify which file extensions Eleventy should process as templates.
    templateFormats: [
      "md",   // Markdown files
      "njk",  // Nunjucks templates
      "html"  // Process HTML files (allows Nunjucks in HTML)
    ],

    // --- Default Template Engines --- 
    // Set the default template engine for specific file extensions.
    // This allows using Nunjucks features (like filters, includes) within Markdown and HTML files.
    // Docs: https://www.11ty.dev/docs/config/#default-template-engine-for-markdown-files
    markdownTemplateEngine: "njk", 
    htmlTemplateEngine: "njk", 
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
}; 