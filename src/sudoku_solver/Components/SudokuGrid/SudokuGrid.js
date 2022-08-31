import React from "react";
import "./SudokuGrid.css";

import SudokuElement from "../SudokuElement/SudokuElement";

class SudokuGrid extends React.Component {
  renderSudokuElements() {
    let blocks = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        blocks.push(
          <SudokuElement
            key={i * 9 + j}
            id={i * 9 + j}
            value={this.props.grid[i][j]}
            x={i}
            y={j}
            setElement={this.props.setElement}
            clearElement={this.props.clearElement}
          />
        );
      }
    }
    return blocks;
  }

  render() {
    return <div className="SudokuGrid">{this.renderSudokuElements()}</div>;
  }
}

export default SudokuGrid;
