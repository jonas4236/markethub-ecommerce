import React from "react";

const ResponsiveNavbar = () => {
  return (
    <div className="xl:hidden lg:hidden md:hidden">
      <ul className="xl:flex lg:flex md:flex fixed top-[80px] left-0 p-2 bg-[#ccc] w-full">
        <li className="m-2 p-2 cursor-pointer text-[16px] font-medium text-slate-950 bg-white rounded-md hover:text-red-600 transition-all duration-300 flex justify-center">
          Home
        </li>
        <li className="m-2 p-2 cursor-pointer text-[16px] font-medium text-slate-950 bg-white rounded-md hover:text-red-600 transition-all duration-300 flex justify-center">
          Contact
        </li>
        <li className="m-2 p-2 cursor-pointer text-[16px] font-medium text-slate-950 bg-white rounded-md hover:text-red-600 transition-all duration-300 flex justify-center">
          About Us
        </li>
        <li className="m-2 p-2 cursor-pointer text-[16px] font-medium text-slate-950 bg-white rounded-md hover:text-red-600 transition-all duration-300 flex justify-center">
          Socials
        </li>
      </ul>
    </div>
  );
};

export default ResponsiveNavbar;
