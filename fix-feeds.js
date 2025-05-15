/**
 * RSS/Atom Feed Fixer Script for AI Safety Norway
 * 
 * This script fixes the author element tags in Atom feeds.
 * The Eleventy template sometimes generates <n> tags instead of <name> tags,
 * which is not valid Atom format.
 * 
 * Usage: Run this after building the site
 * node fix-feeds.js
 */

const fs = require('fs');
const path = require('path');

// List of feed files to fix
const feedFiles = [
  '_site/en/feed.xml',
  '_site/no/feed.xml',
  '_site/en/newsletter-feed.xml',
  '_site/no/newsletter-feed.xml'
];

// Fix feed files
feedFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found, skipping: ${filePath}`);
    return;
  }
  
  console.log(`Processing ${filePath}...`);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix the author tags
  let modified = content.replace(/<n>/g, '<name>').replace(/<\/n>/g, '</name>');
  
  if (content !== modified) {
    fs.writeFileSync(filePath, modified);
    console.log(`Fixed author tags in ${filePath}`);
  } else {
    console.log(`No changes needed for ${filePath}`);
  }
});

console.log('Feed fixing complete!'); 