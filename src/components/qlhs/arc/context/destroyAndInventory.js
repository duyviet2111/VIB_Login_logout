import React, { useState } from "react";
import { createContext } from "react";

export const DestroyAndInventoryContext = createContext();

const DestroyAndInventoryContextProvider = ({ children }) => {
  const [isInventory, setIsInventory] = useState(false);
  const [isDestroy, setIsDestroy] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const DestroyAndInventoryContextData = {
    isInventory,
    setIsInventory,
    isDestroy,
    setIsDestroy,
    showModal,
    setShowModal,
  };
  return (
    <DestroyAndInventoryContext.Provider value={DestroyAndInventoryContextData}>
      {children}
    </DestroyAndInventoryContext.Provider>
  );
};

export default DestroyAndInventoryContextProvider;
