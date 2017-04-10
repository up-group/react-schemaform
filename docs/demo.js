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
var ReactDOM = require("react-dom");
var UpSchemaForm_1 = require("../src/UpSchemaForm");
var Demo = (function (_super) {
    __extends(Demo, _super);
    function Demo(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.onSchemaChange = function (e) {
            _this.setState({ schema: JSON.parse(e.target.value) });
        };
        _this.onFormPayload = function (e) {
            _this.setState({ result: JSON.stringify(e) });
        };
        _this.selectChange = function (e) {
            _this.setState({ schema: JSON.parse(e.target.value) });
        };
        _this.state = { result: "", schema: {} };
        return _this;
    }
    Demo.prototype.render = function () {
        var schemas = [
            {
                data: {
                    "title": "test",
                    "type": "object",
                    "properties": {
                        "number": { "type": "number" },
                        "integer": { "type": "integer" },
                        "boolean": { "type": "boolean" },
                        "string": { "type": "string" }
                    }
                },
                id: "base"
            },
            {
                data: {
                    "title": "date",
                    "type": "object",
                    "properties": {
                        "date": { "type": "string", "format": "date" },
                        "time": { "type": "string", "format": "time" },
                        "datetime": { "type": "string", "format": "date-time" }
                    }
                },
                id: "DateTime"
            },
            {
                data: {
                    "title": "Required",
                    "type": "object",
                    "properties": {
                        "number": { "type": "number" }
                    },
                    "required": ["number"]
                },
                id: "required"
            },
            {
                data: {
                    "title": "MAX / MIN",
                    "type": "object",
                    "properties": {
                        "size": {
                            "type": "number",
                            "minimum": 5.0,
                            "maximum": 10.5
                        }
                    },
                },
                id: "MAX / MIN"
            },
            {
                data: {
                    "title": "enum",
                    "type": "object",
                    "properties": {
                        "size": {
                            "enumNames": ["choix1", "choix2", "choix3"],
                            "enumDescriptions": ["Premier choix", "Second choix", "Troisieme choix"],
                            "type": "integer",
                            "format": "enum",
                            "enum": [2, 4, 6]
                        }
                    },
                },
                id: "enum"
            },
            {
                data: {
                    "title": "upload",
                    "type": "object",
                    "properties": {
                        "file": {
                            "fileExtension": ".csv",
                            "type": ["string", "null"],
                            "default": null,
                            "format": "upload"
                        }
                    },
                },
                id: "upload"
            }
        ];
        var onFormEror = function (e) {
            console.log("onFormEror", e);
        };
        return React.createElement("div", null,
            React.createElement("select", { className: "form-control", defaultValue: "", onChange: this.selectChange, required: true }, schemas.map(function (schema) {
                return React.createElement("option", { key: schema.id, value: JSON.stringify(schema.data) }, schema.id);
            })),
            React.createElement("textarea", { value: JSON.stringify(this.state.schema), className: "form-control", cols: 100, rows: 10, onChange: this.onSchemaChange }),
            React.createElement("hr", null),
            React.createElement(UpSchemaForm_1.default, { schema: this.state.schema, onFormEror: onFormEror, onFormPayload: this.onFormPayload }),
            React.createElement("hr", null),
            this.state.result);
    };
    return Demo;
}(React.Component));
exports.Demo = Demo;
ReactDOM.render(React.createElement(Demo, null), document.getElementById('root'));
//# sourceMappingURL=demo.js.map