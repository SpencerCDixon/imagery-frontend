import React from 'react';
import BrandFilters from 'components/BrandFilters';
import BrandFilter from 'components/BrandFilter';

const renderComp = createFactory(BrandFilters, {
  brands: [
    {id: '1', name: 'Starbucks'}
  ],
  selectedBrand: 'none',
  setBrandFilter: () => {},
});

describe('(Component) BrandFilters', function() {
  const wrapper = renderComp();

  it('renders as a <div>', function() {
    expect(wrapper.type()).to.eql('div');
  });

  it('applies proper bootstrap class', function() {
    expect(wrapper).to.have.className('btn-group');
  });

  it('renders BrandFilters for each brand plus an "All" filter', function() {
    expect(wrapper.find(BrandFilter)).to.have.length(2);
  });

  it('resets filters when the "All" filter is clicked', function() {
    const setFilterSpy = sinon.spy();
    const wrapper = renderComp({setBrandFilter: setFilterSpy});

    const allFilter = wrapper.find(BrandFilter).first();
    allFilter.simulate('set')
    expect(setFilterSpy).to.have.been.called;
    expect(setFilterSpy).to.have.been.calledWith('none');
  });

  it('sets "All" filter to active by default', function() {
    const allFilter = wrapper.find(BrandFilter).first();
    expect(allFilter.prop('isActive')).to.eql(true);
  });
});
