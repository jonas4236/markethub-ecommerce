import React, { useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";
import WishlistAdd from "./WishlistAdd";
import { getDiscountedPricePercentage } from "../discount";

const WishlistProduct = ({ item }) => {
  const [isHover, setIsHover] = useState(false);

  console.log("data:", item);

  return (
    <div className="">
      <Link to={`/product/${item.category}/${item.slug}`}>
        <div className="hover:scale-110 transition-all mt-[20px] ml-[15px] w-max">
          <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              className="w-[270px] h-[250px] bg-[#F5F5F5] rounded-md object-contain"
              src={item.image}
              alt=""
            />
            <span className="absolute top-[15px] left-[15px] py-[5px] px-[15px] text-sm bg-[#DB4444] text-white rounded-md">
              -{getDiscountedPricePercentage(item.discount, item.PricePerPiece)}%
            </span>
            {isHover && (
              <span className="transition-all">
                <WishlistAdd />
              </span>
            )}
          </div>
          <div className="p-[16px_16px_16px_0] w-[270px]">
            <span className="font-semibold">{item.title}</span>
            <div className="w-full h-full py-1">
              <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
                THB: {item.PricePerPiece}
              </span>
              <span className="line-through text-gray-500 text-sm font-semibold">
                {item.discount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WishlistProduct;
