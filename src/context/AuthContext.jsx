import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [resetToken, setResetToken] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        resetToken,
        setResetToken,
        loading,
        setLoading,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
