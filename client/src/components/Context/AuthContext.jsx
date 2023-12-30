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

  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist") || null)
  );

  const login = async (user) => {
    const url = "http://localhost:1337/api/auth/local";

    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);

        if (data.jwt) {
          setInfoUser(data);
          setUsername(data.user.username);
          localStorage.setItem("username", JSON.stringify(username));
          Swal.fire({
            title: "Login Successfully!",
            text: `Welcome ${data.user.username} to MarketHub! If you love shopping we are family!`,
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

    const regis = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(url, regis);

      if (data.jwt) {
        setInfoUser(data);
        setUsername(data.user.username);
        localStorage.setItem("username", JSON.stringify(username));
        Swal.fire({
          title: "Register Successfully!",
          text: `Welcome ${username} to MarketHub! If you love shopping we are family!`,
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

  const addWishlist = async (wishlistData) => {
    const urlWishlist = "http://localhost:1337/api/wishlists";

    // console.log("Type of username backend:", typeof username);
    // console.log("Value of username backend:", username);

    const stringWlId = String(wishlistData.wlId);

    const wishlistItems = {
      data: {
        wlId: stringWlId,
        username: wishlistData.username,
        title: wishlistData.title,
        slug: wishlistData.slug,
        category: wishlistData.category,
        PricePerPiece: wishlistData.priceperpiece,
        discount: wishlistData.discount,
        image: wishlistData.image,
      },
    };

    try {
      const { data } = await axios.post(urlWishlist, wishlistItems);

      if (data) {
        setWishlist(data);
        console.log("Wishlist item added successfully:", data);
        Swal.fire({
          title: "Added to Wishlist!",
          text: "Item has been added to your wishlist.",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      Swal.fire({
        title: "Error",
        text: `There was an error adding the item to your wishlist: ${
          error.response.data.error.message || error
        }`,
        icon: "error",
      });
    }
  };

  const logout = async () => {
    setInfoUser(null);
    setUsername(null);
    setWishlist(null);
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

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // console.log("infouser: ", infoUser);
  // console.log("Username: ", username);

  return (
    <AuthContext.Provider
      value={{
        login,
        infoUser,
        username,
        wishlist,
        addWishlist,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
