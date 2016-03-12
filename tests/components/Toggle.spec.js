import React from 'react';
import Toggle from 'components/Toggle';
import Icon from 'components/Icon';

const renderComp = createFactory(Toggle, {
  handleClick: () => {},
  text: 'Shuffle',
  icon: 'random',
  isActive: false,
});

describe('(Component) Toggle', function() {
  context('general...', function() {
    const wrapper = renderComp();
    it('renders as a <button>', function() {
      expect(wrapper.type()).to.eql('button');
    });

    it('calls handleClick when clicked', function() {
      const clickSpy = sinon.spy();
      const wrapper = renderComp({handleClick: clickSpy});
      wrapper.simulate('click');
      expect(clickSpy).to.have.been.called;
    });

    it('includes an Icon in the button', function() {
      expect(wrapper.find(Icon)).to.exist;
    });
  });

  context('when not active...', function() {
    const wrapper = renderComp({isActive: false});
    it('applies bootstrap button classes', function() {
      expect(wrapper).to.have.className('btn btn-default');
    });
  });

  context('when active...', function() {
    const wrapper = renderComp({isActive: true});
    it('applies bootstrap button classes with active', function() {
      expect(wrapper).to.have.className('btn btn-default active');
    });
  });
});
