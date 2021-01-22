import React, { Component } from 'react';
import { configGame } from '../game/config'

class JoinLobbyComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      number: '',
      playerID: '',
      lobbies: []
    }
  }

  joinLobby = (e) =>{
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ playerID: this.state.playerID, playerName: this.state.name })
    };
    fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/${this.state.number}/join`, requestOptions)
        .then(response => response.json())
        .then(data => 
          this.props.history.push('/game', {
            data: data}));
  }

  saveNameHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  saveNumberHandler = (event) => {
    this.setState({ number: event.target.value });
  }

  lobbyShow(lobby) {
    return (<li key={lobby.matchID} className='list-group list-group-item-action bg-danger'><button onClick={()=>this.setState({number:lobby.matchID, playerID: lobby.players.filter(player => (player.name == null))[0].id })}>{lobby.matchID}</button></li>)
  }


  componentDidMount() {
    fetch (`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge`)
    .then(response => response.json())
    .then( (data) => {
      this.setState({lobbies : data.matches});
      console.log(this.state.lobbies[0].players.filter(player => (player.name == null)));
    });
  }

  render() {
    return (
      <div className='text-center col-lg-5 mx-auto' >
        <img width='300' className='mt-3' src='img/logo-fil-rouge.png' alt= ''/> 
        <h2 className="text-center">Rejoindre un Lobby</h2>
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
        <p className='bg-secondary text-left mt-3'>lobby disponible :</p>  
        <ul className='list-group mt-1'>
          {this.state.lobbies.map((element) =>  this.lobbyShow(element))}
        </ul>
      </div>
    );
  }

}

export default JoinLobbyComponent;