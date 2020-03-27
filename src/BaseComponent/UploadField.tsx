import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDropFile } from "@up-group-ui/react-controls";

export default class UploadField extends UpFormControl<number[]> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    return (
      <UpDropFile
        name={this.props.name}
        onChange={this.handleChangeEventGlobal}
        allowedExtensions={[this.props.schema.fileExtension]}
      />
    );
  }
}
