import React, { useEffect, useState } from "react";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const CustomDot = ({ onClick, active }) => (
  <button
    style={{
      background: active ? "#DB4444" : "#363738", // Change colors based on active state
      width: "15px",
      height: "15px",
      borderRadius: "50%",
      margin: "5px",
      cursor: "pointer",
      border: active ? "3px solid #fff" : "",
    }}
    onClick={onClick}
  ></button>
);

const Header = () => {
  const [dataCate, setDataCate] = useState([]);
  const [dataPromote, setDataPromote] = useState([]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchMainCategories = async () => {
      try {
        const info = await axios.get(
          "http://localhost:1337/api/main-categories?populate=*"
        );

        setDataCate(info.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchMainCategories();
  }, []);

  useEffect(() => {
    const fetchHeaderPromote = async () => {
      try {
        const promo = await axios.get(
          "http://localhost:1337/api/header-promotes?populate=*"
        );

        setDataPromote(promo.data.data);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    fetchHeaderPromote();
  }, []);

  // console.log("dataPromote:", dataPromote);
  // const itemCategories = dataPromote.map((val) => val?.attributes.footer_category?.data?.attributes.slug);
  // console.log("itemCategories:", itemCategories);

  return (
    <>
      <div className="2xl:w-[1200px] flex xl:flex-row xl:w-[1200px] lg:flex-col lg:w-full md:w-full sm:w-full w-full md:flex-col sm:flex-col flex-col gap-8 mx-auto">
        <div className="flex-1 h-[416px] w-full border-r-[1px] xl:flex lg:flex-row">
          <div className="p-[20px] 2xl:px-0 xl:px-0 lg:px-8 md:px-8 sm:px-8 px-8 w-full">
            <ul className="">
              {dataCate.data?.map((cat) => (
                <Link
                  to={`/products/main-categories/${cat.attributes.slug}`}
                  key={cat.id}
                >
                  <li
                    key={cat.id}
                    className="my-[15px] xl:my-[4px] 2xl:p-0 xl:p-0 lg:p-2 md:p-2 sm:p-2 p-2 justify-center flex 2xl:justify-star xl:justify-star lg:justify-center md:justify-center sm:justify-center xl:justify-start hover:text-red-600 xl:bg-transparent xl:rounded-none lg:bg-[#F5F5F5] lg:rounded-md md:bg-[#F5F5F5] md:rounded-md sm:bg-[#F5F5F5] sm:rounded-md bg-[#F5F5F5] rounded-md"
                  >
                    {cat.attributes.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="flex-[3.5] w-full mx-auto px-8 2xl:px-0 xl:px-0 lg:px-8 md:px-8 sm:px-8">
          <div className="">
            <Carousel
              responsive={responsive}
              className="2xl:w-[908px] xl:w-[908px] lg:w-full md:w-full sm:w-full mt-[30px] xl:h-[385px] lg:h-[385px] md:h-[365px] sm:h-[285px] h-[185px] rounded-lg"
              autoPlay={true}
              autoPlaySpeed={3000}
              infinite={true}
              showDots={true}
              arrows={false}
              customDot={<CustomDot />}
            >
              {dataPromote.map((item, idx) => (
                <Link
                  key={idx}
                  to={`/product/${
                    item.attributes.categories?.data?.attributes.slug ||
                    item.attributes.main_category?.data?.attributes.slug ||
                    item.attributes.footer_category?.data?.attributes.slug
                  }/${item.attributes.slug}`}
                >
                  <div className="w-full h-full">
                    <img
                      className="flex flex-wrap h-full object-contain rounded-lg"
                      src={item.attributes.image.data.attributes.url}
                      alt={`Image ${idx}`}
                    />
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
