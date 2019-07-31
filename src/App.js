import React, { Component } from 'react';

import Announcement from './components/Announcement'
import ResetButton from './components/ResetButton'
import Tile from './components/Tile'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        'x', ' ', ' ',
        ' ', 'x', ' ',
        ' ', ' ', '',
      ],
      turn: "x",
      winner: null
    }
    this.updatedBoard = this.updatedBoard.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' ',
      ],
      turn: "x",
      winner: null
    })
  }

  updatedBoard(loc, player) {
  }


  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1 style={{ textAlign: 'center' }}>Tic-Tac-Toe</h1>
          <Announcement winner={this.state.winner} />
        </div>
        <div className="boardContainer">
          <div className="board">
            {this.state.gameBoard.map(function (value, i) {
              return (
                <Tile
                  key={i}
                  loc={i}
                  value={value}
                  updatedBoard={this.updatedBoard}
                  turn={this.state.turn}
                />
              )
            }.bind(this))}
          </div>
          <ResetButton reset={this.resetBoard} />
        </div>
      </div>
    );
  }
}

export default App;



