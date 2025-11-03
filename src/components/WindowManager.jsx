import React from "react";
import AboutThisMacWindow from "./AboutThisMacWindow";
import WindowShell from "./WindowShell";
import "./WindowShell"; 

/**
 * Props:
 * - windows: [{ id, type, title }]
 * - onClose: (id) => void
 * - onFocus: (id) => void   // bring to front (Desktop will reorder)
 */
export default function WindowManager({ windows, onClose, onFocus }) {
  // Render in array order; last is on top. We offset positions slightly per index.
  return windows.map((win, i) => {
    const z = 100 + i;
    const offset = i * 20; // cascade new windows slightly
    const common = {
      key: win.id,
      onMouseDown: () => onFocus?.(win.id),
      style: { position: "absolute", top: 120 + offset, left: 140 + offset, zIndex: z }
    };

    switch (win.type) {
      case "about":
        // Use your existing component for About
        return (
          <div {...common}>
            <AboutThisMacWindow onClose={() => onClose(win.id)} />
          </div>
        );

      default:
        // Generic Aqua shell placeholder for everything else (resume, portfolio, etc.)
        return (
          <div {...common}>
            <WindowShell title={win.title || capitalize(win.type)} onClose={() => onClose(win.id)}>
              <p><em>Coming soon…</em></p>
            </WindowShell>
          </div>
        );
    }
  });
}

function capitalize(s) {
  return (s || "").slice(0,1).toUpperCase() + (s || "").slice(1);
}
