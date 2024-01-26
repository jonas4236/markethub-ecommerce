import React, { useEffect, useState } from "react";

const WriteComments = () => {
  const [warnText, setWarnText] = useState(false);

  const onChangeTextArea = (event) => {
    const { value } = event.target;

    if (value.length >= 382) {
      setWarnText(true);
    } else {
      setWarnText(false);
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
          <div className="py-4 px-64">
            <div className="py-4 px-4 border-[1px]  border-gray-200 rounded-lg shadow-xl">
              <textarea
                className="w-full h-[250px] py-2 px-2 resize-none bg-[#F3F4F6] border-[2px] border-[#ccc] rounded-lg outline-none"
                placeholder="You can review product in here..."
                maxLength={382}
                onChange={onChangeTextArea}
              ></textarea>
              {warnText && (
                <span className="text-[#DB4444]">
                  You can have a maximum length of 384* words.
                </span>
              )}
              <div className="flex justify-end mt-2">
                <button className="w-max py-2 px-4 bg-[#DB4444] rounded-lg text-white font-medium">
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WriteComments;
