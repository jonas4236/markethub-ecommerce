import React, { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";

const data = [
  {
    img: "https://res.cloudinary.com/jonasdev/image/upload/v1698158479/6973xUBZFtvYeDmTUtuviF_y7pux5.jpg",
    link: "/products/nike",
  },
  {
    img: "https://res.cloudinary.com/jonasdev/image/upload/v1698158479/6973xUBZFtvYeDmTUtuviF_y7pux5.jpg",
    link: "/products/nike2",
  },
  {
    img: "https://res.cloudinary.com/jonasdev/image/upload/v1698158479/6973xUBZFtvYeDmTUtuviF_y7pux5.jpg",
    link: "/products/nike3",
  },
  {
    img: "https://res.cloudinary.com/jonasdev/image/upload/v1698158479/6973xUBZFtvYeDmTUtuviF_y7pux5.jpg",
    link: "/products/nike4",
  },
  {
    img: "https://res.cloudinary.com/jonasdev/image/upload/v1698158479/6973xUBZFtvYeDmTUtuviF_y7pux5.jpg",
    link: "/products/nike5",
  },
];

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

  return (
    <>
      <div className="flex w-[1200px] gap-8 mx-auto">
        <div className="flex-1 h-[416px] border-r-[1px] lg:flex md:hidden">
          <div className="p-[20px]">
            <ul className="">
              {dataCate.data?.map((cat) => (
                <Link to={`/product/${cat.attributes.slug}`} key={cat.id}>
                  <li
                    key={cat.id}
                    className="my-[15px] flex items-center hover:text-red-600"
                  >
                    {cat.attributes.name}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
        {/* --------------------------------------------------------------------------------- */}
        <div className="flex-[3.5] w-full mx-auto ">
          <div className="">
            <Carousel
              responsive={responsive}
              className="w-[908px] mt-[30px] h-[385px] object-contain rounded-lg"
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
                  to={`/products/${item.attributes.category.data.attributes.slug}`}
                >
                  <div className="w-auto h-full">
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
