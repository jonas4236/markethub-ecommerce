import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import  secureLocalStorage  from  "react-secure-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState(
    JSON.parse(secureLocalStorage.getItem("infoUser") || null)
  );

  const [username, setUsername] = useState(
    JSON.parse(secureLocalStorage.getItem("username") || null)
  );

  const [email, setEmail] = useState(
    JSON.parse(secureLocalStorage.getItem("email") || null)
  );

  const [cartData, setCartData] = useState(
    JSON.parse(secureLocalStorage.getItem("cartData") || null)
  );

  const [overAllSubtotal, setOverAllSubtotal] = useState(
    JSON.parse(secureLocalStorage.getItem("overAllSubtotal") || null)
  );

  const [token, setToken] = useState(
    JSON.parse(secureLocalStorage.getItem("token") || null)
  );

  const [countdown, setCountdown] = useState(
    parseInt(secureLocalStorage.getItem("countdown")) || 10800
  );

  const [numberOfCate, setNumberOfCate] = useState(
    parseInt(secureLocalStorage.getItem("numberOfCate")) || 1
  );

  const subtotal = (price, quantity) => {
    return price * quantity;
  };

  const login = async (user) => {
    const url = `${process.env.API_STRAPI}/api/auth/local`;

    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);

        if (data.jwt) {
          setInfoUser(data);
          setUsername(data.user.username);
          setEmail(data.user.email);
          setToken(data.jwt);
          secureLocalStorage.setItem("username", JSON.stringify(username));
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
    const url = `${process.env.API_STRAPI}/api/auth/local/register`;

    const regis = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const { data } = await axios.post(url, regis);
      console.log("DATA:", data);

      if (data.jwt) {
        Swal.fire({
          title: "Register Successfully!",
          text: `Welcome ${username} to MarketHub! Let's login for shopping!`,
          icon: "success",
        }).then(() => {
          window.location.href = "/login";
        });
      }
    } catch (err) {
      console.log("err can't not register: ", err);
      Swal.fire({
        title: "Register Failed!",
        text: `Have something went wrong your username or password incorrect!`,
        icon: "error",
      });
    }
  };

  const addWishlist = async (wishlistData) => {
    const urlWishlist = `${process.env.API_STRAPI}/api/wishlists`;
    const stringWlId = String(wishlistData.wlId);
    const stringPricePerPiece = String(wishlistData.priceperpiece);
    const stringDiscount = String(wishlistData.discount);

    const wishlistItems = {
      data: {
        wlId: stringWlId,
        username: wishlistData.username,
        title: wishlistData.title,
        slug: wishlistData.slug,
        category: wishlistData.category,
        PricePerPiece: stringPricePerPiece,
        image: wishlistData.image,
        discount: stringDiscount,
      },
    };

    try {
      const { data } = await axios.post(urlWishlist, wishlistItems);

      if (data) {
        Swal.fire({
          title: "Added to Wishlist!",
          text: `${wishlistData.title} has been added to your wishlist.`,
          icon: "success",
        }).then(() => {
          location.reload(true);
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

  const addCart = async (Cart) => {
    const urlCart = `${process.env.API_STRAPI}/api/carts`;
    const NumberPrice = Number(Cart.priceperpiece);

    const cartItems = {
      data: {
        pdId: Cart.pdId,
        title: Cart.title,
        image: Cart.image,
        price: NumberPrice,
        quantity: Cart.productQuantity,
        stock: Cart.stock,
        selectedSize: Cart.selectedSize,
        size: Cart.size,
        username: Cart.username,
      },
    };

    try {
      const { data } = await axios.post(urlCart, cartItems);

      if (data) {
        Swal.fire({
          title: "Added to Cart!",
          text: `${Cart.title} has been added to your cart.`,
          icon: "success",
        }).then(() => {
          location.reload(true);
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire({
        title: "Error",
        text: `There was an error adding the item to your cart: ${
          error.response.data.error.message || error
        }`,
        icon: "error",
      });
    }
  };

  const removeWishlist = async (id) => {
    const urlRemoveWishlist = `${process.env.API_STRAPI}/api/wishlists/${id}`;
    const { data } = await axios.delete(urlRemoveWishlist);
    if (data) {
      Swal.fire({
        title: "Remove Wishlist Successfully!",
        text: `You have removed ${data.data.attributes.title} from your wishlist!`,
        icon: "success",
      }).then(() => {
        location.reload(true);
      });
    }
  };

  const removeCart = async (id) => {
    const urlRemoveCart = `${process.env.API_STRAPI}/api/carts/${id}`;
    const { data } = await axios.delete(urlRemoveCart);
    if (data) {
      Swal.fire({
        title: "Remove Cart Successfully!",
        text: `You have removed ${data.data.attributes.title} from your cart!`,
        icon: "success",
      }).then(() => {
        location.reload(true);
      });
    }
  };

  const updateCart = async (cartItemId, updatedData, updatedTitle) => {
    const urlUpdateCart = `${process.env.API_STRAPI}/api/carts/${cartItemId}`;

    // regex / non-greedy เปลี่ยนค่า(replace) อะไรก็ตามที่อยู่ใน "[]" bracket example: Air Jordan 1 Mid SE [UK 9] to ตามด้วยค่าปัจจุบันที่ทำการอัพเดตไป(Air Jordan 1 Mid SE [updatedData]) หรือ exmaple = Air Jordan 1 Mid SE [UK 10] / "UK 10" คือค่าไหม่ที่ทำการ updated จาก frontend.
    const updatedTitleWithSize = updatedTitle.replace(
      /\[.*?\]/,
      `[${updatedData}]`
    );
    const updateSize = {
      data: {
        title: updatedTitleWithSize,
        selectedSize: updatedData,
      },
    };

    try {
      await axios.put(urlUpdateCart, updateSize);
      const res = await axios.get(
        `http://localhost:1337/api/carts?populate=*&filters[username][$eq]=${username}`
      );
      setCartData(res.data);
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: `There was an error updating the cart item: ${
          error.response.data.error.message || error
        }`,
        icon: "error",
      });
    }
  };

  const updateQuantiy = async (ProductId, updatedQuan) => {
    const urlUpdateQuantity = `${process.env.API_STRAPI}/api/carts/${ProductId}`;

    const updateQuan = {
      data: {
        quantity: updatedQuan,
      },
    };

    try {
      await axios.put(urlUpdateQuantity, updateQuan);
      const res = await axios.get(
        `http://localhost:1337/api/carts?populate=*&filters[username][$eq]=${username}`
      );
      setCartData(res.data);

      const updatedSummaryTotal = res.data?.data?.reduce(
        (acc, item) =>
          acc + subtotal(item.attributes.price, item.attributes.quantity),
        0
      );
      setOverAllSubtotal(updatedSummaryTotal);
    } catch (error) {
      console.error("Error updating cart:", error);
      Swal.fire({
        title: "Error",
        text: `There was an error updating the cart item: ${
          error.response.data.error.message || error
        }`,
        icon: "error",
      });
    }
  };

  const updateStars = async (id, receiveStars) => {
    const urlUpdateStars = `${process.env.API_STRAPI}/api/products/${id}`;

    const updateStar = {
      data: {
        stars: receiveStars,
      },
    };

    try {
      await axios.put(urlUpdateStars, updateStar);
    } catch (e) {
      console.log("error can't update the stars of product:", e);
    }
  };

  const logout = async () => {
    try {
      setInfoUser(null);
      setUsername(null);
      setEmail(null);
      setCartData(null);
      setOverAllSubtotal(0);
      setToken(null);
      location.reload(true);
    } catch (err) {
      console.log("error can't logout account: ", err);
    }
  };

  useEffect(() => {
    secureLocalStorage.setItem("countdown", countdown.toString());
  }, [countdown]);

  useEffect(() => {
    secureLocalStorage.setItem("numberOfCate", numberOfCate.toString());
  }, [numberOfCate]);

  useEffect(() => {
    secureLocalStorage.setItem("infoUser", JSON.stringify(infoUser));
  }, [infoUser]);

  useEffect(() => {
    secureLocalStorage.setItem("username", JSON.stringify(username));
  }, [username]);

  useEffect(() => {
    secureLocalStorage.setItem("email", JSON.stringify(email));
  }, [email]);

  useEffect(() => {
    secureLocalStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    secureLocalStorage.setItem("token", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    secureLocalStorage.setItem(
      "overAllSubtotal",
      JSON.stringify(overAllSubtotal) || 0
    );
  }, [overAllSubtotal]);

  useEffect(() => {
    if (username) {
      const fetchTotal = async () => {
        try {
          const res = await axios.get(
            `${process.env.API_STRAPI}/api/carts?populate=*&filters[username][$eq]=${username}`
          );
          setCartData(res.data);

          const updatedSummaryTotal = res.data?.data?.reduce(
            (acc, item) =>
              acc + subtotal(item.attributes.price, item.attributes.quantity),
            0
          );

          setOverAllSubtotal(updatedSummaryTotal);
        } catch (error) {
          console.log("error cannot get data total:", error);
        }
      };

      fetchTotal();
    }
  }, [username]);

  return (
    <AuthContext.Provider
      value={{
        login,
        infoUser,
        username,
        email,
        cartData,
        token,
        overAllSubtotal,
        addWishlist,
        addCart,
        removeCart,
        updateCart,
        updateQuantiy,
        removeWishlist,
        logout,
        register,
        countdown,
        setCountdown,
        numberOfCate,
        setNumberOfCate,
        updateStars,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
