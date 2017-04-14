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
var TypeStringControl_1 = require("../ControlError/TypeStringControl");
var react_controls_1 = require("@up-group/react-controls");
var UpString = (function (_super) {
    __extends(UpString, _super);
    function UpString(p, c) {
        var _this = _super.call(this, p, c) || this;
        var pattern = new RegExp(_this.props.schema.pattern);
        var patternErrorMessage = _this.props.schema.patternErrorMessage;
        if (_this.props.schema.format !== undefined) {
            switch (_this.props.schema.format) {
                case "email":
                    pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    patternErrorMessage = "Doit être mail";
                    break;
                case "phone":
                    pattern = /^(0)[1-9]([\s]?[0-9]{2}){4}$/;
                    patternErrorMessage = "Doit être un N° de telephone";
                    break;
                default:
            }
        }
        _this._ControlErrorCentral.addControl(new TypeStringControl_1.default(pattern, patternErrorMessage));
        return _this;
    }
    UpString.prototype.setInput = function (data) {
        if (this.inputElement) {
            this.inputElement.value = data;
        }
    };
    UpString.prototype.renderField = function () {
        var _this = this;
        if (this.props.schema.format === "multilineText") {
            return React.createElement(react_controls_1.UpInput, { type: "text", onChange: this.handleChangeEventGlobal, hasError: this.state.hasError });
        }
        return React.createElement("input", { ref: function (input) { _this.inputElement = input; }, style: this.state.hasError === true ? { borderColor: "red" } : null, type: "text", className: "form-control", onChange: this.handleChangeJsEventGlobal });
    };
    UpString.prototype.handleChangeJsEvent = function (event) {
        return event.target.value;
    };
    UpString.prototype.isEmpty = function (value) {
        return value === null || value === undefined || value === "";
    };
    UpString.prototype._componentDidMount = function () {
    };
    return UpString;
}(UpFormControl_1.UpFormControl));
exports.default = UpString;
//# sourceMappingURL=UpString.js.map