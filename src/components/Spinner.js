import React, { Component, PropTypes } from 'react';
import Icon from 'components/Icon';

const propTypes = {
  size: PropTypes.string,
  inline: PropTypes.bool,
  spinning: PropTypes.bool,
};

const defaultProps = {
  size: 'fa-5x',
  spinning: true,
  inline: false,
};

class Spinner extends Component {
  render() {
    const { size, inline, spinning } = this.props;

    const styles = {
      display: inline ? 'inline-block' : 'block',
    };

    return (
      <Icon is="cog" size={size} style={styles} spinning={spinning} />
    );
  }
}

Spinner.propTypes = propTypes;
Spinner.defaultProps = defaultProps;
export default Spinner;
