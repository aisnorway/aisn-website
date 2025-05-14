/**
 * Translation Helper Plugin for Eleventy
 * 
 * This plugin adds functions to check if a translation exists for a given page
 * and generate appropriate alternates or fallbacks.
 */

const fs = require('fs');
const path = require('path');

// Cache for translation file existence checks to avoid redundant file system operations
const translationExistenceCache = new Map();

module.exports = function(eleventyConfig) {
  /**
   * Normalizes a path by removing language prefixes and trailing slashes
   * @param {string} pagePath - The path to normalize
   * @returns {string} - Normalized path without language prefix or trailing slash
   */
  const normalizePath = (pagePath) => {
    // Remove language prefix if it exists
    let normalizedPath = pagePath;
    const langPrefixMatch = pagePath.match(/^\/([a-z]{2})\//);
    
    if (langPrefixMatch) {
      const langPrefix = langPrefixMatch[1];
      normalizedPath = pagePath.replace(new RegExp(`^/${langPrefix}/`), '/');
    }
    
    // Remove trailing slash if it exists
    if (normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
    
    return normalizedPath;
  };
  
  /**
   * Gets the path to check for a given language
   * @param {string} normalizedPath - The normalized path without language prefix
   * @param {string} targetLang - The target language code
   * @returns {string} - Path with appropriate language prefix
   */
  const getPathForLanguage = (normalizedPath, targetLang) => {
    if (targetLang === 'en') {
      // For English, we use the normalized path without prefix
      return normalizedPath;
    } else {
      // For other languages, add the language prefix
      return `/${targetLang}${normalizedPath}`;
    }
  };
  
  /**
   * Gets possible file paths for a page in the file system
   * @param {string} pathToCheck - The base path to check
   * @returns {string[]} - Array of possible file paths
   */
  const getPossibleFilePaths = (pathToCheck) => {
    const contentDir = '.';  // Root directory for content
    return [
      path.join(contentDir, `${pathToCheck}.md`),
      path.join(contentDir, `${pathToCheck}/index.md`),
      path.join(contentDir, `${pathToCheck}.html`),
      path.join(contentDir, `${pathToCheck}/index.html`),
      path.join(contentDir, `${pathToCheck}.njk`),
      path.join(contentDir, `${pathToCheck}/index.njk`)
    ];
  };
  
  /**
   * Checks if a file exists at any of the possible paths
   * @param {string[]} possiblePaths - Array of possible file paths
   * @returns {boolean} - True if file exists, false otherwise
   */
  const checkFileExists = (possiblePaths) => {
    for (const possiblePath of possiblePaths) {
      const cacheKey = possiblePath;
      
      // Check cache first
      if (translationExistenceCache.has(cacheKey)) {
        return translationExistenceCache.get(cacheKey);
      }
      
      // Check file system if not in cache
      try {
        const exists = fs.existsSync(possiblePath);
        translationExistenceCache.set(cacheKey, exists);
        if (exists) return true;
      } catch (err) {
        // Ignore errors and continue checking
      }
    }
    
    return false;
  };
  
  // Add a filter to check if a translation exists for a given path
  eleventyConfig.addFilter('hasTranslation', function(pagePath, targetLang) {
    // Create cache key based on full original request
    const cacheKey = `${pagePath}_${targetLang}`;
    
    // Check cache first
    if (translationExistenceCache.has(cacheKey)) {
      return translationExistenceCache.get(cacheKey);
    }
    
    // Process the request if not in cache
    const normalizedPath = normalizePath(pagePath);
    const pathToCheck = getPathForLanguage(normalizedPath, targetLang);
    const possiblePaths = getPossibleFilePaths(pathToCheck);
    const exists = checkFileExists(possiblePaths);
    
    // Cache the result
    translationExistenceCache.set(cacheKey, exists);
    
    return exists;
  });
  
  // Add a shortcode to generate HTML for missing translations
  eleventyConfig.addShortcode('missingTranslation', function(pagePath, currentLang) {
    const alternateLang = currentLang === 'en' ? 'no' : 'en';
    
    // Check if page exists in the alternate language
    const hasAlternate = eleventyConfig.getFilter('hasTranslation')(pagePath, alternateLang);
    
    // Determine alternate URL
    let alternateUrl = null;
    if (hasAlternate) {
      const normalizedPath = normalizePath(pagePath);
      alternateUrl = getPathForLanguage(normalizedPath, alternateLang);
    }
    
    return {
      hasAlternate,
      alternateUrl,
      alternateLang
    };
  });
}; 