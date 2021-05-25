import * as React from "react";
import UpFormGroup from "./UpFormGroup";
import UpSchemaArray from "./UpSchemaArray";
import UpSchemaObject from "./UpSchemaObject";
import ComponentRegistery from "./ComponentRegistery";
import JsonSchemaHelper from "../helper/JsonSchemaHelper";
import { JsonSchema } from "../interfaces/JsonSchema";
import { UpFormContextConsumer } from './UpFormContext';

export interface PropertyViewModel {
    order: number;
    colspan?: number;
    component?: string;
    name?: string;
    breakAfter?: boolean;
    additionalProps?: { [key: string]: any };
}

export interface UpSchemaFormComponentSelectorProps {
    value: any;
    values?: { [key: string]: any };
    schema: JsonSchema;
    node: string;
    name?: string;
    onChange: (
        e: React.ChangeEvent<any>,
        newValue: any,
        hasError: boolean,
        node: string
    ) => void;
    isRequired: boolean;
    showError: boolean;
    ignoredProperties?: string[];
    viewModels: PropertyViewModel[];
    translate: (text: string) => any;
    onSearchButtonClick?: (text: string) => any;
    isReadOnly?: (property: string) => boolean;
    hideEmptyTitle?: boolean;
}

export default class UpSchemaFormComponentSelector extends React.Component<
    UpSchemaFormComponentSelectorProps,
    {}
    > {
    constructor(p, c) {
        super(p, c);
        this.onElementChange = this.onElementChange.bind(this);
    }

    Component: { [key: string]: React.ComponentClass<any> } = {};

    Register(key: string, Component: React.ComponentClass<any>) {
        this.Component[key] = Component;
    }

    GetComponent(ComponentKey: string): React.ComponentClass<any> {
        return this.Component[ComponentKey];
    }

    private findGetParameter(parameterName) {
        var result = null,
            tmp = [];
        var items = location.search.substr(1).split("&");
        for (var index = 0; index < items.length; index++) {
            tmp = items[index].split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        }
        return result;
    }

    renderElement(parametersForm) {

        let { withFloatingLabel, type, defaultColspan, rowMinHeight } = parametersForm
        const floatingLabel = withFloatingLabel && this.props.schema.title
        const viewModel = this.props.viewModels && this.props.viewModels.find(viewModel => viewModel.name == this.props.name);
        const additionalProps = (viewModel && viewModel.additionalProps) || {};

        const { format } = this.props.schema;

        if (format == 'date' || format == 'date-time') {
            for (let prop in additionalProps) {
                if (additionalProps[prop] === 'today') {
                    additionalProps[prop] = new Date();
                }
            }
        }

        if(format == "entityKey" && type == "array") {
            type = "entityKey"
        }

        let element = null ;
        switch (type) {
            case "object":
                element = (
                    <UpSchemaObject
                        value={this.props.value}
                        showError={this.props.showError}
                        withHR={this.props.node !== ""}
                        isRequired={this.props.isRequired}
                        schema={this.props.schema}
                        node={this.props.node}
                        onChange={this.props.onChange}
                        ignoredProperties={this.props.ignoredProperties}
                        viewModels={this.props.viewModels}
                        translate={this.props.translate}
                        onSearchButtonClick={this.props.onSearchButtonClick}
                        isReadOnly={this.props.isReadOnly}
                        defaultColspan={defaultColspan}
                        hideEmptyTitle={this.props.hideEmptyTitle}
                        rowMinHeight={rowMinHeight}
                        {...additionalProps}
                    />
                );
                break;
            case "array":
                element = (
                    <UpSchemaArray
                        value={this.props.value}
                        name={this.props.name}
                        showError={this.props.showError}
                        isRequired={this.props.isRequired}
                        schema={this.props.schema}
                        onChange={this.onElementChange}
                        node={this.props.node}
                        ignoredProperties={this.props.ignoredProperties}
                        translate={this.props.translate}
                        onSearchButtonClick={this.props.onSearchButtonClick}
                        floatingLabel={floatingLabel}
                        isReadOnly={this.props.isReadOnly}
                        maxNumberOfValue={this.props.values.maxNumberOfValue}
                        {...additionalProps}
                    />
                );
                break;
            default:
                try {
                    element = ComponentRegistery.GetComponentInstance(
                        this.onElementChange,
                        this.props.isRequired,
                        this.props.schema,
                        this.props.showError,
                        this.props.value,
                        this.props.name,
                        this.props.translate,
                        this.props.onSearchButtonClick,
                        this.props.isReadOnly,
                        floatingLabel,
                        this.props.values,
                        additionalProps
                    );
                } catch(e) {
                    console.error(e);
                }
                break;
        }
        return element
    }

    render() {

        const parameters = this.props.node.split(".");
        if (parameters.length !== 0 && this.props.node !== "") {
            const parameter = this.findGetParameter(parameters[parameters.length - 1]);
            if (parameter != null) {
                this.props.schema.default = parameter;
                this.props.schema.readonly = true;
            }
        }

        const type = JsonSchemaHelper.getBaseType(this.props.schema);
        const format = this.props.schema.format || (this.props.schema.items && this.props.schema.items['format']);

        const viewModel = this.props.name && this.props.viewModels && this.props.viewModels.find(viewModel => viewModel.name == this.props.name);
        const { componentType } = (viewModel && viewModel.additionalProps) || {};

        return (
            <UpFormContextConsumer>
                {({ withFloatingLabel, defaultColspan, rowMinHeight }) => (
                    <UpFormGroup
                        isRequired={this.props.isRequired}
                        title={this.props.schema.title}
                        description={this.props.schema.description}
                        withFloatingLabel={(type === 'string' || format === 'enum' || type == "number" || type == "integer" || format === 'entityKey') && format !== 'multilineText' && withFloatingLabel && !componentType}
                    >
                        {this.renderElement({ withFloatingLabel, rowMinHeight, type, defaultColspan })}
                    </UpFormGroup>
                )}
            </UpFormContextConsumer>
        );
    }

    private onElementChange = (
        e: React.ChangeEvent<any>,
        value: any,
        hasError: boolean
    ) => {
        this.props.onChange(e, value, hasError, this.props.node);
    };
}
