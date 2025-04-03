import './main.css'
// @ts-ignore
import {GT_OSGB, GT_WGS84} from './geotools.js'
import {convert} from 'geo-coordinates-parser'

const inputWrapper = document.getElementById("inputWrapper") as HTMLDivElement;
const inputField = document.getElementById("input") as HTMLInputElement;
const pasteButton = document.getElementById("pasteButton") as HTMLButtonElement;
const convertButton = document.getElementById("convertButton") as HTMLButtonElement;
const outputWrapper = document.getElementById("outputWrapper") as HTMLDivElement;
const outputLinks = document.getElementById("outputLinks") as HTMLDivElement;
const rawOutput = document.getElementById("output") as HTMLPreElement;
const copyButton = document.getElementById("copyButton") as HTMLButtonElement;
const resetButton = document.getElementById("resetButton") as HTMLButtonElement;
const copyDiv = document.getElementById("copyDiv") as HTMLDivElement;
const errorDiv = document.getElementById("errorDiv") as HTMLDivElement;

function hideError() {
    errorDiv.style.display = "none";
    errorDiv.textContent = "";
}

function showError(message: string) {
    errorDiv.style.display = "block";
    errorDiv.textContent = message;
}

class Output {
    constructor(public lat: number, public lon: number, public raw: string) {
    }
}

class MapUrls {
    public google: string;
    public waze: string;
    public bing: string;
    public osm: string;

    constructor(lat: string, lon: string) {
        this.google = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        this.waze = `https://waze.com/ul?ll=${lat},${lon}&navigate=yes`;
        this.bing = `https://www.bing.com/maps?q=${lat},${lon}`;
        this.osm = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}`;
    }

    public getAllUrls(): string {
        return `
            <a href="${this.google}" target="_blank">Google Maps</a>
            <a href="${this.waze}" target="_blank">Waze</a>
            <a href="${this.bing}" target="_blank">Bing Maps</a>
            <a href="${this.osm}" target="_blank">OpenStreetMap</a>
        `;
    }
}

function convertCoordinates(input: string): Output | undefined {
    hideError();
    input = input.trim();
    if (input.length === 0) {
        return;
    }
    const output = new Output(0,0 , input);
    let convertedCoordinates;
    try {
        convertedCoordinates = convert(input);
        if (convertedCoordinates === undefined) {
            throw new Error("Invalid coordinates");
        }
        output.lat = convertedCoordinates.decimalLatitude;
        output.lon = convertedCoordinates.decimalLongitude;
        const wgs84Instance = new GT_WGS84();
        wgs84Instance.setDegrees(output.lat, output.lon);
        const osgbInstance = wgs84Instance.getOSGB();
        output.raw = osgbInstance.getGridRef(4);
        return output;
    } catch (error) {
        console.log(error);
    }
    const osgbInstance = new GT_OSGB();
    if (osgbInstance.parseGridRef(input)) {
        const wgs84Instance = osgbInstance.getWGS84();
        output.lat = wgs84Instance.latitude;
        output.lon = wgs84Instance.longitude;
        output.raw = `${wgs84Instance.latitude}, ${wgs84Instance.longitude}`;
        return output;
    } else {
        showError("Invalid coordinates or grid reference.");
        return;
    }
}


async function copyToClipboard() {
    hideError();
    navigator.permissions.query({name: "clipboard-write" as PermissionName}).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            navigator.clipboard.writeText(rawOutput.innerText).then(() => {
                copyDiv.style.display = "block";
                setTimeout(() => {
                    copyDiv.style.display = "none";
                }, 2000);
            }, (err) => {
                showError("Failed to copy text: " + err);
            });
        }
    });

}

async function pasteFromClipboard() {
    hideError();
    navigator.clipboard.readText().then((text) => {
        inputField.value = text;
        run();
    }).catch((err) => {
        showError("Failed to read clipboard contents: " + err);
    });
}

function reset() {
    hideError();
    inputField.value = "";
    rawOutput.textContent = "";
    outputLinks.innerHTML = "";
    inputWrapper.style.display = "block";
    outputWrapper.style.display = "none";
    copyDiv.style.display = "none";
}


function run(){
    hideError();
    const input = inputField.value;
    const converted = convertCoordinates(input);
    if (converted) {
        rawOutput.textContent = converted.raw;
        const mapUrls = new MapUrls(converted.lat.toString(), converted.lon.toString());
        outputLinks.innerHTML = mapUrls.getAllUrls();
        inputWrapper.style.display = "none";
        outputWrapper.style.display = "block";
    }
}

// Event listeners

pasteButton.addEventListener("click", pasteFromClipboard);
convertButton.addEventListener("click", run);
copyButton.addEventListener("click", copyToClipboard);
resetButton.addEventListener("click", reset);
