import * as React from "react";
import { UpFormControl } from "../UpForm/UpFormControl";
import { UpTagsSelect } from "@up-group-ui/react-controls";

export interface SelectedTagData {
    id: string;
    text: string;
    selected: boolean;
}

export interface ExtendedProps {
    label?: string
}

export default class TagsSelect extends UpFormControl<SelectedTagData[], ExtendedProps> {

    constructor(p, c) {
        super(p, c);
    }

    renderField() {
        const { tags, label } = this.props;

        return (
            <UpTagsSelect
                label={label}
                onChange={this.handleChangeEventGlobal}
                tags={tags}
            />
        )
    }
};
