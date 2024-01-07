import React from "react";

const CartItems = ({ quantity, setQuantity }) => {
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
            <button className="absolute top-[-9px] left-[-6px] w-5 h-5 flex justify-center items-center rounded-full bg-[#DB4444] text-white font-medium">
              x
            </button>
            <div className="flex-col">
              <span className="ml-3 text-[#DB4444] font-medium">
                Sony PlayStation 5
              </span>
              <div className="flex ml-3">
                <span>Size:</span>
                <select className="outline-none cursor-pointer">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-[1] justify-center items-center">
          <div className="flex items-center w-full h-full justify-center">
            <span className="text-[#DB4444] h-full flex items-center font-medium">
              $120
            </span>
          </div>
        </div>

        <div className="flex-[1] w-max flex justify-center">
          <div className="flex w-[180px] items-center justify-between h-full rounded-md border-black border-[1px]">
            <button
              className="mr-2 border-r-[1px] border-black h-full w-10 flex items-center justify-center text-black text-2xl"
              onClick={() => {
                const minusQuantity = quantity - 1;
                setQuantity(minusQuantity < 1 ? 1 : minusQuantity);
              }}
            >
              -
            </button>
            <span className="flex items-center mx-4 font-medium">
              {quantity}
            </span>
            <button
              className="ml-2 h-full bg-[#DB4444] w-10 flex items-center justify-center rounded-[0_6px_6px_0] text-white text-2xl"
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </button>
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
