import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import BrandFilter from 'components/BrandFilter';

const propTypes = {
  brands: PropTypes.array.isRequired,
  selectedBrand: PropTypes.string,
  setBrandFilter: PropTypes.func.isRequired,
};

class BrandFilters extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  handleBrandReset = () => {
    this.props.setBrandFilter('none');
  }

  handleBrandSelection = (id) => {
    this.props.setBrandFilter(id);
  }

  renderBrands = () => {
    const { brands, selectedBrand } = this.props;

    return brands.map(brand => {
      const isActive = brand.id === selectedBrand;
      return (
        <BrandFilter
          key={brand.id}
          {...brand}
          isActive={isActive}
          onSet={this.handleBrandSelection}
        />
      );
    });
  }

  render() {
    const { selectedBrand } = this.props;
    return (
      <div className="btn-group">
        <BrandFilter
          id="all"
          name="All"
          onSet={this.handleBrandReset}
          isActive={selectedBrand === 'none'}
        />
        {this.renderBrands()}
      </div>
    );
  }
}

BrandFilters.propTypes = propTypes;
export default BrandFilters;
