import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDropFile } from "@up-group-ui/react-controls";

export default class UploadField extends UpFormControl<number[], {}> {
  constructor(p, c) {
    super(p, c);
  }

  private get allowedExtensions() : string[] {
    let fileExtension :string = this.props.schema.fileExtension ;
    let allowedExtensions : string[] = [] ;
    if(fileExtension) {
      allowedExtensions = fileExtension.split(',').map(ext => ext.trim());
    }
    return allowedExtensions ;
  }

  renderField() {
    return (
      <UpDropFile
        name={this.props.name}
        label={this.props.schema.title}
        onChange={this.handleChangeEventGlobal}
        allowedExtensions={this.allowedExtensions}
      />
    );
  }
}
