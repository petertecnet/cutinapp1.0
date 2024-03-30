// LoadingIndicator.js
import React from 'react';
import loadingImage from '../images/loadingImage2.gif';

const LoadingComponent = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <img src={loadingImage} alt="Loading" style={{ borderRadius: '80%', width: '50%', height: 'auto' }} />
    </div>
  );
}

export default LoadingComponent;
