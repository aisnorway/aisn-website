#!/usr/bin/env node

/**
 * Post-installation script for AI Safety Norway website
 * This script runs after `npm install` to help developers get started
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for nice terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m'
};

// Log with color
function log(text, color = 'reset') {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

// Print welcome message
function printWelcome() {
  console.log('\n');
  log('=====================================================', 'cyan');
  log('  🚀 AI Safety Norway Website - Setup Complete! 🚀  ', 'bright');
  log('=====================================================', 'cyan');
  console.log('\n');
  
  log('Thanks for contributing to the AI Safety Norway website!', 'green');
  log('Here are some commands to help you get started:', 'green');
  console.log('\n');
  
  log('📝 Development Commands:', 'yellow');
  console.log('  npm start              - Start development server');
  console.log('  npm run build          - Build for production');
  console.log('  npm run build:dev      - Build for development');
  console.log('\n');
  
  log('📚 Documentation:', 'yellow');
  console.log('  - Check README.md for project overview');
  console.log('  - See DEVELOPMENT.md for detailed technical information');
  console.log('  - Read CONTRIBUTING.md for contribution guidelines');
  console.log('\n');
  
  log('🌐 When ready, visit: http://localhost:8080', 'cyan');
  console.log('\n');
}

// Check required directories exist, create if missing
function ensureDirectories() {
  const directories = [
    'scripts',
    '_site'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      log(`Creating directory: ${dir}`, 'cyan');
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });
}

// Main function
function main() {
  try {
    // Ensure required directories exist
    ensureDirectories();
    
    // Print welcome message
    printWelcome();
  } catch (error) {
    log('Error during post-install:', 'red');
    console.error(error);
    process.exit(1);
  }
}

// Run the script
main(); 