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
var UpBoolean = (function (_super) {
    __extends(UpBoolean, _super);
    function UpBoolean(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpBoolean.prototype.setInput = function (data) {
    };
    UpBoolean.prototype._componentDidMount = function () {
        this.setState({
            value: this.props.schema.default
        });
    };
    UpBoolean.prototype.renderField = function () {
        return React.createElement(react_controls_1.UpSwitch, { isNullable: this.isNullable, onChange: this.handleChangeEventGlobal, default: true });
    };
    UpBoolean.prototype.isEmpty = function () {
        return false;
    };
    UpBoolean.prototype.handleChangeJsEvent = function (event) {
        return event;
    };
    UpBoolean.prototype.handleChangeData = function (args) {
        return {
            hasError: false,
            errorMessage: null,
            correctValue: args
        };
    };
    return UpBoolean;
}(UpFormControl_1.UpFormControl));
exports.default = UpBoolean;
//# sourceMappingURL=UpBoolean.js.map