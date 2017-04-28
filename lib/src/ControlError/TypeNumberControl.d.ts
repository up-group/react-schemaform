export default class TypeNumberControl implements ErrorControl<any> {
    private _isInteger;
    private _minValue;
    private _maxValue;
    constructor(isInteger: boolean, minValue: number, maxValue?: number);
    isValidValue(value: number | string): errorControlType<number>;
}
