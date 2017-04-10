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
var UpFormGroup_1 = require("./UpFormGroup");
var UpSchemaArray_1 = require("./UpSchemaArray");
var UpSchemaObject_1 = require("./UpSchemaObject");
var ComponentRegistery_1 = require("./ComponentRegistery");
var JsonSchemaHelper_1 = require("../helper/JsonSchemaHelper");
var UpSchemaFormComponentSelector = (function (_super) {
    __extends(UpSchemaFormComponentSelector, _super);
    function UpSchemaFormComponentSelector(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.Component = {};
        _this.onElementChange = function (arg) {
            _this.props.onFormChange(arg, _this.props.node);
        };
        _this.onElementError = function () {
            _this.props.onFormError(_this.props.node);
        };
        _this.onElementChange = _this.onElementChange.bind(_this);
        _this.onElementError = _this.onElementError.bind(_this);
        return _this;
    }
    UpSchemaFormComponentSelector.prototype.Register = function (key, Component) {
        this.Component[key] = Component;
    };
    UpSchemaFormComponentSelector.prototype.GetComponent = function (ComponentKey) {
        return this.Component[ComponentKey];
    };
    UpSchemaFormComponentSelector.prototype.findGetParameter = function (parameterName) {
        var result = null, tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName)
                result = decodeURIComponent(tmp[1]);
        }
        return result;
    };
    UpSchemaFormComponentSelector.prototype.render = function () {
        var element = null;
        var isControl = true;
        var isArray = false;
        var parameters = this.props.node.split(".");
        if (parameters.length != 0) {
            var parameter = this.findGetParameter(parameters[parameters.length - 1]);
            if (parameter != null) {
                this.props.schema.default = parameter;
                this.props.schema.readonly = true;
            }
        }
        var type = JsonSchemaHelper_1.default.getBaseType(this.props.schema);
        switch (type) {
            case "object":
                element = React.createElement(UpSchemaObject_1.default, { withHR: this.props.node !== "", onFormError: this.props.onFormError, isRequired: this.props.isRequired, SchemaArg: this.props.schema, node: this.props.node, onFormChange: this.props.onFormChange });
                isControl = false;
                break;
            case "array":
                element = React.createElement(UpSchemaArray_1.default, { onError: this.onElementError, isRequired: this.props.isRequired, schema: this.props.schema, onChange: this.onElementChange, node: this.props.node });
                isArray = true;
                break;
            default:
                element = ComponentRegistery_1.default.GetComponentInstance(this.onElementError, this.onElementChange, this.props.isRequired, this.props.schema);
                break;
        }
        if (isControl) {
            var colsize = 6;
            return React.createElement(UpFormGroup_1.default, { colSize: isArray ? 12 : colsize, isRequired: this.props.isRequired, title: this.props.schema.title, description: this.props.schema.description }, element);
        }
        return element;
    };
    return UpSchemaFormComponentSelector;
}(React.Component));
exports.default = UpSchemaFormComponentSelector;
//# sourceMappingURL=UpSchemaFormComponentSelector.js.map