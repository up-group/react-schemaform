/// <reference path="./interfaces/JsonSchema.ts"/>
/// <reference path="./interfaces/UpReactComponent.ts"/>

import * as React from "react";
import UpSchemaFormComponentSelector from "./UpForm/UpSchemaFormComponentSelector";
import { UpFormControl } from "./UpForm/UpFormControl";
import ErrorMemory from "./UpForm/ErrorMemory";
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
        showError: true,
        initValue: {}
    }

    private errorMemory = new ErrorMemory();
    constructor(p, c) {
        super(p, c);
        if (this.props.initValue != null) {
            this.state = this.props.initValue;
        } else {
            this.state = {};
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps: UpSchemaFormProps) {
        if (nextProps.schema !== this.props.schema) {
            this.errorMemory = new ErrorMemory();
            this.setState({});
        }
        if (nextProps.initValue != null) {
            this.setState(nextProps.initValue);
        } else {
            this.setState({});
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
                    initData={JSON.parse(JSON.stringify(this.state))}
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

        this.addToQueue(this.state, nodeArray, newValue);

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




    private inQueue = false;
    private assingDataOrder: { obj: any, nodes: any, value: any }[] = [];

    private AssignValue(obj, nodes, value) {
        var data = obj != null ? JSON.parse(JSON.stringify(obj)) : {};
        var prop = nodes.shift();
        if (nodes.length === 0) {
            data[prop] = value;
            return data;
        } else if (data.hasOwnProperty(prop) && typeof (data[prop]) === "object") {
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data;
        } else if (data.hasOwnProperty(prop) === false) {
            data[prop] = {}
            data[prop] = this.AssignValue(data[prop], nodes, value);
            return data
        }
    }

    addToQueue = (obj, nodes, value) => {
        this.assingDataOrder.push({ obj: obj, nodes: nodes, value: value });
        if (this.inQueue === false) {
            this.checkQueue();
        }
    }

    private checkQueue = () => {
        var a = this.assingDataOrder[0];
        this.inQueue = true;
        this.setState(this.AssignValue(a.obj, a.nodes, a.value), () => {
            this.assingDataOrder.shift();
            if (this.assingDataOrder.length == 0) {
                this.updateState()
                this.inQueue = false;
            } else {
                this.assingDataOrder[0].obj = this.state;
                this.checkQueue();
            }
        });
    }

    
}


