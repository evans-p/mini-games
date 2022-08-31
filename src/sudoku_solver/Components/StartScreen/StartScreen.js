import React from "react";
import "./StartScreen.css";

class StartScreen extends React.Component {
  render() {
    return (
      <div className="StartScreen">
        <p className="title">Welcome to Sudoku Solver</p>
        <p className="subtitle">
          You can begin by filling the grid and then pressing "Solve"
        </p>
        <button onClick={this.props.beginGame}>Begin</button>
      </div>
    );
  }
}

export default StartScreen;
