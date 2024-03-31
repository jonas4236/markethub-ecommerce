import React from "react";
import Service2 from "./Service2"
import Service3 from "./Service3"
import Service4 from "./Service4"


const deliverly = () => {
  return (
    <>
      <div className="py-[80px]">
        <div className="2xl:w-[1200px] xl:w-[1200px] lg:w-full xl:px-0 px-8 mx-auto">
          <div className="xl:grid lg:grid md:flex-col grid-cols-3">
            <Service2 />
            <Service3 />
            <Service4 />
          </div>
        </div>
      </div>
    </>
  );
};

export default deliverly;
