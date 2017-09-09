import _ from 'lodash';
import React, { Component } from 'react';
import wrapGrid from './Grid';
import { shuffleArray } from '../lib/ArrayHelpers';
import Grid from './Grid';

class GridBeenThere extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: props.grid || {},
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
        countAtPosition: 1
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

    const baseStyle = {
      height: '25px',
      width: '25px',
      borderRadius: '3px',
      margin: '0 2px',
      display: 'inline-block'
    };

    indices.forEach((index) => {
      const cell = { ...grid[shuffledIndices[index]] };

      cell.previousPositions.push(index);
      cell.countAtPosition = _.countBy(cell.previousPositions)[index];
      if (allPreviouslyHere && cell.countAtPosition === 1) {
        allPreviouslyHere = false;
      }
      cell.style = { ...baseStyle, backgroundColor: cell.countAtPosition > 1 ? '#e6e6e6' : '#3b3b3b' };
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

  // renderGridCells() {
  //   const { grid } = this.state;
  //
  //   const style = {
  //     height: '25px',
  //     width: '25px',
  //     borderRadius: '3px',
  //     margin: '0 2px',
  //     display: 'inline-block'
  //   };
  //
  //   return _.keys(grid).map((cell, index) => {
  //     // const count = grid[cell].countAtPosition * 64;
  //     // const bgDarkness = count > 255 ? 255 : count;
  //     const count = grid[cell].countAtPosition;
  //     const bgDarkness = count > 1 ? 230 : 25;
  //     const cellStyle = _.extend({}, style, {
  //       backgroundColor: `rgb(${bgDarkness}, ${bgDarkness}, ${bgDarkness})`
  //     });
  //     return (
  //       <div
  //         key={ grid[cell].id }
  //         className="grid-cell"
  //         style={ cellStyle }>
  //       </div>
  //     );
  //   });
  // }

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

  render() {
    console.log('this', this);
    return this.props.renderGrid();
  }
}

export default wrapGrid(GridBeenThere)
