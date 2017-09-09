import _ from 'lodash';
import React, { Component } from 'react';

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
      intervalId: null
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
    // Basically 7 'units' away should be 50% of 255 (127)
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

  // Need a buildGrid thing for setting the grid up and initially, but actually
  // need a renderGrid function that handles rendering based on the state
  // of the colorNodes

  buildGrid() {
    const indices = Array.from(Array(100).keys());
    const grid = this.state.grid || {};

    indices.forEach((index) => {
      const colorDist = _.mapValues(this.mapDistanceToColorNodes(index), (value) => Math.round(value));
      let bg = `rgb(${255 - (17 * colorDist.r)}, ${255 - (17 * colorDist.g)}, ${255 - (17 * colorDist.b)})`

      if (index === this.state.colorNodes.r) {
        bg = 'rgb(255, 0, 0)';
      }
      if (index === this.state.colorNodes.g) {
        bg = 'rgb(0, 255, 0)';
      }
      if (index === this.state.colorNodes.b) {
        bg = 'rgb(0, 0, 255)';
      }

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
      r: Math.round(Math.random() * 100),
      g: Math.round(Math.random() * 100),
      b: Math.round(Math.random() * 100)
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
      },
      {
        className: 'reorder-grid-auto',
        onClick: this.startAutoReorder,
        text: 'Start Auto Reorder'
      },
      {
        className: 'reorder-grid-stop',
        onClick: this.stopAutoReorder,
        text: 'Stop Auto Reorder'
      }
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
      </div>
    );
  }

  render() {
    return (
      <div className="grid-container">
        <h2>Grid</h2>
        { this.renderGridCells() }
        { this.renderGridControls() }
        Reordered: { this.state.reorderCount } times
      </div>
    );
  }
}

export default GridColors;
