import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDate } from "@up-group-ui/react-controls";

import { Moment } from "moment";

const MIN_DATE = "01/01/0001";

export default class DateField extends UpFormControl<Moment> {
  inputElementGroup: HTMLDivElement;
  constructor(p, c) {
    super(p, c);
  }

  get currentValue(): Moment {
    if (this.state.value && this.state.value.toString() == MIN_DATE || this.state.value && !this.state.value["_isAMomentObject"]) {
      return null;
    }
    return this.state.value;
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
        value={this.currentValue}
        showError={this.props.showError}
        isRequired={this.props.isRequired}
        maxDate={maxDate}
        minDate={minDate}
        onChange={this.handleChangeEventGlobal}
        floatingLabel={this.props.floatingLabel}
        readonly = {this.props.isReadOnly && this.props.isReadOnly(this.props.name)}
      />
    );
  }
}
