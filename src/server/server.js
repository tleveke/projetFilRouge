const { Server } = require('boardgame.io/server');
const { TicTacToe } = require('../game/Game');
const { configGame } = require('../game/config')

const server = Server({ games: [TicTacToe] });

server.run(configGame.serverPort);