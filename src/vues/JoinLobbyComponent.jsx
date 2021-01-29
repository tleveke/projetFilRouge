import React, { Component,Fragment } from 'react';
import { Route , withRouter} from 'react-router-dom';
import { configGame } from '../game/config';

class JoinLobbyComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      number: '',
      playerID: '',
      credentials: '',
      error:'',
      nameLobby:'',
      lobbies: []
    }
  }
  
  storeGame = (game) => {
    if (window.indexedDB) {
      const gameData = {matchID: game.idGame, playerID: game.playerID, credentials: game.playerCredentials, nameLobby : game.nameLobby};
  
      let db;
      let request = indexedDB.open(configGame.dbName, 1);

      
      request.onupgradeneeded = function(event) {
        db = event.target.result;
        
        let objectStore = db.createObjectStore("matches", { keyPath: "matchID" });
  
  
        objectStore.createIndex("playerID", "playerID", { unique: false });
  
        objectStore.transaction.oncomplete = function(event) {
          // Store values in the newly created objectStore.
          let gameObjectStore = db.transaction("matches", "readwrite").objectStore("matches");
          gameObjectStore.add(gameData);
        };
      };
  
      request.onsuccess = function(event) {
        db = event.target.result;
        let transaction = db.transaction(["matches"], "readwrite");
        transaction.oncomplete = function(event) {

        };
        var objectStore = transaction.objectStore("matches");
          var request = objectStore.add(gameData);
          request.onsuccess = function(event) {
            // event.target.result === customer.ssn;
          };

        };
      
      
    }
    else {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    


  }

  joinLobby = (e) =>{
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerID: this.state.playerID, playerName: this.state.name })
    };

    if (navigator.onLine) {
      fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/${this.state.number}/join`, requestOptions)
          .then(response =>  {
            if (response.status === 200) {
              return response.json()
            }
            else if (response.status === 404) {
              return {error : true,name: 'Lobby inexistant !'};
            }
            else {
              return {error : true,name: 'Lobby complet !'};
            }
          })
          .then(data => {
            
            if (data.error) {
              this.setState({error: data})
            }
            else {
              const game = { playerCredentials : data.playerCredentials, idGame:this.state.number,playerID: this.state.playerID, playerName: this.state.name, nameLobby:this.state.nameLobby  }
              this.storeGame(game)
              
              this.props.history.push(`/client/${this.state.number}/${data.playerCredentials}/${this.state.playerID}`, {
                data: game});
            }
          })
          .catch(function(error) {
            this.setState({error: {error : true,name: 'Pas de connexion à internet !'}})
          }.bind(this));
    }
    else {
      this.setState({error: {error : true,name: 'Pas de connexion à internet !'}})
    }
  }

  saveNameHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  saveNumberHandler = (event) => {
    this.setState({ number: event.target.value });
  }

  lobbyShow(lobby) {
    
    let stringLobby = lobby.matchID;
    if (lobby.setupData.nameGame) {
      stringLobby = lobby.setupData.nameGame;
    }
    
    return (<li key={lobby.matchID} className='list-group list-group-item-action bg-danger'><button onClick={()=>this.setState({nameLobby:stringLobby,number:lobby.matchID, playerID: lobby.players.filter(player => (player.name == null))[0]?.id })}>{stringLobby}</button></li>)
  }
  errorShow(error) {
    let displayError;
    if (error.error) {
      displayError = <p>Erreur pour rejoindre un lobby : {error.name}</p>;
    }
    return displayError;
  }


  componentDidMount() {
    
    if (navigator.onLine) {
      fetch (`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge`)
      .then(response => response.json())
      .then( (data) => {
        this.setState({lobbies : data.matches});

      });
    }
  }

  render() {
    return (
      <div className='text-center col-lg-5 mx-auto' >
        <img width='100%' className='mt-3' src='img/logo-fil-rouge.png' alt= ''/> 
        <h2 className="text-center">Rejoindre un lobby :</h2>
        <form className="form-signup col-10 mx-auto" >
          <div className="form-group">
            <label>Pseudo</label>
            <input type="text" name="name" className="form-control" placeholder="Veuillez saisir un pseudo" value={this.state.name} onChange={this.saveNameHandler} />
          </div>
          <div className="form-group">
            <label>Lobby</label>
            <input type="text" name="number" className="form-control" placeholder="Veuillez saisir le code du Lobby" value={this.state.number} onChange={this.saveNumberHandler} />
          </div>
          <button className="btn btn-success btn-block" onClick={this.joinLobby}>Rejoindre le Lobby</button>
        </form>
        <div className="bg-secondary mt-3">
          <p className='text-left pl-3'>Lobbys disponibles :</p>  
        </div>
        <ul className='list-group mt-1'>
          {this.state.lobbies.map((element) =>  this.lobbyShow(element))}
        </ul>
        {this.errorShow(this.state.error)}
      </div>
    );
  }

}

export default withRouter(JoinLobbyComponent);