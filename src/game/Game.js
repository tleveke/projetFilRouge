import { INVALID_MOVE } from "boardgame.io/core";
import { configGame } from "./index"


const PlayersPositions = [];

function IsVictory(cells) {
    const positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    const isRowComplete = row => {
        const symbols = row.map(i => cells[i]);
        return symbols.every(i =>
            (i !== null) &&
            (i === symbols[0])
        );
    }

    return positions.map(isRowComplete).some(i => i === true)
}

function isDraw(cells) {
    return cells.filter(c => c === null).length === 0;
}

function getRndInteger() {
    let max = configGame.width * configGame.heigth
    return Math.floor(Math.random() * (max - 0 )) + 0;
}

export const TicTacToe = {
    setup: (ctx, setupData) => {

        let G = { cells: Array(configGame.maxCases).fill(null) }
        console.log("ctx", ctx);
        console.log("setupData", setupData);

        ctx.playOrder.forEach(player => {
            let siPositionIncorrect = true;
            while (siPositionIncorrect) {

                let playerDefaultPosition = getRndInteger();

                if (!PlayersPositions.includes(playerDefaultPosition)) {

                    siPositionIncorrect = false;
                    
                    G.cells[playerDefaultPosition] = player; 
                    PlayersPositions[player] = playerDefaultPosition
                }
            }
        });
        return G;
    },
    turn: {
        moveLimit: 1
    },
    moves: {
        clickCell: (G, ctx, id) => {
            if (G.cells[id] != null) {
                return INVALID_MOVE
            }

            for (let i = 0; i<G.cells.length;i++) {
                if (G.cells[i] == ctx.currentPlayer) {
                    G.cells[i] = null
                }
            }
            
            G.cells[id] = ctx.currentPlayer;

            //TODO : On pourra faire des appels aux API.
        }
    },
    endIf: (G, ctx) => {
        if (IsVictory(G.cells)) {
            return { winner: ctx.currentPlayer };
        }
        if (isDraw(G.cells)) {
            return { draw: true };
        }
    },
    ai: {
        enumerate: (G, ctx) => {
            let moves = [];
            for (let i = 0; i < configGame.maxCases; i++) {
                if (G.cells[i] === null) {
                    moves.push({ move: 'clickCell', args: [i] });
                }
            }
            return moves;
        },
    },
}