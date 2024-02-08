import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DetailsReview from "./DetailsReview";
import WriteComments from "./WriteComments";
import axios from "axios";

const ProductReview = ({ token, productId, setRating, setIsProductUpdate }) => {
  const [dataReview, setDataReview] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const getReviewData = async () => {
      try {
        const {
          data: { data },
        } = await axios.get(
          `http://localhost:1337/api/reviews?&filters[productId][$eq]=${productId}`
        );

        setDataReview(data);
        setIsProductUpdate(true);
      } catch (error) {
        console.log("can't get review data:", error);
      }
    };

    getReviewData();
  }, [productId]);

  // console.log("DataReview:", dataReview);

  return (
    <>
      <div className="w-full">
        <div className="flex justify-start items-center mb-8">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">Customer reviews</span>
        </div>
        <Carousel
          responsive={responsive}
          className={`object-contain rounded-lg flex ${
            dataReview.length <= 3 ? "justify-center" : ""
          }`}
        >
          {/* make data reverse for make new users comments to first slide */}
          {[...dataReview].reverse().map((item) => (
            <DetailsReview key={item.id} review={item} />
          ))}
        </Carousel>

        {token && (
          <WriteComments
            token={token}
            productId={productId}
            setRating={setRating}
            setIsProductUpdate={setIsProductUpdate}
          />
        )}
      </div>
    </>
  );
};

export default ProductReview;
