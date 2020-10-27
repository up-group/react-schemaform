import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpLoadingIndicator, UpRadio } from "@up-group-ui/react-controls";
import * as update from 'react-addons-update'
import _ = require('lodash');

export default class RadioField extends UpFormControl<number> {

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
            const valueOptions = this.state.extra.options || [];
            
            const textOptions = valueOptions.map(valueOption => {
                return Object.keys(valueOption).map(key => ({
                    title: properties[key].title,
                    value: valueOption[key]
                }));
            });

            return textOptions.map((textOption, index) => {
                const options = textOption.filter(option => option.title !== 'source');
                const descriminatorValue = groups && textOption.find(option => option.title === 'source').value;
                const selectedGroup = groups && groups.find(group => group.discriminator === descriminatorValue);

                return {
                    text: options,
                    value: valueOptions[index][valueSelector],
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

    componentDidMount() {
        const loadOptions = this.props.schema.optionsSource;
        if(loadOptions != null) {
            this.setState(update(this.state, { extra: { isDataFetching: { $set: true } } }));
            loadOptions().then((data) => {
                this.setState(update(this.state, { extra: { isDataFetching: { $set: false }, options: { $set: data }} }));
            }).catch(e => this.setState(update(this.state, { extra: { isDataFetching: { $set: false }, options: { $set: [] }}})))
        }
    }

    renderField() {
        const { name, additionalProps: { alignMode, displayMode }, isReadOnly } = this.props;
        const { value } = this.state;
        
        if(this.state.extra.isDataFetching) {
            return <UpLoadingIndicator isLoading={true} />
        }

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
                readonly = {isReadOnly && isReadOnly(this.props.name)}
            />
        )
    }
};