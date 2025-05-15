/**
 * Simple script to ping search engines when newsletter content is viewed
 * This helps increase crawl frequency for your site
 */
(function() {
  // Only run on newsletter pages
  const isNewsletter = window.location.pathname.includes('/newsletter/') || 
                        window.location.pathname.includes('/nyhetsbrev/');
  
  if (!isNewsletter) return;
  
  // Get the current URL
  const currentUrl = encodeURIComponent(window.location.href);
  const sitemapUrl = encodeURIComponent('https://aisafety.no/newsletter-sitemap.xml');
  
  // Wait for document to fully load
  window.addEventListener('load', function() {
    // Create invisible elements to ping search engines
    const pingGoogle = document.createElement('img');
    pingGoogle.src = `https://www.google.com/ping?sitemap=${sitemapUrl}`;
    pingGoogle.width = 1;
    pingGoogle.height = 1;
    pingGoogle.style.position = 'absolute';
    pingGoogle.style.opacity = 0;
    
    const pingBing = document.createElement('img');
    pingBing.src = `https://www.bing.com/ping?sitemap=${sitemapUrl}`;
    pingBing.width = 1;
    pingBing.height = 1;
    pingBing.style.position = 'absolute';
    pingBing.style.opacity = 0;
    
    // Add to the page
    document.body.appendChild(pingGoogle);
    document.body.appendChild(pingBing);
    
    // Fetch the sitemap to encourage crawling
    fetch('/newsletter-sitemap.xml', {
      method: 'GET',
      mode: 'no-cors'
    }).catch(error => console.error('Error fetching sitemap:', error));
  });
})(); 