import Game from './game';
import * as types from './constants';

let game = new Game();
const initialState = {
  ...game,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CLICK:
      return {
        ...state,
        ...game.handleClick(action.payload),
      };
    case types.RIGHT_CLICK:
      return {
        ...state,
        ...game.toggleFlag(action.payload),
      };
    case types.TICK:
      return {
        ...state,
        ...game.tick(),
      };
    case types.SET_MINES:
      return {
        ...state,
        ...game.setMines(action.payload),
      };
    case types.SET_ROWS:
      return {
        ...state,
        ...game.setRows(action.payload),
      };
    case types.SET_COLS:
      return {
        ...state,
        ...game.setCols(action.payload),
      };
    case types.RESET:
      game = new Game(state.numRows, state.numCols, state.numMines);
      return {
        ...game,
      };
    default:
      return state;
  }
};
