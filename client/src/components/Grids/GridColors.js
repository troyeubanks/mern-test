import _ from 'lodash';
import React, { Component } from 'react';
import '../../styles/grid.css';

class GridColors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: {},
      colorNodes: {
        r: Math.round(Math.random() * 99),
        g: Math.round(Math.random() * 99),
        b: Math.round(Math.random() * 99)
      },
      intervalId: null,
      intensityCallback: this.logIntensityCallback
    };
  }

  componentDidMount() {
    this.setState({ grid: this.buildGrid() })
  }

  getCoordinatesFromIndex(index) {
    return {
      x: index % 10,
      y: Math.floor(index / 10)
    };
  }

  getDistanceBetween(i1, i2) {
    const pos1 = this.getCoordinatesFromIndex(i1);
    const pos2 = this.getCoordinatesFromIndex(i2);
    return Math.sqrt(Math.pow(pos2.x - pos1.x, 2) + Math.pow(pos2.y - pos1.y, 2));
  }

  mapDistanceToColorNodes(index) {
    return {
      r: this.getDistanceBetween(this.state.colorNodes.r, index),
      g: this.getDistanceBetween(this.state.colorNodes.g, index),
      b: this.getDistanceBetween(this.state.colorNodes.b, index)
    };
  }

  // Need a buildGrid thing for setting the grid up initially, but actually
  // need a renderGrid function that handles rendering based on the state
  // of the colorNodes
  getCellColor(colorDistance) {
    let primaryNode = { r: 0, g: 0, b: 0 };
    let primaryKey = '';
    let adjustedIntensity = _.mapValues(colorDistance, (dist, key) => {
      if (!dist) primaryKey = key;
      return Math.floor(this.state.intensityCallback(dist));
    });

    if (primaryKey) {
      adjustedIntensity = primaryNode;
      primaryNode[primaryKey] = 255;
    }

    return `rgb(${adjustedIntensity.r}, ${adjustedIntensity.g}, ${adjustedIntensity.b})`;
  }

  logIntensityCallback(dist) {
    const result = Math.round(255 * Math.log10(dist ? dist : 10));
    return result > 255 ? 255 : result;
  }

  linearIntensityCallback(dist) {
    // TODO Make the factor an input or something
    return (255 - 17 * dist);
  }

  buildGrid() {
    const indices = Array.from(Array(100).keys());
    const grid = this.state.grid || {};

    indices.forEach((index) => {
      const colorDist = this.mapDistanceToColorNodes(index);
      // let bg = `rgb(${255 - (17 * colorDist.r)}, ${255 - (17 * colorDist.g)}, ${255 - (17 * colorDist.b)})`
      const bg = this.getCellColor(colorDist);

      // if (index === this.state.colorNodes.r) {
      //   bg = 'rgb(255, 0, 0)';
      // }
      // if (index === this.state.colorNodes.g) {
      //   bg = 'rgb(0, 255, 0)';
      // }
      // if (index === this.state.colorNodes.b) {
      //   bg = 'rgb(0, 0, 255)';
      // }

      grid[index] = {
        id: index,
        previousPositions: [index],
        countAtPosition: 1,
        style: {
          height: '25px',
          width: '25px',
          borderRadius: '3px',
          margin: '0 2px',
          display: 'inline-block',
          backgroundColor: bg,
          textAlign: 'center'
        }
      };
    });

    return grid;
  }

  reorderGrid = () => {
    const colors = {
      r: Math.floor(Math.random() * 100),
      g: Math.floor(Math.random() * 100),
      b: Math.floor(Math.random() * 100)
    };

    this.setState({
      colorNodes: colors
    });

    this.buildGrid();
  }

  startAutoReorder = () => {
    if (!this.state.intervalId) {
      const intervalId = setInterval(this.reorderGrid, 100);
      this.setState({ intervalId });
    }
  }

  stopAutoReorder = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  }

  getGridControls() {
    return [
      {
        className: 'reorder-grid-once',
        onClick: this.reorderGrid,
        text: 'Reorder Grid'
      }
      // {
      //   className: 'reorder-grid-auto',
      //   onClick: this.startAutoReorder,
      //   text: 'Start Auto Reorder'
      // },
      // {
      //   className: 'reorder-grid-stop',
      //   onClick: this.stopAutoReorder,
      //   text: 'Stop Auto Reorder'
      // }
    ];
  }

  renderGridCells() {
    const { grid } = this.state;

    return _.keys(grid).map((cell, index) => {
      return (
        <div
          key={ grid[cell].id }
          className="grid-cell"
          style={ grid[cell].style }>
        </div>
      );
    });
  }

  renderGridControls() {
    var controls = this.getGridControls();
    return (
      <div className="grid-control-container">
        {
          controls.map((control, index) => {
            return (
              <button
                key={ index }
                className={ control.className }
                onClick={ control.onClick }
              >
                { control.text }
              </button>
            );
          })
        }
        <label htmlFor="log">
          <input type="radio" name="algorithm" id="log" onClick={ () => this.setState({ intensityCallback: this.logIntensityCallback })} />
          Logarithmic
        </label>
        <label htmlFor="linear">
          <input type="radio" name="algorithm" id="linear" onClick={ () => this.setState({ intensityCallback: this.linearIntensityCallback })} />
          Linear
        </label>
      </div>
    );
  }

  render() {
    return (
      <div className="grid-container">
        <h2>Grid</h2>
        { this.renderGridCells() }
        { this.renderGridControls() }
      </div>
    );
  }
}

export default GridColors;
