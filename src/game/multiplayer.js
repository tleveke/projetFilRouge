import { Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'

const Multiplayer = () => {

    return <Lobby
        gameServer={`${configGame.httpORs}://evening-reaches-67290.herokuapp.com`}
        lobbyServer={`${configGame.httpORs}://evening-reaches-67290.herokuapp.com`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}

export default Multiplayer;