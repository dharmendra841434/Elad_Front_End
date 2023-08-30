import React, { useEffect, useState } from "react";
import { remainingdaya } from "../utils/helper/helperFunctions";

const ThirtyDayCountdown = () => {
  const [remainingTime, setRemainingTime] = useState(30 * 24 * 60 * 60 * 1000); // 30 days in milliseconds

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 1000); // Update remaining time every second
    }, 1000);

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();

  const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

  return (
    <div>
      <p>{`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`}</p>
      <p>{remainingdaya()}</p>
    </div>
  );
};

export default ThirtyDayCountdown;
