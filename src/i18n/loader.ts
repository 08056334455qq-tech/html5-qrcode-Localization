/**
 * @fileoverview
 * JSON-based translation loader for html5-qrcode library
 * 
 * @author mebjas <minhazav@gmail.com>
 */

import { Translations, SupportedLocales } from "./types";

/**
 * TranslationLoader handles loading and validating JSON translation files.
 */
export class TranslationLoader {
    private static loadedTranslations: Map<SupportedLocales, Translations> = new Map();

    /**
     * Load a translation from a JSON object.
     * 
     * @param locale - The locale identifier
     * @param json - The JSON object containing translations
     * @returns The validated Translations object
     */
    public static loadFromJSON(locale: SupportedLocales, json: any): Translations {
        if (!this.validateTranslationJSON(json)) {
            throw new Error(`Invalid translation JSON for locale: ${locale}`);
        }

        const translations: Translations = json as Translations;
        this.loadedTranslations.set(locale, translations);
        return translations;
    }

    /**
     * Load a translation from a JSON string.
     * 
     * @param locale - The locale identifier
     * @param jsonString - The JSON string containing translations
     * @returns The validated Translations object
     */
    public static loadFromJSONString(locale: SupportedLocales, jsonString: string): Translations {
        try {
            const json = JSON.parse(jsonString);
            return this.loadFromJSON(locale, json);
        } catch (error) {
            throw new Error(`Failed to parse JSON for locale ${locale}: ${error}`);
        }
    }

    /**
     * Load a translation from a URL.
     * 
     * @param locale - The locale identifier
     * @param url - The URL to load the JSON from
     * @returns Promise that resolves to the Translations object
     */
    public static async loadFromURL(locale: SupportedLocales, url: string): Promise<Translations> {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            return this.loadFromJSON(locale, json);
        } catch (error) {
            throw new Error(`Failed to load translation from ${url}: ${error}`);
        }
    }

    /**
     * Get a loaded translation.
     * 
     * @param locale - The locale identifier
     * @returns The Translations object if loaded, undefined otherwise
     */
    public static getTranslation(locale: SupportedLocales): Translations | undefined {
        return this.loadedTranslations.get(locale);
    }

    /**
     * Check if a translation is loaded.
     * 
     * @param locale - The locale identifier
     * @returns True if the translation is loaded
     */
    public static isLoaded(locale: SupportedLocales): boolean {
        return this.loadedTranslations.has(locale);
    }

    /**
     * Clear all loaded translations.
     */
    public static clearAll(): void {
        this.loadedTranslations.clear();
    }

    /**
     * Validate a translation JSON object.
     * 
     * @param json - The JSON object to validate
     * @returns True if the JSON is valid
     */
    private static validateTranslationJSON(json: any): boolean {
        if (!json || typeof json !== 'object') {
            console.error('Translation JSON must be an object');
            return false;
        }

        // Check for required top-level keys
        const requiredKeys = ['html5Qrcode', 'html5QrcodeScanner', 'libraryInfo'];
        for (const key of requiredKeys) {
            if (!(key in json) || typeof json[key] !== 'object') {
                console.error(`Missing or invalid required key: ${key}`);
                return false;
            }
        }

        // Validate html5Qrcode section
        const html5QrcodeKeys = [
            'codeParseError',
            'errorGettingUserMedia',
            'onlyDeviceSupportedError',
            'cameraStreamingNotSupported',
            'unableToQuerySupportedDevices',
            'insecureContextCameraQueryError',
            'scannerPaused'
        ];
        if (!this.validateSection(json.html5Qrcode, html5QrcodeKeys, 'html5Qrcode')) {
            return false;
        }

        // Validate html5QrcodeScanner section
        const html5QrcodeScannerKeys = [
            'scanningStatus',
            'idleStatus',
            'errorStatus',
            'permissionStatus',
            'noCameraFoundErrorStatus',
            'lastMatch',
            'codeScannerTitle',
            'cameraPermissionTitle',
            'cameraPermissionRequesting',
            'noCameraFound',
            'scanButtonStopScanningText',
            'scanButtonStartScanningText',
            'torchOnButton',
            'torchOffButton',
            'torchOnFailedMessage',
            'torchOffFailedMessage',
            'scanButtonScanningStarting',
            'textIfCameraScanSelected',
            'textIfFileScanSelected',
            'selectCamera',
            'fileSelectionChooseImage',
            'fileSelectionChooseAnother',
            'fileSelectionNoImageSelected',
            'anonymousCameraPrefix',
            'dragAndDropMessage',
            'dragAndDropMessageOnlyImages',
            'zoom',
            'loadingImage',
            'cameraScanAltText',
            'fileScanAltText'
        ];
        if (!this.validateSection(json.html5QrcodeScanner, html5QrcodeScannerKeys, 'html5QrcodeScanner')) {
            return false;
        }

        // Validate libraryInfo section
        const libraryInfoKeys = ['poweredBy', 'reportIssues'];
        if (!this.validateSection(json.libraryInfo, libraryInfoKeys, 'libraryInfo')) {
            return false;
        }

        return true;
    }

    /**
     * Validate a section of the translation JSON.
     * 
     * @param section - The section object to validate
     * @param requiredKeys - Array of required keys
     * @param sectionName - Name of the section for error messages
     * @returns True if the section is valid
     */
    private static validateSection(section: any, requiredKeys: string[], sectionName: string): boolean {
        for (const key of requiredKeys) {
            if (!(key in section)) {
                console.error(`Missing required key '${key}' in section '${sectionName}'`);
                return false;
            }
            if (typeof section[key] !== 'string') {
                console.error(`Value for '${key}' in section '${sectionName}' must be a string`);
                return false;
            }
        }
        return true;
    }

    /**
     * Create a translation template JSON.
     * Useful for creating new language files.
     * 
     * @returns A template Translations object with placeholder values
     */
    public static createTemplate(): Translations {
        return {
            html5Qrcode: {
                codeParseError: "[Translation needed]",
                errorGettingUserMedia: "[Translation needed]",
                onlyDeviceSupportedError: "[Translation needed]",
                cameraStreamingNotSupported: "[Translation needed]",
                unableToQuerySupportedDevices: "[Translation needed]",
                insecureContextCameraQueryError: "[Translation needed]",
                scannerPaused: "[Translation needed]"
            },
            html5QrcodeScanner: {
                scanningStatus: "[Translation needed]",
                idleStatus: "[Translation needed]",
                errorStatus: "[Translation needed]",
                permissionStatus: "[Translation needed]",
                noCameraFoundErrorStatus: "[Translation needed]",
                lastMatch: "[Translation needed]",
                codeScannerTitle: "[Translation needed]",
                cameraPermissionTitle: "[Translation needed]",
                cameraPermissionRequesting: "[Translation needed]",
                noCameraFound: "[Translation needed]",
                scanButtonStopScanningText: "[Translation needed]",
                scanButtonStartScanningText: "[Translation needed]",
                torchOnButton: "[Translation needed]",
                torchOffButton: "[Translation needed]",
                torchOnFailedMessage: "[Translation needed]",
                torchOffFailedMessage: "[Translation needed]",
                scanButtonScanningStarting: "[Translation needed]",
                textIfCameraScanSelected: "[Translation needed]",
                textIfFileScanSelected: "[Translation needed]",
                selectCamera: "[Translation needed]",
                fileSelectionChooseImage: "[Translation needed]",
                fileSelectionChooseAnother: "[Translation needed]",
                fileSelectionNoImageSelected: "[Translation needed]",
                anonymousCameraPrefix: "[Translation needed]",
                dragAndDropMessage: "[Translation needed]",
                dragAndDropMessageOnlyImages: "[Translation needed]",
                zoom: "[Translation needed]",
                loadingImage: "[Translation needed]",
                cameraScanAltText: "[Translation needed]",
                fileScanAltText: "[Translation needed]"
            },
            libraryInfo: {
                poweredBy: "[Translation needed]",
                reportIssues: "[Translation needed]"
            }
        };
    }
}
