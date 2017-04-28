import * as $ from "jquery";
import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { TypeDateControl, dateFormat } from "../ControlError/TypeDateControl"
import { UpDateTime } from "@up-group/react-controls";


export default class UpDateTimeComp extends UpFormControl<Date> {

    inputElementGroup: HTMLDivElement;
    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        return <UpDateTime onChange={this.handleChangeEventGlobal} />
    }

}