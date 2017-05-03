import * as $ from "jquery";
import * as bootstrap from "bootstrap";
import * as React from "react";

import { UpLabel,UpBox, UpGrid, UpCol, UpRow } from "@up-group/react-controls";

export interface UpFormGroupProps {
    hasError?: boolean;
    title: string;
    description: string
    isRequired: boolean;
}


export default class UpFormGroup extends React.Component<UpFormGroupProps, {}>{

    constructor(p, c) {        super(p, c);
    }

    componentDidMount() {
        // $('[data-toggle="tooltip"]').tooltip();
    }

    render() {
        return <UpBox >
            <UpLabel text={this.props.title} >
                {this.props.description != null ?
                    <a data-toggle="tooltip" data-placement="bottom" data-html="true" title={this.props.description}>
                        <i className='glyphicon glyphicon-info-sign'></i>
                    </a>
                    : null
                }

                <span style={{ color: "red" }}  >{this.props.isRequired ? " *" : ""}</span>
            </UpLabel>
            {this.props.children}        </UpBox>    }

    onerror = () => {
        console.log("error change")
    }
}
