import "../App.css";
import { Card, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import play from "../images/play.png";
import stop from "../images/stop.png";
import { sendTimeWithMemo } from "../api/api";
import moment from "moment-timezone";

const Timer = (props) => {
  // debugger;
  let now = dayjs().format("HH:mm:ss");
  // let now = dayjs().format("HH:mm:ss");

  const date = new Date().toLocaleString("default", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });

  // console.log(date);

  const [timeNow, setTimeNow] = useState();
  const [time, setTime] = useState({ start: dayjs().unix(), end: 0 });
  const [countTime, calculateTime] = useState({
    hours: 0,
    min: 0,
    sec: 0,
    result: 0,
    secondsSession: 0,
  });
  const [isActive, toogleActive] = useState(false);
  const [intervalId, setIntervalId] = useState();
  const [memo, changeMemo] = useState({ prevMemo: "", memo: "" });
  console.log(countTime);
  console.log(time);

  const startTimer = () => {
    if (!memo.memo) return alert("Write a case!");
    // changeMemo(memo.memo)

    if (memo.memo !== memo.prevMemo) {
      calculateTime({ ...countTime, hours: 0, min: 0, sec: 0 });
    }
    if (!isActive) {
      let thisMoment = dayjs().unix();
      setTime({ ...time, start: dayjs().unix() });

      toogleActive(true);
      // setTime({ ...time, start: now });

      let interval = setInterval(() => {
        setTimeNow(dayjs().format("HH:mm:ss"));
        console.log(time.start);

        let dif = dayjs().unix() - time.start;
        // let dif = time.result;
        console.log(thisMoment);
        // console.log(dif);
        console.log(dif);
        let s = dif % 60;
        let m = Math.floor(dif / 60);
        console.log(m);
        let h = Math.floor(m / 60);
        calculateTime({
          ...countTime,
          hours: h,
          min: m,
          sec: s,
          result: dif,
        });
      }, 1000);
      setIntervalId(interval);
    } else {
      toogleActive(false);
      setTime({ ...time, end: moment().unix() });
      // setTime({ ...time, end: now });
      clearInterval(intervalId);
    }
  };

  useEffect(async () => {
    changeMemo({ ...memo, prevMemo: memo.memo });
    const start = dayjs(time.start);
    const end = dayjs(time.end);
    console.log("miliseconds " + end.diff(start));
    // console.log(dayjs().format("MM/DD/YYYY") + " " + time.end);
    console.log(" sum " + (time.end - time.start));
    let min = Math.round(end.diff(start) / 60);
    let hours = Math.round(end.diff(start) / 60 / 60);
    let sec = Math.round(end.diff(start));
    // console.log(memo);
    console.log(hours);
    console.log(min);
    console.log(sec);
    if (memo.memo !== memo.prevMemo) {
      await calculateTime({
        ...countTime,
        hours: hours,
        min: min,
        sec: sec,
        // secondsSession: end.diff(start),
        // result: 0,
        send: time.end - time.start,
      });
    } else {
      await calculateTime({
        ...countTime,
        hours: countTime.hours + hours,
        min: countTime.min + min,
        sec: countTime.sec + sec,
        send: time.end - time.start,

        // result: countTime.result,

        // secondsSession: end.diff(start),
      });
    }
  }, [time.end]);

  useEffect(() => {
    if (!memo.memo) return;
    sendTimeWithMemo(
      countTime.send,
      memo.memo.toLowerCase(),
      props.user.id,
      dayjs().unix()
    );
  }, [time.end]);

  const handleChangeMemo = (e) => {
    changeMemo({ ...memo, memo: e.target.value });
  };
  const exit = () => {
    localStorage.removeItem("token");
    props.toggleAurh(false);
  };

  console.log(countTime);

  return (
    <div>
      <Card.Body>
        <h2>Hello {props.user.name || "stranger"}!</h2>
      </Card.Body>
      <Button variant="secondary" id="btn__out" onClick={exit}>
        Out
      </Button>
      <Card.Body>
        <div className="buttonContainer">
          <Card.Title>
            <h5>{date}</h5>
          </Card.Title>
          <button className="buttonMain" onClick={startTimer}>
            <img className="playerImg" src={isActive ? stop : play}></img>
          </button>
        </div>
        <Form.Control
          className="timerMemo"
          type="text"
          placeholder="Enter a memo"
          onChange={(e) =>
            !isActive ? handleChangeMemo(e) : (e.target.value = memo.memo)
          }
        />
        <hr />
        <Card.Text className="timeContainer">
          <span>Time:</span>
          <span className="timeNow">{isActive ? timeNow : now}</span>
        </Card.Text>
        <Card.Text className="timeContainer">
          <span>Sum: </span>
          <span className="timeNow">
            {isActive
              ? countTime.hours +
                "h:" +
                countTime.min +
                "m:" +
                countTime.sec +
                "s"
              : "0h:0m:0s"}
          </span>
        </Card.Text>
      </Card.Body>
    </div>
  );
};

export default Timer;
