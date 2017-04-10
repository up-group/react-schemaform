import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { UpTimePicker } from "@up-group/up-react-controls";

export default class UpTime extends UpFormControl<string> {
    constructor(p, c) {
        super(p, c);
    }

    setInput(data) {
    }

    _componentDidMount() {
    }

    renderField() {
        return <UpTimePicker onChange={this.handleChangeEventGlobal} hasError={this.state.hasError} />
    }


    handleChangeJsEvent(args: any) {
        if (args != null && !args.target) {
            return args;
        }
        return args.target.value;
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

}

