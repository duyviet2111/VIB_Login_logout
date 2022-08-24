import React, { useState } from "react";
import { createContext } from "react";

export const ReturnAndExtendContext = createContext();

const ReturnContextProvider = ({ children }) => {
  const [selected, setSelected] = useState("");

  const returnContextData = { selected, setSelected };
  return (
    <ReturnAndExtendContext.Provider value={returnContextData}>
      {children}
    </ReturnAndExtendContext.Provider>
  );
};

export default ReturnContextProvider;
