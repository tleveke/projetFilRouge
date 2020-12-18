import React, { Component } from 'react';

class JoinLobbyComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: null,
      number: null
    }
  }

  createLobby = () =>{}

  saveNameHandler = (event) => {
    this.setState({ name: event.target.value });
  }

  saveNumberHandler = (event) => {
    this.setState({ number: event.target.value });
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div className='text-center' >
        <img width='300' className='mt-3' src='img/logo-fil-rouge.jpg' alt= ''/> 
        <h2 className="text-center">Rejoindre un Lobby</h2>
        <form className="form-signup col-10 mx-auto" >
          <div className="form-group">
            <label>Nom du lobby</label>
            <input type="text" name="name" className="form-control" placeholder="Veuillez saisir le code du Lobby" value={this.state.name} onChange={this.saveNameHandler} />
          </div>
          <div className="form-group">
            <label>N° du lobby</label>
            <input type="text" name="number" className="form-control" placeholder="Veuillez saisir un pseudo" value={this.state.number} onChange={this.saveNumberHandler} />
          </div>
          <button type="submit" className="btn btn-success btn-block" onClick={this.createLobby}>Rejoindre le Lobby</button>
        </form>
      </div>
    );
  }

}

export default JoinLobbyComponent;