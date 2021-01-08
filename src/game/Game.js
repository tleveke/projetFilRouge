import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { configGame } from "./index"
import {TicTacToeBoard} from "./Board"

const PlayersPositions = [];

const cellVide = {
    'typeCell' : 'vide',
    'value' : ''
} 
const cellBlock = {
    'typeCell' : 'impossible',
    'value' : ''
} 

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

function getMovePossible(currentPosition) {
    let tabMoveCell = [];
    let tailleGrid = configGame.width;

    if (currentPosition-tailleGrid >= 0) {
        tabMoveCell.push(currentPosition-tailleGrid)
    }
    if (currentPosition+tailleGrid < configGame.maxCases) {
        tabMoveCell.push(currentPosition+tailleGrid)
    }
    if (currentPosition%tailleGrid != tailleGrid-1 ) {
        tabMoveCell.push(currentPosition+1)
    }
    if (currentPosition%tailleGrid != 0 ) {
        tabMoveCell.push(currentPosition-1)
    }
    return tabMoveCell;
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
        moveLimit: 1,
        order:TurnOrder.DEFAULT,
        onBegin: (G, ctx) => {

            let playerPosition = PlayersPositions[ctx.currentPlayer]

            let tabMoveCell = getMovePossible(playerPosition);
            tabMoveCell.forEach((movecell) => {
                if (G.cells[movecell] == null && G.cells[movecell] !== undefined) {
                    G.cells[movecell] = 'M';
                }
            });


        },
        onEnd: (G,ctx) => {
            G.cells = G.cells.map(cell => { if (cell == 'M') {return null} else {return cell}})
        }
    },
    moves: {
        clickCell: (G, ctx, id) => {
            console.log(id, G.cells[id]);

            if (G.cells[id] !== 'M') {
                return INVALID_MOVE
            }
            else if (G.cells[id] !== null && G.cells[id] !== 'M') {
                console.log('d')
                return INVALID_MOVE
            } //TODO: Simplification ? mais ca fonctionne

            for (let i = 0; i<G.cells.length;i++) {
                if (G.cells[i] === ctx.currentPlayer) {
                    G.cells[i] = null
                }
            }
            
            G.cells[id] = ctx.currentPlayer;
            PlayersPositions[ctx.currentPlayer] = id;

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


/* 

{
    'typeCell' = 'move',
    'value' = '';
}

{
    'typeCell' = 'vide',
    'value' = '';
}

{
    'typeCell' = 'player',
    'value' = '';
}

{
    'typeCell' = 'item',
    'value' = '';
}



*/