import * as $ from "jquery";
import * as React from "react";

import {
  UpLabel,
  UpLigne
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
    </>
  );

  if (withFloatingLabel) {
    return (
      <>
        {children}
      </>
    );
  }
  return (
    <>
      {title && (
        <div style={{display:'flex',alignItems:'center'}}>
          <UpLabel text={title}></UpLabel>
          {isRequired ? (
            <UpLigne> * </UpLigne>
          ) : null}
          {additionalElements}
        </div>
      )}
      {children}
    </>
  );
};

export default UpFormGroup;
