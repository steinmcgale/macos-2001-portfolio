// components/LoginScreen.jsx
import React, { useEffect, useState } from "react";
import "./LoginScreen.css";
import background from "../Images/Background.png";
import appleLogo from "../Images/apple-logo.png";
import macOsX from "../Images/Mac_OS_X- Edited.png";

// Messages and the progress threshold they display until
const messages = [
  { text: "Welcome to Macintosh.", until: 30 },
  { text: "Stein McGale's Desktop Installing.", until: 65 },
  { text: "Think Different..", until: 100 },
];

const LoginScreen = ({ onLogin }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [message, setMessage] = useState(messages[0].text); // 👈 active state for the welcome text

  useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      const increment = Math.random() > 0.7 ? 0 : 2; // sometimes pause
      const next = prev + increment;

      // Update the welcome message
      const currentMessage =
        messages.find((m) => next <= m.until)?.text || messages[messages.length - 1].text;
      setMessage(currentMessage);

      if (next >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(() => {
          if (onLogin) onLogin();
        }, 800);
        return 100;
      }
      return next;
    });
  }, 80 + Math.floor(Math.random() * 40)); // add jitter to timing
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
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Dynamic welcome message */}
        <p className="welcome-text">{message}</p>
      </div>
    </div>
  );
};

export default LoginScreen;

