import React from "react";
import "./GridSizeForm.css";

class GridSizeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSize: "10-10",
    };
    // Binding
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let grid = this.state.gridSize.split("-").map((val) => {
      return parseInt(val);
    });
    this.props.selectGridSize(grid);
  }

  handleChange(e) {
    let grid = e.target.value.split("-").map((val) => {
      return parseInt(val);
    });
    this.props.selectGridSize(grid);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <form className="GridSizeForm">
        <label htmlFor="gridSize">Maze Size:</label>
        <select
          name="gridSize"
          value={this.state.gridSize}
          onChange={this.handleChange}
        >
          <option value="10-10">10x10</option>
          <option value="20-20">20x20</option>
          <option value="30-30">30x30</option>
        </select>
      </form>
    );
  }
}

export default GridSizeForm;
