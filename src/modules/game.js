import { fromJS } from 'immutable';
import { indexFor, locationFor } from './utils';

class Game {
  constructor(numRows = 16, numCols = 30, numMines = 99) {
    this.exposed = 0;
    this.flagged = 0;
    this.gameOver = false;
    this.numCols = numCols;
    this.numMines = numMines;
    this.numRows = numRows;
    this.started = false;
    this.time = 0;
    this.board = this.makeBoard();
  }

  makeBoard() {
    const { numRows, numCols } = this;
    return fromJS(Array.from({ length: numRows }, () => Array(numCols).fill('')));
  }

  /**
   * Start game by completing setup using index as the starting point
   *
   * @param {number} index excluded possible mine position
   */
  startGame(index) {
    this.started = true;
    this.mines = this.randomMineLocations(index);
    this.reference = this.makeReference();
  }

  /**
   * Generate locations for mines (excluding index)
   *
   * @param {number} index excluded possible mine position
   * @return {Array.<number>} numMines random positions in range [0, numCols * numRows)
   */
  randomMineLocations(index) {
    const { numRows, numCols, numMines } = this;
    const size = numRows * numCols;
    const locations = Array.from({ length: size }, (v, i) => i);
    locations.splice(index, 1); // Remove index from possible positions
    for (let i = size - 1; i > size - numMines; i -= 1) {
      const j = Math.floor(Math.random() * i);
      [locations[i - 1], locations[j]] = [locations[j], locations[i - 1]];
    }
    return fromJS(locations.slice(-numMines));
  }

  /**
   * Create the reference board with mine positions and counts
   */
  makeReference() {
    const { numRows, numCols } = this;
    const reference = Array(numRows * numCols).fill(0);
    this.mines.forEach((mine) => {
      reference[mine] = 'm';
      this.getNeighbors(mine).forEach((neighbor) => {
        if (reference[neighbor] !== 'm') {
          reference[neighbor] += 1;
        }
      });
    });
    return fromJS(reference);
  }

  toggleFlag(location) {
    if (!this.gameOver && this.started) {
      if (this.board.getIn(location) === 'f') {
        this.board = this.board.setIn(location, '');
        this.flagged -= 1;
      } else if (this.board.getIn(location) === '') {
        this.board = this.board.setIn(location, 'f');
        this.flagged += 1;
      }
    }
    return this;
  }

  handleClick(location) {
    const { numRows, numCols, numMines } = this;
    const index = indexFor(location, numCols);
    if (!this.started && !this.gameOver) {
      this.startGame(index);
    }
    if (!this.gameOver && this.board.getIn(location) === '') {
      switch (this.reference.get(index)) {
        case 'm':
          this.exposeMines();
          this.board = this.board.setIn(location, 'e'); // Order dependent overwrites 'm' with 'e'
          this.gameOver = 'lose';
          break;
        case 0:
          this.exposeNeighbors(index);
          break;
        default:
          this.expose(index);
          break;
      }
    }
    if (this.exposed === (numRows * numCols) - numMines) {
      this.gameOver = 'win';
      this.exposeMines();
    }
    return this;
  }

  expose(index) {
    const { numCols } = this;
    this.board = this.board.setIn(locationFor(index, numCols), this.reference.get(index));
    this.exposed += 1;
  }

  exposeNeighbors(index) {
    const processed = new Set(); // all processed cells
    let queue = [index];
    while (queue.length) {
      const queued = new Set(queue); // cells to be processed
      const next = [];
      for (let i = 0; i < queue.length; i += 1) {
        const current = queue[i];
        processed.add(current);
        this.expose(current);
        if (this.reference.get(current) === 0) {
          this.getNeighbors(current)
            .filter(neighbor => !processed.has(neighbor) && !queued.has(neighbor))
            .forEach((neighbor) => {
              queued.add(neighbor);
              next.push(neighbor);
            });
        }
      }
      queue = next;
    }
  }

  exposeMines() {
    this.mines.forEach(mine => this.expose(mine));
  }

  getNeighbors(index) {
    const { numRows, numCols } = this;
    const [row, col] = locationFor(index, numCols);
    const neighbors = [];
    if (row > 0 && col > 0) {
      neighbors.push(index - numCols - 1);
    }
    if (row > 0) {
      neighbors.push(index - numCols);
    }
    if (row > 0 && col < numCols - 1) {
      neighbors.push((index - numCols) + 1);
    }
    if (col > 0) {
      neighbors.push(index - 1);
    }
    if (col < numCols - 1) {
      neighbors.push(index + 1);
    }
    if (row < numRows - 1 && col > 0) {
      neighbors.push((index + numCols) - 1);
    }
    if (row < numRows - 1) {
      neighbors.push(index + numCols);
    }
    if (row < numRows - 1 && col < numCols - 1) {
      neighbors.push(index + numCols + 1);
    }
    return neighbors;
  }

  setMines(value) {
    if (!this.started && !this.gameOver) {
      this.numMines = value;
    }
  }

  setRows(value) {
    if (!this.started && !this.gameOver) {
      this.numRows = value;
      this.board = this.makeBoard();
    }
  }

  setCols(value) {
    if (!this.started && !this.gameOver) {
      this.numCols = value;
      this.board = this.makeBoard();
    }
  }

  tick() {
    if (!this.gameOver && this.started) {
      this.time += 1;
    }
    return this;
  }
}

export default Game;
