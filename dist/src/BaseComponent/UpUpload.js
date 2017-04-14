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
var UpUpload = (function (_super) {
    __extends(UpUpload, _super);
    function UpUpload(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpUpload.prototype.setInput = function (data) {
    };
    UpUpload.prototype._componentDidMount = function () {
    };
    UpUpload.prototype.renderField = function () {
        return React.createElement(react_controls_1.UpFile, { onError: this.setSpecificError, hasError: this.state.hasError, onChange: this.handleChangeJsEventGlobal, fileExtension: this.props.schema.fileExtension });
    };
    UpUpload.prototype.handleChangeJsEvent = function (event) {
        return event;
    };
    UpUpload.prototype.isEmpty = function (value) {
        return value === null || value === [] || value === "";
    };
    return UpUpload;
}(UpFormControl_1.UpFormControl));
exports.default = UpUpload;
//# sourceMappingURL=UpUpload.js.map