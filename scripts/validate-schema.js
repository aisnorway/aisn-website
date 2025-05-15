/**
 * Schema.org Validation Check Script
 * 
 * This script checks the HTML files in the _site directory for JSON-LD script tags
 * and validates they contain properly formatted JSON.
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const siteDir = path.resolve(__dirname, '../_site');
const outputFile = path.resolve(__dirname, '../schema-validation-results.txt');

// Function to extract JSON-LD from HTML content
function extractJsonLd(htmlContent) {
  const pattern = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gm;
  const matches = [];
  let match;

  while ((match = pattern.exec(htmlContent)) !== null) {
    matches.push(match[1].trim());
  }

  return matches;
}

// Function to validate JSON syntax
function validateJson(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Main function
async function main() {
  // Find all HTML files in the _site directory
  const files = glob.sync('**/*.html', { cwd: siteDir });
  
  let validCount = 0;
  let invalidCount = 0;
  let fileWithoutSchemaCount = 0;
  
  let results = `Schema.org Validation Results\n`;
  results += `=========================\n\n`;
  results += `Validation date: ${new Date().toISOString()}\n\n`;
  
  for (const file of files) {
    const filePath = path.join(siteDir, file);
    const htmlContent = fs.readFileSync(filePath, 'utf8');
    const jsonLdBlocks = extractJsonLd(htmlContent);
    
    if (jsonLdBlocks.length === 0) {
      results += `${file}: NO SCHEMA FOUND\n`;
      fileWithoutSchemaCount++;
      continue;
    }
    
    results += `${file}: ${jsonLdBlocks.length} schema blocks\n`;
    
    for (let i = 0; i < jsonLdBlocks.length; i++) {
      const jsonLd = jsonLdBlocks[i];
      const validation = validateJson(jsonLd);
      
      if (validation.valid) {
        validCount++;
        // Parse the JSON again to pretty print the @type field
        try {
          const parsed = JSON.parse(jsonLd);
          results += `  - Schema ${i+1}: VALID (Type: ${parsed['@type']})\n`;
        } catch (e) {
          results += `  - Schema ${i+1}: VALID\n`;
        }
      } else {
        invalidCount++;
        results += `  - Schema ${i+1}: INVALID\n`;
        results += `    Error: ${validation.error}\n`;
        results += `    Json: ${jsonLd.substring(0, 100)}...\n`;
      }
    }
    
    results += `\n`;
  }
  
  // Summary
  results += `Summary\n`;
  results += `=======\n`;
  results += `Total files checked: ${files.length}\n`;
  results += `Files with schema: ${files.length - fileWithoutSchemaCount}\n`;
  results += `Files without schema: ${fileWithoutSchemaCount}\n`;
  results += `Valid schema blocks: ${validCount}\n`;
  results += `Invalid schema blocks: ${invalidCount}\n`;
  
  fs.writeFileSync(outputFile, results);
  console.log(`Validation complete. Results written to ${outputFile}`);
}

main().catch(console.error); 