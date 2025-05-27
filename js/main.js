/**
 * AI Safety Norway - Main JavaScript
 * ----------------------------------------
 * This file imports and initializes all client-side modules.
 */

// Import debug script for development
// @ts-ignore
import './debug.js';

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Navigation.init();
  LanguageHandler.init();
  ResponsiveElements.init();
  ImageLoader.init();
});

/**
 * ImageLoader module - Handles image loading and fallbacks
 */
const ImageLoader = {
  init() {
    console.log('Initializing ImageLoader module');
    
    // Handle team member images
    this.teamImages = document.querySelectorAll('.team-member-image img');
    if (this.teamImages.length > 0) {
      console.log(`Found ${this.teamImages.length} team member images to process`);
      this.setupTeamImages();
    }
    
    // Handle article images
    this.articleImages = document.querySelectorAll('.article-image img');
    if (this.articleImages.length > 0) {
      console.log(`Found ${this.articleImages.length} article images to process`);
      this.setupArticleImages();
    }
  },
  
  setupTeamImages() {
    this.teamImages.forEach((img, index) => {
      // Store original src for reference
      const originalSrc = img.getAttribute('src');
      console.log(`Processing team image ${index + 1}: ${originalSrc}`);
      
      // Add loading indicator class
      img.classList.add('loading');
      
      // Set proper fallback for errors
      img.onerror = function() {
        console.warn(`Team image failed to load: ${originalSrc}`);
        this.src = '/img/team/placeholder.jpg';
        this.classList.remove('loading');
        this.classList.add('loaded');
      };
      
      // Set onload handler to remove loading state
      img.onload = function() {
        console.log(`Team image loaded successfully: ${originalSrc}`);
        this.classList.remove('loading');
        this.classList.add('loaded');
      };
      
      // Force reload with cache busting
      if (originalSrc) {
        const cacheBustSrc = originalSrc + '?v=' + new Date().getTime();
        img.setAttribute('src', cacheBustSrc);
      } else {
        console.warn(`Team image ${index + 1} has no src attribute`);
        img.src = '/img/team/placeholder.jpg';
      }
    });
  },
  
  setupArticleImages() {
    this.articleImages.forEach((img, index) => {
      // Store original src for reference
      const originalSrc = img.getAttribute('src');
      console.log(`Processing article image ${index + 1}: ${originalSrc}`);
      
      // Add loading indicator class
      img.classList.add('loading');
      
      // Set proper fallback for errors
      img.onerror = function() {
        console.warn(`Article image failed to load: ${originalSrc}`);
        this.src = '/img/articles/placeholder.jpg';
        this.classList.remove('loading');
        this.classList.add('loaded');
      };
      
      // Set onload handler to remove loading state
      img.onload = function() {
        console.log(`Article image loaded successfully: ${originalSrc}`);
        this.classList.remove('loading');
        this.classList.add('loaded');
      };
      
      // Force reload with cache busting
      if (originalSrc) {
        const cacheBustSrc = originalSrc + '?v=' + new Date().getTime();
        img.setAttribute('src', cacheBustSrc);
      } else {
        console.warn(`Article image ${index + 1} has no src attribute`);
        img.src = '/img/articles/placeholder.jpg';
      }
    });
  }
};

/**
 * Navigation module - Handles all navigation-related functionality
 */
const Navigation = {
  init() {
    this.header = document.querySelector('header');
    this.navItems = document.querySelectorAll('.nav-item');
    
    // Set up event listeners
    this.setupScrollEffect();
    this.setupDropdownNavigation();
  },
  
  setupScrollEffect() {
    const toggleScrollClass = () => {
      if (window.scrollY > 20) {
        this.header.classList.add('scrolled');
      } else {
        this.header.classList.remove('scrolled');
      }
    };
    
    window.addEventListener('scroll', toggleScrollClass);
    toggleScrollClass();
  },

  setupDropdownNavigation() {
    this.navItems.forEach(item => {
      const navLink = item.querySelector('.nav-link');
      const dropdown = item.querySelector('.dropdown');
      
      if (navLink && dropdown) {
        // Add cursor pointer for better UX
        navLink.style.cursor = 'pointer';
        
        // For iOS Safari, we need to use a different approach
        // iOS Safari requires actual clickable elements for proper touch handling
        navLink.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          
          console.log('Click/tap detected on:', item); // Debug log
          
          // Close all other dropdowns
          this.navItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.querySelector('.dropdown')) {
              otherItem.classList.remove('active');
            }
          });
          
          // Toggle active class
          item.classList.toggle('active');
          
          console.log('Active toggled, now active:', item.classList.contains('active')); // Debug log
        });
        
        // For better touch responsiveness on iOS, also handle touchstart
        // but don't prevent default - let iOS handle it naturally
        navLink.addEventListener('touchstart', (e) => {
          console.log('Touch start detected'); // Debug log
          // Just add a class to indicate touch started, but don't prevent default
          navLink.classList.add('touching');
        }, {passive: true});
        
        navLink.addEventListener('touchend', (e) => {
          console.log('Touch end detected'); // Debug log
          navLink.classList.remove('touching');
          // The click event will handle the actual dropdown toggle
        }, {passive: true});
      }
    });
    
    // Close dropdowns when clicking/touching outside
    const closeDropdowns = (e) => {
      if (!e.target.closest('.nav-item')) {
        this.navItems.forEach(item => {
          item.classList.remove('active');
        });
      }
    };
    
    // Use both events to catch all interaction types
    document.addEventListener('click', closeDropdowns);
    document.addEventListener('touchstart', closeDropdowns, {passive: true});
    
    console.log('Dropdown navigation initialized for', this.navItems.length, 'items');
  }
};

/**
 * LanguageHandler module - Manages language preferences and redirects
 */
const LanguageHandler = {
  init() {
    this.currentLang = document.documentElement.getAttribute('lang');
    this.languageSwitcher = document.querySelector('.language-switcher');
    this.currentPath = window.location.pathname;
    
    // Set up language handlers
    this.setupLanguageSwitcher();
    this.handleRedirects();
  },
  
  setupLanguageSwitcher() {
    if (!this.languageSwitcher) return;
    
    // Get all language links
    const languageLinks = this.languageSwitcher.querySelectorAll('.dropdown a, .lang-button');
    
    // Store language preference in localStorage when a language is selected
    languageLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Get language code from the link's lang attribute
        const langCode = this.getAttribute('lang');
        if (langCode) {
          // Store language preference
          localStorage.setItem('preferredLanguage', langCode);
        }
      });
    });
  },
  
  handleRedirects() {
    // Only redirect on root pages
    if (this.currentPath === '/' || this.currentPath === '/index.html') {
      // Get preferred language, default to Norwegian if not set
      const preferredLang = localStorage.getItem('preferredLanguage') || 'no';
      
      // Redirect to the appropriate language homepage if different from current
      if (preferredLang !== this.currentLang) {
        window.location.href = '/' + preferredLang + '/';
      }
    }
  }
};

/**
 * ResponsiveElements module - Handles responsive behavior for UI elements
 */
const ResponsiveElements = {
  init() {
    this.isMobile = window.innerWidth <= 768;
    
    // Only get elements that actually exist in the DOM
    const articleList = document.querySelector('.article-list');
    this.hasArticleList = !!articleList;
    
    if (this.hasArticleList) {
      this.articleItems = articleList.querySelectorAll('li');
      this.setupArticleItems();
    }
  },
  
  setupArticleItems() {
    // Handle touch events for article items
    if (!this.hasArticleList) return;
    
    this.articleItems.forEach(item => {
      // Remove hover transform on touch devices to prevent sticky hover states
      item.addEventListener('touchstart', function() {
        this.classList.add('touch-device');
      }, {passive: true});
    });
  }
};

// Add smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#' && document.querySelector(targetId)) {
        e.preventDefault();
        
        // Get the target element and calculate its position
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        
        // Set up a smoother scrolling animation
        let startTime = null;
        const duration = 1000; // Longer duration for smoother scroll (1 second)
        
        // Custom easing function for a gentler motion
        function easeInOutQuad(t) {
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
        
        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          const easedProgress = easeInOutQuad(progress);
          
          window.scrollTo(0, startPosition + distance * easedProgress);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        }
        
        requestAnimationFrame(animation);
      }
    });
  });
}); 