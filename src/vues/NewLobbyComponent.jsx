import React, { Component } from 'react';
import { configGame } from '../game/config';
import { TicTacToe } from '../game/Game';

class NewLobbyComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      number: ''
    }
  }

  createLobby = (e) =>{
    e.preventDefault()
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numPlayers: this.state.number, setupData: {nameGame:this.state.name} })
    };
    fetch(`${configGame.httpORs}://${configGame.urlServer}/games/Jeu_Fil_Rouge/create`, requestOptions)
        .then(response => response.json())
        .then(data => this.setState({name: data.matchID}));
  }

  saveNameHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  saveNumberHandler = (event) => {
    this.setState({ number: event.target.value });
  }
  
  handleNumberChange = (event) => {
    this.setState({ number: event.target.value });
  }

  createSelect = () =>{
    let select = []

    for (let i = TicTacToe.minPlayers; i <= TicTacToe.maxPlayers; i++) {
      select.push(<option key={i} value={i} >{i}</option>);   
    }
    return select;
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='text-center col-lg-5 mx-auto' >
        <img width='300' className='mt-3' src='img/logo-fil-rouge.png' alt= ''/> 
        <h2 className="text-center">Créer un Lobby</h2>
        <form className="form-signup col-10 mx-auto" >
          <div className="form-group">
            <label>Lobby</label>
            <input type="text" name="lobby" className="form-control" placeholder="N° du Lobby" value={this.state.name} onChange={this.saveNameHandler} />
          </div>
          <div className="form-group">
            <label>Nombre de joueurs</label>
            <select className="form-control" value={this.state.number} onChange={this.handleNumberChange}>
                        {
                            this.createSelect()
                        }
                        </select>
          </div>
          <button type="submit" className="btn btn-success btn-block" onClick={this.createLobby}>Créer un Lobby</button>
        </form>
      </div>
    );
  }

}

export default NewLobbyComponent;