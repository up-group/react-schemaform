import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpInput, UpEmail, UpPhone, UpText } from "@up-group/react-controls";

export default class StringField extends UpFormControl<string> {
  constructor(p, c) {
    super(p, c);
    var pattern = new RegExp(this.props.schema.pattern);
    var patternErrorMessage = this.props.schema.patternErrorMessage;
  }

  renderField() {
    switch (this.props.schema.format) {
      case "email":
        return (
          <UpEmail
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      case "phone":
        return (
          <UpPhone
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      case "multilineText":
        return (
          <UpText
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
      default:
        return (
          <UpInput
            name={this.props.name}
            value={this.state.value}
            showError={this.props.showError}
            isRequired={this.props.isRequired}
            onChange={this.handleChangeEventGlobal}
          />
        );
    }
  }
}
