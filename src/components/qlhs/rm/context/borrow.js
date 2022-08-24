import React, { useState } from "react";
import { createContext } from "react";

export const BorrowContext = createContext();

const BorrowContextProvider = ({ children }) => {
  const [records, setRecords] = useState([]);
  const [borrowSelected, setBorrowSelected] = useState([]);
  const [data, setData] = useState({});

  const borrowContextData = {
    records,
    setRecords,
    borrowSelected,
    setBorrowSelected,
    data,
    setData,
  };
  return <BorrowContext.Provider value={borrowContextData}>{children}</BorrowContext.Provider>;
};

export default BorrowContextProvider;
