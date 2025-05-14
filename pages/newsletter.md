---
layout: base.njk
title: Newsletter - Redirecting
permalink: /newsletter/
pageClass: redirect-page
---

<div class="redirect-container">
  <h1>Redirecting...</h1>
  <p>Redirecting to our newsletter page.</p>
  <p>If you are not redirected automatically, please choose a language:</p>
  <ul>
    <li><a href="/en/newsletter/">English</a></li>
    <li><a href="/no/nyhetsbrev/">Norwegian</a></li>
  </ul>
</div>

<script>
  // Redirect based on stored language preference or default to Norwegian
  (function() {
    var defaultLang = 'no';
    var storedLang = localStorage.getItem('preferredLanguage');
    var lang = storedLang || defaultLang;
    
    // Redirect to the preferred language version
    window.location.href = (lang === 'no') ? '/no/nyhetsbrev/' : '/en/newsletter/';
  })();
</script> 