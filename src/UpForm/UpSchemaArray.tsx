import * as React from "react";

import ComponentRegistery from "./ComponentRegistery";

import UpSchemaFormComponentSelector, {
    PropertyViewModel
} from "./UpSchemaFormComponentSelector";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import UpSchemaObject from "./UpSchemaObject";
import ErrorMemory from "./ErrorMemory";
import { JsonSchema } from "../interfaces/JsonSchema";

import { eventFactory, UpGrid, UpButtonGroup, UpButton } from "@up-group-ui/react-controls";
import * as _ from 'lodash';
import { style } from 'typestyle';

const layoutItems = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexWrap: 'wrap'
});

const contentArray = style({ 
    padding: '0 5px', 
    display: 'flex'
});

const preSuFixStyle = style({
    fontSize: '0.8rem',
    padding: '6px 6px 12px',
});

export interface UpSchemaArrayProps {
    schema: JsonSchema;
    name?: string;
    onChange: (e: React.ChangeEvent<any>, value: any, hasError: boolean) => void;
    isRequired: boolean;
    node: string;
    showError;
    value: any;
    ignoredProperties: string[];
    translate: (text: string) => any;
    onSearchButtonClick: (text: string) => any;
    floatingLabel?: string;
    isReadOnly?: (property: string) => boolean;
    maxNumberOfValue?: number
    maxValue?: number;
    minValue?: number;
    preffixText?: string;
    suffixText?: string;
    itemWidth?:string;
    componentType?: string
}

export interface UpSchemaArrayState {
    items: Item[];
}

function isValuesFill(values, maxNumberOfValue): boolean {
    return values && values.length == maxNumberOfValue && !values.some(value => _.isEmpty(value));
}

export default class UpSchemaArray extends React.Component<
    UpSchemaArrayProps,
    UpSchemaArrayState
    > {
    
    static defaultProps = {
        itemWidth : 'auto',
    }    
        
    constructor(p, c) {
        super(p, c);
        this.state = { items: [] };
    }
    render() {
        let schema: JsonSchema = this.props.schema.items as JsonSchema;

        if (this.props.schema.referenceTo) {
            return this.props.schema.getEntitySelector((data, error) => this.props.onChange(eventFactory("", data), data, error))
        }
        
        let elementWrapper = style({
            width : this.props.itemWidth
        });

        var comp = ComponentRegistery.GetComponentBySchema(schema, this.props.componentType);

        if (comp != null && comp.array === true) {
            // TODO : clarify the usage of the property array of a component
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

        let items = this.state.items.map((item, index, array) => {
            let type = JsonSchemaHelper.getBaseType(schema);
            let elements = [];
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
                            onChange={() => null}
                            ignoredProperties={this.props.ignoredProperties}
                            viewModels={[]}
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

                    if (!isValuesFill(values, this.props.maxNumberOfValue)) {
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
                    }

                    break;
            }

            return <div key={index} className={layoutItems}>
                {elements.map(element =>
                    <div className={contentArray}>
                        {this.props.preffixText && <div className={preSuFixStyle}>{this.props.preffixText}</div>}
                        <div className={elementWrapper}>{element}</div>
                        {this.props.suffixText && <div className={preSuFixStyle}>{this.props.suffixText}</div>}
                    </div>
                )}
            </div>;
        });

        return (
            <div
                style={{
                    padding: "5px",
                    // borderRadius: "4px",
                    // border: "1px solid #f4f4f4"
                }}
            >
                {items}
                <br />
                <UpButtonGroup gutter={1} align={"h"}>
                    <UpButton
                        intent={'primary'}
                        width={"icon"}
                        actionType="add"
                        disabled={this.props.value && this.props.value.length + 1 >= this.props.maxNumberOfValue}
                        onClick={this.addElement}>
                    </UpButton>
                    <UpButton
                        intent={'primary'}
                        width={"icon"}
                        actionType="minus"
                        disabled={this.props.value && this.props.value.length + 1 <= 1}
                        onClick={this.removeElement}
                    >
                    </UpButton>
                </UpButtonGroup>
            </div>
        );
    }

    componentDidMount() {
        let items = [...this.state.items];
        items.push(new Item(this.onItemChange));
        this.setState({ items });
    }

    addElement = () => {
        let values = [...this.props.value] || [];
        values.push("")
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    }

    removeElement = () => {
        let values = [...this.props.value] || [];
        values.pop()
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };

    onItemChange = (index, event, value) => {
        if (value === '' && index === (this.props.value || []).length) {
            return;
        }

        const parsedValue = typeof value === 'number' ? value : parseInt(value);//TEMP

        if (parsedValue > this.props.maxValue || parsedValue < this.props.minValue) {
            this.props.onChange(eventFactory(this.props.name, this.props.value), this.props.value, null);
            return;
        }

        let values = this.props.value || [];
        values[index] = value
        values = values.filter(value => !_.isEmpty(value))
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
