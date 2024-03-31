import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";

const AdsCategories = () => {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const getVideoNewProduct = async () => {
      const {
        data: { data },
      } = await axios.get("http://localhost:1337/api/new-products?populate=*");

      setVideo(data);
    };

    getVideoNewProduct();
  }, []);

  // console.log("video:", video);

  return (
    <>
      {video?.map((vid) => (
        <div key={vid.id}>
          <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 flex xl:flex-row lg:flex-col md:flex-col sm:flex-col max-[639px]:flex-col items-center mx-auto mt-[80px]">
            <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 xl:mr-16 lg:mr-0 md:mr-0 sm:mr-0 max-[639px]:mr-0">
              <div className="flex items-center xl:mb-0 lg:mb-0 md:mb-2 sm:mb-2 max-[639px]:mb-2">
                <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
                <span className="text-[#DB4444] font-semibold">Introduce</span>
              </div>
              <div>
                <div className="mt-[20px] flex-col items-center">
                  <span className="flex items-center text-[#DB4444] font-semibold text-2xl">
                    {vid.attributes.name}
                  </span>
                  <div className="text-[#DB4444] font-medium mt-2 text-justify xl:w-[400px]">
                    {vid.attributes.details}
                  </div>
                  <button className="text-xl bg-[#DB4444] mb-4 mt-[20px] w-max hover:bg-[#ff6464] shadow-md font-semibold flex text-[#fff] rounded-md">
                    <Link
                      className="w-max h-max py-2 px-4 flex items-center"
                      to={`/product/${vid.attributes.category.data.attributes.slug}/${vid.attributes.slug}`}
                    >
                      Purchase
                      <RiShoppingBag3Fill className="ml-2" size={27} />
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <video className="w-full h-full" controls>
                <source
                  src={vid.attributes.video_url.data.attributes.url}
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AdsCategories;
