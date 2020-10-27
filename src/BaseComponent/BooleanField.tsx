import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { UpToggle, UpRadio } from "@up-group-ui/react-controls";

export default class BooleanField extends UpFormControl<boolean> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    if (this.isNullable === false) {
      if(this.props.schema.isToggle) {
        return (
          <UpToggle
            onChange={this.handleChangeEventGlobal}
            checked={this.state.value}
            value={this.state.value}
          />
        );
      } else {
        return <UpRadio
          name={this.props.name}
          displayMode="normal"
          gutter={10}
          alignMode="horizontal"
          options={[
            { text: "Oui", value: "true" },
            { text: "Non", value: "false" }
          ]}
          onChange={this.handleChangeData}
          defaultValue={this.convert(this.default(false))}
          value={this.convert(this.state.value)}
        />
      }
    } else {
      return (
        <UpRadio
          name={this.props.name}
          displayMode="normal"
          options={[
            { text: "Oui", value: "true" },
            { text: "Non", value: "false" },
            { text: "Indifférent", value: "null" }
          ]}
          gutter={10}
          onChange={this.handleChangeData}
          defaultValue={this.convert(this.default(null))}
          value={this.convert(this.state.value)}
        />
      );
    }
  }

  convert = value => {
    if (this.isNullable === false) {
      if (value === true) {
        return "true";
      } else if (value === false) {
        return "false";
      }
    } else {
      if (value === false) {
        return "false";
      } else if (value === true) {
        return "true";
      } else if (value === null) {
        return "null";
      }
    }
    return undefined;
  };

  handleChangeData = (e, value: any) => {
    var data;
    switch (value) {
      case "null":
        this.handleChangeEventGlobal(e, null, false);
        break;
      case "true":
        this.handleChangeEventGlobal(e, true, false);
        break;
      case "false":
        this.handleChangeEventGlobal(e, false, false);
        break;
      default:
        this.handleChangeEventGlobal(e, null, false);
    }
  };
}
