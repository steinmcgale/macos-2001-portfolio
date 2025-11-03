import React from "react";
import "./AboutMeWindow.css";

export default function AboutMeWindow({ onClose }) {
  return (
    <div className="amw-window">
      <div className="amw-titlebar">
        <div className="amw-traffic">
          <button className="amw-light amw-close" aria-label="Close" onClick={onClose} />
          <button className="amw-light amw-min" aria-label="Minimize" disabled />
          <button className="amw-light amw-zoom" aria-label="Zoom" disabled />
        </div>
        <div className="amw-title">About Me</div>
      </div>

      <div className="amw-content">
        <p><strong>Hi!</strong> This is a placeholder for your About Me content.</p>
        <p>Add your bio, photo, and links — we’ll polish the Aqua visuals next.</p>
      </div>

      <div className="amw-growbox" aria-hidden />
    </div>
  );
}
