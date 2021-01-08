import React from 'react';
import { configGame } from '.';
import './BoardStyle.css';
//import '../../public/js/map';
import data from '../assets/js/map.json';

let firstTurn = true;

export class TicTacToeBoard extends React.Component {
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onClick(id) {
        this.props.moves.clickCell(id);
    }

    movesCell() {
        
    }



    render() {
        console.log(data);
        let winner = '';
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                        <div id="winner">Draw!</div>
                    );
        }

        let tbody = [];
        for (let i = 0; i < configGame.width; i++) {
            let cells = [];
            for (let j = 0; j < configGame.heigth; j++) {
                const id = configGame.heigth * i + j;
                cells.push(
                    <td className={"cell cell"+id} id={id} key={id} onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id]/*id*/}
                    </td>
                );

                if (document.getElementById(id.toString()) != null) {
                    if (this.props.G.cells[id] == 'M') {
                        document.getElementById(id.toString()).classList.add('movePossible')
                    }
                    else {
                        document.getElementById(id.toString()).classList.remove('movePossible')
                    }
                }

            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        

        




        return (
            <div>
                <table class="map" id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}