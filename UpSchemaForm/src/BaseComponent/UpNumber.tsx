import * as React from "react";
import {UpFormControl} from "../UpForm/UpFormControl"
import TypeNumberControl from "../ControlError/TypeNumberControl"

export default class UpNumber extends UpFormControl<number> {
    constructor(p, c) {        super(p, c);
        this._ControlErrorCentral.addControl(new TypeNumberControl(false, this.props.schema.minimum, this.props.schema.maximum));    }    setInput(data) {        this.inputElement.value = data;    }    _componentDidMount() {
    }    renderField() {
        return <input
            ref={(input) => { this.inputElement = input; } }
            style={this.state.hasError === true ? { borderColor: "red" } : null}
            type="text"
            className="form-control"
            onChange={this.handleChangeJsEventGlobal}
            onKeyDown={this.onKeyDown}
            />

    }


    onKeyDown = (e) => {
        if (e.keyCode == 38) { // up
            var newValue = Number(e.target.value) + 1;
            this.inputElement.value = newValue.toString();
            this.handleChangeEventGlobal(newValue);
        } else if (e.keyCode == 40) { // down
            var newValue = Number(e.target.value) - 1;
            this.inputElement.value = (newValue).toString();
            this.handleChangeEventGlobal(newValue);
        }
    }

    handleChangeJsEvent(event: any) {
        return event.target.value;
    }

    isEmpty(value) {
        return value === null || value === "";
    }


}
