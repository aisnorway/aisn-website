/**
 * Optimization Configuration for Eleventy
 * Handles production-specific optimizations
 */

module.exports = function(eleventyConfig) {
  // Skip optimization in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    return;
  }
  
  /**
   * Transform for HTML minification
   */
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    
    // Minify HTML content
    return content
      .replace(/<!--(?!-->).*?-->/g, '')      // Remove comments
      .replace(/\s{2,}/g, ' ')                // Replace multiple spaces with a single space
      .replace(/>\s+</g, '><')                // Remove whitespace between tags
      .replace(/\s+>/g, '>')                  // Remove whitespace before closing bracket
      .replace(/<\s+/g, '<')                  // Remove whitespace after opening bracket
      .replace(/^\s+|\s+$/g, '');             // Trim whitespace at start and end
  });
  
  /**
   * Transform for CSS minification
   */
  eleventyConfig.addTransform("cssmin", function(content, outputPath) {
    // Only process CSS files
    if (!outputPath || !outputPath.endsWith(".css")) {
      return content;
    }
    
    // Minify CSS content
    return content
      .replace(/\/\*(?!!)[\s\S]*?\*\//g, '')  // Remove comments
      .replace(/\s{2,}/g, ' ')                // Replace multiple spaces with a single space
      .replace(/\s*([:;,{}])\s*/g, '$1')      // Remove whitespace around special chars
      .replace(/;}|,}/g, '}')                 // Remove unnecessary semicolons and commas
      .replace(/^\s+|\s+$/g, '');             // Trim whitespace at start and end
  });
  
  /**
   * Optimize image references in HTML (add width/height attributes)
   */
  eleventyConfig.addTransform("optimizeImgTags", function(content, outputPath) {
    // Only process HTML files
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }
    
    // Simple regex-based transform to add loading="lazy" to images
    // This isn't a full HTML parser but works for basic cases
    return content.replace(
      /<img([^>]*)>/g, 
      (match, attributes) => {
        // Skip if already has loading attribute
        if (attributes.includes('loading=')) {
          return match;
        }
        
        // Add loading="lazy" attribute
        return `<img${attributes} loading="lazy">`;
      }
    );
  });
}; 