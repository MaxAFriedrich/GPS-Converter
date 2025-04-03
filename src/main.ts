import './main.css'
// @ts-ignore
import {GT_OSGB, GT_WGS84} from './geotools.js'
import { convert } from 'geo-coordinates-parser'

const wgs84InputElement = (document.getElementById("wgs84Inp") ?? document.createElement("input")) as HTMLInputElement;
const osgbInputElement = (document.getElementById("osgbInp") ?? document.createElement("input")) as HTMLInputElement;

function convertCoordinates() {
    const wgs84Value = wgs84InputElement.value.trim();
    const osgbValue = osgbInputElement.value.trim();
    let wgs84Instance, osgbInstance, convertedCoordinates;

    if (wgs84Value) {
        wgs84Instance = new GT_WGS84();
        convertedCoordinates = convert(wgs84Value);
        wgs84Instance.setDegrees(convertedCoordinates.decimalLatitude, convertedCoordinates.decimalLongitude);
        osgbInstance = wgs84Instance.getOSGB();
        osgbInputElement.value = osgbInstance.getGridRef(4);
    } else if (osgbValue) {
        osgbInstance = new GT_OSGB();
        if (osgbInstance.parseGridRef(osgbValue)) {
            wgs84Instance = osgbInstance.getWGS84();
            wgs84InputElement.value = `${wgs84Instance.latitude}, ${wgs84Instance.longitude}`;
        } else {
            wgs84InputElement.value = "NaN, NaN";
        }
    }
}

function copyToClipboard(inputElement: HTMLInputElement) {
    navigator.clipboard.writeText(inputElement.value)
        .then(() => console.log(`${inputElement.id} copied to clipboard`))
        .catch(error => console.error(`Failed to copy ${inputElement.id} to clipboard: `, error));
}

function pasteFromClipboard(inputElement: HTMLInputElement) {
    navigator.clipboard.readText()
        .then(text => inputElement.value = text)
        .catch(error => console.error("Failed to read clipboard contents: ", error));
}

document.getElementById("convertRunner")?.addEventListener("click", convertCoordinates);
document.getElementById("wgs84Copy")?.addEventListener("click", () => copyToClipboard(wgs84InputElement));
document.getElementById("osgbCopy")?.addEventListener("click", () => copyToClipboard(osgbInputElement));
document.getElementById("wgs84Paste")?.addEventListener("click", () => pasteFromClipboard(wgs84InputElement));
document.getElementById("osgbPaste")?.addEventListener("click", () => pasteFromClipboard(osgbInputElement));
document.getElementById("wgs84Clear")?.addEventListener("click", () => wgs84InputElement.value = "");
document.getElementById("osgbClear")?.addEventListener("click", () => osgbInputElement.value = "");
