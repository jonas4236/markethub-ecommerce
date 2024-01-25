import React, { useState } from "react";
import { toast } from "react-toastify";

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

const API_BASE_URL = "http://localhost:1337/api";

const UploadAvatar = ({
  token,
  userId,
  avatarURL,
  setisUserUpdated,
  setIsHover,
}) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const toggle = () => setModal(!modal);

  const close = () => setIsHover(false);

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
      <Button
        className="absolute bottom-16 left-[12px] outline-none border-none py-1 px-3 bg-[#DB4444] text-white rounded-md"
        onClick={toggle}
      >
        Upload Avatar
      </Button>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className="text-lg" close={closeBtn}>{`${
            avatarURL ? "Change" : "Upload"
          } Avatar`}</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="AvatarFile">File</Label>
                <Input
                  type="file"
                  name="file"
                  id="AvatarFile"
                  onChange={handleFileChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-white outline-none border-none bg-sky-600"
              onClick={handleSubmit}
            >
              Upload
            </Button>{" "}
            <Button
              className="text-white outline-none border-none bg-gray-600"
              onClick={close}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default UploadAvatar;
