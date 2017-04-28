/// <reference types="react" />
import * as React from "react";
import UpSchemaDisplayArray from "./UpSchemaDisplayArray";
export default class UpSchemaDisplaySelector extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {
    UpSchemaDisplayArrayRef: UpSchemaDisplayArray;
    constructor(p: any, c: any);
    render(): JSX.Element;
}
