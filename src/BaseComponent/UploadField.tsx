import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpDropFile } from "@up-group-ui/react-controls";
import { IFile } from "@up-group-ui/react-controls/dist/Components/Inputs/DropFile/types";

export default class UploadField extends UpFormControl<IFile, {}> {
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
        value={this.props.value}
        name={this.props.name}
        label={this.props.schema.title}
        onChange={this.handleChangeEventGlobal}
        allowedExtensions={this.allowedExtensions}
      />
    );
  }
}
