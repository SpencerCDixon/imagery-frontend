import React from 'react';
import PhotoGallery from 'components/PhotoGallery'
import GalleryCard from 'components/GalleryCard';

const renderComp = createFactory(PhotoGallery, {
  photos: [],
  view: 'list',
});

describe('(Component) PhotoGallery', () => {
  const wrapper = renderComp({
    photos: [
      {id: 1, userHandle: 'spencercdixon', imageUrl: 'someurl'},
      {id: 2, userHandle: 'reactjsnews', imageUrl: 'someurl'},
    ]
  });

  it('renders a GalleryCard for each photo', function() {
    expect(wrapper.find(GalleryCard)).to.have.length(2);
  });
})
