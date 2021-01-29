import { Client, Lobby } from 'boardgame.io/react'
import { TicTacToe } from './Game'
import { TicTacToeBoard } from './Board'
import { configGame } from './config'
import React, { Component, useState, useEffect } from 'react';
import { SocketIO } from 'boardgame.io/multiplayer'
import ReactDOM from 'react-dom';
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';




const Child = () => {

  const [displayGame, setDisplayGame] = useState(false);
  let interval = null;
  useEffect(() => {
	if (navigator.onLine) {
		interval = setInterval(() => {
		  fetchGame();
		}, 3000);
	}
  });
  
  const params = useParams();
  const history = useHistory();
  console.log(params, params, params)
  const ClientFilRouge = Client({
	game: TicTacToe,
	board: TicTacToeBoard,
	multiplayer: SocketIO({ server: `${configGame.httpORs}://${configGame.urlServer}` }),
	debug: false
  });
  const fetchLeave = () => {

	const jsonRequest = { playerID: params.playerID, credentials: params.crendentials }
	const requestOptions = {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  body: JSON.stringify(jsonRequest)
	};

	fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/${params.matchID}/leave`, requestOptions)
	  .then(response => response.json())
	  .then((data) => {
		  
		if (window.indexedDB) {
			
			let db;
			let request = indexedDB.open(configGame.dbName);
		
			request.onerror = function(event) {
				console.log("error: ", event);
			};
		
			request.onsuccess = function(event) {
				db = request.result;
				
				const objectStore = db.transaction("matches", "readwrite").objectStore("matches");
				const objectStoreRequest = objectStore.delete(`${params.matchID}`);
				  
				objectStoreRequest.onsuccess = function(event) {
					console.log("Lobby supprimé")
				};
				
			}.bind(this);
		}
		  
		  
		history.push(`/`);
	  });
  }
  const ButtonLeave = <Button id="passTour" variant="secondary" onClick={() => { fetchLeave() }}> Quittons cette partie </Button>

  const fetchGame = () => {
	fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/${params.matchID}`)
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
	return (
	  <div>
		<ClientFilRouge matchID={params.matchID} playerID={params.playerID.toString()} credentials={params.crendentials} />
		{ButtonLeave}
	  </div>
	)
  }
  const showLobby = () => {
	return (
	  <div>
		Pas encore assez de joueur
		{ ButtonLeave}
	  </div>
	)
  }
  /*const ClientFilRouge = Client({
		game: TicTacToe,
	board: TicTacToeBoard,
	debug: false
  });*/

  if (navigator.onLine) {
		if (displayGame) {
		  clearInterval(interval);
		  return showGame();
		} else {
		  fetchGame();
		  return showLobby();
		}
  }
  else {
	  return (
		  <p> Pas de connection, impossible de jouer en ligne ! </p>
	  )
  }
}
export default Child;