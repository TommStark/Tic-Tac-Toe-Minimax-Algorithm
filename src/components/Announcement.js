import React, { Component } from 'react';
import "../App.css"

class Announcement extends Component {
  render() {
    return (
      <div className='announcement'>
      <h2> {
        this.props.winner !== null ? (
          this.props.winner === 0 
          ?
          "It's a Draw"
          :
          `Winner : ${this.props.winner}` 
        )
        :`${this.props.status}'s Turn`
        }</h2>
      </div>
    );
  }
}

export default Announcement;