import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import cn from 'classnames';

const propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSet: PropTypes.func.isRequired,
};

class BrandFilter extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  handleClick = () => {
    const { onSet, id } = this.props;
    onSet(id);
  }

  render() {
    const { name, isActive } = this.props;
    return (
      <button className={cn('btn btn-default', {active: isActive})} onClick={this.handleClick}>
        {name}
      </button>
    );
  }
}

BrandFilter.propTypes = propTypes;
export default BrandFilter;
