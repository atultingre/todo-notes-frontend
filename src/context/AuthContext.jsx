import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const api = "https://todo-notes-backend.onrender.com/api";
  const [resetToken, setResetToken] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        resetToken,
        setResetToken,
        loading,
        setLoading,
        token,
        setToken,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
