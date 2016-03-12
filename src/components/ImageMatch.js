import React, { Component, PropTypes } from 'react';

const propTypes = {
  src: PropTypes.string.isRequired,
  matches: PropTypes.array.isRequired,
  originalHeight: PropTypes.number.isRequired,
  originalWidth: PropTypes.number.isRequired,
};

const styles = {
  base: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },
  matchBase: {
    position: 'absolute',
    border: '2px solid #E53A40',
    borderRadius: '2',
    background: 'rgba(229, 58, 64, .5)',
  },
};

const NEW_WIDTH = 250;

class ImageMatch extends Component {
  calculateWidth(match) {
    const xValues = match.logoRect.map(m => m[0]);
    const maxX = Math.max(...xValues);
    const minX = Math.min(...xValues);
    return (maxX - minX) * NEW_WIDTH / this.props.originalWidth;
  }

  calculateHeight(match) {
    const newHeight = this.calculateAspectRatio();
    const yValues = match.logoRect.map(m => m[1]);
    const maxY = Math.max(...yValues);
    const minY = Math.min(...yValues);
    return (maxY - minY) * newHeight / this.props.originalHeight;
  }

  calculateTop(match) {
    const newHeight = this.calculateAspectRatio();
    return (match.logoRect[0][1] * newHeight) / this.props.originalHeight;
  }

  calculateLeft(match) {
    return (match.logoRect[0][0] * NEW_WIDTH) / this.props.originalWidth;
  }

  calculateAspectRatio = () => {
    const { originalHeight, originalWidth } = this.props;
    return (originalHeight / originalWidth) * NEW_WIDTH;
  }

  renderMatches = () => {
    return this.props.matches.map((match, i) => {
      const height = this.calculateHeight(match);
      const width = this.calculateWidth(match);
      const top = this.calculateTop(match);
      const left = this.calculateLeft(match);

      const finalStyles = {
        ...styles.matchBase,
        height,
        width,
        top,
        left,
      };

      return (
        <div key={i} style={finalStyles} />
      );
    });
  }

  render() {
    return (
      <div style={styles.base}>
        <img src={this.props.src} width={NEW_WIDTH} />
        {this.renderMatches()}
      </div>
    );
  }
}

ImageMatch.propTypes = propTypes;
export default ImageMatch;

