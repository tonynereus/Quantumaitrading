import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ size, backgroundColor, children }) => {
  const circleStyle = {
    width: size,
    height: size,
    backgroundColor,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div style={circleStyle}>
      {children}
    </div>
  );
};

Circle.propTypes = {
  size: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Circle;
