import React from "react";
import ProductCard from "./ProductCard";

const ListItems = ({
  data,
  slugCategory,
  priceFilterOn,
  priceMin,
  priceMax,
  setCountOfResultFilter,
  sorted,
  starFilterOn,
  starSorted,
}) => {
  // console.log("dataaaa:", data);

  // filter min/max price logic
  const filteredData =
    data.data?.filter((val) => {
      let newData = true;
      // Check both priceFilterOn and starFilterOn conditions together
      if (priceFilterOn && starFilterOn) {
        newData =
          val.attributes.originalPrice >= priceMin &&
          val.attributes.originalPrice <= priceMax &&
          val.attributes.stars >= starSorted;
      } else if (priceFilterOn) {
        // if priceFilterOn = true follow this logic down below.
        newData =
          val.attributes.originalPrice >= priceMin &&
          val.attributes.originalPrice <= priceMax;
      } else if (starFilterOn) {
        newData = val.attributes.stars >= starSorted;
      }
      return newData;
    }) || [];

  if (priceFilterOn) {
    filteredData.sort((min, max) => {
      const LowerPrice = Number(min.attributes.originalPrice);
      const HighestPrice = Number(max.attributes.originalPrice);
      return LowerPrice - HighestPrice; // For ascending order, use `HighestPrice - LowerPrice`because in map data we used Array reverse().
    });
    setCountOfResultFilter(filteredData.length || 0);
  }

  if (sorted === "asc") {
    filteredData.sort((min, max) => {
      const LowerPrice = Number(min.attributes.originalPrice);
      const HighestPrice = Number(max.attributes.originalPrice);
      return HighestPrice - LowerPrice; // For ascending order, use `HighestPrice - LowerPrice`because in map data we used Array reverse().
    });
  }

  if (sorted === "desc") {
    filteredData.sort((min, max) => {
      const LowerPrice = Number(min.attributes.originalPrice);
      const HighestPrice = Number(max.attributes.originalPrice);
      return LowerPrice - HighestPrice; // For ascending order, use `LowerPrice - HighestPrice`because in map data we used Array reverse().
    });
  }

  // console.log("ListItems data prop:", filteredData);
  // console.log("count:", filteredData.length);

  return (
    <>
      {data.data && (
        <div className="">
          <div className="grid gap-4 grid-cols-4 max-[1600px]:grid-cols-3 max-[925px]:grid-cols-2 max-[670px]:grid-cols-1 h-full w-max mt-8">
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
