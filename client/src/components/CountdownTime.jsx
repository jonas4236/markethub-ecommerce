import React, { useState, useEffect } from "react";
import { Countdown } from "react-daisyui";

const CountdownTime = ({ time }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((value) => (value <= 0 ? time : value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  // console.log("seconds:", seconds);
  useEffect(() => {
    if (seconds === 0) {
      location.reload(true);
    }
  }, [seconds]);

  return (
    <div className="flex h-full items-center">
      <div className="grid grid-flow-col gap-3 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown
            className="font-mono text-5xl"
            value={Math.floor(seconds / 3600)}
          />
          hours
        </div>
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown
            className="font-mono text-5xl"
            value={Math.floor((seconds % 3600) / 60)}
          />
          min
        </div>
        <div className="flex flex-col p-2 bg-[#F2F2F2] rounded-box text-[#DB4444]">
          <Countdown className="font-mono text-5xl" value={seconds % 60} />
          sec
        </div>
      </div>
    </div>
  );
};

export default CountdownTime;
