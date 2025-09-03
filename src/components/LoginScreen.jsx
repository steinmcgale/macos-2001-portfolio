// components/LoginScreen.jsx
import React from "react";
import "./LoginScreen.css";
import background from "../Images/Background.png";
import appleLogo from "../Images/apple-logo.png";
import profilePic from "../Images/Stein no background.png"; 
import macOsX from "../Images/Mac_OS_X- Edited.png"; 

const LoginScreen = ({ onLogin }) => {
  return (
    <div
      className="login-background"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-box">
        {/* Apple + titles */}
        <img src={appleLogo} alt="Apple" className="login-apple-logo" />
        <img src={macOsX} alt="Mac" className="mac-title" />
        <div className="machine-name">Think Different.</div>

        {/* Profile row (image left, name right) */}
        <button className="user-row" onClick={onLogin} aria-label="Login">
          <img src={profilePic} alt="Profile" className="avatar" />
          <span className="user-name">Stein McGale</span>
        </button>

        {/* Bottom actions */}
        <div className="actions">
          <div className="action">
            <button className="circle-btn restart" aria-label="Restart"></button>
            <div className="action-label">Restart</div>
          </div>
          <div className="action">
            <button className="circle-btn shutdown" aria-label="Shut Down"></button>
            <div className="action-label">Shut Down</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;