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
var UpDisplayDate = (function (_super) {
    __extends(UpDisplayDate, _super);
    function UpDisplayDate(p, c) {
        return _super.call(this, p, c) || this;
    }
    UpDisplayDate.prototype.render = function () {
        var date = null;
        if (this.props.date == null) {
            return React.createElement("span", null);
        }
        else if (typeof (this.props.date) === "string") {
            date = new Date(this.props.date);
        }
        else if (this.props.date instanceof Date) {
            date = this.props.date;
        }
        if (date == null || isNaN(date.valueOf()) === true) {
            return React.createElement("span", null);
        }
        switch (this.props.format) {
            case "date":
                return React.createElement("span", null, this.getDateStr(date));
            case "date-time":
                return React.createElement("span", null,
                    this.getDateStr(date),
                    " ",
                    this.getHourStr(date));
            case "time":
                return React.createElement("span", null, this.getHourStr(date));
            default:
                return React.createElement("span", null);
        }
    };
    UpDisplayDate.prototype.getDateStr = function (date) {
        return this.getDate(date) + "/" + this.getMonth(date) + "/" + date.getFullYear();
    };
    UpDisplayDate.prototype.getHourStr = function (date) {
        return this.getHours(date) + ":" + this.getMinutes(date);
    };
    UpDisplayDate.prototype.CompleteDigit = function (digit) { return digit <= 9 ? "0" + digit : "" + digit; };
    UpDisplayDate.prototype.getDate = function (date) { return this.CompleteDigit(date.getDate()); };
    UpDisplayDate.prototype.getMonth = function (date) { return this.CompleteDigit(date.getMonth() + 1); };
    UpDisplayDate.prototype.getHours = function (date) { return this.CompleteDigit(date.getHours()); };
    UpDisplayDate.prototype.getMinutes = function (date) { return this.CompleteDigit(date.getMinutes()); };
    return UpDisplayDate;
}(React.Component));
exports.default = UpDisplayDate;
//# sourceMappingURL=UpDisplayDate.js.map