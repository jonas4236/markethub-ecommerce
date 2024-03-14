import React, { useState } from "react";

const PriceSubCate = ({
  clearFilters,
  filterMinMaxPrice,
  priceFilterMin,
  priceFilterMax,
}) => {
  // This line is calling the "filterMinMaxPrice" function when the minimum price input field changes. It passes two arguments:
  // 1. e.target.value: This is the new value of the minimum price input field, which is obtained from the onChange event.
  // 2. priceFilterMax: This is the current value of the maximum price. It's used to maintain the state of the maximum price while updating the minimum price.
  const handleMinPriceChange = (e) => {
    filterMinMaxPrice(e.target.value, priceFilterMax);
    if (!e.target.value && !priceFilterMax) {
      clearFilters();
    }
  };

  // This line is calling the "filterMinMaxPrice" function when the maximum price input field changes. It passes two arguments:
  // 1. priceFilterMin: This is the current value of the minimum price. It's used to maintain the state of the minimum price while updating the maximum price.
  // 2. e.target.value: This is the new value of the maximum price input field, obtained from the onChange event.
  const handleMaxPriceChange = (e) => {
    filterMinMaxPrice(priceFilterMin, e.target.value);
    if (!priceFilterMin && !e.target.value) {
      clearFilters();
    }
  };

  return (
    <>
      <div className="mt-2">
        <div class="flex items-center justify-between col-span-2 space-x-5">
          <div class="w-full">
            <label
              for="min-experience-input"
              class="block mb-2 text-md font-medium text-gray-900"
            >
              From
            </label>

            <input
              type="number"
              min="1"
              className="bg-[#374151] border-none text-white text-sm rounded-lg block w-full p-2.5"
              placeholder="Minimum Price"
              onChange={handleMinPriceChange}
            />
          </div>

          <div class="w-full">
            <label
              for="price-to"
              class="block mb-2 text-md font-medium text-gray-900"
            >
              To
            </label>

            <input
              type="number"
              id="max-experience-input"
              min="1"
              className="bg-[#374151] border-none text-white text-sm rounded-lg block w-full p-2.5"
              placeholder="Maximum Price"
              onChange={handleMaxPriceChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceSubCate;
