---
layout: base.njk
title: Contact - Redirecting
permalink: /contact/
pageClass: redirect-page
---

<div class="redirect-container">
  <h1>Redirecting...</h1>
  <p>This page has moved to our new multilingual structure.</p>
  <p>If you are not redirected automatically, please choose a language:</p>
  <ul>
    <li><a href="/en/contact/">English</a></li>
    <li><a href="/no/kontakt/">Norwegian</a></li>
  </ul>
</div>

<script>
  // Redirect based on stored language preference or default to Norwegian
  (function() {
    var defaultLang = 'no';
    var storedLang = localStorage.getItem('preferredLanguage');
    var lang = storedLang || defaultLang;
    
    // Redirect to the preferred language version
    window.location.href = (lang === 'no') ? '/no/kontakt/' : '/en/contact/';
  })();
</script> 