import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDate } from "@up-group/react-controls";

export default class UpDateComp extends UpFormControl<Date> {

    inputElementGroup: HTMLDivElement;
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        var maxDate: Date, minDate: Date;

        if (this.props.schema.maximum !== undefined) {
            maxDate = new Date(this.props.schema.maximum);
        }

        if (this.props.schema.minimum !== undefined) {
            minDate = new Date(this.props.schema.minimum);
        }

        return <UpDate isRequired={this.props.isRequired} maxDate={maxDate} minDate={minDate} onChange={this.handleChangeEventGlobal} />
    }



}

