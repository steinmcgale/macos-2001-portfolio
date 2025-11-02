// Desktop.jsx
import React, { useState, useCallback } from "react";
import TopMenu from "./TopMenu";
import AboutThisMacWindow from "./AboutThisMacWindow";
import Dock from "./Dock"; 

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);

  const handleOpenWindow = useCallback((type, title) => {
    setOpenWindows((wins) => {
      const exists = wins.some((w) => w.type === type);
      return exists ? wins : [...wins, { id: Date.now(), type, title }];
    });
  }, []);

  const handleCloseWindow = useCallback((id) => {
    setOpenWindows((wins) => wins.filter((w) => w.id !== id));
  }, []);

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

      {/* Use Dock here so the import isn’t unused */}
      <Dock onOpenWindow={handleOpenWindow} />
    </div>
  );
}

