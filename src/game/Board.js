import React from 'react';
import { configGame } from '.';

let firstTurn = true;

export class TicTacToeBoard extends React.Component {
    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onClick(id) {
        this.props.moves.clickCell(id);
    }

    render() {

        let winner = '';
        if (this.props.ctx.gameover) {
            winner =
                this.props.ctx.gameover.winner !== undefined ? (
                    <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
                ) : (
                        <div id="winner">Draw!</div>
                    );
        }

        const cellStyle = {
            border: '1px solid #555',
            width: '10px',
            height: '10px',
            lineHeight: '10px',
            textAlign: 'center',
        };

        let tbody = [];
        for (let i = 0; i < configGame.width; i++) {
            let cells = [];
            for (let j = 0; j < configGame.heigth; j++) {
                const id = configGame.heigth * i + j;
                cells.push(
                    <td style={cellStyle} className={"cell"+id} key={id} onClick={() => this.onClick(id)}>
                        {this.props.G.cells[id]/*id*/}
                    </td>
                );
            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        if (firstTurn) {
            let playerDefaultPosition = configGame.heigth * this.getRndInteger(0,configGame.width) + this.getRndInteger(0,configGame.heigth);
            console.log("Le positionnement du joueur " + this.props.ctx.currentPlayer + " est => "+ playerDefaultPosition)
            firstTurn = false;
        }

        




        return (
            <div>
                <table id="board">
                    <tbody>{tbody}</tbody>
                </table>
                {winner}
            </div>
        );
    }
}