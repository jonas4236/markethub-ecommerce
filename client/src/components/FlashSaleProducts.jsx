import React, { useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { getDiscountedPricePercentage } from "./discount";

const FlashSaleProducts = ({ flash, cate }) => {
  const [isHover, setIsHover] = useState(false);

  // console.log("data: ", flash);
  return (
    <Link to={`/product/${cate}/${flash?.attributes.slug}`}>
      <div className="hover:scale-110 transition-all mt-[20px] ml-[15px] w-max">
        <div
          className="relative"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <img
            className="w-[270px] h-[250px] bg-[#F5F5F5] rounded-md object-contain"
            src={flash?.attributes.thumbnail.data.attributes.url}
            alt=""
          />
          <span className="absolute top-[15px] left-[15px] py-[5px] px-[15px] text-sm bg-[#DB4444] text-white rounded-md">
            -{" "}
            {getDiscountedPricePercentage(
              flash?.attributes.discountPrice,
              flash?.attributes.originalPrice
            )}
            %
          </span>
          {isHover && (
            <Link to={""}>
              <button className="transition-all">
                <AddToCart
                  thumbnail={flash?.attributes.thumbnail.data.attributes.url}
                  name={flash?.attributes.name}
                />
              </button>
            </Link>
          )}
        </div>
        <div className="p-[16px_16px_16px_0] w-[270px]">
          <span className="font-semibold">{flash?.attributes.name}</span>
          <div className="flex w-full h-full py-1">
            <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
              THB: ${flash?.attributes.originalPrice}
            </span>
            <span className="line-through text-gray-500 text-sm font-semibold">
              {flash?.attributes.discountPrice}
            </span>
          </div>
          <div className="flex gap-[4px] items-center">
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
    </Link>
  );
};

export default FlashSaleProducts;
