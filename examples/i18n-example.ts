/**
 * @fileoverview
 * Example demonstrating internationalization (i18n) support
 * 
 * This example shows how to use the i18n features with html5-qrcode
 */

import { Html5QrcodeScanner } from "../src/html5-qrcode-scanner";
import { I18nManager, SupportedLocales } from "../src/i18n";

// Example 1: Using Japanese locale
function exampleJapanese() {
    // Set locale to Japanese
    I18nManager.setLocale(SupportedLocales.JA);

    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
    );

    html5QrcodeScanner.render(
        (decodedText, decodedResult) => {
            console.log(`スキャン成功: ${decodedText}`, decodedResult);
        },
        (errorMessage) => {
            console.log(`スキャンエラー: ${errorMessage}`);
        }
    );
}

// Example 2: Auto-detect browser language
function exampleAutoDetect() {
    // Automatically detect and set browser language
    const detectedLocale = I18nManager.detectAndSetLocale();
    console.log(`Detected locale: ${detectedLocale}`);

    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
    );

    html5QrcodeScanner.render(
        (decodedText) => console.log(`Decoded: ${decodedText}`),
        (error) => console.log(`Error: ${error}`)
    );
}

// Example 3: Dynamic language switching
let scanner: Html5QrcodeScanner | null = null;

function changeLanguage(locale: SupportedLocales) {
    // Stop existing scanner
    if (scanner) {
        scanner.clear();
    }

    // Set new locale
    I18nManager.setLocale(locale);

    // Create new scanner with the new language
    scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
    );

    scanner.render(
        (decodedText) => console.log(`Decoded: ${decodedText}`),
        (error) => console.log(`Error: ${error}`)
    );
}

// Example 4: Custom translations
function exampleCustomTranslations() {
    // Override specific translations
    I18nManager.registerTranslations(SupportedLocales.EN, {
        html5QrcodeScanner: {
            scanButtonStartScanningText: "Begin Scan",
            scanButtonStopScanningText: "End Scan",
            codeScannerTitle: "My Custom Scanner"
        }
    });

    I18nManager.setLocale(SupportedLocales.EN);

    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
    );

    html5QrcodeScanner.render(
        (decodedText) => console.log(`Decoded: ${decodedText}`),
        (error) => console.log(`Error: ${error}`)
    );
}

// Example 5: Adding a new language (Spanish)
function exampleAddNewLanguage() {
    const spanishTranslations = {
        html5Qrcode: {
            codeParseError: "Error al analizar código QR, error = {error}",
            errorGettingUserMedia: "Error al obtener userMedia, error = {error}",
            onlyDeviceSupportedError: "El dispositivo no admite navigator.mediaDevices",
            cameraStreamingNotSupported: "Transmisión de cámara no compatible con el navegador",
            unableToQuerySupportedDevices: "No se pueden consultar los dispositivos compatibles",
            insecureContextCameraQueryError: "El acceso a la cámara solo se admite en contexto seguro como https o localhost",
            scannerPaused: "Escáner pausado"
        },
        html5QrcodeScanner: {
            scanningStatus: "Escaneando",
            idleStatus: "Inactivo",
            errorStatus: "Error",
            permissionStatus: "Permiso",
            noCameraFoundErrorStatus: "Sin Cámaras",
            lastMatch: "Última Coincidencia: {decodedText}",
            codeScannerTitle: "Escáner de Códigos",
            cameraPermissionTitle: "Solicitar Permisos de Cámara",
            cameraPermissionRequesting: "Solicitando permisos de cámara...",
            noCameraFound: "No se encontró cámara",
            scanButtonStopScanningText: "Detener Escaneo",
            scanButtonStartScanningText: "Iniciar Escaneo",
            torchOnButton: "Encender Linterna",
            torchOffButton: "Apagar Linterna",
            torchOnFailedMessage: "Error al encender la linterna",
            torchOffFailedMessage: "Error al apagar la linterna",
            scanButtonScanningStarting: "Iniciando Cámara...",
            textIfCameraScanSelected: "Escanear un Archivo de Imagen",
            textIfFileScanSelected: "Escanear usando cámara directamente",
            selectCamera: "Seleccionar Cámara",
            fileSelectionChooseImage: "Elegir Imagen",
            fileSelectionChooseAnother: "Elegir Otra",
            fileSelectionNoImageSelected: "Ninguna imagen elegida",
            anonymousCameraPrefix: "Cámara Anónima",
            dragAndDropMessage: "O arrastra una imagen para escanear",
            dragAndDropMessageOnlyImages: "O arrastra una imagen para escanear (otros archivos no compatibles)",
            zoom: "zoom",
            loadingImage: "Cargando imagen...",
            cameraScanAltText: "Escaneo basado en cámara",
            fileScanAltText: "Escaneo basado en archivo"
        },
        libraryInfo: {
            poweredBy: "Desarrollado por ",
            reportIssues: "Reportar problemas"
        }
    };

    // Add Spanish locale
    I18nManager.addLocale(SupportedLocales.ES, spanishTranslations);
    I18nManager.setLocale(SupportedLocales.ES);

    const html5QrcodeScanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
    );

    html5QrcodeScanner.render(
        (decodedText) => console.log(`Decodificado: ${decodedText}`),
        (error) => console.log(`Error: ${error}`)
    );
}

// Example 6: Getting translation strings directly
function exampleDirectTranslation() {
    I18nManager.setLocale(SupportedLocales.JA);

    // Get specific translations
    const scanningText = I18nManager.translate('html5QrcodeScanner.scanningStatus');
    console.log(scanningText); // Output: "スキャン中"

    // Get translation with parameters
    const errorText = I18nManager.translate('html5Qrcode.codeParseError', {
        error: '無効な形式'
    });
    console.log(errorText); // Output: "QRコードの解析エラー、エラー = 無効な形式"
}

// Export examples
export {
    exampleJapanese,
    exampleAutoDetect,
    changeLanguage,
    exampleCustomTranslations,
    exampleAddNewLanguage,
    exampleDirectTranslation
};
