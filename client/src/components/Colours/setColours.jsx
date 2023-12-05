import React from "react";

const Red = () => {
  return (
    <>
      <div className="flex gap-2 h-full items-center">
        <div
          className={`w-6 h-6 rounded-full border-[2px] border-black flex items-center justify-center`}
        >
          <span className={`bg-[blue] w-4 h-4 rounded-full`}></span>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-[2px] border-black flex items-center justify-center`}
        >
          <span className={`bg-[blue] w-4 h-4 rounded-full`}></span>
        </div>
        <div
          className={`w-6 h-6 rounded-full border-[2px] border-black flex items-center justify-center`}
        >
          <span className={`bg-[blue] w-4 h-4 rounded-full`}></span>
        </div>
      </div>
    </>
  );
};

export default Red;
