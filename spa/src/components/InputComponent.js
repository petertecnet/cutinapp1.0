import React from 'react';
import PropTypes from 'prop-types';
import '../css/input.css'; 


const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

// Defina as propTypes para as props
InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
