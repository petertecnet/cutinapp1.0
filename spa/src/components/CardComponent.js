import React from 'react';
import PropTypes from 'prop-types';
import '../css/card.css'; 


const CardComponent = ({ title, content }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title text-center">{title}</h5>
      </div>
      <div className="card-body">
        <p className="card-text text-white">{content}</p>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default CardComponent;
