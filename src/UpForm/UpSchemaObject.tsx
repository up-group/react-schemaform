
import * as React from "react";
import UpSchemaFormComponentSelector from "./UpSchemaFormComponentSelector"

interface UpSchemaObjectProps {
    withHR: boolean;
    SchemaArg: JsonSchema;
    node: string;
    onFormChange: (newValue: any, node: string) => void;
    onFormError: (node: string) => void;
    isRequired: boolean;
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
            return (<UpSchemaFormComponentSelector
                isRequired={this.isRequired(propertiesName[index]) }
                key={index}
                schema={property}
                node={this.props.node + '.' + propertiesName[index]}
                onFormChange={this.props.onFormChange}
                onFormError={this.props.onFormError}
                />)
        });
        return <div className="col-md-12">
            {this.props.withHR ? <hr/> : null}
            {this.props.SchemaArg.title == null || this.props.node === "" ? "" : <h4>{this.props.SchemaArg.title}</h4>}
            <div className="row">{elements}</div>
        </div>
    }
    isRequired(prop) {        var required = false;        if (this.props.SchemaArg.required != undefined) {            required = this.props.SchemaArg.required.indexOf(prop) !== -1;        }        if (required === false) {            required = this.props.SchemaArg.properties[prop].type.indexOf("null") === -1 && this.props.SchemaArg.properties[prop].default != null;        }        return required;    }}