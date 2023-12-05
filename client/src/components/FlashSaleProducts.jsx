import React, { useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";

const FlashSaleProducts = () => {
  const [isHover, setIsHover] = useState(false);
  return (
    <Link to={"/product/sony-playstation-5"}>
    <div className="hover:scale-110 transition-all mt-[20px] ml-[15px] w-max">
      <div
        className="relative"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <img
          className="w-[270px] h-[250px] bg-[#F5F5F5] rounded-md object-contain"
          src="https://res.cloudinary.com/jonasdev/image/upload/v1697975421/Sony-PlayStation-5-Standard-_C-Chassis_-2-square_medium-removebg-preview_zqfbyb.png"
          alt=""
        />
        <span className="absolute top-[15px] left-[15px] py-[5px] px-[15px] text-sm bg-[#DB4444] text-white rounded-md">
          -30%
        </span>
        {isHover && (
          <span className="transition-all">
            <AddToCart />
          </span>
        )}
      </div>
      <div className="p-[16px_16px_16px_0] w-[270px]">
        <span className="font-semibold">Sony PlayStation 5</span>
        <div className="w-full h-full py-1">
          <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
            $120
          </span>
          <span className="line-through text-gray-500 text-sm font-semibold">
            $160
          </span>
          <div className="flex gap-[4px] items-center pt-[4px]">
            <span className="text-[#FFAD33]">
              <BiSolidStar />
            </span>
            <span className="text-[#FFAD33]">
              <BiSolidStar />
            </span>
            <span className="text-[#FFAD33]">
              <BiSolidStar />
            </span>
            <span className="text-[#FFAD33]">
              <BiSolidStar />
            </span>
            <span className="text-[#FFAD33]">
              <BiSolidStar />
            </span>

            <span className="ml-2 text-slate-600 font-semibold text-sm">
              (86)
            </span>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default FlashSaleProducts;
