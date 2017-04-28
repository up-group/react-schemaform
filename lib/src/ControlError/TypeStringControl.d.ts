export default class TypeStringControl implements ErrorControl<any> {
    private _pattern;
    private _patternErrorMessage;
    constructor(patern: RegExp, patternErrorMessage: string);
    isValidValue(value: string): errorControlType<string>;
}
