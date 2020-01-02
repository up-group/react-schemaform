import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpSelect } from "@up-group/react-controls";

export default class EntityField<Type> extends UpFormControl<Type> {
  constructor(p, c) {
    super(p, c);
  }

  onChange = (event, cleandata, error?) => {
    let idText = this.schema.entitySource.id || "id";
    this.setState({ internalData: cleandata }, () =>
      this.handleChangeEventGlobal(event, cleandata[idText], error)
    );
  };

  getValue = () => {
    if (
      this.state.internalData &&
      this.state.internalData[this.schema.entitySource.id || "id"] ===
        this.state.value
    ) {
      return this.state.internalData;
    }
    return this.state.value;
  };

  renderField() {
    return (
      <UpSelect
        name={this.props.name}
        showError={this.props.showError}
        default={null}
        value={this.getValue()}
        returnType="full"
        isRequired={this.props.isRequired}
        multiple={this.isArray}
        placeholder="Recherche"
        allowClear={!this.props.isRequired}
        onChange={this.onChange}
        dataSource={this.schema.entitySource}
      />
    );
  }

  private get schema(): JsonSchema {
    return (this.props.schema.items as JsonSchema) || this.props.schema;
  }

  private get isArray() {
    return (
      (this.props.schema.type as InternalTypeOfSchema[]).indexOf("array") !== -1
    );
  }
}
