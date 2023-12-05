import React from "react";

const SubCategories = () => {
  return (
    <>
      <div className="mt-2 flex">
        <input type="checkbox" id="apple" value="apple" />
        <label htmlFor="apple" className="ml-1 text-[14px] cursor-pointer">
          Apple
        </label>
      </div>
      <div className="mt-2 flex">
        <input type="checkbox" id="samsung" value="samsung" />
        <label htmlFor="samsung" className="ml-1 text-[14px] cursor-pointer">
          Samsung
        </label>
      </div>
      <div className="mt-2 flex">
        <input type="checkbox" id="xiaomi" value="xiaomi" />
        <label htmlFor="xiaomi" className="ml-1 text-[14px] cursor-pointer">
          Xiaomi
        </label>
      </div>
      <div className="mt-2 flex">
        <input type="checkbox" id="oppo" value="oppo" />
        <label htmlFor="oppo" className="ml-1 text-[14px] cursor-pointer">
          Oppo
        </label>
      </div>
      <div className="mt-2 flex">
        <input type="checkbox" id="vivo" value="vivo" />
        <label htmlFor="vivo" className="ml-1 text-[14px] cursor-pointer">
          Vivo
        </label>
      </div>
    </>
  );
};

export default SubCategories;
