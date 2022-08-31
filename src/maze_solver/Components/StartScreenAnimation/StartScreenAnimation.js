import React from "react";
import "./StartScreenAnimation.css";

class StartScreenAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maze: [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1, 1, 0],
        [2, 1, 1, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0, 1, 0],
        [0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
      ],
    };
  }
  /**
   * Creates 64 squares and adds them to the animaton div.
   */
  renderElements() {
    let elements = [];
    for (let i = 0; i < this.state.maze.length; i++) {
      for (let j = 0; j < this.state.maze.length; j++) {
        if (this.state.maze[i][j] === 2) {
          elements.push(
            <div
              key={`animation-${i}-${j}`}
              className="animation-element start"
            ></div>
          );
        } else if (this.state.maze[i][j] === 1) {
          elements.push(
            <div
              key={`animation-${i}-${j}`}
              className="animation-element white"
            ></div>
          );
        } else {
          elements.push(
            <div
              key={`animation-${i}-${j}`}
              className="animation-element black"
            ></div>
          );
        }
      }
    }
    return elements;
  }
  render() {
    return <div className="StartScreenAnimation">{this.renderElements()}</div>;
  }
}

export default StartScreenAnimation;
