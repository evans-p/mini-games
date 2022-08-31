import React from "react";
import "./ErrorMessage.css";

class ErrorMessage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: 0.0,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.deleteErrorMessage(
      this.props.category,
      parseInt(this.props.index)
    );
  }
  messageFadeIn() {
    let timer = setInterval(() => {
      if (this.state.opacity >= 1.0) {
        clearInterval(timer);
      }
      this.setState((curState) => {
        let op = curState.opacity + 0.1 > 1.0 ? 1.0 : curState.opacity + 0.1;

        return { opacity: op };
      });
    }, 20);
  }
  componentDidMount() {
    this.messageFadeIn();
  }
  render() {
    return (
      <div className="ErrorMessage" style={{ opacity: this.state.opacity }}>
        <p>{this.props.message}</p>
        <i className="fas fa-times" onClick={this.handleClick}></i>
      </div>
    );
  }
}

export default ErrorMessage;
