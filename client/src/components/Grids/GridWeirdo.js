import _ from 'lodash';
import React, { Component } from 'react';

class GridWeirdo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: {},
      frame: 0,
      intervalId: null,
      count: 0
    };
  }

  componentDidMount() {
    this.setState({ grid: this.buildGrid() });
  }

  buildGrid() {
    const indices = Array.from(Array(400).keys());
    const grid = this.state.grid || {};
    const markedIndices = this.getMarkedIndices();

    indices.forEach((index) => {
      const bg = markedIndices.indexOf(index) > -1 ? '#3b3b3b' : '#e6e6e6';

      grid[index] = {
        id: index,
        previousPositions: [index],
        countAtPosition: 1,
        style: {
          height: '20px',
          width: '20px',
          borderRadius: '3px',
          margin: '0px 2px',
          display: 'inline-block',
          backgroundColor: bg,
          textAlign: 'center'
        }
      };
    });

    return grid;
  }

  getMarkedIndices() {
    const { frame } = this.state;

    switch (frame) {
      case 0:
        return [
          // Row 0
          32, 33, 34,
          // Row 1
          52, 53, 54, 55,
          // Row 2
          67, 68, 69, 70, 74, 75, 76,
          // Row 3
          88, 89, 90, 91, 92, 95, 96,
          // Row 4
          104, 105, 106, 110, 111, 112, 113, 116, 117,
          // Row 5
          124, 125, 126, 127, 128, 129, 132, 133, 134, 136, 137, 138,
          // Row 6
          146, 147, 148, 149, 150, 151, 153, 154, 155, 156, 157, 158, 159,
          // Row 7
          168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179,
          // Row 8
          189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
          // Row 9
          207, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219,
          // Row 10
          226, 227, 228, 229, 231, 232, 233, 234, 235, 236, 237, 238, 239,
          // Row 11
          246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259,
          // Row 12
          266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279,
          // Row 13
          285, 286, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299,
          // Row 14
          305, 306, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
          // Row 15
          325, 326, 327, 331, 332, 333, 334, 335, 336, 337, 338, 339,
          // Row 16
          346, 347, 348, 351, 352, 353, 354, 355, 356, 357, 358, 359,
          // Row 17
          366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379,
          // Row 18
          387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399
        ];
      case 1:
        return [
          // Row 0
          34, 35, 36, 49, 50,
          // Row 1
          51, 54, 55, 56, 57,
          // Row 2
          69, 70, 71, 72, 76, 77, 78,
          // Row 3
          91, 92, 93, 97, 98,
          // Row 4
          112, 113, 114, 117, 118,
          // Row 5
          125, 126, 127, 128, 133, 134, 136, 137, 138,
          // Row 6
          144, 145, 146, 147, 148, 149, 150, 153, 154, 155, 156, 157, 158,
          // Row 7
          164, 165, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178,
          // Row 8
          189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199,
          // Row 9
          210, 211, 212, 213, 214, 215, 216, 217, 218, 219,
          // Row 10
          227, 228, 229, 231, 232, 233, 234, 235, 236, 237, 238, 239,
          // Row 11
          247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259,
          // Row 12
          266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279,
          // Row 13
          286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299,
          // Row 14
          306, 307, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319,
          // Row 15
          326, 327, 331, 332, 333, 334, 335, 336, 337, 338, 339,
          // Row 16
          346, 347, 348, 351, 352, 353, 354, 355, 356, 357, 358, 359,
          // Row 17
          366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379,
          // Row 18
          387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399
        ];
      case 2:
        return [
          // Row 2
          69, 70,
          // Row 3
          89, 90,
          // Row 4
          109, 110,
          // Row 5
          129, 130,
          // Row 6
          149, 150,
          // Row 7
          169, 170,
          // Row 8
          189, 190,
          // Row 9
          207, 208, 209, 210, 211, 212, 213, 214,
          // Row 10
          227, 228, 229, 230, 231, 232, 233, 234,
          // Row 11
          246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256,
          // Row 12
          262, 263, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276,
          // Row 13
          282, 283, 284, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296,
          // Row 14
          302, 303, 304, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317,
          // Row 15
          323, 324, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337,
          // Row 16
          343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 356, 357,
          // Row 17
          363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377,
          // Row 18
          384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397
        ];
      default:
        return [];
    }
  }

  stepFrame() {
    const { frame, count } = this.state;
    if (count > 15) {
      this.setState({ frame: 2, count: 0 });
      this.buildGrid();
      this.stopAnimation();
    } else {
      this.setState({ frame: frame ? 0 : 1, count: count+1 });
    }
    this.buildGrid();
  }

  startAnimation = () => {
    if (!this.state.intervalId) {
      const intervalId = setInterval(() => this.stepFrame(), 300);
      this.setState({ intervalId });
    }
  }

  stopAnimation = () => {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
      this.setState({ intervalId: null });
    }
  }

  getGridControls() {
    return [
      {
        className: 'animate-grid-start',
        onClick: this.startAnimation,
        text: 'Start Animation'
      },
      {
        className: 'animate-grid-stop',
        onClick: this.stopAnimation,
        text: 'Stop Animation'
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
        { this.renderGridControls() }
        { this.renderGridCells() }
      </div>
    );
  }
}

export default GridWeirdo;
