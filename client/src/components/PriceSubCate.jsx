import React from "react";

const PriceSubCate = () => {
  return (
    <>
      <div className="mt-2 flex">
        <input type="radio" id="high" value="high" name="price" />
        <label htmlFor="high" className="ml-1 text-[14px] cursor-pointer">
          Price = High To Low
        </label>
      </div>
      <div className="mt-2 flex">
        <input type="radio" id="low" value="low" name="price" />
        <label htmlFor="low" className="ml-1 text-[14px] cursor-pointer">
          Price = Low To High
        </label>
      </div>
    </>
  );
};

export default PriceSubCate;
