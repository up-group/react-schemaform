import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpFormControl } from "../UpForm/UpFormControl";
import { TypeDateControl, dateFormat } from "../ControlError/TypeDateControl";
import { UpDate } from "@up-group/react-controls";

export default class UpDateComp extends UpFormControl<Date> {

    inputElementGroup: HTMLDivElement;
    constructor(p, c) {
        super(p, c);
    }

    setInput(data) {
    }

    renderField() {

        return <UpDate ref={(i) => { this.InputBaseControl = i; }} value={this.state.value} onChange={this.handleChangeEventGlobal} isNullable={this.isNullable} />



    }


    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }


}

