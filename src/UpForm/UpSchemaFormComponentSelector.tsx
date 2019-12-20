import * as React from "react";
import UpFormGroup from "./UpFormGroup";
import UpSchemaArray from "./UpSchemaArray";
import UpSchemaObject from "./UpSchemaObject";
import ComponentRegistery from "./ComponentRegistery";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";

export interface PropertyConfiguration {
  order: number;
  colspan: number;
  component?: string;
  name: string;
}

export interface UpSchemaFormComponentSelectorProps {
  value: any;
  schema: JsonSchema;
  node: string;
  name?: string;
  onChange: (
    e: React.ChangeEvent<any>,
    newValue: any,
    hasError: boolean,
    node: string
  ) => void;
  isRequired: boolean;
  showError: boolean;
  ignoredProperties?: string[];
  propertiesConfiguration: PropertyConfiguration[];
  translate : (text: string) => any;
}

export default class UpSchemaFormComponentSelector extends React.Component<
  UpSchemaFormComponentSelectorProps,
  {}
  > {
  constructor(p, c) {
    super(p, c);
    this.onElementChange = this.onElementChange.bind(this);
  }

  Component: { [key: string]: React.ComponentClass<any> } = {};

  Register(key: string, Component: React.ComponentClass<any>) {
    this.Component[key] = Component;
  }

  GetComponent(ComponentKey: string): React.ComponentClass<any> {
    return this.Component[ComponentKey];
  }

  private findGetParameter(parameterName) {
    var result = null,
      tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
      tmp = items[index].split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
  }

  render() {

   
    var element = null;
    var isControl = true;
    var isArray = false;

    var parameters = this.props.node.split(".");
    if (parameters.length !== 0 && this.props.node !== "") {
      var parameter = this.findGetParameter(parameters[parameters.length - 1]);
      if (parameter != null) {
        this.props.schema.default = parameter;
        this.props.schema.readonly = true;
      }
    }

    var type = JsonSchemaHelper.getBaseType(this.props.schema);
    switch (type) {
      case "object":
        element = (
          <UpSchemaObject
            value={this.props.value}
            showError={this.props.showError}
            withHR={this.props.node !== ""}
            isRequired={this.props.isRequired}
            schema={this.props.schema}
            node={this.props.node}
            onChange={this.props.onChange}
            ignoredProperties={this.props.ignoredProperties}
            propertiesConfiguration = {this.props.propertiesConfiguration}
            translate = {this.props.translate}
          />
        );
        isControl = false;
        break;
      case "array":
        element = (
          <UpSchemaArray
            value={this.props.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            schema={this.props.schema}
            onChange={this.onElementChange}
            node={this.props.node}
            ignoredProperties={this.props.ignoredProperties}
            propertiesConfiguration = {this.props.propertiesConfiguration}
            translate = {this.props.translate}
          />
        );
        isArray = true;
        break;
      default:
        element = ComponentRegistery.GetComponentInstance(
          this.onElementChange,
          this.props.isRequired,
          this.props.schema,
          this.props.showError,
          this.props.value,
          this.props.name,
          this.props.translate
        );
        break;
    }

    if (isControl) {
      return (
        <UpFormGroup
          isRequired={this.props.isRequired}
          title={this.props.schema.title}
          description={this.props.schema.description}
        >
          {element}
        </UpFormGroup>
      );
    }
    return element;
  }

  private onElementChange = (
    e: React.ChangeEvent<any>,
    value: any,
    hasError: boolean
  ) => {
    this.props.onChange(e, value, hasError, this.props.node);
  };
}
