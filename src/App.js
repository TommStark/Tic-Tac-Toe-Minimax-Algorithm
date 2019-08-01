import React, { Component } from 'react';

import Announcement from './components/Announcement'
import ResetButton from './components/ResetButton'
import Tile from './components/Tile'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: Array(9).fill(null),
      turn: "X",
      winner: null,
      moves: 0,
      lineWin: null,
    }
    this.updatedBoard = this.updatedBoard.bind(this);
    this.resetBoard = this.resetBoard.bind(this);
  }

  resetBoard() {
    this.setState({
      gameBoard: Array(9).fill(null),
      turn: "X",
      winner: null,
      moves: 0,
      lineWin: null,
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.turn !== prevState.turn) {
      const winArr = this.calculateWinner(this.state.gameBoard);
      if (winArr[0] !== null) {
        this.setState({
          winner: winArr[0],
          lineWin: winArr[1]
        })
      }
      if (this.state.winner == null && this.state.moves === 9) {
        this.setState({
          winner: 0
        })
      }
    }
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return [null];
  }

  handleClick(i) {
    const squares = this.state.gameBoard.slice();
    squares[i] = this.state.turn;
    const moves = this.state.moves;
    this.setState({
      gameBoard: squares,
      moves: moves + 1
    });

  }

  updatedBoard(loc) {
    if (this.state.gameBoard[loc] === 'X' || this.state.gameBoard[loc] === 'O' || this.state.winner) {
      console.log('invalid move')
      return;
    } else {
      this.handleClick(loc)
      this.setState({
        turn: (this.state.turn === 'X') ? 'O' : 'X'
      })
    }
  }

  paint(index){
    if(this.state.lineWin !== null){
      let exist = this.state.lineWin.filter(i => i === index);
      console.log(exist);
      return exist.length === 1;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="menu">
          <h1 style={{ textAlign: 'center' }}>Tic-Tac-Toe</h1>
        </div>
        <div className="boardContainer">
          <Announcement
            winner={this.state.winner}
            status={this.state.turn}
          />
          <div className="board">
            {this.state.gameBoard.map(function (value, i) {
              return (
                <Tile
                  key={i}
                  loc={i}
                  won={this.paint(i)}
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



