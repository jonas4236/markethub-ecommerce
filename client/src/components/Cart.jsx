import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";

const Cart = () => {
  const [cartData, setCartData] = useState([]);

  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:1337/api/carts?populate=*&filters[username][$eq]=${username}`
        );
        setCartData(res.data);
      } catch (error) {
        console.log("can't get cart data from database:", error);
      }
    };

    fetchCartData();
  }, [username]);

  useEffect(() => {
    if (username) {
      return;
    }

    window.location.href = "/login";
  }, [username]);

  const subtotal = (price, quantity) => {
    return price * quantity;
  };

  // การทำ สรุปราคารวมแต่ละ Product
  const SummaryTotal = cartData?.data?.reduce(
    (acc, item) =>
      acc + subtotal(item.attributes.price, item.attributes.quantity),
    0
  );

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
              {cartData?.data?.length === 0 ? (
                <>
                  <div className="flex flex-col w-full items-center justify-center">
                    <div className="">
                      <img
                        className="object-contain"
                        src="https://shoe-store-frontend.vercel.app/_next/image?url=%2Fempty-cart.jpg&w=384&q=75"
                        alt="img_cart"
                      />
                    </div>
                    <div className="flex flex-col items-center mb-8">
                      <span className="text-[20px] text-[#DB4444] font-semibold">
                        Your cart is empty
                      </span>
                      <span className="text-[16px] font-medium">
                        Looks like you have not added anything in your cart.
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {cartData.data?.map((item, i) => (
                    <CartItems
                      key={i}
                      item={item}
                      quan={item.attributes.quantity}
                      subtotal={subtotal(
                        item.attributes.price,
                        item.attributes.quantity
                      )}
                    />
                  ))}
                </>
              )}
              {/* <CartItems quantity={quantity} setQuantity={setQuantity} />
              <CartItems quantity={quantity} setQuantity={setQuantity} /> */}
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
                      <span>฿{SummaryTotal?.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Coupon:</span>
                      <span className="text-[#DB4444]">-</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Total:</span>
                      <span>฿{SummaryTotal?.toLocaleString()}</span>
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
