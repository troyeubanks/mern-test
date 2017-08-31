import _ from 'lodash';
import React, { Component } from 'react';

function wrapGrid(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        grid: props.grid
      };
    }

    componentDidMount() {
      this.setState({ grid: this.props.buildGrid() });
    }

    // buildGrid() {
    //   const indices = Array.from(Array(100).keys());
    //   const grid = {};
    //   indices.forEach((index) => {
    //     grid[index] = {
    //       id: index
    //     };
    //   });
    //
    //   return grid;
    // }

    renderGridControls() {
      if (!(this.props.controls || []).length) {
        return <div></div>;
      }
      return (
        <div className="grid-control-container">
          {
            this.props.controls.map((control) => {
              return (
                <button
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

    renderGrid() {
      return (
        <div className="grid-container">
          <h2>Grid</h2>
          { this.renderGridCells() }
          { this.renderGridControls() }
        </div>
      );
    }

    render() {
      return (
        <WrappedComponent
          grid={ this.state.grid }
          { ...this.props }
        />
      );
    }
  }
}

export default wrapGrid;
