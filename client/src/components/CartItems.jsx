import React from "react";

const CartItems = () => {
  return (
    <>
      <div className="flex gap-10 px-12 py-4 my-6 shadow-lg">
        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center relative">
            <img
              className="w-[54px] h-[54px] object-contain"
              src="https://res.cloudinary.com/jonasdev/image/upload/v1697975421/Sony-PlayStation-5-Standard-_C-Chassis_-2-square_medium-removebg-preview_zqfbyb.png"
              alt=""
            />
            <button className="absolute top-[-9px] left-[-6px] w-5 h-5 flex justify-center items-center rounded-full bg-[#DB4444] text-white font-medium">x</button>
            <span className="ml-3 text-[#DB4444] font-medium">
              Sony PlayStation 5
            </span>
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <span className="text-[#DB4444] h-full flex items-center font-medium">
              $120
            </span>
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <input
              className="w-[60px] h-[24px] text-center border-[1px] rounded-md border-[#6B7280] py-5 outline-none"
              type="number"
              name="quantity"
              min="1"
              id="quantity"
            />
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <span className="text-[#DB4444] h-full flex items-center font-medium">
              $120
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
