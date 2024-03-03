import React, { useContext, useEffect, useState } from "react";
import CartItems from "./CartItems";
import axios from "axios";
import { AuthContext } from "./Context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const stripePromise = loadStripe(
    "pk_test_51NVUEHLFltWlQvC86UqP91MMR28Z5dAgC1cNFuUbnOd46qo0bRb6QPdtRzBzF3aMupjF7Pe2KenKD95bmASjIWxg00geOIMSk8"
  );

  const [loading, setLoading] = useState(false);
  const { username, overAllSubtotal, cartData, email } =
    useContext(AuthContext);

  useEffect(() => {
    if (username) {
      return;
    }

    window.location.href = "/login";
  }, [username]);

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      setLoading(true);
      const { data } = await axios.post("http://localhost:1337/api/orders", {
        cartData: cartData,
        total: overAllSubtotal,
        email: email,
      });

      await stripe.redirectToCheckout({
        sessionId: data.stripeSession.id,
      });
    } catch (err) {
      setLoading(false);
      console.log("can't handlePayment:", err);
    }
  };

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
            <div className="flex gap-10 px-12 py-4 shadow-xl mb-8">
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
                  {cartData?.data?.map((item, i) => (
                    <CartItems
                      key={i}
                      item={item}
                      quan={item.attributes.quantity}
                    />
                  ))}
                </>
              )}
            </div>

            <div className="flex gap-64 mt-8">
              <div className="flex-[1]">
                <div className="flex">
                  <input
                    className="px-2 mr-4 rounded-md border-[1px] bg-white border-[#DB4444] text-[#DB4444] outline-none font-medium"
                    type="text"
                    placeholder="Coupon Code"
                  />
                  <button className="py-2.5 px-3 rounded-md bg-[#DB4444] text-white outline-none font-medium tracking-wide">
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
                      <span className="text-[#DB4444]">
                        ฿{overAllSubtotal?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Coupon:</span>
                      <span className="text-[#DB4444]">-</span>
                    </div>
                    <div className="w-full h-[2px] bg-[#7D8184] rounded-full my-4"></div>

                    <div className="flex justify-between mt-4 text-black text-[16px] font-medium">
                      <span>Total:</span>
                      <span className="text-[#DB4444]">
                        ฿{overAllSubtotal?.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full mt-4 flex flex-row justify-center relative">
                      <button
                        onClick={handlePayment}
                        className={`py-3 ${
                          loading === true ? "pl-4 pr-12" : "px-4"
                        } bg-[#DB4444] text-white rounded-md font-medium tracking-[1px]`}
                      >
                        Procees to checkout
                      </button>
                      {loading && (
                        <div className="absolute top-4 right-[99px]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="3" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale0"
                                fill="freeze"
                                attributeName="r"
                                begin="0;svgSpinners6DotsScale2.end-0.5s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="16.5" cy="4.21" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale1"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale0.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="7.5" cy="4.21" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale2"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale4.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="19.79" cy="7.5" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale3"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale1.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="4.21" cy="7.5" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale4"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale6.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="21" cy="12" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale5"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale3.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="3" cy="12" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale6"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale8.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="19.79" cy="16.5" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale7"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale5.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="4.21" cy="16.5" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale8"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScalea.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="16.5" cy="19.79" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScale9"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale7.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="7.5" cy="19.79" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScalea"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScaleb.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                            <circle cx="12" cy="21" r="0" fill="#ffffff">
                              <animate
                                id="svgSpinners6DotsScaleb"
                                fill="freeze"
                                attributeName="r"
                                begin="svgSpinners6DotsScale9.begin+0.1s"
                                calcMode="spline"
                                dur="0.6s"
                                keySplines="0,1,0,1;.53,0,.61,.73"
                                keyTimes="0;.2;1"
                                values="0;2;0"
                              />
                            </circle>
                          </svg>
                        </div>
                      )}
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
