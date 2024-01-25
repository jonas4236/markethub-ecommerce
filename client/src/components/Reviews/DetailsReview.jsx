import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const DetailsReview = () => {
  const [rating, setRating] = useState(4);

  return (
    <>
      <div className="">
        <div className="px-2">
          <div className="">
            <div className="bg-[#F5F5F5] p-2 rounded-lg">
              <div className="flex items-center justify-center ">
                <img
                  className="size-12 p-1 rounded-full border-2 border-[#DB4444]"
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt=""
                />
              </div>
              <div className="flex justify-center">
                <span>
                  <Rating
                    SVGclassName="inline-block"
                    initialValue={rating}
                    readonly
                    size={20}
                  />
                </span>
                <div className=""></div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-[#DB4444] font-medium">
                  Thanakorn Sangmee
                </span>
                <span className="font-medium">Posted: 25/1/2567</span>
              </div>
              <div className="mt-2 h-max px-2">
                <span className="h-max">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Repudiandae reprehenderit ullam doloribus suscipit voluptate
                  ab? Fuga enim blanditiis consequatur? Molestiae nam commodi
                  voluptatum quas? Repellat expedita amet aspernatur, obcaecati,
                  est qui iusto placeat modi eius voluptas quae. Ad omnis eius
                  illum vitae, reprehenderit eos delectus, soluta dicta
                  laudantium enim doloribus.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsReview;
