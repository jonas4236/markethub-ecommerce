import React, { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "./ProductCard";

const RelatedItems = ({ product, slug }) => {
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
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center">
            <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
            <span className="text-[#DB4444] font-semibold">Related Items</span>
          </div>

          <div className="flex gap-2 items-end h-full">
            <span>
              <BsFillArrowLeftCircleFill
                size={30}
                className="text-[#DB4444] hover:text-gray-700 active:text-gray-950 transition-all cursor-pointer"
                onClick={() => sliderRef.current.slickPrev()}
              />
            </span>
            <span>
              <BsFillArrowRightCircleFill
                size={30}
                className="text-[#DB4444] hover:text-gray-700 active:text-gray-950 transition-all cursor-pointer"
                onClick={() => sliderRef.current.slickNext()}
              />
            </span>
          </div>
        </div>

        <div className="flex justify-between h-full">
          <div className="flex"></div>
          <div className=""></div>
        </div>
        {/* -----------------End FlashSale ----------------------- */}
        <div className="w-full h-full mt-[40px]">
          <Slider
            {...settings}
            className="gap-4 2xl:w-[1200px] xl:w-[1200px] lg:w-full"
            arrows={false}
            ref={sliderRef}
          >
            {product.data?.map((data) => (
              <div key={data.id} className="">
                <ProductCard key={data.id} product={data} slugCategory={slug} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default RelatedItems;
