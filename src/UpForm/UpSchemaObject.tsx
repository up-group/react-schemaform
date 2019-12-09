import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector";
import {
  UpSvgIcon,
  UpButton,
  UpPanel,
  UpBox,
  UpGrid,
  UpCol,
  UpRow
} from "@up-group/react-controls";

export interface UpSchemaObjectProps {
  value: any;
  withHR: boolean;
  schema: JsonSchema;
  node: string;
  onChange: (
    e: React.ChangeEvent<any>,
    newValue: any,
    hasError: boolean,
    node: string
  ) => void;
  isRequired: boolean;
  showError: boolean;
  ignoredProperties: string[];
}

export interface UpSchemaObjectState {
  showAdvanced: boolean;
}

export default class UpSchemaObject extends React.Component<
  UpSchemaObjectProps,
  UpSchemaObjectState
  > {
  constructor(p, c) {
    super(p, c);
    this.state = {
      showAdvanced: false
    };
  }

  render() {
    let elements = [];
    let elementsAdvanced = [];
    for (let propertyName in this.props.schema.properties) {
      if (this.props.schema.properties.hasOwnProperty(propertyName)) {
        if (this.props.ignoredProperties.indexOf(propertyName) !== -1) continue;
        let property = this.props.schema.properties[propertyName];
        let value = this.props.value == null ? null : this.props.value[propertyName];

        let element = (
          <UpCol key={propertyName} span={this.sizeSpan(property)}>
            <div
              style={{
                minHeight: 70,
                padding: "0 10px",
                display: property.hide === true ? "none" : "block"
              }}
            >
              <UpSchemaFormComponentSelector
                value={value}
                name={propertyName}
                showError={this.props.showError}
                isRequired={this.isRequired(propertyName)}
                key={propertyName}
                schema={property}
                node={this.props.node + "." + propertyName}
                onChange={this.props.onChange}
                ignoredProperties={this.props.ignoredProperties}
              />
            </div>
          </UpCol>
        );

        if (property.advanced === true) {
          elementsAdvanced.push(element);
        } else {
          elements.push(element);
        }
      }
    }

    return (
      <UpGrid>
        <UpRow gutter={3}>
          {this.props.withHR ? <hr /> : null}
          {this.props.schema.title == null || this.props.node === "" ? (
            ""
          ) : (
              <h4>{this.props.schema.title}</h4>
            )}
          {elements}
        </UpRow>
        {elementsAdvanced != null && elementsAdvanced.length != 0 ? (
          <UpRow>
            <UpRow gutter={2}>
              <UpCol span={24}>
                <div style={{ padding: "10px" }}>
                  <UpButton
                    iconPosition="right"
                    actionType={
                      this.state.showAdvanced === true
                        ? "caret-up"
                        : "caret-down"
                    }
                    intent="default"
                    onClick={() => {
                      this.setState({ showAdvanced: !this.state.showAdvanced });
                    }}
                  >
                    + de critères
                  </UpButton>
                </div>
              </UpCol>
            </UpRow>
            <UpRow gutter={0}>
              <div
                style={{
                  display: this.state.showAdvanced === true ? "block" : "none"
                }}
              >
                {elementsAdvanced}
              </div>
            </UpRow>
          </UpRow>
        ) : null}
      </UpGrid>
    );
  }

  private sizeSpan = (schema: JsonSchema) => {
    if (schema.hide === true) {
      return 0;
    }
    let type = JsonSchemaHelper.getBaseType(schema);
    if (type === "object" || type === "array") {
      return 24;
    }
    return 24;
  };

  isRequired(prop) {
    let required = false;
    if (this.props.schema.required != undefined) {
      required = this.props.schema.required.indexOf(prop) !== -1;
    }
    return required;
  }
}
