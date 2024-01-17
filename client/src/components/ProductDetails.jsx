import React, { useContext, useEffect, useState } from "react";
import { BiSolidStar, BiStar, BiHeart, BiSolidHeart } from "react-icons/bi";
import SetColours from "./Colours/setColours";
import SizeSelected from "./SizeSelected";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Swal from "sweetalert2";

import { AuthContext } from "./Context/AuthContext";
import axios from "axios";

const ProductDetails = ({ product, size }) => {
  const [wlId, SetWlId] = useState(null);
  const [title, SetTitle] = useState(null);
  const [slug, SetSlug] = useState(null);
  const [category, SetCategory] = useState(null);
  const [priceperpiece, SetPricePerPiece] = useState(null);
  const [discount, SetDiscount] = useState(null);
  const [image, SetImage] = useState(null);

  const [wishlistData, setWishlistData] = useState([]);
  const [pdId, setPdId] = useState(null);
  const [productQuantity, setProductQuantity] = useState(1);
  const [stock, setStock] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [requireSize, setRequireSize] = useState(true);
  const { username, addWishlist, removeWishlist, addCart, updateQuantiy } =
    useContext(AuthContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const fetchDataFromCart = async () => {
      const urlFindCartId = `http://localhost:1337/api/carts?&filters[username]=${username}`;
      try {
        const res = await axios.get(urlFindCartId);

        setCartData(res.data);
      } catch (error) {
        console.log("error cannot get data wishlistdata: ", error);
      }
    };

    fetchDataFromCart();
  }, [username]);

  useEffect(() => {
    const fetchFindData = async () => {
      const urlFindData = `http://localhost:1337/api/wishlists?&filters[username]=${username}`;
      try {
        const res = await axios.get(urlFindData);

        setWishlistData(res.data);
      } catch (error) {
        console.log("error cannot get data wishlistdata: ", error);
      }
    };

    fetchFindData();
  }, [username]);

  const singleProductId = product.data?.[0]?.id;
  const singleProductName = product.data?.[0]?.attributes.name + ` [${selectedSize}]`;
  // console.log("singleProductName:", singleProductName)

  const isProductInWishlist =
    wishlistData.data &&
    wishlistData.data.find((item) => item.attributes.wlId == singleProductId);

  const id = isProductInWishlist?.id;

  const isProductInCart = cartData?.data?.some(
    (item) =>
      item.attributes.title === singleProductName &&
      item.attributes.selectedSize === selectedSize
  );

  const FindCartIdOfProduct = cartData?.data?.find(
    (item) =>
      item.attributes.title === singleProductName &&
      item.attributes.selectedSize === selectedSize
  );

  const CartId = FindCartIdOfProduct?.id;
  const currentProductQuantity = FindCartIdOfProduct?.attributes.quantity;

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
      setPdId(Number(singleProductId));
      setStock(pd?.[0]?.attributes.Stock);
      SetTitle(pd?.[0]?.attributes.name);
      SetSlug(productSlug);
      SetCategory(productCate);
      SetPricePerPiece(String(pd?.[0]?.attributes.originalPrice));
      SetDiscount(pd?.[0]?.attributes.discountPrice || "");
      SetImage(productThumbnail);
    }
  }, [product.data]);

  const handleAddedWishlist = async (event) => {
    event.preventDefault();

    await addWishlist({
      wlId,
      username,
      title,
      slug,
      category,
      priceperpiece,
      image,
      discount,
    });
  };

  const handleAddCart = async (event) => {
    event.preventDefault();

    if (isProductInCart === true) {
      const updateNewQuantity = currentProductQuantity + productQuantity;
      await updateQuantiy(CartId, updateNewQuantity);
      Swal.fire({
        title: "Added Quantity Successfully!",
        text: `You have increase new quantity into your cart!`,
        icon: "success",
      }).then(() => {
        location.reload(true);
      });
    } else {
      await addCart({
        pdId,
        title: `${title} [${selectedSize}]`,
        image,
        priceperpiece,
        productQuantity,
        stock,
        selectedSize,
        size,
        username,
      });
    }
  };

  const handleRemovedWishlist = async (e) => {
    e.preventDefault();

    await removeWishlist(id);
  };

  return (
    <>
      {product.data?.map((DataProduct) => (
        <div key={DataProduct.id}>
          <>
            <div className="w-max">
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
                {DataProduct.attributes.Stock >= 1 ? (
                  <span className="text-[#00FF66] font-semibold tracking-[.1rem]">
                    In Stock ({DataProduct.attributes.Stock})
                  </span>
                ) : (
                  <span className="text-[#DB4444] font-semibold tracking-[.1rem]">
                    Out Of Stock
                  </span>
                )}
              </div>
              <div className="mt-2 flex">
                <span className="text-red-500 text-[24px] font-medium mt-2">
                  THB:{" "}
                  <span className="text-red-500 font-medium">
                    {DataProduct.attributes.originalPrice.toLocaleString()}
                  </span>
                </span>
                {DataProduct.attributes.discountPrice && (
                  <div className="mt-2 ml-2">
                    <span className="line-through text-[18px] text-gray-300 font-medium mt-2">
                      {DataProduct.attributes.discountPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Markdown remarkPlugins={[remarkGfm]} className="text-[16px]">
                  {DataProduct.attributes.Description}
                </Markdown>
              </div>
              <div className="w-[full] h-[2px] bg-black mt-4 rounded-full"></div>
              {/* <div className="flex mt-4">
                <span className="text-xl tracking-tighter">Colours:</span>
                <span className="ml-2">
                  <SetColours />
                </span>
              </div> */}
              {size && (
                <div className="mt-4" id="slSize">
                  <span className="text-xl tracking-tighter mr-2">
                    Select Size :
                  </span>
                  <div className="mt-4">
                    <SizeSelected
                      size={size}
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                      setRequireSize={setRequireSize}
                    />
                  </div>
                  {requireSize && (
                    <div className="mt-2">
                      <span className="text-[16px] text-[#DB4444] font-semibold">
                        Select Size is Required!
                      </span>
                    </div>
                  )}
                </div>
              )}
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
                  {DataProduct.attributes.Stock >= 1 ? (
                    <>
                      <button
                        onClick={(event) => {
                          if (!username) {
                            window.location.href = "/login";
                          } else {
                            if (size) {
                              if (requireSize && !selectedSize) {
                                document
                                  .getElementById("slSize")
                                  .scrollIntoView({
                                    block: "center",
                                    behavior: "smooth",
                                  });
                              } else {
                                handleAddCart(event);
                              }
                            } else {
                              handleAddCart(event);
                            }
                          }
                        }}
                        className="text-white bg-[#000] mr-4 py-2 px-6 h-full rounded-md"
                      >
                        Add To Cart
                      </button>
                      <button className="text-white bg-[#DB4444] py-2 px-6 h-full rounded-md">
                        Buy Now
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="text-[#fff] bg-gray-300 cursor-not-allowed mr-4 py-2 px-6 h-full rounded-md">
                        Sold Out
                      </button>
                      <button className="text-[#fff] bg-gray-300 cursor-not-allowed py-2 px-6 h-full rounded-md">
                        Sold Out
                      </button>
                    </>
                  )}
                </div>
                <div className="">
                  {isProductInWishlist ? (
                    <button
                      onClick={handleRemovedWishlist}
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
