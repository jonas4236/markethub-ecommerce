import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadAvatar from "./UploadAvatar";

const manage = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const [ishover, setIsHover] = useState(false);

  const { token } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        });
        setUser(data);
        setisUserUpdated(false);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [token, isUserUpdated]);

  useEffect(() => {
    if (token) {
      return;
    }

    navigate("/login");
  }, [navigate, token]);

  // console.log("userId:", user.id)

  return (
    <div className="py-16">
      <div className="w-[1170px] mx-auto">
        <div className="flex justify-between">
          <div className="">
            <span className="text-gray-500">Home</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="font-medium">My Account</span>
          </div>
          <div className="">
            <span className="mr-1">Welcome!</span>
            <span className="text-[#DB4444] font-semibold">
              {user.username}
            </span>
          </div>
        </div>

        <div className="flex mt-16">
          <div className="flex-[1] mr-16">
            <div className="">
              <span className="font-semibold">Manage My Account</span>
              <div className="mt-2 ml-8 text-[#DB4444] cursor-pointer w-max">
                My Profile
              </div>
            </div>
          </div>
          <div className="flex-[2.5]">
            <div className="p-8">
              <span className="text-[20px] text-[#DB4444] font-medium">
                Edit Your Profile
              </span>
              <div className="mt-4 flex w-full justify-center flex-col items-center">
                <span className="text-[#DB4444] font-semibold mb-2">
                  Avatar
                </span>
                <div
                  className=""
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  {user.avatarURL ? (
                    <div className="relative">
                      <img
                        className="size-[164px] object-cover rounded-full"
                        src={`${user.avatarURL}`}
                        alt={`${user.username} avatar`}
                      />
                      {ishover && (
                        <UploadAvatar
                          token={token}
                          userId={user.id}
                          username={user.username}
                          avatarURL={user.avatarURL}
                          setisUserUpdated={setisUserUpdated}
                          setIsHover={setIsHover}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <img
                        className="size-[164px] object-cover rounded-full"
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        alt={`${user.username} avatar`}
                      />
                      {ishover && (
                        <UploadAvatar
                          token={token}
                          userId={user.id}
                          username={user.username}
                          avatarURL={user.avatarURL}
                          setisUserUpdated={setisUserUpdated}
                          setIsHover={setIsHover}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="">
              <form>
                <div className="flex">
                  <div className="flex-[1] flex flex-col mr-16">
                    <label htmlFor="FullName" className="font-medium">
                      Full Name
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="text"
                      placeholder="Full Name..."
                      defaultValue={user?.username}
                    />
                  </div>
                  <div className="flex-[1] flex flex-col">
                    <label htmlFor="FullName" className="font-medium">
                      Created At
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md cursor-not-allowed text-gray-400"
                      disabled
                      type="text"
                      value={new Date(user?.createdAt).toLocaleString()}
                    />
                  </div>
                </div>

                <div className="flex mt-4">
                  <div className="flex-[1] flex flex-col mr-16">
                    <label htmlFor="FullName" className="font-medium">
                      Email
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="text"
                      placeholder="Email..."
                      defaultValue={user?.email}
                    />
                  </div>
                  <div className="flex-[1] flex flex-col">
                    <label htmlFor="FullName" className="font-medium">
                      Address
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="text"
                      defaultValue={user?.address || ""}
                    />
                  </div>
                </div>

                <div className="mt-8 font-medium">Password Changes</div>
                <div className="flex flex-col mt-4">
                  <div className="flex-[1] flex flex-col mb-4">
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="password"
                      placeholder="Current Password"
                    />
                  </div>
                  <input
                    className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                    type="password"
                    placeholder="New Password"
                  />
                  <div className="flex-[1] flex flex-col mt-4">
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="password"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <div className="mr-4 flex items-center justify-center">
                    <button className="h-full">Cancel</button>
                  </div>
                  <div className="">
                    <button className="py-3 px-8 bg-[#DB4444] text-white rounded-md">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* out of width */}
      </div>
    </div>
  );
};

export default manage;
