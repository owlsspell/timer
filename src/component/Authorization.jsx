import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { authorizeUser, registerUser } from "../api/api";
import Login from "./Login";
import Register from "./Register";

const Authorization = (props) => {
  // debugger;
  const [activeWindow, changeWindow] = useState("auth");
  const [logInInpits, addLogInInfo] = useState({});
  const [logUpInpits, addLogUpInfo] = useState({});

  const sendInfo = () => {
    console.log(logInInpits);

    if (activeWindow === "reg") {
      if (!logUpInpits.email || !logUpInpits.password || !logUpInpits.name)
        return alert("Please fill in the registration fields!");
      registerUser(logUpInpits)
        .then((res) =>
          authorizeUser({
            email: logUpInpits.email,
            password: logUpInpits.password,
          })
        )
        .then(() => props.toggleAurh(true));
      console.log(logUpInpits);
    }
    if (activeWindow === "auth") {
      if (!logInInpits.email || !logInInpits.password)
        return alert("Please fill in the authorization fields!");
      authorizeUser(logInInpits)
        .then((res) => localStorage.setItem("token", res.data.token))
        .then(() => props.toggleAurh(true))
        .then((res) => props.getUserInBase());
      console.log(logInInpits);
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
        <Login logInInpits={logInInpits} addLogInInfo={addLogInInfo} />
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
