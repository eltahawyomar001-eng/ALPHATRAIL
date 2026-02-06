# Alphatrail Landing Page

Ultra-lightweight, high-performance landing page with 13-language i18n support.

## 🎯 Features

- **Zero Dependencies**: Pure vanilla HTML, CSS, and JavaScript
- **Ultra-Lightweight**: Total bundle size under 100KB
- **13 Languages**: DE, EN, IT, FR, ES, NL, DA, NO, SV, FI, PL, CS, HU
- **Auto Language Detection**: Uses `navigator.language` for instant redirect
- **Mobile-First Design**: Responsive and optimized for all devices
- **Privacy-Focused**: No external CDNs, referrer-stripped Amazon links
- **SEO Protected**: `noindex, nofollow` meta tags

## 📁 Project Structure

```
Alphatrail/
├── index.html              # Root with instant language redirect
├── css/
│   └── main.css           # All styles with CSS Variables
├── js/
│   └── translate.js       # Zero-dependency i18n engine
├── locales/               # Translation JSON files
│   ├── de.json
│   ├── en.json
│   ├── it.json
│   ├── fr.json
│   ├── es.json
│   ├── nl.json
│   ├── da.json
│   ├── no.json
│   ├── sv.json
│   ├── fi.json
│   ├── pl.json
│   ├── cs.json
│   └── hu.json
└── [de|en|it|fr|...]/     # 13 language folders
    └── index.html         # Localized landing page
```

## 🚀 How It Works

### 1. Language Detection & Redirect
The root `index.html` contains a minimal script that:
- Detects browser language via `navigator.language`
- Redirects to appropriate language subfolder (e.g., `/de/`)
- Falls back to English (`/en/`) for unsupported languages

```javascript
const supported = ['de', 'en', 'it', 'fr', 'es', 'nl', 'da', 'no', 'sv', 'fi', 'pl', 'cs', 'hu'];
const lang = navigator.language.split('-')[0];
const target = supported.includes(lang) ? lang : 'en';
window.location.replace(`/${target}/`);
```

### 2. Zero-Dependency Translation Engine
`translate.js` provides a simple, efficient i18n system:
- Fetches locale JSON based on URL path
- Populates elements with `data-i18n` attributes
- Updates page title and HTML lang attribute
- No external libraries required

### 3. CSS Architecture
- **CSS Variables** for consistent theming
- **Mobile-first** responsive design
- **Flexbox/Grid** for modern layouts
- **Optimized** for performance

## 🎨 Visual Design

- **Header**: Bold "ALPHATRAIL" logo in clean sans-serif
- **Hero**: Large, bold, italicized uppercase headings
- **CTAs**: Two contrasting buttons (black solid, white outlined)
- **Footer**: Line-art tandem bike illustration + dark footer bar

## 🔒 Security & Privacy

✅ **Referrer Protection**: Amazon links use `rel="noreferrer noopener nofollow"`  
✅ **No External CDNs**: All assets are local  
✅ **SEO Protection**: `<meta name="robots" content="noindex, nofollow">`  
✅ **No Tracking**: Zero third-party scripts

## 🧪 Testing Locally

### Option 1: Python Server
```bash
cd Alphatrail
python3 -m http.server 8000
```
Open: http://localhost:8000

### Option 2: PHP Server
```bash
cd Alphatrail
php -S localhost:8000
```

### Option 3: Node.js (http-server)
```bash
npx http-server Alphatrail -p 8000
```

## 📊 Performance Checklist

- [x] No external CDN dependencies
- [x] Inline SVGs (logo + tandem bike)
- [x] CSS Variables for efficient theming
- [x] Minimal JavaScript (under 2KB)
- [x] Optimized HTML structure
- [x] Mobile-first responsive design
- [x] Total bundle size < 100KB

## 🌍 Supported Languages

| Code | Language | Example Route |
|------|----------|---------------|
| de   | German   | `/de/`        |
| en   | English  | `/en/`        |
| it   | Italian  | `/it/`        |
| fr   | French   | `/fr/`        |
| es   | Spanish  | `/es/`        |
| nl   | Dutch    | `/nl/`        |
| da   | Danish   | `/da/`        |
| no   | Norwegian| `/no/`        |
| sv   | Swedish  | `/sv/`        |
| fi   | Finnish  | `/fi/`        |
| pl   | Polish   | `/pl/`        |
| cs   | Czech    | `/cs/`        |
| hu   | Hungarian| `/hu/`        |

## 🛠️ Customization

### Adding a New Language
1. Create new language folder: `mkdir xx`
2. Copy template: `cp de/index.html xx/index.html`
3. Update lang attribute: `<html lang="xx">`
4. Add translation: `locales/xx.json`
5. Update supported list in `index.html` redirect script

### Updating Translations
Edit the respective JSON file in `locales/` directory:
```json
{
  "pageTitle": "Your Page Title",
  "heroTitle": "YOUR MAIN HEADING",
  "heroSubtitle": "Your subtitle text",
  "ctaAmazon": "ON AMAZON",
  "ctaWebshop": "IN WEBSHOP",
  "footerImprint": "Imprint",
  "footerPrivacy": "Privacy"
}
```

### Styling Changes
Edit `css/main.css`:
- Brand colors: `:root` CSS Variables
- Layout: Flexbox/Grid classes
- Typography: Font sizes and weights

## 📝 Implementation Notes

### Senior-Level Features
✅ **Instant Redirect**: No flash of unstyled content  
✅ **Security Headers**: Proper `rel` attributes on external links  
✅ **Semantic HTML**: Proper heading hierarchy and ARIA labels  
✅ **Optimized SVGs**: Minimal metadata, clean paths  
✅ **Error Handling**: Fallback to English if locale fails  
✅ **Performance**: CSS loading indicator for translations

## 🎯 Production Deployment

1. **Static Hosting**: Upload entire folder to any static host
2. **No Build Step**: Ready to deploy as-is
3. **Update Links**: Replace example URLs with real ones:
   - Amazon link in each language's `index.html`
   - Webshop link in each language's `index.html`

## 📦 Bundle Size Verification

Check total size:
```bash
du -sh Alphatrail
```

Expected: **< 100KB** for entire project

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**
