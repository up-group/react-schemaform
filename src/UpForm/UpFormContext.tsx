import * as React from 'react';

const UpFormContext = React.createContext<{
  withFloatingLabel: boolean;
  
}>({
  withFloatingLabel: false
});

export const UpFormContextProvider = UpFormContext.Provider;
export const UpFormContextConsumer = UpFormContext.Consumer;
