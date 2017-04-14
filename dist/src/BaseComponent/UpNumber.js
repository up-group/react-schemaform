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
var react_controls_1 = require("@up-group/react-controls");
var UpNumberComp = (function (_super) {
    __extends(UpNumberComp, _super);
    function UpNumberComp(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.test = function (a, b) {
            debugger;
        };
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
        _this._ControlErrorCentral.addControl(new TypeNumberControl_1.default(false, _this.props.schema.minimum, _this.props.schema.maximum));
        return _this;
    }
    UpNumberComp.prototype.setInput = function (data) {
    };
    UpNumberComp.prototype._componentDidMount = function () {
    };
    UpNumberComp.prototype.renderField = function () {
        return React.createElement(react_controls_1.UpNumber, { onChange: this.test, max: this.props.schema.maximum, min: this.props.schema.minimum });
    };
    UpNumberComp.prototype.handleChangeJsEvent = function (event) {
        return event;
    };
    UpNumberComp.prototype.isEmpty = function (value) {
        return value === null || value === "";
    };
    return UpNumberComp;
}(UpFormControl_1.UpFormControl));
exports.default = UpNumberComp;
//# sourceMappingURL=UpNumber.js.map