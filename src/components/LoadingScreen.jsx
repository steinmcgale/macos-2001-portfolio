import React, { useEffect, useState } from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="loading-container">
      <h1 className="loading-title">Connecting...</h1>
      <p>This may take a moment.</p>
      <div className="orbs">
        <div className="orb"></div>
        <div className="orb"></div>
      </div>
      <p>Disconnecting...</p>
      <button className="cancel-button">Cancel</button>
    </div>
  );
};

export default LoadingScreen;
