import * as React from "react";
import * as ReactDOM from "react-dom";

export default class UpDisplayDate extends React.Component<{ date: Date | string, format: string }, {}> {
    constructor(p, c) {        super(p, c);
    }

    render() {
        var date: Date = null;
        if (this.props.date == null) {
            return <span/>
        }
        else if (typeof (this.props.date) === "string") {
            date = new Date(this.props.date as string);
        } else if (this.props.date instanceof Date) {
            date = this.props.date as Date;
        }

        if (date == null || isNaN(date.valueOf()) === true) {
            return <span/>
        }
        switch (this.props.format) {
            case "date":
                return <span>{this.getDateStr(date) }</span>
            case "date-time":
                return <span>{this.getDateStr(date) } { this.getHourStr(date) }</span>
            case "time":
                return <span>{ this.getHourStr(date) }</span>
            default:
                //todo format type dd-mm-yyyy
                return <span/>
        }
    }

    getDateStr(date) {
        return this.getDate(date) + "/" + this.getMonth(date) + "/" + date.getFullYear()
    }
    getHourStr(date) {
        return this.getHours(date) + ":" + this.getMinutes(date);
    }
    CompleteDigit(digit) { return digit <= 9 ? "0" + digit : "" + digit; }
    getDate(date) { return this.CompleteDigit(date.getDate()); }
    getMonth(date) { return this.CompleteDigit(date.getMonth() + 1); }
    getHours(date) { return this.CompleteDigit(date.getHours()); }
    getMinutes(date) { return this.CompleteDigit(date.getMinutes()); }
}
