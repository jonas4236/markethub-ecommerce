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
  // Filter products based on the criteria
  // console.log("dataaaa:", data);

  // filter min/max price logic
  const filteredData =
    data.data?.filter((val) => {
      let ret = true;
      if (priceFilterOn) {
        ret =
          val.attributes.originalPrice >= priceMin &&
          val.attributes.originalPrice <= priceMax;
      }
      return ret;
    }) || []; // if not found the data make default is array

  if (priceFilterOn) {
    filteredData.sort((min, max) => {
      const LowerPrice = Number(min.attributes.originalPrice);
      const HighestPrice = Number(max.attributes.originalPrice);
      return LowerPrice - HighestPrice; // For descending order, use `priceB - priceA`
    });
    setCountOfResultFilter(filteredData.length);
  }

  console.log("ListItems data prop:", filteredData);

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
