import React from "react";
import "./MazeAnimation.css";

class MazeAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.start = React.createRef();
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
      mouseOver: false,
    };

    this.handleOnMouseEnter = this.handleOnMouseEnter.bind(this);
    this.handleOnMouseLeave = this.handleOnMouseLeave.bind(this);
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
              ref={this.start}
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
  handleOnMouseEnter() {
    this.setState({ mouseOver: true });
  }
  handleOnMouseLeave() {
    this.setState({ mouseOver: false });
  }
  render() {
    return (
      <div
        className="MazeAnimation"
        // onMouseEnter={this.handleOnMouseEnter}
        // onMouseLeave={this.handleOnMouseLeave}
      >
        {this.renderElements()}
      </div>
    );
  }
}

export default MazeAnimation;
