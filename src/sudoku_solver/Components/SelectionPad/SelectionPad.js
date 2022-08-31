import React from "react";
import "./SelectionPad.css";

class SelectionPad extends React.Component {
  render() {
    return (
      <div className="SelectionPad">
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 1);
          }}
        >
          1
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 2);
          }}
        >
          2
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 3);
          }}
        >
          3
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 4);
          }}
        >
          4
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 5);
          }}
        >
          5
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 6);
          }}
        >
          6
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 7);
          }}
        >
          7
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 8);
          }}
        >
          8
        </div>
        <div
          className="pad-button"
          onClick={() => {
            this.props.setElement(this.props.x, this.props.y, 9);
          }}
        >
          9
        </div>
        <div
          className="clear-button"
          onClick={() => {
            this.props.clearElement(this.props.x, this.props.y);
          }}
        >
          Clear
        </div>
      </div>
    );
  }
}

export default SelectionPad;
