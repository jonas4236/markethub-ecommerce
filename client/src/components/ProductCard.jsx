import React, { useContext, useEffect, useState } from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";
import AddToCart from "./AddToCart";
import { Link } from "react-router-dom";
import { getDiscountedPricePercentage } from "./discount";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";
import { Rating } from "react-simple-star-rating";

const ProductCard = ({ product, slugCategory }) => {
  const [isHover, setIsHover] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [dataReviewCount, setDataReviewCount] = useState([]);
  const [rating, setRating] = useState(null);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchFindData = async () => {
      const urlFindData = `${process.env.API_STRAPI}/api/wishlists?&filters[username]=${username}`;
      try {
        const res = await axios.get(urlFindData);

        setWishlistData(res.data);
      } catch (error) {
        console.log("error cannot get data wishlistdata: ", error);
      }
    };

    fetchFindData();
  }, [username]);

  // console.log("wishlistData:", wishlistData);
  // console.log("product:", product);

  const img = product.attributes.thumbnail.data.attributes;
  const original = product.attributes.originalPrice;
  const discounted = product.attributes.discountPrice;
  const ProductCardId = product.id;

  const isProductInWishlist =
    wishlistData.data &&
    wishlistData.data.find((item) => item.attributes.wlId == ProductCardId);

  // console.log("have a same product:", isProductInWishlist)

  const [wlId, SetWlId] = useState(null);
  const [title, SetTitle] = useState(null);
  const [slug, SetSlug] = useState(null);
  const [category, SetCategory] = useState(null);
  const [priceperpiece, SetPricePerPiece] = useState(null);
  const [discount, SetDiscount] = useState(null);
  const [image, SetImage] = useState(null);

  const formattedText = (name) => {
    if (name.length <= 25) {
      return name;
    } else {
      return name.substring(0, 25) + "...";
    }
  };

  // console.log("slugPro:",product.attributes.slug)

  useEffect(() => {
    if (product) {
      const img = product.attributes.thumbnail.data.attributes;
      const original = product.attributes.originalPrice;
      const discounted = product.attributes.discountPrice;

      SetWlId(product.id);
      SetTitle(product.attributes.name);
      SetSlug(product.attributes.slug);
      SetCategory(slugCategory);
      SetPricePerPiece(String(original));
      SetDiscount(discounted || "");
      SetImage(img.url);
    }
  }, [product]);

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `${process.env.API_STRAPI}/api/reviews?&filters[productId][$eq]=${product.id}`
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
  }, [product.id, rating]);

  // console.log("rating:", rating);

  return (
    <>
      <div className="flex justify-center items-center py-4">
        <Link
          className="w-max h-max"
          to={`/product/${slugCategory}/${product.attributes.slug}`}
        >
          <div className="hover:scale-110 max-[455px]:hover:scale-100 transition-all w-max">
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
                <Link>
                  <span className="transition-all">
                    <AddToCart
                      thumbnail={img.url}
                      name={product.attributes.name}
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
                  </span>
                </Link>
              )}
            </div>
            <div className="p-[16px_16px_16px_0] w-[270px]">
              <span className="font-semibold">
                {formattedText(product.attributes.name)}
              </span>
              <div className="flex w-full h-full py-1">
                <span className="text-[#DB4444] mr-[8px] text-base font-semibold">
                  THB: {product.attributes.originalPrice.toLocaleString()}
                </span>
                {discounted && (
                  <span className="line-through text-gray-500 text-sm font-semibold">
                    {product.attributes.discountPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <div className="flex gap-[4px] items-center">
                <Rating
                  SVGclassName="inline-block"
                  initialValue={rating ? rating : 0}
                  readonly
                  size={20}
                />

                <span className="ml-2 text-slate-600 font-semibold text-sm">
                  (
                  {`${dataReviewCount.length ? dataReviewCount.length : 0} ${
                    dataReviewCount.length === 1 ? "Review" : "Reviews"
                  }`}
                  )
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
