import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpInteger } from "@up-group/react-controls";

export default class UpIntegerComp extends UpFormControl<number> {
    constructor(p, c) {
        super(p, c);
        //this._ControlErrorCentral.addControl(new TypeNumberControl(true, this.props.schema.minimum, this.props.schema.maximum));
    }

    setInput(data) {
        this.inputElement.value = data;
    }

    _componentDidMount() {
    }

    renderField() {
       
        return <UpInteger onError={this.handlErrorEventGlobal} onChange={this.handleChangeEventGlobal} max={this.props.schema.maximum} min={this.props.schema.minimum} />


    }


    handleChangeJsEvent(event: any) {
        return event;
    }


    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

}
