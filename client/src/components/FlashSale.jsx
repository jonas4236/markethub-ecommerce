import React, { useContext, useEffect, useRef, useState } from "react";
import Countdown from "react-countdown";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import FlashSaleProducts from "./FlashSaleProducts";
import { BsFillLightningFill } from "react-icons/bs";
import axios from "axios";

import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "./Context/AuthContext";
import CountdownTime from "./CountdownTime";

const FlashSale = () => {
  const [flashProducts, setFlashProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wishlistData, setWishlistData] = useState([]);

  const [slugCate, setSlugCate] = useState(null);
  const { username, countdown, setCountdown, setNumberOfCate, numberOfCate } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/categories?populate=*&filters[id][$eq]=${numberOfCate}`
      );

      setCategories(res.data);
    };

    fetchCategories();
  }, []);

  const slug = categories?.data?.[0]?.attributes.slug;

  useEffect(() => {
    setSlugCate(slug);
  }, [slug]);

  useEffect(() => {
    const fetchFlashSale = async () => {
      const res = await axios.get(
        `http://localhost:1337/api/products?populate=*&filters[categories][slug][$eq]=${slugCate}&filters[discountPrice][$gt]=1`
      );

      setFlashProducts(res.data);
    };

    fetchFlashSale();
  }, [slugCate]);

  useEffect(() => {
    const fetchFindData = async () => {
      const urlFindData = `http://localhost:1337/api/wishlists?&filters[username]=${username}`;
      try {
        const res = await axios.get(urlFindData);

        setWishlistData(res.data);
      } catch (error) {
        console.log("error cannot get data wishlistdata: ", error);
      }
    };

    fetchFindData();
  }, [username]);

  useEffect(() => {
    if (countdown < 0 && window.location.pathname === "/") {
      setNumberOfCate((prevNumberOfCate) => {
        const newNumberOfCate =
          prevNumberOfCate >= 8 ? 1 : prevNumberOfCate + 1;
        return newNumberOfCate;
      });
      window.location.reload();
      setCountdown(10800);
    } else {
      return;
    }
  }, [countdown, setCountdown]);

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
              Flash Sales
              <span className="text-[#DB4444] ml-2 mb-1">
                <BsFillLightningFill />
              </span>
            </span>
            <div className="ml-16">
              <CountdownTime time={countdown} />
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
        <div className="w-full h-full mt-[40px]">
          <Slider
            {...settings}
            className="gap-4 h-[406px] w-[1200px]"
            arrows={false}
            ref={sliderRef}
          >
            {flashProducts?.data?.map((data) => (
              <FlashSaleProducts
                flash={data}
                slugCategory={slugCate}
                key={data.id}
                wishlistData={wishlistData}
              />
            ))}
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
