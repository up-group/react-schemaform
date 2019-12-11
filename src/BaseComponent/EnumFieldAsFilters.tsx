import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";

import { style } from 'typestyle';

export type FilterData = { type: any; label: string, value?: string, selected: boolean};

export default class EnumFieldAsFilters extends UpFormControl<FilterData> {
  constructor(p, c) {
    super(p, c);
  }

  renderField() {
    const filterStyle = style({
      boxSizing: "border-box", height: "36px", width: "109.16px", border: " 1px solid #979797", borderRadius: "22px", boxShadow: "0 2px 0 0 rgba(0,0,0,0.2)",
      padding: "7px 0", color: "#979797", fontFamily: "Roboto", fontSize: "12px", fontWeight: "bold", textAlign: "center", lineHeight: "16px",
      cursor: "pointer", margin : "0 10px"
    });

    const activeFilterStyle = style({
      borderColor: "#F59100",
      color: "#F59100",
    });

    const wrapperStyle = style({
      display: "flex", flexDirection: "row"
    });

    var filters: FilterData[] = [];
    for (var i = 0; i < this.schema.enum.length; i++) {
      if (this.schema.enum[i] !== null) {
        let filter: FilterData = {
          type: this.schema.enum[i],
          label: this.schema.enumDescriptions[i],
          selected : this.props.value && (this.props.value.type === this.schema.enum[i])
        };
        filters.push(filter);
      }
    }
    return (<div className={wrapperStyle}>
      {filters.map(filter => {
        return (<div key={filter.type} className={`${filterStyle} ${(filter.selected) ? activeFilterStyle : ""}`} onClick={(e)=> this.onFilterSelect(e, filter)}>
          {filter.label}
          {(filter.value) && `: ${filter.value}`}
        </div>)
      })}
    </div>)
  }

  private onFilterSelect(e, filter){
    this.handleChangeEventGlobal(e, {...filter})
  }

  private get schema(): JsonSchema {
    return (this.props.schema.items as JsonSchema) || this.props.schema;
  }
}
