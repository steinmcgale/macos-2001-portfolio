// src/components/Desktop.jsx
import React, { useState, useCallback } from "react";
import TopMenu from "./TopMenu";
import AboutThisMacWindow from "./AboutThisMacWindow";
import Dock from "./Dock";

export default function Desktop() {
  const [openWindows, setOpenWindows] = useState([]);

  // Open a window; if it's already open, bring it to front
  const handleOpenWindow = useCallback((type, title) => {
    setOpenWindows((wins) => {
      const i = wins.findIndex((w) => w.type === type);
      if (i === -1) return [...wins, { id: Date.now(), type, title }];
      const next = wins.slice();
      const [existing] = next.splice(i, 1);
      next.push(existing); // move to top
      return next;
    });
  }, []);

  // Close by id
  const handleCloseWindow = useCallback((id) => {
    setOpenWindows((wins) => wins.filter((w) => w.id !== id));
  }, []);

  // Bring a window to front on click
  const handleFocusWindow = useCallback((id) => {
    setOpenWindows((wins) => {
      const i = wins.findIndex((w) => w.id === id);
      if (i === -1) return wins;
      const next = wins.slice();
      const [w] = next.splice(i, 1);
      next.push(w);
      return next;
    });
  }, []);

  return (
    <div className="desktop">
      <TopMenu onOpenWindow={handleOpenWindow} />

      {openWindows.map((win, idx) => {
        const z = 100 + idx; // simple stacking: last = top
        switch (win.type) {
          case "aboutThisMac":
            return (
              <div
                key={win.id}
                style={{ position: "relative", zIndex: z }}
                onMouseDown={() => handleFocusWindow(win.id)}
              >
                <AboutThisMacWindow
                  onClose={() => handleCloseWindow(win.id)}
                />
              </div>
            );

          // add more cases as you build (aboutMe, resume, portfolio, etc.)

          default:
            return null;
        }
      })}

      <Dock onOpenWindow={handleOpenWindow} />
    </div>
  );
}



