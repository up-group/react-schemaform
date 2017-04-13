"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var UpSchemaFormComponentSelector_1 = require("./UpSchemaFormComponentSelector");
var UpSchemaObject = (function (_super) {
    __extends(UpSchemaObject, _super);
    function UpSchemaObject(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpSchemaObject.prototype.render = function () {
        var _this = this;
        var properties = [];
        var propertiesName = [];
        for (var index in this.props.SchemaArg.properties) {
            if (this.props.SchemaArg.properties.hasOwnProperty(index)) {
                properties.push(this.props.SchemaArg.properties[index]);
                propertiesName.push(index);
            }
        }
        var elements = properties.map(function (property, index) {
            return (React.createElement(UpSchemaFormComponentSelector_1.default, { isRequired: _this.isRequired(propertiesName[index]), key: index, schema: property, node: _this.props.node + '.' + propertiesName[index], onFormChange: _this.props.onFormChange, onFormError: _this.props.onFormError }));
        });
        return React.createElement("div", { className: "col-md-12" },
            this.props.withHR ? React.createElement("hr", null) : null,
            this.props.SchemaArg.title == null || this.props.node === "" ? "" : React.createElement("h4", null, this.props.SchemaArg.title),
            React.createElement("div", { className: "row" }, elements));
    };
    UpSchemaObject.prototype.isRequired = function (prop) {
        var required = false;
        if (this.props.SchemaArg.required != undefined) {
            required = this.props.SchemaArg.required.indexOf(prop) !== -1;
        }
        if (required === false) {
            required = this.props.SchemaArg.properties[prop].type.indexOf("null") === -1 && this.props.SchemaArg.properties[prop].default != null;
        }
        return required;
    };
    return UpSchemaObject;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UpSchemaObject;
//# sourceMappingURL=UpSchemaObject.js.map