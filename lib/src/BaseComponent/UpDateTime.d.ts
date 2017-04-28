/// <reference types="react" />
import { UpFormControl } from "../UpForm/UpFormControl";
export default class UpDateTimeComp extends UpFormControl<Date> {
    inputElementGroup: HTMLDivElement;
    constructor(p: any, c: any);
    renderField(): JSX.Element;
}
