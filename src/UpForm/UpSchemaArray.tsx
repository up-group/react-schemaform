import * as React from 'react';
import ComponentRegistery from './ComponentRegistery';
import JsonSchemaHelper from '../helper/JsonSchemaHelper';
import UpSchemaObject from './UpSchemaObject';
import { JsonSchema } from '../interfaces/JsonSchema';
import { eventFactory, UpGrid, UpButtonGroup, UpButton } from '@up-group-ui/react-controls';
import * as _ from 'lodash';
import { style, stylesheet } from 'typestyle';

const componentStyle = stylesheet({
    wrapper: {
        display: 'flex',
        position: 'relative',
        top: '-5px'
    },
    layoutItems: {
        marginRight: '35px'
    },
    content: {
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap'
    },
    preFixItem: {
        marginRight: '7px'
    },
    suFixItem: {
        marginLeft: '7px'
    }
});

const isEmptyValue = value => {
    return value === undefined || value === null || isNaN(value) || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
};

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
    maxNumberOfValue?: number;
    maxValue?: number;
    minValue?: number;
    preffixText?: string;
    suffixText?: string;
    itemWidth?: string;
    componentType?: string
};

export interface UpSchemaArrayState {
    items: (string | number)[];
};

export default class UpSchemaArray extends React.Component<UpSchemaArrayProps, UpSchemaArrayState> {

    static defaultProps = {
        itemWidth: 'auto',
    }

    constructor(p, c) {
        super(p, c);
        this.state = {
            items: (this.props.value && [
                ...this.props.value,
                ...(this.props.value.length === this.props.maxNumberOfValue ? [] : [''])
            ]) || [1, '']
        };
    }

    render() {
        let schema: JsonSchema = (this.props.schema.items as JsonSchema) || this.props.schema;

        if (this.props.schema.referenceTo) {
            return this.props.schema.getEntitySelector((data, error) => this.props.onChange(eventFactory('', data), data, error))
        }

        let elementWrapper = style({
            width: this.props.itemWidth
        });

        let comp = ComponentRegistery.GetComponentBySchema(schema, this.props.componentType);

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
                case 'object':
                    elements.push((
                        <UpSchemaObject
                            value={null}
                            showError={this.props.showError}
                            withHR={index !== 0}
                            isRequired={this.props.isRequired}
                            schema={schema}
                            node={''}
                            onChange={() => null}
                            ignoredProperties={this.props.ignoredProperties}
                            translate={this.props.translate}
                            onSearchButtonClick={this.props.onSearchButtonClick}
                            isReadOnly={this.props.isReadOnly}
                        />
                    ));
                    break;
                default:
                    elements.push(ComponentRegistery.GetComponentInstance(
                        this.onItemChange.bind(this, index),
                        this.props.isRequired,
                        schema,
                        this.props.showError,
                        this.state.items[index],
                        `${this.props.name}_${index}`,
                        this.props.translate,
                        this.props.onSearchButtonClick,
                        this.props.isReadOnly
                    ));
                    break;
            }

            return <div key={index} className={componentStyle.layoutItems}>
                {elements.map(element =>
                    <div className={componentStyle.content}>
                        {this.props.preffixText && <div className={componentStyle.preFixItem}>{this.props.preffixText}</div>}
                        <div className={elementWrapper}>{element}</div>
                        {this.props.suffixText && <div className={componentStyle.suFixItem}>{this.props.suffixText}</div>}
                    </div>
                )}
            </div>;
        });

        return (
            <div className={componentStyle.wrapper}>
                {items}
                <br />
                <UpButtonGroup gutter={1} align={'h'}>
                    <UpButton
                        intent={'primary'}
                        width={'icon'}
                        actionType='add'
                        disabled={this.state.items.length && this.state.items.length >= this.props.maxNumberOfValue}
                        onClick={this.addElement}>
                    </UpButton>
                    <UpButton
                        intent={'primary'}
                        width={'icon'}
                        actionType='minus'
                        disabled={this.state.items.length && this.state.items.length <= 1}
                        onClick={this.removeElement}
                    >
                    </UpButton>
                </UpButtonGroup>
            </div>
        );
    }

    addElement = () => {
        let values = this.state.items;
        if (values.some(value => isEmptyValue(value) || value === this.props.maxValue)) return;

        this.setState({
            items: [...values, this.nextValue(values)]
        });
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };

    removeElement = () => {
        let values = this.state.items.slice(0, -1);
        this.setState({
            items: values
        });
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };

    onItemChange = (index, event, value) => {
        let parsedValue = typeof value === 'number' ? value : parseInt(value);
        let values = this.state.items;

        if (values.includes(parsedValue)) 
            return;

        if (parsedValue > this.props.maxValue || parsedValue < this.props.minValue) {
            this.props.onChange(eventFactory(this.props.name, values), values, null);
            return;
        }

        values[index] = parsedValue;
        values = values.filter(valueToCheck => !isEmptyValue(valueToCheck));
        this.props.onChange(eventFactory(this.props.name, values), values, null);
    };

    nextValue = (items): number => {
        const values = items.map(item => parseInt(item)).filter(item => !Number.isNaN(item));
        const maxValue = Math.max(...values);
        return (maxValue + 1);
    };
}
