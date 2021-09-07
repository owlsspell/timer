import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./component/Timer";

function App() {
  return (
    <div className="backLayar">
      {/* <header className="App-header"> */}
      <div className="cardContainer">
        <Timer />
      </div>
      {/* </header> */}
    </div>
  );
}

export default App;
