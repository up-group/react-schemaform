export default class ControlErrorCentral {
    private ErrorControl;
    constructor();
    addControl(control: ErrorControl<any>): void;
    isValidValue(value: any): errorControlType<any>;
}
