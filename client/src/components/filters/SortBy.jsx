import React from "react";

const SortBy = ({ setSorted }) => {
  return (
    <>
      <div className="flex w-max mb-1 cursor-pointer">
        <input
        className="cursor-pointer"
          type="radio"
          name="sortby"
          id="lowest"
          onChange={() => setSorted("asc")}
        />
        <label for="lowest" className="ml-2 cursor-pointer">
          Price (Lowest First)
        </label>
      </div>
      <div className="flex w-max cursor-pointer">
        <input
        className="cursor-pointer"
          type="radio"
          name="sortby"
          id="highest"
          onChange={() => setSorted("desc")}
        />
        <label for="highest" className="ml-2 cursor-pointer">
          Price (Highest First)
        </label>
      </div>
    </>
  );
};

export default SortBy;
