import React, { createContext, useContext, useState } from "react";

// Creating Context for Progress Bar
const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [isProgressVisible, setIsProgressVisible] = useState(false);

  const showProgress = () => {
    // console.log("Inside the Show Progress")
    setIsProgressVisible(true);
  }
  const hideProgress = () => {
    // console.log("Inside Hide Progress Bar")
    setIsProgressVisible(false);
  }

  return (
    <ProgressContext.Provider value={{ isProgressVisible, showProgress, hideProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
};