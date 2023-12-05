import React from "react";
import { GoShieldCheck } from "react-icons/go";

const DeliverlyCompo3 = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <span className="my-4 rounded-full p-4 bg-[#2F2E30] text-white">
        <GoShieldCheck
          className="p-2 bg-black rounded-full text-white"
          size={60}
        />
      </span>
      <span className="text-black font-semibold text-[20px]">
        MONEY BACK GUARANTEE
      </span>
      <span className="text-black font-medium text-[14px] mt-2">
        We return money within 30 days
      </span>
    </div>
  );
};

export default DeliverlyCompo3;
