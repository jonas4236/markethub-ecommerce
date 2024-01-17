import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [infoUser, setInfoUser] = useState(
    JSON.parse(localStorage.getItem("infoUser") || null)
  );

  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem("username") || null)
  );

  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData") || null)
  );

  const [overAllSubtotal, setOverAllSubtotal] = useState(
    JSON.parse(localStorage.getItem("overAllSubtotal") || null)
  );

  const subtotal = (price, quantity) => {
    return price * quantity;
  };

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
    const urlCart = "http://localhost:1337/api/carts";
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
    const urlRemoveWishlist = `http://localhost:1337/api/wishlists/${id}`;
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
    const urlRemoveCart = `http://localhost:1337/api/carts/${id}`;
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
    const urlUpdateCart = `http://localhost:1337/api/carts/${cartItemId}`;

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

    console.log("title backend:", updateSize);

    try {
      await axios.put(urlUpdateCart, updateSize);
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
    const urlUpdateQuantity = `http://localhost:1337/api/carts/${ProductId}`;

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

  const logout = async () => {
    try {
      setInfoUser(null);
      setUsername(null);
      setCartData(null);
      setOverAllSubtotal(0);
      location.reload(true);
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
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  useEffect(() => {
    localStorage.setItem(
      "overAllSubtotal",
      JSON.stringify(overAllSubtotal) || 0
    );
  }, [overAllSubtotal]);

  useEffect(() => {
    if (username) {
      const fetchTotal = async () => {
        try {
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
        overAllSubtotal,
        addWishlist,
        addCart,
        removeCart,
        updateCart,
        updateQuantiy,
        removeWishlist,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
