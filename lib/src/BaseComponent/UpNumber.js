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
var UpNumberComp = (function (_super) {
    __extends(UpNumberComp, _super);
    function UpNumberComp(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpNumberComp.prototype.renderField = function () {
        var _this = this;
        return React.createElement(react_controls_1.UpNumber, { ref: function (i) { _this.InputBaseControl = i; }, onChange: this.handleChangeEventGlobal, max: this.props.schema.maximum, min: this.props.schema.minimum });
    };
    return UpNumberComp;
}(UpFormControl_1.UpFormControl));
exports.default = UpNumberComp;
//# sourceMappingURL=UpNumber.js.map