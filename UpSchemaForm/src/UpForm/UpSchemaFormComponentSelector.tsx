
import * as React from "react";
import UpFormGroup from "./UpFormGroup"
import UpSchemaArray  from "./UpSchemaArray"
import UpSchemaObject  from "./UpSchemaObject"
import {UpFormControl} from "./UpFormControl"
import ComponentRegistery from "./ComponentRegistery"
import JsonSchemaHelper from "../JsonSchemaHelper";


interface UpSchemaFormComponentSelectorProps {
    schema: JsonSchema;
    node: string;
    onFormChange: (newValue: any, node: string) => void;
    onFormError: (node: string) => void;
    isRequired: boolean;
}

export default class UpSchemaFormComponentSelector extends React.Component<UpSchemaFormComponentSelectorProps, {}> {

    constructor(p, c) {
        super(p, c);
        this.onElementChange = this.onElementChange.bind(this);
        this.onElementError = this.onElementError.bind(this);
    }

    Component: { [key: string]: React.ComponentClass<any> } = {};

    Register(key: string, Component: React.ComponentClass<any>) {
        this.Component[key] = Component;
    }

    GetComponent(ComponentKey: string): React.ComponentClass<any> {
        return this.Component[ComponentKey];
    }

    render() {
        var element = null;
        var isControl = true;
        var isArray = false;

        var type = JsonSchemaHelper.getBaseType(this.props.schema);
        switch (type) {
            case "object":
                element = <UpSchemaObject withHR={this.props.node !== ""} onFormError={this.props.onFormError} isRequired={this.props.isRequired}  SchemaArg= { this.props.schema } node={this.props.node} onFormChange={this.props.onFormChange} />
                isControl = false;
                break;
            case "array":
                element = <UpSchemaArray onError={this.onElementError} isRequired={this.props.isRequired} schema= { this.props.schema } onChange={this.onElementChange} node={this.props.node} />
                isArray = true;
                break;
            default:
                debugger
                element = ComponentRegistery.GetComponentInstance(this.onElementError, this.onElementChange, this.props.isRequired, this.props.schema);
                break;
        }
        if (isControl) {
            return <UpFormGroup
                colSize={isArray ? 12 : 6}
                isRequired={this.props.isRequired}
                title= { this.props.schema.title}
                description= { this.props.schema.description}
                >{element}</UpFormGroup >
        }
        return element;
    }


    private onElementChange = (arg) => {
        this.props.onFormChange(arg, this.props.node);
    }

    private onElementError = () => {
        this.props.onFormError(this.props.node);
    }



}
