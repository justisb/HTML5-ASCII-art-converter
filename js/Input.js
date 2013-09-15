/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Input = function () {
    var self = this;

    /**
     * @type {string} id поля выбора файла.
     */
    var inputFieldId = "input-field";
    this.getInputFieldId = function () { return inputFieldId; };
    this.setInputFieldId = function (id) { return inputFieldId = id; };

    /**
     * @type {DOM-object} поля выбора файла.
     */
    var inputField = null;
    this.getInputField = function () { return document.getElementById(self.getInputFieldId()); };

    /**
     * @type {string} id изображения предпросмотра.
     */
    var previewImageId = "image-preview";
    this.getPreviewImageId = function () { return previewImageId; };
    this.setPreviewImageId = function (id) { return previewImageId = id; };

    /**
     * @type {DOM-object} изображение предпросмотра.
     */
    var previewImage = null;
    this.getPreviewImage = function () {
        if (previewImage === null) {
            previewImage = document.getElementById(self.getPreviewImageId());
        }
        if (previewImage === null) {
            previewImage = document.createElement("image");
            previewImage.id = self.getPreviewImageId();
        }
        return previewImage;
    };
    this.setPreviewImageSrc = function(src) { return self.getPreviewImage().src = src; }
    this.getPreviewImageWidth = function() { return self.getPreviewImage().width; };
    this.getPreviewImageHeight = function() { return self.getPreviewImage().height; };

    /**
     * @type {Array} cписок допустимых расширений.
     */
    var allowMimeTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];
    this.getAllowMimeTypes = function () { return allowMimeTypes; };
    this.hasAllowMimeType = function (mime) { return self.getAllowMimeTypes().indexOf(mime) > -1; };

    /**
     * @type {string} содержимое загруженного изображения в base64.
     */
    var fileData = null;
    this.getFileData = function () { return fileData; };

    /**
     * Сохраняет содержимое указанного файла в self::fileData.
     * @param file Исходное изображение.
     * @param callback Callback-функция. Запускается по окончанию загрузки.
     */
    var loadFile = function (file, callback) {
        if (self.hasAllowMimeType(file.type) === false) {
            alert("File has deny mime type.");
            throw "File has deny mime type.";
        }

        var reader = new FileReader();
        reader.onload = function (data) {
            fileData = data.target.result;
            if (typeof callback === "function") {
                callback();
            }
        }
        reader.readAsDataURL(file);
    };

    /**
     * Загрузка изображения из поля выбора файла.
     * @param event Событие change.
     * @param callback Callback-функция. Запускается по окончанию загрузки.
     */
    this.loadFromField = function (event, callback) {
        loadFile(event.target.files[0], callback);
    };
};