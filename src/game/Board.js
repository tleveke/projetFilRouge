import React from 'react';
import { configGame } from './config';
import './BoardStyle.css';
//import '../../public/js/map';
import data from '../assets/js/map.json';
import { Button } from 'react-bootstrap';

const publicVKey = "BERS0qIV52YrS3vpWLTtx8t3a3LrXfqrazefmqy5o_TuQ6ZC2TDkWmQb1ZmUeeVxRmQjeGsi0Aah-sod4PKP5M4";


export class TicTacToeBoard extends React.Component {


    urlBase64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    showNotification() {
        const notif = new Notification("Vous pouvez jouer !", { body: "C'est à votre tour, vous pouvez jouer votre tour !", icon: 'img/attack_notification.svg', badge: "img/logo-fil-rouge.png" });
        notif.addEventListener('click', (e) => {
            window.open('/game', "_blank")
        })
    }

    async getNotifServiceWorker() {
        if (!('Notification' in window)) return;
        if (Notification.permission === "granted") {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(publicVKey),
            });

            await fetch('http://localhost:12538/subscription', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'content-type': 'application/json',
                },
            });
        }
    }

    getNotification() {
        if (('Notification' in window)) {
            Notification.requestPermission();
        }
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    onClick(id) {
        let cell = this.props.G.cells[id];
        document.getElementById('error').innerHTML = '';
        if (cell.type === 'player' && cell.player.etat === 'threatfull') {
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
        this.getNotifServiceWorker();
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
                    if (cell.type === 'move') {
                        element.classList.add('movePossible')
                    }
                    else if (cell.type === 'player') {

                        element.classList.add('player', cell.player.classCss)
                        if (`threatfull` === cell.player.etat) {
                            element.classList.add('opponent');
                        }
                        if (cell.player.life === 0) {
                            element.classList.add('dead');
                        }

                        if (cell.player.classCss === `player${currentPlayer}`) {
                            document.getElementById('heart').innerHTML = "";
                            for (let i = 0; i < cell.player.life; i++) {
                                var img = document.createElement('img');
                                img.src = '/img/heart.gif';
                                document.getElementById('heart').appendChild(img);
                            }

                            if (Notification.permission === "granted") {
                                //Afficher notification
                                this.showNotification()
                            }


                        }

                    }
                    else if (cell.type === 'block') {
                        element.classList.add('moveImpossible')
                    }
                    else if (cell.type === 'opponent') {
                        element.classList.add('opponent')
                    }
                    element.classList.add('cell', 'cell' + id)
                }

            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        let buttonNotif;
        if (Notification.permission !== 'denied' && Notification.permission !== 'granted') {
            buttonNotif = <Button variant="info" onClick={this.getNotification}><img height="20" src="/img/notification.svg"></img>Cliquez ici, pour accepter les notifications</Button>;
        }








        return (
            <div>
                <table className="map" id="board">
                    <tbody>{tbody}</tbody>
                </table>
                <p id='error'></p>
                <div id="heart" className="heart"></div>
                {winner}
                {buttonNotif}
            </div>
        );
    }
}