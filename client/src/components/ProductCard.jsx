import React, { useEffect, useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { getDiscountedPricePercentage } from "./discount";
import axios from "axios";

const ProductCard = ({ product, slug }) => {
  const [isHover, setIsHover] = useState(false);

  const img = product.attributes.thumbnail.data.attributes;
  const original = product.attributes.originalPrice;
  const discounted = product.attributes.discountPrice;

  // console.log("product: ", product);
  // console.log("slug: ", slug);
  return (
    <>
      <Link to={`/product/${slug}/${product.attributes.slug}`}>
        <div className="hover:scale-110 transition-all mt-[20px] w-max">
          <div
            className="relative"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <img
              className="w-[270px] h-[250px] bg-[#F5F5F5] rounded-md object-contain"
              src={img.url}
              alt=""
            />
            {discounted && (
              <span className="absolute top-[15px] left-[15px] py-[5px] px-[15px] text-sm bg-[#DB4444] text-white rounded-md">
                - {getDiscountedPricePercentage(discounted, original)}%
              </span>
            )}
            {isHover && (
              <span className="transition-all">
                <AddToCart />
              </span>
            )}
          </div>
          <div className="p-[16px_16px_16px_0] w-[270px]">
            <span className="font-semibold">{product.attributes.name}</span>
            <div className="w-full h-full py-1">
              <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
                THB {product.attributes.originalPrice}
              </span>
              {discounted && (
                <span className="line-through text-gray-500 text-sm font-semibold">
                  THB {product.attributes.discountPrice}
                </span>
              )}
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
    </>
  );
};

export default ProductCard;
