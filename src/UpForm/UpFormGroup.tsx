import * as $ from "jquery";
import * as React from "react";

import {
  UpLabel,
  UpBox,
  UpGrid,
  UpCol,
  UpRow,
} from "@up-group-ui/react-controls";

export interface UpFormGroupProps {
  hasError?: boolean;
  title: string;
  description: string;
  isRequired: boolean;
  children: any;
  withFloatingLabel?: boolean;
}

const UpFormGroup = (props: UpFormGroupProps) => {
  const {
    title,
    description,
    isRequired,
    children,
    withFloatingLabel,
  } = props;
  
  let additionalElements = (
    <>
      {description != null ? (
        <a
          data-toggle="tooltip"
          data-placement="bottom"
          data-html="true"
          title={description}
        >
          <i className="glyphicon glyphicon-info-sign" />
        </a>
      ) : null}
      <span style={{ color: "red" }}>{isRequired ? " *" : ""}</span>
    </>
  );

  if (withFloatingLabel) {
    return (
      <>
        {title && children}
      </>
    );
  }
  return (
    <>
      {title && <UpLabel text={title}>{additionalElements}</UpLabel>}
      {children}
    </>
  );
};

export default UpFormGroup;
