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
var $ = require("jquery");
var React = require("react");
var UpSchemaDisplaySelector_1 = require("./UpSchemaDisplaySelector");
var UpSchemaDisplayArray = (function (_super) {
    __extends(UpSchemaDisplayArray, _super);
    function UpSchemaDisplayArray(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.btnExport = null;
        _this.componentDidUpdate = function () {
            $(_this.btnExport).remove();
        };
        _this.componentDidMount = function () {
            $(_this.btnExport).remove();
        };
        return _this;
    }
    UpSchemaDisplayArray.prototype.exportArrayToCsv = function () {
        this.btnExport.click();
    };
    UpSchemaDisplayArray.prototype.render = function () {
        var header = [];
        for (var key in this.props.schema.items.properties) {
            if (!this.props.schema.items.properties.hasOwnProperty(key) ||
                (this.props.schema.items.properties[key] != null && this.props.schema.items.properties[key].hide === true) ||
                (this.props.schema.items.properties[key] != null && this.props.schema.items.properties[key].items != null && this.props.schema.items.properties[key].items.hide === true)) {
                continue;
            }
            header.push(React.createElement("th", { key: key }, this.props.schema.items.properties[key].title || key));
        }
        var rows = [];
        if (this.props.data != null) {
            for (var i = 0; i < this.props.data.length; i++) {
                rows.push(React.createElement(ObjectRow, { key: i, schema: this.props.schema.items.properties, data: this.props.data[i] }));
            }
        }
        return React.createElement("table", { className: "table table-bordered table-striped" },
            React.createElement("thead", null,
                React.createElement("tr", null, header)),
            React.createElement("tbody", null, rows));
    };
    return UpSchemaDisplayArray;
}(React.Component));
exports.default = UpSchemaDisplayArray;
var ObjectRow = (function (_super) {
    __extends(ObjectRow, _super);
    function ObjectRow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ObjectRow.prototype.render = function () {
        var cols = [];
        for (var key in this.props.data) {
            if (!this.props.data.hasOwnProperty(key) ||
                (this.props.schema[key] != null && this.props.schema[key].hide === true) ||
                (this.props.schema[key] != null && this.props.schema[key].items != null && this.props.schema[key].items.hide === true)) {
                continue;
            }
            cols.push(React.createElement("td", { key: key },
                React.createElement(UpSchemaDisplaySelector_1.default, { schema: this.props.schema[key], data: this.props.data[key] })));
        }
        return React.createElement("tr", null, cols);
    };
    return ObjectRow;
}(React.Component));
//# sourceMappingURL=UpSchemaDisplayArray.js.map