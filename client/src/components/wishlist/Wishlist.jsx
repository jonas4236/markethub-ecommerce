import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import WishlistProduct from "./WishlistProduct";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

const Wishlist = () => {
  const sliderRef = useRef(null);
  const [dataWishlist, setDataWishlist] = useState([]);

  const { username } = useContext(AuthContext);

  useEffect(() => {
    if (username) {
      return;
    }

    window.location.href = "/login";
  }, [username]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const urlWishlists = `http://localhost:1337/api/wishlists?&filters[username]=${username}`;
        const res = await axios.get(urlWishlists);

        setDataWishlist(res.data);
      } catch (error) {
        console.log("error cannot get data wishlist: ", error);
      }
    };

    fetchWishlist();
  }, [username]);

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
        breakpoint: 965,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 964,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 685,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 h-[60vh] px-8 mx-auto">
        <>
          <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full mx-auto">
            <div className="mt-16">
              <span className="mr-2 text-[16px] text-[#6B7280] font-medium">
                Home
              </span>
              <span className="mr-2 text-[16px] text-[#6B7280] font-medium">
                /
              </span>
              <span className=" text-[16px] text-[#DB4444] font-medium">
                Wishlist
              </span>
            </div>
          </div>
          <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full mx-auto mt-[80px]">
            <div className="flex items-center justify-between">
              <div className="flex justify-center items-center">
                <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
                <span className="text-[#DB4444] font-semibold">
                  Wishlist ({dataWishlist.meta?.pagination.total})
                </span>
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

            {/* -----------------End FlashSale ----------------------- */}
            <div className="w-full h-full flex-row mt-[40px]">
              <Slider
                {...settings}
                className="gap-4 2xl:w-[1200px] xl:w-[1200px] lg:w-full"
                arrows={false}
                ref={sliderRef}
              >
                {dataWishlist?.data?.length > 0 ? (
                  dataWishlist?.data?.map((item, idx) => (
                    <WishlistProduct key={idx} item={item} />
                  ))
                ) : (
                  <div className="text-center">
                    <p>No items in the wishlist.</p>
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Wishlist;
