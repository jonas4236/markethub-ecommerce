import React, { useContext, useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const WriteComments = ({ token, productId, setRating, setIsProductUpdate }) => {
  const [warnText, setWarnText] = useState(false);
  const [review, setReview] = useState({ stars: 0, text: "" });

  const { username, email, infoUser } = useContext(AuthContext);

  const { avatarURL } = infoUser.user || infoUser;

  const giveRating = (newRating) => {
    setReview({ ...review, stars: newRating });
  };

  const giveTextReview = (event) => {
    const { value } = event.target;
    setReview({ ...review, text: value });

    if (value.length >= 382) {
      setWarnText(true);
    } else {
      setWarnText(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!review.stars) {
      toast.warn("You need to give stars for sending review!");
    } else if (!review.text) {
      toast.warn("You need to give messages for sending review!");
    }

    if (review.stars && review.text) {
      try {
        axios.post(
          "http://localhost:1337/api/reviews",
          {
            ...review,
            productId,
            username,
            email,
            avatarURL:
              avatarURL ||
              "https://res.cloudinary.com/jonasdev/image/upload/v1711905368/default-profile_jzlexm.png",
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          }
        );

        setIsProductUpdate(true);
        setReview({ stars: 0, text: "" });

        Swal.fire({
          title: "Comments Successfully!",
          text: `Thanks you for review our product!`,
          icon: "success",
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.log("error cannot submit review:", error);
      }
    }
  };

  return (
    <>
      <div className="mt-8">
        <div className="flex justify-center">
          <span className="mt-16 text-[#DB4444] font-medium text-[28px]">
            Comments
          </span>
        </div>
        <div className="">
          <div className="py-4 xl:px-64 lg:px-64 md:px-0">
            <form
              onSubmit={handleSubmit}
              className="py-4 px-4 border-[1px] border-gray-200 rounded-lg shadow-xl"
            >
              <div className="mb-4 w-full flex justify-center">
                <Rating
                  SVGclassName="inline-block"
                  onClick={giveRating}
                  initialValue={review.stars}
                  size={30}
                />
              </div>
              <textarea
                className="w-full h-[250px] py-2 px-2 resize-none bg-[#F3F4F6] border-[2px] border-[#ccc] rounded-lg outline-none"
                placeholder="You can review product in here..."
                maxLength={382}
                onChange={giveTextReview}
              ></textarea>
              {warnText && (
                <span className="text-[#DB4444]">
                  You can have a maximum length of 382* words.
                </span>
              )}
              <div className="flex justify-end mt-2">
                <button className="w-max py-2 px-4 bg-[#DB4444] rounded-lg text-white font-medium">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteComments;
