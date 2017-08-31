import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
import GridBeenThere from './components/GridBeenThere';
import GridColors from './components/GridColors';

class App extends Component {
  // Initialize state
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    const appContainerStyle = {
      width: '290px',
      margin: '0 auto'
    };

    return (
      <div className="app-container" style={ appContainerStyle }>
        <h2>Test heading</h2>
        <GridBeenThere />
        <GridColors />
      </div>
    );
  }
}

export default App;
