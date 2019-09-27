import * as $ from "jquery";
import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDate, UpTimePicker } from "@up-group/react-controls";

import { Moment } from "moment";
import * as moment from "moment";

export default class DateTimeField extends UpFormControl<Moment> {
  inputElementGroup: HTMLDivElement;
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    var maxDate: Date, minDate: Date;

    if (this.props.schema.maximum !== undefined) {
      maxDate = new Date(this.props.schema.maximum);
    }

    if (this.props.schema.minimum !== undefined) {
      minDate = new Date(this.props.schema.minimum);
    }

    return (
      <UpDate
        name={this.props.name}
        value={moment(this.state.value)}
        showError={this.props.showError}
        isRequired={this.props.isRequired}
        maxDate={maxDate}
        minDate={minDate}
        onChange={this.handleChangeEventGlobal}
      />
    );
  }
}
