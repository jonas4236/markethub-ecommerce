import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WishlistAdd from "./WishlistAdd";
import { getDiscountedPricePercentage } from "../discount";
import { useSelector, useDispatch } from "react-redux";

import { getWishlistTotal } from "../../Redux/wishlistSlice";

const WishlistProduct = ({ item }) => {
  const [isHover, setIsHover] = useState(false);
  

  const formattedText = (name) => {
    if (name.length <= 23) {
      return name;
    } else {
      return name.substring(0, 23) + "...";
    }
  };

  // console.log("item:", item);
  
  return (
    <div className="">
      <Link to={`/product/${item.attributes.category}/${item.attributes.slug}`}>
        <div className="hover:scale-110 transition-all mt-[20px] ml-[15px] w-max">
          <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              className="w-[270px] h-[250px] bg-[#F5F5F5] rounded-md object-contain"
              src={item.attributes.image}
              alt=""
            />
            {item.attributes.discount && (
              <span className="absolute top-[15px] left-[15px] py-[5px] px-[15px] text-sm bg-[#DB4444] text-white rounded-md">
                -
                {getDiscountedPricePercentage(
                  item.attributes.discount,
                  item.attributes.PricePerPiece
                )}
                %
              </span>
            )}
            {isHover && (
              <Link to={""}>
                <span className="transition-all">
                  <WishlistAdd itemId={item.id} />
                </span>
              </Link>
            )}
          </div>
          <div className="p-[16px_16px_16px_0] w-[270px]">
            <span className="font-semibold">
              {formattedText(item.attributes.title)}
            </span>
            <div className="flex w-full h-full py-1">
              <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
                THB: {item.attributes.PricePerPiece}
              </span>
              <span className="line-through text-gray-500 text-sm font-semibold">
                {item.attributes.discount}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default WishlistProduct;
