import React, { useContext } from "react";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AuthContext } from "../Context/AuthContext";

const WishlistAdd = ({ itemId }) => {
  const { removeWishlist } = useContext(AuthContext);

  const handleRemovedWishlist = async (e) => {
    e.preventDefault();

    await removeWishlist(itemId);
  };

  return (
    <>
      <div onClick={handleRemovedWishlist} className="">
        <span className="absolute bg-white text-gray-600 hover:bg-black hover:text-[#DB4444] top-[15px] p-[8px] rounded-full right-[24px]">
          <BsFillTrash3Fill />
        </span>
      </div>
      <span className="absolute bottom-[0px] w-full bg-black text-white rounded-[0_0_6px_6px] flex justify-center items-center font-medium h-[40px]">
        Add To Cart
      </span>
    </>
  );
};

export default WishlistAdd;
