import "./App.scss";
import Board from "./components/Board/Board.tsx";

function App() {
  return (
    <>
      <div className="container">
        <h1 style={{fontSize:"3rem", fontWeight:"bold"}}>Trello</h1>
      </div>
      <Board />
    </>
  );
}

export default App;
