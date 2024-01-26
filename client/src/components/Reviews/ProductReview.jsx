import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import DetailsReview from "./DetailsReview";
import WriteComments from "./WriteComments";

const ProductReview = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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
  return (
    <>
      <div className="w-full">
        <div className="flex justify-start items-center mb-8">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">Customer reviews</span>
        </div>
        <Carousel
          responsive={responsive}
          className="object-contain rounded-lg"
          autoPlay={true}
          autoPlaySpeed={3000}
          infinite={true}
          //   showDots={true}
        >
          <DetailsReview />
          <DetailsReview />
          <DetailsReview />
          <DetailsReview />
          <DetailsReview />
        </Carousel>

        <WriteComments />
      </div>
    </>
  );
};

export default ProductReview;
