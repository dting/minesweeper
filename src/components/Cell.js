import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import * as actions from '../modules/actions';

class Cell extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleContext = this.handleContext.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.i, this.props.j);
  }

  handleContext(e) {
    e.preventDefault();
    this.props.handleRightClick(this.props.i, this.props.j);
  }

  render() {
    const { cell } = this.props;
    return (
      <button
        className={classNames(['cell', `s${cell}`])}
        onClick={this.handleClick}
        onContextMenu={this.handleContext}
      >
        {!!cell && <i className={cell} />}
      </button>
    );
  }
}

Cell.displayName = 'Cell';
Cell.propTypes = {
  cell: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]).isRequired,
  handleClick: React.PropTypes.func.isRequired,
  handleRightClick: React.PropTypes.func.isRequired,
  i: React.PropTypes.number.isRequired,
  j: React.PropTypes.number.isRequired,
};

const mapStatetoProps = state => ({
  numCols: state.numCols,
});

const mapDispatchToProps = dispatch => ({
  handleClick: (row, col) => dispatch(actions.handleClick(row, col)),
  handleRightClick: (row, col) => dispatch(actions.handleRightClick(row, col)),
});

export default connect(mapStatetoProps, mapDispatchToProps)(Cell);
