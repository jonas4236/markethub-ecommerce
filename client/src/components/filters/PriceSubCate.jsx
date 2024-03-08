import React, { useState } from "react";

const PriceSubCate = ({ clearFilters, filterMinMaxPrice }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const handleMinPriceChange = async (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = async (e) => {
    setMaxPrice(e.target.value);
  };

  // console.log("min:", minPrice);
  // console.log("max:", maxPrice);

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
        <div className="mt-2">
          <div className="flex justify-between">
            <button
              className="py-1 px-4 border-[#DB4444] border-2 hover:bg-[#DB4444] rounded-lg text-[#DB4444] transition-all hover:text-white"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <button
              className="py-1 px-4 text-white hover:bg-green-700 hover:text-white/25 bg-green-600 rounded-lg font-medium"
              onClick={() => filterMinMaxPrice(minPrice, maxPrice)}
            >
              Filters Price
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PriceSubCate;
