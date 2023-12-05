import React from "react";
import { IoMdPaperPlane } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className="w-full bg-black text-white">
        <div className="flex w-[1200px] mx-auto mt-[80px] py-8  gap-8">
          <div className="flex-1">
            <ul>
              <span className="text-[24px] font-medium">Exclusive</span>
              <li className="mt-2 font-medium">Subscribe</li>
              <li className="mt-2 font-medium">Get 10% off your first order</li>
            </ul>
            <div className="mt-4 relative w-max">
              <input
                className="w-[200px] border-[2px] bg-transparent rounded-md py-2 text-white outline-none pl-4 pr-12 text-md"
                type="text"
                placeholder="Enter your email"
              />
              <span className="absolute top-[8px] right-5">
                <IoMdPaperPlane fontSize={24} />
              </span>
            </div>
          </div>
          <div className="flex-1">
            <ul>
              <span className="text-[24px] font-medium">Support</span>
              <li className="mt-2">
                <span className="text-sm">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque beatae quos cupiditate.
                </span>
              </li>
              <li className="mt-2">
                <span className="text-base">contact@markethub.com</span>
              </li>
              <li className="mt-2">
                <span className="text-base">+6612 345 6789</span>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <ul className="">
              <span className="text-[24px] font-medium">Account</span>
              <li className="mt-2">
                <button>My Account</button>
              </li>
              <li className="mt-2">
                <button>
                  Login /<button className="ml-1">Register</button>
                </button>
              </li>
              <li className="mt-2">
                <button>Cart</button>
              </li>
              <li className="mt-2">
                <button>Wishlist</button>
              </li>
              <li className="mt-2">
                <button>Shop</button>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <ul className="">
              <span className="text-[24px] font-medium">Quick Link</span>
              <li className="mt-2">
                <button>Privacy Policy</button>
              </li>
              <li className="mt-2">
                <button>Terms Of Use</button>
              </li>
              <li className="mt-2">
                <button>FAQ</button>
              </li>
              <li className="mt-2">
                <button>Contact</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
