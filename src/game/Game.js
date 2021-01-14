import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { configGame } from "./index"
import { TicTacToeBoard } from "./Board"
import { Cell } from './Cell';
import data from '../assets/js/map.json';
import { Player } from '../game/Player'

let layerMap = {};
data.layers.forEach((layer) => {
    if (layer.id === 1) {
        layerMap = layer
    }
})
const PlayersPositions = [];
const blockTypeCells = [1, 21, 23, 44, 67, 86, 88, 107, 152]


function IsVictory() {
    let tabAlive = []
    PlayersPositions.forEach(player => {
        if (player.etat !== 'dead') {
            tabAlive.push(player);
        }
    })
    if (tabAlive.length == 1) {
        return { victory: true, player: tabAlive[0] }
    }
    else {
        return { victory: false }
    }
}
function getRndInteger() {
    let max = configGame.width * configGame.heigth
    return Math.floor(Math.random() * (max - 0)) + 0;
}
function getRandomName(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getMovePossible(player) {
    const currentPosition = player.position;
    const speed = player.speed;
    const tailleGrid = configGame.width;

    let tabMoveCell = [];

    if (currentPosition - tailleGrid >= 0) {
        tabMoveCell.push(currentPosition - tailleGrid)
    }
    if (currentPosition + tailleGrid < configGame.maxCases) {
        tabMoveCell.push(currentPosition + tailleGrid)
    }
    if (currentPosition % tailleGrid !== tailleGrid - speed) {
        tabMoveCell.push(currentPosition + speed)
    }
    if (currentPosition % tailleGrid !== 0) {
        tabMoveCell.push(currentPosition - speed)
    }

    return tabMoveCell;
}

export const TicTacToe = {
    setup: (ctx, setupData) => {

        let G = { cells: [] };


        for (let i = 0; i < configGame.maxCases; i++) {
            var cell = new Cell()
            G.cells.push(cell)
        }

        console.log("ctx", ctx);
        console.log("setupData", setupData);

        ctx.playOrder.forEach(player => {
            let siPositionIncorrect = true;
            while (siPositionIncorrect) {

                let playerDefaultPosition = getRndInteger();

                if (!PlayersPositions.includes(playerDefaultPosition) && !blockTypeCells.includes(layerMap.data[playerDefaultPosition])) {
                    siPositionIncorrect = false;

                    let namePlayer = getRandomName(5);

                    let playerObject = new Player(playerDefaultPosition, namePlayer, player);

                    G.cells[playerDefaultPosition].setPlayer(playerObject);
                    PlayersPositions[player] = playerObject
                }
            }
        });

        console.log('PlayerPosition', PlayersPositions);
        console.log('GCells', G.cells)
        return G;
    },



    phases: {

        movePlayer: { //Phase qui permet de bouger de case, ce lance en premier. Permet eventuellement de attaquer mais passe le tour
            moves: {

                movePlayer: (G, ctx, id) => {
                    for (let i = 0; i < G.cells.length; i++) {

                        if (G.cells[i].player === PlayersPositions[ctx.currentPlayer]) {
                            G.cells[i].setVideCell()
                        }
                    }

                    let playerObject = PlayersPositions[ctx.currentPlayer];
                    playerObject.setPosition(id)

                    G.cells[id].setPlayer(playerObject);
                    PlayersPositions[ctx.currentPlayer] = playerObject;

                    //ctx.events.setPhase('attackPlayer');


                    //TODO; QUAND joueur A coté alors pas de tour passé;

                    /////////// ^  On Bouge  ^//////////

                    //TODO : On pourra faire des appels aux API.
                },


                attackPlayer: (G, ctx, id) => {
                    let opponent = G.cells[id].player;
                    let playercurrent = PlayersPositions[ctx.currentPlayer];
                    G.cells[id].player.setLife(opponent.life - playercurrent.power);
                },
            },
            turn: {
                moveLimit: 1,
                order: TurnOrder.DEFAULT,
                onBegin: (G, ctx) => { // Tout f'abord, vérification si le joueur est mort ou pas. Si non, obtiens les cases possibles pour le déplacement
                    let player = PlayersPositions[ctx.currentPlayer]
                    if (player.etat === 'dead') {
                        ctx.events.pass();
                    }
                    else {

                        console.log('playerPosition', player);

                        let tabMoveCell = getMovePossible(player);
                        tabMoveCell.forEach((movecell) => {

                            if (G.cells[movecell].type === 'vide' && G.cells[movecell] !== undefined && !blockTypeCells.includes(layerMap.data[movecell])) {
                                G.cells[movecell].setMoveCell();
                            }
                            else if (blockTypeCells.includes(layerMap.data[movecell])) {
                                G.cells[movecell].setBlockCell();
                            }
                            else if (G.cells[movecell].type === 'player') {
                                G.cells[movecell].player.setEtat('threatfull');
                            }
                        });
                    }

                },
                onEnd: (G, ctx) => { // Permet de reintialiser la map et verifie si un joueur est mort.
                    G.cells = G.cells.map(cell => {
                        if (cell.type === 'move' || cell.type === 'block') {
                            cell.setVideCell()
                        }
                        if (cell.type === 'player') {
                            cell.player.setThreathless();
                            if (cell.player.life == 0) {
                                PlayersPositions.forEach((player) => {
                                    if (cell.player.classCss === player.classCss) {
                                        cell.setVideCell()
                                        PlayersPositions[PlayersPositions.indexOf(player)].setDeadPlayer();
                                    }
                                })
                            }
                        }
                        return cell
                    })
                },
            },
            start: true,
        },

        attackPlayer: {//Phase qui permet de attaquer une personne => passe le tour
            turn: {
                moveLimit: 1,
                order: TurnOrder.DEFAULT,
                onBegin: (G, ctx) => {
                    G.cells.forEach((cell) => {
                        if (cell.type != 'player') {
                            cell.setVideCell();
                        }
                    })
                },
                onEnd: (G, ctx) => {
                },
            },
            moves: {},
        }

    },

    turn: {},
    endIf: (G, ctx) => {
        let victory = IsVictory();
        if (victory.victory) {
            //console.log('Le vainqueur est :',victory.player)
            return { winner: victory.player };
        }
    },
    ai: {
        /*enumerate: (G, ctx) => {
            let moves = [];
            for (let i = 0; i < configGame.maxCases; i++) {
                if (G.cells[i] === null) {
                    moves.push({ move: 'clickCell', args: [i] });
                }
            }
            return moves;
        },*/
    },
}


/*

moves: {

        attackPlayer: (G, ctx, id) => {
            let opponent = G.cells[id].player;
            let playercurrent = PlayersPositions[ctx.currentPlayer];
            G.cells[id].player.setLife(opponent.life - playercurrent.power);
        },

        movePlayer: (G, ctx, id) => {
            for (let i = 0; i < G.cells.length; i++) {

                if (G.cells[i].player === PlayersPositions[ctx.currentPlayer]) {
                    G.cells[i].setVideCell()
                }
            }




            let playerObject = PlayersPositions[ctx.currentPlayer];
            playerObject.setPosition(id)

            G.cells[id].setPlayer(playerObject);
            PlayersPositions[ctx.currentPlayer] = playerObject;


            //TODO; QUAND joueur A coté alors pas de tour passé;


            /////////// ^  On Bouge  ^//////////






            //TODO : On pourra faire des appels aux API.
        }
    },

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