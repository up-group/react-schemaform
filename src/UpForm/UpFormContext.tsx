import * as React from 'react';

const UpFormContext = React.createContext<{
  withFloatingLabel: boolean;
  rowSpacing?: number;
  columnSpacing?: number;
  defaultColspan?: number;
  
}>({
  withFloatingLabel: false,
  rowSpacing: 5,
  columnSpacing: 5,
  defaultColspan: 24,
});

export const UpFormContextProvider = UpFormContext.Provider;
export const UpFormContextConsumer = UpFormContext.Consumer;
