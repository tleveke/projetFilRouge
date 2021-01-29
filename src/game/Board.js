import React from 'react';
import { configGame } from './config';
import './BoardStyle.css';
//import '../../public/js/map';
import data from '../assets/js/map.json';
import { Button, Container, Row, Col, Table, ResponsiveEmbed } from 'react-bootstrap';

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


    setWeaponInfo(docu,player) {
        for (let i = 0; i < player.power; i++) {
            let img = document.createElement('img');
            img.classList.add('powerImg')
            img.src = '/img/power.png';
            docu.appendChild(img);
        }
        if (player.weapon) {
            let power = player.weapon.power;

            for (let y = 0; y < power; y++) {
                let img = document.createElement('img');
                img.classList.add('powerImg')
                img.src = '/img/power.png';
                docu.appendChild(img);
            }

        }
        return docu;
    }
    setArmorInfo(docu,player) {
        if (player.armor) {
            let armor = player.armor;

            for (let y = 0; y < armor.armor; y++) {
                let img = document.createElement('img');
                img.src = '/img/armor.png';
                docu.appendChild(img);
            }

        }
        return docu;
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
                subscription: subscription,
                name: nameJoueur,
                matchID:this.props.matchID,
                credentials:this.props.credentials,
                playerID:this.props.playerID
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
        document.getElementById('buttonNotif').style.display = 'none';
    }

    getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    passTour() {
        this.props.moves.passTurn();
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
        let currentPlayer = this.props.playerID; //Multijoeuur
        //let currentPlayer = this.props.ctx.currentPlayer; //Multijoeuur
        if (this.props.ctx.gameover) {
            winner = <div id="winner">Winner: {this.props.ctx.gameover.winner.classCss}</div>
            if (this.props.ctx.gameover.winner.player !== undefined) {
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
                        <span id={'span' + id} ></span>
                    </td>
                );

                let element = document.getElementById(id.toString());

                if (element != null) {

                    let docSpan = document.getElementById(`span${id.toString()}`);
                    var cell = this.props.G.cells[id];

                    element.classList.remove(...element.classList)
                    docSpan.classList.remove(...docSpan.classList);
                    docSpan.innerHTML = '';


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

                            let player = cell.player;
                            let dash_weapon = document.getElementById('dashboard_weapon');
                            let dashboard_armor = document.getElementById('dashboard_armor');
                            this.setWeaponInfo(dash_weapon,player);
                            this.setArmorInfo(dashboard_armor,player);

                            if (Notification.permission === "granted") {
                                //Afficher notification
                                //this.showNotification()
                            }


                        }


                        let p = document.createElement('p');
                        p.textContent = cell.player.name;


                        let divArmor = document.createElement('div');
                        divArmor.classList.add('armor');

                        let divHeart = document.createElement('div');
                        divHeart.classList.add('heart');

                        let divPower = document.createElement('div');
                        divPower.classList.add('power');

                        for (let i = 0; i < cell.player.life; i++) {
                            let img = document.createElement('img');
                            img.src = '/img/heart.gif';
                            divHeart.appendChild(img);
                        }

                        divArmor = this.setArmorInfo(divArmor,cell.player)
                        divPower = this.setWeaponInfo(divPower,cell.player);


                        docSpan.appendChild(p);
                        docSpan.appendChild(divArmor);
                        docSpan.appendChild(divHeart);
                        docSpan.appendChild(divPower);

                        docSpan.classList.add('popupUser')

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
                        
                        let p = document.createElement('p');
                        p.textContent = cell.object.name;
                        docSpan.appendChild(p);
                        docSpan.classList.add('popupObject')

                    }
                    else if (cell.type === 'opponent') {
                        element.classList.add('opponent')
                    }
                    element.classList.add('cell', 'cell' + id)
                }

            }
            tbody.push(<tr key={i}>{cells}</tr>);
        }
        let buttonNotif = '';
        if (('Notification' in window)) {
            buttonNotif = <Button id="buttonNotif" variant="info" onClick={() => { this.getNotification() }}><img height="20" src="/img/notification.svg"></img>Cliquez ici, pour accepter les notifications de cette partie</Button>;
        }








        return (
            <ResponsiveEmbed aspectRatio="4by3">
                <Container fluid>
                    <Row>
                        <Col style={{ width: '100%', height: 'auto' }} className="center">
                            <Table responsive="sm" className="map" id="board">
                                <tbody>{tbody}</tbody>
                            </Table>
                        </Col>
                        <Col>
                            <p id='error'></p>
                            <div id="dashboard"></div>
                            <div id="dashboard_weapon"></div>
                            <div id="dashboard_armor"></div>
                            <div>
                                <div id="armor" className="armor"></div>
                                <div id="heart" className="heart"></div>
                            </div>
                            {winner}
                            {buttonNotif}
                            <Button id="passTour" variant="secondary" onClick={() => { this.passTour() }}>Cliquez ici, pour passer votre tour !</Button>
                        </Col>
                    </Row>
                </Container>
            </ResponsiveEmbed>
        );
    }
}
