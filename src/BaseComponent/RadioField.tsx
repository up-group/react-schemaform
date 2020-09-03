import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpRadio } from "@up-group-ui/react-controls";
import _ = require('lodash');

export default class RadioField extends UpFormControl<number> {

    setOptionsValues = () => {
        const { enumDescriptions, enum: enumValues } = this.props.schema;
        return enumDescriptions.map((currentElement, index) => ({ text: currentElement, value: enumValues[index].toString() }));
    }
    
    convertValueFromStringToInt  = (value : string) : string =>  {
        if(!value) return null;

        const indexOfEnumValue = this.props.schema.enumNames.indexOf(value) ;
        if(indexOfEnumValue != -1) {
            return this.props.schema.enum[indexOfEnumValue].toString() ;
        }
        return value;
    }

    renderField() {
        const { name } = this.props;
        const { value } = this.state;

        return (
            <UpRadio
                flexWrap
                gutter={10}
                alignMode="horizontal"
                name={name}
                value={this.convertValueFromStringToInt(value && value.toString())}
                onChange={this.handleChangeEventGlobal}
                options={this.setOptionsValues()}
            />
        )
    }
};