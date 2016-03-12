import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import ImageMatch from 'components/ImageMatch';

const propTypes = {
  userHandle: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  imageUrl: PropTypes.string.isRequired,
  view: PropTypes.string.isRequired,
  imageWidth: PropTypes.number.isRequired,
  imageHeight: PropTypes.number.isRequired,
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
  shouldComponentUpdate = shouldPureComponentUpdate;

  render() {
    const {
      userHandle,
      imageUrl,
      view,
      matches,
      imageWidth,
      imageHeight,
    } = this.props;

    const finalStyles = Object.assign(
      {},
      styles.base,
      view === 'list' && styles.list,
      view === 'grid' && styles.grid,
    );
    return (
      <li style={finalStyles}>
        <div className="thumbnail">
          <ImageMatch
            src={imageUrl}
            matches={matches}
            originalHeight={imageHeight}
            originalWidth={imageWidth}
          />
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
