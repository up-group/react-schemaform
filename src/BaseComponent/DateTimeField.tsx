import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDate } from "@up-group-ui/react-controls";

import moment from "moment";
import _ = require('lodash');

const MIN_DATE_TIME = "0001-01-01T00:00:00";

export default class DateTimeField extends UpFormControl<moment.Moment, {}> {
  inputElementGroup: HTMLDivElement;
  constructor(p, c) {
    super(p, c);
  }

  get currentValue(): moment.Moment {
    if (this.state.value && this.state.value.toString() == MIN_DATE_TIME) {
      return undefined;
    }
    return this.state.value == null ? null : moment(this.state.value);
  }

  renderField() {
    let maxDate: Date, minDate: Date;
    const { minDate: minDateProp, maxDate: maxDateProp, fullWidth } = this.props.additionalProps;

    if (this.props.schema.maximum !== undefined) {
      maxDate = (_.isEmpty(this.props.schema.maximum) && maxDateProp) ? maxDateProp : new Date(this.props.schema.maximum);
    }

    if (this.props.schema.minimum !== undefined) {
      minDate = (_.isEmpty(this.props.schema.minimum) && minDateProp) ? minDateProp : new Date(this.props.schema.minimum);
    }

    let isReadOnly = false ;
    try {
        isReadOnly = this.props.isReadOnly && this.props.isReadOnly(this.props.name)
    } catch (e) {
        console.error(e) ;
    }

    return (
      <UpDate
        name={this.props.name}
        value={this.currentValue}
        showError={this.props.showError}
        errorDisplayMode={"inline"}
        isRequired={this.props.isRequired}
        maxDate={maxDate || maxDateProp}
        minDate={minDate || minDateProp}
        onChange={this.handleChangeEventGlobal}
        floatingLabel={this.props.floatingLabel}
        readonly = {isReadOnly}
        fullWidth = {fullWidth}
      />
    );
  }
}
