/**
 * Zero-dependency i18n engine
 * Fetches locale JSON and populates data-i18n attributes
 */

// Detect current language from URL path
function getCurrentLanguage() {
  const path = window.location.pathname;
  // Match /de/, /en/, etc. with or without trailing slash
  const match = path.match(/\/([a-z]{2})(?:\/|$)/);
  return match ? match[1] : 'en';
}

// Load and apply translations
async function loadTranslations(lang) {
  try {
    const localePath = `/locales/${lang}.json`;
    console.log('Loading translations from:', localePath);
    console.log('Current pathname:', window.location.pathname);
    console.log('Detected language:', lang);
    
    const response = await fetch(localePath);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}: ${response.status}`);
    }
    const data = await response.json();
    console.log('Translations loaded:', data);
    
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
    
    console.log('Translations applied successfully');
    
  } catch (error) {
    console.error('Translation loading failed:', error);
    // Fallback to English if current language fails
    if (lang !== 'en') {
      console.log('Falling back to English');
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
