import React, { useRef } from "react";
import Countdown from "react-countdown";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleProducts from "../FlashSaleProducts";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Month = () => {
  const sliderRef = useRef(null);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="w-[1200px] mx-auto mt-[140px]">
        <div className="flex items-center">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">This Month</span>
        </div>

        <div className="flex justify-between h-full">
          <div className="flex">
            <span className="text-3xl font-semibold mt-[20px] flex items-end text-[#DB4444]">
              Best Selling Products
            </span>
          </div>
          <div className="flex items-center">
            <button className="py-2 px-8 rounded-md bg-[#DB4444] text-white font-medium">View All</button>
          </div>
        </div>
        {/* -----------------End FlashSale ----------------------- */}
        <div className="w-full h-full [40px] mt-[40px]">
          <Slider
            {...settings}
            className="gap-4 w-[1200px]"
            arrows={false}
            ref={sliderRef}
          >
            <FlashSaleProducts />
            <FlashSaleProducts />
            <FlashSaleProducts />
            <FlashSaleProducts />
            <FlashSaleProducts />
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Month;
