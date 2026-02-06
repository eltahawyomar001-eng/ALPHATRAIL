export default function middleware(request) {
  const { pathname } = new URL(request.url);
  
  // Only redirect from root path
  if (pathname !== '/') {
    return;
  }
  
  // Map countries to languages (based on official/primary language)
  const countryToLang = {
    'DE': 'de', // Germany
    'AT': 'de', // Austria
    'CH': 'de', // Switzerland (German-speaking)
    'IT': 'it', // Italy
    'FR': 'fr', // France
    'ES': 'es', // Spain
    'NL': 'nl', // Netherlands
    'DK': 'da', // Denmark
    'NO': 'no', // Norway
    'SE': 'sv', // Sweden
    'FI': 'fi', // Finland
    'PL': 'pl', // Poland
    'CZ': 'cs', // Czech Republic
    'HU': 'hu', // Hungary
    'BE': 'nl', // Belgium (Dutch primary)
    'LU': 'de', // Luxembourg (German primary)
  };
  
  const supported = ['de', 'en', 'it', 'fr', 'es', 'nl', 'da', 'no', 'sv', 'fi', 'pl', 'cs', 'hu'];
  
  // Get country from Vercel's geolocation header
  const country = request.headers.get('x-vercel-ip-country') || '';
  
  // Try geolocation first
  let targetLang = countryToLang[country];
  
  // Fallback to Accept-Language if country not in our map
  if (!targetLang) {
    const acceptLanguage = request.headers.get('accept-language') || 'en';
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, quality] = lang.trim().split(';');
        const q = quality ? parseFloat(quality.split('=')[1]) : 1.0;
        return { code: code.split('-')[0].toLowerCase(), quality: q };
      })
      .sort((a, b) => b.quality - a.quality);
    
    targetLang = languages.find(lang => supported.includes(lang.code))?.code || 'en';
  }
  
  // Final fallback to English
  if (!supported.includes(targetLang)) {
    targetLang = 'en';
  }
  
  // Redirect to language-specific page
  const url = new URL(request.url);
  url.pathname = `/${targetLang}/`;
  
  return Response.redirect(url, 302);
}

export const config = {
  matcher: '/',
};
