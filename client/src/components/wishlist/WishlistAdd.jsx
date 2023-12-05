import React from "react";
import { BsFillTrash3Fill } from "react-icons/bs";

const WishlistAdd = () => {
  return (
    <>
      <span className="absolute bg-white text-[#DB4444] hover:bg-black hover:text-white top-[15px] p-[8px] rounded-full right-[24px]">
        <BsFillTrash3Fill />
      </span>
      <span className="absolute bottom-[0px] w-full bg-black text-white rounded-[0_0_6px_6px] flex justify-center items-center font-medium h-[40px]">
        Add To Cart
      </span>
    </>
  );
};

export default WishlistAdd;
