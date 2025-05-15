/**
 * Collections Configuration for Eleventy
 * Defines how content is grouped and organized
 */

module.exports = function(eleventyConfig) {
  /**
   * Create a collection of English newsletters
   */
  eleventyConfig.addCollection("enNewsletter", function(collectionApi) {
    return collectionApi.getFilteredByGlob([
      "en/newsletter/**/*.md"
    ])
      .sort(function(a, b) {
        // Sort by date in descending order (newest first)
        return b.date - a.date;
      });
  });

  /**
   * Create a collection of Norwegian newsletters
   */
  eleventyConfig.addCollection("noNewsletter", function(collectionApi) {
    return collectionApi.getFilteredByGlob([
      "no/nyhetsbrev/**/*.md"
    ])
      .sort(function(a, b) {
        // Sort by date in descending order (newest first)
        return b.date - a.date;
      });
  });

  // Creates a sitemapPages collection excluding non-public pages
  eleventyConfig.addCollection("sitemapPages", function(collectionApi) {
    return collectionApi.getAll().filter(item => {
      // Skip items that explicitly exclude from sitemap
      if (item.data.excludeFromSitemap) {
        return false;
      }
      
      // Skip internal files like README, LAUNCH-GUIDE, etc.
      if (item.inputPath.includes('README.md') || 
          item.inputPath.includes('LAUNCH-GUIDE.md') ||
          item.url.includes('/docs/')) {
        return false;
      }
      
      return true;
    });
  });
};