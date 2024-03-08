import React from "react";

const SortBy = () => {
  return (
    <>
      <div className="flex">
        <input type="radio" name="sortby" id="lowest" />
        <label for="lowest" className="ml-2">Price (Lowest First)</label>
      </div>
      <div className="flex">
        <input type="radio" name="sortby" id="highest" />
        <label for="highest" className="ml-2">Price (Highest First)</label>
      </div>
    </>
  );
};

export default SortBy;
