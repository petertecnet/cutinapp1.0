import React from 'react';
import PropTypes from 'prop-types';

const FormComponent = ({ initialValues, onSubmit, children }) => {
  return (
    <form onSubmit={onSubmit}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          initialValues: initialValues,
        })
      )}
    </form>
  );
};

FormComponent.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormComponent;
