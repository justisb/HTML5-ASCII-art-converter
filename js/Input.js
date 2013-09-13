/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Input = (function () {
    var self = this,
        inputFieldId = "input-field",
        allowMimeTypes = [
            "image/jpg",
            "image/jpeg",
            "image/png"
        ],
        fileData = null,
        
        loadFile = function (file) {
            if (this.hasAllowMimeType(file.type) === false) {
                alert("File has deny mime type.");
                throw "File has deny mime type.";
            }

            var reader = new FileReader();
            reader.onload = function (data) {
                fileData = data.target.result;
            }
            reader.readAsDataURL(file);
        };


    return function () {
        this.getInputFieldId = function () {
            return inputFieldId;
        };

        this.setInputFieldId = function (id) {
            return inputFieldId = id;
        };

        this.getInputField = function () {
            return document.getElementById(this.getInputFieldId());
        };

        this.getAllowMimeTypes = function () {
            return allowMimeTypes;
        };

        this.hasAllowMimeType = function (mime) {
            return this.getAllowMimeTypes().indexOf(mime) > -1;
        };

        this.loadFromField = function (event) {
            loadFile(event.dataTransfer.files[0]);
        };

        this.getFileData = function() {
            return fileData;
        }
    }
})();