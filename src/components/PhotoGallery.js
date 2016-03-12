import React, { Component, PropTypes } from 'react';
import FlipMove from 'react-flip-move';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GalleryCard from 'components/GalleryCard';

const propTypes = {
  photos: PropTypes.array.isRequired,
  view: PropTypes.string.isRequired,
};

export class PhotoGallery extends Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  renderPhotos = () => {
    const { photos, view } = this.props;

    return photos.map(photo => {
      return <GalleryCard key={photo.id} {...photo} view={view} />;
    });
  }

  render() {
    return (
      <div>
        <ul>
          <FlipMove staggerDurationBy="30" duration={500}>
            {this.renderPhotos()}
          </FlipMove>
        </ul>
      </div>
    );
  }
}

PhotoGallery.propTypes = propTypes;
export default PhotoGallery;
