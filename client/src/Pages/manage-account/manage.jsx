import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UploadAvatar from "./UploadAvatar";
import Swal from "sweetalert2";

const manage = () => {
  const [user, setUser] = useState({});
  const [isUserUpdated, setisUserUpdated] = useState(false);
  const [ishover, setIsHover] = useState(false);

  // state for change password.
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordWarn, setPasswordWarn] = useState(false);

  // state for change info data.
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const { token, username, logout } = useContext(AuthContext);

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

  const clearInputs = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewFullName("");
    setNewEmail("");

    setPasswordWarn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword != confirmPassword) {
      setPasswordWarn(true);
    }

    if (newPassword == confirmPassword) {
      setPasswordWarn(false);
      try {
        const response = await axios.post(
          "http://localhost:1337/api/auth/change-password",
          {
            currentPassword: currentPassword,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          Swal.fire({
            title: "Changed Password Successfully!",
            text: `You have changed the password!`,
            icon: "success",
          }).then(() => {
            logout();
          });
        }
      } catch (error) {
        console.log("can't change password:", error);
      }
    } else if (!newPassword && !confirmPassword) {
      return;
    }

    if (newFullName) {
      try {
        const response = await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            username: String(newFullName),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateUsername = {
          newUsername: newFullName,
        };

        const updateWishlistUsername = {
          newWishlistUsername: newFullName,
        };

        await axios.put(
          `http://localhost:1337/api/new-username/${username}`,
          updateUsername
        );
        await axios.put(
          `http://localhost:1337/api/wishlist/new-username/${username}`,
          updateWishlistUsername
        );

        if (response.status === 200) {
          localStorage.setItem("username", JSON.stringify(newFullName));
        }
      } catch (error) {
        console.log("can't change password:", error);
      }
    }

    if (newEmail) {
      axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        {
          email: String(newEmail),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (newAddress) {
      axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        {
          address: String(newAddress),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }

    if (newFullName && newEmail) {
      try {
        const response = await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            username: String(newFullName),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateUsername = {
          newUsername: newFullName,
        };

        const updateWishlistUsername = {
          newWishlistUsername: newFullName,
        };

        await axios.put(
          `http://localhost:1337/api/new-username/${username}`,
          updateUsername
        );
        await axios.put(
          `http://localhost:1337/api/wishlist/new-username/${username}`,
          updateWishlistUsername
        );

        if (response.status === 200) {
          localStorage.setItem("username", JSON.stringify(newFullName));
        }

        await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            email: String(newEmail),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log("can't change password:", error);
      }
    }

    if ((newFullName && newEmail) || newAddress) {
      try {
        const response = await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            username: String(newFullName),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateUsername = {
          newUsername: newFullName,
        };

        const updateWishlistUsername = {
          newWishlistUsername: newFullName,
        };

        await axios.put(
          `http://localhost:1337/api/new-username/${username}`,
          updateUsername
        );
        await axios.put(
          `http://localhost:1337/api/wishlist/new-username/${username}`,
          updateWishlistUsername
        );

        if (response.status === 200) {
          localStorage.setItem("username", JSON.stringify(newFullName));
        }

        if (newEmail) {
          await axios.put(
            `http://localhost:1337/api/users/${user.id}`,
            {
              email: String(newEmail),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else if (newAddress) {
          await axios.put(
            `http://localhost:1337/api/users/${user.id}`,
            {
              address: String(newAddress),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      } catch (error) {
        console.log("can't change password:", error);
      }
    }

    if (newFullName && newEmail && newAddress) {
      try {
        const response = await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            username: String(newFullName),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateUsername = {
          newUsername: newFullName,
        };

        const updateWishlistUsername = {
          newWishlistUsername: newFullName,
        };

        await axios.put(
          `http://localhost:1337/api/new-username/${username}`,
          updateUsername
        );
        await axios.put(
          `http://localhost:1337/api/wishlist/new-username/${username}`,
          updateWishlistUsername
        );

        if (response.status === 200) {
          localStorage.setItem("username", JSON.stringify(newFullName));
        }

        await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            email: String(newEmail),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            address: String(newAddress),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log("can't change info profile:", error);
      }
    }

    if (
      (newFullName || newEmail || newAddress) &&
      !currentPassword &&
      !newPassword &&
      !confirmPassword
    ) {
      Swal.fire({
        title: "Changed info successfully!",
        text: `You have changed the info profile!`,
        icon: "success",
      }).then(() => {
        window.location.reload();
      });
    }

    if (
      newFullName &&
      newEmail &&
      newAddress &&
      currentPassword &&
      newPassword &&
      confirmPassword
    ) {
      try {
        const response = await axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            username: String(newFullName),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updateUsername = {
          newUsername: newFullName,
        };

        const updateWishlistUsername = {
          newWishlistUsername: newFullName,
        };

        await axios.put(
          `http://localhost:1337/api/new-username/${username}`,
          updateUsername
        );
        await axios.put(
          `http://localhost:1337/api/wishlist/new-username/${username}`,
          updateWishlistUsername
        );

        if (response.status === 200) {
          localStorage.setItem("username", JSON.stringify(newFullName));
        }

        axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            email: String(newEmail),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        axios.put(
          `http://localhost:1337/api/users/${user.id}`,
          {
            address: String(newAddress),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        await axios.post(
          "http://localhost:1337/api/auth/change-password",
          {
            currentPassword: currentPassword,
            password: newPassword,
            passwordConfirmation: confirmPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log("can't change all info profile:", error);
      }
    }
  };

  return (
    <div className="py-16">
      <div className="2xl:w-[1170px] xl:w-[1170px] lg:w-full max-[639px]:w-full xl:px-0 px-8 mx-auto">
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

        <div className="flex xl:flex-row lg:flex-row md:flex-row max-[639px]:flex-col mt-16 max-[639px]:w-full">
          <div className="flex-[1] mr-16">
            <div className="">
              <span className="font-semibold">Manage My Account</span>
              <div className="mt-2 ml-8 text-[#DB4444] cursor-pointer w-max">
                My Profile
              </div>
            </div>
          </div>
          <div className="flex-[2.5]">
            <div className="p-8 max-[639px]:w-full">
              <span className="text-[20px] text-[#DB4444] font-medium">
                Edit Your Profile
              </span>
              <div className="mt-4 flex w-full justify-center flex-col max-[639px]:w-full items-center">
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
                        src={
                          "https://res.cloudinary.com/jonasdev/image/upload/v1711905368/default-profile_jzlexm.png"
                        }
                        alt={`${user.username} avatar`}
                      />
                      {ishover && (
                        <UploadAvatar
                          token={token}
                          userId={user.id}
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
              <div className="max-[639px]:w-full">
                {/*  */}
                <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col max-[639px]:flex-col">
                  <div className="flex-[1] flex flex-col mr-16 w-full max-[639px]:w-full">
                    <label htmlFor="FullName" className="font-medium">
                      Full Name
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="text"
                      placeholder="Full Name..."
                      defaultValue={user?.username}
                      onChange={(e) => setNewFullName(e.target.value)}
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

                <div className="flex xl:flex-row lg:flex-row md:flex-row sm:flex-col max-[639px]:flex-col mt-4">
                  <div className="flex-[1] flex flex-col mr-16 w-full">
                    <label htmlFor="FullName" className="font-medium">
                      Email
                    </label>
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="text"
                      placeholder="Email..."
                      defaultValue={user?.email}
                      onChange={(e) => setNewEmail(e.target.value)}
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
                      onChange={(e) => setNewAddress(e.target.value)}
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
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <input
                    className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  {passwordWarn && (
                    <div className="text-[#DB4444] mt-2">
                      Password is not match*
                    </div>
                  )}
                  <div className="flex-[1] flex flex-col mt-4">
                    <input
                      className="bg-[#F5F5F5] outline-none py-2 px-4 rounded-md"
                      type="password"
                      placeholder="Confirm New Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {passwordWarn && (
                    <div className="text-[#DB4444] mt-2">
                      Password is not match*
                    </div>
                  )}
                </div>
                <div className="flex justify-end mt-4">
                  <div className="mr-4 flex items-center justify-center">
                    <button
                      className="h-full font-medium"
                      onClick={clearInputs}
                    >
                      Cancel
                    </button>
                  </div>
                  {(currentPassword && newPassword && confirmPassword) ||
                  newFullName ||
                  newEmail ||
                  newAddress ? (
                    <div className="">
                      <button
                        onClick={handleSubmit}
                        className="py-[12px] px-8 bg-[#DB4444] text-white rounded-md font-medium"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <div className="">
                      <span className="py-[12px] px-8 bg-[#ccc] text-black rounded-md font-medium cursor-not-allowed">
                        Save Changes
                      </span>
                    </div>
                  )}
                </div>
                {/*  */}
              </div>
            </div>
          </div>
        </div>
        {/* out of width */}
      </div>
    </div>
  );
};

export default manage;
