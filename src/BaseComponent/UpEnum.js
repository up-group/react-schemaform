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
var up_react_controls_1 = require("@up-group/up-react-controls");
var UpEnum = (function (_super) {
    __extends(UpEnum, _super);
    function UpEnum(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpEnum.prototype._componentDidMount = function () {
    };
    UpEnum.prototype.setInput = function (data) {
    };
    UpEnum.prototype.renderField = function () {
        var options = [];
        for (var i = 0; i < this.schema.enum.length; i++) {
            if (this.schema.enum[i] == null) {
                options.push({ id: this.schema.enum[i], text: "null Value" });
            }
            else {
                options.push({ id: this.schema.enum[i], text: this.schema.enumDescriptions[i] });
            }
        }
        return React.createElement(up_react_control_1.UpSelect2, { default: this.schema.default, isNullable: this.isNullable, isRequired: this.props.isRequired, getFullData: false, minimumInputLength: 0, placeholder: "Recherche", multiple: this.isArray, allowClear: !this.props.isRequired, onError: this.props.onError, onChange: this.handleChangeJsEventGlobal, data: options });
    };
    Object.defineProperty(UpEnum.prototype, "schema", {
        get: function () {
            return this.props.schema.items || this.props.schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpEnum.prototype, "isArray", {
        get: function () {
            return this.props.schema.type.indexOf("array") !== -1;
        },
        enumerable: true,
        configurable: true
    });
    UpEnum.prototype.handleChangeJsEvent = function (value) {
        return value;
    };
    UpEnum.prototype.isEmpty = function (value) {
        if (this.isArray && value != null && value.length === 0) {
            return true;
        }
        return value === null || value === undefined || value === "";
    };
    return UpEnum;
}(UpFormControl_1.UpFormControl));
exports.default = UpEnum;
//# sourceMappingURL=UpEnum.js.map