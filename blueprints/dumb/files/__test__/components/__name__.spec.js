import { shallow } from 'enzyme';
import <%= pascalEntityName %> from 'components/<%= pascalEntityName %>'

describe('(Component) <%= pascalEntityName %>', () => {
  const wrapper = shallow(<<%= pascalEntityName %>/>);

  it('should exist', () => {
    expect(wrapper.type()).to.eql('div');
  })
})
