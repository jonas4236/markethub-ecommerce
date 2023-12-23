import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { BiUser, BiLink, BiDoorOpen, BiLogInCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext";

export default function Settings() {
  const { username, infoUser, logout } = useContext(AuthContext);
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div className="">
          <Menu.Button className="">
            <img
              className="w-[25px] h-[25px] object-contain rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active
                        ? "bg-[#DB4444] text-white font-medium"
                        : "text-[#DB4444]"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <BiUser
                        className="mr-2 h-5 w-5 text-white font-bold"
                        aria-hidden="true"
                      />
                    ) : (
                      <BiUser
                        className="mr-2 h-5 w-5 text-[#DB4444] font-bold"
                        aria-hidden="true"
                      />
                    )}
                    {username ? (
                      <span className="line-clamp-1 text-left font-medium">
                        {username}
                      </span>
                    ) : (
                      <span className="line-clamp-1 text-left">Guest</span>
                    )}
                  </button>
                )}
              </Menu.Item>
              {infoUser ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={"/manage-account"}>
                        <button
                          className={`${
                            active
                              ? "bg-[#DB4444] text-white font-medium"
                              : "text-[#DB4444]"
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm mt-1.5`}
                        >
                          {active ? (
                            <BiLink
                              className="mr-2 h-5 w-5 text-white font-bold"
                              aria-hidden="true"
                            />
                          ) : (
                            <BiLink
                              className="mr-2 h-5 w-5 text-DB4444 font-bold"
                              aria-hidden="true"
                            />
                          )}
                          <span className="font-medium">Manage My Account</span>
                        </button>
                      </Link>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-gray-100 text-black/[0.5] font-medium cursor-not-allowed"
                          : "text-black/[0.5]"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium bg-gray-100 mt-1`}
                    >
                      {active ? (
                        <BiLink
                          className="mr-2 h-5 w-5 text-white font-bold"
                          aria-hidden="true"
                        />
                      ) : (
                        <BiLink
                          className="mr-2 h-5 w-5 text-white font-bold"
                          aria-hidden="true"
                        />
                      )}
                      <span>Manage My Account</span>
                    </button>
                  )}
                </Menu.Item>
              )}
            </div>
            <div className="px-1 py-1">
              {infoUser ? (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={logout}
                      className={`${
                        active
                          ? "bg-[#DB4444] text-white font-medium"
                          : "text-[#DB4444]"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BiLogInCircle
                          className="mr-2 h-5 w-5 text-white font-bold"
                          aria-hidden="true"
                        />
                      ) : (
                        <BiLogInCircle
                          className="mr-2 h-5 w-5 text-[#DB4444] font-bold"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-medium">Logout</span>
                    </button>
                  )}
                </Menu.Item>
              ) : (
                <Menu.Item>
                  {({ active }) => (
                    <Link to={"/login"}>
                      <button
                        className={`${
                          active
                            ? "bg-[#DB4444] text-white font-medium"
                            : "text-[#DB4444]"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <BiLogInCircle
                            className="mr-2 h-5 w-5 text-white font-bold"
                            aria-hidden="true"
                          />
                        ) : (
                          <BiLogInCircle
                            className="mr-2 h-5 w-5 text-[#DB4444] font-bold"
                            aria-hidden="true"
                          />
                        )}
                        <span>Login / Register</span>
                      </button>
                    </Link>
                  )}
                </Menu.Item>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
