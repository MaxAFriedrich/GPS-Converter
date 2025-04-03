!function (t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t(); else if ("function" == typeof define && define.amd) define([], t); else {
        ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).convert = t()
    }
}(function () {
    function t(t, e, i) {
        const a = Number(t);
        let d;
        d = i ? a >= 0 ? "N" : "S" : a >= 0 ? "E" : "W";
        const r = Math.abs(a), o = Math.floor(r), m = 60 * (r - o);
        if ("DM" == e) return `${o}\xb0 ${m.toFixed(3).replace(/\.0+$/, "")}' ${d}`;
        const n = Math.floor(m);
        return `${o}\xb0 ${n}' ${(60 * (m - n)).toFixed(1).replace(/\.0$/, "")}" ${d}`
    }

    var e = function (e) {
        if (!["DMS", "DM"].includes(e)) throw new Error("invalid format specified");
        if (this.decimalCoordinates && this.decimalCoordinates.trim()) {
            const i = this.decimalCoordinates.split(",").map(t => t.trim());
            return `${t(i[0], e, !0)}, ${t(i[1], e, !1)}`
        }
        throw new Error("no decimal coordinates to convert")
    }, i = {};

    function a(t, i) {
        i || (i = 5), t = t.replace(/\s\s+/g, " ").trim();
        var a = null, r = null, s = "", v = "", L = [], l = !1;
        if (m.test(t)) {
            if (!(l = d(L = m.exec(t)))) throw new Error("invalid decimal coordinate format");
            a = L[2], r = L[6], a.includes(",") && (a = a.replace(",", ".")), r.includes(",") && (r = r.replace(",", ".")), L[1] ? (s = L[1], v = L[5]) : L[4] && (s = L[4], v = L[8])
        } else if (n.test(t)) {
            if (!(l = d(L = n.exec(t)))) throw new Error("invalid DMS coordinates format");
            a = Math.abs(parseInt(L[2])), L[4] && (a += L[4] / 60), L[6] && (a += L[6] / 3600), parseInt(L[2]) < 0 && (a *= -1), r = Math.abs(parseInt(L[9])), L[11] && (r += L[11] / 60), L[13] && (r += L[13] / 3600), parseInt(L[9]) < 0 && (r *= -1), L[1] ? (s = L[1], v = L[8]) : L[7] && (s = L[7], v = L[14])
        } else if (u.test(t)) {
            if (!(l = d(L = u.exec(t)))) throw new Error("invalid DMS coordinates format");
            a = Math.abs(parseInt(L[2])), L[4] && (a += L[4] / 60, L[3] || (L[3] = " ")), L[6] && (a += L[6] / 3600, L[5] || (L[5] = " ")), parseInt(L[2]) < 0 && (a *= -1), r = Math.abs(parseInt(L[10])), L[12] && (r += L[12] / 60, L[11] || (L[11] = " ")), L[14] && (r += L[14] / 3600, L[13] || (L[13] = " ")), parseInt(L[10]) < 0 && (r *= -1), L[1] ? (s = L[1], v = L[9]) : L[8] && (s = L[8], v = L[16])
        } else if (b.test(t)) {
            if (!(l = d(L = b.exec(t)))) throw new Error("invalid coordinates format");
            a = Math.abs(parseInt(L[2])), L[4] && (a += L[4] / 60, L[3] || (L[3] = " ")), L[6] && (a += L[6] / 3600, L[5] || (L[5] = " ")), parseInt(L[2]) < 0 && (a *= -1), r = Math.abs(parseInt(L[10])), L[12] && (r += L[12] / 60, L[11] || (L[11] = " ")), L[14] && (r += L[14] / 3600, L[13] || (L[13] = " ")), parseInt(L[10]) < 0 && (r *= -1), L[1] ? (s = L[1], v = L[9]) : L[8] && (s = L[8], v = L[16])
        }
        if (Math.abs(r) >= 180) throw new Error("invalid longitude value");
        if (l) {
            var c = /S|SOUTH/i;
            c.test(s) && a > 0 && (a *= -1), (c = /W|WEST/i).test(v) && r > 0 && (r *= -1);
            var g, N, E = L[0].trim(), f = E.match(/[,/;\u0020]/g);
            if (null == f) {
                var S = Math.floor(t.length / 2);
                g = E.substring(0, S).trim(), N = E.substring(S).trim()
            } else {
                var W = 0;
                if (0 == (S = f.length % 2 == 1 ? Math.floor(f.length / 2) : f.length / 2 - 1)) W = E.indexOf(f[0]), g = E.substring(0, W).trim(), N = E.substring(W + 1).trim(); else {
                    for (var C = 0, h = 0; C <= S;) h = (W = E.indexOf(f[C], h)) + 1, C++;
                    g = E.substring(0, W).trim(), N = E.substring(W + 1).trim()
                }
            }
            return isNaN(a) && a.includes(",") && (a = a.replace(",", ".")), a = Number(Number(a).toFixed(i)), isNaN(r) && r.includes(",") && (r = r.replace(",", ".")), r = Number(Number(r).toFixed(i)), Object.freeze({
                verbatimCoordinates: E,
                verbatimLatitude: g,
                verbatimLongitude: N,
                decimalLatitude: a,
                decimalLongitude: r,
                decimalCoordinates: `${a},${r}`,
                closeEnough: o,
                toCoordinateFormat: e
            })
        }
        throw new Error("coordinates pattern match failed")
    }

    function d(t) {
        if (!isNaN(t[0])) return !1;
        var e = t.filter(t => t);
        if (e.shift(), e.length % 2 > 0) return !1;
        for (var i = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/, a = /[A-Za-z]+/, d = e.length / 2, r = !0, o = 0; o < d; o++) if (i.test(e[o]) != i.test(e[o + d]) || a.test(e[o]) != a.test(e[o + d])) {
            r = !1;
            break
        }
        return r
    }

    function r(t, e) {
        var i = Math.abs(t - e);
        return diff = Number(i.toFixed(6)), diff <= 1e-5
    }

    function o(t) {
        if (t.includes(",")) {
            var e = t.split(",");
            if (NaN == Number(e[0]) || NaN == Number(e[1])) throw new Error("coords are not valid decimals");
            return r(this.decimalLatitude, Number(e[0])) && r(this.decimalLongitude, e[1])
        }
        throw new Error("coords being tested must be separated by a comma")
    }

    var m = /(NORTH|SOUTH|[NS])?[\s]*([+-]?[0-8]?[0-9](?:[\.,]\d{3,}))([\u2022\xba\xb0]?)[\s]*(NORTH|SOUTH|[NS])?[\s]*[,/;]?[\s]*(EAST|WEST|[EW])?[\s]*([+-]?[0-1]?[0-9]?[0-9](?:[\.,]\d{3,}))([\u2022\xba\xb0]?)[\s]*(EAST|WEST|[EW])?/i,
        n = /(NORTH|SOUTH|[NS])?[\ \t]*([+-]?[0-8]?[0-9])[\ \t]*(\.)[\ \t]*([0-5]?[0-9])[\ \t]*(\.)?[\ \t]*((?:[0-5]?[0-9])(?:\.\d{1,3})?)?(NORTH|SOUTH|[NS])?(?:[\ \t]*[,/;][\ \t]*|[\ \t]*)(EAST|WEST|[EW])?[\ \t]*([+-]?[0-1]?[0-9]?[0-9])[\ \t]*(\.)[\ \t]*([0-5]?[0-9])[\ \t]*(\.)?[\ \t]*((?:[0-5]?[0-9])(?:\.\d{1,3})?)?(EAST|WEST|[EW])?/i,
        u = /(NORTH|SOUTH|[NS])?[\ \t]*([+-]?[0-8]?[0-9])[\ \t]*(D(?:EG)?(?:REES)?)[\ \t]*([0-5]?[0-9])[\ \t]*(M(?:IN)?(?:UTES)?)[\ \t]*((?:[0-5]?[0-9])(?:\.\d{1,3})?)?(S(?:EC)?(?:ONDS)?)?[\ \t]*(NORTH|SOUTH|[NS])?(?:[\ \t]*[,/;][\ \t]*|[\ \t]*)(EAST|WEST|[EW])?[\ \t]*([+-]?[0-1]?[0-9]?[0-9])[\ \t]*(D(?:EG)?(?:REES)?)[\ \t]*([0-5]?[0-9])[\ \t]*(M(?:IN)?(?:UTES)?)[\ \t]*((?:[0-5]?[0-9])(?:\.\d{1,3})?)?(S(?:EC)?(?:ONDS)?)[\ \t]*(EAST|WEST|[EW])?/i,
        b = /(NORTH|SOUTH|[NS])?[\ \t]*([+-]?[0-8]?[0-9])[\ \t]*([\u2022\xba\xb0\.:]|D(?:EG)?(?:REES)?)?[\ \t]*,?([0-5]?[0-9](?:\.\d{1,})?)?[\ \t]*(['\u2032\xb4\u2019\.:]|M(?:IN)?(?:UTES)?)?[\ \t]*,?((?:[0-5]?[0-9])(?:\.\d{1,3})?)?[\ \t]*(''|\u2032\u2032|\u2019\u2019|\xb4\xb4|["\u2033\u201d\.])?[\ \t]*(NORTH|SOUTH|[NS])?(?:\s*[,/;]\s*|\s*)(EAST|WEST|[EW])?[\ \t]*([+-]?[0-1]?[0-9]?[0-9])[\ \t]*([\u2022\xba\xb0\.:]|D(?:EG)?(?:REES)?)?[\ \t]*,?([0-5]?[0-9](?:\.\d{1,})?)?[\ \t]*(['\u2032\xb4\u2019\.:]|M(?:IN)?(?:UTES)?)?[\ \t]*,?((?:[0-5]?[0-9])(?:\.\d{1,3})?)?[\ \t]*(''|\u2032\u2032|\xb4\xb4|\u2019\u2019|["\u2033\u201d\.])?[\ \t]*(EAST|WEST|[EW])?/i;
    const s = Object.freeze({DMS: "DMS", DM: "DM"});
    a.to = s, i = a;
    var v = {decimalLatitude: 40.123, decimalLongitude: -74.123};
    var L, l = (L = [], [{
        verbatimCoordinates: "40.123, -74.123",
        verbatimLatitude: "40.123",
        verbatimLongitude: "-74.123"
    }, {
        verbatimCoordinates: "40.123\xb0 N 74.123\xb0 W",
        verbatimLatitude: "40.123\xb0 N",
        verbatimLongitude: "74.123\xb0 W"
    }, {
        verbatimCoordinates: "40.123\xb0 N 74.123\xb0 W",
        verbatimLatitude: "40.123\xb0 N",
        verbatimLongitude: "74.123\xb0 W"
    }, {
        verbatimCoordinates: '40\xb0 7\xb4 22.8" N 74\xb0 7\xb4 22.8" W',
        verbatimLatitude: '40\xb0 7\xb4 22.8" N',
        verbatimLongitude: '74\xb0 7\xb4 22.8" W'
    }, {
        verbatimCoordinates: "40\xb0 7.38\u2019 , -74\xb0 7.38\u2019",
        verbatimLatitude: "40\xb0 7.38\u2019",
        verbatimLongitude: "-74\xb0 7.38\u2019"
    }, {
        verbatimCoordinates: "N40\xb07\u201922.8\u2019\u2019, W74\xb07\u201922.8\u2019\u2019",
        verbatimLatitude: "N40\xb07\u201922.8\u2019\u2019",
        verbatimLongitude: "W74\xb07\u201922.8\u2019\u2019"
    }, {
        verbatimCoordinates: '40\xb07\u201922.8"N, 74\xb07\u201922.8"W',
        verbatimLatitude: '40\xb07\u201922.8"N',
        verbatimLongitude: '74\xb07\u201922.8"W'
    }, {
        verbatimCoordinates: "40\xb07'22.8\"N, 74\xb07'22.8\"W",
        verbatimLatitude: "40\xb07'22.8\"N",
        verbatimLongitude: "74\xb07'22.8\"W"
    }, {
        verbatimCoordinates: "40 7 22.8, -74 7 22.8",
        verbatimLatitude: "40 7 22.8",
        verbatimLongitude: "-74 7 22.8"
    }, {
        verbatimCoordinates: "40.123 -74.123",
        verbatimLatitude: "40.123",
        verbatimLongitude: "-74.123"
    }, {
        verbatimCoordinates: "40.123\xb0,-74.123\xb0",
        verbatimLatitude: "40.123\xb0",
        verbatimLongitude: "-74.123\xb0"
    }, {
        verbatimCoordinates: "40.123N74.123W",
        verbatimLatitude: "40.123N",
        verbatimLongitude: "74.123W"
    }, {
        verbatimCoordinates: "4007.38N7407.38W",
        verbatimLatitude: "4007.38N",
        verbatimLongitude: "7407.38W"
    }, {
        verbatimCoordinates: '40\xb07\u201922.8"N, 74\xb07\u201922.8"W',
        verbatimLatitude: '40\xb07\u201922.8"N',
        verbatimLongitude: '74\xb07\u201922.8"W'
    }, {
        verbatimCoordinates: "400722.8N740722.8W",
        verbatimLatitude: "400722.8N",
        verbatimLongitude: "740722.8W"
    }, {
        verbatimCoordinates: "N 40 7.38 W 74 7.38",
        verbatimLatitude: "N 40 7.38",
        verbatimLongitude: "W 74 7.38"
    }, {
        verbatimCoordinates: "40:7:22.8N 74:7:22.8W",
        verbatimLatitude: "40:7:22.8N",
        verbatimLongitude: "74:7:22.8W"
    }, {
        verbatimCoordinates: "40:7:23N,74:7:23W",
        verbatimLatitude: "40:7:23N",
        verbatimLongitude: "74:7:23W",
        decimalLatitude: 40.1230555555,
        decimalLongitude: -74.1230555555
    }, {
        verbatimCoordinates: '40\xb07\u201923"N 74\xb07\u201923"W',
        verbatimLatitude: '40\xb07\u201923"N',
        verbatimLongitude: '74\xb07\u201923"W',
        decimalLatitude: 40.1230555555,
        decimalLongitude: -74.12305555555555
    }, {
        verbatimCoordinates: '40\xb07\u201923" -74\xb07\u201923"',
        verbatimLatitude: '40\xb07\u201923"',
        verbatimLongitude: '-74\xb07\u201923"',
        decimalLatitude: 40.1230555555,
        decimalLongitude: -74.123055555
    }, {
        verbatimCoordinates: '40d 7\u2019 23" N 74d 7\u2019 23" W',
        verbatimLatitude: '40d 7\u2019 23" N',
        verbatimLongitude: '74d 7\u2019 23" W',
        decimalLatitude: 40.1230555555,
        decimalLongitude: -74.123055555
    }, {
        verbatimCoordinates: "40.123N 74.123W",
        verbatimLatitude: "40.123N",
        verbatimLongitude: "74.123W"
    }, {
        verbatimCoordinates: "40\xb0 7.38, -74\xb0 7.38",
        verbatimLatitude: "40\xb0 7.38",
        verbatimLongitude: "-74\xb0 7.38"
    }, {
        verbatimCoordinates: "40\xb0 7.38, -74\xb0 7.38",
        verbatimLatitude: "40\xb0 7.38",
        verbatimLongitude: "-74\xb0 7.38"
    }, {
        verbatimCoordinates: "40 7 22.8; -74 7 22.8",
        verbatimLatitude: "40 7 22.8",
        verbatimLongitude: "-74 7 22.8"
    }].forEach(t => {
        t.decimalLatitude ? L.push(t) : L.push({...t, ...v})
    }), [...L, {
        verbatimCoordinates: "50\xb04'17.698\"south, 14\xb024'2.826\"east",
        verbatimLatitude: "50\xb04'17.698\"south",
        verbatimLongitude: "14\xb024'2.826\"east",
        decimalLatitude: -50.07158277777778,
        decimalLongitude: 14.400785
    }, {
        verbatimCoordinates: "50d4m17.698S 14d24m2.826E",
        verbatimLatitude: "50d4m17.698S",
        verbatimLongitude: "14d24m2.826E",
        decimalLatitude: -50.07158277777778,
        decimalLongitude: 14.400785
    }, {
        verbatimCoordinates: "40:26:46N,79:56:55W",
        verbatimLatitude: "40:26:46N",
        verbatimLongitude: "79:56:55W",
        decimalLatitude: 40.44611111111111,
        decimalLongitude: -79.9486111111111
    }, {
        verbatimCoordinates: "40:26:46.302N 79:56:55.903W",
        verbatimLatitude: "40:26:46.302N",
        verbatimLongitude: "79:56:55.903W",
        decimalLatitude: 40.446195,
        decimalLongitude: -79.94886194444445
    }, {
        verbatimCoordinates: "40\xb026\u203247\u2033N 79\xb058\u203236\u2033W",
        verbatimLatitude: "40\xb026\u203247\u2033N",
        verbatimLongitude: "79\xb058\u203236\u2033W",
        decimalLatitude: 40.44638888888889,
        decimalLongitude: -79.97666666666667
    }, {
        verbatimCoordinates: "40d 26\u2032 47\u2033 N 79d 58\u2032 36\u2033 W",
        verbatimLatitude: "40d 26\u2032 47\u2033 N",
        verbatimLongitude: "79d 58\u2032 36\u2033 W",
        decimalLatitude: 40.44638888888889,
        decimalLongitude: -79.97666666666667
    }, {
        verbatimCoordinates: "40.446195N 79.948862W",
        verbatimLatitude: "40.446195N",
        verbatimLongitude: "79.948862W",
        decimalLatitude: 40.446195,
        decimalLongitude: -79.948862
    }, {
        verbatimCoordinates: "40,446195\xb0 79,948862\xb0",
        verbatimLatitude: "40,446195\xb0",
        verbatimLongitude: "79,948862\xb0",
        decimalLatitude: 40.446195,
        decimalLongitude: 79.948862
    }, {
        verbatimCoordinates: "40\xb0 26.7717, -79\xb0 56.93172",
        verbatimLatitude: "40\xb0 26.7717",
        verbatimLongitude: "-79\xb0 56.93172",
        decimalLatitude: 40.446195,
        decimalLongitude: -79.948862
    }, {
        verbatimCoordinates: "40.446195, -79.948862",
        verbatimLatitude: "40.446195",
        verbatimLongitude: "-79.948862",
        decimalLatitude: 40.446195,
        decimalLongitude: -79.948862
    }, {
        verbatimCoordinates: "40.123256; -74.123256",
        verbatimLatitude: "40.123256",
        verbatimLongitude: "-74.123256",
        decimalLatitude: 40.123256,
        decimalLongitude: -74.123256
    }, {
        verbatimCoordinates: "18.24S 22.45E",
        verbatimLatitude: "18.24S",
        verbatimLongitude: "22.45E",
        decimalLatitude: -18.4,
        decimalLongitude: 22.75
    }, {
        verbatimCoordinates: "27deg 15min 45.2sec S 18deg 32min 53.7sec E",
        verbatimLatitude: "27deg 15min 45.2sec S",
        verbatimLongitude: "18deg 32min 53.7sec E",
        decimalLatitude: -27.262555555555554,
        decimalLongitude: 18.54825
    }, {
        verbatimCoordinates: "-23.3245\xb0 S / 28.2344\xb0 E",
        verbatimLatitude: "-23.3245\xb0 S",
        verbatimLongitude: "28.2344\xb0 E",
        decimalLatitude: -23.3245,
        decimalLongitude: 28.2344
    }, {
        verbatimCoordinates: "40\xb0 26.7717 -79\xb0 56.93172",
        verbatimLatitude: "40\xb0 26.7717",
        verbatimLongitude: "-79\xb0 56.93172",
        decimalLatitude: 40.446195,
        decimalLongitude: -79.948862
    }, {
        verbatimCoordinates: "27.15.45S 18.32.53E",
        verbatimLatitude: "27.15.45S",
        verbatimLongitude: "18.32.53E",
        decimalLatitude: -27.2625,
        decimalLongitude: 18.548055
    }, {
        verbatimCoordinates: "27,71372\xb0 S 23,07771\xb0 E",
        verbatimLatitude: "27,71372\xb0 S",
        verbatimLongitude: "23,07771\xb0 E",
        decimalLatitude: -27.71372,
        decimalLongitude: 23.07771
    }, {
        verbatimCoordinates: "N 52d0m0s E 000d0m0s",
        verbatimLatitude: "N 52d0m0s",
        verbatimLongitude: "E 000d0m0s",
        decimalLatitude: 52,
        decimalLongitude: 0
    }, {
        verbatimCoordinates: "N49 0.000 E02 33.314",
        verbatimLatitude: "N49 0.000",
        verbatimLongitude: "E02 33.314",
        decimalLatitude: 49,
        decimalLongitude: 2.5552333333333332
    }]).map(t => t.verbatimCoordinates);
    return i.formats = l, i
});
