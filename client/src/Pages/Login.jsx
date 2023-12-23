import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Context/AuthContext";
import { useEffect } from "react";

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const { login, infoUser } = useContext(AuthContext);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(user);

      if (infoUser) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  useEffect(() => {
    if (infoUser) {
      navigate("/");
    }
  }, [infoUser, navigate]);

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

            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 mt-[48px] w-[371px] mx-auto"
            >
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="email"
                placeholder="Email or Phone Number"
                name="identifier"
                onChange={handleChange}
                value={user.identifier}
                required
              />
              <input
                className="mx-4 py-2 px-4 outline-none border-gray border-b-[2px] focus:border-slate-950"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="password"
                required
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
