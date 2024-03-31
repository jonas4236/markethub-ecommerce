import React, { useState } from "react";
import { BiStar, BiSolidStar } from "react-icons/bi";

const Stars = ({ filterSortedByStars, clearStarFilter }) => {
  // State to track the last checked checkbox
  const [checkedId, setCheckedId] = useState("");

  // console.log("checkedId:", checkedId);
  // Handler to manage checkbox changes
  const handleCheckboxChange = (e) => {
    const id = e.target.id;

    // If the clicked checkbox is already checked, uncheck it
    if (checkedId === id) {
      setCheckedId("");
      e.target.checked = false;
      clearStarFilter();
    } else {
      // Else, check the new one and update state
      setCheckedId(id);
      filterSortedByStars(id);
    }
  };

  // Helper to determine if a checkbox should be checked
  const isChecked = (id) => {
    return checkedId === id;
  };

  // Function to render stars
  const renderStars = (count) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span className="text-yellow-500" key={i}>
          {i < count ? <BiSolidStar /> : <BiStar />}
        </span>
      );
    }
    return stars;
  };

  // data for render stars icons
  const starsIcons = [5, 4, 3, 2, 1];

  return (
    <>
      {starsIcons.map((value) => (
        <label
          key={value}
          htmlFor={`${value}`}
          className="flex my-1 p-1 hover:rounded-md hover:bg-[#F5F5F5] w-max hover:cursor-pointer"
        >
          <input
            className="hover:cursor-pointer"
            type="checkbox"
            id={`${value}`}
            checked={isChecked(`${value}`)}
            onChange={handleCheckboxChange}
          />
          <label
            htmlFor={`${value}`}
            className="flex items-center ml-2 hover:cursor-pointer"
          >
            {renderStars(value)}
            <span className={`${value >= 5 ? "ml-0" : "ml-2"} text-slate-900 font-medium hover:cursor-pointer`}>
              {value >= 5 ? "" : '"ขึ้นไป"'}
            </span>
          </label>
        </label>
      ))}
    </>
  );
};

export default Stars;
