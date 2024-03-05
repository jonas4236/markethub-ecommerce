import React, { useState, useEffect } from "react";
import { Countdown } from "react-daisyui";

const CountdownTime = ({ time }) => {

  return (
    <div className="flex h-full items-center">
      <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown
            className="font-mono text-5xl"
            value={Math.floor(time / 3600)}
          />
          hours
        </div>
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown
            className="font-mono text-5xl"
            value={Math.floor((time % 3600) / 60)}
          />
          min
        </div>
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown className="font-mono text-5xl" value={time % 60} />
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTime;
