import React from 'react';
import GalleryCard from 'components/GalleryCard';

const renderComp = createFactory(GalleryCard, {
  userHandle: '@spencercdixon',
  matches: [{ brand: 1, logoRect: [[481, 416]]}],
  imageUrl: 'http://someimage.com',
  view: 'list',
  imageWidth: 300,
  imageHeight: 600,
});

describe('(Component) GalleryCard', function() {
  context('general...', function() {
    const wrapper = renderComp();

    it('renders as an <li>', function() {
      expect(wrapper.type()).to.eql('li');
    });

    it('contains a thumnail of the image', function() {
      expect(wrapper.find('.thumbnail')).to.exist;
    });

    it('shows user handle', function() {
      const caption = wrapper.find('.caption');
      expect(caption).to.contain('@spencercdixon');
    });
  });

  context('when list view...', function() {
    const wrapper = renderComp({view: 'list'});
    it('renders li as blocks', function() {
      const styles = wrapper.prop('style');

      expect(styles.display).to.eql('block');
    });
  });

  context('when grid view...', function() {
    const wrapper = renderComp({view: 'grid'});
    it('renders li as inline-blocks', function() {
      const styles = wrapper.prop('style');

      expect(styles.display).to.eql('inline-block');
    });
  });
});
