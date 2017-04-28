/// <reference types="react" />
import * as React from "react";
export default class UpDisplayDate extends React.Component<{
    date: Date | string;
    format: string;
}, {}> {
    constructor(p: any, c: any);
    render(): JSX.Element;
    getDateStr(date: any): string;
    getHourStr(date: any): string;
    CompleteDigit(digit: any): string;
    getDate(date: any): string;
    getMonth(date: any): string;
    getHours(date: any): string;
    getMinutes(date: any): string;
}
