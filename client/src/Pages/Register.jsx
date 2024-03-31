import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Context/AuthContext";

const Register = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const navigate = useNavigate();

  const { register, infoUser } = useContext(AuthContext);

  useEffect(() => {
    if (infoUser) {
      navigate("/");
    }
  }, [infoUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register(username, email, password);
  };

  return (
    <>
      <div className="2xl:w-[1305px] xl:w-[1305px] lg:w-full xl:px-0 px-8 h-full mb-[140px] mx-auto mt-16 flex xl:flex-row lg:flex-row md:flex-col sm:flex-col max-[639px]:flex-col">
        <div className="flex-1 xl:mr-[129px] lg:mr-[129px] md:mr-[0px] sm:mr-[0px] max-[639px]:mr-[0px] h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src="https://res.cloudinary.com/jonasdev/image/upload/v1698466741/Side_Image_vqrz7y.png"
            alt=""
          />
        </div>
        <div className="flex-1">
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col xl:w-[371px] lg:w-[371px] md:w-full sm:w-full max-[639px]:w-full mx-auto xl:mt-0 lg:mt-0 md:mt-8 sm:mt-8 max-[639px]:mt-8">
              <span className="text-[31px] text-slate-950 font-medium max-[639px]:text-[24px] tracking-[.3rem]">
                Create an account
              </span>
              <span className="text-base mt-4 mx-4 text-slate-950">
                Enter your details below
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-[48px] xl:w-[371px] lg:w-[371px] md:w-full sm:w-full max-[639px]:w-full mx-auto"
            >
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="text"
                placeholder="Name"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="email"
                placeholder="Email or Phone Number"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="password"
                placeholder="password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="text-white bg-[#DB4444] py-4 rounded-lg mt-4 mx-4">
                Create Account
              </button>
              <span className="w-full text-center font-medium">
                Aleady have an account?
                <Link to={"/login"}>
                  <button className="text-[#DB4444] border-[#DB4444] border-b-[1px] ml-2">
                    Login
                  </button>
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
