// Sorry, this is old code, never replicate or use this code in production.
// You should never use JQuery, this is just a simple conversion tool for WGS84 to OSGB and vice versa.
jQuery((function () {
    $("#convertRunner").on("click", (() => {
        let n;
        let a;
        let converted;
        if ("" !== $("#wgs84Inp").val()) n = new GT_WGS84, converted = convert($("#wgs84Inp").val()), n.setDegrees(converted.decimalLatitude, converted.decimalLongitude), a = n.getOSGB(), $("#osgbInp").val(a.getGridRef(4)); else if ("" !== $("#osgbInp").val()) {
            let e = $("#osgbInp").val();
            a = new GT_OSGB;
            if (a.parseGridRef(e)) {
                n = a.getWGS84();
                $("#wgs84Inp").val(`${n.latitude}, ${n.longitude}`)
            } else $("#wgs84Inp").val("NaN, NaN")
        }
    })), $("#wgs84Copy").on("click", (() => {
        navigator.clipboard.writeText($("#wgs84Inp").val()).then(_ => {
            console.log("WGS84 copied to clipboard")
        }).catch(e => {
            console.error("Failed to copy WGS84 to clipboard: ", e)
        })
    })), $("#osgbCopy").on("click", (() => {
        navigator.clipboard.writeText($("#osgbInp").val()).then(_ => {
            console.log("OSGB copied to clipboard")
        }).catch(e => {
            console.error("Failed to copy OSGB to clipboard: ", e)
        })
    })), $("#wgs84Paste").on("click", (() => {
        navigator.clipboard.readText().then((e => {
            $("#wgs84Inp").val(e)
        })).catch((e => {
            console.error("Failed to read clipboard contents: ", e)
        }))
    })), $("#osgbPaste").on("click", (() => {
        if (navigator.clipboard && window.isSecureContext) {
            // Modern Clipboard API
            navigator.clipboard.readText().then((text) => {
                $("#osgbInp").val(text);
            }).catch((err) => {
                console.error('Could not read from clipboard: ', err);
            });
        } else if (document.queryCommandSupported('paste')) {
            // Fallback for older browsers
            const pasteTarget = document.createElement('textarea');
            pasteTarget.style.opacity = '0';
            document.body.appendChild(pasteTarget);
            pasteTarget.focus();
            document.execCommand('paste');
            const pastedText = pasteTarget.value;
            document.body.removeChild(pasteTarget);
            $("#osgbInp").val(pastedText);
        } else {
            console.error('Clipboard operations not supported by this browser');
        }
    })), $("#wgs84Clear").on("click", (() => {
        $("#wgs84Inp").val("")
    })), $("#osgbClear").on("click", (() => {
        $("#osgbInp").val("")
    }))
}));