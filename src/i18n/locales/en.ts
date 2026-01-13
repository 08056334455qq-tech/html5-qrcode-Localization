/**
 * @fileoverview
 * English translations for html5-qrcode library
 * 
 * @author mebjas <minhazav@gmail.com>
 */

import { Translations } from "../types";

export const en: Translations = {
    html5Qrcode: {
        codeParseError: "QR code parse error, error = {error}",
        errorGettingUserMedia: "Error getting userMedia, error = {error}",
        onlyDeviceSupportedError: "The device doesn't support navigator.mediaDevices, only supported cameraIdOrConfig in this case is deviceId parameter (string).",
        cameraStreamingNotSupported: "Camera streaming not supported by the browser.",
        unableToQuerySupportedDevices: "Unable to query supported devices, unknown error.",
        insecureContextCameraQueryError: "Camera access is only supported in secure context like https or localhost.",
        scannerPaused: "Scanner paused"
    },
    html5QrcodeScanner: {
        scanningStatus: "Scanning",
        idleStatus: "Idle",
        errorStatus: "Error",
        permissionStatus: "Permission",
        noCameraFoundErrorStatus: "No Cameras",
        lastMatch: "Last Match: {decodedText}",
        codeScannerTitle: "Code Scanner",
        cameraPermissionTitle: "Request Camera Permissions",
        cameraPermissionRequesting: "Requesting camera permissions...",
        noCameraFound: "No camera found",
        scanButtonStopScanningText: "Stop Scanning",
        scanButtonStartScanningText: "Start Scanning",
        torchOnButton: "Switch On Torch",
        torchOffButton: "Switch Off Torch",
        torchOnFailedMessage: "Failed to turn on torch",
        torchOffFailedMessage: "Failed to turn off torch",
        scanButtonScanningStarting: "Launching Camera...",
        textIfCameraScanSelected: "Scan an Image File",
        textIfFileScanSelected: "Scan using camera directly",
        selectCamera: "Select Camera",
        fileSelectionChooseImage: "Choose Image",
        fileSelectionChooseAnother: "Choose Another",
        fileSelectionNoImageSelected: "No image chosen",
        anonymousCameraPrefix: "Anonymous Camera",
        dragAndDropMessage: "Or drop an image to scan",
        dragAndDropMessageOnlyImages: "Or drop an image to scan (other files not supported)",
        zoom: "zoom",
        loadingImage: "Loading image...",
        cameraScanAltText: "Camera based scan",
        fileScanAltText: "File based scan"
    },
    libraryInfo: {
        poweredBy: "Powered by ",
        reportIssues: "Report issues"
    }
};
