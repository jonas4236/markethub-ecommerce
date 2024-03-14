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
    </>
  );
};

export default WishlistAdd;
