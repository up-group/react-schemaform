import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import * as React from "react";

import { UpLabel } from "@up-group/react-controls";

export interface UpFormGroupProps {
    hasError?: boolean;
    title: string;
    description: string
    isRequired: boolean;
    colSize: number;
}


export default class UpFormGroup extends React.Component<UpFormGroupProps, {}>{

    constructor(p, c) {        super(p, c);
    }

    componentDidMount() {
        // $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return <div className={"col-md-" + this.props.colSize + " form-group"}>
            <UpLabel text={this.props.title} />
            {this.props.description != null ?
                <a data-toggle="tooltip" data-placement="bottom" data-html="true" title={this.props.description}>
                    <i className='glyphicon glyphicon-info-sign'></i>
                </a>
                : null
            }

            <span style={{ color: "red" }}  >{this.props.isRequired ? " *" : ""}</span>
            {this.props.children}        </div>    }

    onerror = () => {
        console.log("error change")
    }
}
