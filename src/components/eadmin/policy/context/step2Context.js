import React, { useState } from "react";
import { createContext } from "react";

export const Step2Context = createContext();

const Step2ContextProvider = ({ children }) => {
  const [fileAttachment, setFileAttachment] = useState([]);

  const step2ContextData = { fileAttachment, setFileAttachment };
  return <Step2Context.Provider value={step2ContextData}>{children}</Step2Context.Provider>;
};

export default Step2ContextProvider;
