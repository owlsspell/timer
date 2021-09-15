import Timer from "./Timer";
import Authorization from "./Authorization";
import { useEffect, useState } from "react";
import { getUserInfo } from "../api/api";

const HomeContainer = (props) => {
  // debugger;
  console.log(props);
  //   const [isAuth, toggleAurh] = useState(false);
  //   const [user, setUserInto] = useState();

  //   const getUserInBase = () => {
  //     let token = localStorage.getItem("token");
  //     if (!token) return;
  //     getUserInfo(token).then((res) => {
  //       console.log(res);

  //       if (!res) {
  //         console.log("User not found");
  //       }
  //       setUserInto(res.data);
  //       toggleAurh(true);
  //     });
  //   };

  return (
    <div className="backLayar">
      <div className="cardContainer">
        {props.isAuth ? (
          <Timer user={props.user} toggleAurh={props.toggleAurh} />
        ) : (
          <Authorization
            toggleAurh={props.toggleAurh}
            getUserInBase={props.getUserInBase}
          />
        )}
      </div>
    </div>
  );
};

export default HomeContainer;
