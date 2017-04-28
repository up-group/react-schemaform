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
        _this.handleChangeEventGlobal = function (cleandata, event, eror) {
            _this.setState({ value: cleandata }, function () {
                if (eror === false) {
                    _this.checkFormError();
                }
                else {
                    _this.props.onError(eror);
                }
                _this.props.onChange(_this.state.value);
            });
        };
        _this.valueChange = function (value) {
        };
        _this.state = {
            value: null
        };
        _this._ControlErrorCentral = new ControlErrorCentral_1.default();
        _this._ControlErrorCentral.addControl(new TypeNullControl_1.default(_this.props.isRequired, _this.isNullable, _this.props.schema.default, _this));
        return _this;
    }
    UpFormControl.prototype.checkFormError = function () {
        var errorCheck = this._ControlErrorCentral.isValidValue(this.state.value);
        if (errorCheck.hasError == true) {
            this.props.onError(true);
            if (this.InputBaseControl != null) {
                this.InputBaseControl.setState({ error: errorCheck.errorMessage });
            }
        }
        else {
            this.props.onError(false);
        }
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
        this.handleChangeEventGlobal(null);
    };
    UpFormControl.prototype.render = function () {
        return React.createElement("span", null, this.renderField());
    };
    return UpFormControl;
}(React.Component));
exports.UpFormControl = UpFormControl;
//# sourceMappingURL=UpFormControl.js.map