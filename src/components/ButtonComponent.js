import React from 'react';
import PropTypes from 'prop-types';

const ButtonComponent = ({ type, className, onClick, children }) => {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

ButtonComponent.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default ButtonComponent;
