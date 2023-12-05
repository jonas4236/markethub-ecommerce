import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const ListItems = ({ data, slug }) => {
  return (
    <>
      <div className="">
        <ProductCard product={data} slug={slug} />
      </div>
    </>
  );
};

export default ListItems;
