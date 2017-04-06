"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonSchemaHelper = (function () {
    function JsonSchemaHelper() {
    }
    JsonSchemaHelper.getBaseType = function (schema) {
        if (typeof (schema.type) === "string") {
            return schema.type;
        }
        else if (schema.type.indexOf("null") != -1) {
            return schema.type[0];
        }
    };
    ;
    JsonSchemaHelper.isNullable = function (schema) {
        return schema.type.indexOf("null") != -1;
    };
    JsonSchemaHelper.parseSchema = function (schema) {
        var data = JSON.parse(schema);
        if (data.definitions == undefined) {
            return data;
        }
        else {
            return this.flat(data, data.definitions, {});
        }
    };
    JsonSchemaHelper.flat = function (data, originalDefinitions, flattenedDefinitions) {
        for (var index in data) {
            if (index === "definitions" || data.hasOwnProperty(index) == false) {
                continue;
            }
            if (data[index] != null && data[index]["$ref"] !== undefined) {
                data[index] = this.getFromDefinition(data[index]["$ref"], originalDefinitions, flattenedDefinitions);
            }
            else if (typeof (data[index]) !== "string") {
                this.flat(data[index], originalDefinitions, flattenedDefinitions);
            }
        }
        return data;
    };
    JsonSchemaHelper.getFromDefinition = function (id, originalDefinitions, flattenedDefinitions) {
        var isAlreadyFlattened = flattenedDefinitions[id] == undefined;
        if (isAlreadyFlattened) {
            flattenedDefinitions[id] = originalDefinitions[id.split('/')[2]];
            this.flat(flattenedDefinitions[id], originalDefinitions, flattenedDefinitions);
        }
        return flattenedDefinitions[id];
    };
    return JsonSchemaHelper;
}());
exports.default = JsonSchemaHelper;
//# sourceMappingURL=JsonSchemaHelper.js.map