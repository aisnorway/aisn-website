---
layout: base.njk
title: About - Redirecting
permalink: /about/
pageClass: redirect-page
---

<div class="redirect-container">
  <h1>Redirecting...</h1>
  <p>This page has moved to our new multilingual structure.</p>
  <p>If you are not redirected automatically, please choose a language:</p>
  <ul>
    <li><a href="/en/about/">English</a></li>
    <li><a href="/no/om-oss/">Norwegian</a></li>
  </ul>
</div>

<script>
  // Redirect based on stored language preference or default to Norwegian
  (function() {
    var defaultLang = 'no';
    var storedLang = localStorage.getItem('preferredLanguage');
    var lang = storedLang || defaultLang;
    
    // Redirect to the preferred language version
    window.location.href = (lang === 'no') ? '/no/om-oss/' : '/en/about/';
  })();
</script> 