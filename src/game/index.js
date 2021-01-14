import { Client } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'


let width = 10;
let height = 10;

export const configGame = {
    width: width,
    heigth: height,
    maxCases: width * height,
    lifeDefault : 3,
    powerDefault : 1,
    speedDefault : 1
}


/*const GameFilRouge = () => {

    return <Lobby
        gameServer={`http://localhost:8000`}
        lobbyServer={`http://localhost:8000`}
        gameComponents={[
            { game: TicTacToe, board: TicTacToeBoard }
        ]}
    />;
}*/
const GameFilRouge = Client({
    game: TicTacToe,
    board: TicTacToeBoard,
    numPlayers: 4,
})

export default GameFilRouge;