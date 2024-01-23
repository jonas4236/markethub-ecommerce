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

const UploadAvatar = ({
  token,
  userId,
  username,
  avatarURL,
  setisUserUpdated,
  setIsHover,
}) => {
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState(null);

  const toggle = () => {
    setModal(!modal);
  };

  const close = () => {
    setIsHover(false);
  };

  const handleFileChange = ({ target: { files } }) => {
    if (files?.length) {
      const { type } = files[0];
      if (type === "image/png" || type === "image/jpeg") {
        setFile(files[0]);
      } else {
        toast.error("Accept only png and jpeg image types are allowed!*", {
          hideProgressBar: true,
        });
      }
    }
  };

  const updateUserAvatarId = async (avatarId, avatarURL) => {
    try {
      await axios.put(
        `http://localhost:1337/api/users/${userId}`,
        JSON.stringify({ avatarId, avatarURL }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );
      setisUserUpdated(true);
      location.reload(true);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      toast.error("File is required*", {
        hideProgressBar: true,
      });
      return;
    }

    // console.log("handleChange:", handleFileChange)

    try {
      const files = new FormData();
      files.append("files", file);
      //   files.append("name", `${username} avatar`);

      const {
        data: [{ id, url }],
      } = await axios.post(`http://localhost:1337/api/upload`, files, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `bearer ${token}`,
        },
      });
      //   console.log("id:", id)
      //   console.log("url:", url)
      updateUserAvatarId(id, url);
      setFile(null);
      setIsHover(false);
    } catch (error) {
      console.log({ error });
    }
  };

  const closeBtn = (
    <button className="close" onClick={close} type="button">
      ❌
    </button>
  );

  const test = () => {
    setIsHover(false);
  };

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
