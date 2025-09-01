// components/LoginScreen.jsx
import React from "react";
import "./LoginScreen.css";
import background from "../Images/Background.png";
import appleLogo from "../Images/apple-logo.png";
import profilePic from "../Images/Stein no background.png"; 

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="login-background"
    style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-box">
        <img src={appleLogo} alt="Apple Logo" className="login-apple-logo" />
        <h1 className="login-title">Mac OS X</h1>
        <p className="login-subtitle">Your Computer</p>

        <div className="profile" onClick={onLogin}>
          <img src={profilePic} alt="Profile" className="profile-pic" />
          <p className="profile-name">Your Name</p>
        </div>

        <div className="login-actions">
          <button className="login-button restart">Restart</button>
          <button className="login-button shutdown">Shut Down</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

