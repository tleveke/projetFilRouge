import React from 'react';
import { configGame } from './config';
import './BoardStyle.css';
//import '../../public/js/map';
import data from '../assets/js/map.json';
import { Button } from 'react-bootstrap';

const publicVKey = "BItfWGr9-A8X6Jaoy6AHkRyrs4UPEg1Om2cu8iOeaihiF0zVVNbJsYPOViovgSXYP-5t4hf9n84IJQ7_u1yFZLQ";


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
    
    async registration() {
        if (Notification.permission === "granted") {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: this.urlBase64ToUint8Array(publicVKey),
            });
            const nameJoueur = `${this.props.G.nameLobby}_player${this.props.playerID}`;
            
            const body = {
                subscription:subscription,
                name:nameJoueur
            }
            
            await fetch('https://server.lamft-dev.tk/subscription', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'content-type': 'application/json',
                },
            });
        }
    }

    getNotification() {
        if (('Notification' in window)) {
            if (Notification.permission !== 'denied' && Notification.permission !== 'granted') {
                Notification.requestPermission().then(async (permission) => {
                    this.registration();
                });
            }
            else {
                this.registration();
            }
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
        else if (cell.type === 'object' && cell.object.etat === 'get') {
            this.props.moves.getObject(id);
        }
        else {
            document.getElementById('error').innerHTML = 'Vous pouvez pas cliquez !'
        }
    }

    render() {
        let winner = '';
        console.log( this.props.ctx);
        console.log( this.props.G);
        console.log( this.props);
        let currentPlayer = this.props.playerID; //Multijoeuur
        //let currentPlayer = this.props.ctx.currentPlayer; //Multijoeuur
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
                        if (cell.player.life <= 0) {
                            element.classList.add('dead');
                        }

                        if (cell.player.classCss === `player${currentPlayer}`) {
                            document.getElementById('heart').innerHTML = "";
                            document.getElementById('armor').innerHTML = "";
                            for (let i = 0; i < cell.player.life; i++) {
                                var img = document.createElement('img');
                                img.src = '/img/heart.gif';
                                document.getElementById('heart').appendChild(img);
                            }
                            
                                document.getElementById('dashboard').innerHTML = `<p>Vous avez de puissance ${cell.player.power} et votre capacité de déplacement est ${cell.player.speed}`;
                                
                                
                                document.getElementById('dashboard_weapon').innerHTML = ``;
                                document.getElementById('dashboard_armor').innerHTML = ``;
                                
                                if (cell.player.weapon) {
                                    let weapon = cell.player.weapon;
                                    document.getElementById('dashboard_weapon').innerHTML = `<p>Vous une arme ${weapon.name}, de puissance ${weapon.power}, avec une vitesse supplémentaire ou inférieure de ${weapon.speed}`;
                                }
                                if (cell.player.armor) {
                                    let armor = cell.player.armor;
                                    document.getElementById('dashboard_armor').innerHTML = `<p>Vous une arme ${armor.name}, de capacité de résistance au dégâts de ${armor.armor}, avec une vitesse supplémentaire ou inférieure de ${armor.speed}`;
                                    
                                    for (let y = 0; y < armor.armor; y++) {
                                        var img = document.createElement('img');
                                        img.src = '/img/armor.png';
                                        document.getElementById('armor').appendChild(img);
                                    }
                                    
                                }                            
                            if (Notification.permission === "granted") {
                                //Afficher notification
                                //this.showNotification()
                            }


                        }

                    }
                    else if (cell.type === 'block') {
                        element.classList.add('moveImpossible')
                    }
                    else if (cell.type === 'object') {
                        if (cell.object.etat === 'get') {
                            element.classList.add('items')
                        }
                        if (cell.object.image !== '') {
                            element.classList.add(cell.object.image);
                        }
                        else {
                            
                            console.log(cell,'cell');
                            console.log(cell,'cell');
                            console.log(cell,'cell');
                            console.log(cell,'cell');
                        }
                    }
                    else if (cell.type === 'opponent') {
                        element.classList.add('opponent')
                    }
                    element.classList.add('cell', 'cell' + id)
                }

            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }

        let buttonNotif = <Button variant="info" onClick={() => {this.getNotification()}}><img height="20" src="/img/notification.svg"></img>Cliquez ici, pour accepter les notifications de cette partie</Button>;








        return (
            <div>
            <div>
                <table className="map" id="board">
                    <tbody>{tbody}</tbody>
                </table>
                <p id='error'></p>
                <div id="dashboard"></div>
                <div id="dashboard_weapon"></div>
                <div id="dashboard_armor"></div>
                <div>
                  <span id="heart" className="heart"></span>
                  <span id="armor" className="armor"></span>
                </div>
                {winner}
                {buttonNotif}
            </div>
            </div>
        );
    }
}
