/// <reference path="./interfaces/JsonSchema.d.ts"/>
/// <reference path="./interfaces/UpReactComponent.d.ts"/>

import * as React from "react";
import UpSchemaFormComponentSelector from "./UpForm/UpSchemaFormComponentSelector";
import { UpFormControl } from "./UpForm/UpFormControl";
import ErrorMemory from "./UpForm/ErrorMemory";
import HelperMemory from "./helper/MemoryHelper";
import { UpPanel, UpBox, UpGrid } from "@up-group/react-controls";


export interface UpSchemaFormProps {
    schema: JsonSchema;
    onFormPayload: (data: any, hasError: boolean) => void;
    showError: boolean;
}

export default class UpSchemaForm extends React.Component<UpSchemaFormProps, {}> {
    static defaultProps = {
        showError: true
    }

    errorMemory = new ErrorMemory();

    constructor(p, c) {
        super(p, c);
    }

    componentDidMount() {
    }

    render() {
        if (this.props.schema.type === undefined) {
            return (
                <div className="panel panel-default">
                    <div className="panel-heading">
                    </div>
                    <div className="panel-body">
                    </div>
                    <div className="panel-footer">
                        {this.props.children}
                    </div>
                </div>
            );
        }
        return (
            <UpPanel title={this.props.schema.title}>

                <UpSchemaFormComponentSelector
                    isRequired={false}
                    schema={this.props.schema}
                    node={""}
                    onFormChange={this.onFormChange}
                    showError={this.props.showError}
                >
                </UpSchemaFormComponentSelector>


                <hr />
                {this.props.children}
            </UpPanel>
        );
    }

    //onFormError = (node: string, hasError: boolean) => {
    //    this.errorMemory.errorOn(node, hasError);
    //    this.props.onFormEror(this.errorMemory.hasError);

    //}

    onFormChange = (newValue: any, hasError: boolean, node: string) => {
        this.errorMemory.errorOn(node, hasError);

        var nodeArray = node.split(".");
        nodeArray.shift();

        this.setState(HelperMemory.AssignValue(this.state, nodeArray, newValue), () => {
            this.updateState();
        });

    }

    updateState() {
        this.props.onFormPayload(this.state, this.errorMemory.hasError);
    }

    private newObject(nodes, value) {
        var obj = {};
        var prop = nodes.shift();
        if (nodes.length == 0) {
            obj[prop] = value;
        } else {
            obj[prop] = this.newObject(nodes, value);
        }
        return obj;

    }


}


