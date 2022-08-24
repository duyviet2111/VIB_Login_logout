import React, { useState } from "react";
import { createContext } from "react";

export const ARCContext = createContext();

const ARCContextProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [print, setPrint] = useState(false);
  const [save, setSave] = useState(false);
  const [isInventory, setIsInventory] = useState(false);
  const [isDestroy, setIsDestroy] = useState(false);

  const arcContextData = {
    showModal,
    setShowModal,
    print,
    setPrint,
    save,
    setSave,
    isInventory,
    setIsInventory,
    isDestroy,
    setIsDestroy,
  };
  return <ARCContext.Provider value={arcContextData}>{children}</ARCContext.Provider>;
};

export default ARCContextProvider;
