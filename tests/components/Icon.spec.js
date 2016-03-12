import Icon from 'components/Icon';

const renderComp = createFactory(Icon, {
  is: 'user',
  size: 'fa-fw',
  spinning: false,
});

describe('(Component) Icon', () => {
  const wrapper = renderComp();

  it('renders as a <span>', () => {
    expect(wrapper.type()).to.eql('i');
  });

  it('uses prop to make font awesome icon', () => {
    expect(wrapper.prop('className')).to.eql('fa fa-user fa-fw');
  });

  it('has default size of fa-lg', () => {
    const wrapper = renderComp({is: 'user', size: undefined});
    expect(wrapper.prop('className')).to.eql('fa fa-user fa-lg');
  });

  it('should apply icon styling', () => {
    expect(wrapper.prop('style')).to.eql({
      marginRight: '5px',
      marginLeft: '5px'
    });
  });

  it('should add fa-spin if its spinning', function() {
    const wrapper = renderComp({spinning: true, is: 'user'});
    expect(wrapper).to.have.className('fa fa-user fa-fw fa-spin');
  });
});
