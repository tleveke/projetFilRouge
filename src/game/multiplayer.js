import { Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'

const Multiplayer = () => {

    return <Lobby
        gameServer={`${configGame.httpORs}://${configGame.urlServer}`}
        lobbyServer={`${configGame.httpORs}://${configGame.urlServer}`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}


export default Multiplayer;