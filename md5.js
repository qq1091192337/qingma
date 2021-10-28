function r(r, n) {
    return r << n | r >>> 32 - n;
}

function n(r, n) {
    var t, o, e, u, f;
    return e = 2147483648 & r, u = 2147483648 & n, f = (1073741823 & r) + (1073741823 & n),
    (t = 1073741824 & r) & (o = 1073741824 & n) ? 2147483648 ^ f ^ e ^ u : t | o ? 1073741824 & f ? 3221225472 ^ f ^ e ^ u : 1073741824 ^ f ^ e ^ u : f ^ e ^ u;
}

function t(t, o, e, u, f, i, a) {
    return t = n(t, n(n(function(r, n, t) {
        return r & n | ~r & t;
    }(o, e, u), f), a)), n(r(t, i), o);
}

function o(t, o, e, u, f, i, a) {
    return t = n(t, n(n(function(r, n, t) {
        return r & t | n & ~t;
    }(o, e, u), f), a)), n(r(t, i), o);
}

function e(t, o, e, u, f, i, a) {
    return t = n(t, n(n(function(r, n, t) {
        return r ^ n ^ t;
    }(o, e, u), f), a)), n(r(t, i), o);
}

function u(t, o, e, u, f, i, a) {
    return t = n(t, n(n(function(r, n, t) {
        return n ^ (r | ~t);
    }(o, e, u), f), a)), n(r(t, i), o);
}

function f(r) {
    var n, t = "", o = "";
    for (n = 0; n <= 3; n++) t += (o = "0" + (r >>> 8 * n & 255).toString(16)).substr(o.length - 2, 2);
    return t;
}

function md5(r) {
        var i, a, c, C, h, g, d, m, S, s = Array();
        for (s = function(r) {
            var n, t = r.length, o = t + 8, e = 16 * ((o - o % 64) / 64 + 1), u = Array(e - 1), f = 0, i = 0;
            for (;i < t; ) f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | r.charCodeAt(i) << f,
            i++;
            return f = i % 4 * 8, u[n = (i - i % 4) / 4] = u[n] | 128 << f, u[e - 2] = t << 3,
            u[e - 1] = t >>> 29, u;
        }(r = function(r) {
            for (var n = "", t = 0; t < r.length; t++) {
                var o = r.charCodeAt(t);
                o < 128 ? n += String.fromCharCode(o) : o > 127 && o < 2048 ? (n += String.fromCharCode(o >> 6 | 192),
                n += String.fromCharCode(63 & o | 128)) : (n += String.fromCharCode(o >> 12 | 224),
                n += String.fromCharCode(o >> 6 & 63 | 128), n += String.fromCharCode(63 & o | 128));
            }
            return n;
        }(r)), g = 1732584193, d = 4023233417, m = 2562383102, S = 271733878, i = 0; i < s.length; i += 16) a = g,
        c = d, C = m, h = S, g = t(g, d, m, S, s[i + 0], 7, 3614090360), S = t(S, g, d, m, s[i + 1], 12, 3905402710),
        m = t(m, S, g, d, s[i + 2], 17, 606105819), d = t(d, m, S, g, s[i + 3], 22, 3250441966),
        g = t(g, d, m, S, s[i + 4], 7, 4118548399), S = t(S, g, d, m, s[i + 5], 12, 1200080426),
        m = t(m, S, g, d, s[i + 6], 17, 2821735955), d = t(d, m, S, g, s[i + 7], 22, 4249261313),
        g = t(g, d, m, S, s[i + 8], 7, 1770035416), S = t(S, g, d, m, s[i + 9], 12, 2336552879),
        m = t(m, S, g, d, s[i + 10], 17, 4294925233), d = t(d, m, S, g, s[i + 11], 22, 2304563134),
        g = t(g, d, m, S, s[i + 12], 7, 1804603682), S = t(S, g, d, m, s[i + 13], 12, 4254626195),
        m = t(m, S, g, d, s[i + 14], 17, 2792965006), g = o(g, d = t(d, m, S, g, s[i + 15], 22, 1236535329), m, S, s[i + 1], 5, 4129170786),
        S = o(S, g, d, m, s[i + 6], 9, 3225465664), m = o(m, S, g, d, s[i + 11], 14, 643717713),
        d = o(d, m, S, g, s[i + 0], 20, 3921069994), g = o(g, d, m, S, s[i + 5], 5, 3593408605),
        S = o(S, g, d, m, s[i + 10], 9, 38016083), m = o(m, S, g, d, s[i + 15], 14, 3634488961),
        d = o(d, m, S, g, s[i + 4], 20, 3889429448), g = o(g, d, m, S, s[i + 9], 5, 568446438),
        S = o(S, g, d, m, s[i + 14], 9, 3275163606), m = o(m, S, g, d, s[i + 3], 14, 4107603335),
        d = o(d, m, S, g, s[i + 8], 20, 1163531501), g = o(g, d, m, S, s[i + 13], 5, 2850285829),
        S = o(S, g, d, m, s[i + 2], 9, 4243563512), m = o(m, S, g, d, s[i + 7], 14, 1735328473),
        g = e(g, d = o(d, m, S, g, s[i + 12], 20, 2368359562), m, S, s[i + 5], 4, 4294588738),
        S = e(S, g, d, m, s[i + 8], 11, 2272392833), m = e(m, S, g, d, s[i + 11], 16, 1839030562),
        d = e(d, m, S, g, s[i + 14], 23, 4259657740), g = e(g, d, m, S, s[i + 1], 4, 2763975236),
        S = e(S, g, d, m, s[i + 4], 11, 1272893353), m = e(m, S, g, d, s[i + 7], 16, 4139469664),
        d = e(d, m, S, g, s[i + 10], 23, 3200236656), g = e(g, d, m, S, s[i + 13], 4, 681279174),
        S = e(S, g, d, m, s[i + 0], 11, 3936430074), m = e(m, S, g, d, s[i + 3], 16, 3572445317),
        d = e(d, m, S, g, s[i + 6], 23, 76029189), g = e(g, d, m, S, s[i + 9], 4, 3654602809),
        S = e(S, g, d, m, s[i + 12], 11, 3873151461), m = e(m, S, g, d, s[i + 15], 16, 530742520),
        g = u(g, d = e(d, m, S, g, s[i + 2], 23, 3299628645), m, S, s[i + 0], 6, 4096336452),
        S = u(S, g, d, m, s[i + 7], 10, 1126891415), m = u(m, S, g, d, s[i + 14], 15, 2878612391),
        d = u(d, m, S, g, s[i + 5], 21, 4237533241), g = u(g, d, m, S, s[i + 12], 6, 1700485571),
        S = u(S, g, d, m, s[i + 3], 10, 2399980690), m = u(m, S, g, d, s[i + 10], 15, 4293915773),
        d = u(d, m, S, g, s[i + 1], 21, 2240044497), g = u(g, d, m, S, s[i + 8], 6, 1873313359),
        S = u(S, g, d, m, s[i + 15], 10, 4264355552), m = u(m, S, g, d, s[i + 6], 15, 2734768916),
        d = u(d, m, S, g, s[i + 13], 21, 1309151649), g = u(g, d, m, S, s[i + 4], 6, 4149444226),
        S = u(S, g, d, m, s[i + 11], 10, 3174756917), m = u(m, S, g, d, s[i + 2], 15, 718787259),
        d = u(d, m, S, g, s[i + 9], 21, 3951481745), g = n(g, a), d = n(d, c), m = n(m, C),
        S = n(S, h);
        return (f(g) + f(d) + f(m) + f(S)).toUpperCase();
    }