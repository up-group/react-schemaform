import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTagsSelect } from "@up-group-ui/react-controls";
import { TagData } from "@up-group-ui/react-controls/dist/Components/Display/Tag";
import { JsonSchema } from "interfaces/JsonSchema";

export interface ExtendedProps {
  label?: string;
}

export default class TagsSelect extends UpFormControl<
  TagData[],
  ExtendedProps
> {
  constructor(p, c) {
    super(p, c);
  }

  private get schema(): JsonSchema {
    return this.props.schema as JsonSchema;
  }

  renderField() {
    const { label } = this.props;

    const tags =
      this.schema.tags?.map(({ id, text, selected }) => ({
        id,
        text,
        selected,
      })) || [];

    const handleChange = (e, data) => {
      this.handleChangeEventGlobal(e, data);
    };

    return (
      <>
        {tags.length > 0 ? (
          <UpTagsSelect label={label} onChange={handleChange} tags={tags} />
        ) : null}
      </>
    );
  }
}
