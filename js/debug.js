/**
 * Debug script for AI Safety Norway
 * Used to diagnose potential issues with data and component rendering
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log('Debug script loaded');
  
  // Debug i18n data
  const currentLang = document.documentElement.lang || 'no';
  console.log('Current language:', currentLang);
  
  // Debug image loading for team members
  debugTeamImages();
  
  // Debug image loading for articles
  debugArticleImages();
  
  // Check if we're on the About page
  if (window.location.pathname.includes('/about/') || 
      window.location.pathname.includes('/om-oss/')) {
    console.log('On About page - debugging team members');
    const teamGrid = document.querySelector('.team-grid');
    if (teamGrid) {
      console.log('Team grid found:', teamGrid);
      const teamMembers = document.querySelectorAll('.team-member');
      console.log(`Found ${teamMembers.length} team members`);
      teamMembers.forEach((member, index) => {
        console.log(`Team member ${index + 1}:`, member);
        const img = member.querySelector('img');
        if (img) {
          console.log(`  Image src: ${img.getAttribute('src')}`);
          console.log(`  Image loading state: ${img.complete ? 'loaded' : 'loading'}`);
          if (img.naturalWidth === 0) {
            console.log('  Image failed to load');
          }
        } else {
          console.log('  No image found');
        }
      });
    } else {
      console.log('Team grid not found');
    }
    
    // Debug values section
    const valuesSection = document.querySelector('.values-section');
    if (valuesSection) {
      console.log('Values section found:', valuesSection);
      const valueCards = valuesSection.querySelectorAll('.value-card');
      console.log(`Found ${valueCards.length} value cards`);
    } else {
      console.log('Values section not found');
    }
  }
  
  // Check if we're on the Home page
  if (window.location.pathname === '/' || 
      window.location.pathname === '/en/' || 
      window.location.pathname === '/no/') {
    console.log('On Home page - debugging quotes');
    const quotesSection = document.querySelector('.quotes-section');
    if (quotesSection) {
      console.log('Quotes section found:', quotesSection);
      const quoteCards = quotesSection.querySelectorAll('.quote-card');
      console.log(`Found ${quoteCards.length} quote cards`);
    } else {
      console.log('Quotes section not found');
    }
  }
});

/**
 * Debug team member images
 */
function debugTeamImages() {
  console.log('Debugging team member images');
  const teamImages = document.querySelectorAll('.team-member-image img');
  console.log(`Found ${teamImages.length} team member images`);
  
  if (teamImages.length === 0) {
    console.log('No team member images found on this page');
    return;
  }
  
  // Check each team image
  teamImages.forEach((img, index) => {
    const originalSrc = img.getAttribute('src');
    console.log(`Team image ${index + 1} src: ${originalSrc}`);
    
    // Force load with cache busting to test
    const testLoader = new Image();
    testLoader.onload = function() {
      console.log(`✅ Team image ${index + 1} loaded successfully`);
    };
    
    testLoader.onerror = function() {
      console.error(`❌ Team image ${index + 1} failed to load`);
      console.log(`Checking if placeholder exists at /img/team/placeholder.jpg`);
      
      // Test placeholder
      const placeholderTest = new Image();
      placeholderTest.onload = function() {
        console.log(`✅ Placeholder image exists and loads correctly`);
      };
      
      placeholderTest.onerror = function() {
        console.error(`❌ Placeholder image doesn't exist or can't be loaded`);
      };
      
      placeholderTest.src = '/img/team/placeholder.jpg?v=' + new Date().getTime();
    };
    
    testLoader.src = originalSrc + '?v=' + new Date().getTime();
  });
}

/**
 * Debug article images
 */
function debugArticleImages() {
  console.log('Debugging article images');
  const articleImages = document.querySelectorAll('.article-image img');
  console.log(`Found ${articleImages.length} article images`);
  
  if (articleImages.length === 0) {
    console.log('No article images found on this page');
    return;
  }
  
  // Check each article image
  articleImages.forEach((img, index) => {
    const originalSrc = img.getAttribute('src');
    console.log(`Article image ${index + 1} src: ${originalSrc}`);
    
    // Force load with cache busting to test
    const testLoader = new Image();
    testLoader.onload = function() {
      console.log(`✅ Article image ${index + 1} loaded successfully`);
    };
    
    testLoader.onerror = function() {
      console.error(`❌ Article image ${index + 1} failed to load`);
      console.log(`Checking if placeholder exists at /img/articles/placeholder.jpg`);
      
      // Test placeholder
      const placeholderTest = new Image();
      placeholderTest.onload = function() {
        console.log(`✅ Placeholder image exists and loads correctly`);
      };
      
      placeholderTest.onerror = function() {
        console.error(`❌ Placeholder image doesn't exist or can't be loaded`);
      };
      
      placeholderTest.src = '/img/articles/placeholder.jpg?v=' + new Date().getTime();
    };
    
    testLoader.src = originalSrc + '?v=' + new Date().getTime();
  });
} 