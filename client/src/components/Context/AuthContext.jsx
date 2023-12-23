import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState(
    JSON.parse(localStorage.getItem("infoUser") || null)
  );

  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username") || null)
  );

  const login = async (user) => {
    const url = "http://localhost:1337/api/auth/local";

    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);

        if (data.jwt) {
          setInfoUser(data);
          setUsername(data.user.username);
          Swal.fire({
            title: "Login Successfully!",
            text: `Welcome to MarketHub! If you love shopping we are family!`,
            icon: "success",
          });
        } else {
          setInfoUser(null);
          setUsername(null);
        }
      }
    } catch (err) {
      console.log("error auth login:", err);
      Swal.fire({
        title: "Login Failed!",
        text: `Your username or password is Incorrect!`,
        icon: "error",
      });
    }
  };

  const register = async (username, email, password) => {
    const url = "http://localhost:1337/api/auth/local/register";

    try {
      const { data } = await axios.post(url, {
        username: username,
        email: email,
        password: password,
      });

      if (data.jwt) {
        setInfoUser(data);
        setUsername(data.user.username);
        Swal.fire({
          title: "Register Successfully!",
          text: `Welcome to MarketHub! If you love shopping we are family!`,
          icon: "success",
        });
      } else {
        setInfoUser(null);
        setUsername(null);
      }
    } catch (err) {
      setInfoUser(null);
      setUsername(null);
      console.log("err can't not register: ", err);
      Swal.fire({
        title: "Register Failed!",
        text: `Have something went wrong!`,
        icon: "error",
      });
    }
  };

  const logout = async () => {
    setInfoUser(null);
    setUsername(null);
    location.reload(true);
    try {
      // Additional logout logic if needed
    } catch (err) {
      console.log("error can't logout account: ", err);
    }
  };

  useEffect(() => {
    localStorage.setItem("infoUser", JSON.stringify(infoUser));
  }, [infoUser]);

  useEffect(() => {
    localStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  // console.log("infouser: ", infoUser);
  // console.log("Username: ", username);

  return (
    <AuthContext.Provider
      value={{ login, infoUser, username, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
