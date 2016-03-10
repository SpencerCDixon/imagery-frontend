import React from 'react';

export const confirmChild = (ChildType) => {
  return (props, propName, componentName) => {
    const prop = props[propName];

    if (React.Children.count(prop) === 1) {
      if (prop.type !== ChildType) {
        throw new Error(
          `'${componentName}' children should all be ${ChildType.name}'s` +
            ` you supplied a ${prop.type} component.`
        );
      }
    } else {
      React.Children.forEach(prop, child => {
        if (child.type !== ChildType) {
          throw new Error(
            `'${componentName}' children should all be ${ChildType.name}'s` +
            ` you supplied a ${child.type} component.`
          );
        }
      });
    }
  };
};

