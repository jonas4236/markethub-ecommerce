import React, { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleProducts from "./FlashSaleProducts";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import ProductCard from "./ProductCard";

const RelatedItems = ({ product, slug }) => {
  const sliderRef = useRef(null);

  // console.log("slug: ", slug);
  // console.log("slugProduct: ", slugRelated);

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
        <div className="flex items-center justify-between">
          <div className="flex justify-center items-center">
            <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
            <span className="text-[#DB4444] font-semibold">Related Item</span>
          </div>

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

        <div className="flex justify-between h-full">
          <div className="flex"></div>
          <div className=""></div>
        </div>
        {/* -----------------End FlashSale ----------------------- */}
        <div className="w-full h-full [40px] mt-[40px]">
          <Slider
            {...settings}
            className="gap-4 w-[1200px]"
            arrows={false}
            ref={sliderRef}
          >
            {product.data?.map((data) => (
              <div key={data.id} className="ml-4">
                <ProductCard key={data.id} product={data} slug={slug} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default RelatedItems;
