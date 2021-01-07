import React from "react";
import Home from "./vues/Home";
import { 
  Nav,
  Navbar,
 } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default function App() {
  return (
    <Router >
    <Menu/>
      <div className='container'>
        <Switch>
          <Route path="/create-lobby">
            <About />
          </Route>
          <Route path="/rejoindre-lobby">
            <Topics />
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
  <Navbar.Brand href="#home">Fil Rouge</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Créer un Lobby</Nav.Link>
      <Nav.Link href="#link">Rejoindre un Lobby</Nav.Link>
      <Nav.Link href="#link">Le Jeu</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
  );
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