import "./App.css";

import Navbar from "./component/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeContainer from "./component/HomeContainer";
import { BrowserRouter, withRouter } from "react-router-dom";
import { getUserInfo } from "./api/api";
import { useEffect, useState } from "react";

function App() {
  const [user, setUserInto] = useState({});
  const [isAuth, toggleAurh] = useState(false);

  const getUserInBase = (token) => {
    if (!token) return;
    return getUserInfo(token).then((res) => {
      console.log(res);

      if (!res) {
        console.log("User not found");
      }
      toggleAurh(true);
      setUserInto(res.data);
    });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    getUserInBase(token);
  }, []);
  console.log(user);

  return (
    <div>
      <Navbar
        user={user}
        toggleAurh={toggleAurh}
        isAuth={isAuth}
        getUserInBase={getUserInBase}
      />
      {/* <HomeContainer /> */}
    </div>
  );
}

export default withRouter(App);
