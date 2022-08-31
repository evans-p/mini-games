import React from "react";
import "./MazeElement.css";

class MazeElement extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleOnMouseOver = this.handleOnMouseOver.bind(this);
  }
  /**Selects the color of the Maze element based on the value of the element
   * on the maze grid.
   */
  selectElementColor(val) {
    switch (val) {
      case 0:
        return "black";
      case 1:
        return "white";
      case 2:
        return "green";
      case 3:
        return "red";
      case 4:
        return "yellow";
      default:
        console.log("Unknown Element Type...");
    }
  }

  handleClick() {
    let { x, y } = this.props.position;
    x = parseInt(x);
    y = parseInt(y);
    this.props.onElementClick(x, y);
  }
  /**Handles the event of the mouse hovering above the element. */
  handleOnMouseOver(e) {
    console.log(e.buttons);
  }

  render() {
    return (
      <div
        className="MazeElement"
        onClick={this.handleClick}
        // onMouseOver={this.handleOnMouseOver}
        style={{
          width: `${this.props.width}%`,
          height: `${this.props.height}%`,
          backgroundColor: this.selectElementColor(parseInt(this.props.value)),
        }}
      ></div>
    );
  }
}

export default MazeElement;
