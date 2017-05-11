
import * as React from "react";
import UpFormGroup from "./UpFormGroup"
import UpSchemaArray from "./UpSchemaArray"
import UpSchemaObject from "./UpSchemaObject"
import { UpFormControl } from "./UpFormControl"
import ComponentRegistery from "./ComponentRegistery"
import JsonSchemaHelper from "../helper/JsonSchemaHelper";

import { UpPanel, UpBox, UpGrid, UpCol, UpRow } from "@up-group/react-controls";

export interface UpSchemaFormComponentSelectorProps {
    schema: JsonSchema;
    node: string;
    onFormChange: (newValue: any, hasError: boolean, node: string) => void;
    isRequired: boolean;
    showError: boolean;
}

export default class UpSchemaFormComponentSelector extends React.Component<UpSchemaFormComponentSelectorProps, {}> {
    constructor(p, c) {        super(p, c);        this.onElementChange = this.onElementChange.bind(this);    }    Component: { [key: string]: React.ComponentClass<any> } = {};    Register(key: string, Component: React.ComponentClass<any>) {        this.Component[key] = Component;    }    GetComponent(ComponentKey: string): React.ComponentClass<any> {        return this.Component[ComponentKey];    }    private findGetParameter(parameterName) {
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
                element = <UpSchemaObject showError={this.props.showError} withHR={this.props.node !== ""} isRequired={this.props.isRequired} SchemaArg={this.props.schema} node={this.props.node} onFormChange={this.props.onFormChange} />
                isControl = false;
                break;
            case "array":
                element = <UpSchemaArray showError={this.props.showError} isRequired={this.props.isRequired} schema={this.props.schema} onChange={this.onElementChange} node={this.props.node} />
                isArray = true;
                break;
            default:
                element = ComponentRegistery.GetComponentInstance(this.onElementChange, this.props.isRequired, this.props.schema, this.props.showError);
                break;        }






        if (isControl) {
            //var typeStr = function (fun) {
            //    var ret = fun.toString();
            //    ret = ret.substr('function '.length);
            //    ret = ret.substr(0, ret.indexOf('('));
            //    return ret;
            //} (element.type);

            //if (typeStr == "UpDate") {
            //    colsize = 3;
            //}

            return <UpFormGroup
                isRequired={this.props.isRequired}
                title={this.props.schema.title}
                description={this.props.schema.description}
            >{element}</UpFormGroup >

        }
        return element;
    }


    private onElementChange = (arg: any, hasError: boolean) => {
        this.props.onFormChange(arg, hasError, this.props.node);
    }

}
