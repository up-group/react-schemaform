/// <reference types="react" />
import { UpFormControl } from "../UpForm/UpFormControl";
export default class UpBoolean extends UpFormControl<Boolean> {
    constructor(p: any, c: any);
    renderField(): JSX.Element;
    handleChangeData(args: boolean): {
        hasError: boolean;
        errorMessage: any;
        correctValue: boolean;
    };
}
