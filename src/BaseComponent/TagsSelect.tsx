import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTagsSelect } from "@up-group-ui/react-controls";
import { JsonSchema } from "interfaces/JsonSchema";
import { TagData } from "@up-group-ui/react-controls/dist/Components/Display/Tag/UpTag";
import _ from "lodash";
export interface ExtendedProps {
  floatingLabel?: string;
}

export default class TagsSelect extends UpFormControl<
  TagData[],
  ExtendedProps
> {
  constructor(p, c) {
    super(p, c);
  }

  private get schema(): JsonSchema {
    return (this.props.schema.items as JsonSchema) || this.props.schema;
  }

  private get hasSingleSelection() {
    return this.props.schema.type === 'integer' || (_.isArray(this.props.schema.type) && this.props.schema.type[0] === 'integer');
  }

  private handleChange = (event, cleandata, error?) => {
    if (this.hasSingleSelection) {
      const selectedValue = cleandata.selected ? cleandata.id : this.isNullable ? null : this.props.value ;
      return this.handleChangeEventGlobal(event, selectedValue, error);
    }
    this.handleChangeEventGlobal(event, cleandata.filter(v => v.selected).map(v =>  v.id), error);
  };

  renderField() {
    const { floatingLabel } = this.props;

    let tags: TagData[] = [];

    for(let i in this.schema.enum) {
      if (this.schema.enum[i] !== null) {
        if (
          this.schema.hiddenEnumValues == null ||
          this.schema.hiddenEnumValues.indexOf(this.schema.enum[i]) === -1
        ){

          let isSelected;

          const value = this.props.value !== undefined ?  this.props.value : this.props.schema.default ;

          if (this.hasSingleSelection) {
            isSelected = value == this.schema.enum[i]
          } else {
            isSelected = _.isArray(value) && value?.some((id) => id == this.schema.enum[i])
          }

          tags.push({
            id: this.schema.enum[i],
            text: this.props.translate
                ? this.props.translate(this.schema.enumDescriptions[i])
                : this.schema.enumDescriptions[i],
            selected: isSelected
          });
        }
      }
    }

    return (
      <UpTagsSelect
        label={floatingLabel}
        onChange={this.handleChange}
        tags={tags}
        multipleSelection={!this.hasSingleSelection}
        {...this.props.additionalProps}
      />
    );
  }
}
