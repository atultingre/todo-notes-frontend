import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const api = "https://todo-notes-backend.onrender.com/api";
  // const api = "http://localhost:8000/api";
  const [resetToken, setResetToken] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUserId(localStorage.getItem("userId"));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        resetToken,
        setResetToken,
        userId,
        setUserId,
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
