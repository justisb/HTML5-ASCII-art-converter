/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Output = function () {
    var self = this,
        sourceImageId = 'image-source',
        resultImageId = 'image-result';

    this.getSourceImageId = function () {
        return sourceImageId;
    };
    this.setSourceImageId = function (id) {
        return sourceImageId = id;
    };

    this.getResultImageId = function () {
        return resultImageId;
    };
    this.setResultImageId = function (id) {
        return resultImageId = id;
    };

    this.getSourceImage = function () {
        return document.getElementById(self.getSourceImageId());
    };

    this.getResultImage = function () {
        return document.getElementById(self.getResultImageId());
    };

    this.setSourceImageSrc = function (src) {
        return self.getSourceImage().src = src;
    }

    this.setResultImageSrc = function (src) {
        return self.getResultImage().src = src;
    }

};