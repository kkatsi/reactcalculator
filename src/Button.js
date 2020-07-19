import React, { Component } from "react";
import "./styles.css";

class Button extends React.Component {
  render() {
    return (
      <button
        className="Button"
        value={this.props.text}
        onClick={this.props.onClick}
      >
        {this.props.text}
      </button>
    );
  }
}

export default Button;
