/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Converter = function () {
    var self = this;

    this.rgbToCmyk = function (R, G, B) {
        var r = R / 255,
            g = G / 255,
            b = B / 255,
            k = 1 - Math.max(r, g, b),
            c = (1 - r - k) / (1 - k),
            m = (1 - g - k) / (1 - k),
            y = (1 - b - k) / (1 - k);
        return {c: c, m: m, y: y, k: k};
    };

    this.cmykToRgb = function (C, M, Y, K) {
        return {
            r: Math.round(255 * (1 - C) * (1 - K)),
            g: Math.round(255 * (1 - M) * (1 - K)),
            b: Math.round(255 * (1 - Y) * (1 - K))
        };
    };
};