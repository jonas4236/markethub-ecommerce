import React, { useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MainCategories from "./MainCategories";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const sliderRef = useRef(null);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1230,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1060,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `${process.env.API_STRAPI}/api/categories?populate=*`
      );

      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto mt-[80px]">
        <div className="flex items-center">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">Categories</span>
        </div>

        <div className="flex justify-between h-full xl:flex-row lg:flex-row md:flex-row sm:flex-row max-[639px]:flex-col">
          <div className="flex">
            <span className="text-3xl mt-[20px] font-semibold flex items-end text-[#DB4444]">
              Browse By Category
            </span>
          </div>
          <div className="">
            <div className="flex gap-2 items-end h-full max-[639px]:mt-2">
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
        </div>
        {/* -----------------End FlashSale ----------------------- */}
        <div className="mt-[40px]">
          <Slider
            {...settings}
            className=""
            arrows={false}
            ref={sliderRef}
          >
            {categories?.data?.map((data) => (
              <MainCategories key={data.id} category={data} />
            ))}
          </Slider>
        </div>
        <div className="border-b-[1px] mt-[80px]"></div>
      </div>
    </>
  );
};

export default Categories;
