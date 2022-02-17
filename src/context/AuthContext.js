import React, { useContext, useState } from "react";
import { auth } from "../firebase-config";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrnetUser] = useState();

  function Login(email, password) {
    return auth.lo(email, password);
  }

  const value = {
    currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
