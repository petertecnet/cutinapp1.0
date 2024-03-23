import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AlertModalComponent = ({ show, onHide, type, message, validationErrors }) => {
  let variant;
  switch (type) {
    case 'success':
      variant = 'success';
      break;
    case 'danger':
      variant = 'danger';
      break;
    case 'warning':
      variant = 'warning';
      break;
    default:
      variant = 'info';
  }

  const capitalizedType = type ? type.charAt(0).toUpperCase() + type.slice(1) : '';

  return (
    <Modal show={show} onHide={onHide} centered unmountOnClose={true}>
      <Modal.Header closeButton>
        <Modal.Title>{capitalizedType}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {type === 'success' ? (
          <p className="mb-0 text-dark">{message}</p>
        ) : (
          <>
            <p className="mb-3" dangerouslySetInnerHTML={{ __html: message }} />
            {validationErrors && validationErrors.length > 0 && (
              <Alert variant="danger">
                <strong>Erros de validação:</strong>
                <ul className="mb-0">
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant={variant} onClick={onHide}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

AlertModalComponent.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  validationErrors: PropTypes.arrayOf(PropTypes.string),
};

export default AlertModalComponent;
