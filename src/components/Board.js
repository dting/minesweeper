import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import Row from './Row';

const Board = props => (
  <div className="board">
    {props.board.map((row, i) => (
      <Row row={row} i={i} key={i} />
    ))}
  </div>
);

Board.displayName = 'Board';
Board.propTypes = {
  board: ImmutablePropTypes.list.isRequired,
};

export default Board;
