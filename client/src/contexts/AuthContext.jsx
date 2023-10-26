// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, getIdToken } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth(); // Initialize Firebase auth

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("token", token);
  }, [currentUser, token]);

  const refreshIdToken = async () => {
    try {
      const idToken = await getIdToken(auth.currentUser);
      setToken(idToken);
    } catch (error) {
      console.error("Error refreshing ID token:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshIdToken, 1000 * 60 * 60); // Refresh token every 1 hour

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    token,
    setToken,
    refreshIdToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
