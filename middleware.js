import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Only redirect from root path
  if (pathname !== '/') {
    return NextResponse.next();
  }
  
  const supported = ['de', 'en', 'it', 'fr', 'es', 'nl', 'da', 'no', 'sv', 'fi', 'pl', 'cs', 'hu'];
  
  // Get Accept-Language header from the request
  const acceptLanguage = request.headers.get('accept-language') || 'en';
  
  // Parse the Accept-Language header (e.g., "de-DE,de;q=0.9,en;q=0.8")
  // Extract the primary language
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
  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}/`;
  
  return NextResponse.redirect(url);
}

export const config = {
  matcher: '/',
};
