# SEO Guide for AI Safety Norway Website

This guide provides instructions for optimizing content on the AI Safety Norway website to improve search engine visibility and reach a wider audience.

## Table of Contents
1. [Page Title Best Practices](#page-title-best-practices)
2. [Meta Descriptions](#meta-descriptions)
3. [Keywords and Content](#keywords-and-content)
4. [Images](#images)
5. [Multilingual SEO](#multilingual-seo)
6. [Front Matter Reference](#front-matter-reference)

## Page Title Best Practices

Page titles should be:
- **Descriptive**: Clearly describe the page content
- **Concise**: Ideally 50-60 characters
- **Keyword-rich**: Include primary keywords near the beginning
- **Brand-inclusive**: Include "AI Safety Norway" for brand recognition

**Good Example:**
```
title: "AI Alignment Research in Norway - Current Progress | AI Safety Norway"
```

## Meta Descriptions

Meta descriptions should:
- Be 150-160 characters long
- Include target keywords
- Provide a compelling summary that encourages clicks
- Have a clear call to action where appropriate

**Good Example:**
```
description: "Discover how Norway is contributing to AI alignment research. Learn about current projects, methodologies, and collaboration opportunities with AI Safety Norway."
```

## Keywords and Content

For optimal SEO:
- Include primary keywords in headings (H1, H2, H3)
- Use natural language and avoid keyword stuffing
- Create content that is at least 300 words for important pages
- Link to other relevant pages within the site
- Include external links to authoritative sources

### Recommended Keywords by Topic

#### For AI Safety Research:
- English: AI safety research, AI risk reduction, AI alignment, technical AI safety
- Norwegian: AI-sikkerhetsforskning, AI-risikoreduksjon, AI-justering, teknisk AI-sikkerhet

#### For AI Governance:
- English: AI governance, AI policy, AI regulation, responsible AI
- Norwegian: AI-styring, AI-politikk, AI-regulering, ansvarlig AI

#### For AI Ethics:
- English: AI ethics, ethical AI, beneficial AI, AI values
- Norwegian: AI-etikk, etisk AI, fordelaktig AI, AI-verdier

## Images

For all images:
- Use descriptive filenames (e.g., `norway-ai-research-team.jpg` instead of `img001.jpg`)
- Add alt text that describes the image and includes relevant keywords
- Compress images for optimal loading speed
- Include captions where appropriate
- Use image dimensions that won't distort when shared on social media (ideal ratio 1.91:1)

## Multilingual SEO

For multilingual content:
- Always provide equivalent content in both Norwegian and English
- Ensure translations are high-quality and natural, not machine-translated
- Use language-specific keywords (not just direct translations)
- Remember that certain SEO elements should be customized for each language

## Front Matter Reference

Every content page should include these SEO-focused front matter fields:

```yaml
---
layout: page.njk
title: "Your Page Title With Keywords" 
permalink: /en/path-to-page/  # or /no/path-to-page/ for Norwegian
pageClass: custom-class
lang: en  # or "no" for Norwegian
description: "Compelling meta description with keywords that encourages clicks."
pageType: "article"  # or "website", "event", etc.
keywords: "comma, separated, keywords, related, to, the, content"
sitemapPriority: 0.8  # higher for more important pages (0.0-1.0)
sitemapChangefreq: "monthly"  # or "weekly", "daily", etc.
image: "/img/share-image-for-page.jpg"  # social sharing image
---
```

### Important Front Matter Fields

| Field | Purpose | Example |
|-------|---------|---------|
| title | Page title in browser and search results | "AI Safety Research in Norway" |
| description | Brief summary for search results | "Learn about Norway's contribution to AI safety" |
| keywords | Help search engines understand content | "AI safety, Norwegian research, alignment" |
| sitemapPriority | Relative importance (0.0-1.0) | 0.8 |
| sitemapChangefreq | How often page is updated | "monthly" |
| image | Social sharing preview image | "/img/research-team.jpg" |

---

By following these guidelines, we can improve the visibility of AI Safety Norway's content and reach more people interested in AI safety issues in both Norwegian and English. 