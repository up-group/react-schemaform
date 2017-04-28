/// <reference types="react" />
import * as React from "react";
import UpSchemaDisplaySelector from "./UpSchemaDisplaySelector";
export default class UpSchemaDisplay extends React.Component<{
    schema: JsonSchema;
    data: any;
}, {}> {
    constructor(p: any, c: any);
    UpSchemaDisplaySelectorRef: UpSchemaDisplaySelector;
    render(): JSX.Element;
}
