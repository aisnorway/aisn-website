# Google Search Console Verification Guide

To improve crawling and indexing of your AI Safety Norway website, you should verify ownership in Google Search Console.

## Steps to Verify Your Website

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" and enter your domain: `aisafety.no`
3. Choose one of these verification methods:

### HTML File Verification (Recommended)
1. Download the HTML verification file from Google
2. Add it to your repository
3. Update `.eleventy.js` to include this line:
   ```js
   eleventyConfig.addPassthroughCopy("googleXXXXXXXXXXXXXXXX.html"); // Replace with your file name
   ```
4. Commit and deploy the changes

### HTML Tag Verification (Alternative)
1. Get the meta tag provided by Google (looks like `<meta name="google-site-verification" content="XXXXXXXXXXXXXXXX">`)
2. Add it to `_includes/base.njk` in the `<head>` section
3. Commit and deploy the changes

## After Verification

Once verified, submit your sitemaps:

1. Go to "Sitemaps" in Google Search Console
2. Add these URLs:
   - `https://aisafety.no/sitemap-index.xml`
   - `https://aisafety.no/newsletter-sitemap.xml`

## Other Search Engines

For Bing Webmaster Tools, follow similar steps at [Bing Webmaster Tools](https://www.bing.com/webmasters/) 