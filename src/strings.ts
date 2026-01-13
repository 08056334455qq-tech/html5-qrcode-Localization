/**
 * @fileoverview
 * Strings used by {@class Html5Qrcode} & {@class Html5QrcodeScanner}
 * 
 * @author mebjas <minhazav@gmail.com>
 * 
 * The word "QR Code" is registered trademark of DENSO WAVE INCORPORATED
 * http://www.denso-wave.com/qrcode/faqpatent-e.html
 */

import { I18nManager } from "./i18n";

/**
 * Strings used in {@class Html5Qrcode}.
 * 
 * Now supports internationalization via I18nManager.
 */
export class Html5QrcodeStrings {

    public static codeParseError(exception: any): string {
        return I18nManager.translate('html5Qrcode.codeParseError', { error: exception });
    }

    public static errorGettingUserMedia(error: any): string {
        return I18nManager.translate('html5Qrcode.errorGettingUserMedia', { error: error });
    }

    public static onlyDeviceSupportedError(): string {
        return I18nManager.translate('html5Qrcode.onlyDeviceSupportedError');
    }

    public static cameraStreamingNotSupported(): string {
        return I18nManager.translate('html5Qrcode.cameraStreamingNotSupported');
    }

    public static unableToQuerySupportedDevices(): string {
        return I18nManager.translate('html5Qrcode.unableToQuerySupportedDevices');
    }

    public static insecureContextCameraQueryError(): string {
        return I18nManager.translate('html5Qrcode.insecureContextCameraQueryError');
    }

    public static scannerPaused(): string {
        return I18nManager.translate('html5Qrcode.scannerPaused');
    }
}

/**
 * Strings used in {@class Html5QrcodeScanner}.
 * 
 * Now supports internationalization via I18nManager.
 */
export class Html5QrcodeScannerStrings {

    public static scanningStatus(): string {
        return I18nManager.translate('html5QrcodeScanner.scanningStatus');
    }

    public static idleStatus(): string {
        return I18nManager.translate('html5QrcodeScanner.idleStatus');
    }

    public static errorStatus(): string {
        return I18nManager.translate('html5QrcodeScanner.errorStatus');
    }

    public static permissionStatus(): string {
        return I18nManager.translate('html5QrcodeScanner.permissionStatus');
    }

    public static noCameraFoundErrorStatus(): string {
        return I18nManager.translate('html5QrcodeScanner.noCameraFoundErrorStatus');
    }

    public static lastMatch(decodedText: string): string {
        return I18nManager.translate('html5QrcodeScanner.lastMatch', { decodedText: decodedText });
    }

    public static codeScannerTitle(): string {
        return I18nManager.translate('html5QrcodeScanner.codeScannerTitle');
    }

    public static cameraPermissionTitle(): string {
        return I18nManager.translate('html5QrcodeScanner.cameraPermissionTitle');
    }

    public static cameraPermissionRequesting(): string {
        return I18nManager.translate('html5QrcodeScanner.cameraPermissionRequesting');
    }

    public static noCameraFound(): string {
        return I18nManager.translate('html5QrcodeScanner.noCameraFound');
    }

    public static scanButtonStopScanningText(): string {
        return I18nManager.translate('html5QrcodeScanner.scanButtonStopScanningText');
    }

    public static scanButtonStartScanningText(): string {
        return I18nManager.translate('html5QrcodeScanner.scanButtonStartScanningText');
    }

    public static torchOnButton(): string {
        return I18nManager.translate('html5QrcodeScanner.torchOnButton');
    }

    public static torchOffButton(): string {
        return I18nManager.translate('html5QrcodeScanner.torchOffButton');
    }

    public static torchOnFailedMessage(): string {
        return I18nManager.translate('html5QrcodeScanner.torchOnFailedMessage');
    }

    public static torchOffFailedMessage(): string {
        return I18nManager.translate('html5QrcodeScanner.torchOffFailedMessage');
    }

    public static scanButtonScanningStarting(): string {
        return I18nManager.translate('html5QrcodeScanner.scanButtonScanningStarting');
    }

    /**
     * Text to show when camera scan is selected.
     * 
     * This will be used to switch to file based scanning.
     */
    public static textIfCameraScanSelected(): string {
        return I18nManager.translate('html5QrcodeScanner.textIfCameraScanSelected');
    }

    /**
     * Text to show when file based scan is selected.
     * 
     * This will be used to switch to camera based scanning.
     */
    public static textIfFileScanSelected(): string {
        return I18nManager.translate('html5QrcodeScanner.textIfFileScanSelected');
    }

    public static selectCamera(): string {
        return I18nManager.translate('html5QrcodeScanner.selectCamera');
    }

    public static fileSelectionChooseImage(): string {
        return I18nManager.translate('html5QrcodeScanner.fileSelectionChooseImage');
    }

    public static fileSelectionChooseAnother(): string {
        return I18nManager.translate('html5QrcodeScanner.fileSelectionChooseAnother');
    }

    public static fileSelectionNoImageSelected(): string {
        return I18nManager.translate('html5QrcodeScanner.fileSelectionNoImageSelected');
    }

    /** Prefix to be given to anonymous cameras. */
    public static anonymousCameraPrefix(): string {
        return I18nManager.translate('html5QrcodeScanner.anonymousCameraPrefix');
    }

    public static dragAndDropMessage(): string {
        return I18nManager.translate('html5QrcodeScanner.dragAndDropMessage');
    }

    public static dragAndDropMessageOnlyImages(): string {
        return I18nManager.translate('html5QrcodeScanner.dragAndDropMessageOnlyImages');
    }

    /** Value for zoom. */
    public static zoom(): string {
        return I18nManager.translate('html5QrcodeScanner.zoom');
    }

    public static loadingImage(): string {
        return I18nManager.translate('html5QrcodeScanner.loadingImage');
    }

    public static cameraScanAltText(): string {
        return I18nManager.translate('html5QrcodeScanner.cameraScanAltText');
    }

    public static fileScanAltText(): string {
        return I18nManager.translate('html5QrcodeScanner.fileScanAltText');
    }
}

/** Strings used in {@class LibraryInfoDiv} */
export class LibraryInfoStrings {

    public static poweredBy(): string {
        return I18nManager.translate('libraryInfo.poweredBy');
    }

    public static reportIssues(): string {
        return I18nManager.translate('libraryInfo.reportIssues');
    }
}
