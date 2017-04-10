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
var UpSchemaFormComponentSelector_1 = require("./UpForm/UpSchemaFormComponentSelector");
var ErrorMemory_1 = require("./UpForm/ErrorMemory");
var MemoryHelper_1 = require("./helper/MemoryHelper");
var UpSchemaForm = (function (_super) {
    __extends(UpSchemaForm, _super);
    function UpSchemaForm(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.errorMemory = new ErrorMemory_1.default();
        _this.onFormError = function (node) {
            _this.errorMemory.errorOn(node);
            _this.props.onFormEror(true);
        };
        _this.onFormChange = function (newValue, node) {
            var nodeArray = node.split(".");
            nodeArray.shift();
            _this.setState(MemoryHelper_1.default.AssignValue(_this.state, nodeArray, newValue), function () {
                _this.errorMemory.cleanErrorOn(node);
                _this.updateState();
            });
        };
        return _this;
    }
    UpSchemaForm.prototype.componentDidMount = function () {
    };
    UpSchemaForm.prototype.render = function () {
        if (this.props.schema.type === undefined) {
            return (React.createElement("div", { className: "panel panel-default" },
                React.createElement("div", { className: "panel-heading" }),
                React.createElement("div", { className: "panel-body" }),
                React.createElement("div", { className: "panel-footer" }, this.props.children)));
        }
        return (React.createElement("div", { className: "panel panel-default" },
            React.createElement("div", { className: "panel-heading" }, this.props.schema.title),
            React.createElement("div", { className: "panel-body" },
                React.createElement(UpSchemaFormComponentSelector_1.default, { isRequired: false, schema: this.props.schema, node: "", onFormChange: this.onFormChange, onFormError: this.onFormError })),
            React.createElement("div", { className: "panel-footer" }, this.props.children)));
    };
    UpSchemaForm.prototype.updateState = function () {
        if (this.errorMemory.hasError) {
            this.props.onFormEror(true);
        }
        else {
            this.props.onFormPayload(this.state);
            this.props.onFormEror(false);
        }
    };
    UpSchemaForm.prototype.newObject = function (nodes, value) {
        var obj = {};
        var prop = nodes.shift();
        if (nodes.length == 0) {
            obj[prop] = value;
        }
        else {
            obj[prop] = this.newObject(nodes, value);
        }
        return obj;
    };
    return UpSchemaForm;
}(React.Component));
exports.default = UpSchemaForm;
//# sourceMappingURL=UpSchemaForm.js.map