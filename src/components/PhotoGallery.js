import React, { Component, PropTypes } from 'react';
import GalleryCard from 'components/GalleryCard';

const propTypes = {
  photos: PropTypes.array.isRequired,
};

export class PhotoGallery extends Component {
  renderPhotos = () => {
    return this.props.photos.map((photo) => {
      return <GalleryCard key={photo.id} {...photo} />;
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderPhotos()}
        </ul>
      </div>
    );
  }
}

PhotoGallery.propTypes = propTypes;
export default PhotoGallery;

