import { Client, Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'


let width = 20;
let height = 20;

export const configGame = {
    width: width,
    heigth: height,
    maxCases: width * height
}


/*const GameFilRouge = () => {


    return <Lobby
        gameServer={`https://localhost:8000`}
        lobbyServer={`https://localhost:8000`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}*/
const GameFilRouge = Client({
    game: TicTacToe,
    board: TicTacToeBoard
})

export default GameFilRouge;