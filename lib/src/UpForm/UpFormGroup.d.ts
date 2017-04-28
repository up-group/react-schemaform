/// <reference types="react" />
import * as React from "react";
export interface UpFormGroupProps {
    hasError?: boolean;
    title: string;
    description: string;
    isRequired: boolean;
    colSize: number;
}
export default class UpFormGroup extends React.Component<UpFormGroupProps, {}> {
    constructor(p: any, c: any);
    componentDidMount(): void;
    render(): JSX.Element;
    onerror: () => void;
}
