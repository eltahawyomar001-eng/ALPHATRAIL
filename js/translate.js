/**
 * Zero-dependency i18n engine
 * Fetches locale JSON and populates data-i18n attributes
 */

// Detect current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname;
  const match = path.match(/^\/([a-z]{2})\//);
  return match ? match[1] : 'en';
}

// Load and apply translations
async function loadTranslations(lang) {
  try {
    const response = await fetch(`../locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    const data = await response.json();
    
    // Populate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (data[key]) {
        el.textContent = data[key];
      }
    });
    
    // Set page title
    if (data.pageTitle) {
      document.title = data.pageTitle;
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
  } catch (error) {
    console.error('Translation loading failed:', error);
    // Fallback to English if current language fails
    if (lang !== 'en') {
      loadTranslations('en');
    }
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadTranslations(getCurrentLanguage());
  });
} else {
  loadTranslations(getCurrentLanguage());
}
