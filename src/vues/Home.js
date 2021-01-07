import React, {Component} from 'react';

class Home extends Component {
    lobbyShow(lobby) {
    return (<li key={lobby.id} className='list-group list-group-item-action bg-danger'>{lobby.name}</li>)
    }
    render(lobbyList = [{id:1, name:'Lobby1'}, {id:2, name: 'Lobby2'}, {id:3, name: 'Lobby3'}]) {
        return (
            <div className='text-center'>
              <img width='300' className='mt-3' src="img/logo-fil-rouge.jpg" alt=''/>
              <div>
                <button className='btn btn-success mt-3'>Créer un lobby</button>
              </div>
              <div>
                <button className='btn btn-primary mt-3'>Rejoindre un lobby</button>
              </div>
            <p className='bg-secondary text-left mt-3'>lobby disponible :</p>  
            <ul className='list-group mt-1'>
            
                {lobbyList.map((element) => this.lobbyShow(element))}
            
            </ul>
            
              {/* Ici on a une liste de tous les lobbys pour rejoindre un lobby en cliquant dessus*/}
            </div>
          )
    }
  }
export default Home;