/**
 * Internationalization Configuration for Eleventy
 * Handles language definitions, URL formatting, and translation loading
 */

const fs = require('fs');
const path = require('path');

module.exports = function(eleventyConfig) {
  // Define available languages
  const languages = [
    { code: "en", label: "English", isDefault: false },
    { code: "no", label: "Norsk", isDefault: true }
  ];

  // Add language data to global data
  eleventyConfig.addGlobalData("languages", languages);

  // Get the default language
  const defaultLanguage = languages.find(lang => lang.isDefault).code;

  // Add language data to templates
  eleventyConfig.addGlobalData("defaultLanguage", defaultLanguage);

  // Create a filter to localize URLs (adds language code prefix except for default language)
  eleventyConfig.addFilter("localizeUrl", function(url, lang) {
    if (!url) return url;
    
    // Clean the URL path
    url = url.toString();
    if (url.startsWith('/')) url = url.substring(1);
    if (url.endsWith('/')) url = url.substring(0, url.length - 1);
    
    // Don't add prefix for default language
    if (lang === defaultLanguage) {
      return '/' + url + (url ? '/' : '');
    }
    
    // For other languages, add the language code prefix
    return '/' + lang + '/' + url + (url ? '/' : '');
  });

  // Helper function to get translation
  eleventyConfig.addFilter("i18n", function(key, lang = defaultLanguage) {
    try {
      // Remove the "i18n" prefix if it exists
      if (key.startsWith("i18n")) {
        key = key.substring(4);
      }
      
      // Split the key into parts (e.g., "nav.about" -> ["nav", "about"])
      const parts = key.split('.');
      
      // Try to get the language data
      // Use pre-loaded global data
      const i18nData = eleventyConfig.globalData[`i18n_${lang}`];
      
      if (!i18nData) {
        console.error(`No language data found for ${lang}`);
        // Try to fall back to default language
        if (lang !== defaultLanguage) {
          return eleventyConfig.getFilter('i18n')(key, defaultLanguage);
        }
        return key;
      }
      
      // Traverse the object using the key parts
      let result = i18nData;
      for (const part of parts) {
        if (result && result[part] !== undefined) {
          result = result[part];
        } else {
          // If translation is missing, fall back to default language
          if (lang !== defaultLanguage) {
            return eleventyConfig.getFilter('i18n')(key, defaultLanguage);
          }
          // If we're already in default language and can't find it, return the key
          return key;
        }
      }
      return result;
    } catch (error) {
      console.error(`Error getting translation for key: ${key}`, error);
      return key;
    }
  });

  // Make i18n data available globally
  languages.forEach(lang => {
    const langCode = lang.code;
    try {
      const langPath = path.resolve(`./_data/i18n/${langCode}.json`);
      if (fs.existsSync(langPath)) {
        const langData = require(langPath);
        eleventyConfig.addGlobalData(`i18n_${langCode}`, langData);
      } else {
        console.warn(`Language file not found: ${langPath}`);
      }
    } catch (error) {
      console.error(`Could not load language data for ${langCode}`, error);
    }
  });
}; 