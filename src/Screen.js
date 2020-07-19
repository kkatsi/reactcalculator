import React, { Component } from "react";
import "./styles.css";

class Screen extends React.Component {
  render() {
    return (
      <div className="Screen">
        <span>{this.props.scrValue}</span>
      </div>
    );
  }
}

export default Screen;
