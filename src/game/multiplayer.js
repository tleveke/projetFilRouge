import { Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'

const Multiplayer = () => {

    return <Lobby
        gameServer={`${configGame.httpORs}://${window.location.hostname}:${configGame.serverPort}`}
        lobbyServer={`${configGame.httpORs}://${window.location.hostname}:${configGame.serverPort}`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}

export default Multiplayer;