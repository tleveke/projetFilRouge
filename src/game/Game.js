import { INVALID_MOVE, TurnOrder } from "boardgame.io/core";
import { configGame } from "./config"
import { Cell } from './Cell';
import data from '../assets/js/map.json';
import { Player } from './Player'
const fetch = require("node-fetch");


let layerMap = {};
data.layers.forEach((layer) => {
    if (layer.id === 1) {
        layerMap = layer
    }
})
const blockTypeCells = [1, 21, 23, 44, 67, 86, 88, 107, 152]


function sendNotification(nameLobby, playerID,titre,tag, message) {
    fetch(`https://server.lamft-dev.tk/sendpush/${nameLobby}_player${playerID}/${titre}/${tag}/${message}`)
        .then(function(response) {
            return response;
        })
        .then(function(myBlob) {
            console.log(myBlob)
        });;
}

function IsVictory(G) {
    let tabAlive = []
    G.PlayersPositions.forEach(player => {
        if (player.etat !== 'dead') {
            tabAlive.push(player);
        }
    })
    if (tabAlive.length === 1) {
        return { victory: true, player: tabAlive[0] }
    } else {
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

function getMovePossible(player, G) {
    const currentPosition = player.position;
    const speed = player.speed;
    const tailleGrid = configGame.maxCases;

    const cellcurrent = G.cells[currentPosition];
    const tabMoveCellStr = [];
    const tabMoveCell = [];

    let car1 = 1;
    let car2 = 2;

    for (let i = 1; i <= speed; i++) {

        tabMoveCellStr.push(`${cellcurrent.x}${cellcurrent.y - i}`)
        tabMoveCellStr.push(`${cellcurrent.x}${cellcurrent.y + i}`)
        tabMoveCellStr.push(`${cellcurrent.x - i}${cellcurrent.y}`)
        tabMoveCellStr.push(`${cellcurrent.x + i}${cellcurrent.y}`)
        if (i === 2) {
            tabMoveCellStr.push(`${cellcurrent.x - car1}${cellcurrent.y + car1}`)
            tabMoveCellStr.push(`${cellcurrent.x + car1}${cellcurrent.y - car1}`)
            tabMoveCellStr.push(`${cellcurrent.x + car1}${cellcurrent.y + car1}`)
            tabMoveCellStr.push(`${cellcurrent.x - car1}${cellcurrent.y - car1}`)
        } else if (i === 3) {
            tabMoveCellStr.push(`${cellcurrent.x - car1}${cellcurrent.y + car2}`)
            tabMoveCellStr.push(`${cellcurrent.x + car1}${cellcurrent.y - car2}`)
            tabMoveCellStr.push(`${cellcurrent.x + car1}${cellcurrent.y + car2}`)
            tabMoveCellStr.push(`${cellcurrent.x - car1}${cellcurrent.y - car2}`)

            tabMoveCellStr.push(`${cellcurrent.x - car2}${cellcurrent.y + car1}`)
            tabMoveCellStr.push(`${cellcurrent.x + car2}${cellcurrent.y - car1}`)
            tabMoveCellStr.push(`${cellcurrent.x + car2}${cellcurrent.y + car1}`)
            tabMoveCellStr.push(`${cellcurrent.x - car2}${cellcurrent.y - car1}`)
        }
    }
    tabMoveCellStr.forEach(cell => {
        let cellInt = parseInt(cell);
        if (cellInt >= 0 && cellInt < 100 && !cell.includes('-')) {
            tabMoveCell.push(cellInt)
        }
    })

    return tabMoveCell;
}

function blockCells(tabMoveCell, player, G) { //Permet d'enlevez la possibilité de bouger dans des cases qui est bloquer par une case bloquer

    tabMoveCell.forEach((movecell) => {
        let cell = G.cells[movecell];

        let cellplus1 = G.cells[movecell + 1];
        let cellmoins1 = G.cells[movecell - 1];
        let cellplus10 = G.cells[movecell + 10];
        let cellmoins10 = G.cells[movecell - 10];

        if (cell.type === 'block') {
            if (cellmoins10 !== undefined && cellmoins10.type === 'move' && player.position === movecell + 10) {
                G.cells[movecell - 10].setBlockCell();
            }
            if (cellplus10 !== undefined && cellplus10.type === 'move' && player.position === movecell - 10) {
                G.cells[movecell + 10].setBlockCell();
            }
            if (cellmoins1 !== undefined && cellmoins1.type === 'move' && player.position === movecell + 1) {
                G.cells[movecell - 1].setBlockCell();
            }
            if (cellplus1 !== undefined && cellplus1.type === 'move' && player.position === movecell - 1) {
                G.cells[movecell + 1].setBlockCell();
            }
        }
    });
}

export const TicTacToe = {
    name: 'Jeu_Fil_Rouge',
    minPlayers: 2,
    maxPlayers: 5,
    setup: (ctx, setupData) => {

        let G = { cells: [] };
        G.PlayersPositions = [];
        G.nameLobby = getRandomName(15);

        for (let x = 0; x < configGame.heigth; x++) {
            for (let y = 0; y < configGame.width; y++) {
                var cell = new Cell(x, y)
                G.cells.push(cell)
            }
        }


        ctx.playOrder.forEach(player => {

            let siPositionIncorrect = true;
            while (siPositionIncorrect) {

                let playerDefaultPosition = getRndInteger();

                if (!G.PlayersPositions.includes(playerDefaultPosition) && !blockTypeCells.includes(layerMap.data[playerDefaultPosition])) {
                    siPositionIncorrect = false;

                    let namePlayer = getRandomName(5);

                    let playerObject = new Player(playerDefaultPosition, namePlayer, player);

                    G.cells[playerDefaultPosition].setPlayer(playerObject);
                    G.PlayersPositions[player] = playerObject
                }
            }
        });





        return G;
    },



    phases: {

        movePlayer: { //Phase qui permet de bouger de case, ce lance en premier. Permet eventuellement de attaquer mais passe le tour
            moves: {

                moveorAttackPlayer: (G, ctx, id) => {

                    console.log(id, ctx)
                    let playerActual = G.PlayersPositions[ctx.currentPlayer];
                    try {
                        for (let i = 0; i < G.cells.length; i++) {

                            if (G.cells[i].player === playerActual) {
                                G.cells[i].setVideCell()
                            }
                        }
                        playerActual.setPosition(id)
                        G.cells[id].setPlayer(playerActual);
                        G.PlayersPositions[ctx.currentPlayer] = playerActual;

                        //ctx.events.setPhase('attackPlayer');

                    } catch {
                        console.log('pas possible')
                    }

                },


                attackPlayer: (G, ctx, id) => {
                    try {
                        let opponent = G.cells[id].player;
                        let playercurrent = G.PlayersPositions[ctx.currentPlayer];
                        console.log(playercurrent);
                        sendNotification(G.nameLobby, opponent.numero, 'Perte de PV','losePV', "Vous avez perdu un coeur.");
                        G.cells[id].player.setLife(opponent.life - playercurrent.power);
                    } catch {
                        console.log('pas possible')
                    }
                },
            },
            turn: {
                moveLimit: 1,
                order: TurnOrder.DEFAULT,
                onBegin: (G, ctx) => { // Tout f'abord, vérification si le joueur est mort ou pas. Si non, obtiens les cases possibles pour le déplacement


                    sendNotification(G.nameLobby, ctx.currentPlayer, 'Votre tour','yourturn', "C'est le moment de jouer, IKE !!!!!!");
                    let player = G.PlayersPositions[ctx.currentPlayer]
                    if (player.etat === 'dead') {
                        ctx.events.pass();
                    } else {


                        let tabMoveCell = getMovePossible(player, G);

                        tabMoveCell.forEach((movecell) => {
                            if (G.cells[movecell] !== undefined && G.cells[movecell].type === 'vide' && !blockTypeCells.includes(layerMap.data[movecell])) {
                                G.cells[movecell].setMoveCell();
                            } else if (blockTypeCells.includes(layerMap.data[movecell])) {
                                G.cells[movecell].setBlockCell();
                            } else if (G.cells[movecell] !== undefined && G.cells[movecell].type === 'player') {
                                G.cells[movecell].player.setEtat('threatfull');
                            }
                        });

                        blockCells(tabMoveCell, player, G)


                    }

                },
                onEnd: (G, ctx) => { // Permet de reintialiser la map et verifie si un joueur est mort.
                    G.cells = G.cells.map(cell => {
                        if (cell.type === 'move' || cell.type === 'block') {
                            cell.setVideCell()
                        }
                        if (cell.type === 'player') {
                            cell.player.setThreathless();
                            if (cell.player.life === 0) {
                                G.PlayersPositions.forEach((player) => {
                                    if (cell.player.classCss === player.classCss) {
                                        cell.setVideCell()
                                        G.PlayersPositions[G.PlayersPositions.indexOf(player)].setDeadPlayer();
                                        sendNotification(G.nameLobby, G.PlayersPositions[G.PlayersPositions.indexOf(player)].numero, 'Défaite','loser', "Vous avez perdu cette partie, vous êtes mort.");
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

        attackPlayer: { //Phase qui permet de attaquer une personne => passe le tour
            turn: {
                moveLimit: 1,
                order: TurnOrder.DEFAULT,
                onBegin: (G, ctx) => {
                    G.cells.forEach((cell) => {
                        if (cell.type !== 'player') {
                            cell.setVideCell();
                        }
                    })
                },
                onEnd: (G, ctx) => {},
            },
            moves: {},
        }

    },

    turn: {},
    endIf: (G, ctx) => {
        let victory = IsVictory(G);
        if (victory.victory) {
            //console.log('Le vainqueur est :',victory.player)
            sendNotification(G.nameLobby, victory.player.numero, 'Victoire !','victory', "Félicitation ! Vous êtes parvenus a vaincre vos adversaires ");
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