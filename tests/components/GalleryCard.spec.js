import React from 'react';
import GalleryCard from 'components/GalleryCard';

const renderComp = createFactory(GalleryCard, {
  userHandle: '@spencercdixon',
  matches: [],
  imageUrl: 'http://someimage.com',
});

describe('(Component) GalleryCard', function() {
  context('general...', function() {
    const wrapper = renderComp();

    it('renders as an <li>', function() {
      expect(wrapper.type()).to.eql('li');
    });

    it('contains a thumnail of the image', function() {
      expect(wrapper.find('.thumbnail')).to.exist;
      expect(wrapper.find('img')).to.have.length(1);
    });

    it('shows user handle', function() {
      const caption = wrapper.find('.caption');
      expect(caption).to.contain('@spencercdixon');
    });
  });
});
