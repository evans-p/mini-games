import React from "react";
import { Route, Switch } from "react-router-dom";
import MazeSolverApp from "./maze_solver/MazeSolverApp";
import SudokuSolverApp from "./sudoku_solver/SudokuSolverApp";
import HomePageApp from "./home_page/HomePageApp";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => {
              return <HomePageApp />;
            }}
          ></Route>
          <Route
            path="/maze"
            exact
            render={() => {
              return <MazeSolverApp />;
            }}
          ></Route>
          <Route
            path="/sudoku"
            exact
            render={() => {
              return <SudokuSolverApp />;
            }}
          ></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
