import React, { Component, PropTypes } from 'react';

const propTypes = {
  userHandle: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  imageUrl: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
};

const styles = {
  base: {
    listStyle: 'none',
    margin: '6',
    padding: '20',
  },
  list: {
    display: 'block',
  },
  grid: {
    display: 'inline-block',
  },
};

class GalleryCard extends Component {
  render() {
    const { userHandle, imageUrl, view } = this.props;

    const finalStyles = Object.assign(
      {},
      styles.base,
      view === 'list' && styles.list,
      view === 'grid' && styles.grid,
    );
    return (
      <li style={finalStyles}>
        <div className="thumbnail">
          <img src={imageUrl} width="250" height="250" />
          <div className="caption">
            <h3>{userHandle}</h3>
          </div>
        </div>
      </li>
    );
  }
}

GalleryCard.propTypes = propTypes;
export default GalleryCard;
