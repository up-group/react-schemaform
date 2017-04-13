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
var ControlErrorCentral_1 = require("../ControlError/ControlErrorCentral");
var TypeNullControl_1 = require("../ControlError/TypeNullControl");
var JsonSchemaHelper_1 = require("../helper/JsonSchemaHelper");
var UpFormControl = (function (_super) {
    __extends(UpFormControl, _super);
    function UpFormControl(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.handleChangeEventGlobal = function (cleandata) {
            var result = _this._ControlErrorCentral.isValidValue(cleandata);
            if (result.hasError) {
                _this.setSpecificError(result.errorMessage);
            }
            else {
                _this.unSetSpecifiError();
                _this.valueChange(result.correctValue);
                _this.setInput(result.correctValue);
            }
        };
        _this.valueChange = function (value) {
            _this.setState({ value: value }, function () {
                _this.props.onChange(value);
            });
        };
        _this.setSpecificError = function (errorMesssage) {
            _this.setState({
                hasError: true,
                errorMessage: errorMesssage
            });
            _this.props.onError();
        };
        _this.unSetSpecifiError = function () {
            if (_this.state.hasError == true) {
                _this.setState({
                    hasError: false,
                    errorMessage: null
                });
            }
        };
        _this.state = {
            hasError: false,
            value: null
        };
        _this.handleChangeJsEventGlobal = _this.handleChangeJsEventGlobal.bind(_this);
        _this._ControlErrorCentral = new ControlErrorCentral_1.default();
        _this._ControlErrorCentral.addControl(new TypeNullControl_1.default(_this.props.isRequired, _this.isNullable, _this.props.schema.default, _this));
        return _this;
    }
    UpFormControl.prototype.handleChangeJsEventGlobal = function (event) {
        var cleandata = this.handleChangeJsEvent(event);
        this.handleChangeEventGlobal(cleandata);
    };
    UpFormControl.prototype.isEmptyOrNull = function (value) {
        if (value === null) {
            return true;
        }
        if (value === "") {
            return true;
        }
        if (value === undefined) {
            return true;
        }
        return false;
    };
    Object.defineProperty(UpFormControl.prototype, "isNullable", {
        get: function () {
            return JsonSchemaHelper_1.default.isNullable(this.props.schema);
        },
        enumerable: true,
        configurable: true
    });
    UpFormControl.prototype.componentDidMount = function () {
        this._componentDidMount();
        if (this.props.schema.default !== undefined) {
            this.handleChangeEventGlobal(this.props.schema.default);
            this.setInput(this.props.schema.default);
        }
        else {
            this.handleChangeEventGlobal(null);
            this.setInput(null);
        }
    };
    UpFormControl.prototype.render = function () {
        return React.createElement("span", null,
            this.renderField(),
            (this.state.hasError && this.state.errorMessage != null) ?
                React.createElement("span", { className: "text-danger" }, this.state.errorMessage)
                : null);
    };
    return UpFormControl;
}(React.Component));
exports.UpFormControl = UpFormControl;
//# sourceMappingURL=UpFormControl.js.map