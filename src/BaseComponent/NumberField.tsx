import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpNumber } from "@up-group/react-controls";

interface baseprop {
  value: any;
  onChange: (data: any) => void;
  onError: (error: any) => void;
}

export default class NumberField extends UpFormControl<number> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    return (
      <UpNumber
        name={this.props.name}
        value={this.state.value}
        showError={this.props.showError}
        isRequired={this.props.isRequired}
        onChange={this.handleChangeEventGlobal}
        max={this.props.schema.maximum}
        min={this.props.schema.minimum}
      />
    );
  }
}
