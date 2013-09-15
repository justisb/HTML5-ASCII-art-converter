/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Converter = function () {
    var self = this;

    /**
     * @type {string} id канвы.
     */
    var canvasId = "canvas-work";
    this.getCanvasId = function() { return canvasId; };
    this.setCanvasId = function(id) { return canvasId = id; };

    /**
     * @type {DOM-object} канва.
     */
    var canvas = null;
    var getCanvas = function() {
        if (canvas === null) {
            canvas = document.getElementById(self.getCanvasId());
        }
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.id = self.getCanvasId();
        }
        return canvas;
    };
    var getCanvasContext = function() { return getCanvas().getContext("2d"); };
    var getCanvasWidth = function() { return getCanvas().width; };
    var setCanvasWidth = function(width) {return getCanvas().width = width; };
    var getCanvasHeight = function() { return getCanvas().height; };
    var setCanvasHeight = function(height) { return getCanvas().height = height; };

    /**
     * @type {Array} Описание канвы. Содержит список пикселей.
     */
    var canvasSourceData = [];
    var getCanvasSourceData = function() {
        if (canvasSourceData.length === 0) {
            canvasSourceData = getCanvasContext().getImageData(0, 0, getCanvasWidth(), getCanvasHeight()).data;
        }
        return canvasSourceData;
    };

    /**
     * @type {string} фоновый цвет изображения.
     */
    var backgroundColor = "rgb(0,0,0)";
    var getBackgroundColor = function() { return backgroundColor; };

    /**
     * @type {number} размер шрифта.
     */
    var fontSize = 7;
    var getFontSize = function() { return fontSize + "px"; };
    var getFontFamily = function() { return "lucida console"; };

    /**
     * @type {Array} размер символа.
     */
    var letterSize = [];
    var getLetterSize = function() {
        if (letterSize.length === 0) {
            countLetterSize();
        }
        return letterSize;
    };
    var countLetterSize = function() {
        var block = document.createElement("span");
        block.innerHTML = "@";
        block.style.fontSize = getFontSize();
        block.style.fontFamily = getFontFamily();
        document.body.appendChild(block);
        letterSize = [block.offsetWidth, Math.floor(block.offsetHeight*0.8)];
        document.body.removeChild(block);
    };

    /**
     * Переводит цвет из rgb в cmyk.
     */
    this.rgbToCmyk = function (sourceColor) {
        var r = sourceColor[0] / 255,
            g = sourceColor[1] / 255,
            b = sourceColor[2] / 255,

            k = 1 - Math.max(r, g, b),
            c = (1 - r - k) / (1 - k),
            m = (1 - g - k) / (1 - k),
            y = (1 - b - k) / (1 - k);
        return [c, m, y, k];
    };

    /**
     * Переводит цвет из cmyk в rgb.
     */
    this.cmykToRgb = function (sourceColor) {
        var c = sourceColor[0],
            m = sourceColor[1],
            y = sourceColor[2],
            k = sourceColor[3];
        return [
            Math.round(255 * (1 - c) * (1 - k)),
            Math.round(255 * (1 - m) * (1 - k)),
            Math.round(255 * (1 - y) * (1 - k))
        ];
    };

    this.convert = function() {
        getLetterSize(); // Необходима прединициализация.
        setCanvasWidth(input.getPreviewImageWidth());
        setCanvasHeight(input.getPreviewImageHeight());
        getCanvasContext().drawImage(input.getPreviewImage(), 0, 0);
        drawLetters(getLettersList());
    };

    var drawLetters = function(lettersList) {
        getCanvasContext().clearRect(0, 0, getCanvasWidth(), getCanvasHeight());
        getCanvasContext().fillStyle =  getBackgroundColor();
        getCanvasContext().fillRect(0, 0, getCanvasWidth(), getCanvasHeight());

        for (var i = 0; i < lettersList.length; i++) {
            var letter = lettersList[i];
            getCanvasContext().fillStyle = "rgba(" + letter[3] +", " + letter[4] + ", " + letter[5] + ", " + letter[6] + ")";
            getCanvasContext().font = getFontSize() + " " + getFontFamily();
            getCanvasContext().fillText(letter[2], letter[0], letter[1]);
        }
    }

    /**
     * Возвращает список символов для отрисовки нового изображения.
     * @returns {Array} Список символов. Каждый символ представлен массивом:
     * [
     *      [0] => x,
     *      [1] => y,
     *      [2] => Буква,
     *      [3] => r,
     *      [4] => g,
     *      [5] => b,
     *      [6] => a
     * ]
     */
    var getLettersList = function() {
        var res = [];
        for (var x = 0; x < getCanvasWidth(); x += getLetterSize()[0]) {
            for (var y = 0; y < getCanvasHeight(); y += getLetterSize()[1]) {
                var letter = getLetterForPolygon(getPolygonByXY(x, y));
                res.push([x, y]
                    .concat(letter.letter)
                    .concat(letter.r)
                    .concat(letter.g)
                    .concat(letter.b)
                    .concat(letter.a)
                );
            }
        }
        return res;
    };

    /**
     * Возвращает символ, соответствующий указанному полигону.
     * @param polygon Полигон для которого подбирается символ.
     * @returns {letter: string, r: number, g: number, b: number, a: number}
     */
    var getLetterForPolygon = function(polygon) {
        var color = polygon[0][0];
        return {
            letter: "#",
            r: color[0],
            g: color[1],
            b: color[2],
            a: 255
        };
    };

    /**
     * Возвращает описание области изображения размером с символ.
     * @param x Верхний-левый угол.
     * @param y Верхний-левый угол.
     * @returns {Array} Массис пикселей. Каждый пиксель представлен как [r,g,b,a]
     */
    var getPolygonByXY = function(x, y) {
        var res = [];
        for (var i = 0; i < getLetterSize()[0]; i++) {
            var line = []
            for (var j = 0; j < getLetterSize()[1]; j++) {
               line.push(getPixelByXY(i + x, j + y));
            }
            res.push(line);
        }
        return res;
    };

    /**
     * Возвращает описание пикселя по указанным координатам.
     * @param x
     * @param y
     * @returns {Array} [r,g,b,a]
     */
    var getPixelByXY = function(x, y) {
        var offset = ((getCanvasWidth() * y) + x) * 4;
        return [
            getCanvasSourceData()[offset + 0],
            getCanvasSourceData()[offset + 1],
            getCanvasSourceData()[offset + 2],
            getCanvasSourceData()[offset + 3]
        ];
    };
};