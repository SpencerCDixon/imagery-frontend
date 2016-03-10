import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as brandActions } from 'redux/modules/brands';
import BrandFilters from 'components/BrandFilters';

const propTypes = {
  brands: PropTypes.array.isRequired,
  selectedBrand: PropTypes.string,

  // Action Creators
  fetchBrands: PropTypes.func.isRequired,
  setBrandFilter: PropTypes.func.isRequired,
};

class HomeView extends Component {
  componentDidMount() {
    this.props.fetchBrands();
  }

  render() {
    const { brands, selectedBrand, setBrandFilter } = this.props;

    return (
      <div className="container">
        <h1>Imagery</h1>
        <BrandFilters
          brands={brands}
          selectedBrand={selectedBrand}
          setBrandFilter={setBrandFilter}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.items,
    selectedBrand: state.brands.selectedBrand,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...brandActions,
    }, dispatch),
  };
};

HomeView.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);

