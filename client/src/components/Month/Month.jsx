import React, { useRef } from "react";
import FlashSaleProducts from "../FlashSaleProducts";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
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
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 690,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto mt-[140px]">
        <div className="flex items-center">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">This Month</span>
        </div>

        <div className="flex justify-between h-full max-[639px]:flex-col">
          <div className="flex">
            <span className="text-3xl font-semibold mt-[20px] flex items-end text-[#DB4444]">
              Best Selling Products
            </span>
          </div>
          <div className="xl:mt-0 lg:mt-0 md:mt-0 sm:mt-2 max-[639px]:mt-2">
            <div className="flex gap-2 items-end h-full">
              <span>
                <BsFillArrowLeftCircleFill
                  size={30}
                  className="text-gray-700 cursor-pointer"
                  onClick={() => sliderRef.current.slickPrev()}
                />
              </span>
              <span>
                <BsFillArrowRightCircleFill
                  size={30}
                  className="text-gray-700 cursor-pointer"
                  onClick={() => sliderRef.current.slickNext()}
                />
              </span>
            </div>
          </div>
        </div>
        {/* -----------------End FlashSale ----------------------- */}
        <div className="w-full h-full [40px] mt-[40px]">
          <Slider
            {...settings}
            className="gap-4 2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 h-[400px]"
            arrows={false}
            ref={sliderRef}
          >
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
