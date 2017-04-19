import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import TypeStringControl from "../ControlError/TypeStringControl"
import { UpInput, UpEmail, UpPhone, UpText } from "@up-group/react-controls";

export default class UpString extends UpFormControl<string> {

    constructor(p, c) {
        super(p, c);
        var pattern = new RegExp(this.props.schema.pattern);
        var patternErrorMessage = this.props.schema.patternErrorMessage;
    }

    setInput(data) {
     
    }

    renderField() {


        switch (this.props.schema) {
            case "email":
                return <UpEmail onError={this.handlErrorEventGlobal} onChange={this.handleChangeEventGlobal} />;
            case "phone":
                return <UpPhone onError={this.handlErrorEventGlobal} onChange={this.handleChangeEventGlobal} />;
            case "multilineText":
                return <UpText value={this.state.value} onError={this.handlErrorEventGlobal} multiline={true} onChange={this.handleChangeEventGlobal} />;
            default:
                return <UpText value={this.state.value} onError={this.handlErrorEventGlobal} multiline={false} onChange={this.handleChangeEventGlobal} />;
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
