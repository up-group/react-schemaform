"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dateFormat;
(function (dateFormat) {
    dateFormat[dateFormat["dateTime"] = 0] = "dateTime";
    dateFormat[dateFormat["date"] = 1] = "date";
})(dateFormat = exports.dateFormat || (exports.dateFormat = {}));
var TypeDateControl = (function () {
    function TypeDateControl(dateFormat) {
        this.dateFormat = dateFormat;
    }
    TypeDateControl.prototype.isValidValue = function (value) {
        if (value === "" || value === null) {
            return { hasError: false, correctValue: null };
        }
        var valueDate = value;
        if (typeof (value) === "string") {
            valueDate = new Date(value);
        }
        if (this.dateFormat === dateFormat.date) {
            valueDate = new Date(valueDate.getFullYear(), valueDate.getMonth(), valueDate.getDate(), 0, 0, 0, 0);
        }
        return { hasError: false, correctValue: valueDate };
    };
    return TypeDateControl;
}());
exports.TypeDateControl = TypeDateControl;
//# sourceMappingURL=TypeDateControl.js.map