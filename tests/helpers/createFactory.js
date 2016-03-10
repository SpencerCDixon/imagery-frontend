import React from 'react';
import { mount, shallow } from 'enzyme';

const createFactory = (Component, defaults) => {
  return (overrides = {}, options = {}) => {
    const props = {...defaults, ...overrides};
    const component = (
      <Component {...props}>
        {options.children}
      </Component>
    );

    if (options.mount) {
      return mount(component);
    }
    return shallow(component);
  };
};
export default createFactory;
