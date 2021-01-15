import React from 'react';
import { configGame } from './config';
import './BoardStyle.css';
//import '../../public/js/map';
import data from '../assets/js/map.json';

let firstTurn = true;

export class TicTacToeBoard extends React.Component {
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onClick(id) {
        let cell = this.props.G.cells[id];
        document.getElementById('error').innerHTML = '';
        if (cell.type === 'player' && cell.player.etat == 'threatfull') {
            this.props.moves.attackPlayer(id)
        }
        else if (cell.type === 'move') {
            this.props.moves.moveorAttackPlayer(id);
        }
        else {
            document.getElementById('error').innerHTML = 'Vous pouvez pas cliquez !'
        }
    }

    render() {
        let winner = '';
        let currentPlayer = this.props.ctx.currentPlayer;
        if (this.props.ctx.gameover) {
            console.log('gameover', this.props.ctx.gameover)
            winner = <div id="winner">Winner: {this.props.ctx.gameover.winner.classCss}</div>
            if (this.props.ctx.gameover.winner.player !== undefined) {
                console.log('Winner is => ', this.props.ctx.gameover.winner)
            }
        }


        let tbody = [];
        for (let i = 0; i < configGame.width; i++) {
            let cells = [];
            for (let j = 0; j < configGame.heigth; j++) {
                const id = configGame.heigth * i + j;


                cells.push(
                    <td id={id} key={id} onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id].value/*id*/}
                    </td>
                );

                let element = document.getElementById(id.toString());



                if (element != null) {

                    var cell = this.props.G.cells[id];

                    element.classList.remove(...element.classList)
                    if (cell.type == 'move') {
                        element.classList.add('movePossible')
                    }
                    else if (cell.type == 'player') {

                        element.classList.add('player', cell.player.classCss)
                        if (`threatfull` == cell.player.etat) {
                            element.classList.add('opponent');
                        }
                        if (cell.player.life === 0) {
                            element.classList.add('dead');
                        }

                        if (cell.player.classCss == `player${currentPlayer}`) {
                            document.getElementById('heart').innerHTML = "";
                            for (let i = 0; i < cell.player.life; i++) {
                                var img = document.createElement('img');
                                img.src = '/img/heart.gif';
                                document.getElementById('heart').appendChild(img);
                            }
                        }

                    }
                    else if (cell.type == 'block') {
                        element.classList.add('moveImpossible')
                    }
                    else if (cell.type == 'opponent') {
                        element.classList.add('opponent')
                    }
                    element.classList.add('cell', 'cell' + id)
                }

            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }








        return (
            <div>
                <table className="map" id="board">
                    <tbody>{tbody}</tbody>
                </table>
                <p id='error'></p>
                <div id="heart" className="heart"></div>
                {winner}
            </div>
        );
    }
}