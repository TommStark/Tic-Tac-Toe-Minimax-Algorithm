import React, { Component } from 'react';
import Flash from 'react-reveal/Flash';
import "../App.css"

class Tile extends Component {
  tileClick(props) {
    props.updatedBoard(props.loc, props.turn);
    console.log(props)
  }

  rendersimple(props) {
    return (
      <div className={
        !!props.won
          ?
          "tile--winning"
          :
          "tile"
      }
        onClick={() => { this.tileClick(props) }}>
        <p>{props.value}</p>
      </div>
    )
  }
  renderWon(props) {
    return (
      <Flash>
        {this.rendersimple(props)}
      </Flash>
    )
  }
  chooseZoom(props) {
    return props.won ? this.renderWon(props) : this.rendersimple(props)
  }

  render() {
    return (
      this.chooseZoom(this.props)
    )
  }
}

export default Tile;