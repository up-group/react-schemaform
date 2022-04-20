import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpLoadingIndicator, UpRadio } from "@up-group-ui/react-controls";
import * as update from 'react-addons-update'
import _ = require('lodash');

export default class RadioField extends UpFormControl<number, {}> {

    setOptions = () => {
        const {
            enumDescriptions,
            enum: enumValues,
            optionsSchema: { properties } = {},
            idKey,
            textKey,
            groupingInfo: { groups, discriminator} = {}
        } = this.props.schema;

        const { multipleDescriptionLabels } = this.props.additionalProps;

        if (properties && multipleDescriptionLabels) {
            const options = this.state.extra.options || [];
            
            const textOptions = options.map(option => {
                return Object.keys(option).filter(k => properties[k] != null).map(key => ({
                    title: properties[key].title,
                    value: option[key],
                    hide: properties[key].hide
                }));
            });

            return textOptions.map((textOption, index) => {
                const labels = textOption.filter(option => option.hide !== true);
                const descriminatorValue = groups && textOption.find(option => option.title === discriminator).value;
                const selectedGroup = groups && groups.find(group => group.name === descriminatorValue);
                
                return {
                    text: labels,
                    value: options[index][idKey],
                    ...(groups && { additionalData: { value: selectedGroup?.name, color: selectedGroup?.color } })
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

        const indexOfEnumValue = this.props.schema.enumNames?.indexOf(value);
        if (indexOfEnumValue!=null && indexOfEnumValue != -1) {
            return this.props.schema.enum[indexOfEnumValue].toString();
        }

        return value;
    }

    componentDidMount() {
        const loadOptions = this.props.schema.entitySource?.fetchData ;
        if(loadOptions != null) {
            this.setState(update(this.state, { extra: { isDataFetching: { $set: true } } }));
            loadOptions("", this.props.schema.entitySource.defaultParameters).then((data) => {
                this.setState(update(this.state, { extra: { isDataFetching: { $set: false }, options: { $set: data }} }));
            }).catch(e => this.setState(update(this.state, { extra: { isDataFetching: { $set: false }, options: { $set: [] }}})))
        }
    }

    renderField() {
        const { name, additionalProps: { alignMode, displayMode, nbItemsPerRow }} = this.props;
        const { value } = this.state;
        
        if(this.state.extra.isDataFetching) {
            return <UpLoadingIndicator isLoading={true} />
        }

        let isReadOnly = false ;
        try {
            isReadOnly = this.props.isReadOnly && this.props.isReadOnly(this.props.name)
        } catch (e) {
            console.error(e) ;
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
                readonly = {isReadOnly}
                nbItemsPerRow={nbItemsPerRow}
            />
        )
    }
};