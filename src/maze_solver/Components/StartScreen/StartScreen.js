import React from "react";
import "./StartScreen.css";
import StartScreenAnimation from "../StartScreenAnimation/StartScreenAnimation";

class StartScreen extends React.Component {
  render() {
    return (
      <div className="StartScreen">
        <StartScreenAnimation />
        <h1>Welcome to Maze Solver</h1>
        <h3>You can start by generating a new Maze</h3>
      </div>
    );
  }
}

export default StartScreen;
