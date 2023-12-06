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

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        "http://localhost:1337/api/categories?populate=*"
      );

      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-[1200px] mx-auto mt-[80px]">
        <div className="flex items-center">
          <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
          <span className="text-[#DB4444] font-semibold">Categories</span>
        </div>

        <div className="flex justify-between h-full">
          <div className="flex">
            <span className="text-3xl mt-[20px] font-semibold flex items-end text-[#DB4444]">
              Browse By Category
            </span>
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
