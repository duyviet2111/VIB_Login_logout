import React, { useState } from "react";
import { createContext } from "react";

export const ApproveContext = createContext();

const ApproveContextProvider = ({ children }) => {
  const [approvement, setApprovement] = useState(false);

  const ApproveContextData = { approvement, setApprovement };
  return <ApproveContext.Provider value={ApproveContextData}>{children}</ApproveContext.Provider>;
};

export default ApproveContextProvider;
