import React from "react";
import ProductCard from "./ProductCard";

const ListItems = ({
  data,
  slugCategory,
  priceFilterOn,
  priceMin,
  priceMax,
  setCountOfResultFilter,
}) => {
  // console.log("dataaaa:", data);

  // filter min/max price logic
  const filteredData =
    data.data?.filter((val) => {
      let newData = true;
      // if priceFilterOn = true follow this logic down below.
      if (priceFilterOn) {
        newData =
          val.attributes.originalPrice >= priceMin &&
          val.attributes.originalPrice <= priceMax;
      }
      return newData;
    }) || []; // if not found the data make default is emty array.

  if (priceFilterOn) {
    filteredData.sort((min, max) => {
      const LowerPrice = Number(min.attributes.originalPrice);
      const HighestPrice = Number(max.attributes.originalPrice);
      return LowerPrice - HighestPrice; // For ascending order, use `HighestPrice - LowerPrice`because in map data we used Array reverse().
    });
    setCountOfResultFilter(filteredData.length);
  }

  console.log("ListItems data prop:", filteredData);
  console.log("count:", filteredData.length);

  return (
    <>
      {data.data && (
        <div>
          <div className="grid grid-cols-4 h-full mt-8">
            {[...filteredData].reverse().map((value) => (
              <div key={value.id}>
                <ProductCard product={value} slugCategory={slugCategory} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ListItems;
