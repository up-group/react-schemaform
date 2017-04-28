export declare enum dateFormat {
    dateTime = 0,
    date = 1,
}
export declare class TypeDateControl implements ErrorControl<any> {
    dateFormat: dateFormat;
    constructor(dateFormat: dateFormat);
    isValidValue(value: string | Date): errorControlType<Date>;
}
