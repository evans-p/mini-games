import React from "react";
import "./Navbar.css";
import OptionList from "../OptionList/OptionList";
import Logo from "../Logo/Logo";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleButtonClick() {
    this.props.generateMaze();
  }
  render() {
    return (
      <div className="Navbar">
        <div className="Navbar-components">
          <Logo />
          <OptionList
            selectGridSize={this.props.selectGridSize}
            selectMazeType={this.props.selectMazeType}
          />
          <button onClick={this.handleButtonClick}>Generate Maze</button>
        </div>
      </div>
    );
  }
}

export default Navbar;
