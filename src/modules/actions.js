import * as types from './constants';

export const tick = function tick() {
  return {
    type: types.TICK,
  };
};

export const handleClick = function handleClick(row, col) {
  return {
    type: types.CLICK,
    payload: [row, col],
  };
};

export const handleRightClick = function handleRightClick(row, col) {
  return {
    type: types.RIGHT_CLICK,
    payload: [row, col],
  };
};

export const setMines = function setMines(value) {
  return {
    type: types.SET_MINES,
    payload: value,
  };
};

export const setRows = function setRows(value) {
  return {
    type: types.SET_ROWS,
    payload: value,
  };
};

export const setCols = function setCols(value) {
  return {
    type: types.SET_COLS,
    payload: value,
  };
};

export const reset = function reset() {
  return {
    type: types.RESET,
  };
};
