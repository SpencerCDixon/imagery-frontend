import React from 'react';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';

const renderComp = createFactory(Spinner, {
  size: 'fa-fw',
  inline: true
});

describe('(Component) Spinner', function() {
  const wrapper = renderComp();

  it('renders an Icon', function() {
    expect(wrapper.type()).to.eql(Icon);
  });

  context('when inline...', function() {
    const wrapper = renderComp({inline: true});

    it('renders the spinner as inline-block', function() {
      expect(wrapper.prop('style')).to.eql({
        display: 'inline-block'
      });
    });
  });

  context('when not inline...', function() {
    const wrapper = renderComp({inline: false});

    it('renders the spinner as a block', function() {
      expect(wrapper.prop('style')).to.eql({
        display: 'block'
      });
    });
  });
});
