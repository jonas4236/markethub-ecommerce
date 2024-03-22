import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
          <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto mt-[80px]">
            <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 mx-auto mt-[80px]">
              <div className="flex items-center xl:mb-0 lg:mb-0 md:mb-2 sm:mb-2 max-[639px]:mb-2">
                <div className="w-[20px] h-[40px] rounded-md bg-red-600 mr-2"></div>
                <span className="text-[#DB4444] font-semibold">Introduce</span>
              </div>

              <div className="flex justify-between h-full xl:flex-row lg:flex-row md:flex-row sm:flex-row max-[639px]:flex-col">
                <div className="flex xl:flex-row lg:flex-row md:flex-col sm:flex-col max-[639px]:flex-col justify-between w-full">
                  <span className="items-center flex text-[#DB4444] font-semibold text-3xl">
                    {vid.attributes.name}
                  </span>

                  <button className="text-xl bg-[#DB4444] mb-4 mt-[20px] w-max hover:bg-[#ff6464] shadow-md font-semibold flex items-end text-[#fff] rounded-md">
                    <Link
                      className="w-max h-max p-2"
                      to={`/product/${vid.attributes.category.data.attributes.slug}/${vid.attributes.slug}`}
                    >
                      Buy now !
                    </Link>
                  </button>
                </div>
              </div>
            </div>
            <div className="">
              <video width="1200" height="600" controls>
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
