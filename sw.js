const cName="GPS Converter",cFiles=["backspace_FILL0_wght400_GRAD0_opsz48.svg","geocoordsparser.js","geotools-min.js","roboto.ttf","content_copy_FILL0_wght400_GRAD0_opsz48.svg","index.html","main.css","content_paste_FILL0_wght400_GRAD0_opsz48.svg","jquery-3.6.0.min.js","main.js"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(cName).then((e=>e.addAll(cFiles))).catch((e=>{})))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))}));