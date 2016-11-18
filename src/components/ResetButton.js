import classNames from 'classnames';
import React from 'react';

const ResetButton = (props) => {
  const resetIcon = classNames('reset-icon', 'fa', 'fa-3x', {
    'fa-smile-o': !props.gameOver || props.gameOver === 'win',
    'fa-frown-o': props.gameOver === 'lose',
  });
  return (
    <button className="reset-button" onClick={props.reset}>
      <span className="stack">
        <i className="fa fa-circle fa-3x" />
        <i className={resetIcon} />
      </span>
    </button>
  );
};

ResetButton.displayName = 'ResetButton';
ResetButton.propTypes = {
  gameOver: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.string,
  ]).isRequired,
  reset: React.PropTypes.func.isRequired,
};

export default ResetButton;
