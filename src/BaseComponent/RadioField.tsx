import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpRadio } from "@up-group-ui/react-controls";

export default class RadioField extends UpFormControl<number> {

    setOptionsValues = () => {
        const { enumDescriptions, enum: enumValues } = this.props.schema;
        return enumDescriptions.map((currentElement, index) => ({ text: currentElement, value: enumValues[index].toString() }));
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
                value={value}
                onChange={this.handleChangeEventGlobal}
                options={this.setOptionsValues()}
            />
        )
    }
};