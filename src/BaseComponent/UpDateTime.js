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
var TypeDateControl_1 = require("../ControlError/TypeDateControl");
var up_react_controls_1 = require("@up-group/up-react-controls");
var UpDateTimeComp = (function (_super) {
    __extends(UpDateTimeComp, _super);
    function UpDateTimeComp(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this._ControlErrorCentral.addControl(new TypeDateControl_1.TypeDateControl(TypeDateControl_1.dateFormat.dateTime));
        return _this;
    }
    UpDateTimeComp.prototype.setInput = function (data) {
    };
    UpDateTimeComp.prototype._componentDidMount = function () {
    };
    UpDateTimeComp.prototype.renderField = function () {
        return React.createElement(up_react_control_1.UpDateTime, { onChange: this.handleChangeEventGlobal, hasError: this.state.hasError, isNullable: this.isNullable });
    };
    UpDateTimeComp.prototype.handleChangeJsEvent = function (event) {
        return event;
    };
    UpDateTimeComp.prototype.isEmpty = function (value) {
        return value === null || value === undefined || value === "";
    };
    return UpDateTimeComp;
}(UpFormControl_1.UpFormControl));
exports.default = UpDateTimeComp;
//# sourceMappingURL=UpDateTime.js.map