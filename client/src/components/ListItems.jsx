import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const ListItems = ({ data, slugCategory }) => {
  return (
    <>
      <div className="">
        <ProductCard product={data} slugCategory={slugCategory} />
      </div>
    </>
  );
};

export default ListItems;
