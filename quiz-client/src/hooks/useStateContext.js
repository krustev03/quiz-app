import React, { createContext, useContext, useEffect, useState } from "react";

export const StateContext = createContext();

const getFreshContext = () => {
  if (localStorage.getItem("context") === null) {
    localStorage.setItem(
      "context",
      JSON.stringify({
        participantId: 0,
        timeTaken: 0,
        selectedOptions: [],
      })
    );
  }

  return JSON.parse(localStorage.getItem("context"));
};

export function useStateContext() {
  const { context, setContext } = useContext(StateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    },
    resetContext: () => {
      localStorage.removeItem("context");
      setContext(getFreshContext());
    }
  };
}

export function ContextProvider({ children }) {
  const [context, setContext] = useState(getFreshContext());

  useEffect(() => {
    localStorage.setItem("context", JSON.stringify(context));
  }, [context]);

  return (
    <StateContext.Provider value={{ context, setContext }}>
      {children}
    </StateContext.Provider>
  );
}
