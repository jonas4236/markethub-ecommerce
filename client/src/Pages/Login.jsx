import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="w-[1305px] h-[80vh] mb-[140px] mx-auto mt-16 flex">
        <div className="flex-1 mr-[129px] h-full">
          <img
            className="w-[805] h-full object-cover rounded-lg"
            src="https://res.cloudinary.com/jonasdev/image/upload/v1698466741/Side_Image_vqrz7y.png"
            alt=""
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col w-[371px] mx-auto">
              <span className="text-[26px] text-slate-950 font-semibold mx-4 tracking-[.3rem]">
                Log in to Exclusive
              </span>
              <span className="text-base mt-4 mx-4 text-slate-950">
                Enter your details below
              </span>
            </div>

            <div className="flex flex-col gap-4 mt-[48px] w-[371px] mx-auto">
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="text"
                placeholder="Email or Phone Number"
              />
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="password"
                placeholder="password"
              />
              <div className=""></div>
              <button className="text-white bg-[#DB4444] py-4 rounded-lg mt-4 mx-4">
                Login
              </button>
              <span className="w-full text-center font-medium">
                Don't have an account?
                <Link to={"/register"}>
                  <button className="text-[#DB4444] border-[#DB4444] border-b-[1px] ml-2">
                    Register
                  </button>
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
