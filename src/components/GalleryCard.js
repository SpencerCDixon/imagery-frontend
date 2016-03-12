import React, { Component, PropTypes } from 'react';

const propTypes = {
  userHandle: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

class GalleryCard extends Component {
  render() {
    const { userHandle, imageUrl } = this.props;
    return (
      <li>
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
