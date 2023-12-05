import React from "react";
import { BsBagHeart } from "react-icons/bs";
import { AiOutlineEye } from "react-icons/ai";

const AddToCart = () => {
  return (
    <>
      <span className="absolute bg-white hover:bg-black hover:text-white top-[15px] p-[8px] rounded-full right-[24px]">
        <BsBagHeart />
      </span>
      <span className="absolute bg-white hover:bg-black hover:text-white top-[55px] p-[8px] rounded-full right-[24px]">
        <AiOutlineEye />
      </span>
      <span className="absolute bottom-[0px] w-full bg-black text-white rounded-[0_0_6px_6px] flex justify-center items-center font-medium h-[40px]">
        Add To Cart
      </span>
    </>
  );
};

export default AddToCart;
