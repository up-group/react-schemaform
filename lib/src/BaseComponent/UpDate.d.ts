/// <reference types="react" />
import { UpFormControl } from "../UpForm/UpFormControl";
export default class UpDateComp extends UpFormControl<Date> {
    inputElementGroup: HTMLDivElement;
    constructor(p: any, c: any);
    renderField(): JSX.Element;
}
