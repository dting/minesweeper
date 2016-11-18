import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import Slider from 'rc-slider';

import * as actions from '../modules/actions';

class Settings extends React.PureComponent {
  constructor(props) {
    super(props);
    const { numMines, numRows, numCols } = props;
    this.state = {
      numMines,
      numRows,
      numCols,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAfterChange = this.handleAfterChange.bind(this);
  }

  componentWillReceiveProps({ numMines, numRows, numCols }) {
    this.setState({
      numMines,
      numRows,
      numCols,
    });
  }

  handleChange(type) {
    return (value) => {
      if (!this.props.started && !this.props.gameOver) {
        this.setState({
          [type]: value,
        });
      }
    };
  }

  handleAfterChange(action, prop) {
    return () => {
      this.props[action](this.state[prop]);
    };
  }

  render() {
    const { numRows, numCols } = this.props;
    return (
      <div className="settings">
        <div className="sliders" style={{ width: numCols * 20 }}>
          <div className="slider-group">
            <div className="cell sm">
              <i className="m" />
            </div>
            <Slider
              className="slider"
              min={5}
              max={(numRows * numCols) - 1}
              value={this.state.numMines}
              onChange={this.handleChange('numMines')}
              onAfterChange={this.handleAfterChange('setMines', 'numMines')}
            />
          </div>
          <div className="slider-group">
            <div className="cell">R</div>
            <Slider
              className="slider"
              value={this.state.numRows}
              min={10}
              max={50}
              onChange={this.handleChange('numRows')}
              onAfterChange={this.handleAfterChange('setRows', 'numRows')}
            />
          </div>
          <div className="slider-group">
            <div className="cell">C</div>
            <Slider
              className="slider"
              value={this.state.numCols}
              min={10}
              max={50}
              onChange={this.handleChange('numCols')}
              onAfterChange={this.handleAfterChange('setCols', 'numCols')}
            />
          </div>
        </div>
      </div>
    );
  }
}

Settings.displayName = 'Settings';
Settings.propTypes = {
  numMines: React.PropTypes.number.isRequired,
  numRows: React.PropTypes.number.isRequired,
  numCols: React.PropTypes.number.isRequired,
  started: React.PropTypes.bool.isRequired,
  gameOver: React.PropTypes.oneOfType([
    React.PropTypes.bool.isRequired,
    React.PropTypes.string.isRequired,
  ]),
};

const mapStateToProps = state => ({
  started: state.started,
  gameOver: state.gameOver,
  numMines: state.numMines,
  numRows: state.numRows,
  numCols: state.numCols,
});

const mapDispatchToProps = dispatch => ({
  setMines: bindActionCreators(actions.setMines, dispatch),
  setRows: bindActionCreators(actions.setRows, dispatch),
  setCols: bindActionCreators(actions.setCols, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
