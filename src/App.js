import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import GameFilRouge from './game/index'
import Multiplayer from './game/multiplayer'

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
          <li>
            <Link to="/multiplayer">Multiplayer</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/create-lobby">
            <About />
          </Route>
          <Route path="/rejoindre-lobby">
            <Topics />
          </Route>
          <Route path="/game">
            <GameFilRouge />
          </Route>
          <Route path="/multiplayer">
            <Multiplayer />
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

function About() {
  return <h2>About</h2>;
}

function Topics() {
  let match = useRouteMatch();

  return (
    <div>
      <h2>Topics</h2>

      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>
            Props v. State
          </Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  );
}

function Topic() {
  let { topicId } = useParams();
  return <h3>Requested topic ID: {topicId}</h3>;
}