"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorMemory = (function () {
    function ErrorMemory() {
        this.memory = {};
    }
    ErrorMemory.prototype.errorOn = function (node) {
        this.memory[node] = true;
    };
    ErrorMemory.prototype.cleanErrorOn = function (node) {
        this.memory[node] = false;
    };
    Object.defineProperty(ErrorMemory.prototype, "hasError", {
        get: function () {
            for (var node in this.memory) {
                if (this.memory.hasOwnProperty(node) === false) {
                    continue;
                }
                if (this.memory[node] === true) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return ErrorMemory;
}());
exports.default = ErrorMemory;
//# sourceMappingURL=ErrorMemory.js.map