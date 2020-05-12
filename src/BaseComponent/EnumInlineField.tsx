import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { JsonSchema } from "../interfaces/JsonSchema";
import { style } from 'typestyle';

export type EnumData = { type: any; label: string, value?: string };

export default class EnumInlineField extends UpFormControl<EnumData> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    const filterStyle = style({
      boxSizing: "border-box", height: "36px", minWidth: "110px", border: " 1px solid #979797", borderRadius: "22px", boxShadow: "0 2px 0 0 rgba(0,0,0,0.2)",
      padding: "7px 0", color: "#979797", fontFamily: "Roboto", fontSize: "12px", fontWeight: "bold", textAlign: "center", lineHeight: "16px",
      cursor: "pointer", margin: "0 10px"
    });

    const activeFilterStyle = style({
      borderColor: "#F59100",
      color: "#F59100",
    });

    const wrapperStyle = style({
      display: "flex", flexDirection: "row"
    });

    var filters: EnumData[] = [];
    for (var i = 0; i < this.schema.enum.length; i++) {
      if (this.schema.enum[i] !== null) {
        let filter: EnumData = {
          type: this.schema.enum[i],
          label: this.schema.enumDescriptions[i]
        };
        filters.push(filter);
      } else {
        filters.push({
          type: -1,
          label: "Undefined"
        });
      }
    }

    return (<div className={wrapperStyle}>
      {filters.map(filter => {
        return (<div key={filter.type} className={`${filterStyle} ${(this.isSelected(filter)) ? activeFilterStyle : ""}`} onClick={(e) => this.onFilterSelect(e, filter)}>
          {this.props.translate ? this.props.translate(filter.label) : filter.label}
          {(filter.value) && `: ${filter.value}`}
        </div>)
      })}
    </div>)
  }

  isSelected(filter: EnumData): boolean {
    return this.props.value && (this.props.value.type === filter.type)
  }

  private onFilterSelect(e, filter) {
    this.handleChangeEventGlobal(e, { ...filter })
  }

  private get schema(): JsonSchema {
    return (this.props.schema.items as JsonSchema) || this.props.schema;
  }
}
