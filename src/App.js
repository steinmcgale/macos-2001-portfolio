import React, { useState } from 'react';
import TopMenu from './components/TopMenu';
import AboutThisMacWindow from './components/AboutThisMacWindow'; // Create this next
import './App.css';


function App() {
  const [openWindows, setOpenWindows] = useState([]);

  const handleOpenWindow = (type, title) => {
    // Prevent duplicates
    const alreadyOpen = openWindows.some(win => win.type === type);
    if (!alreadyOpen) {
      setOpenWindows([...openWindows, { type, title }]);
    }
  };

  const handleCloseWindow = (type) => {
    setOpenWindows(openWindows.filter(win => win.type !== type));
  };

  return (
    <div className="desktop">
      <TopMenu onOpenWindow={handleOpenWindow} />

      {/* Render windows based on type */}
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




