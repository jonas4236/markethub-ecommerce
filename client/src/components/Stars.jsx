import React from "react";
import { BiStar, BiSolidStarHalf, BiSolidStar } from "react-icons/bi";

const Stars = () => {
  return (
    <>
      <div className="flex">
        <input type="checkbox" value="5" id="5" />
        <label htmlFor="5" className="flex items-center ml-2">
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="ml-2 text-slate-900 font-medium">"ขึ้นไป"</span>
        </label>
      </div>

      <div className="flex">
        <input type="checkbox" value="4" id="4" />
        <label htmlFor="4" className="flex items-center ml-2">
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="ml-2 text-slate-900 font-medium">"ขึ้นไป"</span>
        </label>
      </div>

      <div className="flex">
        <input type="checkbox" value="3" id="3" />
        <label htmlFor="3" className="flex items-center ml-2">
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="ml-2 text-slate-900 font-medium">"ขึ้นไป"</span>
        </label>
      </div>

      <div className="flex">
        <input type="checkbox" value="2" id="2" />
        <label htmlFor="2" className="flex items-center ml-2">
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="ml-2 text-slate-900 font-medium">"ขึ้นไป"</span>
        </label>
      </div>

      <div className="flex">
        <input type="checkbox" value="1" id="1" />
        <label htmlFor="1" className="flex items-center ml-2">
          <span className="text-yellow-500">
            <BiSolidStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="text-yellow-500">
            <BiStar />
          </span>
          <span className="ml-2 text-slate-900 font-medium">"ขึ้นไป"</span>
        </label>
      </div>
    </>
  );
};

export default Stars;
