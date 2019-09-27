import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpSelect } from "@up-group/react-controls";

interface UpEntityExtendProp {
  getFullData: boolean;
  multiple: boolean;
  placeholder?: string;
  allowClear?: boolean;
  minimumInputLength?: number;

  dataSource: {
    id: string;
    text: string;
    query: string;
    queryParameterName: string;
  };
  value: any;
}

export default class EntityField<Type> extends UpFormControl<Type> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    return (
      <UpSelect
        name={this.props.name}
        showError={this.props.showError}
        default={null}
        value={this.state.value}
        returnType="id"
        isRequired={this.props.isRequired}
        multiple={this.isArray}
        placeholder="Recherche"
        allowClear={!this.props.isRequired}
        onChange={this.handleChangeEventGlobal}
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
