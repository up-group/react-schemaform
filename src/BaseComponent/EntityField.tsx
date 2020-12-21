﻿import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { eventFactory, UpSelect } from "@up-group-ui/react-controls";
import { JsonSchema, InternalTypeOfSchema } from "../interfaces/JsonSchema";

export default class EntityField<Type> extends UpFormControl<Type> {
  constructor(p, c) {
    super(p, c);
  }

  onChange = (event, cleandata, error?) => {
    this.setState({ internalData: cleandata }, () =>
      this.handleChangeEventGlobal(event, cleandata, error)
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

    //Display the component sent by the external source, otherwise display the normal component.
    if(this.props.schema.referenceTo){
      return this.props.schema.getEntitySelector((data, error) => this.props.onChange(eventFactory("", data), data, error))
    }
    
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
        dataSource={this.schema.entitySource && !this.schema.entitySource.data ? this.schema.entitySource : undefined}
        floatingLabel={this.props.floatingLabel}
        autoload={this.schema.entitySource.autoload}
        data={this.schema.entitySource ? this.schema.entitySource.data : undefined}
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
