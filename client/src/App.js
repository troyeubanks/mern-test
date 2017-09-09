import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';

import { Route } from 'react-router-dom';
import Home from './components/Home';
import GridBeenThere from './components/Grids/GridBeenThere';
import GridColors from './components/Grids/GridColors';
import GridWeirdo from './components/Grids/GridWeirdo';


class App extends Component {
  // Initialize state
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    return (
      <div id="app-container">
        <Route exact path="/" component={ Home } />
        <Route exact path="/frequency" component={ GridBeenThere } />
        <Route exact path="/colors" component={ GridColors } />
        <Route exact path="/weirdo" component={ GridWeirdo } />
      </div>
    );
  }
}

export default App;
