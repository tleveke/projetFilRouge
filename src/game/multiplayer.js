import { Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'

const Multiplayer = () => {

    return <Lobby
        gameServer={`http://${window.location.hostname}:${configGame.serverPort}`}
        lobbyServer={`http://${window.location.hostname}:${configGame.serverPort}`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}

export default Multiplayer;