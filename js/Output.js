/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Output = function () {
    var self = this;

    // Id исходного изображения.
    var sourceImageId = 'image-source';

    // Id результирующего изображения.
    var resultImageId = 'image-result';

    // Возвращает Id исходного изображения.
    this.getSourceImageId = function () {
        return sourceImageId;
    };

    // Установливает Id исходного изображения.
    this.setSourceImageId = function (id) {
        return sourceImageId = id;
    };

    // Возвращает Id результирующего изображения.
    this.getResultImageId = function () {
        return resultImageId;
    };

    // Устанавливает Id исходного изображения.
    this.setResultImageId = function (id) {
        return resultImageId = id;
    };

    // Возвращает исходное изображение.
    this.getSourceImage = function () {
        return document.getElementById(self.getSourceImageId());
    };

    // Возвращает результирующее изображение.
    this.getResultImage = function () {
        return document.getElementById(self.getResultImageId());
    };

    // Устанавливает src-аттрибут исходного изображения.
    this.setSourceImageSrc = function (src) {
        return self.getSourceImage().src = src;
    };

    // Устанавливает src-аттрибут результирующего изображения.
    this.setResultImageSrc = function (src) {
        return self.getResultImage().src = src;
    };
};