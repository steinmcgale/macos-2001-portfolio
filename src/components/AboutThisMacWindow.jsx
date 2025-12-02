import React from 'react';
import './Window.css';
import macXLogo from '../Images/Mac_OS_X_Jaguar_logomark.webp';

export default function AboutThisMacWindow({ onClose }) {
  return (
    <div className="window">
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
          <img
            src={macXLogo}
            alt="Mac OS X Logo"
            style={{ maxWidth: '100px', marginBottom: '10px' }}
          />
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
}


