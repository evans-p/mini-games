import React from "react";
import "./MazeLoader.css";

class MazeLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1.0,
      scale: 1.0,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      let timer = setInterval(() => {
        if (this.state.opacity <= 0.1) {
          clearInterval(timer);
        }
        this.setState((curState) => {
          let op = curState.opacity - 0.1 < 0.1 ? 0.0 : curState.opacity - 0.1;
          let scale = curState.scale + 0.2;

          return { opacity: op, scale: scale };
        });
      }, 20);
    }, 700);
  }
  render() {
    return (
      <div
        className="MazeLoader"
        style={{
          transform: `scale(${this.state.scale})`,
          opacity: this.state.opacity,
        }}
      >
        <div className="loading"></div>
        <h1>Generating Maze...</h1>
      </div>
    );
  }
}

export default MazeLoader;
