import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTimePicker } from "@up-group/react-controls";

export default class TimeField extends UpFormControl<string> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    return (
      <UpTimePicker
        name={this.props.name}
        //onError = { this.handlErrorEventGlobal } //TODO : implement the value
        onChange={this.handleChangeEventGlobal}
        hasError={undefined}
      />
    );
  }
}
