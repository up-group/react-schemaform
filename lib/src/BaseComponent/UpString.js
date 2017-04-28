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
var react_controls_1 = require("@up-group/react-controls");
var UpString = (function (_super) {
    __extends(UpString, _super);
    function UpString(p, c) {
        var _this = _super.call(this, p, c) || this;
        var pattern = new RegExp(_this.props.schema.pattern);
        var patternErrorMessage = _this.props.schema.patternErrorMessage;
        return _this;
    }
    UpString.prototype.renderField = function () {
        var _this = this;
        switch (this.props.schema.format) {
            case "email":
                return React.createElement(react_controls_1.UpEmail, { ref: function (i) { _this.InputBaseControl = i; }, onChange: this.handleChangeEventGlobal });
            case "phone":
                return React.createElement(react_controls_1.UpPhone, { ref: function (i) { _this.InputBaseControl = i; }, onChange: this.handleChangeEventGlobal });
            case "multilineText":
                return React.createElement(react_controls_1.UpText, { ref: function (i) { _this.InputBaseControl = i; }, value: this.state.value, onChange: this.handleChangeEventGlobal });
            default:
                return React.createElement(react_controls_1.UpInput, { ref: function (i) { _this.InputBaseControl = i; }, value: this.state.value, onChange: this.handleChangeEventGlobal });
        }
    };
    return UpString;
}(UpFormControl_1.UpFormControl));
exports.default = UpString;
//# sourceMappingURL=UpString.js.map