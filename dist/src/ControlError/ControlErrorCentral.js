"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ControlErrorCentral = (function () {
    function ControlErrorCentral() {
        this.ErrorControl = [];
    }
    ControlErrorCentral.prototype.addControl = function (control) {
        this.ErrorControl.push(control);
    };
    ControlErrorCentral.prototype.isValidValue = function (value) {
        var newValue = value;
        for (var i = 0; i < this.ErrorControl.length; i++) {
            var result = this.ErrorControl[i].isValidValue(value);
            if (result.hasError) {
                return result;
            }
            else if (result.correctValue !== undefined) {
                newValue = result.correctValue;
            }
        }
        return { hasError: false, errorMessage: null, correctValue: newValue };
    };
    return ControlErrorCentral;
}());
exports.default = ControlErrorCentral;
//# sourceMappingURL=ControlErrorCentral.js.map