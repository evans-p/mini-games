import React from "react";
import "./ErrorMessageList.css";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

class ErrorMessageList extends React.Component {
  constructor(props) {
    super(props);
    // Binding
    this.renderErrorMessages = this.renderErrorMessages.bind(this);
  }
  renderErrorMessages(category, errors) {
    return errors.map((e, i) => {
      return (
        <ErrorMessage
          deleteErrorMessage={this.props.deleteErrorMessage}
          key={`error-key-${category}-${i}`}
          category={category}
          message={e}
          index={i}
        />
      );
    });
  }
  render() {
    return (
      <div className="ErrorMessageList">
        {this.renderErrorMessages(
          "generation",
          this.props.errors.generationErrors
        )}
        {this.renderErrorMessages("maze", this.props.errors.mazeErrors)}
      </div>
    );
  }
}

export default ErrorMessageList;
