import React, { useContext, useEffect, useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { getDiscountedPricePercentage } from "./discount";
import { AuthContext } from "./Context/AuthContext";

const FlashSaleProducts = ({ flash, slugCategory, wishlistData }) => {
  const [isHover, setIsHover] = useState(false);

  // console.log("dataFlashSale:", wishlistData?.data?.map((item) => item.attributes.wlId));

  const { username } = useContext(AuthContext);

  // console.log("flash:", flash);

  const [wlId, SetWlId] = useState(null);
  const [title, SetTitle] = useState(null);
  const [slug, SetSlug] = useState(null);
  const [category, SetCategory] = useState(null);
  const [priceperpiece, SetPricePerPiece] = useState(null);
  const [discount, SetDiscount] = useState(null);
  const [image, SetImage] = useState(null);

  useEffect(() => {
    if (flash) {
      SetWlId(flash?.id);
      SetTitle(flash?.attributes.name);
      SetSlug(flash?.attributes.slug);
      SetCategory(slugCategory);
      SetPricePerPiece(String(flash?.attributes.originalPrice));
      SetDiscount(flash?.attributes.discountPrice || "");
      SetImage(flash?.attributes.thumbnail.data.attributes.url);
    }
  }, [flash]);

  const FlashId = flash?.id;
  // console.log("FlashId:", FlashId);

  const isProductInWishlist = wishlistData?.data?.find(
    (item) => item.attributes.wlId == FlashId
  );

  const formattedText = (name) => {
    if (name && name.length <= 25) {
      return name;
    } else if (name) {
      return name.substring(0, 25) + "...";
    } else {
      return "";
    }
  };

  // console.log("isProductInWishlist:", isProductInWishlist);

  return (
    <Link to={`/product/${slugCategory}/${flash?.attributes.slug}`}>
      <div className="hover:scale-110 transition-all mt-[20px] ml-[15px] w-max">
        <div
          className="relative h-[250px]"
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
                  wlId={wlId}
                  username={username}
                  title={title}
                  slug={slug}
                  category={category}
                  priceperpiece={priceperpiece}
                  image={image}
                  discount={discount}
                  isExist={isProductInWishlist}
                />
              </button>
            </Link>
          )}
        </div>
        <div className="p-[16px_16px_16px_0] w-[270px]">
          <span className="font-semibold">
            {formattedText(flash?.attributes.name)}
          </span>
          <div className="flex w-full h-full py-1">
            <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
              THB: {flash?.attributes.originalPrice.toLocaleString()}
            </span>
            <span className="line-through text-gray-500 text-sm font-semibold">
              {flash?.attributes.discountPrice.toLocaleString()}
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
