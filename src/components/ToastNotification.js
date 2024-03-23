import React from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'react-bootstrap';

const ToastNotification = ({ show, onClose, type, message }) => {
  return (
    <Toast show={show} onClose={onClose} bg={type === 'success' ? 'success' : 'danger'} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">{type.charAt(0).toUpperCase() + type.slice(1)}</strong>
      </Toast.Header>
      <Toast.Body>{message}</Toast.Body>
    </Toast>
  );
};

ToastNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ToastNotification;
