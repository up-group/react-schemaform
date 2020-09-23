import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpRadio } from "@up-group-ui/react-controls";
import _ = require('lodash');

export default class RadioField extends UpFormControl<number> {

    getOptionsValues = () => {
        return this.props.schema.optionsSource();
    }

    setOptions = () => {
        const {
            enumDescriptions,
            enum: enumValues,
            optionsSchema: { properties } = {},
            valueSelector,
            groupingInfo: { groups } = {}
        } = this.props.schema;

        const { multipleDescriptionLabels } = this.props.additionalProps;

        if (properties && multipleDescriptionLabels) {
            const valuesOptions = this.getOptionsValues();
            const textsOptions = valuesOptions.map(valueOption => {
                return Object.keys(valueOption).map(key => ({
                    title: properties[key].title,
                    value: valueOption[key]
                }));
            });

            return textsOptions.map((textOption, index) => {
                const options = textOption.filter(option => option.title !== 'source');
                const descriminatorValue = groups && textOption.find(option => option.title === 'source').value;
                const selectedGroup = groups && groups.find(group => group.discriminator === descriminatorValue);

                return {
                    text: options,
                    value: valuesOptions[index][valueSelector],
                    ...(groups && { additionalData: { value: selectedGroup.title, color: selectedGroup.color } })
                }
            });
        }
        else {
            return enumDescriptions.map((currentElement, index) => ({
                text: currentElement,
                value: enumValues[index].toString(),
            }));
        }
    }

    convertValueFromStringToInt = (value: string): string => {
        if (!value) return null;

        const indexOfEnumValue = this.props.schema.enumNames.indexOf(value);
        if (indexOfEnumValue != -1) {
            return this.props.schema.enum[indexOfEnumValue].toString();
        }
        return value;
    }

    renderField() {
        const { name, additionalProps: { alignMode, displayMode }, isReadOnly } = this.props;
        const { value } = this.state;

        return (
            <UpRadio
                flexWrap
                gutter={10}
                alignMode={alignMode ? alignMode : 'horizontal'}
                name={name}
                value={this.convertValueFromStringToInt(value && value.toString())}
                onChange={this.handleChangeEventGlobal}
                options={this.setOptions()}
                displayMode={displayMode ? displayMode : 'normal'}
                readonly = {this.props.isReadOnly && this.props.isReadOnly(this.props.name)}
            />
        )
    }
};