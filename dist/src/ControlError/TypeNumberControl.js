"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeNumberControl = (function () {
    function TypeNumberControl(isInteger, minValue, maxValue) {
        this._isInteger = isInteger;
        this._minValue = minValue;
        this._maxValue = maxValue;
    }
    TypeNumberControl.prototype.isValidValue = function (value) {
        if (value === "" || value === null) {
            return { hasError: false, correctValue: null };
        }
        var nbValue = Number(value);
        if (isNaN(nbValue)) {
            return { hasError: true, errorMessage: "Doit être un nombre" };
        }
        else if (this._isInteger && nbValue % 1 !== 0) {
            return { hasError: true, errorMessage: "Doit être un entier" };
        }
        else if (this._minValue && this._minValue > nbValue) {
            return { hasError: true, errorMessage: "Doit être plus grand que '" + this._minValue + "'" };
        }
        else if (this._maxValue && this._maxValue < nbValue) {
            return { hasError: true, errorMessage: "Doit être plus petit que '" + this._maxValue + "'" };
        }
        return { hasError: false, correctValue: nbValue };
    };
    return TypeNumberControl;
}());
exports.default = TypeNumberControl;
//# sourceMappingURL=TypeNumberControl.js.map