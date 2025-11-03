import React from "react";
import "./window.css";

export default function WindowShell({ title = "Window", onClose, children }) {
  return (
    <div className="aqua-window" role="dialog" aria-label={title}>
      <div className="aqua-titlebar">
        <div className="aqua-traffic">
          <button className="traffic close" aria-label="Close" onClick={onClose} />
          <button className="traffic minimize" aria-label="Minimize" disabled />
          <button className="traffic zoom" aria-label="Zoom" disabled />
        </div>
        <div className="aqua-title">{title}</div>
      </div>
      <div className="aqua-content">
        {children}
      </div>
      <div className="aqua-growbox" aria-hidden />
    </div>
  );
}
