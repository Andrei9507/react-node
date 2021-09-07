import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import './app.css';
import { ApolloProvider } from 'react-apollo'; // inject any data from the server trough this 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <nav className="navbar navbar-light bg-light">
            <ul className="navbar-nav">
              <li className="nav-item active ml-5">
                <Link className="nav-link color-black" to="/projects">Projects</Link>
              </li>
            </ul>
          </nav>
          <div className="container mt-5">
            <Switch>
                  <Route exact path="/projects" component ={ProjectList} />
                  <Route path="/projects/:id"  exact component={ProjectDetails} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    )
  }
}
export default App;
