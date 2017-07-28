/// <reference path="./interfaces/JsonSchema.ts"/>
/// <reference path="./interfaces/UpReactComponent.ts"/>

import * as React from "react";
import UpSchemaFormComponentSelector from "./UpForm/UpSchemaFormComponentSelector";
import { UpFormControl } from "./UpForm/UpFormControl";
import ErrorMemory from "./UpForm/ErrorMemory";
import HelperMemory from "./helper/MemoryHelper";
import JsonSchemaHelper from "./helper/JsonSchemaHelper";
import { UpThemeProvider, UpDefaultTheme, UpPanel, UpBox, UpGrid } from "@up-group/react-controls";


export interface UpSchemaFormProps {
    initValue?: any;
    schema: string | JsonSchema;
    onFormPayload: (data: any, hasError: boolean) => void;
    showError: boolean;
}

export default class UpSchemaForm extends React.Component<UpSchemaFormProps, {}> {
    static defaultProps = {
        showError: true
    }

    private errorMemory = new ErrorMemory();

    constructor(p, c) {
        super(p, c);
        if (this.props.initValue != null) {
            this.state = this.props.initValue;
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps: UpSchemaFormProps) {
        if (nextProps.schema !== this.props.schema) {
            this.errorMemory = new ErrorMemory();
            this.setState({});
        }
        if (nextProps.initValue != this.props.initValue) {
            this.setState(this.props.initValue);
        }
    }

    render() {
        var schema: JsonSchema;

        if (this.props.schema == null) {
            return <span />
        } else if (typeof (this.props.schema) === "string") {
            schema = JsonSchemaHelper.parseSchema(this.props.schema as string);
        } else {
            schema = JsonSchemaHelper.flat(this.props.schema, this.props.schema.definitions, {});
        }

        if (schema == null || schema.type == null) {
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
        return (<UpThemeProvider theme={UpDefaultTheme}>
            <UpPanel title={schema.title}>
                <UpSchemaFormComponentSelector
                    initData={this.state}
                    isRequired={false}
                    schema={schema}
                    node={""}
                    onFormChange={this.onFormChange}
                    showError={this.props.showError}
                >
                </UpSchemaFormComponentSelector>
                <hr />
                {this.props.children}
            </UpPanel>
        </UpThemeProvider >
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


