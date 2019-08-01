import React, { Component } from 'react';
import "../App.css"

class Tile extends Component {
  tileClick(props){
    props.updatedBoard(props.loc, props.turn);
    console.log(props)
  }
  render() {
    return (
      <div className={
        !!this.props.won
        ? 
        "tile--winning"
        :
        "tile"
      }
       onClick={() => { this.tileClick(this.props) }}>
        <p>{this.props.value}</p>
      </div>
    )
  }
}

export default Tile;