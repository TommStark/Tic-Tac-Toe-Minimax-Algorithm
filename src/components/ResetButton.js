import React, { Component } from 'react';

class ResetButton extends Component {
  render() {
    return (
      <button className="resetButton" onClick={this.props.reset}>Reset</button>
    );
  }
}

export default ResetButton;