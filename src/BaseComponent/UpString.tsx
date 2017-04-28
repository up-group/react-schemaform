import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl"
import { UpInput, UpEmail, UpPhone, UpText } from "@up-group/react-controls";

export default class UpString extends UpFormControl<string> {

    constructor(p, c) {
        super(p, c);
        var pattern = new RegExp(this.props.schema.pattern);
        var patternErrorMessage = this.props.schema.patternErrorMessage;
    }

    renderField() {

        switch (this.props.schema.format) {
            case "email":
                return <UpEmail onChange={this.handleChangeEventGlobal} />;
            case "phone":
                return <UpPhone onChange={this.handleChangeEventGlobal} />;
            case "multilineText":
                return <UpText onChange={this.handleChangeEventGlobal} />;
            default:
                return <UpInput onChange={this.handleChangeEventGlobal} />;
        }

    }

}
