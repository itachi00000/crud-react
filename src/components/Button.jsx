import React from 'react';

function Button(props) {
  const { children, ...otherProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button type="button" {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
