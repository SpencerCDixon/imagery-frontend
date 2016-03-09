import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchBrands } from 'redux/modules/brands';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class HomeView extends Component {
  componentDidMount() {
    this.props.dispatch(fetchBrands());
  }

  render() {
    return (
      <div>
        <h1>Imagery</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    brands: state.brands.items,
  };
};

HomeView.propTypes = propTypes;
export default connect(
  mapStateToProps,
)(HomeView);

