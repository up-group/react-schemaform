export enum dateFormat {
    dateTime,
    date
}

export class TypeDateControl implements ErrorControl<any> {

    constructor(public dateFormat: dateFormat) {
    }    isValidValue(value: string | Date): errorControlType<Date> {

        if (value === "" || value === null) {
            return { hasError: false, correctValue: null }
        }

        var valueDate = value as Date;
        if (typeof (value) === "string") {
            valueDate = new Date(value as string);
        }

        if (this.dateFormat === dateFormat.date) {
            valueDate = new Date(valueDate.getFullYear(), valueDate.getMonth(), valueDate.getDate(), 0, 0, 0, 0)
        }

        return { hasError: false, correctValue: valueDate}
    }
}
