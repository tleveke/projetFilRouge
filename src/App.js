import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import NewLobbyComponent from './vues/NewLobbyComponent';
import JoinLobbyComponent from './vues/JoinLobbyComponent';

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/create-lobby">Créer un Lobby</Link>
          </li>
          <li>
            <Link to="/rejoindre-lobby">Rejoindre un Lobby</Link>
          </li>
          <li>
            <Link to="/game">Le Jeu</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/create-lobby">
            <NewLobbyComponent />
          </Route>
          <Route path="/rejoindre-lobby">
            <JoinLobbyComponent />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Accueil dev</h2>
      {/* Ici on a un bouton pour rejoindre aléatoirement un lobby */}




      {/* Ici on a une liste de tous les lobbys pour rejoindre un lobby en cliquant dessus*/}
    </div>
  )
}


