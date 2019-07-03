import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";

export interface ComponentRegisteryEntry {
  key: string;
  ComponentClass: React.ComponentClass<any>; //UpFormControl
  type: string;
  format: string;
  array: boolean;
}

export default class ComponentRegistery {
  private static _instance: ComponentRegistery = new ComponentRegistery();
  private static Component: { [key: string]: ComponentRegisteryEntry } = {};

  constructor() {
    if (ComponentRegistery._instance) {
      throw new Error(
        "Error: Instantiation failed: Use SingletonDemo.getInstance() instead of new."
      );
    }
    ComponentRegistery._instance = this;
  }

  public static getInstance(): ComponentRegistery {
    return ComponentRegistery._instance;
  }

  public static Register(
    key: string,
    type: string,
    format: string,
    Component: React.ComponentClass<any>,
    array: boolean = false
  ) {
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
      if (!this.Component.hasOwnProperty(ComponentKey)) {
        continue;
      }
      if (this.Component[ComponentKey].type === type) {
        return this.Component[ComponentKey];
      }
    }
    return null;
  }

  private static GetComponentByFormat(format: string) {
    for (var ComponentKey in this.Component) {
      if (!this.Component.hasOwnProperty(ComponentKey)) {
        continue;
      }
      if (this.Component[ComponentKey].format === format) {
        return this.Component[ComponentKey];
      }
    }
    return null;
  }

  public static GetComponentBySchema(schema: JsonSchema) {
    var comp = ComponentRegistery.GetComponentByFormat(
      ((schema.items as JsonSchema) || schema).format
    );

    if (comp == null) {
      comp = ComponentRegistery.GetComponentByType(
        JsonSchemaHelper.getBaseType(schema)
      );
    }
    return comp;
  }

  public static GetComponentInstanceByKey(
    key: string,
    onChange: (arg, hasError: boolean) => void,
    isRequired: boolean,
    schema: JsonSchema,
    showError: boolean,
    initData: any
  ) {
    var comp = this.GetComponentByKey(key);
    var props = {
      initData: initData,
      showError: showError,
      onChange: onChange,
      isRequired: isRequired,
      schema: schema
    };

    return React.createElement(comp.ComponentClass, props);
  }

  public static GetComponentInstance(
    onChange: (arg, hasError: boolean) => void,
    isRequired: boolean,
    schema: JsonSchema,
    showError: boolean,
    initData: any
  ) {
    var comp = this.GetComponentBySchema(schema);

    var props = {
      initData: initData,
      showError: showError,
      onChange: onChange,
      isRequired: isRequired,
      schema: schema
    };

    return React.createElement(comp.ComponentClass, props);
  }
}

//************************************************  CONGFIG
import DateField from "../BaseComponent/DateField";
import DateTimeField from "../BaseComponent/DateTimeField";
import TimeField from "../BaseComponent/TimeField";
import EntityField from "../BaseComponent/EntityField";
import StringField from "../BaseComponent/StringField";
import NumberField from "../BaseComponent/NumberField";
import IntegerField from "../BaseComponent/IntegerField";
import BooleanField from "../BaseComponent/BooleanField";
import EnumField from "../BaseComponent/EnumField";
import UploadField from "../BaseComponent/UploadField";
import MonthField from "../BaseComponent/MonthField";

ComponentRegistery.Register("UpNumber", "number", null, NumberField);
ComponentRegistery.Register("String", "string", null, StringField);
ComponentRegistery.Register("Date", null, "date", DateField);
ComponentRegistery.Register("DateTime", null, "date-time", DateTimeField);
ComponentRegistery.Register("Time", null, "time", TimeField);
ComponentRegistery.Register("Integer", "integer", null, IntegerField);
ComponentRegistery.Register("Boolean", "boolean", null, BooleanField);

ComponentRegistery.Register("Entity", null, "entityKey", EntityField, true);
ComponentRegistery.Register("Enum", null, "enum", EnumField, true);
ComponentRegistery.Register("Upload", null, "upload", UploadField, false);
ComponentRegistery.Register("Month", null, "month", MonthField, false);
