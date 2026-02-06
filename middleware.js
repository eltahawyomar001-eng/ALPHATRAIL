export default function middleware(request) {
  const { pathname } = new URL(request.url);
  
  // Only redirect from root path
  if (pathname !== '/') {
    return;
  }
  
  const supported = ['de', 'en', 'it', 'fr', 'es', 'nl', 'da', 'no', 'sv', 'fi', 'pl', 'cs', 'hu'];
  
  // Get Accept-Language header from the request
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  
  // Parse the Accept-Language header (e.g., "de-DE,de;q=0.9,en;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, quality] = lang.trim().split(';');
      const q = quality ? parseFloat(quality.split('=')[1]) : 1.0;
      return { code: code.split('-')[0].toLowerCase(), quality: q };
    })
    .sort((a, b) => b.quality - a.quality);
  
  // Find first supported language
  const targetLang = languages.find(lang => supported.includes(lang.code))?.code || 'en';
  
  // Redirect to language-specific page
  const url = new URL(request.url);
  url.pathname = `/${targetLang}/`;
  
  return Response.redirect(url, 302);
}

export const config = {
  matcher: '/',
};
