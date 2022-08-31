import React from "react";
import "./Maze.css";
import MazeElement from "../MazeElement/MazeElement";

class Maze extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 0.0,
    };
    this.gridRows = this.props.maze.length;
    this.gridCols = this.props.maze[0].length;
  }

  componentDidMount() {
    this.mazeFadeIn();
  }
  /**Fading the Maze in... */
  mazeFadeIn() {
    let timer = setInterval(() => {
      if (this.state.opacity >= 1.0) {
        clearInterval(timer);
      }
      this.setState((curState) => {
        let op = curState.opacity + 0.1 > 1.0 ? 1.0 : curState.opacity + 0.1;
        return { opacity: op };
      });
    }, 20);
  }
  /**Creates a new MazeElemet Component that represent an element of the
   * maze's grid.
   */
  creteNewElement(i, j, idx) {
    let elementWidth = 100 / this.gridCols;
    let elementHeight = 100 / this.gridRows;

    return (
      <MazeElement
        key={"maze-element-" + idx}
        width={elementWidth}
        height={elementHeight}
        value={this.props.maze[i][j]}
        position={{ x: i, y: j }}
        onElementClick={this.props.onElementClick}
      />
    );
  }

  // retuns a (mazeRows x mazeCols) array which contains all the
  // maze elements repesented by a MazeElement Component.
  renderElements() {
    let elements = new Array(this.gridRows * this.gridCols);

    for (let i = 0; i < this.gridRows; i++) {
      for (let j = 0; j < this.gridCols; j++) {
        let idx = i * this.gridCols + j;
        elements[idx] = this.creteNewElement(i, j, idx);
      }
    }
    return elements;
  }

  render() {
    return (
      <div className="Maze" style={{ opacity: this.state.opacity }}>
        {this.renderElements()}
      </div>
    );
  }
}

export default Maze;
