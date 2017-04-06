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
var up_react_control_1 = require("up-react-control");
var UpEntity = (function (_super) {
    __extends(UpEntity, _super);
    function UpEntity(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpEntity.prototype._componentDidMount = function () {
    };
    UpEntity.prototype.setInput = function (data) {
    };
    UpEntity.prototype.renderField = function () {
        var _this = this;
        return React.createElement(up_react_control_1.UpSelect2, { ref: function (input) { _this.UpSelect = input; }, default: null, isNuallble: this.isNuallble, isRequired: this.props.isRequired, getFullData: false, multiple: this.isArray, placeholder: "Recherche", allowClear: !this.props.isRequired, onChange: this.handleChangeJsEventGlobal, onError: this.props.onError, dataSource: this.schema.entitySource });
    };
    UpEntity.prototype.handleChangeJsEvent = function (args) {
        return args;
    };
    UpEntity.prototype.isEmpty = function (value) {
        if (this.isArray && value != null && value.length === 0) {
            return true;
        }
        return value === null || value === undefined || value === "" || value === "00000000-0000-0000-0000-000000000000";
    };
    Object.defineProperty(UpEntity.prototype, "schema", {
        get: function () {
            return this.props.schema.items || this.props.schema;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UpEntity.prototype, "isArray", {
        get: function () {
            return this.props.schema.type.indexOf("array") !== -1;
        },
        enumerable: true,
        configurable: true
    });
    return UpEntity;
}(UpFormControl_1.UpFormControl));
exports.default = UpEntity;
//# sourceMappingURL=UpEntity.js.map