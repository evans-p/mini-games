import React from "react";
import Popover from "@material-ui/core/Popover";

import SelectionPad from "../SelectionPad/SelectionPad";

import "./SudokuElement.css";

class SudokuElement extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false, anchorEl: null };

    this.id = "element" + this.props.id;

    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleOnClick(e) {
    const { open } = this.state;

    if (open === false) {
      this.setState({ open: true, anchorEl: e.target });
    } else {
      this.setState({ open: false, anchorEl: null });
    }
  }

  handleOnClose() {
    this.setState({ open: false, anchorEl: null });
  }

  render() {
    return (
      <div className="SudokuElement" onClick={this.handleOnClick}>
        {this.props.value !== 0 ? this.props.value : null}

        <Popover
          id={this.id}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          onClose={this.handleOnClose}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
        >
          <SelectionPad
            x={this.props.x}
            y={this.props.y}
            setElement={this.props.setElement}
            clearElement={this.props.clearElement}
          />
        </Popover>
      </div>
    );
  }
}

export default SudokuElement;
