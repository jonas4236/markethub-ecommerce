import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const DetailsReview = ({ review }) => {
  return (
    <>
      <div className="w-full">
        <div className="px-2 w-full">
          <div className="w-full">
            <div className="bg-[#F5F5F5] p-2 rounded-lg w-full">
              <div className="flex items-center justify-center ">
                <img
                  className="size-12 p-1 rounded-full border-2 border-[#DB4444]"
                  src={review.attributes.profileImage}
                  alt="PROFILE_IMAGE"
                />
              </div>
              <div className="flex justify-center">
                <span>
                  <Rating
                    SVGclassName="inline-block"
                    initialValue={review.attributes.stars}
                    readonly
                    size={20}
                  />
                </span>
                <div className=""></div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#DB4444] font-medium">
                  {review.attributes.username}
                </span>
                <span className="font-medium">
                  Posted:{" "}
                  {new Date(review.attributes.createdAt).toLocaleString("th")}
                </span>
              </div>
              <div className="mt-2 h-max px-2">
                <span className="h-max">{review.attributes.text}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsReview;
