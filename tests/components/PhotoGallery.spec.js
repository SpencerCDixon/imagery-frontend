import React from 'react';
import FlipMove from 'react-flip-move';
import PhotoGallery from 'components/PhotoGallery'
import GalleryCard from 'components/GalleryCard';

const renderComp = createFactory(PhotoGallery, {
  photos: [],
  view: 'list',
});

describe('(Component) PhotoGallery', () => {
  const wrapper = renderComp({
    photos: [
      {id: 1, userHandle: 'spencercdixon', imageUrl: 'someurl', imageWidth: 100, imageHeight: 100, matches: []},
      {id: 2, userHandle: 'reactjsnews', imageUrl: 'someurl', imageWidth: 100, imageHeight: 100, matches: []},
    ]
  });

  it('renders a GalleryCard for each photo', function() {
    expect(wrapper.find(GalleryCard)).to.have.length(2);
  });

  it('uses FlipMove to make cards interactive', function() {
    expect(wrapper.find(FlipMove)).to.exist;
  });
})
