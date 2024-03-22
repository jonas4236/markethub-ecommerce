import React from "react";
import DeliverlyCompo from "./deliverlyCompo";
import DeliverlyCompo2 from "./deliverlyCompo2";
import DeliverlyCompo3 from "./deliverlyCompo3";

const deliverly = () => {
  return (
    <>
      <div className="py-[80px]">
        <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto">
          <div className="xl:grid lg:grid md:flex-col grid-cols-3">
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
