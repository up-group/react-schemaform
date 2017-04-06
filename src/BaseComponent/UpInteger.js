"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var UpFormControl_1 = require("../UpForm/UpFormControl");
var TypeNumberControl_1 = require("../ControlError/TypeNumberControl");
var UpInteger = (function (_super) {
    __extends(UpInteger, _super);
    function UpInteger(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.onKeyDown = function (e) {
            if (e.keyCode == 38) {
                var newValue = Number(e.target.value) + 1;
                _this.inputElement.value = newValue.toString();
                _this.handleChangeEventGlobal(newValue);
            }
            else if (e.keyCode == 40) {
                var newValue = Number(e.target.value) - 1;
                _this.inputElement.value = (newValue).toString();
                _this.handleChangeEventGlobal(newValue);
            }
        };
        _this._ControlErrorCentral.addControl(new TypeNumberControl_1.default(true, _this.props.schema.minimum, _this.props.schema.maximum));
        return _this;
    }
    UpInteger.prototype.setInput = function (data) {
        this.inputElement.value = data;
    };
    UpInteger.prototype._componentDidMount = function () {
    };
    UpInteger.prototype.renderField = function () {
        var _this = this;
        return React.createElement("input", { readOnly: this.props.schema.readonly === true, ref: function (input) { _this.inputElement = input; }, style: this.state.hasError === true ? { borderColor: "red" } : null, type: "text", className: "form-control", onKeyDown: this.onKeyDown, onChange: this.handleChangeJsEventGlobal });
    };
    UpInteger.prototype.handleChangeJsEvent = function (event) {
        return event.target.value;
    };
    UpInteger.prototype.isEmpty = function (value) {
        return value === null || value === undefined || value === "";
    };
    return UpInteger;
}(UpFormControl_1.UpFormControl));
exports.default = UpInteger;
//# sourceMappingURL=UpInteger.js.map