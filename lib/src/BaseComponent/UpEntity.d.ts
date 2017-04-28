/// <reference types="react" />
import { UpFormControl } from "../UpForm/UpFormControl";
export default class UpEntity<Type> extends UpFormControl<Type> {
    constructor(p: any, c: any);
    renderField(): JSX.Element;
    private readonly schema;
    private readonly isArray;
}
