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
var UpDisplayDate_1 = require("./UpDisplayDate");
var UpSchemaDisplayArray_1 = require("./UpSchemaDisplayArray");
var UpSchemaDisplaySelector = (function (_super) {
    __extends(UpSchemaDisplaySelector, _super);
    function UpSchemaDisplaySelector(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpSchemaDisplaySelector.prototype.render = function () {
        var _this = this;
        if (this.props.schema.hide === true) {
            return React.createElement("span", null);
        }
        var type = function (t) {
            if (typeof (t) === "string") {
                return t;
            }
            else if (t.indexOf("null") != -1) {
                return t[0];
            }
        }(this.props.schema.type);
        switch (this.props.schema.format) {
            case "multilineText":
                return React.createElement("span", { style: { "whiteSpace": "pre" } }, this.props.data);
            case "imageUrl":
                return React.createElement("img", { src: this.props.data, alt: "test" });
            case "uri":
                return React.createElement("a", { target: "_top", href: this.props.data }, this.props.schema.description);
            case "phone":
                if (this.props.data == null || this.props.data.length < 10) {
                    return React.createElement("span", null, this.props.data);
                }
                var phone = this.props.data.replace(/[^0-9|+]/g, "");
                var phoneSplit = phone[0] !== "+" ? phone.match(/.{1,2}/g) : phone.match(/(\+33.)|.{1,2}/g);
                var cleanPhone = phoneSplit.join(" ");
                return React.createElement("span", null, cleanPhone);
            case "date":
                return React.createElement(UpDisplayDate_1.default, { date: this.props.data, format: this.props.schema.format });
            case "date-time":
                return React.createElement(UpDisplayDate_1.default, { date: this.props.data, format: this.props.schema.format });
            case "time":
                if (this.props.data != null && this.props.data.length == 5) {
                    return React.createElement("span", null, this.props.data);
                }
                return React.createElement(UpDisplayDate_1.default, { date: this.props.data, format: this.props.schema.format });
            case "entityKey":
                break;
            case "enum":
                return React.createElement("span", null, this.props.schema.enumDescriptions[this.props.schema.enum.indexOf(this.props.data)]);
        }
        switch (type) {
            case "object":
                return React.createElement(UpObject, { schema: this.props.schema, data: this.props.data });
            case "string":
                return React.createElement("span", { style: { whiteSpace: "pre" } }, this.props.data);
            case "number":
                return React.createElement("span", null, this.props.data);
            case "integer":
                return React.createElement("span", null, this.props.data);
            case "boolean":
                return React.createElement("span", null, this.props.data == null ? "" : this.props.data == true ? "Oui" : "Non");
            case "array":
                return React.createElement(UpSchemaDisplayArray_1.default, { ref: function (arg) { _this.UpSchemaDisplayArrayRef = arg; }, data: this.props.data, schema: this.props.schema });
        }
        return React.createElement("span", null);
    };
    return UpSchemaDisplaySelector;
}(React.Component));
exports.default = UpSchemaDisplaySelector;
var UpObject = (function (_super) {
    __extends(UpObject, _super);
    function UpObject(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpObject.prototype.render = function () {
        var elements = [];
        var properties = [];
        var propertiesName = [];
        for (var index in this.props.schema.properties) {
            if (this.props.schema.properties.hasOwnProperty(index)) {
                var schema = this.props.schema.properties[index];
                elements.push(React.createElement("div", { key: index, className: "col-md-6" },
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement("strong", null,
                            schema.title,
                            ": ")),
                    React.createElement("div", { className: "col-md-6" },
                        React.createElement(UpSchemaDisplaySelector, { data: this.props.data[index], schema: schema }))));
            }
        }
        return React.createElement("div", { className: "panel panel-default" },
            React.createElement("div", { className: "panel-heading" }, this.props.schema.title),
            React.createElement("div", { className: "panel-body" }, elements));
    };
    return UpObject;
}(React.Component));
//# sourceMappingURL=UpSchemaDisplaySelector.js.map