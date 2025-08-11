import React, { useEffect, useState } from 'react';
import './Window.css'; 
import macXLogo from '../Images/Mac_OS_X_Jaguar_logomark.webp'; 


const AboutThisMacWindow = ({ onClose }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const width = 300;
    const height = 320;
    const verticaloffset = 40;
    const top = window.innerHeight / 2 - height / 2 - verticaloffset;
    const left = window.innerWidth / 2 - width / 2;
    setPosition({ top, left });
  }, []);

  return (
    <div className="window" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
      <div className="window-header">
  <div className="window-buttons">
    <button className="window-button red" onClick={onClose}></button>
    <button className="window-button clear"></button>
    <button className="window-button clear"></button>
  </div>
  <div className="window-title">About This Mac</div>
</div>

    <div className="window-content">
  <div style={{ textAlign: 'center' }}>
    <img src={macXLogo} alt="Mac OS X Logo" style={{ maxWidth: '100px', marginBottom: '10px' }} />
  </div>

  <p style={{ textAlign: 'center', fontSize: '13px' }}>
    (Build 4K78)<br />
    Memory: 320 MB<br />
    Processor: PowerPC G4<br /><br />
    <small>© Apple Computer, Inc. 1983–2001</small>
  </p>
</div>
</div>
  );
};

export default AboutThisMacWindow;


