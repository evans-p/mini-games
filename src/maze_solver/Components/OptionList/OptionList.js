import React from "react";
import "./OptionList.css";
import GridSizeForm from "../GridSizeForm/GridSizeForm";
import MazeTypeForm from "../MazeTypeForm/MazeTypeForm";

class OptionList extends React.Component {
  render() {
    return (
      <div className="OptionList">
        <GridSizeForm selectGridSize={this.props.selectGridSize} />
        <MazeTypeForm selectMazeType={this.props.selectMazeType} />
        {/* <div className="speech-bubble">Hello World</div> */}
      </div>
    );
  }
}

export default OptionList;
