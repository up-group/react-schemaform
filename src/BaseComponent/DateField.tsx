import * as $ from "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDate } from "@up-group-ui/react-controls";

import { Moment } from "moment";
import _ = require('lodash');

const MIN_DATE = "01/01/0001";

export default class DateField extends UpFormControl<Moment, {}> {
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
    let maxDate: Date, minDate: Date;
    const { minDate: minDateProp, maxDate: maxDateProp, fullWidth, ...restProps } = this.props.additionalProps;

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
        readonly={isReadOnly}
        fullWidth = {fullWidth}
        {...restProps}
      />
    ); 
  }
}
