import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { UpNumber } from "@up-group/react-controls";

export default class IntegerField extends UpFormControl<number> {
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpNumber decimalPlace={0} isRequired={this.props.isRequired} onChange={this.handleChangeEventGlobal} max={this.props.schema.maximum} min={this.props.schema.minimum} />
    }

}
