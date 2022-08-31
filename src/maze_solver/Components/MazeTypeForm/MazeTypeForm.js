import React from "react";
import "./MazeTypeForm.css";

class MazeTypeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mazeType: "",
    };
    // Binding
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.props.selectMazeType(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <form className="MazeTypeForm">
        <label htmlFor="mazeType">Maze Type:</label>
        <select
          name="mazeType"
          value={this.state.mazeType}
          onChange={this.handleChange}
        >
          <option disabled={true} value="">
            Select Maze Type...
          </option>
          <option value="random">Random Grid</option>
          <option value="blank">Blank Maze</option>
          <option value="recursive-division">Recursive Division</option>
          <option value="randomized-depth-first">
            Randomized Depth First Search
          </option>
        </select>
      </form>
    );
  }
}

export default MazeTypeForm;
