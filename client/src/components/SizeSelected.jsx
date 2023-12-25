import React from "react";

const SizeSelected = ({ size }) => {

  // console.log("size:",size)
  return (
    <>
      <div className="grid grid-cols-6 gap-4">
        {size?.data?.map((sp, idx) => (
          <div key={idx} className="">
            <button className="w-16 h-16 mr-4 border-[1.5px] border-slate-600 hover:bg-[#DB4444] hover:border-none hover:text-white font-medium rounded-md focus:bg-[#DB4444] focus:text-white focus:border-none">
              {sp.size}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default SizeSelected;
