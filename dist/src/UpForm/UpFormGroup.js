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
var UpFormLabel_1 = require("./UpFormLabel");
var UpFormGroup = (function (_super) {
    __extends(UpFormGroup, _super);
    function UpFormGroup(p, c) {
        var _this = _super.call(this, p, c) || this;
        _this.onerror = function () {
            console.log("error change");
        };
        return _this;
    }
    UpFormGroup.prototype.componentDidMount = function () {
    };
    UpFormGroup.prototype.render = function () {
        return React.createElement("div", { className: "col-md-" + this.props.colSize + " form-group" },
            React.createElement(UpFormLabel_1.default, { title: this.props.title }),
            this.props.description != null ?
                React.createElement("a", { "data-toggle": "tooltip", "data-placement": "bottom", "data-html": "true", title: this.props.description },
                    React.createElement("i", { className: 'glyphicon glyphicon-info-sign' }))
                : null,
            React.createElement("span", { style: { color: "red" } }, this.props.isRequired ? " *" : ""),
            this.props.children);
    };
    return UpFormGroup;
}(React.Component));
exports.default = UpFormGroup;
//# sourceMappingURL=UpFormGroup.js.map