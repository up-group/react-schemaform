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
var ComponentRegistery_1 = require("./ComponentRegistery");
var JsonSchemaHelper_1 = require("../helper/JsonSchemaHelper");
var UpSchemaObject_1 = require("./UpSchemaObject");
var ErrorMemory_1 = require("./ErrorMemory");
var UpSchemaArray = (function (_super) {
    __extends(UpSchemaArray, _super);
    function UpSchemaArray(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.componentDidMount = function () {
            _this.AddElement();
        };
        _this.AddElement = function () {
            var items = _this.state.items;
            items.push(new item(_this.onItemChange, _this.onItemError));
            _this.setState({ items: items });
        };
        _this.RemoveElement = function () {
            var items = _this.state.items;
            var item = items.pop();
            _this.setState({ items: items }, _this.onItemChange);
        };
        _this.onItemChange = function () {
            var data = [];
            for (var i = 0; i < _this.state.items.length; i++) {
                if (_this.state.items[i].error === true) {
                    return;
                }
                data.push(_this.state.items[i].value);
            }
            _this.props.onChange(data);
        };
        _this.onItemError = function () {
            _this.props.onError();
        };
        _this.state = { items: [] };
        return _this;
    }
    UpSchemaArray.prototype.render = function () {
        var _this = this;
        var schema = this.props.schema.items;
        var comp = ComponentRegistery_1.default.GetComponentBySchema(schema);
        if (comp != null && comp.array === true) {
            return ComponentRegistery_1.default.GetComponentInstanceByKey(comp.key, this.props.onError, this.props.onChange, this.props.isRequired, this.props.schema);
        }
        var items = this.state.items.map(function (value, index, array) {
            var type = JsonSchemaHelper_1.default.getBaseType(schema);
            var element = null;
            switch (type) {
                case "object":
                    element = React.createElement(UpSchemaObject_1.default, { withHR: index !== 0, onFormError: value.onError, isRequired: _this.props.isRequired, SchemaArg: schema, node: "", onFormChange: value.onChange });
                    break;
                default:
                    element = ComponentRegistery_1.default.GetComponentInstance(value.onError, value.onChange, _this.props.isRequired, schema);
                    break;
            }
            return React.createElement("div", { key: index }, element);
        });
        return React.createElement("div", { style: {
                "borderRadius": "4px",
                "padding": "5px",
                "border": "1px solid #f4f4f4"
            } },
            items,
            React.createElement("br", null),
            React.createElement("span", { className: "btn-group" },
                React.createElement("button", { className: "btn btn-default", onClick: this.AddElement },
                    React.createElement("span", { className: "glyphicon glyphicon-plus" })),
                React.createElement("button", { className: "btn btn-default", disabled: this.state.items.length <= 0, onClick: this.RemoveElement },
                    React.createElement("span", { className: "glyphicon glyphicon-minus" }))));
    };
    return UpSchemaArray;
}(React.Component));
exports.default = UpSchemaArray;
var item = (function () {
    function item(onItemChange, onItemError) {
        var _this = this;
        this.onItemChange = onItemChange;
        this.onItemError = onItemError;
        this.value = null;
        this.errorMemory = new ErrorMemory_1.default();
        this.error = false;
        this.onChange = function (arg, t) {
            if (t !== undefined) {
                if (_this.value === null) {
                    _this.value = {};
                }
                _this.errorMemory.cleanErrorOn(t);
                _this.value[t.split(".")[1]] = arg;
                if (_this.errorMemory.hasError === false) {
                    _this.onItemChange();
                }
            }
            else {
                _this.error = false;
                _this.value = arg;
                _this.onItemChange();
            }
        };
        this.onError = function (node) {
            if (node === undefined) {
                _this.error = true;
            }
            else {
                _this.errorMemory.errorOn(node);
            }
            _this.onItemError();
        };
    }
    return item;
}());
//# sourceMappingURL=UpSchemaArray.js.map