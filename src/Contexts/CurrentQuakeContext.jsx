import React, { createContext, useState } from "react";

export const CurrentQuakeContext = createContext();

export function CurrentQuakeProvider({ children }) {
  const [currentQuake, setCurrentQuake] = useState(null);

  return (
    <CurrentQuakeContext.Provider value={{ currentQuake, setCurrentQuake }}>
      {children}
    </CurrentQuakeContext.Provider>
  );
}