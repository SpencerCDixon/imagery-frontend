import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as brandActions } from 'redux/modules/brands';
import { actions as photoActions } from 'redux/modules/photos';

import BrandFilters from 'components/BrandFilters';
import Spinner from 'components/Spinner';
import PhotoGallery from 'components/PhotoGallery';
import Toggle from 'components/Toggle';

const propTypes = {
  globalFetch: PropTypes.bool.isRequired,
  brands: PropTypes.array.isRequired,
  photos: PropTypes.array.isRequired,
  selectedBrand: PropTypes.string,
  photoView: PropTypes.string.isRequired,

  // Brand Action Creators
  fetchBrands: PropTypes.func.isRequired,
  setBrandFilter: PropTypes.func.isRequired,

  // Photo Action Creators
  fetchPhotos: PropTypes.func.isRequired,
  shufflePhotos: PropTypes.func.isRequired,
  changePhotoView: PropTypes.func.isRequired,
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

  handleListView = () => {
    this.props.changePhotoView('list');
  }

  handleGridView = () => {
    this.props.changePhotoView('grid');
  }

  render() {
    const {
      brands,
      photos,
      selectedBrand,
      setBrandFilter,
      globalFetch,
      shufflePhotos,
      photoView,
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
          <div className="col-md-6">
            <BrandFilters
              brands={brands}
              selectedBrand={selectedBrand}
              setBrandFilter={setBrandFilter}
            />
          </div>
          <div className="col-md-6">
            <div className="btn-toolbar">
              <Toggle
                handleClick={shufflePhotos}
                text="Shuffle"
                icon="random"
              />
              <div className="btn-group">
                <Toggle
                  handleClick={this.handleListView}
                  text="List"
                  icon="list"
                  isActive={photoView === 'list'}
                />
                <Toggle
                  handleClick={this.handleGridView}
                  text="Grid"
                  icon="th"
                  isActive={photoView === 'grid'}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <PhotoGallery photos={photos} view={photoView} />
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
    photoView: state.photos.view,
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

