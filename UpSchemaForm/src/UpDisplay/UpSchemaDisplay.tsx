import * as React from "react";
import * as ReactDOM from "react-dom";

import UpSchemaDisplaySelector from "./UpSchemaDisplaySelector";

export default class UpSchemaDisplay extends React.Component<{
    schema: JsonSchema,
    data: any
}, {}> {
    constructor(p, c) {        super(p, c);
    }

    UpSchemaDisplaySelectorRef: UpSchemaDisplaySelector;

    render() {
        if (this.props.data == null) {
            return null;
        }

        return <div className="jumbotron" >
            <UpSchemaDisplaySelector
                ref={(arg) => { this.UpSchemaDisplaySelectorRef = arg; } }
                schema={this.props.schema }
                data={this.props.data} />
        </div >
    }
}

