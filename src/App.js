import React, { useState, useEffect } from 'react';
import TopMenu from './components/TopMenu';
import AboutThisMacWindow from './components/AboutThisMacWindow';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true); // state for loading screen
  const [openWindows, setOpenWindows] = useState([]);

  // Runs once when App mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handleOpenWindow = (type, title) => {
    const alreadyOpen = openWindows.some(win => win.type === type);
    if (!alreadyOpen) {
      setOpenWindows([...openWindows, { type, title }]);
    }
  };

  const handleCloseWindow = (type) => {
    setOpenWindows(openWindows.filter(win => win.type !== type));
  };

  // If still loading, show loading screen only
  if (loading) {
    return <LoadingScreen />;
  }

  // Otherwise show the desktop
  return (
    <div className="desktop">
      <TopMenu onOpenWindow={handleOpenWindow} />
      {openWindows.map(win => {
        if (win.type === 'about') {
          return (
            <AboutThisMacWindow
              key={win.type}
              onClose={() => handleCloseWindow(win.type)}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;





