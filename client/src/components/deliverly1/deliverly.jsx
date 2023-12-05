import React from "react";
import DeliverlyCompo from "./deliverlyCompo";
import DeliverlyCompo2 from "./deliverlyCompo2";
import DeliverlyCompo3 from "./deliverlyCompo3";

const deliverly = () => {
  return (
    <>
      <div className="py-[80px]">
        <div className="w-[1200px] mx-auto">
          <div className="grid grid-cols-3">
            <DeliverlyCompo />
            <DeliverlyCompo2 />
            <DeliverlyCompo3 />
          </div>
        </div>
      </div>
    </>
  );
};

export default deliverly;
