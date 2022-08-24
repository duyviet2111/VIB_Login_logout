import React, { useState } from "react";
import { createContext } from "react";

export const BorrowAdditionalContext = createContext();

const BorrowAdditionalContextProvider = ({ children }) => {
  const [selectedRecord, setSelectedRecord] = useState("");
  const [selectedRecord2, setSelectedRecord2] = useState([]);
  const [createRecord, setCreateRecord] = useState("");
  const [borrowAdditional, setBorrowAdditional] = useState("");
  const [rmCard, setRmCard] = useState(false);
  const [attachedCover, setAttachedCover] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const borrowAdditionData = {
    selectedRecord,
    setSelectedRecord,
    createRecord,
    setCreateRecord,
    selectedRecord2,
    setSelectedRecord2,
    borrowAdditional,
    setBorrowAdditional,
    rmCard,
    setRmCard,
    attachedCover,
    setAttachedCover,
    openModal,
    setOpenModal,
    submitSuccess,
    setSubmitSuccess,
  };
  return (
    <BorrowAdditionalContext.Provider value={borrowAdditionData}>
      {children}
    </BorrowAdditionalContext.Provider>
  );
};

export default BorrowAdditionalContextProvider;
