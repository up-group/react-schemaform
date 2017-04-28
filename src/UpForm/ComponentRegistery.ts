import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";

export interface ComponentRegisteryEntry {
    key: string;
    ComponentClass: React.ComponentClass<any>;//UpFormControl
    type: string;
    format: string;
    array: boolean
}

export default class ComponentRegistery {
    private static _instance: ComponentRegistery = new ComponentRegistery();
    private static Component: { [key: string]: ComponentRegisteryEntry } = {};

    constructor() {
        if (ComponentRegistery._instance) {
            throw new Error("Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new.");
        }
        ComponentRegistery._instance = this;
    }

    public static getInstance(): ComponentRegistery {
        return ComponentRegistery._instance;
    }


    public static Register(key: string, type: string, format: string, Component: React.ComponentClass<any>, array: boolean = false) {
        this.Component[key] = {
            key: key,
            ComponentClass: Component,
            format: format,
            type: type,
            array: array
        };
    }

    public static GetComponentByKey(ComponentKey: string) {
        return this.Component[ComponentKey];
    }


    private static GetComponentByType(type: string) {
        for (var ComponentKey in this.Component) {
            if (!this.Component.hasOwnProperty(ComponentKey)) { continue; }
            if (this.Component[ComponentKey].type === type) {
                return this.Component[ComponentKey];
            }
        }
        return null
    }

    private static GetComponentByFormat(format: string) {
        for (var ComponentKey in this.Component) {
            if (!this.Component.hasOwnProperty(ComponentKey)) { continue; }
            if (this.Component[ComponentKey].format === format) {
                return this.Component[ComponentKey];
            }
        }
        return null
    }

    public static GetComponentBySchema(schema: JsonSchema) {
        var comp = ComponentRegistery.GetComponentByFormat(((schema.items as JsonSchema) || schema).format);

        if (comp == null) {
            comp = ComponentRegistery.GetComponentByType(JsonSchemaHelper.getBaseType(schema));
        }
        return comp;
    }

    public static GetComponentInstanceByKey(key: string, onError: (hasError: boolean) => void, onChange: (arg) => void, isRequired: boolean, schema: JsonSchema) {
        var comp = this.GetComponentByKey(key);
        var props = {
            onError: onError,
            onChange: onChange,
            isRequired: isRequired,
            schema: schema
        }

        return React.createElement(comp.ComponentClass, props);
    }

    public static GetComponentInstance(onError: (hasError: boolean) => void, onChange: (arg) => void, isRequired: boolean, schema: JsonSchema) {
        var comp = this.GetComponentBySchema(schema);

        var props = {
            onError: onError,
            onChange: onChange,
            isRequired: isRequired,
            schema: schema
        }

        return React.createElement(comp.ComponentClass, props);
    }

}




//************************************************  CONGFIG
import UpDate from "../BaseComponent/UpDate"
import UpDateTime from "../BaseComponent/UpDateTime"
import UpTime from "../BaseComponent/UpTime"
import UpEntity from "../BaseComponent/UpEntity"
import UpString from "../BaseComponent/UpString"
import UpNumber from "../BaseComponent/UpNumber"
import UpInteger from "../BaseComponent/UpInteger"
import UpBoolean from "../BaseComponent/UpBoolean"
import UpEnum from "../BaseComponent/UpEnum"
import UpUpload from "../BaseComponent/UpUpload"
import UpMonth from "../BaseComponent/UpMonth"

ComponentRegistery.Register("UpNumber", "number", null, UpNumber);
ComponentRegistery.Register("UpString", "string", null, UpString);
ComponentRegistery.Register("UpDate", null, "date", UpDate);
ComponentRegistery.Register("UpDateTime", null, "date-time", UpDateTime);
ComponentRegistery.Register("UpTime", null, "time", UpTime);
ComponentRegistery.Register("UpInteger", "integer", null, UpInteger);
ComponentRegistery.Register("UpBoolean", "boolean", null, UpBoolean);


ComponentRegistery.Register("UpEntity", null, "entityKey", UpEntity, true);
ComponentRegistery.Register("UpEnum", null, "enum", UpEnum, true);
ComponentRegistery.Register("UpUpload", null, "upload", UpUpload, false);
ComponentRegistery.Register("UpMonth", null, "month", UpMonth, false);
