import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Administrator from './containers/Administrator';
import Gallery from './components/Gallery';
import currentProjects from './components/CurrentProjects';
import About from './components/About';
import Contact from './components/Contact';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Route exact path='/' component={App} />
      <Route exact path='/admin' component={Administrator} />
      <Route exact path='/gallery' component={Gallery} />
      <Route exact path='/currentProjects' component={currentProjects} />
      <Route exact path='/about' component={About} />
      <Route exact path='/contact' component={Contact} />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
