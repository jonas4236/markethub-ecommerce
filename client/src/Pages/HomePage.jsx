import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import FlashSale from "../components/FlashSale";
import Categories from "../components/Categories/Categories";
import AdsCategories from "../components/AdsCategories";
import Featured from "../components/Featured";
import Service from "../components/Service/MainServiceComponents";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/Context/AuthContext";
import Swal from "sweetalert2";
import RecommendedProducts from "../components/RecommendedProducts/RecommendedProducts";

const HomePage = () => {
  const [dataSession, setDataSession] = useState(null);
  const [detected, setDetected] = useState(false);
  const { params } = useParams();

  const { username, cartData } = useContext(AuthContext);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.match(/^\/success=.*/)) {
      setDataSession(params);
    }
  }, []);

  const getIdFromCart =
    cartData?.data?.map((value) => value.attributes.quantity) || null;
  // console.log("getIdFromCart:", getIdFromCart);
  const updateNewStock = {
    dataStockQuantity: getIdFromCart,
  };

  // check did server response /success={CHECKOUT_SESSION_ID} and then removed all item in cart.
  useEffect(() => {
    if (pathname.match(/^\/success=.*/) && !detected) {
      navigate("/"); // redirect to "/" if successful payment was already detected
    } else if (dataSession && !detected) {
      setDetected(true);
      axios
        .put(`${process.env.API_STRAPI}/api/stock/${username}`, updateNewStock)
        .then(() => {
          axios.delete(`${process.env.API_STRAPI}/api/cart/${username}`);
          Swal.fire({
            title: "Purchase successfully!",
            text: "Thank you for your interest in our products!",
            icon: "success",
          }).then(() => {
            window.location.reload();
            setDataSession(null);
          });
        });
    }
  }, [dataSession, detected, navigate, pathname]); // Include navigate in dependencies

  // console.log("dataSession:", dataSession);
  // console.log("detected:", detected);
  // console.log("pathname:", pathname);

  return (
    <>
      <Header />
      <FlashSale />
      <Categories />
      <RecommendedProducts />
      <AdsCategories />
      <Featured />
      <Service />
    </>
  );
};

export default HomePage;
