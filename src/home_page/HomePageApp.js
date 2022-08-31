import React from "react";
import { Link } from "react-router-dom";
import "./HomePageApp.css";
import MazeAnimation from "./MazeAnimation";

class HomePageApp extends React.Component {
  render() {
    return (
      <div className="HomePageApp">
        <nav></nav>
        <div className="main">
          <Link exact to="/maze" style={{ textDecoration: "none" }}>
            <div className="item maze">
              <h2>Maze Solver</h2>
              <div className="content">
                <MazeAnimation />
              </div>
            </div>
          </Link>
          <Link exact to="/sudoku" style={{ textDecoration: "none" }}>
            <div className="item item2">
              <h2>Sudoku Solver</h2>
              <div className="content">Item 2</div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default HomePageApp;
