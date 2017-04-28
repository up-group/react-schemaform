/// <reference types="react" />
import * as React from "react";
export default class UpSchemaDisplayArray extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {
    constructor(p: any, c: any);
    private btnExport;
    componentDidUpdate: () => void;
    componentDidMount: () => void;
    exportArrayToCsv(): void;
    render(): JSX.Element;
}
