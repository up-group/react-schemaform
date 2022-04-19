import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";

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
    for (var componentKey in this.Component) {
      if (!this.Component.hasOwnProperty(componentKey)) {
        continue;
      }
      if (this.Component[componentKey].type === type) {
        return this.Component[componentKey];
      }
    }
    return null;
  }

  private static GetComponentByFormat(format: string, componentType: string) {
    for (var ComponentKey in this.Component) {
      if (!this.Component.hasOwnProperty(ComponentKey)) {
        continue;
      }
      if (this.Component[ComponentKey].format === format) {
        return componentType ? this.Component[componentType] : this.Component[ComponentKey];
      }
    }
    return null;
  }

  public static GetComponentBySchema(schema: JsonSchema, componentType: string) {
    var comp = ComponentRegistery.GetComponentByFormat(
      ((schema.items as JsonSchema) || schema).format || schema.format,
      componentType
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
    onChange: (e: React.ChangeEvent<any>, value, hasError: boolean) => void,
    isRequired: boolean,
    schema: JsonSchema,
    showError: boolean,
    value: any,
    floatingLabel,
    isReadOnly: (property: string) => boolean,
  ) {
    var comp = this.GetComponentByKey(key);
    var props = {
      value,
      showError: showError,
      onChange: onChange,
      isRequired: isRequired,
      schema: schema,
      floatingLabel,
      isReadOnly
    };

    return React.createElement(comp.ComponentClass, props);
  }

  public static GetComponentInstance(
    onChange: (e: React.ChangeEvent<any>, value, hasError: boolean) => void,
    isRequired: boolean,
    schema: JsonSchema,
    showError: boolean,
    value: any,
    name: string,
    translate: (text: string) => any,
    onSearchButtonClick: (text: string) => any,
    isReadOnly?: (property: string) => boolean,
    floatingLabel?: string,
    values?: { [key: string]: any },
    additionalProps?: { [key: string]: any }
  ) {

    const componentType = additionalProps !== undefined ? additionalProps.componentType : null;
    var comp = this.GetComponentBySchema(schema, componentType);

    // TODO : clean code
    const newSchema = { ...schema }
    if (newSchema.entitySource && newSchema.entitySource.defaultParameters) {
      for (const key in newSchema.entitySource.defaultParameters) {
        newSchema.entitySource.defaultParameters[key] = values[key] ? values[key] : newSchema.entitySource.defaultParameters[key];
      }
    }

    var props = {
      value,
      name,
      showError: showError,
      onChange: onChange,
      isRequired: isRequired,
      schema: newSchema,
      translate,
      onSearchButtonClick,
      floatingLabel,
      isReadOnly,
      additionalProps
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
import EnumInlineField from "../BaseComponent/EnumInlineField";
import RadioField from '../BaseComponent/RadioField';

ComponentRegistery.Register("UpNumber", "number", null, NumberField);
ComponentRegistery.Register("String", "string", null, StringField);
ComponentRegistery.Register("Date", null, "date", DateField);
ComponentRegistery.Register("DateTime", null, "date-time", DateTimeField);
ComponentRegistery.Register("Time", null, "time", TimeField);
ComponentRegistery.Register("Integer", "integer", null, IntegerField);
ComponentRegistery.Register("Boolean", "boolean", null, BooleanField);
ComponentRegistery.Register("Radio", null, "radio", RadioField);

ComponentRegistery.Register("Entity", null, "entityKey", EntityField, true);
ComponentRegistery.Register("EnumInline", null, "enumInline", EnumInlineField, true);
ComponentRegistery.Register("Enum", null, "enum", EnumField, true);
ComponentRegistery.Register("Upload", null, "upload", UploadField, false);
ComponentRegistery.Register("Month", null, "month", MonthField, false);
