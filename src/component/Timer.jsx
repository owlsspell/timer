import "../App.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import play from "../images/play.png";
import stop from "../images/stop.png";

const Timer = (props) => {
  let now = dayjs().format("HH:mm:ss");

  const date = new Date().toLocaleString("default", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });

  //   console.log(date);

  const [timeNow, setTimeNow] = useState();
  const [time, setTime] = useState({ start: "", end: "" });
  const [countTime, calculateTime] = useState({ hours: 0, min: 0 });
  const [isActive, toogleActive] = useState(false);
  const [intervalId, setIntervalId] = useState();

  console.log(time);
  console.log("isActive " + isActive);

  const startTimer = () => {
    if (!isActive) {
      toogleActive(true);
      setTime({ ...time, start: now });
      let interval = setInterval(
        () => setTimeNow(dayjs().format("HH:mm:ss")),
        1000
      );
      setIntervalId(interval);
    } else {
      toogleActive(false);
      setTime({ ...time, end: now });
      clearInterval(intervalId);
    }
  };

  useEffect(() => {
    const start = dayjs("2021-09-07" + time.start);
    const end = dayjs("2021-09-07" + time.end);
    console.log("start " + start);
    console.log("end " + end);

    console.log(end.diff(start));
    let min = Math.round(end.diff(start) / 1000 / 60);
    let hours = Math.round(end.diff(start) / 1000 / 60 / 60);
    calculateTime({
      ...countTime,
      hours: countTime.hours + hours,
      min: countTime.min + min,
    });
  }, [time.end]);

  return (
    <div>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <div className="buttonContainer">
          <Card.Title>
            <h5>{date}</h5>
          </Card.Title>
          <button className="buttonMain" onClick={startTimer}>
            <img className="playerImg" src={isActive ? stop : play}></img>
          </button>
        </div>

        <hr />
        <Card.Text className="timeContainer">
          <p>Time:</p>
          <div className="timeNow">{isActive ? timeNow : now}</div>
        </Card.Text>
        <Card.Text className="timeContainer">
          <p>Sum: </p>
          <div className="timeNow">
            {countTime.hours + "h:" + countTime.min + "m"}
          </div>
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default Timer;
