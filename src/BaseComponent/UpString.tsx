import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeStringControl from "../ControlError/TypeStringControl"
import { UpInput, UpEmail, UpPhone, UpText } from "@up-group/react-controls";

export default class UpString extends UpFormControl<string> {

    constructor(p, c) {
        super(p, c);

        var pattern = new RegExp(this.props.schema.pattern);
        var patternErrorMessage = this.props.schema.patternErrorMessage;

        if (this.props.schema.format !== undefined) {
            switch (this.props.schema.format) {
                case "email":
                    pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    patternErrorMessage = "Doit être mail";
                    break;
                case "phone":
                    pattern = /^(0)[1-9]([\s]?[0-9]{2}){4}$/
                    patternErrorMessage = "Doit être un N° de telephone";
                    break;
                default:
            }
        }
        this._ControlErrorCentral.addControl(new TypeStringControl(pattern, patternErrorMessage));
    }

    setInput(data) {
        if (this.inputElement) {
            this.inputElement.value = data;
        }
    }

    renderField() {


        switch (this.props.schema) {
            case "email":
                return <UpEmail onChange={this.handleChangeEventGlobal} />;
            case "phone":
                return <UpPhone onChange={this.handleChangeEventGlobal} />;
            case "multilineText":
                return <UpText value={this.state.value} multiline={true} onChange={this.handleChangeEventGlobal} />;
            default:
                return <UpText value={this.state.value} multiline={false} onChange={this.handleChangeEventGlobal} />;
        }

    }

    handleChangeJsEvent(event: any) {
        return event.target.value;
    }

    isEmpty(value) {
        return value === null || value === undefined || value === "";
    }

    _componentDidMount() {
    }

}
