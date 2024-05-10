import { createContext, useState, useContext, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);

  const contextValue = { collapsed, setCollapsed };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
