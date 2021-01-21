import React, { Component } from 'react';

class JoinLobbyComponent extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      name: '',
      number: ''
    }
  }

  joinLobby = () =>{}

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
      <div className='text-center col-lg-5 mx-auto' >
        <img width='300' className='mt-3' src='img/logo-fil-rouge.png' alt= ''/> 
        <h2 className="text-center">Rejoindre un Lobby</h2>
        <form className="form-signup col-10 mx-auto" >
          <div className="form-group">
            <label>N° du lobby</label>
            <input type="text" name="name" className="form-control" placeholder="Veuillez saisir le code du Lobby" value={this.state.name} onChange={this.saveNameHandler} />
          </div>
          <div className="form-group">
            <label>Pseudo</label>
            <input type="text" name="number" className="form-control" placeholder="Veuillez saisir un pseudo" value={this.state.number} onChange={this.saveNumberHandler} />
          </div>
          <button type="submit" className="btn btn-success btn-block" onClick={this.joinLobby}>Rejoindre le Lobby</button>
        </form>
      </div>
    );
  }

}

export default JoinLobbyComponent;