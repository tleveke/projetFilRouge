import { Client, Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'

/*const GameFilRouge = () => {

    return <Lobby
        gameServer={`http://${window.location.hostname}:${configGame.serverPort}`}
        lobbyServer={`http://${window.location.hostname}:${configGame.serverPort}`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}*/

const GameFilRouge = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    numPlayers: 4,
    debug:false
})


export default GameFilRouge;