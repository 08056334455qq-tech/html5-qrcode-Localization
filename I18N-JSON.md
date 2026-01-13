# JSON-Based Internationalization (i18n) Guide

## Overview

The html5-qrcode library now uses **JSON files** for translations, making it easier for translators to contribute without needing TypeScript knowledge. This guide explains how to work with JSON-based translations.

## 🎯 Why JSON?

- **Easy to edit**: No programming knowledge required
- **Universal format**: Any text editor can open JSON files
- **Validation**: JSON Schema ensures translations are complete and correct
- **Dynamic loading**: Load translations from URLs or files at runtime
- **Version control friendly**: Easy to review and merge translation changes

## 📁 File Structure

```
src/i18n/
├── types.ts                 # TypeScript type definitions
├── manager.ts               # I18n manager (handles translations)
├── loader.ts                # JSON loader and validator
├── index.ts                 # Module exports
└── locales/
    ├── en.json              # English translations
    ├── ja.json              # Japanese translations
    ├── template.json        # Template for new languages
    └── translation-schema.json  # JSON Schema for validation
```

## 🚀 Basic Usage

### Setting the Locale

```typescript
import { Html5QrcodeScanner, I18nManager, SupportedLocales } from "html5-qrcode";

// Set locale to Japanese
I18nManager.setLocale(SupportedLocales.JA);

// Create scanner - it will use Japanese text
const scanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);
```

### Auto-detect Browser Language

```typescript
import { I18nManager } from "html5-qrcode";

// Automatically detect and set the browser's language
I18nManager.detectAndSetLocale();
```

## 📝 Creating a New Translation

### Step 1: Copy the Template

Start with the template file:

```bash
cp src/i18n/locales/template.json src/i18n/locales/es.json
```

### Step 2: Translate the Strings

Open `es.json` and replace `[Your translation here]` with Spanish translations:

```json
{
  "html5Qrcode": {
    "codeParseError": "Error al analizar código QR, error = {error}",
    "errorGettingUserMedia": "Error al obtener userMedia, error = {error}",
    "scannerPaused": "Escáner pausado"
  },
  "html5QrcodeScanner": {
    "scanningStatus": "Escaneando",
    "idleStatus": "Inactivo",
    "scanButtonStartScanningText": "Iniciar Escaneo"
  },
  "libraryInfo": {
    "poweredBy": "Desarrollado por ",
    "reportIssues": "Reportar problemas"
  }
}
```

### Step 3: Use Placeholders Correctly

Some strings have placeholders that will be replaced with dynamic values:

- `{error}` - Will be replaced with error message
- `{decodedText}` - Will be replaced with scanned code

Example:
```json
{
  "codeParseError": "エラー: {error}",
  "lastMatch": "最後のマッチ: {decodedText}"
}
```

## 🔧 Advanced Usage

### Loading Translations from URL

Load translation files dynamically from a URL:

```typescript
import { I18nManager, SupportedLocales } from "html5-qrcode";

// Load Spanish translation from URL
await I18nManager.loadTranslationFromURL(
  SupportedLocales.ES,
  '/locales/es.json'
);

// Now set the locale
I18nManager.setLocale(SupportedLocales.ES);
```

### Loading from JSON Object

```typescript
import { I18nManager, SupportedLocales } from "html5-qrcode";

const frenchTranslations = {
  html5Qrcode: {
    scannerPaused: "Scanner en pause",
    // ... more translations
  },
  html5QrcodeScanner: {
    scanningStatus: "Analyse en cours",
    // ... more translations
  },
  libraryInfo: {
    poweredBy: "Propulsé par ",
    reportIssues: "Signaler des problèmes"
  }
};

// Load from object
I18nManager.loadTranslationFromJSON(SupportedLocales.FR, frenchTranslations);
I18nManager.setLocale(SupportedLocales.FR);
```

### Loading from JSON String

```typescript
import { I18nManager, SupportedLocales } from "html5-qrcode";

const jsonString = '{"html5Qrcode": {...}, ...}';

I18nManager.loadTranslationFromString(SupportedLocales.DE, jsonString);
```

### Partial Translation Override

Override specific translations without replacing the entire translation file:

```typescript
import { I18nManager, SupportedLocales } from "html5-qrcode";

// Override only specific strings
I18nManager.registerTranslations(SupportedLocales.EN, {
  html5QrcodeScanner: {
    scanButtonStartScanningText: "Begin Scan",
    scanButtonStopScanningText: "End Scan"
  }
});
```

## ✅ Validation

### JSON Schema Validation

All translation files are validated against the JSON Schema defined in `translation-schema.json`. This ensures:

- All required fields are present
- All values are strings
- No extra fields that might be typos

The validation happens automatically when loading translations.

### Manual Validation

You can validate your JSON file using online tools:
1. Go to https://www.jsonschemavalidator.net/
2. Paste the schema from `src/i18n/locales/translation-schema.json`
3. Paste your translation JSON
4. Click "Validate"

## 📋 Complete Example

### HTML Example with Dynamic Language Switching

```html
<!DOCTYPE html>
<html>
<head>
  <title>QR Scanner with JSON i18n</title>
  <script src="html5-qrcode.min.js"></script>
</head>
<body>
  <select id="language">
    <option value="en">English</option>
    <option value="ja">日本語</option>
    <option value="es">Español</option>
  </select>
  
  <div id="reader"></div>

  <script>
    const { Html5QrcodeScanner, I18nManager, SupportedLocales } = window.Html5Qrcode;
    
    let scanner = null;

    // Load Spanish translations from URL
    async function loadSpanish() {
      try {
        await I18nManager.loadTranslationFromURL(
          SupportedLocales.ES,
          '/locales/es.json'
        );
      } catch (error) {
        console.error('Failed to load Spanish:', error);
      }
    }

    async function changeLanguage(locale) {
      // Stop existing scanner
      if (scanner) {
        await scanner.clear();
      }

      // Load Spanish if not already loaded
      if (locale === 'es' && !I18nManager.getLocale()) {
        await loadSpanish();
      }

      // Set locale
      I18nManager.setLocale(locale);

      // Create new scanner
      scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => console.log(decodedText),
        (error) => {}
      );
    }

    // Language selector
    document.getElementById('language').addEventListener('change', (e) => {
      changeLanguage(e.target.value);
    });

    // Initialize
    changeLanguage('en');
  </script>
</body>
</html>
```

### TypeScript Example

```typescript
import { 
  Html5QrcodeScanner, 
  I18nManager, 
  SupportedLocales,
  TranslationLoader 
} from "html5-qrcode";

async function initializeScanner() {
  // Auto-detect browser language
  const detectedLocale = I18nManager.detectAndSetLocale();
  console.log(`Detected locale: ${detectedLocale}`);

  // If a custom locale is needed, load it
  if (detectedLocale === SupportedLocales.ES) {
    try {
      await I18nManager.loadTranslationFromURL(
        SupportedLocales.ES,
        '/assets/locales/es.json'
      );
    } catch (error) {
      console.error('Failed to load Spanish, falling back to English');
      I18nManager.setLocale(SupportedLocales.EN);
    }
  }

  // Create scanner
  const scanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
  );

  scanner.render(
    (decodedText, decodedResult) => {
      console.log(`Scanned: ${decodedText}`);
    },
    (errorMessage) => {
      // Handle error
    }
  );
}

initializeScanner();
```

## 🌍 Supported Locales

Currently implemented:
- `en` - English (default)
- `ja` - Japanese (日本語)

Framework supports (add your translation JSON):
- `es` - Spanish (Español)
- `fr` - French (Français)
- `de` - German (Deutsch)
- `zh-CN` - Chinese Simplified (简体中文)
- `zh-TW` - Chinese Traditional (繁體中文)
- `ko` - Korean (한국어)
- `it` - Italian (Italiano)
- `pt` - Portuguese (Português)
- `ru` - Russian (Русский)
- `ar` - Arabic (العربية)
- `hi` - Hindi (हिन्दी)

## 🤝 Contributing Translations

### For Translators (No Programming Required!)

1. **Download the template**:
   - Get `template.json` from the repository
   - Or copy from: https://github.com/mebjas/html5-qrcode/blob/master/src/i18n/locales/template.json

2. **Translate**:
   - Open the file in any text editor
   - Replace `[Your translation here]` with translations in your language
   - Keep placeholders like `{error}` and `{decodedText}` unchanged

3. **Validate** (optional but recommended):
   - Use an online JSON validator
   - Check against the schema in `translation-schema.json`

4. **Submit**:
   - Create a pull request on GitHub
   - Or email the translated JSON file to the maintainer

### File Naming Convention

Name your translation file using the ISO 639-1 language code:
- `es.json` for Spanish
- `fr.json` for French
- `de.json` for German
- etc.

For regional variants, use ISO 639-1 plus ISO 3166-1:
- `zh-CN.json` for Chinese Simplified
- `zh-TW.json` for Chinese Traditional
- `pt-BR.json` for Brazilian Portuguese

## 🔍 Translation Tips

1. **Keep it concise**: UI text should be short and clear
2. **Test with real UI**: Load your translation and see how it looks
3. **Consider context**: Some strings appear in buttons, others in status messages
4. **Preserve placeholders**: Don't translate `{error}`, `{decodedText}`, etc.
5. **Mind the grammar**: Placeholders might appear at different positions in different languages

## 🐛 Troubleshooting

### Translation not loading

```typescript
// Check if translation is loaded
if (I18nManager.getLocale() !== SupportedLocales.ES) {
  console.error('Spanish not loaded');
}
```

### Fallback to English

If a translation file is invalid or missing keys, the library will automatically fall back to English.

### Validation errors

Enable verbose logging to see validation errors:

```typescript
try {
  I18nManager.loadTranslationFromJSON(SupportedLocales.ES, invalidJSON);
} catch (error) {
  console.error('Validation failed:', error.message);
}
```

## 📚 API Reference

### I18nManager

- `setLocale(locale)` - Set current locale
- `getLocale()` - Get current locale
- `loadTranslationFromJSON(locale, json)` - Load from JSON object
- `loadTranslationFromString(locale, jsonString)` - Load from JSON string
- `loadTranslationFromURL(locale, url)` - Load from URL (async)
- `registerTranslations(locale, partial)` - Override specific translations
- `translate(key, params?)` - Get translation string
- `detectAndSetLocale()` - Auto-detect and set browser language

### TranslationLoader

- `loadFromJSON(locale, json)` - Load and validate JSON object
- `loadFromJSONString(locale, jsonString)` - Load from JSON string
- `loadFromURL(locale, url)` - Load from URL (async)
- `getTranslation(locale)` - Get loaded translation
- `isLoaded(locale)` - Check if translation is loaded
- `createTemplate()` - Generate translation template

## 📄 License

Translations are part of the html5-qrcode project and follow the same Apache 2.0 license.

## 🙏 Acknowledgments

Thank you to all translators who help make this library accessible to users worldwide!
