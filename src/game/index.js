import {Client} from 'boardgame.io/react'
import {TicTacToe} from './Game'
import {TicTacToeBoard} from './Board'

const GameFilRouge = Client({
  game:TicTacToe,
  board:TicTacToeBoard
})

export default GameFilRouge;