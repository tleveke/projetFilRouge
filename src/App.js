import React from "react";
import Home from "./vues/Home";
import NewLobbyComponent from './vues/NewLobbyComponent';
import JoinLobbyComponent from './vues/JoinLobbyComponent';
import GameFilRouge from './game/index'
import ClientFilRouge from './game/client'
import Multiplayer from './game/multiplayer'
import { 
  Nav,
  Navbar,
} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



export default function App() {
  
  return (
    <Router >
      <Menu />
      <div className='container'>
        <Switch>
          <Route path="/create-lobby">
            <NewLobbyComponent />
          </Route>
          <Route path="/join-lobby">
            <JoinLobbyComponent />
          </Route>
          <Route path="/client">
            <ClientFilRouge />
          </Route>
          <Route path="/game">
            <GameFilRouge />
          </Route>
          <Route path="/multiplayer">
            <Multiplayer />
          </Route>
          <Route path="/" component={Home}>
          </Route>
        </Switch>
      </div>

    </Router>
  );
}
function Menu() {
  return (
    <Navbar className="bg-light" expand="lg">
      <Navbar.Brand href="/">Fil Rouge</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/create-lobby">Créer un Lobby</Nav.Link>
          <Nav.Link href="/join-lobby">Rejoindre un Lobby</Nav.Link>
          <Nav.Link href="/game">Le Jeu</Nav.Link>
          <Nav.Link href="/multiplayer">Multiplayer</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

