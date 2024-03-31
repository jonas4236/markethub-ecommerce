import React from "react";
import { TbTruckDelivery } from "react-icons/tb";

const Service2 = () => {
  return (
    <div className="flex flex-col w-full items-center">
      <span className="my-4 rounded-full p-4 bg-[#2F2E30] text-white">
        <TbTruckDelivery
          className="p-2 bg-black rounded-full text-white"
          size={60}
        />
      </span>
      <span className="text-black font-semibold text-[20px]">
        FREE AND FAST DELIVERY
      </span>
      <span className="text-black font-medium text-[14px] mt-2">
        Free delivery for all orders!
      </span>
    </div>
  );
};

export default Service2;
