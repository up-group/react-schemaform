import * as $ from "jquery";
import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import {TypeDateControl, dateFormat} from "../ControlError/TypeDateControl"
import { UpDateTime } from "@up-group/react-controls";


export default class UpDateTimeComp extends UpFormControl<Date> {

    inputElementGroup: HTMLDivElement;
    constructor(p, c) {
        super(p, c);
    }


    setInput(data) {
    }

    _componentDidMount() {
    }

    renderField() {
        return <UpDateTime ref={(i) => { this.InputBaseControl = i; }} value="" onError={this.handlErrorEventGlobal} onChange={this.handleChangeEventGlobal} hasError={this.state.hasError} isNullable={this.isNullable} />
    }


    handleChangeJsEvent(event: Date) {
       
        return event;
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }
    
}