import * as $ from "jquery";
import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { UpDateTime } from "@up-group/react-controls";


export default class DateTimeField extends UpFormControl<Date> {

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

        return <UpDateTime value={this.props.initData} showError={this.props.showError} isRequired={this.props.isRequired} maxDate={maxDate} minDate={minDate} onChange={this.handleChangeEventGlobal} />
    }

}