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
    <div className="loading-overlay">
      <div className="loading-window">
        <h1 className="loading-title">Connecting...</h1>
        <p className="loading-sub">This may take a moment.</p>
        
        <div className="loading-orbs">
          <div className="orb"></div>
          <div className="orb"></div>
        </div>

        <p className="loading-sub">Disconnecting...</p>
        <button className="aqua-button">Cancel</button>
      </div>
    </div>
  );
};

export default LoadingScreen;
