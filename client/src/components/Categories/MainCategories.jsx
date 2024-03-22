import React from "react";
import { Link, useParams } from "react-router-dom";

const MainCategories = ({ category }) => {
  // console.log("DATA: ",category)
  const cate = category.attributes;
  const img = cate.Image.data.attributes.url;

  return (
    <div className="flex justify-center items-center w-full py-3">
      <Link className="w-max" to={`/products/${cate.slug}`}>
        <div className="hover:scale-110 transition-all w-max">
          <div className="border-[1.9px] border-slate-400 w-[170px] p-2 rounded-md hover:bg-[#DB4444] hover:border-none hover:text-white">
            <div className="w-full flex flex-col h-full items-center justify-center">
              <img
                className="w-[128px] h-[128px] object-contain"
                src={img}
                alt=""
              />
              <p className="mt-2 font-medium">{cate.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainCategories;
