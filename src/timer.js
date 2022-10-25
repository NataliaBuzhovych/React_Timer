import { useEffect, useState } from "react";
import { getTimer } from "./getTimer";

function Timer({ num }) {
  const [filled, setFilled] = useState(300);
  const [timeLeft, setTimeLeft] = useState(num);
  const [startTime, setStartTime] = useState(false);

  const min = getTimer(Math.floor(timeLeft / 60));
  const sec = getTimer(Math.floor(timeLeft - min * 60));

  useEffect(() => {
    const interval = setInterval(() => {
      if (!startTime && filled > 0) {
        const step = 300 / num;
        setFilled((prev) => (prev -= step));
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
        console.log("Залишилось часу: " + min + ":" + sec);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [filled, startTime]);

  const toggleStop = () => {
    setStartTime(true);
  };
  const toggleStart = () => {
    setStartTime(false);
  };
  return (
    <div className="conteiner_timer">
      <div className="time">
        <span>{min}</span>
        <span>:</span>
        <span>{sec}</span>
      </div>
      <div
        className="box"
        style={{
          width: `${filled}px`,
          backgroundColor: "#662a04",
          transition: "1s",
        }}
      ></div>
      <div className="btn_box">
        {startTime ? (
          <button className="btn" onClick={toggleStart}>
            {" "}
            START
          </button>
        ) : (
          <button className="btn" onClick={toggleStop}>
            STOP
          </button>
        )}
      </div>
    </div>
  );
}

export default Timer;
