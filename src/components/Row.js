import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import Cell from './Cell';

const Row = ({ row, i }) => (
  <div className="row">
    {row.map((cell, j) => (
      <Cell key={j} cell={cell} i={i} j={j} />
    ))}
  </div>
);

Row.displayName = 'Row';
Row.propTypes = {
  i: React.PropTypes.number.isRequired,
  row: ImmutablePropTypes.list.isRequired,
};

export default Row;
