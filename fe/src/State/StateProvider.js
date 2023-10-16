import React, { useState, createContext, useContext } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
  const [appState, setAppState] = useState(29);

  return (
    <StateContext.Provider
      value={[appState, setAppState]}
      {...props}
    ></StateContext.Provider>
  );
};

export const useStateStore = () => useContext(StateContext);
