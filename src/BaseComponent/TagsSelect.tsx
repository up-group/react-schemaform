import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTagsSelect } from "@up-group-ui/react-controls";
import { JsonSchema } from "interfaces/JsonSchema";
import { TagData } from "@up-group-ui/react-controls/dist/Components/Display/Tag/UpTag";
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

  private handleChange = (event, cleandata, error?) => {
    const hasSingleSelection = this.props.schema.type === 'integer';
    if (hasSingleSelection) {
      const selectedValue = cleandata.id;
      return this.handleChangeEventGlobal(event, selectedValue, error);
    }
    this.handleChangeEventGlobal(event, cleandata, error);
  };

  renderField() {
    const { floatingLabel } = this.props;
    const hasMultipleSelection = this.props.schema.type !== 'integer';
    const hasSingleSelection = this.props.schema.type === 'integer';


    let tags: TagData[] = [];
    for (let i = 0; i < this.schema.enum.length; i++) {
      if (this.schema.enum[i] !== null) {
        if (
          this.schema.hiddenEnumValues == null ||
          this.schema.hiddenEnumValues.indexOf(this.schema.enum[i]) === -1
        ){
          let isSelected;
          if (hasSingleSelection){
            isSelected = this.props.schema.default == this.schema.enum[i]
          }else{
            isSelected = Array.isArray(this.props.schema.default) && this.props.schema.default?.some((id) => id == this.schema.enum[i])
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
        multipleSelection={hasMultipleSelection}
      />
    );
  }
}
