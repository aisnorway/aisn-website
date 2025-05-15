/**
 * Custom Filters Configuration for Eleventy
 * Handles date formatting, content excerpts, and other text transformations
 */

const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  /**
   * Format dates in a human-readable format
   * @param {Date} dateObj - JavaScript Date object
   * @param {string} format - Luxon date format string (default: "dd LLLL yyyy")
   * @returns {string} Formatted date string (e.g., "14 July 2024")
   */
  eleventyConfig.addFilter("readableDate", (dateObj, format = "dd LLLL yyyy") => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(format);
  });

  /**
   * Format dates in ISO8601/HTML format for <time> element
   * @param {Date} dateObj - JavaScript Date object
   * @returns {string} ISO8601 formatted date string
   */
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  /**
   * Generate excerpt from content by removing HTML, normalizing whitespace, and truncating
   * @param {string} content - HTML content to extract excerpt from
   * @param {number} limit - Maximum length of excerpt (default: 180 characters)
   * @returns {string} Plain text excerpt with ellipsis if truncated
   */
  eleventyConfig.addFilter("excerpt", (content, limit = 180) => {
    if (!content) {
      return '';
    }
    // 1. Strip HTML tags
    let textContent = content.replace(/<[^>]*>?/gm, '');
    // 2. Replace multiple whitespace characters (including newlines) with a single space
    textContent = textContent.replace(/\s+/g, ' ').trim();
    // 3. Truncate and add ellipsis if needed
    if (textContent.length > limit) {
      textContent = textContent.slice(0, limit).trimEnd() + '...';
    }
    return textContent;
  });
  
  /**
   * Minifies HTML content (removes comments, whitespace, etc.)
   * @param {string} content - HTML content to minify
   * @returns {string} Minified HTML
   */
  eleventyConfig.addFilter("htmlmin", (content) => {
    if (process.env.NODE_ENV === "production") {
      return content
        .replace(/>\s+</g, "><")       // Remove whitespace between tags
        .replace(/\s{2,}/g, " ")       // Replace multiple spaces with single space
        .replace(/<!--(?!-->).*?-->/g, ""); // Remove HTML comments
    }
    return content;
  });
  
  /**
   * Truncates a string to a specified length
   * @param {string} str - String to truncate
   * @param {number} limit - Maximum length
   * @returns {string} Truncated string with ellipsis if needed
   */
  eleventyConfig.addFilter("truncate", (str, limit) => {
    if (!str || str.length <= limit) {
      return str;
    }
    return str.slice(0, limit) + "...";
  });
  
  /**
   * Generates the alternate URL for a given page in another language
   * @param {string} url - The current page URL
   * @param {string} targetLang - The target language code
   * @returns {string|null} The URL in the target language or null if not found
   */
  eleventyConfig.addFilter("getAlternateUrl", (url, targetLang) => {
    // Skip processing for non-page URLs
    if (!url || typeof url !== 'string') {
      return null;
    }
    
    // Extract current language from URL if present
    const langMatch = url.match(/^\/([a-z]{2})\//);
    const currentLang = langMatch ? langMatch[1] : null;
    
    // If URL is already in target language, return as is
    if (currentLang === targetLang) {
      return url;
    }
    
    // Get default language
    const defaultLanguage = eleventyConfig.globalData.defaultLanguage;
    
    // Handle URL transformation based on language
    if (currentLang) {
      // Replace current language code with target language
      if (targetLang === defaultLanguage) {
        // For default language, remove language prefix
        return url.replace(new RegExp(`^/${currentLang}/`), '/');
      } else {
        // For other languages, replace language prefix
        return url.replace(new RegExp(`^/${currentLang}/`), `/${targetLang}/`);
      }
    } else {
      // No language in URL, add target language prefix
      if (targetLang === defaultLanguage) {
        // For default language, return as is
        return url;
      } else {
        // For other languages, add language prefix
        return `/${targetLang}${url}`;
      }
    }
  });
  
  /**
   * Format dates in a human-readable format for display
   * @param {Date} date - JavaScript Date object
   * @param {string} format - Optional format string
   * @returns {string} Formatted date string (e.g., "14 July 2024")
   */
  eleventyConfig.addFilter("dateDisplay", (date, format) => {
    if (!date) return "";
    
    if (format) {
      return DateTime.fromJSDate(date, { zone: 'utc' })
        .toFormat(format);
    }
    
    return DateTime.fromJSDate(date, { zone: 'utc' })
      .toLocaleString(DateTime.DATE_FULL);
  });
  
  /**
   * Get the newest item by base path from a collection
   * @param {Array} collection - Collection of items
   * @param {string} basePath - Base path to filter by (e.g., "en/newsletter/")
   * @returns {Object|null} The newest item or null if none found
   */
  eleventyConfig.addFilter("getNewestItemByBasePath", (collection, basePath) => {
    if (!collection || !collection.length || !basePath) {
      return null;
    }
    
    // Filter items by base path
    const filteredItems = collection.filter(item => {
      const itemPath = item.inputPath.replace(/^\.\//, '');
      return itemPath.startsWith(basePath) && !itemPath.includes('template') && !itemPath.includes('mal');
    });
    
    // Sort by date descending (newest first)
    const sortedItems = filteredItems.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
    
    // Return the newest item or null if none found
    return sortedItems.length ? sortedItems[0] : null;
  });

  // String manipulation filters
  eleventyConfig.addFilter("trim", function(string) {
    return string.trim();
  });

  eleventyConfig.addFilter("split", function(string, separator) {
    return string.split(separator);
  });
  
  eleventyConfig.addFilter("lowercase", function(string) {
    return string.toLowerCase();
  });
  
  eleventyConfig.addFilter("capitalize", function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  });
  
  // Word count for articles
  eleventyConfig.addFilter("wordcount", function(content) {
    if (!content) return 0;
    // Remove HTML tags and count words
    let text = content.replace(/<\/?[^>]+(>|$)/g, "").trim();
    return text.split(/\s+/).length;
  });
  
  // URL manipulation
  eleventyConfig.addFilter("urlencode", function(str) {
    return encodeURIComponent(str);
  });
  
  // Filter posts by language
  eleventyConfig.addFilter("getSameLanguagePosts", function(posts, lang) {
    return posts.filter(post => post.data.lang === lang);
  });
  
  // Find related posts based on tags
  eleventyConfig.addFilter("related", function(posts, tags, currentUrl, limit = 3) {
    // Safety check for undefined posts
    if (!posts || !Array.isArray(posts) || posts.length === 0) {
      return [];
    }
    
    // Remove empty tags and ensure we have an array
    const postTags = Array.isArray(tags) ? tags.filter(tag => tag && typeof tag === 'string') : [];
    
    if (postTags.length === 0) return [];
    
    // Filter out current post and assign relevance score
    const scored = posts
      .filter(post => post.url !== currentUrl)
      .map(post => {
        const postTagList = post.data && post.data.tags ? post.data.tags : [];
        
        // Calculate score based on shared tags
        let score = 0;
        for (const tag of postTags) {
          if (postTagList.includes(tag)) {
            score++;
          }
        }
        
        return { post, score };
      })
      .filter(item => item.score > 0) // Must have at least one matching tag
      .sort((a, b) => {
        // Sort by score first, then by date
        if (b.score !== a.score) {
          return b.score - a.score;
        }
        // Secondary sort by date
        return b.post.date - a.post.date;
      })
      .map(item => item.post);
    
    // Return limited number of posts
    return scored.slice(0, limit);
  });

  // Format date in RFC 3339 format for RSS feeds
  eleventyConfig.addFilter("dateToRfc3339", function(date) {
    if (!date) return new Date().toISOString();
    return new Date(date).toISOString();
  });
}; 