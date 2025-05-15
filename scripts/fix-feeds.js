/**
 * RSS/Atom Feed Fixer Script for AI Safety Norway
 * 
 * This script fixes the author element tags in Atom feeds.
 * The Eleventy template sometimes generates <n> tags instead of <name> tags,
 * which is not valid Atom format.
 */

const fs = require('fs');
const path = require('path');

console.log('Starting feed fix process...');

// List of feed files to fix
const feedFiles = [
  path.join(__dirname, '..', '_site', 'en', 'feed.xml'),
  path.join(__dirname, '..', '_site', 'no', 'feed.xml'),
  path.join(__dirname, '..', '_site', 'en', 'newsletter-feed.xml'),
  path.join(__dirname, '..', '_site', 'no', 'newsletter-feed.xml')
];

// Fix feed files
feedFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`File not found, skipping: ${filePath}`);
    return;
  }
  
  console.log(`Processing ${filePath}...`);
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix author tags by replacing the wrong ones with the right ones
    const before = content;
    
    // First replace <n> with <name>
    content = content.replace(/<n>/g, '<name>');
    
    // Then replace </n> with </name>
    content = content.replace(/<\/n>/g, '</name>');
    
    // Check if we made any changes
    if (before !== content) {
      fs.writeFileSync(filePath, content);
      console.log(`✓ Fixed author tags in ${path.basename(filePath)}`);
    } else {
      console.log(`No changes needed for ${path.basename(filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
});

console.log('Feed fixing complete!'); 