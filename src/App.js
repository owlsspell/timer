import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./component/Timer";
import Authorization from "./component/Authorization";
import { useState } from "react";

function App() {
  const [isAuth, toggleAurh] = useState(false);

  return (
    <div className="backLayar">
      {/* <header className="App-header"> */}
      <div className="cardContainer">
        {isAuth ? <Timer /> : <Authorization />}
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
