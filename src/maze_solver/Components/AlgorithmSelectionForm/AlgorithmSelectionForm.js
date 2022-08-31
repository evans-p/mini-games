import React from "react";
import "./AlgorithmSelectionForm.css";

class AlgorithmSelectionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      algorithm: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.selectAlgorithm(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  render() {
    return (
      <form className="AlgorithmSelectionForm">
        <select
          name="algorithm"
          value={this.state.algorithm}
          onChange={this.handleChange}
        >
          <option value="" disabled={true}>
            {"Select\nAlgorithm..."}
          </option>
          <option value="astar">A Star</option>
        </select>
      </form>
    );
  }
}

export default AlgorithmSelectionForm;
