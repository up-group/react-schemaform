import * as React from "react";

interface UpFormLabelProps {
    title: string;
}

export default class UpFormLabel extends React.Component<UpFormLabelProps, {}>{
    constructor(p, c) {        super(p, c);
    }

    render() {
        return <label className="control-label" >
            { this.props.title }
        </label>
    }
}
