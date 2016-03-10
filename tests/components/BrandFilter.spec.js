import BrandFilter from 'components/BrandFilter';

const renderComp = createFactory(BrandFilter, {
  id: '1',
  name: 'Starbucks',
  isActive: false,
  onSet: () => {},
});

describe('(Component) BrandFilter', function() {
  const wrapper = renderComp();

  it('renders as a <button>', function() {
    expect(wrapper.type()).to.eql('button');
  });

  it('applies proper bootstrap classes', function() {
    expect(wrapper).to.have.className('btn btn-default');
  });

  it('calls onSet when clicked with its ID', function() {
    const setSpy = sinon.spy();
    const wrapper = renderComp({id: 'example id', onSet: setSpy});
    wrapper.simulate('click');

    expect(setSpy).to.have.been.called;
    expect(setSpy).to.have.been.calledWith('example id');
  });

  context('when active...', function() {
    const wrapper = renderComp({isActive: true});

    it('applies active classname', function() {
      expect(wrapper).to.have.className('btn btn-default active');
    });
  });
});
