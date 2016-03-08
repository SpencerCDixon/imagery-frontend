import React, { Component, PropTypes } from 'react';

export class HomeView extends Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to Imagery</h1>
      </div>
    );
  }
}

export default HomeView;
