import _ from 'lodash';
import React, { Component } from 'react';
import './App.css';
// import GridBeenThere from './components/GridBeenThere';
// import GridColors from './components/GridColors';
import GridWeirdo from './components/GridWeirdo';

class App extends Component {
  // Initialize state
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    const appContainerStyle = {
      width: '480px',
      margin: '40px auto'
    };

    return (
      <div className="app-container" style={ appContainerStyle }>
        <h2>Test heading</h2>
        <GridWeirdo />
      </div>
    );
  }
}

export default App;
