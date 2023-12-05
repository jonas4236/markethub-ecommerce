import React from "react";
import { Link } from "react-router-dom";

const Featured2 = ({ cate }) => {
  return (
    <div className="relative">
      <img
        className="w-full h-[292px] object-cover"
        src={cate?.attributes.img.data.attributes.url}
        alt=""
      />
      <div className="absolute bottom-4 left-4 flex flex-col text-white">
        <span className="text-[24px]">{cate?.attributes.name}</span>
        <span className="mt-2">{cate?.attributes.Desc}</span>
        <Link to={`/products/${cate?.attributes.slug}`}>
          <button className="w-max mt-4 py-2 px-4 bg-white rounded-md text-black hover:bg-black hover:text-white transition-all duration-300 font-medium">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Featured2;
