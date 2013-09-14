/**
 * @author Pikaev Viktor <HaruAtari@gmail.com> https://github.com/HaruAtari
 */
var Input = function () {
    var self = this;

    // Id поля выбора исходного файла.
    var inputFieldId = "input-field";

    // Список допустимых расширений.
    var allowMimeTypes = [
        "image/jpg",
        "image/jpeg",
        "image/png"
    ];

    // Загруженный файл в bas64 кодировке
    var fileData = null;

    // Сохраняет содержимое выбранного файла в переменную fileData.
    // {file} - Загруженный файл. @see this.loadFromField()
    // {callback} - Функция, которая будет вызвана после завершения загрузки.
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

    // Загружает файл из поля выбора файла.
    this.loadFromField = function (event, callback) {
        loadFile(event.target.files[0], callback);
    };

    // Возвращает Id поля выбора файла.
    this.getInputFieldId = function () {
        return inputFieldId;
    };

    // Устанавливает Id поля выбора файла.
    this.setInputFieldId = function (id) {
        return inputFieldId = id;
    };

    // Возвращает поле выбора файла.
    this.getInputField = function () {
        return document.getElementById(self.getInputFieldId());
    };

    // Возвращает список допустимых расширений.
    this.getAllowMimeTypes = function () {
        return allowMimeTypes;
    };

    // Проверяет, допустимо ли указанное расширение.
    this.hasAllowMimeType = function (mime) {
        return self.getAllowMimeTypes().indexOf(mime) > -1;
    };

    // Возвращает содержимое загруденного файла.
    this.getFileData = function () {
        return fileData;
    };
};