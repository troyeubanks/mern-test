import _ from 'lodash';
import React, { Component } from 'react';
import { shuffleArray } from '../../lib/ArrayHelpers';

class GridBeenThere extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: {},
      allPreviouslyHere: false,
      reorderCount: 0,
      intervalId: null
    };
  }

  componentDidMount() {
    this.setState({ grid: this.buildGrid() })
  }

  buildGrid() {
    const indices = Array.from(Array(100).keys());
    const grid = {};
    indices.forEach((index) => {
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
          backgroundColor: '#3b3b3b'
        }
      };
    });

    return grid;
  }

  reorderGrid = () => {
    const { grid, reorderCount } = this.state;
    const indices = Array.from(Array(100).keys());
    const shuffledIndices = shuffleArray(indices);
    const newGrid = {};
    let allPreviouslyHere = true;

    indices.forEach((index) => {
      const cell = { ...grid[shuffledIndices[index]] };

      cell.previousPositions.push(index);
      cell.countAtPosition = _.countBy(cell.previousPositions)[index];
      if (allPreviouslyHere && cell.countAtPosition === 1) {
        allPreviouslyHere = false;
      }
      cell.style.backgroundColor = cell.countAtPosition > 1 ? '#e6e6e6' : '#3b3b3b';
      newGrid[index] = cell;
    });

    if (allPreviouslyHere) this.stopAutoReorder();

    this.setState({
      grid: newGrid,
      allPreviouslyHere,
      reorderCount: reorderCount + 1
    });
  }

  resetGrid = () => {
    if (this.state.intervalId) this.stopAutoReorder();

    this.setState({
      grid: this.buildGrid(),
      reorderCount: 0
    });
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
        className: 'reorder-grid-reset',
        onClick: this.resetGrid,
        text: 'Reset Grid'
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

export default GridBeenThere;
