/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
 var Output = (function() {
    var self = this,
        sourceImageId = 'image-source',
        resultImageId = 'image-result';

    return function() {
        this.getSourceImageId = function() { return sourceImageId; };
        this.setSourceImageId = function(id) { return sourceImageId = id; };

        this.getResultImageId = function() { return resultImageId; };
        this.setResultImageId = function(id) { return resultImageId = id; };

        this.getSourceImage = function() { return document.getElementById(this.getSourceImageId()); };

        this.getResultImage = function() { return document.getElementById(this.getResultImageId()); };

        this.setSourceImageSrc = function(src) { return this.getSourceImage().src = src; }

        this.setResultImageSrc = function(src) { return this.getResultImage().src = src; }
    };
})();