// components/LoginScreen.jsx
import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import background from "../Images/Background.png";
import appleLogo from "../Images/apple-logo.png";
import macOsX from "../Images/Mac_OS_X- Edited.png";

const LoginScreen = ({ onLogin }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setFadeOut(true); // trigger fade animation
          setTimeout(() => {
            if (onLogin) onLogin(); // go to desktop
          }, 800); // match fade animation duration
          return 100;
        }
        return prev + 2;
      });
    }, 80); // adjust speed of loading
    return () => clearInterval(interval);
  }, [onLogin]);

  return (
    <div
      className={`login-background ${fadeOut ? "fade-out" : ""}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="login-box">
        {/* Apple + title */}
        <img src={appleLogo} alt="Apple" className="login-apple-logo" />
        <img src={macOsX} alt="Mac OS X" className="mac-title" />

        {/* Progress bar */}
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Welcome message */}
        <p className="welcome-text">Welcome to Macintosh.</p>
      </div>
    </div>
  );
};

export default LoginScreen;

