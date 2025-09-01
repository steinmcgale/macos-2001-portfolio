// App.js
import React, { useState } from "react";
import TopMenu from "./components/TopMenu";
import AboutThisMacWindow from "./components/AboutThisMacWindow";
import LoginScreen from "./components/LoginScreen"; // new login screen
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openWindows, setOpenWindows] = useState([]);

  // open window (About this Mac, etc.)
  const handleOpenWindow = (type, title) => {
    const alreadyOpen = openWindows.some((win) => win.type === type);
    if (!alreadyOpen) {
      setOpenWindows([...openWindows, { id: Date.now(), type, title }]);
    }
  };

  // close window
  const handleCloseWindow = (id) => {
    setOpenWindows(openWindows.filter((win) => win.id !== id));
  };

  // if not logged in, show login screen only
  if (!loggedIn) {
    return <LoginScreen onLogin={() => setLoggedIn(true)} />;
  }

  // once logged in, show desktop
  return (
    <div className="desktop">
      <TopMenu onOpenWindow={handleOpenWindow} />

      {openWindows.map((win) => {
        switch (win.type) {
          case "about":
            return (
              <AboutThisMacWindow
                key={win.id}
                onClose={() => handleCloseWindow(win.id)}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default App;








