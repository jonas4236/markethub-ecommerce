import React, { useContext, useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Settings from "../Settings";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const [wishlistTotal, setWishlistTotal] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const fetchTotalWishlist = async () => {
      try {
        const urlWishlists = `http://localhost:1337/api/wishlists?&filters[username]=${username}`;
        const res = await axios.get(urlWishlists);

        setWishlistTotal(res.data.meta?.pagination.total);
      } catch (error) {
        console.log("error cannot get total wishlist: ", error);
      }
    };

    fetchTotalWishlist();
  }, [username, wishlistTotal]);

  useEffect(() => {
    const fetchTotalCart = async () => {
      try {
        const urlCart = `http://localhost:1337/api/carts?&filters[username]=${username}`;
        const res = await axios.get(urlCart);

        setCartTotal(res.data.meta?.pagination.total);
      } catch (error) {
        console.log("error cannot get total wishlist: ", error);
      }
    };

    fetchTotalCart();
  }, [username, wishlistTotal]);

  return (
    <div className="w-full h-[90px] items-center border-b-[1px] sticky top-[-10px] z-[99] bg-white">
      <div className="h-full w-[1200px] mx-auto">
        <div className=" flex justify-between h-full items-center">
          <Link to={"/"}>
            <div className="h-full">
              <img
                className="w-[160px] object-contain"
                src="https://res.cloudinary.com/jonasdev/image/upload/v1703149091/markethub-removebg-preview_edt4nt.png"
                alt="LOGO"
              />
            </div>
          </Link>

          <div className="">
            <ul className="flex lg:flex md:hidden">
              <li className="mr-4 cursor-pointer text-[16px] font-medium text-slate-950 hover:text-red-600 transition-all duration-300">
                Home
              </li>
              <li className="mx-4 cursor-pointer text-[16px] font-medium text-slate-950 hover:text-red-600 transition-all duration-300">
                Contact
              </li>
              <li className="mx-4 cursor-pointer text-[16px] font-medium text-slate-950 hover:text-red-600 transition-all duration-300">
                About Us
              </li>
              <li className="ml-4 cursor-pointer text-[16px] font-medium text-slate-950 hover:text-red-600 transition-all duration-300">
                Socials
              </li>
            </ul>
          </div>

          <div className="">
            <div className="flex justify-center">
              <Link to={"/wishlist"}>
                <div className="mr-4 cursor-pointer text-gray-700 lg:flex md:hidden relative h-full flex items-center">
                  <MdOutlineFavoriteBorder size={25} />
                  {username && (
                    <span className="absolute top-[-9px] right-[-7px] w-[20px] h-[20px] rounded-full items-center flex justify-center  bg-red-800 text-white text-[14px]">
                      {wishlistTotal}
                    </span>
                  )}
                </div>
              </Link>
              <Link to={"/cart"}>
                <div className="cursor-pointer text-gray-700 relative h-full flex items-center">
                  <RiShoppingCart2Line size={25} />
                  {username && (
                    <span className="absolute top-[-9px] right-[-7px] w-[20px] h-[20px] rounded-full items-center flex justify-center  bg-red-800 text-white text-[14px]">
                      {cartTotal}
                    </span>
                  )}
                </div>
              </Link>
              <div className="ml-4 h-full cursor-pointer text-blue-500">
                <Settings />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
