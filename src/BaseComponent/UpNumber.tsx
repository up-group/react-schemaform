import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"
import { UpNumber } from "@up-group/react-controls";

interface baseprop {
    value: any,
    onChange: (data: any) => void,
    onError: (error: any) => void
}

export default class UpNumberComp extends UpFormControl<number> {

    constructor(p, c) {
        super(p, c);
        //this._ControlErrorCentral.addControl(new TypeNumberControl(false, this.props.schema.minimum, this.props.schema.maximum));
    }


    setInput(data) {
        //this.inputElement.value = data;
    }

    _componentDidMount() {
    }



    renderField() {
        return <UpNumber onChange={this.handleChangeEventGlobal} max={this.props.schema.maximum} min={this.props.schema.minimum}/>



    }


    handleChangeJsEvent(event: any) {
        return event;
    }

    isEmpty(value) {
        return value === null || value === "";
    }


}
