
import * as React from "react";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector"
import { UpPanel, UpBox, UpGrid, UpCol, UpRow } from "@up-group/react-controls";

export interface UpSchemaObjectProps {
    withHR: boolean;
    SchemaArg: JsonSchema;
    node: string;
    onFormChange: (newValue: any, hasError: boolean, node: string) => void;
    isRequired: boolean;
    showError: boolean;
}

export default class UpSchemaObject extends React.Component<UpSchemaObjectProps, {}>  {

    constructor(p, c) {        super(p, c);
    }

    render() {
        var properties = [];
        var propertiesName = [];
        for (var index in this.props.SchemaArg.properties) {
            if (this.props.SchemaArg.properties.hasOwnProperty(index)) {
                properties.push(this.props.SchemaArg.properties[index]);
                propertiesName.push(index);
            }
        }
        var elements = properties.map((property, index) => {
            return (<UpCol key={index} span={this.sizeSpan(property)}><UpSchemaFormComponentSelector
                showError={this.props.showError}
                isRequired={this.isRequired(propertiesName[index])}
                key={index}
                schema={property}
                node={this.props.node + '.' + propertiesName[index]}
                onFormChange={this.props.onFormChange}
            /></UpCol>)
        });
        return <UpGrid >
            <UpRow gutter={2} >
                {this.props.withHR ? <hr /> : null}
                {this.props.SchemaArg.title == null || this.props.node === "" ? "" : <h4>{this.props.SchemaArg.title}</h4>}
                {elements}
            </UpRow>
        </UpGrid>

    }
    private sizeSpan = (schema: JsonSchema) => {        var type = JsonSchemaHelper.getBaseType(schema);
        if (type === "object") {
            return 24;
        };
        return 12;
    }    isRequired(prop) {        var required = false;        if (this.props.SchemaArg.required != undefined) {            required = this.props.SchemaArg.required.indexOf(prop) !== -1;        }        if (required === false) {            required = (this.props.SchemaArg.properties[prop].type as TypeOfSchema[]).indexOf("null") === -1 && this.props.SchemaArg.properties[prop].default != null;        }        return required;    }}