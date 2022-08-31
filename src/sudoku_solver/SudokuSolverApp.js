import React from "react";

import Navbar from "./Components/Navbar/Navbar";
import SudokuGrid from "./Components/SudokuGrid/SudokuGrid";
import StartScreen from "./Components/StartScreen/StartScreen";

import { sudokuRecursive } from "./Algorithms/SudokuSolver";

class SudokuSolveApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [
        [0, 4, 0, 3, 0, 5, 0, 0, 0],
        [0, 0, 0, 0, 4, 0, 0, 0, 1],
        [0, 0, 2, 1, 7, 0, 9, 0, 0],
        [7, 0, 0, 0, 0, 0, 1, 0, 9],
        [0, 5, 6, 0, 0, 0, 7, 3, 0],
        [4, 0, 9, 0, 0, 0, 0, 0, 8],
        [0, 0, 7, 0, 8, 1, 4, 0, 0],
        [2, 0, 0, 0, 6, 0, 0, 0, 0],
        [0, 0, 0, 5, 0, 2, 0, 1, 0],
      ],
      ready: false,
    };

    this.setElement = this.setElement.bind(this);
    this.clearElement = this.clearElement.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.solve = this.solve.bind(this);
  }

  setElement(x, y, value) {
    let { grid } = this.state;

    grid[x][y] = value;

    this.setState({ grid: grid });
  }

  clearElement(x, y) {
    let { grid } = this.state;

    grid[x][y] = 0;

    this.setState({ grid: grid });
  }

  beginGame() {
    this.setState({ ready: true });
  }

  solve() {
    let { grid } = this.state;
    sudokuRecursive(grid);

    console.log(grid);

    this.setState({ grid: grid });
  }

  render() {
    return (
      <div className="SudokuSolverApp">
        <Navbar ready={this.state.ready} solve={this.solve} />
        {this.state.ready === true ? (
          <SudokuGrid
            grid={this.state.grid}
            setElement={this.setElement}
            clearElement={this.clearElement}
          />
        ) : (
          <StartScreen beginGame={this.beginGame} />
        )}
      </div>
    );
  }
}

export default SudokuSolveApp;
