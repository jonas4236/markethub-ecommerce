import React from "react";
import Header from "../components/Header";
import FlashSale from "../components/FlashSale";
import Categories from "../components/Categories/Categories";
import Month from "../components/Month/Month";
import AdsCategories from "../components/AdsCategories";
import Featured from "../components/Featured";
import Deliverly from "../components/deliverly1/deliverly";

const HomePage = () => {
  return (
    <>
      <Header />
      <FlashSale />
      <Categories />
      <Month />
      <AdsCategories />
      <Featured />
      <Deliverly />
    </>
  );
};

export default HomePage;
