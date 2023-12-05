import React from "react";
import { RiCustomerServiceLine } from "react-icons/ri";

const DeliverlyCompo2 = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <span className="my-4 rounded-full p-4 bg-[#2F2E30] text-white">
        <RiCustomerServiceLine
          className="p-2 bg-black rounded-full text-white"
          size={60}
        />
      </span>
      <span className="text-black font-semibold text-[20px]">
        24/7 CUSTOMER SERVICE
      </span>
      <span className="text-black font-medium text-[14px] mt-2">
        Friendly 24/7 customer support
      </span>
    </div>
  );
};

export default DeliverlyCompo2;
