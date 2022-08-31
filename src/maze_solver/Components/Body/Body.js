import React from "react";
import "./Body.css";
import StartScreen from "../StartScreen/StartScreen";
import ErrorMessageList from "../ErrorMessageList/ErrorMessageList";
import MazeLoader from "../MazeLoader/MazeLoader";
import Maze from "../Maze/Maze";
import ControlPanel from "../ControlPanel/ControlPanel";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.mazeRef = React.createRef();
  }

  render() {
    if (this.props.generatingMaze) {
      return (
        <div className="Body">
          <MazeLoader />
        </div>
      );
    } else if (this.props.maze.length === 0) {
      return (
        <div className="Body">
          <ErrorMessageList
            errors={this.props.errors}
            deleteErrorMessage={this.props.deleteErrorMessage}
          />

          <StartScreen />
        </div>
      );
    } else if (this.props.maze.length !== 0) {
      return (
        <div className="Body-Orizontal">
          <ControlPanel
            placingStart={this.props.placingStart}
            placingEnd={this.props.placingEnd}
            selectAlgorithm={this.props.selectAlgorithm}
            selectPlacingStart={this.props.selectPlacingStart}
            selectPlacingEnd={this.props.selectPlacingEnd}
            solveMaze={this.props.solveMaze}
          />
          <Maze
            ref={this.mazeRef}
            maze={this.props.maze}
            onElementClick={this.props.onElementClick}
          />

          <ErrorMessageList
            errors={this.props.errors}
            deleteErrorMessage={this.props.deleteErrorMessage}
          />
        </div>
      );
    }
  }
}

export default Body;
