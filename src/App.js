import React, { Component } from 'react';

import Announcement from './components/Announcement'
import ResetButton from './components/ResetButton'
import Tile from './components/Tile'

import './App.css';

let fc = 0;

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: Array(9).fill(null),
      turn: "X",
      winner: null,
      moves: 0,
      lineWin: null,
      huPlayer: 'X',
      aiPlayer: 'O',
      prevTurn: 'O'
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
      huPlayer: 'X',
      aiPlayer: 'O',
      prevTurn: 'O'
    })
  }

  copyBoard(board) {
    return board.slice(0);
  }

  tie(board) {
    let moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  validMove(move, player, board) {
    debugger

    let newBoard = this.copyBoard(board);

    if (newBoard[move] === null) {
      newBoard[move] = player;
      return newBoard;
    } else{
      return null;
    }
  }

  minScore(board) {
    if (!!this.calculateWinner(board, this.state.huPlayer)[0]) {
      return 10;
    }
    else if (!!this.calculateWinner(board, this.state.aiPlayer)[0]) {
      return -10;
    }
    else if (this.tie(board)) {
      return { score: 0 };
    } else {
      let bestMoveValue = 100;
      let move = 0;
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i,  this.state.aiPlayer, board);
        if (newBoard) {
          let predictedMoveValue = this.maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      //console.log("Best Move Value(minScore):", bestMoveValue);
      return bestMoveValue;
    }
  }

  maxScore(board) {
    if (!!this.calculateWinner(board, this.state.huPlayer)[0]) {
      return 10;
    }
    else if (!!this.calculateWinner(board, this.state.aiPlayer)[0]) {
      return -10;
    }
    else if (this.tie(board)) {
      return { score: 0 };
    } else {
      let bestMoveValue = -100;
      let move = 0;
      for (let i = 0; i < board.length; i++) {
        let newBoard = this.validMove(i, this.state.huPlayer, board);
        if (newBoard) {
          let predictedMoveValue = this.minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
            move = i;
          }
        }
      }
      return bestMoveValue;
    }
  }

  //minimax IA function
  minimax(board) {
    let bestMoveScore = 100;
    let move = null;

    if (!!this.calculateWinner(board, this.state.huPlayer)[0] || !!this.calculateWinner(board, this.state.aiPlayer)[0] || this.tie(board)) {
      return null
    }

    for (let i = 0; i < board.length; i++) {

      let newBoard = this.validMove(i, this.state.aiPlayer, board);

      //If validMove returned a valid game board
      if (newBoard) {
        let moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(` prev turn : ${this.state.prevTurn}`)
    console.log(` turn : ${this.state.turn}`)
    if (this.state.turn !== prevState.turn && this.state.gameBoard !== prevState.gameBoard) {
      const winArr = this.calculateWinner(this.state.gameBoard, this.state.prevTurn);
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
      if(this.state.turn !== prevState.turn && this.state.turn === "O"){
        const squares = this.state.gameBoard.slice();
        let ia = this.minimax(squares);
        squares[ia] = this.state.turn;
        const moves = this.state.moves;
        this.setState({
          gameBoard: squares,
          moves: moves + 1,
          turn:'X',
          prevTurn: (this.state.prevTurn === 'O') ? 'X' : 'O'
        });
        console.log(squares)
      }
    }
  }

  calculateWinner(squares, player) {
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
      if (squares[a] === player && squares[b] === player && squares[c] === player) {
        return [squares[a], lines[i]];
      }
    }
    return [null];
  }

  handleClick(i) {
    const squares = this.state.gameBoard.slice();
    // squares[i] = this.state.turn;
    squares[i] = "X";
    const moves = this.state.moves;
    this.setState({
      gameBoard: squares,
      moves: moves + 1
    });
  }

  updatedBoard(loc) {
    if (this.state.gameBoard[loc] === 'X' || this.state.gameBoard[loc] === 'O' || this.state.winner) {
      return;
    } else {
      this.handleClick(loc)
      this.setState({
        // turn: (this.state.turn === 'X') ? 'O' : 'X',
        turn:'O',
        prevTurn: (this.state.prevTurn === 'O') ? 'X' : 'O'
      })
    }
  }

  paint(index) {
    if (this.state.lineWin !== null) {
      let exist = this.state.lineWin.filter(i => i === index);
      // console.log(exist);
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



