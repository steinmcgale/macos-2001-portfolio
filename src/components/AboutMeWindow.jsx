import React from "react";
import "./Window.css"; // reuse the same chrome

export default function AboutMeWindow({ onClose }) {
  return (
    <div className="window">
      <div className="window-header">
        <div className="window-buttons">
          <button className="window-button red" onClick={onClose} />
          <button className="window-button clear" />
          <button className="window-button clear" />
        </div>
        <div className="window-title">About Me</div>
      </div>

      <div className="window-content">
        {/* Placeholder content for v1; you can flesh this out later */}
        <p style={{ textAlign: "center" }}>
          Hi, I’m Stein. This is a placeholder for a short bio, a headshot, and a couple of links.
        </p>
      </div>
    </div>
  );
}
