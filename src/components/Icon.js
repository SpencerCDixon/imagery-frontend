import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

const propTypes = {
  is: PropTypes.string.isRequired,
  size: PropTypes.string,
  style: PropTypes.object,
  spinning: PropTypes.bool,
};

const styles = {
  marginRight: '5px',
  marginLeft: '5px',
};

const defaultProps = {
  size: 'fa-lg',
  spinning: false,
};

class Icon extends Component {
  render() {
    const { is, size, style, spinning, ...rest } = this.props;
    const finalStyles = {...styles, ...style};
    return (
      <i
        className={cn(`fa fa-${is} ${size}`, {'fa-spin': spinning})}
        style={finalStyles}
        {...rest}
      />
    );
  }
}

Icon.propTypes = propTypes;
Icon.defaultProps = defaultProps;
export default Icon;
