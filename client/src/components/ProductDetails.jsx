import React, { useContext, useEffect, useState } from "react";
import { BiSolidStar, BiStar, BiHeart, BiSolidHeart } from "react-icons/bi";
import SetColours from "./Colours/setColours";
import SizeSelected from "./SizeSelected";
import { useDispatch, useSelector } from "react-redux";
import { removeWishlist } from "../Redux/wishlistSlice";

import { addToWishlist, getWishlistTotal } from "../Redux/wishlistSlice";
import { AuthContext } from "./Context/AuthContext";

const ProductDetails = ({ product, size }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  const [wlId, SetWlId] = useState(null);
  const [title, SetTitle] = useState(null);
  const [slug, SetSlug] = useState(null);
  const [category, SetCategory] = useState(null);
  const [priceperpiece, SetPricePerPiece] = useState(null);
  const [discount, SetDiscount] = useState(null);
  const [image, SetImage] = useState(null);

  const { username, addWishlist, wishlist } = useContext(AuthContext);

  // const pd = product.data;
  // const singleProductId = product.data?.[0]?.id;
  const dispatch = useDispatch();
  // console.log("product:", pd);

  // const wishlistItem = useSelector((state) => state.allWishlist.wishlist);

  // // find where "id" in redux toolkit equal with id in "singleProductId"
  // const isProductInWishlist = wishlistItem.find(
  //   (item) => item.wlId === singleProductId
  // );

  // const productThumbnail = pd?.map(
  //   (item) => item.attributes.thumbnail.data.attributes.url
  // );
  // const productSlug = pd?.map((item) => item.attributes.slug);
  // const productCate = pd?.map(
  //   (item) => item.attributes.categories.data?.[0]?.attributes.slug
  // );

  useEffect(() => {
    if (product) {
      const pd = product.data;
      const singleProductId = String(pd?.[0]?.id);

      const productThumbnail =
        pd?.[0]?.attributes.thumbnail.data.attributes.url;
      const productSlug = pd?.[0]?.attributes.slug;
      const productCate =
        pd?.[0]?.attributes.categories.data?.[0]?.attributes.slug;

      SetWlId(singleProductId);
      SetTitle(pd?.[0]?.attributes.name);
      SetSlug(productSlug);
      SetCategory(productCate);
      SetPricePerPiece(pd?.[0]?.attributes.originalPrice);
      SetDiscount(pd?.[0]?.attributes.discountPrice || "");
      SetImage(productThumbnail);
    }
  }, [product.data]);

  // console.log("type of username frontend:", typeof username);
  // console.log("username frontend:", username);

  // console.log("wlId:", wlId);
  // console.log("title:", title);
  // console.log("slug:", slug);
  // console.log("category:", category);
  // console.log("priceperpiece:", priceperpiece);
  // console.log("discount:", discount);
  // console.log("image:", image);

  // const itemWishlist = {
  //   wlId,
  //   username,
  //   title,
  //   slug,
  //   category,
  //   priceperpiece,
  //   discount,
  //   image,
  // };

  const handleAddedWishlist = async (event) => {
    event.preventDefault();

    if (!username) {
      console.error("Username is undefined or null.");
      return;
    } else {
      console.log("handle have a username: ", username);
      console.log("type of username is:", typeof username);
    }

    await addWishlist({
      wlId,
      username,
      title,
      slug,
      category,
      priceperpiece,
      discount,
      image,
    });
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
                        const newQuantity = productQuantity - 1;
                        setProductQuantity(newQuantity < 1 ? 1 : newQuantity);
                      }}
                    >
                      -
                    </button>
                    <span className="flex items-center mx-4 font-medium">
                      {productQuantity}
                    </span>
                    <button
                      className="ml-2 bg-[#DB4444] h-10 w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
                      onClick={() => setProductQuantity(productQuantity + 1)}
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
                  {wishlist ? (
                    <button
                      className="w-12 h-full border-[#DB4444] flex justify-center items-center rounded-md border-[1px]"
                    >
                      <BiSolidHeart className="text-[#DB4444]" size={25} />
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!username) {
                          window.location.href = "/login";
                        } else {
                          handleAddedWishlist(event);
                        }
                        // dispatch(getWishlistTotal());
                      }}
                      className="w-12 h-full border-gray-400 flex justify-center items-center rounded-md border-[1px]"
                    >
                      <BiHeart className="text-gray-400" size={25} />
                    </button>
                  )}
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
