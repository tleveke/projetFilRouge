import React, { Component } from 'react';
import { configGame } from '../game/config';

class Home extends Component {


  constructor(props) {
    super(props)

    this.state = {
      lobbies: [],
      db: null
    }

    this.initDB();

  }

  initDB() {
    if (window.indexedDB) {

      let db;
      let request = indexedDB.open(configGame.dbName);

      request.onerror = function(event) {
        console.log("error: ", event);
      };
      
      request.onupgradeneeded = function(event) {
        db = event.target.result;
        let objectStore = db.createObjectStore("matches", { keyPath: "matchID" });
        objectStore.createIndex("playerID", "playerID", { unique: false });
      };

      request.onsuccess = function(event) {
        db = event.target.result;
        let transaction = db.transaction(["matches"], "readwrite");
        transaction.oncomplete = function(event) {
          console.log("All done!");
          this.setState({ db: request.result });
          this.getLobbies();
        }.bind(this);
      }.bind(this);
    }
  }

  getLobbies() {
    if (window.indexedDB && this.state.db !== null) {
      let tab = [];
        const objectStore = this.state.db.transaction("matches").objectStore("matches");
        objectStore.openCursor().onsuccess = function(event) {
          let cursor = event.target.result;
          if (cursor) {
            tab.push(cursor.value);
            cursor.continue();
          } else {
            console.log("No more entries!");
            this.setState({ lobbies: tab });
          }
        }.bind(this);
    }
  }
  deleteLobby(lobby) {
    if (window.indexedDB && this.state.db !== null) {
      const objectStore = this.state.db.transaction(["matches"], "readwrite").objectStore("matches");
      objectStore.clear();
      this.setState({ lobbies: [] });
  }
}
  goGame(lobby) {
    this.props.history.push(`/client/${lobby.matchID}/${lobby.credentials}/${lobby.playerID}`, {
      data: lobby
    });
  }
  goCreateLobby(lobby) {
    this.props.history.push(`/create-lobby`, {
      data: lobby
    });
  }
  goJoinLobby(lobby) {
    this.props.history.push(`/join-lobby`, {
      data: lobby
    });
  }

  lobbyShow(lobby) {
    return ( <li key = { lobby.matchID } onClick = {
        () => { this.goGame(lobby) } } className = 'list-group list-group-item-action bg-danger' > { lobby.nameLobby } </li>)
    }
    render(lobbyList = this.state.lobbies) {
      console.log(lobbyList);
      return ( <div className = 'text-center col-lg-5 mx-auto'>
        <img width = '300'
        className = 'mt-3'
        src = "img/logo-fil-rouge.png"
        alt = '' />
        <div>
        <button onClick = {
          () => { this.goCreateLobby() } } className = 'btn btn-success mt-3' > Créer un lobby </button> </div >
        <div>
        <button onClick = {
          () => { this.goJoinLobby() } } className = 'btn btn-primary mt-3' > Rejoindre un lobby </button> </div > <p className = 'bg-secondary text-left mt-3' > Rejoignez vos lobbys: </p>   <ul className='list-group mt-1'>

        { lobbyList.map((element) => this.lobbyShow(element)) }

        </ul>
        <div >
        <button onClick = {
          () => { this.deleteLobby() } } className = 'btn btn-success mt-3' > Supprimer vos lobbys en cours </button> </div >

        { /* Ici on a une liste de tous les lobbys pour rejoindre un lobby en cliquant dessus*/ } </div>
      )
    }
  }
  export default Home;