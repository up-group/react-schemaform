
import * as React from "react";
import UpFormGroup from "./UpFormGroup"
import UpSchemaArray from "./UpSchemaArray"
import UpSchemaObject from "./UpSchemaObject"
import { UpFormControl } from "./UpFormControl"
import ComponentRegistery from "./ComponentRegistery"
import JsonSchemaHelper from "../helper/JsonSchemaHelper";


export interface UpSchemaFormComponentSelectorProps {
    schema: JsonSchema;
    node: string;
    onFormChange: (newValue: any, node: string) => void;
    onFormError: (node: string,hasError: boolean) => void;
    isRequired: boolean;
}

export default class UpSchemaFormComponentSelector extends React.Component<UpSchemaFormComponentSelectorProps, {}> {
    constructor(p, c) {        super(p, c);        this.onElementChange = this.onElementChange.bind(this);        this.onElementError = this.onElementError.bind(this);    }    Component: { [key: string]: React.ComponentClass<any> } = {};    Register(key: string, Component: React.ComponentClass<any>) {        this.Component[key] = Component;    }    GetComponent(ComponentKey: string): React.ComponentClass<any> {        return this.Component[ComponentKey];    }    private findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }    render() {
        var element = null;
        var isControl = true;
        var isArray = false;

        var parameters = this.props.node.split(".");
        if (parameters.length != 0) {
            var parameter = this.findGetParameter(parameters[parameters.length - 1]);
            if (parameter != null) {
                this.props.schema.default = parameter;
                this.props.schema.readonly = true;
            }
        }


        var type = JsonSchemaHelper.getBaseType(this.props.schema);
        switch (type) {
            case "object":
                element = <UpSchemaObject withHR={this.props.node !== ""} onFormError={this.props.onFormError} isRequired={this.props.isRequired} SchemaArg={this.props.schema} node={this.props.node} onFormChange={this.props.onFormChange} />
                isControl = false;
                break;
            case "array":
                element = <UpSchemaArray onError={this.onElementError} isRequired={this.props.isRequired} schema={this.props.schema} onChange={this.onElementChange} node={this.props.node} />
                isArray = true;
                break;
            default:
                element = ComponentRegistery.GetComponentInstance(this.onElementError, this.onElementChange, this.props.isRequired, this.props.schema);
                break;        }






        if (isControl) {
            //var typeStr = function (fun) {
            //    var ret = fun.toString();
            //    ret = ret.substr('function '.length);
            //    ret = ret.substr(0, ret.indexOf('('));
            //    return ret;
            //} (element.type);

            var colsize = 6
            //if (typeStr == "UpDate") {
            //    colsize = 3;
            //}

            return <UpFormGroup
                colSize={isArray ? 12 : colsize}
                isRequired={this.props.isRequired}
                title={this.props.schema.title}
                description={this.props.schema.description}
                >{element}</UpFormGroup >
        }
        return element;
    }


    private onElementChange = (arg) => {
        this.props.onFormChange(arg, this.props.node);
    }

    private onElementError = (hasError: boolean) => {
        this.props.onFormError(this.props.node, hasError);
    }

}
