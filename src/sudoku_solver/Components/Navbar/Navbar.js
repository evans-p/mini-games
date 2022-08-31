import React from "react";

import Logo from "../Logo/Logo";

import "./Navbar.css";

class Navbar extends React.Component {
  render() {
    return (
      <div className="Navbar">
        <Logo />
        {this.props.ready ? (
          <button onClick={this.props.solve}>Solve</button>
        ) : null}
      </div>
    );
  }
}

export default Navbar;
