import * as React from "react";

import ComponentRegistery from "./ComponentRegistery";

import UpSchemaFormComponentSelector, {
    PropertyViewModel
} from "./UpSchemaFormComponentSelector";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaObject from "./UpSchemaObject";
import ErrorMemory from "./ErrorMemory";
import { JsonSchema } from "../interfaces/JsonSchema";

import { eventFactory, UpGrid } from "@up-group-ui/react-controls";

export interface UpSchemaArrayProps {
    schema: JsonSchema;
    name?: string;
    onChange: (e: React.ChangeEvent<any>, value: any, hasError: boolean) => void;
    isRequired: boolean;
    node: string;
    showError;
    value: any;
    ignoredProperties: string[];
    viewsModel: PropertyViewModel[];
    translate: (text: string) => any;
    onSearchButtonClick: (text: string) => any;
    floatingLabel?: string;
    isReadOnly?: (property: string) => boolean;
    maxInputToGenerate?: number
}

export interface UpSchemaArrayState {
    items: Item[];
}

export default class UpSchemaArray extends React.Component<
    UpSchemaArrayProps,
    UpSchemaArrayState
    > {
    constructor(p, c) {
        super(p, c);
        this.state = { items: [] };
    }
    render() {
        var schema: JsonSchema = this.props.schema.items as JsonSchema;

        if (this.props.schema.referenceTo) {
            return this.props.schema.getEntitySelector((data, error) => this.props.onChange(eventFactory("", data), data, error))
        }
        var comp = ComponentRegistery.GetComponentBySchema(schema);

        if (comp != null && comp.array === true) {
            return ComponentRegistery.GetComponentInstanceByKey(
                comp.key,
                this.props.onChange,
                this.props.isRequired,
                this.props.schema,
                this.props.showError,
                this.props.value,
                this.props.floatingLabel,
                this.props.isReadOnly
            );
        }

        var items = this.state.items.map((item, index, array) => {
            var type = JsonSchemaHelper.getBaseType(schema);
            var elements = [];
            switch (type) {
                case "object":
                    elements.push((
                        <UpSchemaObject
                            value={null}
                            showError={this.props.showError}
                            withHR={index !== 0}
                            isRequired={this.props.isRequired}
                            schema={schema}
                            node={""}
                            onChange={item.onChange}
                            ignoredProperties={this.props.ignoredProperties}
                            viewModels={this.props.viewsModel}
                            translate={this.props.translate}
                            onSearchButtonClick={this.props.onSearchButtonClick}
                            isReadOnly={this.props.isReadOnly}
                        />
                    ));
                    break;
                //case "array":
                //    element = <UpSchemaArray
                //        node={""}
                //        onError={null}
                //        isRequired={this.props.isRequired}
                //        schema= { schema}
                //        onChange={value.oc} />
                //    break;
                default:
                    let values = this.props.value != null ? this.props.value : [];

                    values.forEach((value, indexField) => {
                        elements.push(ComponentRegistery.GetComponentInstance(
                            this.onItemChange.bind(this, indexField),
                            this.props.isRequired,
                            schema,
                            this.props.showError,
                            value,
                            `${this.props.name}_${indexField}`,
                            this.props.translate,
                            this.props.onSearchButtonClick,
                            this.props.isReadOnly
                        ));
                    });

                    elements.push(ComponentRegistery.GetComponentInstance(
                        this.onItemChange.bind(this, values.length),
                        this.props.isRequired,
                        schema,
                        this.props.showError,
                        null,
                        `${this.props.name}_${values.length}`,
                        this.props.translate,
                        this.props.onSearchButtonClick,
                        this.props.isReadOnly
                    ));

                    break;
            }

            return <div key={index} style={{
                display: 'flex', width: '100%', flexDirection: 'column'
            }}>{elements.map(element => element)}</div>;
        });

        return (
            <div
                style={{
                    borderRadius: "4px",
                    padding: "5px",
                    border: "1px solid #f4f4f4"
                }}
            >
                {items}
                <br />
                <span className="btn-group">
                    <button className="btn btn-default"
                        disabled={this.props.value.length + 1 >= this.props.maxInputToGenerate}
                        onClick={this.addOnElement}>
                        <span className="glyphicon glyphicon-plus" />Add
                    </button>
                    <button
                        className="btn btn-default"
                        disabled={this.props.value.length + 1 <= 1}
                        onClick={this.RemoveOnElement}
                    >
                        <span className="glyphicon glyphicon-minus" />remove
                    </button>
                </span>
            </div>
        );
    }

    componentDidMount() {
        this.AddElement();
    }

    AddElement = () => {
        // var items = this.state.items;
        // items.push(new Item(this.onItemChange));
        this.setState({ items: this.props.value });
    };


    addOnElement = () => {
        var values = [...this.props.value] || [];
        values.push("")
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    }

    RemoveOnElement = () => {
        var values = [...this.props.value] || [];
        values.pop()
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };

    onItemChange = (index, event, value) => {
        if (value > 31 || value < 1) {
            this.props.onChange(eventFactory(this.props.name, this.props.value), this.props.value, null);
            return;
        }

        var values = this.props.value || [];
        values[index] = value
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };
}

export class Item {
    value = null;
    errorMemory = new ErrorMemory();
    error = false;
    constructor(public onItemChange) { }

    onChange = (e: React.ChangeEvent<any>, value, hasError: boolean, t?: string) => {
        if (t !== undefined) {
            if (this.value === null) {
                this.value = {};
            }
            this.errorMemory.cleanErrorOn(t);
            this.value[t.split(".")[1]] = value;

            if (this.errorMemory.hasError === false) {
                this.onItemChange();
            }
        } else {
            this.error = hasError;
            this.value = value;
            this.onItemChange();
        }
    };
}
