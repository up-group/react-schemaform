"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryHelper = (function () {
    function MemoryHelper() {
    }
    MemoryHelper.AssignValue = function (obj, nodes, value) {
        var data = obj || {};
        var prop = nodes.shift();
        if (nodes.length === 0) {
            data[prop] = value;
            return data;
        }
        else if (data.hasOwnProperty(prop) && typeof (data[prop]) === "object") {
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data;
        }
        else if (data.hasOwnProperty(prop) === false) {
            data[prop] = {};
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data;
        }
    };
    return MemoryHelper;
}());
exports.default = MemoryHelper;
//# sourceMappingURL=MemoryHelper.js.map