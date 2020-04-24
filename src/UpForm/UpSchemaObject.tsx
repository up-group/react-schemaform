import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";

import UpSchemaFormComponentSelector, {
  PropertyViewModel
} from "./UpSchemaFormComponentSelector";
import {
  UpSvgIcon,
  UpButton,
  UpPanel,
  UpBox,
  UpGrid,
  UpCol,
  UpRow
} from "@up-group-ui/react-controls";
import {style} from 'typestyle'
import { UpFormContextConsumer } from './UpFormContext';

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
  viewModels: PropertyViewModel[];
  translate: (text: string) => any;
  onSearchButtonClick?: (text: string) => any;
}

export interface UpSchemaObjectState {
  showAdvanced: boolean;
}


const getStyles = (props) => {
  const { columnSpacing, columnNumber, rowSpacing } = props;
  return style({
    display: "grid",
    gridTemplateColumns: `repeat(${columnNumber},${
      (100 - columnSpacing * columnNumber) / columnNumber
    }%)`,
    alignItems: "center",

    gridColumnGap: `${columnSpacing}%`,
    gridRowGap: `${rowSpacing}px`,
    $nest: {
      "& .grid-element": {
        alignSelf: "center",
      },
    },
  });
};

function compareItems<T extends { order: number }>(a: T, b: T): number {
  if (a.order > b.order) return 1;
  if (a.order === b.order) return 0;
  return -1;
}

export function groupByRow<T extends { colspan: number; order: number }>(
  items: T[]
): T[][] {
  let usedColSpan = 0;
  const rows = items
    .sort(compareItems)
    .reduce((rows: T[][], configuration: T) => {
      usedColSpan += configuration.colspan;
      let currentRow: T[];
      if (rows.length === 0) {
        currentRow = [];
        rows.push(currentRow);
      } else {
        currentRow = rows[rows.length - 1];
      }
      if (usedColSpan > 24) {
        currentRow = [];
        rows.push(currentRow);
        usedColSpan = configuration.colspan;
      }
      currentRow.push(configuration);
      return rows;
    }, []);
  return rows;
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

  private isIgnored(propertyName: string): boolean {
    return (
      this.props.ignoredProperties != null &&
      this.props.ignoredProperties.indexOf(propertyName) !== -1
    );
  }

  render() {
    const rows = groupByRow(
      this.props.viewModels.filter(
        a => !this.isIgnored(a.name)
      )
    );

    Object.keys(this.props.schema.properties)
      .filter(
        a =>!this.isIgnored(a) && !this.props.schema.properties[a].hide
      )
      .forEach(a => {
        if (!this.props.viewModels.some(pc => pc.name === a)) {
          rows.push([
            {
              colspan: 24,
              name: a,
              order: rows.length
            }
          ]);
        }
      });

    let elements = {};
    let elementsAdvanced = [];
    for (let propertyName in this.props.schema.properties) {
      if (this.props.schema.properties.hasOwnProperty(propertyName)) {
        let property = this.props.schema.properties[propertyName];
        if (this.isIgnored(propertyName) || property.hide) continue;

        let value =
          this.props.value == null ? null : this.props.value[propertyName];

        let element = (
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
              viewModels={this.props.viewModels}
              translate={this.props.translate}
              onSearchButtonClick={this.props.onSearchButtonClick}
            />
          </div>
        );

        if (property.advanced === true) {
          elementsAdvanced.push(element);
        } else {
          elements[propertyName] = element;
        }
      }
    }
    return (
      <UpFormContextConsumer>
        {({columnNumber,columnSpacing,rowSpacing}) => (
          <div className={getStyles({columnNumber,columnSpacing,rowSpacing})}>
            {rows.map((row, i) => {
              return row.map((p, index) => {
                return (
                  <div key={index} className="grid-element">
                    {this.props.withHR ? <hr /> : null}
                    {this.props.schema.title == null ||
                    this.props.node === "" ? (
                      ""
                    ) : (
                      <h4>{this.props.schema.title}</h4>
                    )}
                    {elements[p.name]}
                  </div>
                );
              });
            })}
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
                          this.setState({
                            showAdvanced: !this.state.showAdvanced,
                          });
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
                      display:
                        this.state.showAdvanced === true ? "block" : "none",
                    }}
                  >
                    {elementsAdvanced}
                  </div>
                </UpRow>
              </UpRow>
            ) : null}
          </div>
        )}
      </UpFormContextConsumer>
    );}

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
