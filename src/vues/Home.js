import React, {Component} from 'react';


class Home extends Component {
  constructor (props){
    super (props)
    this.state= { 
      matches:[],
    }
  }

  getMyLobbies = async () => { 
    /*const dbName = "game_db";
    let db, result
    let request = indexedDB.open(dbName)
    request.onsuccess  = await function (event) {
      db = event.target.result;
      request= db.transaction(["matches"]).objectStore("matches").getAll();
      request.onsuccess = function (event){
        result= event.target.result
        return result
      }
      console.log(result);
    }*/
  }

  continue = (match)=>{
    this.props.history.push(`/game/${match.matchId}/${match.credentials}/${match.playerID}`)
  }

  lobbyShow(lobby) {
  return (<li key={lobby.id} className='list-group list-group-item-action bg-danger'>{lobby.name}</li>)
  //return (<li key={lobby.matchID} className='list-group list-group-item-action bg-danger'><button onClick={()=>this.setState({number:lobby.matchID, playerID: lobby.players.filter(player => (player.name == null))[0]?.id })}>{lobby.matchID}</button></li>)
  }

  async componentDidMount(){
    /*let result = await this.getMyLobbies();
    setTimeout(() => {
      console.log(result);
    }, '5000');
    
    /*let all = await this.getMyLobbies()
    all.onsuccess = await function(event) {
      result = event.target.result;
      console.log( result)
    };
    await this.setState({matches: result})
    
    console.log(this.state.matches);*/
  }
    
  render(lobbyList = [{id:1, name:'Lobby1'}, {id:2, name: 'Lobby2'}, {id:3, name: 'Lobby3'}]) {
      return (
        <div className='text-center col-lg-5 mx-auto'>
          <img width='300' className='mt-3' src="img/logo-fil-rouge.png" alt=''/>
          <div>
            <button className='btn btn-success mt-3'>Créer un lobby</button>
          </div>
          <div>
            <button className='btn btn-primary mt-3'>Rejoindre un lobby</button>
          </div>
          <div className="bg-secondary mt-3">
            <p className='text-left pl-3'>Vos jeux en cours :</p>  
          </div> 
        <ul className='list-group mt-1'>
        
            {lobbyList.map((element) => this.lobbyShow(element))}
        
        </ul>
        
          {/* Ici on a une liste de tous les lobbys pour rejoindre un lobby en cliquant dessus*/}
        </div>
      )
  }
  }
export default Home;