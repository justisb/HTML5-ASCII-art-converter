/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Input = function () {
    var self = this,
        inputFieldId = "input-field",
        allowMimeTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ],
        fileData = null,

        loadFile = function (file, callback) {
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

    this.loadFromField = function (event, callback) {
        loadFile(event.target.files[0], callback);
    };

    this.getInputFieldId = function () {
        return inputFieldId;
    };
    this.setInputFieldId = function (id) {
        return inputFieldId = id;
    };

    this.getInputField = function () {
        return document.getElementById(self.getInputFieldId());
    };

    this.getAllowMimeTypes = function () {
        return allowMimeTypes;
    };

    this.hasAllowMimeType = function (mime) {
        return self.getAllowMimeTypes().indexOf(mime) > -1;
    };

    this.getFileData = function () {
        return fileData;
    }
};