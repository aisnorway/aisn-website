# Internationalization Guide

This guide explains how to manage multilingual content on the AI Safety Norway website.

## Overview

The AI Safety Norway website supports both English (en) and Norwegian (no) languages. The internationalization system is built around JSON translation files and template filters.

## Translation Files

All website text content is stored in JSON files:

- `_data/i18n/en.json` - English language content
- `_data/i18n/no.json` - Norwegian language content

These files contain a hierarchical structure of keys and values representing all text content on the website.

## Content Structure

The translation files are structured by sections of the website:

```json
{
  "site": {
    // Global site metadata
  },
  "nav": {
    // Navigation menu items
  },
  "home": {
    // Homepage content
    "hero": {
      // Hero section
    },
    "problem": {
      // The Challenge We Face section
    },
    // Other homepage sections
  },
  "about": {
    // About page content
  },
  // Other sections
}
```

## Adding/Updating Content

To update content:

1. Locate the appropriate key in both language files
2. Update the text value in both files
3. Save changes and test in both languages

For example, to update the "The Challenge We Face" section cards:

```json
// In _data/i18n/en.json
"problem": {
  "title": "The Challenge We Face",
  "highlights": {
    "race": {
      "title": "The AI Arms Race",
      "description": "Competition between leading AI labs and nation states is driving a race towards increasingly advanced AI systems at the cost of everyone's safety."
    },
    // other highlights...
  },
  "points": [
    {
      "title": "The AI Arms Race",
      "description": "Competition between leading AI labs and nation states is driving a race towards increasingly advanced AI systems at the cost of everyone's safety."
    },
    // other points...
  ]
}

// Then update the corresponding section in _data/i18n/no.json
```

## Adding New Translation Keys

When adding new content to the website:

1. Add the new key and text to both language files
2. Follow the existing hierarchy structure
3. Ensure the key names match exactly in both files
4. Provide translations for both English and Norwegian

## Using Translations in Templates

In templates, text is retrieved using the `i18n` filter:

```njk
<h1>{{ "home.hero.title" | i18n(currentLanguage) }}</h1>
```

For sections with arrays of content like the challenge cards:

```njk
{% for point in i18n_[currentLanguage].home.problem.points %}
  <article class="feature-card">
    <h3>{{ point.title }}</h3>
    <p>{{ point.description }}</p>
  </article>
{% endfor %}
```

## Testing Translations

Always test your changes in both languages by:

1. Running the development server (`npm start`)
2. Switching between language versions using the language switcher
3. Checking that the content appears correctly in both languages
4. Ensuring that the formatting and layout work well for both languages

## Common Issues and Solutions

### Missing Translations

If a translation is missing, the template will typically show an empty string or a fallback text. Always ensure all keys exist in both language files.

### Inconsistent Keys

Ensure that the key structure is identical in both files. A mismatched key will result in missing content.

### HTML in Translations

When including HTML tags in translations, ensure they are properly closed in both language files. Use caution with HTML in translations as it can break layouts if not implemented carefully.

### Long Text

Norwegian content is often longer than English. Test the layout with both languages to ensure it handles longer text gracefully.

## Best Practices

1. **Consistency**: Keep terminology consistent across the website
2. **Cultural Appropriateness**: Adapt content for cultural context, not just direct translation
3. **Avoid Idioms**: Avoid language-specific idioms that may not translate well
4. **Update Both Files**: Always update both language files when making changes
5. **Test Both Languages**: Always test the website in both languages after making changes 