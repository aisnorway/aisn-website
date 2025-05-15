/**
 * Run Lighthouse Tests
 * 
 * This script runs Lighthouse tests against key pages of the site
 * to analyze SEO, performance, accessibility, and best practices.
 * 
 * Requirements:
 * npm install -g lighthouse
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const util = require('util');

const execAsync = util.promisify(exec);
const reportsDir = path.join(__dirname, '../lighthouse-reports');

// Create reports directory if it doesn't exist
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

// Pages to test
const pagesToTest = [
  { url: 'https://aisafety.no/', name: 'home-redirect' },
  { url: 'https://aisafety.no/en/', name: 'en-home' },
  { url: 'https://aisafety.no/no/', name: 'no-home' },
  { url: 'https://aisafety.no/en/about/', name: 'en-about' },
  { url: 'https://aisafety.no/no/om-oss/', name: 'no-about' },
  { url: 'https://aisafety.no/en/newsletter/', name: 'en-newsletter' },
  { url: 'https://aisafety.no/no/nyhetsbrev/', name: 'no-newsletter' }
];

// Config options
const categories = ['performance', 'accessibility', 'best-practices', 'seo'];
const formFactor = 'desktop';

// Run lighthouse for a specific page
async function runLighthouse(pageObj) {
  const { url, name } = pageObj;
  const outputPath = path.join(reportsDir, `${name}-report.html`);
  
  console.log(`Running Lighthouse for ${url}...`);
  
  try {
    const categoriesParam = categories.map(c => `--only-categories=${c}`).join(' ');
    const cmd = `lighthouse ${url} --output html --output-path ${outputPath} --form-factor=${formFactor} ${categoriesParam} --view`;
    
    const { stdout, stderr } = await execAsync(cmd);
    console.log(`Lighthouse completed for ${name}`);
    console.log(`Report saved to: ${outputPath}`);
    
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
    }
    
    return { success: true, name, outputPath };
  } catch (error) {
    console.error(`Error running Lighthouse for ${url}:`);
    console.error(error.message);
    return { success: false, name, error: error.message };
  }
}

// Main function
async function main() {
  console.log('Starting Lighthouse tests...');
  console.log(`Reports will be saved to: ${reportsDir}`);
  
  const results = [];
  
  for (const page of pagesToTest) {
    const result = await runLighthouse(page);
    results.push(result);
  }
  
  // Output summary
  console.log('\nLighthouse Test Summary:');
  console.log('=======================');
  
  results.forEach(result => {
    if (result.success) {
      console.log(`✅ ${result.name}: Success - Report at ${result.outputPath}`);
    } else {
      console.log(`❌ ${result.name}: Failed - ${result.error}`);
    }
  });
}

main().catch(error => {
  console.error('Error in main function:');
  console.error(error);
  process.exit(1);
}); 