import React from 'react';
import ImageMatch from 'components/ImageMatch';

const renderComp = createFactory(ImageMatch, {
  src: 'some uri',
  matches: [
    {
      logoRect: [
        [100, 55],
        [100, 155],
        [200, 55],
        [200, 155]
      ],
    }
  ],
  originalHeight: 500,
  originalWidth: 500,
});

describe('(Component) ImageMatch', function() {
  const wrapper = renderComp();

  it('should render a div container with proper styling', function() {
    expect(wrapper.type()).to.eql('div');
    expect(wrapper.prop('style')).to.eql({
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    });
  });

  it('should render a div for each match', function() {
    expect(wrapper.find('div')).to.have.length(2);
  });

  it('should calculate the proper dimensions for the match', function() {
    const matchNode = wrapper.find('div').last();
    expect(matchNode.prop('style')).to.eql({
      position: 'absolute',
      border: '2px solid #E53A40',
      borderRadius: '2',
      background: 'rgba(229, 58, 64, .5)',
      height: 50,
      width: 50,
      top: 27.5,
      left: 50
    });
  });
});
