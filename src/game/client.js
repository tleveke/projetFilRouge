import { Client, Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'
import React, { Component, useState, useEffect } from 'react';
import { SocketIO } from 'boardgame.io/multiplayer'
import ReactDOM from 'react-dom';
import { useLocation, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';




const Child = () => {

	const [displayGame, setDisplayGame] = useState(false);
	let interval = null;
	useEffect(() => {
		interval = setInterval(() => {
			fetchGame();
		}, 3000);
	});

//Peut être mettre IdGame dans url avec credential et player ID
/*

<Route path="/tickets/:id" component={Tickets} />
this.props.history.push(`/tickets/${rowIndex[0]}`);
console.log(this.props.match.params.id)

  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;

*/
	const game = useLocation().state.data;
	const history = useHistory();
	console.log(game);
	const ClientFilRouge = Client({
		game: TicTacToe,
		board: TicTacToeBoard,
		multiplayer: SocketIO({ server: `${configGame.httpORs}://${configGame.urlServer}` }),
		debug: false
	});

	const fetchGame = () => {
		fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/${game.idGame}`)
			.then(response => response.json())
			.then((data) => {
				console.log(data)
				let show = true;

				data.players.forEach((play) => {
					if (play.name === undefined) {
						show = false;
					}
				});
				setDisplayGame(show)
			});
	}

	const showGame = () => {
		return ( <
			ClientFilRouge matchID = { game.idGame } playerID = { game.playerID.toString() } credentials = { game.playerCredentials }
			/>
		)
	}
	const showLobby = () => {
		return ( <
			div >

			Pas encore assez de joueur

			<
			/div>
		)
	}
	/*const ClientFilRouge = Client({
		game: TicTacToe,
		board: TicTacToeBoard,
		debug: false
	});*/

	let i = 2;
	if (displayGame) {
		clearInterval(interval);
		return showGame();
	} else {
		fetchGame();
		return showLobby();
	}
}
export default Child;