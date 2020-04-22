import * as React from 'react';

const UpFormContext = React.createContext<{
  formWithFloatingLabel: boolean;
  
}>({
  formWithFloatingLabel: false
});

export const UpFormContextProvider = UpFormContext.Provider;
export const UpFormContextConsumer = UpFormContext.Consumer;
