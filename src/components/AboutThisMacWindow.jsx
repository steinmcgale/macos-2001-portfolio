import React from 'react';
import './Window.css';
import osxLogo from '../Images/Mac_OS_X';

const AboutThisMacWindow = ({ onClose }) => {
  return (
    <div className="window">
      <div className="window-header">
        <span>About This Mac</span>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="window-content about-this-mac">
        <img src={osxLogo} alt="Mac OS X Logo" className="osx-logo" />
        <div className="about-text">
          <p>(Build 4K78)</p>
          <p>Memory: 320 MB</p>
          <p>Processor: PowerPC G4</p>
          <p className="copyright">™ & © Apple Computer, Inc. 1983–2001</p>
        </div>
      </div>
    </div>
  );
};

export default AboutThisMacWindow;

