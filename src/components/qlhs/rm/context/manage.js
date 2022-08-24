import React, { useState } from "react";
import { createContext } from "react";

export const ManageContext = createContext();

const ManageContextProvider = ({ children }) => {
  const [manageRecords, setManageRecords] = useState("");
  const [detailsRecord, setDetailsRecord] = useState({});

  const manageContextData = { manageRecords, setManageRecords, detailsRecord, setDetailsRecord };
  return <ManageContext.Provider value={manageContextData}>{children}</ManageContext.Provider>;
};

export default ManageContextProvider;
