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
};