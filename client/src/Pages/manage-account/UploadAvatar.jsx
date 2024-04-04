import React, { useState } from "react";
import { toast } from "react-toastify";
import  secureLocalStorage  from  "react-secure-storage";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const API_BASE_URL = `${process.env.API_STRAPI}/api`;

const UploadAvatar = ({
  token,
  userId,
  avatarURL,
  setisUserUpdated,
  setIsHover,
}) => {
  const [file, setFile] = useState(null);
  const closeModal = () => setIsHover(false);

  // check file type.
  const handleFileChange = (event) => {
    const { files } = event.target;

    if (files?.length) {
      const { type } = files[0];
      if (type === "image/png" || type === "image/jpeg") {
        setFile(files[0]);
      } else {
        toast.error("Accept only png and jpeg image types are allowed*", {
          autoClose: 3000,
        });
      }
    }
  };

  // console.log("file:", file);

  // update after "POST" the avatar into cloud.
  const updateUserAvatarId = async (avatarId, avatarURL) => {
    try {
      await axios.put(
        `${API_BASE_URL}/users/${userId}`,
        { avatarId, avatarURL },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      const { data } = await axios.get(`${process.env.API_STRAPI}/api/users/me`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      secureLocalStorage.setItem("infoUser", JSON.stringify(data));
      setisUserUpdated(true);
      window.location.reload(true);
    } catch (error) {
      console.error("Error updating user avatar:", error);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("Avatar is required!", {
        autoClose: 3000,
      });
      return;
    } else {
      toast.success(
        "Upload Avatar Successfully! Please wait a second for reload the page."
      );
      try {
        const formData = new FormData();
        formData.append("files", file);

        const {
          data: [{ id, url }],
        } = await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `bearer ${token}`,
          },
        });
        updateUserAvatarId(id, url);
        setFile(null);
        setIsHover(false);
      } catch (error) {
        console.error("Error uploading avatar:", error);
      }
    }
  };

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      ❌
    </button>
  );

  return (
    <>
      <div className="absolute top-[60px] left-[14px] bottom-[50px]">
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn bg-[#DB4444] text-white hover:bg-[#ff5252] outline-none border-none"
          onClick={() => document.getElementById("avatar_picture").showModal()}
        >
          {`${avatarURL ? "Change" : "Upload"} Avatar`}
        </button>
        <dialog id="avatar_picture" className="modal">
          <div className="modal-box bg-white">
            <h3 className="font-bold text-lg">{`${
              avatarURL ? "Change" : "Upload"
            } Avatar`}</h3>
            <p className="py-4">
              <Label for="AvatarFile">File</Label>
              <Input
                type="file"
                name="file"
                id="AvatarFile"
                onChange={handleFileChange}
              />
            </p>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="btn mr-2 bg-white outline-none border-2 text-[#DB4444] border-[#DB4444]"
                  onClick={closeModal}
                >
                  Close
                </button>
                <span
                  className="btn bg-green-500 text-white hover:bg-green-700 border-none outline-none"
                  onClick={handleSubmit}
                >
                  Change
                </span>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
};

export default UploadAvatar;
