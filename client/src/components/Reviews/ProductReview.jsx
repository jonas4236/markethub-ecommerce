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
      breakpoint: { max: 4000, min: 1150 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1160, min: 1150 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1149, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 639, min: 0 },
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
        <div className="">
          <Carousel
            responsive={responsive}
            className={`w-full object-contain rounded-lg flex`}
          >
            {/* make data reverse for make new users comments to first slide */}
            {[...dataReview].reverse().map((item) => (
              <DetailsReview key={item.id} review={item} />
            ))}
          </Carousel>
        </div>

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
