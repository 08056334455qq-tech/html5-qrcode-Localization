/**
 * @fileoverview
 * Type definitions for internationalization (i18n) support
 * 
 * @author mebjas <minhazav@gmail.com>
 */

/**
 * Supported locales for the library.
 */
export enum SupportedLocales {
    EN = "en",
    JA = "ja",
    ES = "es",
    FR = "fr",
    DE = "de",
    ZH_CN = "zh-CN",
    ZH_TW = "zh-TW",
    KO = "ko",
    IT = "it",
    PT = "pt",
    RU = "ru",
    AR = "ar",
    HI = "hi"
}

/**
 * Interface for Html5Qrcode string translations.
 */
export interface Html5QrcodeTranslations {
    codeParseError: string;
    errorGettingUserMedia: string;
    onlyDeviceSupportedError: string;
    cameraStreamingNotSupported: string;
    unableToQuerySupportedDevices: string;
    insecureContextCameraQueryError: string;
    scannerPaused: string;
}

/**
 * Interface for Html5QrcodeScanner string translations.
 */
export interface Html5QrcodeScannerTranslations {
    scanningStatus: string;
    idleStatus: string;
    errorStatus: string;
    permissionStatus: string;
    noCameraFoundErrorStatus: string;
    lastMatch: string;
    codeScannerTitle: string;
    cameraPermissionTitle: string;
    cameraPermissionRequesting: string;
    noCameraFound: string;
    scanButtonStopScanningText: string;
    scanButtonStartScanningText: string;
    torchOnButton: string;
    torchOffButton: string;
    torchOnFailedMessage: string;
    torchOffFailedMessage: string;
    scanButtonScanningStarting: string;
    textIfCameraScanSelected: string;
    textIfFileScanSelected: string;
    selectCamera: string;
    fileSelectionChooseImage: string;
    fileSelectionChooseAnother: string;
    fileSelectionNoImageSelected: string;
    anonymousCameraPrefix: string;
    dragAndDropMessage: string;
    dragAndDropMessageOnlyImages: string;
    zoom: string;
    loadingImage: string;
    cameraScanAltText: string;
    fileScanAltText: string;
}

/**
 * Interface for LibraryInfo string translations.
 */
export interface LibraryInfoTranslations {
    poweredBy: string;
    reportIssues: string;
}

/**
 * Complete translation structure for the library.
 */
export interface Translations {
    html5Qrcode: Html5QrcodeTranslations;
    html5QrcodeScanner: Html5QrcodeScannerTranslations;
    libraryInfo: LibraryInfoTranslations;
}
