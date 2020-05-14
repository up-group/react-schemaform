import * as React from "react";
import UpFormGroup from "./UpFormGroup";
import UpSchemaArray from "./UpSchemaArray";
import UpSchemaObject from "./UpSchemaObject";
import ComponentRegistery from "./ComponentRegistery";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";
import { UpFormContextConsumer } from './UpFormContext';

export interface PropertyViewModel {
  order: number;
  colspan?: number;
  component?: string;
  name?: string;
  isSeparator?: boolean;
}

export interface UpSchemaFormComponentSelectorProps {
  value: any;
  values?: {[ key : string] : any };
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
  viewModels: PropertyViewModel[];
  translate: (text: string) => any;
  onSearchButtonClick?: (text: string) => any;
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

  renderElement(parametersForm) {
    let {withFloatingLabel,element,isControl,isArray,type,defaultColspan} = parametersForm
    const floatingLabel = withFloatingLabel && this.props.schema.title
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
            viewModels={this.props.viewModels}
            translate={this.props.translate}
            onSearchButtonClick={this.props.onSearchButtonClick}
            defaultColspan={defaultColspan}
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
            viewsModel={this.props.viewModels}
            translate={this.props.translate}
            onSearchButtonClick={this.props.onSearchButtonClick}
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
          this.props.translate,
          this.props.onSearchButtonClick,
          floatingLabel,
          this.props.values
        );
        break;
    }
    return element
  }

  render() {
    const element = null;
    const isControl = true;
    const isArray = false;

    const parameters = this.props.node.split(".");
    if (parameters.length !== 0 && this.props.node !== "") {
      const parameter = this.findGetParameter(parameters[parameters.length - 1]);
      if (parameter != null) {
        this.props.schema.default = parameter;
        this.props.schema.readonly = true;
      }
    }

    const type = JsonSchemaHelper.getBaseType(this.props.schema);

    if (isControl) {
      return (
        <UpFormContextConsumer>
          {({ withFloatingLabel,defaultColspan }) => (
            <UpFormGroup
              isRequired={this.props.isRequired}
              title={this.props.schema.title}
              description={this.props.schema.description}
              withFloatingLabel={(type === 'string' || this.props.schema.format === 'enum') && withFloatingLabel}
            >
              {this.renderElement({withFloatingLabel,element,isArray,isControl,type,defaultColspan})}
            </UpFormGroup>
          )}
        </UpFormContextConsumer>
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
