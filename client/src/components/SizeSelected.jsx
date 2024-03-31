import React, { useState } from "react";

const SizeSelected = ({
  size,
  setSelectedSize,
  selectedSize,
  setRequireSize,
}) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {size?.data?.map((sp, idx) => (
          <div key={idx} className="flex w-full justify-center">
            <button
              onClick={() => {
                setSelectedSize(sp.size);
                setRequireSize(false);
              }}
              className={`w-full h-16 border-[1.5px] border-slate-600 font-medium rounded-md ${
                selectedSize === sp.size
                  ? "bg-[#DB4444] text-white border-none"
                  : ""
              } ${
                sp.enabled
                  ? "hover:bg-[#DB4444] hover:border-none hover:text-white"
                  : `cursor-not-allowed bg-black/[0.1] opacity-50 border-[1.5px]`
              }`}
              disabled={sp.disabled}
            >
              {sp.size}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SizeSelected;
