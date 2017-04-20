import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { UpTimePicker } from "@up-group/react-controls";

export default class UpTime extends UpFormControl<string> {
    constructor(p, c) {
        super(p, c);
    }

    setInput(data) {
    }

    _componentDidMount() {
    }

    renderField() {
       
        return <UpTimePicker
            //ref={(i) => { this.InputBaseControl = i; }}
            //onError = { this.handlErrorEventGlobal }
            onChange={this.handleChangeEventGlobal} hasError={this.state.hasError} />
    }


    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }
  
}
