import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState(
    JSON.parse(localStorage.getItem("infoUser")) || null
  );

  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username")) || null
  );

  useEffect(() => {
    localStorage.setItem("infoUser", JSON.stringify(infoUser));
  }, [infoUser]);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  return (
    <AuthContext.Provider value={{ infoUser, username }}>
      {children}
    </AuthContext.Provider>
  );
};
