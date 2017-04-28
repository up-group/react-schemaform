/// <reference types="react" />
import { UpFormControl } from "../UpForm/UpFormControl";
export default class UpEnum extends UpFormControl<number> {
    constructor(p: any, c: any);
    renderField(): JSX.Element;
    private readonly schema;
    private readonly isArray;
}
