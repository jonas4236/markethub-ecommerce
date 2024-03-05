import React from "react";

const PriceSubCate = ({
  setMinPrice,
  setMaxPrice,
  minPrice,
  maxPrice,
  clearFilters,
  filterProducts,
}) => {
  const handleMinPriceChange = async (e) => {
    setMinPrice(e.target.value);
  };
  const handleMaxPriceChange = async (e) => {
    setMaxPrice(e.target.value);
  };
  return (
    <>
      <div className="mt-2">
        <div class="flex items-center justify-between col-span-2 space-x-3">
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
              value={minPrice}
              onChange={handleMinPriceChange}
              required
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
              value={maxPrice}
              onChange={handleMaxPriceChange}
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex justify-between">
            <button
              className="py-1 px-4 border-[#DB4444] border-2 rounded-lg text-[#DB4444]"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
            <button
              className="py-1 px-4 text-white bg-green-600 rounded-lg font-medium"
              onClick={filterProducts}
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
