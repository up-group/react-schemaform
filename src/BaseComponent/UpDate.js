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
var UpDateComp = (function (_super) {
    __extends(UpDateComp, _super);
    function UpDateComp(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this._ControlErrorCentral.addControl(new TypeDateControl_1.TypeDateControl(TypeDateControl_1.dateFormat.date));
        return _this;
    }
    UpDateComp.prototype.setInput = function (data) {
    };
    UpDateComp.prototype._componentDidMount = function () {
    };
    UpDateComp.prototype.renderField = function () {
        return React.createElement(up_react_control_1.UpDate, { onChange: this.handleChangeEventGlobal, hasError: this.state.hasError, isNullable: this.isNullable });
    };
    UpDateComp.prototype.handleChangeJsEvent = function (event) {
        return event;
    };
    UpDateComp.prototype.isEmpty = function (value) {
        return value === null || value === undefined || value === "";
    };
    return UpDateComp;
}(UpFormControl_1.UpFormControl));
exports.default = UpDateComp;
//# sourceMappingURL=UpDate.js.map