import React, { useState } from "react";
import { createContext } from "react";

export const IndexContext = createContext();

const IndexContextProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const indexContextData = { searchValue, setSearchValue };
  return <IndexContext.Provider value={indexContextData}>{children}</IndexContext.Provider>;
};

export default IndexContextProvider;
