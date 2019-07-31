import React, { Component } from 'react';
import "../App.css"

class Tile extends Component {
  tileClick(props){
    props.updateBoard(props.loc, props.turn);
  }

  render() {
    return (
      <div className="tile" onClick={() => this.tileClick(this.props)}>
        <p>{this.props.value}</p>
      </div>
    )
  }
}

export default Tile;