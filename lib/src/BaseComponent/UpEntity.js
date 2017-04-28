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
var UpEntity = (function (_super) {
    __extends(UpEntity, _super);
    function UpEntity(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpEntity.prototype.renderField = function () {
        return React.createElement(react_controls_1.UpSelect, { default: null, isNullable: this.isNullable, isRequired: this.props.isRequired, multiple: this.isArray, placeholder: "Recherche", allowClear: !this.props.isRequired, onChange: this.handleChangeEventGlobal, dataSource: this.schema.entitySource, onError: function () { } });
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