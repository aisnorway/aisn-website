/**
 * SEO Configuration for Eleventy
 * Contains filters and functions to improve site discoverability
 */

module.exports = function(eleventyConfig) {
  // Add SEO-optimized slug generation
  eleventyConfig.addFilter("seoSlugify", function(str) {
    if (!str) return "";
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  });

  // Format dates for SEO purposes
  eleventyConfig.addFilter("toISOString", function(date) {
    if (!date) return new Date().toISOString();
    return new Date(date).toISOString();
  });

  // Add reading time estimator for article structured data
  eleventyConfig.addFilter("readingTime", function(text) {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  });

  // Create absolute URLs for canonical links and meta tags
  eleventyConfig.addFilter("absoluteUrl", function(url) {
    return `https://aisafety.no${url}`;
  });

  // Create language-specific meta descriptions
  eleventyConfig.addFilter("getMetaDescription", function(description, lang, i18nData) {
    if (description) return description;
    
    // Return the appropriate language-specific site description
    if (lang === 'en') {
      return i18nData.en.site.description;
    } else {
      return i18nData.no.site.description;
    }
  });

  // Format image URL for social sharing
  eleventyConfig.addFilter("formatSocialImage", function(imagePath, title) {
    if (!imagePath) {
      return 'https://aisafety.no/img/social-share-image.jpg';
    }
    
    // Ensure the image path starts with a slash if it's relative
    if (!imagePath.startsWith('http') && !imagePath.startsWith('/')) {
      imagePath = '/' + imagePath;
    }
    
    // If the image is already an absolute URL, return it as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Otherwise, prepend the domain
    return 'https://aisafety.no' + imagePath;
  });

  // Generate optimized page titles
  eleventyConfig.addFilter("generatePageTitle", function(title, lang) {
    const suffix = "AI Safety Norway";
    if (!title || title === suffix) return suffix;
    
    // Add relevant keywords based on language
    if (lang === 'en') {
      return `${title} | ${suffix} - Safe AI in Norway`;
    } else {
      return `${title} | ${suffix} - Sikker AI i Norge`;
    }
  });
}; 