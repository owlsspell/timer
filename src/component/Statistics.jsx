import dayjs from "dayjs";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import { getUserStatistics, sendRange } from "../api/api";
import s from "./Statistics.module.css";

const Statistics = (props) => {
  // debugger;
  const [dates, selectDates] = useState({});

  console.log(props.id);
  const [userExercise, setUserExercise] = useState([]);

  useEffect(() => {
    // props.getUserInBase();

    if (!props.id) props.getUserInBase(localStorage.getItem("token"));

    if (props.id) {
      getUserStatistics(props.id).then((res) => {
        setUserExercise(res.data);
        // console.log(res);
      });
    }
  }, []);

  const handleDate = (e, route) => {
    // console.log(e.target.value);
    // console.log(dayjs(e.target.value).unix());
    if (route === "from")
      selectDates({ ...dates, from: dayjs(e.target.value).unix() });
    if (route === "to")
      selectDates({ ...dates, to: dayjs(e.target.value).unix() });
  };

  console.log(dates);

  const selectRange = () => {
    console.log(dates);
    if (!dates.from || !dates.to) return alert("No dates!");
    sendRange(dates).then((res) => setUserExercise(res.data));
  };

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <Form.Group controlId="exampleForm.ControlInput1" className="">
          <Form.Label className={s.inputLabel}>Select start dates</Form.Label>
          <Form.Control type="date" onChange={(e) => handleDate(e, "from")} />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput2" className="">
          <Form.Label className={s.inputLabel}>Select end dates</Form.Label>
          <Form.Control type="date" onChange={(e) => handleDate(e, "to")} />
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput3" className={s.button}>
          <Button type="primary" onClick={selectRange}>
            Show
          </Button>
        </Form.Group>
      </div>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Exercise</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {userExercise.map((i, index) => {
            console.log(i);
            let ms = new moment.duration(i.miliseconds);
            // console.log(ms);
            return (
              <tr key={i.id}>
                <td>{index + 1}</td>

                <td>{i.memo}</td>
                <td>{`${ms.hours()} h. ${ms.minutes()} min. ${ms.seconds()} s. `}</td>
                <td>{moment(ms).format("L")}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Statistics;
