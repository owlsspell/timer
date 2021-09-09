import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { registerUser } from "../api/api";
import Login from "./Login";
import Register from "./Register";

const Authorization = (props) => {
  const [activeWindow, changeWindow] = useState("auth");
  const [logInInpits, addLogInInfo] = useState({});
  const [logUpInpits, addLogUpInfo] = useState({});
  console.log(logUpInpits);
  const sendInfo = () => {
    if (activeWindow === "reg") {
      registerUser(logUpInpits);
    }
  };

  return (
    <>
      <div className="cardHeader">
        <Card.Header
          className={activeWindow === "auth" ? "active" : ""}
          onClick={() => {
            if (activeWindow === "reg") changeWindow("auth");
          }}
        >
          <span>Authorization</span>
        </Card.Header>
        <Card.Header
          className={activeWindow === "reg" ? "active" : ""}
          onClick={() => {
            if (activeWindow === "auth") changeWindow("reg");
          }}
        >
          <span>Registration</span>
        </Card.Header>
      </div>
      {activeWindow === "auth" ? (
        <Login />
      ) : (
        <Register logUpInpits={logUpInpits} addLogUpInfo={addLogUpInfo} />
      )}
      <Button
        variant="primary"
        type="submit"
        className="btn__auth"
        onClick={sendInfo}
      >
        Submit
      </Button>
    </>
  );
};

export default Authorization;
