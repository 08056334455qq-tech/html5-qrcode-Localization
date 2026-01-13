/**
 * @fileoverview
 * Internationalization (i18n) manager for html5-qrcode library
 * 
 * @author mebjas <minhazav@gmail.com>
 */

import { Translations, SupportedLocales } from "./types";
import { TranslationLoader } from "./loader";

// Import JSON files
import enJSON from "./locales/en.json";
import jaJSON from "./locales/ja.json";

/**
 * I18nManager handles internationalization for the library.
 * Now supports JSON-based translations for easier management.
 * 
 * Usage:
 * ```typescript
 * // Set the locale
 * I18nManager.setLocale(SupportedLocales.JA);
 * 
 * // Get a translation
 * const text = I18nManager.translate('html5QrcodeScanner.scanningStatus');
 * 
 * // Get a translation with parameters
 * const errorText = I18nManager.translate('html5Qrcode.codeParseError', { error: 'Invalid format' });
 * 
 * // Load custom translation from JSON
 * await I18nManager.loadTranslationFromURL(SupportedLocales.ES, '/locales/es.json');
 * 
 * // Load from JSON object
 * I18nManager.loadTranslationFromJSON(SupportedLocales.FR, frenchTranslationObject);
 * ```
 */
export class I18nManager {
    private static currentLocale: SupportedLocales = SupportedLocales.EN;
    private static translations: Map<SupportedLocales, Translations> = new Map();
    private static customTranslations: Map<SupportedLocales, Partial<Translations>> = new Map();
    private static initialized: boolean = false;

    /**
     * Initialize the manager with default translations.
     * This is called automatically on first use.
     */
    private static initialize(): void {
        if (this.initialized) {
            return;
        }

        // Load default translations from JSON
        try {
            this.translations.set(SupportedLocales.EN, TranslationLoader.loadFromJSON(SupportedLocales.EN, enJSON));
            this.translations.set(SupportedLocales.JA, TranslationLoader.loadFromJSON(SupportedLocales.JA, jaJSON));
            this.initialized = true;
        } catch (error) {
            console.error('Failed to initialize translations:', error);
            // Fallback to empty translations
            this.initialized = true;
        }
    }

    /**
     * Set the current locale for the library.
     * 
     * @param locale - The locale to set
     */
    public static setLocale(locale: SupportedLocales): void {
        this.initialize();
        
        if (!this.translations.has(locale)) {
            console.warn(`Locale ${locale} is not supported. Falling back to English.`);
            this.currentLocale = SupportedLocales.EN;
            return;
        }
        this.currentLocale = locale;
    }

    /**
     * Get the current locale.
     * 
     * @returns The current locale
     */
    public static getLocale(): SupportedLocales {
        this.initialize();
        return this.currentLocale;
    }

    /**
     * Load a translation from a JSON object.
     * 
     * @param locale - The locale identifier
     * @param json - The JSON object containing translations
     */
    public static loadTranslationFromJSON(locale: SupportedLocales, json: any): void {
        this.initialize();
        const translations = TranslationLoader.loadFromJSON(locale, json);
        this.translations.set(locale, translations);
    }

    /**
     * Load a translation from a JSON string.
     * 
     * @param locale - The locale identifier
     * @param jsonString - The JSON string containing translations
     */
    public static loadTranslationFromString(locale: SupportedLocales, jsonString: string): void {
        this.initialize();
        const translations = TranslationLoader.loadFromJSONString(locale, jsonString);
        this.translations.set(locale, translations);
    }

    /**
     * Load a translation from a URL (async).
     * 
     * @param locale - The locale identifier
     * @param url - The URL to load the JSON from
     * @returns Promise that resolves when the translation is loaded
     */
    public static async loadTranslationFromURL(locale: SupportedLocales, url: string): Promise<void> {
        this.initialize();
        const translations = await TranslationLoader.loadFromURL(locale, url);
        this.translations.set(locale, translations);
    }

    /**
     * Register custom translations for a locale.
     * This allows users to override default translations or add new locales.
     * 
     * @param locale - The locale to register translations for
     * @param translations - Partial translations to merge with defaults
     */
    public static registerTranslations(
        locale: SupportedLocales, 
        translations: Partial<Translations>
    ): void {
        this.initialize();
        const existing = this.customTranslations.get(locale);
        this.customTranslations.set(locale, {
            ...existing,
            ...translations
        });
    }

    /**
     * Add a complete translation set for a new locale.
     * 
     * @param locale - The locale identifier
     * @param translations - Complete translations for the locale
     */
    public static addLocale(locale: SupportedLocales, translations: Translations): void {
        this.initialize();
        this.translations.set(locale, translations);
    }

    /**
     * Get translation for a given key.
     * 
     * @param key - The translation key in dot notation (e.g., 'html5QrcodeScanner.scanningStatus')
     * @param params - Optional parameters to replace in the translation string
     * @returns The translated string
     */
    public static translate(key: string, params?: Record<string, any>): string {
        this.initialize();
        
        const keys = key.split('.');
        let translation: any = this.getTranslations();

        for (const k of keys) {
            if (translation && typeof translation === 'object' && k in translation) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }

        if (typeof translation !== 'string') {
            console.warn(`Translation value is not a string: ${key}`);
            return key;
        }

        // Replace parameters in the translation
        if (params) {
            return this.replaceParams(translation, params);
        }

        return translation;
    }

    /**
     * Get all translations for the current locale.
     * 
     * @returns Translations object for current locale
     */
    private static getTranslations(): Translations {
        this.initialize();
        
        const baseTranslations = this.translations.get(this.currentLocale) || this.translations.get(SupportedLocales.EN);
        if (!baseTranslations) {
            throw new Error('No translations available');
        }
        
        const customTranslations = this.customTranslations.get(this.currentLocale);

        if (!customTranslations) {
            return baseTranslations;
        }

        // Deep merge custom translations with base translations
        return this.deepMerge(baseTranslations, customTranslations) as Translations;
    }

    /**
     * Replace parameters in a translation string.
     * 
     * @param str - The translation string with placeholders like {param}
     * @param params - The parameters to replace
     * @returns The string with parameters replaced
     */
    private static replaceParams(str: string, params: Record<string, any>): string {
        return str.replace(/\{(\w+)\}/g, (match, key) => {
            return params.hasOwnProperty(key) ? String(params[key]) : match;
        });
    }

    /**
     * Deep merge two objects.
     * 
     * @param target - Target object
     * @param source - Source object
     * @returns Merged object
     */
    private static deepMerge(target: any, source: any): any {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.deepMerge(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    }

    /**
     * Check if value is an object.
     * 
     * @param item - The item to check
     * @returns True if item is an object
     */
    private static isObject(item: any): boolean {
        return item && typeof item === 'object' && !Array.isArray(item);
    }

    /**
     * Detect browser locale and set it if supported.
     * 
     * @returns The detected and set locale
     */
    public static detectAndSetLocale(): SupportedLocales {
        this.initialize();
        
        const browserLocale = navigator.language || (navigator as any).userLanguage;
        
        // Try exact match first
        for (const locale of Object.values(SupportedLocales)) {
            if (browserLocale.toLowerCase() === locale.toLowerCase()) {
                this.setLocale(locale);
                return locale;
            }
        }

        // Try language code match (e.g., 'ja' from 'ja-JP')
        const languageCode = browserLocale.split('-')[0];
        for (const locale of Object.values(SupportedLocales)) {
            if (locale.toLowerCase().startsWith(languageCode.toLowerCase())) {
                this.setLocale(locale);
                return locale;
            }
        }

        // Default to English
        return SupportedLocales.EN;
    }
}
