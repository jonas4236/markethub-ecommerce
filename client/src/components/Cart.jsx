import React, { useState } from "react";
import CartItems from "./CartItems";

const Cart = () => {
  const [quantity, setQuantity] = useState(1)
  return (
    <>
      <div className="">
        <div className="w-[1200px] mx-auto">
          <div className="mt-16 mb-16">
            <span className="text-[#6B7280] font-medium mr-2">Home</span>
            <span className="text-[#6B7280] font-medium">/</span>
            <span className="text-[#DB4444] font-medium ml-2">Cart</span>
          </div>
          <div className="">
            <div className="flex gap-10 px-12 py-4 shadow-lg mb-8">
              <div className="flex-[1]">
                <span className="text-black font-medium flex items-center justify-center">
                  Product
                </span>
              </div>
              <div className="flex-[1]">
                <span className="text-black font-medium flex items-center justify-center">
                  Price
                </span>
              </div>
              <div className="flex-[1]">
                <span className="text-black font-medium flex items-center justify-center">
                  Quantity
                </span>
              </div>
              <div className="flex-[1]">
                <span className="text-black font-medium flex items-center justify-center">
                  Subtotal
                </span>
              </div>
            </div>

            <div className="">
              <CartItems quantity={quantity} setQuantity={setQuantity} />
              <CartItems quantity={quantity} setQuantity={setQuantity} />
              <CartItems quantity={quantity} setQuantity={setQuantity} />
            </div>

            <div className="flex gap-64 mt-8">
              <div className="flex-[1]">
                <div className="">
                  <input
                    className="py-3 px-5 mr-4 rounded-md border-[1px] border-[#DB4444] text-[#DB4444] outline-none font-medium"
                    type="text"
                    placeholder="Coupon Code"
                  />
                  <button className="py-3 px-5 rounded-md bg-[#DB4444] text-white outline-none font-medium tracking-wide">
                    Apply Coupon
                  </button>
                </div>
              </div>
              <div className="flex-[1]">
                <div className="border-[2px] border-black rounded-md">
                  <div className="p-8">
                    <div className="">
                      <span className="text-black text-[20px] font-medium">
                        Cart Total
                      </span>
                    </div>
                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Subtotal:</span>
                      <span>$1750</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Coupon:</span>
                      <span className="text-[#DB4444]">5%</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Total:</span>
                      <span>$1700</span>
                    </div>
                    <div className="w-full mt-4 flex justify-center">
                      <button className="py-3 px-6 bg-[#DB4444] text-white rounded-md font-medium tracking-[1px]">
                        Procees to checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
