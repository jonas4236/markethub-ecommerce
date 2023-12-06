import React, { useRef, useState } from "react";
import Countdown from "react-countdown";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleProducts from "./FlashSaleProducts";
import { BsFillLightningFill } from "react-icons/bs";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlashSale = () => {
  const [targetTimes, setTargetTimes] = useState(
    Date.now() + 1 * 60 * 60 * 1000
  );
  const Completionist = () => (
    <span className="text-3xl text-red-600 font-medium">Out of time!</span>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      location.reload(true);
      setTargetTimes(Date.now() + 1 * 60 * 60 * 1000);
      return null;
    } else {
      // Render a countdown
      return (
        <div className="flex h-full items-center">
          <div className="flex flex-col mr-4">
            <span className="text-md text-[#DB4444] font-semibold">Days</span>
            <span className="text-3xl font-base text-black-500">
              {days}{" "}
              <span className="mx-2 text-[#DB4444] font-semibold">:</span>
            </span>
          </div>
          <div className="flex flex-col mr-4">
            <span className="text-md text-[#DB4444] font-semibold">Hours</span>
            <span className="text-3xl font-base text-black-500">
              {hours}{" "}
              <span className="mx-2 text-[#DB4444] font-semibold">:</span>
            </span>
          </div>
          <div className="flex flex-col mr-4">
            <span className="text-md text-[#DB4444] font-semibold">
              Minutes
            </span>
            <span className="text-3xl font-base text-black-500">
              {minutes}{" "}
              <span className="mx-2 text-[#DB4444] font-semibold">:</span>
            </span>
          </div>
          <div className="flex flex-col mr-4">
            <span className="text-md text-[#DB4444] font-semibold">
              Seconds
            </span>
            <span className="text-3xl font-base text-black-500">
              {seconds}{" "}
              <span className="mx-2 text-[#DB4444] font-semibold"></span>
            </span>
          </div>
        </div>
      );
    }
  };

  const targetTime = Date.now() + 1 * 60 * 60 * 1000;

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
          <span className="text-[#DB4444] font-semibold">Today's</span>
        </div>

        <div className="flex justify-between h-full">
          <div className="flex">
            <span className="text-3xl font-semibold flex items-end text-[#DB4444]">
              Flash Sales<span className="text-[#DB4444] ml-2 mb-1"><BsFillLightningFill /></span>
            </span>
            <div className="ml-16">
              <Countdown date={targetTimes} renderer={renderer} />
            </div>
          </div>
          <div className="">
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
        <div className="w-full flex justify-center">
          <button className="my-[60px]  bg-[#DB4444] py-[14px] px-[34px] text-white rounded-md font-semibold">
            View All Products
          </button>
        </div>
        <div className="border-b-[1px]"></div>
      </div>
    </>
  );
};

export default FlashSale;
