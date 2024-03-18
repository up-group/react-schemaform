import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpIconicTagsSelect } from "@up-group-ui/react-controls";
import _ from "lodash";
import { IconicTagData } from "@up-group-ui/react-controls/dist/Components/Display/IconicTag";
export interface ExtendedProps {
  floatingLabel?: string;
}

export default class IconicTagsSelect extends UpFormControl<
  IconicTagData[],
  ExtendedProps
> {
  constructor(p, c) {
    super(p, c);
  }


  private get isMultipleSelection() {
    return this.props.schema.iconicTagsMultipleSelection;
  }

  private handleChange = (event, cleandata, error?) => {
    if (!this.isMultipleSelection) {
      const selectedValue = cleandata.selected ? cleandata.id : this.isNullable ? null : this.props.value ;
      return this.handleChangeEventGlobal(event, selectedValue, error);
    }
    this.handleChangeEventGlobal(event, cleandata.filter(v => v.selected).map(v =>  v.id), error);
  };

  renderField() {
    let tags: IconicTagData[] = [];

    for(let i in this.props.schema.iconicTags) {
      if (this.props.schema.iconicTags[i] !== null) {
        if (
          this.props.schema.hiddenEnumValues == null ||
          this.props.schema.hiddenEnumValues.indexOf(this.props.schema.iconicTags[i]) === -1
        ){

          let isSelected;
          const value = this.props.value !== undefined ?  this.props.value : this.props.schema.default ;
          if (!this.isMultipleSelection) {
            isSelected = value == this.props.schema.iconicTags[i]
          } else {
            isSelected = _.isArray(value) && value?.some((id) => id == this.props.schema.iconicTags[i].id)
          }
          
          tags.push({
            id: this.props.schema.iconicTags[i].id,
            prefixText: this.props.schema.iconicTagsFixText,
            contentText: this.props.schema.iconicTags[i].contentText,
            selected: isSelected,
            backgroundColor: this.props.schema.iconicTags[i].backgroundColor,
            iconName: this.props.schema.iconicTags[i].iconName,
          });
        }
      }
    }

    return (
      <UpIconicTagsSelect
        onChange={this.handleChange}
        tags={tags}
        multipleSelection={this.isMultipleSelection}
        {...this.props.additionalProps}
      />
    );
  }
}
