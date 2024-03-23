import React, { useContext, useEffect, useState } from "react";
import { BiHeart, BiSolidHeart } from "react-icons/bi";
import SizeSelected from "./SizeSelected";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Swal from "sweetalert2";
import { Rating } from "react-simple-star-rating";
import { loadStripe } from "@stripe/stripe-js";

import { AuthContext } from "./Context/AuthContext";
import axios from "axios";

const ProductDetails = ({ product, size }) => {
  const stripePromise = loadStripe(
    "pk_test_51NVUEHLFltWlQvC86UqP91MMR28Z5dAgC1cNFuUbnOd46qo0bRb6QPdtRzBzF3aMupjF7Pe2KenKD95bmASjIWxg00geOIMSk8"
  );
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
  const [loading, setLoading] = useState(false);
  const {
    username,
    email,
    addWishlist,
    removeWishlist,
    addCart,
    updateQuantiy,
    updateStars,
  } = useContext(AuthContext);
  const [cartData, setCartData] = useState([]);
  const [rating, setRating] = useState(null);

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
  const sgProductName = product.data?.[0]?.attributes.name;

  const singleProductName =
    product.data?.[0]?.attributes.name + ` [${selectedSize}]`;
  const singleProductNameNoSize = product.data?.[0]?.attributes.name;

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

  const getProductSameName = cartData?.data?.find(
    (item) => item.attributes.title === singleProductNameNoSize
  );

  const [dataReviewCount, setDataReviewCount] = useState([]);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/reviews?&filters[productId][$eq]=${singleProductId}`
        );

        setDataReviewCount(data);
        let averageRating =
          data.reduce((acc, value) => {
            return acc + Number(value.attributes.stars);
          }, 0) / data.length;

        averageRating = Number(
          averageRating > 0 ? averageRating.toFixed(0) : averageRating
        );

        setRating(averageRating);
      } catch (error) {
        console.log("can't get review data:", error);
      }
    };

    getReviewData();
  }, [singleProductId, rating]);

  // console.log("rating:", rating);

  const CartId2 = getProductSameName?.id;
  const currentProductQuantity2 = getProductSameName?.attributes.quantity;

  const findExistItemInCart = cartData.data?.find(
    (item) => item.attributes.title == sgProductName
  );

  // console.log("findExistItemInCart:", findExistItemInCart);

  const findQuantityInCart = findExistItemInCart?.attributes.quantity;

  const constantOfStockInCart =
    product.data?.[0]?.attributes.Stock - findQuantityInCart;

  // update stars every users come to this page.
  useEffect(() => {
    const updateQuanOfStars = async (singleProductId, rating) => {
      if (rating) {
        await updateStars(singleProductId, rating);
      }
    };
    updateQuanOfStars(singleProductId, rating);
  }, [singleProductId, rating]);

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

    if (isProductInCart || getProductSameName) {
      const updateNewQuantity = currentProductQuantity + productQuantity;
      const updateNewQuantity2 = currentProductQuantity2 + productQuantity;
      await updateQuantiy(
        CartId || CartId2,
        updateNewQuantity || updateNewQuantity2
      );
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
        title: selectedSize ? `${title} [${selectedSize}]` : `${title}`,
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

  const handleBuyNow = async (event) => {
    event.preventDefault();
    try {
      const cartDataBuyNow = {
        data: [
          {
            attributes: {
              pdId: 13,
              size: size || null,
              image: image,
              price: priceperpiece,
              title: selectedSize ? `${title} [${selectedSize}]` : `${title}`,
              quantity: productQuantity,
              username: username,
              selectedSize: selectedSize || null,
            },
          },
        ],
      };
      const stripe = await stripePromise;
      setLoading(true);
      const { data } = await axios.post("http://localhost:1337/api/orders", {
        cartData: cartDataBuyNow,
        total: priceperpiece * productQuantity,
        email: email,
      });

      await stripe.redirectToCheckout({
        sessionId: data.stripeSession.id,
      });
    } catch (err) {
      setLoading(false);
      console.log("can't handle buy now:", err);
    }
  };

  // console.log("singleProductId:", singleProductId);
  // console.log("stars:", rating);

  return (
    <>
      {product.data?.map((DataProduct) => (
        <div key={DataProduct.id}>
          <>
            <div className="w-[500px]">
              <span className="xl:text-[26px] lg:text-[26px] md:text-[26px] sm:text-[26px] max-[639px]:text-[16px] font-medium text-[#DB4444]">
                {DataProduct.attributes.name}
              </span>
            </div>
            <div className="mt-1">
              <div className="flex items-center">
                <Rating
                  SVGclassName="inline-block"
                  initialValue={rating ? rating : 0}
                  readonly
                  size={20}
                />
                <span className="ml-4 mr-2 text-[14px] text-gray-400">
                  (
                  {`${dataReviewCount.length ? dataReviewCount.length : 0} ${
                    dataReviewCount.length === 1 ? "Review" : "Reviews"
                  }`}
                  )
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
                <span className="text-red-500 xl:text-[24px] lg:text-[24px] md:text-[24px] sm:text-[24px] max-[639px]:text-[16px] font-medium mt-2">
                  THB:{" "}
                  <span className="text-red-500 font-medium">
                    {DataProduct.attributes.originalPrice.toLocaleString()}
                  </span>
                </span>
                {DataProduct.attributes.discountPrice && (
                  <div className="mt-2 ml-2">
                    <span className="line-through xl:text-[18px] lg:text-[18px] md:text-[18px] sm:text-[18px] max-[639px]:text-[16px] text-gray-300 font-medium mt-2">
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
              <div className="flex 2xl:w-[500px] xl:w-[500px] lg:w-[500px] md:w-[500px] max-[604px]:flex-col justify-between mt-4">
                <div className="w-max">
                  <div className="flex h-full rounded-md border-black border-[1px]">
                    <button
                      className="mr-2 border-r-[1px] border-black h-full w-10 flex items-center justify-center text-black text-2xl"
                      onClick={() => {
                        const newQuantity = productQuantity - 1;
                        setProductQuantity(newQuantity < 1 ? 1 : newQuantity);
                      }}
                    >
                      -
                    </button>
                    <span className="flex items-center mx-4 font-medium">
                      {productQuantity > DataProduct.attributes.Stock
                        ? DataProduct.attributes.Stock
                        : productQuantity > constantOfStockInCart
                        ? constantOfStockInCart
                        : productQuantity}
                    </span>
                    {productQuantity === DataProduct.attributes.Stock ||
                    productQuantity === constantOfStockInCart ? (
                      <button className="ml-2 bg-[#CCC] h-full w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-black text-2xl">
                        +
                      </button>
                    ) : (
                      <button
                        className="ml-2 bg-[#DB4444] h-full w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
                        onClick={() => {
                          if (productQuantity < DataProduct.attributes.Stock) {
                            setProductQuantity(productQuantity + 1);
                          } else {
                            return;
                          }
                          if (productQuantity < constantOfStockInCart) {
                            setProductQuantity(productQuantity + 1);
                          } else {
                            return;
                          }
                        }}
                      >
                        +
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex max-[604px]:py-2">
                  {DataProduct.attributes.Stock >= 1 ? (
                    <>
                      {constantOfStockInCart === 0 ? (
                        <>
                          <button className="text-[#fff] bg-gray-300 border-2 border-gray-400 cursor-not-allowed mr-4 py-2 px-6 h-full rounded-md">
                            Sold Out
                          </button>
                          <button className="text-[#fff] bg-gray-300 border-2 border-gray-400 cursor-not-allowed py-2 px-6 h-full rounded-md">
                            Sold Out
                          </button>
                        </>
                      ) : (
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
                          <div className="relative">
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
                                      handleBuyNow(event);
                                    }
                                  } else {
                                    handleBuyNow(event);
                                  }
                                }
                              }}
                              className={`text-white bg-[#DB4444] py-2 px-6 ${
                                loading ? "pr-12" : ""
                              } h-full rounded-md`}
                            >
                              Buy Now
                            </button>
                            {loading && (
                              <div className="absolute top-[8px] right-[12px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <circle cx="12" cy="3" r="0" fill="#ffffff">
                                    <animate
                                      id="svgSpinners6DotsScale0"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="0;svgSpinners6DotsScale2.end-0.5s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="16.5"
                                    cy="4.21"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale1"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale0.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="7.5"
                                    cy="4.21"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale2"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale4.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="19.79"
                                    cy="7.5"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale3"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale1.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="4.21"
                                    cy="7.5"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale4"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale6.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle cx="21" cy="12" r="0" fill="#ffffff">
                                    <animate
                                      id="svgSpinners6DotsScale5"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale3.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle cx="3" cy="12" r="0" fill="#ffffff">
                                    <animate
                                      id="svgSpinners6DotsScale6"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale8.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="19.79"
                                    cy="16.5"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale7"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale5.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="4.21"
                                    cy="16.5"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale8"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScalea.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="16.5"
                                    cy="19.79"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScale9"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale7.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle
                                    cx="7.5"
                                    cy="19.79"
                                    r="0"
                                    fill="#ffffff"
                                  >
                                    <animate
                                      id="svgSpinners6DotsScalea"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScaleb.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                  <circle cx="12" cy="21" r="0" fill="#ffffff">
                                    <animate
                                      id="svgSpinners6DotsScaleb"
                                      fill="freeze"
                                      attributeName="r"
                                      begin="svgSpinners6DotsScale9.begin+0.1s"
                                      calcMode="spline"
                                      dur="0.6s"
                                      keySplines="0,1,0,1;.53,0,.61,.73"
                                      keyTimes="0;.2;1"
                                      values="0;2;0"
                                    />
                                  </circle>
                                </svg>
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <button className="text-[#fff] bg-gray-300 border-2 border-gray-400 cursor-not-allowed mr-4 py-2 px-6 h-full rounded-md">
                        Sold Out
                      </button>
                      <button className="text-[#fff] bg-gray-300 border-2 border-gray-400 cursor-not-allowed py-2 px-6 h-full rounded-md">
                        Sold Out
                      </button>
                    </>
                  )}
                </div>
                <div className="">
                  {isProductInWishlist ? (
                    <button
                      onClick={handleRemovedWishlist}
                      className="w-12 h-full border-[#DB4444] flex justify-center max-[605px]:py-2 items-center rounded-md border-[1px]"
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
                      className="w-12 h-full max-[604px]:py-2 border-gray-400 flex justify-center items-center rounded-md border-[1px]"
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
