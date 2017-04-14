"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TypeNullControl = (function () {
    function TypeNullControl(isRequierd, isNullable, defaultValue, control) {
        this._isNullable = isNullable;
        this._isRequierd = isRequierd;
        this.defaultValue = defaultValue;
        this._control = control;
    }
    TypeNullControl.prototype.isValidValue = function (value) {
        if (this._isRequierd && this._control.isEmpty(value)) {
            return { hasError: true, errorMessage: "Doit avoir une valeur" };
        }
        return { hasError: false };
    };
    return TypeNullControl;
}());
exports.default = TypeNullControl;
//# sourceMappingURL=TypeNullControl.js.map