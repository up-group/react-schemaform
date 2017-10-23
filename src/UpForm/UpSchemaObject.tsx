
import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector"
import { UpSvgIcon, UpButton, UpPanel, UpBox, UpGrid, UpCol, UpRow } from "@up-group/react-controls";

export interface UpSchemaObjectProps {
    initData: any;
    withHR: boolean;
    SchemaArg: JsonSchema;
    node: string;
    onFormChange: (newValue: any, hasError: boolean, node: string) => void;
    isRequired: boolean;
    showError: boolean;
}

export interface UpSchemaObjectState {
    showAdvanced: boolean;
}

export default class UpSchemaObject extends React.Component<UpSchemaObjectProps, UpSchemaObjectState>  {

    constructor(p, c) {        super(p, c);
        this.state = {
            showAdvanced: false
        }
    }

    render() {
        var elements = [];        var elementsAdvanced = [];        for (var propertyName in this.props.SchemaArg.properties) {
            if (this.props.SchemaArg.properties.hasOwnProperty(propertyName)) {

                var property = this.props.SchemaArg.properties[propertyName];
                var value = this.props.initData == null ? undefined : this.props.initData[propertyName];

                var element = <UpCol key={propertyName} span={this.sizeSpan(property)}>
                    <div style={{ minHeight: 70, padding: "0 10px", display: property.hide === true ? "none" : "block" }}>
                        <UpSchemaFormComponentSelector
                            initData={value}
                            showError={this.props.showError}
                            isRequired={this.isRequired(propertyName)}
                            key={propertyName}
                            schema={property}
                            node={this.props.node + '.' + propertyName}
                            onFormChange={this.props.onFormChange}
                        />
                    </div>
                </UpCol>

                if (property.advanced === true) {
                    elementsAdvanced.push(element);
                } else {
                    elements.push(element);
                }
            }
        }

        return <UpGrid >
            <UpRow gutter={2} >
                {this.props.withHR ? <hr /> : null}
                {this.props.SchemaArg.title == null || this.props.node === "" ? "" : <h4>{this.props.SchemaArg.title}</h4>}
                {elements}

            </UpRow>
            {
                elementsAdvanced != null && elementsAdvanced.length != 0 ?
                    <UpRow >
                        <UpRow gutter={2} >
                            <UpCol span={24}>
                                <div style={{ padding: "10px" }}>
                                    <UpButton iconPosition="right" actionType={this.state.showAdvanced === true ? "caret-up" : "caret-down"} intent="default" onClick={() => { this.setState({ showAdvanced: !this.state.showAdvanced }) }}  >
                                        + de critères
                                    </UpButton>
                                </div>
                            </UpCol>
                        </UpRow>
                        <UpRow gutter={0} >
                            <div style={{ display: this.state.showAdvanced === true ? "block" : "none" }}>
                                {elementsAdvanced}
                            </div>
                        </UpRow>
                    </UpRow>
                    : null
            }
        </UpGrid>
    }
    private sizeSpan = (schema: JsonSchema) => {        if (schema.hide === true) {
            return 0;
        }        var type = JsonSchemaHelper.getBaseType(schema);
        if (type === "object") {
            return 24;
        };
        return 12;
    }    isRequired(prop) {        var required = false;        if (this.props.SchemaArg.required != undefined) {            required = this.props.SchemaArg.required.indexOf(prop) !== -1;        }        return required;    }}