import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as brandActions } from 'redux/modules/brands';
import { actions as photoActions } from 'redux/modules/photos';

import BrandFilters from 'components/BrandFilters';
import Spinner from 'components/Spinner';
import PhotoGallery from 'components/PhotoGallery';

const propTypes = {
  globalFetch: PropTypes.bool.isRequired,
  brands: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
  selectedBrand: PropTypes.string,

  // Brand Action Creators
  fetchBrands: PropTypes.func.isRequired,
  setBrandFilter: PropTypes.func.isRequired,

  // Photo Action Creators
  fetchPhotos: PropTypes.func.isRequired,
};

class HomeView extends Component {
  componentDidMount() {
    this.props.fetchBrands();
    this.props.fetchPhotos();
  }

  componentWillReceiveProps(nextProps) {
    const { selectedBrand, fetchPhotos } = this.props;
    if (selectedBrand !== nextProps.selectedBrand) {
      const payload = { brands: nextProps.selectedBrand };
      fetchPhotos(payload);
    }
  }

  render() {
    const {
      brands,
      photos,
      selectedBrand,
      setBrandFilter,
      globalFetch,
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 style={{display: 'inline-block'}}>Imagery</h1>
            {globalFetch && <Spinner size="fa-fw" inline />}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <BrandFilters
              brands={brands}
              selectedBrand={selectedBrand}
              setBrandFilter={setBrandFilter}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <PhotoGallery photos={photos} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.items,
    photos: state.photos.items,
    selectedBrand: state.brands.selectedBrand,
    globalFetch: state.brands.isFetching || state.photos.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({
      ...brandActions,
      ...photoActions,
    }, dispatch),
  };
};

HomeView.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeView);

