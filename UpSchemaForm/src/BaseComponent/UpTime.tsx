import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import UpTimePicker from "../ReactComponent/UpTimePicker"

export default class UpTime extends UpFormControl<string> {
    constructor(p, c) {        super(p, c);
    }    setInput(data) {    }    _componentDidMount() {
    }    renderField() {
        return <UpTimePicker onChange={this.handleChangeEventGlobal} hasError={this.state.hasError}/>
        //return <input
        //    ref={(input) => { this.inputElement = input; } }
        //    style={this.state.hasError === true ? { borderColor: "red" } : null}
        //    onChange={this.handleChangeJsEventGlobal}
        //    type="time"
        //    className="form-control" ></input>;
    }

        handleChangeJsEvent(args: any) {
        if (args  != null && !args.target){
            return args;
        }
        return args.target.value;
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }}

