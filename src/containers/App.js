import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';

import * as actions from '../modules/actions';
import Board from '../components/Board';
import ResetButton from '../components/ResetButton';
import Settings from './Settings';

class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.timer = setInterval(props.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    delete this.timer;
  }

  render() {
    const { board, numMines, flagged, time, gameOver, reset } = this.props;
    return (
      <div className="app">
        <Settings />
        <div className="game">
          <div className="header">
            <div className="flagCountdown">
              {`000${numMines - flagged}`.slice(-3)}
            </div>
            <div className="spacer" />
            <ResetButton gameOver={gameOver} reset={reset} />
            <div className="spacer" />
            <div className="timer">
              {time < 1000 ? `00${time}`.slice(-3) : '999'}
            </div>
          </div>
          <Board board={board} />
        </div>
      </div>
    );
  }
}

App.displayName = 'App';
App.propTypes = {
  board: ImmutablePropTypes.list.isRequired,
  gameOver: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]).isRequired,
  flagged: React.PropTypes.number.isRequired,
  numMines: React.PropTypes.number.isRequired,
  reset: React.PropTypes.func.isRequired,
  time: React.PropTypes.number.isRequired,
  tick: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  board: state.board,
  gameOver: state.gameOver,
  numMines: state.numMines,
  flagged: state.flagged,
  time: state.time,
});

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch(actions.reset()),
  tick: () => dispatch(actions.tick()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
