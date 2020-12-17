import * as React from 'react';

const UpFormContext = React.createContext<{
  withFloatingLabel: boolean;
  rowSpacing?: number;
  gutter?: number;
  defaultColspan?: number;
  rowMinHeight?:number;
}>({
  withFloatingLabel: false,
  rowSpacing: 5,
  gutter: 5,
  defaultColspan: 24,
  rowMinHeight: 70
});

export const UpFormContextProvider = UpFormContext.Provider;
export const UpFormContextConsumer = UpFormContext.Consumer;
