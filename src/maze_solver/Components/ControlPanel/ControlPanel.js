import React from "react";
import "./ControlPanel.css";
import AlgorithmSelectionForm from "../AlgorithmSelectionForm/AlgorithmSelectionForm";

class ControlPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlaceStartClick = this.handlePlaceStartClick.bind(this);
    this.handlePlaceEndClick = this.handlePlaceEndClick.bind(this);
    this.handleSolveMazeClick = this.handleSolveMazeClick.bind(this);
  }

  handlePlaceStartClick(e) {
    this.props.selectPlacingStart(true);
  }
  handlePlaceEndClick(e) {
    this.props.selectPlacingEnd(true);
  }
  handleSolveMazeClick(e) {
    this.props.solveMaze();
  }

  render() {
    return (
      <div className="ControlPanel">
        <h2>Controls:</h2>
        <button
          className={this.props.placingStart ? "start-active" : "start"}
          onClick={this.handlePlaceStartClick}
        >
          Place Maze Start
        </button>
        <button
          className={this.props.placingEnd ? "end-active" : "end"}
          onClick={this.handlePlaceEndClick}
        >
          Place Maze End
        </button>
        <AlgorithmSelectionForm selectAlgorithm={this.props.selectAlgorithm} />
        <button className="solve" onClick={this.handleSolveMazeClick}>
          Solve Maze!
        </button>
      </div>
    );
  }
}

export default ControlPanel;
