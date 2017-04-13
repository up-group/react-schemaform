"use strict";
var React = require("react");
var JsonSchemaHelper_1 = require("../helper/JsonSchemaHelper");
var ComponentRegistery = (function () {
    function ComponentRegistery() {
        if (ComponentRegistery._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        ComponentRegistery._instance = this;
    }
    ComponentRegistery.getInstance = function () {
        return ComponentRegistery._instance;
    };
    ComponentRegistery.Register = function (key, type, format, Component, array) {
        if (array === void 0) { array = false; }
        this.Component[key] = {
            key: key,
            ComponentClass: Component,
            format: format,
            type: type,
            array: array
        };
    };
    ComponentRegistery.GetComponentByKey = function (ComponentKey) {
        return this.Component[ComponentKey];
    };
    ComponentRegistery.GetComponentByType = function (type) {
        for (var ComponentKey in this.Component) {
            if (!this.Component.hasOwnProperty(ComponentKey)) {
                continue;
            }
            if (this.Component[ComponentKey].type === type) {
                return this.Component[ComponentKey];
            }
        }
        return null;
    };
    ComponentRegistery.GetComponentByFormat = function (format) {
        for (var ComponentKey in this.Component) {
            if (!this.Component.hasOwnProperty(ComponentKey)) {
                continue;
            }
            if (this.Component[ComponentKey].format === format) {
                return this.Component[ComponentKey];
            }
        }
        return null;
    };
    ComponentRegistery.GetComponentBySchema = function (schema) {
        var comp = ComponentRegistery.GetComponentByFormat((schema.items || schema).format);
        if (comp == null) {
            comp = ComponentRegistery.GetComponentByType(JsonSchemaHelper_1.default.getBaseType(schema));
        }
        return comp;
    };
    ComponentRegistery.GetComponentInstanceByKey = function (key, onError, onChange, isRequired, schema) {
        var comp = this.GetComponentByKey(key);
        var props = {
            onError: onError,
            onChange: onChange,
            isRequired: isRequired,
            schema: schema
        };
        return React.createElement(comp.ComponentClass, props);
    };
    ComponentRegistery.GetComponentInstance = function (onError, onChange, isRequired, schema) {
        var comp = this.GetComponentBySchema(schema);
        var props = {
            onError: onError,
            onChange: onChange,
            isRequired: isRequired,
            schema: schema
        };
        return React.createElement(comp.ComponentClass, props);
    };
    return ComponentRegistery;
}());
ComponentRegistery._instance = new ComponentRegistery();
ComponentRegistery.Component = {};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComponentRegistery;
var UpDate_1 = require("../BaseComponent/UpDate");
var UpDateTime_1 = require("../BaseComponent/UpDateTime");
var UpTime_1 = require("../BaseComponent/UpTime");
var UpEntity_1 = require("../BaseComponent/UpEntity");
var UpString_1 = require("../BaseComponent/UpString");
var UpNumber_1 = require("../BaseComponent/UpNumber");
var UpInteger_1 = require("../BaseComponent/UpInteger");
var UpBoolean_1 = require("../BaseComponent/UpBoolean");
var UpEnum_1 = require("../BaseComponent/UpEnum");
var UpUpload_1 = require("../BaseComponent/UpUpload");
var UpMonth_1 = require("../BaseComponent/UpMonth");
ComponentRegistery.Register("UpNumber", "number", null, UpNumber_1.default);
ComponentRegistery.Register("UpString", "string", null, UpString_1.default);
ComponentRegistery.Register("UpDate", null, "date", UpDate_1.default);
ComponentRegistery.Register("UpDateTime", null, "date-time", UpDateTime_1.default);
ComponentRegistery.Register("UpTime", null, "time", UpTime_1.default);
ComponentRegistery.Register("UpInteger", "integer", null, UpInteger_1.default);
ComponentRegistery.Register("UpBoolean", "boolean", null, UpBoolean_1.default);
ComponentRegistery.Register("UpEntity", null, "entityKey", UpEntity_1.default, true);
ComponentRegistery.Register("UpEnum", null, "enum", UpEnum_1.default, true);
ComponentRegistery.Register("UpUpload", null, "upload", UpUpload_1.default, false);
ComponentRegistery.Register("UpMonth", null, "month", UpMonth_1.default, false);
//# sourceMappingURL=ComponentRegistery.js.map