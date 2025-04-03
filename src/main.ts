import './main.css'
// @ts-ignore
import {GT_OSGB, GT_WGS84} from './geotools.js'
import {convert} from 'geo-coordinates-parser'

const wgs84InputElement = (document.getElementById("wgs84Inp") ?? document.createElement("input")) as HTMLInputElement;
const osgbInputElement = (document.getElementById("osgbInp") ?? document.createElement("input")) as HTMLInputElement;
const errorDiv = (document.getElementById("errorDiv") ?? document.createElement("div")) as HTMLDivElement;

function hideError() {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
}

function showError(message: string) {
    errorDiv.style.display = "block";
    errorDiv.textContent = message;
}

function convertCoordinates() {
    hideError();
    const wgs84Value = wgs84InputElement.value.trim();
    const osgbValue = osgbInputElement.value.trim();
    let wgs84Instance, osgbInstance, convertedCoordinates;

    if (wgs84Value) {
        wgs84Instance = new GT_WGS84();
        try {
            convertedCoordinates = convert(wgs84Value);
        } catch (error) {
            showError("Invalid WGS84 coordinates: " + error);
            return;
        }
        try {
            wgs84Instance.setDegrees(convertedCoordinates.decimalLatitude, convertedCoordinates.decimalLongitude);
            osgbInstance = wgs84Instance.getOSGB();
            osgbInputElement.value = osgbInstance.getGridRef(4);
        } catch (error) {
            showError("Conversion error: " + error);
            return;
        }
    } else if (osgbValue) {
        osgbInstance = new GT_OSGB();
        if (osgbInstance.parseGridRef(osgbValue)) {
            wgs84Instance = osgbInstance.getWGS84();
            wgs84InputElement.value = `${wgs84Instance.latitude}, ${wgs84Instance.longitude}`;
        } else {
            showError("Invalid OSGB coordinates");
            return;
        }
    }
}

async function copyToClipboard(inputElement: HTMLInputElement) {
    hideError();
    navigator.permissions.query({name: "clipboard-write" as PermissionName}).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(inputElement.value).then(() => {
                console.log("Text copied to clipboard");
            }, (err) => {
                showError("Failed to copy text: " + err);
            });
        }
    });

}

async function pasteFromClipboard(inputElement: HTMLInputElement) {
    hideError();
    navigator.clipboard.readText().then((text) => {
        inputElement.value = text;
    }).catch((err) => {
        showError("Failed to read clipboard contents: " + err);
    });
}


document.getElementById("convertRunner")?.addEventListener("click", convertCoordinates);
document.getElementById("wgs84Copy")?.addEventListener("click", () => copyToClipboard(wgs84InputElement));
document.getElementById("osgbCopy")?.addEventListener("click", () => copyToClipboard(osgbInputElement));
document.getElementById("wgs84Paste")?.addEventListener("click", () => pasteFromClipboard(wgs84InputElement));
document.getElementById("osgbPaste")?.addEventListener("click", () => pasteFromClipboard(osgbInputElement));
document.getElementById("wgs84Clear")?.addEventListener("click", () => wgs84InputElement.value = "");
document.getElementById("osgbClear")?.addEventListener("click", () => osgbInputElement.value = "");
