import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import Icon from 'components/Icon';

const propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

const defaultProps = {
  isActive: false,
};

class Toggle extends Component {
  render() {
    const { text, icon, handleClick, isActive } = this.props;
    const classes = cn('btn btn-default', {active: isActive});

    return (
      <button className={classes} onClick={handleClick}>
        <Icon is={icon} size="fa-fw" />
        {text}
      </button>
    );
  }
}

Toggle.propTypes = propTypes;
Toggle.defaultProps = defaultProps;
export default Toggle;
