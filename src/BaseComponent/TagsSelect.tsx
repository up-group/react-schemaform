import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTagsSelect } from "@up-group-ui/react-controls";
import { TagData } from "@up-group-ui/react-controls/dist/Components/Inputs/TagsSelect";
import { SelectedTagData } from "@up-group-ui/react-controls/dist/Components/Display/Tag";
import { JsonSchema } from "interfaces/JsonSchema";
export interface ExtendedProps {
    label?: string;
}

export default class TagsSelect extends UpFormControl<SelectedTagData[], ExtendedProps> {

    constructor(p, c) {
        super(p, c);
    }
    private get schema(): JsonSchema {
        return (this.props.schema.items as JsonSchema) || this.props.schema;
    }
    
    renderField() {
        const { label } = this.props;

        let tags = [];
        for (let i = 0; i < this.schema.enum.length; i++) {
          if (this.schema.enum[i] !== null) {
            if (this.schema.hiddenEnumValues == null || this.schema.hiddenEnumValues.indexOf(this.schema.enum[i]) === -1 )
              tags.push({
                id: this.schema.enum[i],
                text: this.props.translate ? this.props.translate(this.schema.enumDescriptions[i]) : this.schema.enumDescriptions[i]
              });
          }
        }

        return (
            <UpTagsSelect
                label={label}
                onChange={this.handleChangeEventGlobal}
                tags={tags}
            />
        )
    }
};
