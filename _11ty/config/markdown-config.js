/**
 * Markdown Configuration for Eleventy
 * Configures how Markdown content is parsed and rendered
 */

const markdownIt = require("markdown-it");

module.exports = function(eleventyConfig) {
  /**
   * Configure markdown-it with custom options
   */
  const markdownOptions = {
    html: true,        // Allow HTML tags within Markdown
    breaks: true,      // Convert single newlines in paragraphs into <br> tags
    linkify: true      // Automatically detect URLs and make them links
  };
  
  // Create markdown-it instance with options
  const markdownLib = markdownIt(markdownOptions);
  
  // Add plugins to markdown-it if needed
  // Example: markdownLib.use(require('markdown-it-anchor'), anchorOptions);
  
  // Set as the renderer for markdown files
  eleventyConfig.setLibrary("md", markdownLib);
}; 