import React, { useState } from "react";
import { BiSolidStar, BiStar } from "react-icons/bi";
import SetColours from "./Colours/setColours";
import SizeSelected from "./SizeSelected";
import { BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { addToWishlist, getWishlistTotal } from "../Redux/wishlistSlice";

const ProductDetails = ({ product, size }) => {
  const [quantity, setQuantity] = useState(1);

  const pd = product.data;

  console.log("product: ", product);
  const productThumbnail = pd?.map(
    (item) => item.attributes.thumbnail.data.attributes.url
  );
  const productSlug = pd?.map((item) => item.attributes.slug);
  const productCate = pd?.map(
    (item) => item.attributes.categories.data[0].attributes.slug
  );

  // console.log("fetch: ", pd);
  console.log("fetch2:", productSlug);
  console.log("fetch2:", productCate);

  const dispatch = useDispatch();

  // const DataProduct = product.data?.[0]?.attributes;
  // console.log("Details: ", DataProduct);

  const itemWishlist = {
    wlId: product.data?.[0]?.attributes.id,
    title: product.data?.[0]?.attributes.name,
    image: productThumbnail,
    slug: productSlug,
    category: productCate,
    PricePerPiece: product.data?.[0]?.attributes.originalPrice,
    discount: product.data?.[0]?.attributes.discountPrice || "",
    quantity: quantity,
  };

  return (
    <>
      {product.data?.map((DataProduct) => (
        <div key={DataProduct.id}>
          <>
            <div className="">
              <span className="text-[26px] font-medium text-[#DB4444]">
                {DataProduct.attributes.name}
              </span>
            </div>
            <div className="mt-1">
              <div className="flex items-center">
                <span className="text-yellow-500 text-[18px]">
                  <BiSolidStar />
                </span>
                <span className="text-yellow-500 text-[18px]">
                  <BiSolidStar />
                </span>
                <span className="text-yellow-500 text-[18px]">
                  <BiSolidStar />
                </span>
                <span className="text-yellow-500 text-[18px]">
                  <BiSolidStar />
                </span>
                <span className="text-yellow-500 text-[18px]">
                  <BiStar />
                </span>
                <span className="ml-4 mr-2 text-[14px] text-gray-400">
                  (150 Reviews)
                </span>
                <span className="text-xl mr-2 text-gray-400">|</span>
                <span className="text-[#00FF66] font-medium tracking-[.1rem]">
                  In Stock
                </span>
              </div>
              <div className="mt-2 flex">
                <span className="text-red-500 text-[24px] font-medium mt-2">
                  THB:{" "}
                  <span className="text-red-500 font-medium">
                    {DataProduct.attributes.originalPrice}
                  </span>
                </span>
                {DataProduct.attributes.discountPrice && (
                  <div className="mt-2 ml-2">
                    <span className="line-through text-[18px] text-gray-300 font-medium mt-2">
                      THB {DataProduct.attributes.discountPrice}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <span className="text-[16px]">
                  {DataProduct.attributes.Description}
                </span>
              </div>
              <div className="w-[full] h-[2px] bg-black mt-4 rounded-full"></div>
              <div className="flex mt-4">
                <span className="text-xl tracking-tighter">Colours:</span>
                <span className="ml-2">
                  <SetColours />
                </span>
              </div>
              <div className="mt-4">
                <span className="text-xl tracking-tighter mr-2">Size:</span>
                <SizeSelected size={size} />
              </div>
              <div className="flex w-[500px]  justify-between mt-4">
                <div className="w-max">
                  <div className="flex h-full rounded-md border-black border-[1px]">
                    <button
                      className="mr-2  border-r-[1px] border-black h-10 w-10 flex items-center justify-center text-black text-2xl"
                      onClick={() => {
                        const newQuantity = itemWishlist.quantity - 1;
                        setQuantity(newQuantity < 1 ? 1 : newQuantity);
                      }}
                    >
                      -
                    </button>
                    <span className="flex items-center mx-4 font-medium">
                      {quantity}
                    </span>
                    <button
                      className="ml-2 bg-[#DB4444] h-10 w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
                      onClick={() => setQuantity(itemWishlist.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <button className="text-white bg-[#000] mr-4 py-2 px-6 h-full rounded-md">
                    Add To Cart
                  </button>
                  <button className="text-white bg-[#DB4444] py-2 px-6 h-full rounded-md">
                    Buy Now
                  </button>
                </div>
                <div className="">
                  <button
                    onClick={() => {
                      dispatch(
                        addToWishlist({
                          id: DataProduct?.id,
                          ...itemWishlist,
                          quantity: quantity,
                        })
                      );
                      dispatch(getWishlistTotal());
                    }}
                    className="w-12 h-full focus:border-[#DB4444] flex justify-center items-center rounded-md border-[1px] border-slate-400"
                  >
                    <BiHeart className="text-[#DB4444]" size={25} />
                  </button>
                </div>
              </div>
            </div>
          </>
        </div>
      ))}
    </>
  );
};

export default ProductDetails;
