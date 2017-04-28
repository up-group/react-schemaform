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
var UpSchemaDisplaySelector_1 = require("./UpSchemaDisplaySelector");
var UpSchemaDisplay = (function (_super) {
    __extends(UpSchemaDisplay, _super);
    function UpSchemaDisplay(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpSchemaDisplay.prototype.render = function () {
        var _this = this;
        if (this.props.data == null) {
            return null;
        }
        return React.createElement("div", { className: "jumbotron" },
            React.createElement(UpSchemaDisplaySelector_1.default, { ref: function (arg) { _this.UpSchemaDisplaySelectorRef = arg; }, schema: this.props.schema, data: this.props.data }));
    };
    return UpSchemaDisplay;
}(React.Component));
exports.default = UpSchemaDisplay;
//# sourceMappingURL=UpSchemaDisplay.js.map